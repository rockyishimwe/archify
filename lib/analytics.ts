/**
 * Product analytics, deliberately dependency-free.
 *
 * Events are posted straight to PostHog's public capture endpoint rather than
 * bundling `posthog-js`. The reasons, in order: it keeps a third-party script
 * off the critical path of a landing page whose whole job is conversion, it
 * ships nothing when the key is unset, and it is ~40 lines we fully control.
 *
 * The cost is real and worth naming: no autocapture, no session replay, no
 * feature flags. We only want the funnel counted (ROADMAP Phase 1 Day 7), and
 * every event in that funnel is fired explicitly below. If replay is ever
 * needed, swap the transport here — callers never change.
 */

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || "";
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");

const DISTINCT_ID_KEY = "roomify.distinct_id";

/**
 * The funnel, fixed as a union so a typo becomes a build error instead of a
 * silently missing metric. Add here first, then fire.
 */
export type AnalyticsEvent =
    | "page_view"
    | "upload_started"
    | "upload_failed"
    | "render_started"
    | "render_succeeded"
    | "render_failed"
    | "download_clicked"
    | "signup_started"
    | "signup_completed"
    | "signup_cancelled"
    | "pricing_viewed"
    | "pricing_plan_clicked"
    | "waitlist_submitted";

type Props = Record<string, string | number | boolean | null | undefined>;

/** A stable anonymous id so visit → render → email can be joined up. */
const getDistinctId = (): string => {
    if (typeof window === "undefined") return "server";

    try {
        const existing = window.localStorage.getItem(DISTINCT_ID_KEY);
        if (existing) return existing;

        const created = crypto.randomUUID();
        window.localStorage.setItem(DISTINCT_ID_KEY, created);
        return created;
    } catch {
        // Private mode / blocked storage. An un-joined event beats no event.
        return "anonymous";
    }
};

export const track = (event: AnalyticsEvent, props: Props = {}): void => {
    if (typeof window === "undefined") return;

    if (!POSTHOG_KEY) {
        if (import.meta.env.DEV) console.debug(`[analytics] ${event}`, props);
        return;
    }

    const body = JSON.stringify({
        api_key: POSTHOG_KEY,
        event,
        distinct_id: getDistinctId(),
        properties: {
            ...props,
            $current_url: window.location.href,
            $pathname: window.location.pathname,
        },
        timestamp: new Date().toISOString(),
    });

    // `keepalive` so events fired immediately before a navigation (the download
    // click, the outbound pricing click) still arrive.
    void fetch(`${POSTHOG_HOST}/i/v0/e/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
    }).catch(() => {
        // Analytics must never break the product, and an ad blocker eating this
        // request is the expected case, not an error worth logging.
    });
};
