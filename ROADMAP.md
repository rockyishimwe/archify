# Roomify → SaaS: Phased Build Plan

**Product:** Photoreal renders from floor plans, in 60 seconds.
**Buyers (in order):** real estate agents / listing photographers (volume) → interior designers (retention) → small architecture firms (ACV).
**Cut from scope:** generic image→mesh, community/social feed, "2D→3D for anything" positioning.

Each day is one sitting. Checkboxes are the unit of progress. Do not start a phase before its predecessor's exit criteria pass.

---

## Phase 0 — Stabilize what exists (3 days)

Goal: the current Puter build stops embarrassing us, so it can carry a demand test.
Rule: **only fix what survives the re-platform.** Skip anything coupled to Puter KV/hosting — Phase 2 deletes it.

### Day 1 — Visible defects
- [x] `app/root.tsx:106` — remove the stray `;` rendering as text after `<Outlet />`
- [x] `app/routes/home.tsx:10` — real `meta()`: title, description, OG image
- [x] `components/Navbar.tsx:35` — wrap `<a>` in `<li>`; remove or build the 4 dead nav links
- [x] `app/routes/home.tsx` — remove hardcoded "Community" badge and "By JS Mastery"
- [x] Remove the "Introducing Roomify 2.0" announce bar and the dead "Watch Demo" button
- [x] `lib/puter.action.ts` — strip the 3 debug `console.log`s in `getProjectById`
- [x] Decide the name once — **Roomify** (was split with "Archify" in the README) — README, `package.json`, and UI now agree. The GitHub repo stays `rockyishimwe/archify`; only the product name is unified.

### Day 2 — Upload + export correctness
- [x] `components/Upload.tsx` — delete the local `UploadProps` shadow; use the global type and honor the `boolean` return so failures surface
- [x] `components/Upload.tsx` — clear existing interval/timeout at the top of `processFile` (a second file currently overlaps timers)
- [x] `components/Upload.tsx` — one size limit (10MB), enforced in code, matching all copy; align `accept` with `handleDrop` (both allow jpg/png/webp)
- [x] `app/routes/visualizer.$id.tsx` — fix `handleExport`: fetch → blob → object URL → revoke. Cross-origin `puter.site` URLs currently navigate instead of downloading
- [x] `app/routes/home.tsx` — drop the dead, misspelled `initialRendered` navigation state

### Day 3 — Error states and dead code
- [ ] Visualizer: real failure UI for `generate3DView` — message + Retry button, not a blank canvas
- [ ] Visualizer: 404 state for an unknown `:id`
- [ ] Build the missing `AuthRequiredModal` (type + `.auth-modal` CSS already exist) so signed-out users get a prompt, not a dead dropzone
- [ ] `lib/ai.action.ts` — runtime guard on the `txt2img` response shape instead of a blind `as HTMLImageElement`
- [ ] `lib/constants.ts` — delete the 7 unused exports
- [ ] `type.d.ts` — delete `AppStatus` (ambient enum; crashes if ever used at runtime), `VisualizerProps`, `VisualizerLocationState`, `CardProps`
- [ ] `lib/puter.worker.js` — stop overwriting `isPublic: true` on list; sort by `timestamp` desc
- [ ] `npm run typecheck && npm run build` clean; commit

**Exit:** a stranger can sign in, upload, render, download, and hit no dead link or silent failure.

---

## Phase 1 — Kill the signup wall and test demand (4 days)

Goal: find out if anyone wants this, before paying to rebuild it.
This is the most important phase in the document. Do not skip to Phase 2 because rebuilding is more fun.

### Day 4 — Anonymous generation path
- [ ] Allow upload + 1 generation with **no account** (localStorage counter; trivially bypassable, fine for now)
- [ ] Watermark the anonymous render (canvas overlay, bottom-right)
- [ ] Gate only the *clean download* and the *second render* behind signup
- [ ] Keep Puter auth as the account layer for now — just move it *after* the value, not before

### Day 5 — A landing page that sells one thing
- [ ] Headline: the 60-second promise. Kill "AI-first design environment"
- [ ] Hero = a real before/after of your best render, above the fold
- [ ] 3–4 example plans users can click to try without uploading anything
- [ ] Single CTA: upload. Remove every competing CTA

### Day 6 — Instrumentation and waitlist
- [ ] Analytics (PostHog or Plausible): `page_view`, `upload_started`, `render_started`, `render_succeeded`, `render_failed`, `download_clicked`, `signup_started`, `signup_completed`
- [ ] Email capture on the result screen: "Want 4 style variants? Join the list"
- [ ] A `/pricing` page with three tiers and a "Join waitlist" button — **price before you build billing**; the clicks are the signal

### Day 7 — Put it in front of people
- [ ] Deploy (Vercel / Fly — the Dockerfile already works)
- [ ] Post in 5 places your buyers actually are: r/RealEstate, r/InteriorDesign, r/Architects, a listing-photographer FB group, LinkedIn
- [ ] DM 20 agents/designers directly with a render of *their own* listing's floor plan. This outperforms every post
- [ ] Track: visit → render, render → email, pricing-page clicks

**Exit criteria (be honest):** ≥100 renders by people you don't know, ≥15% render→email conversion, ≥10 pricing clicks. Miss badly and the problem is positioning or buyer, not code — re-run Phase 1 with a different buyer before touching Phase 2.

---

## Phase 2 — Re-platform onto a real backend (8 days)

Goal: a substrate that can bill, meter, query across users, and not leak AI cost.
Stack: keep React Router 7 (SSR, loaders/actions). Add Postgres (Supabase or Neon), server-side auth, R2/S3 media, server-side generation.

### Day 8 — Schema and project setup
- [ ] Provision Postgres + object storage
- [ ] Schema: `users`, `projects`, `renders` (many per project), `credits_ledger`, `shares`, `api_keys`
- [ ] `renders` carries `style`, `view_type`, `prompt_version`, `status`, `cost_cents` — history and variants are schema-level from day one
- [ ] Migrations + typed client

### Day 9 — Auth
- [ ] Email magic link + Google OAuth. No third-party OS in the funnel
- [ ] Server sessions; move auth out of `root.tsx` client state into a root loader
- [ ] Anonymous → account migration: claim the pre-signup render on signup

### Day 10–11 — Server-side generation
- [ ] Move `generate3DView` behind a server action. **No AI call from the browser, ever again**
- [ ] Job queue + status polling (renders take 10–40s; don't hold a request open)
- [ ] Per-user rate limit and a hard daily cost ceiling
- [ ] Record every render in `renders` with its cost — this is your margin visibility

### Day 12 — Media pipeline
- [ ] Replace `lib/puter.hosting.ts` with S3/R2 upload + signed URLs
- [ ] Thumbnails for the gallery (it currently loads full-size renders — slow and expensive)
- [ ] Delete `lib/puter.hosting.ts`, `lib/puter.worker.js`, `lib/puter.action.ts`, and the `.puter.site` helpers in `lib/utils.ts`

### Day 13 — Port the UI
- [ ] Home gallery and visualizer read from loaders, not `useEffect` fetches
- [ ] Remove `@heyputer/puter.js` from the dependency tree entirely (this also fixes the SSR hazard of its top-level imports)

### Day 14 — Hardening
- [ ] Per-route error boundaries; Sentry
- [ ] Input validation (zod) on every action
- [ ] Abuse guards: file-type sniffing, dimension caps, non-floor-plan / NSFW rejection

### Day 15 — Migrate and verify
- [ ] Import Phase 1 users and renders
- [ ] Load-test the render queue
- [ ] `typecheck`, `build`, deploy, smoke test

**Exit:** no Puter dependency, every render costed and attributed, signup takes 15 seconds.

---

## Phase 3 — Monetization (4 days)

### Day 16 — Credits
- [ ] Credit ledger: grant, spend, refund (a failed render **must** refund, or you'll issue manual refunds forever)
- [ ] Cost per action: top-down render 1, style-variant pack 4, perspective pack 6
- [ ] Visible balance in the navbar; block + upsell at zero

### Day 17 — Stripe
- [ ] Free: 3 renders, watermarked, no commercial use
- [ ] Pro $29/mo: 100 renders, clean, commercial license
- [ ] Studio $99/mo: 500 renders, bulk upload, 3 seats, API
- [ ] Checkout, customer portal, webhooks (`subscription.updated`, `invoice.paid`, `payment_failed`)

### Day 18 — Paywall UX
- [ ] Watermark on the free tier only, applied **server-side** (client-side is removable)
- [ ] Upgrade prompts at the three real moments: download, second render, variant pack
- [ ] Real `/pricing` page replacing the Phase 1 waitlist version

### Day 19 — Ops
- [ ] Admin view: users, renders, spend, margin per user
- [ ] Churn and failed-payment email flows
- [ ] Verify unit economics: revenue per render vs. Gemini cost per render. **Negative margin means fix pricing before Phase 4**

**Exit:** a stranger can pay you money without you touching anything.

---

## Phase 4 — The features people are paying for (7 days)

### Day 20–21 — Style variants
- [ ] 6 presets: Scandinavian, Japandi, industrial, minimal, warm traditional, mid-century
- [ ] Wire the existing `DesignConfig` / `Material` types into a prompt builder
- [ ] One upload → parallel variant pack → grid result view
- [ ] Highest-value feature in the product. Treat it as such

### Day 22–23 — Perspective / eye-level views
- [ ] New prompt family: interior views from the plan, not just orthographic top-down
- [ ] Room detection → "show me the living room / kitchen / primary bedroom"
- [ ] 5–8 angles per plan as a pack
- [ ] This is what moves perceived value from "neat" to "worth $29"

### Day 24 — Render history
- [ ] Timeline of every render per project (the Day 8 schema already supports it)
- [ ] Compare any two; set any render as the project cover
- [ ] Stop overwriting. Ever

### Day 25 — Iterative refine
- [ ] Text instruction against an existing render: "darker floors", "remove the rug"
- [ ] Chained edits, using the Day 24 history trail
- [ ] This is the retention feature — it keeps people out of Photoshop

### Day 26 — Furnishing control
- [ ] Per-room function override ("this is a nursery, not a bedroom")
- [ ] Furnish / unfurnish toggle
- [ ] Fixes the #1 accuracy complaint you will already be hearing by now

**Exit:** a paying user has a reason to come back next week.

---

## Phase 5 — Defensibility and distribution (7 days)

### Day 27–28 — Branded client-share links
- [ ] Public share URL: logo, project name, before/after slider, render gallery
- [ ] Comment threads, so the *client* lands inside your product
- [ ] Pro: your logo. Studio: custom domain
- [ ] Highest-leverage item on this page — every shared render is an ad. The scaffolded `isPublic` / `sharedBy` / `sharedAt` fields finally earn their keep

### Day 29 — Bulk upload
- [ ] Drop 20 plans → queue → progress board → zip download
- [ ] The single feature that converts a Studio subscription

### Day 30 — PDF / presentation export
- [ ] One click: cover, plan, renders, before/after, branding
- [ ] Architects deliver PDFs, not PNGs. Small feature, justifies the price jump

### Day 31–32 — Public API
- [ ] `POST /v1/renders`, `GET /v1/renders/:id`, webhooks
- [ ] Keyed and metered against the same credit ledger
- [ ] Docs + a Zapier/Make integration
- [ ] Pure margin, near-zero support burden — listing platforms want this inside *their* pipeline

### Day 33 — Teams
- [ ] Organizations, seats, shared project library, roles
- [ ] Unblocks firms, who are the real ACV

**Exit:** customers have switching costs, and renders you never see are bringing in new users.

---

## Phase 6 — Real geometry (the moat, 2–3 months — only if pulled)

Not day-planned. Start only when customers ask for measurements or CAD export.

- [ ] CV pipeline: wall / door / window / room detection from the plan — **not** a diffusion prompt; diffusion hallucinates geometry
- [ ] Procedural extrusion → dimensioned glTF
- [ ] In-browser walkthrough (Three.js / R3F)
- [ ] Measurements, areas, material quantities
- [ ] Export to SketchUp / Revit / IFC — where firms actually spend money
- [ ] AR mobile view (sales feature)

Expansion order, if it comes: elevations / facade → site plans & landscaping → commercial & retail layouts → full CAD. Expand along the customer's workflow, never along the technology.

---

## Standing rules

1. **Phase 1's exit criteria are a gate, not a formality.** A failed demand test means changing the buyer or the pitch — not writing more code.
2. **No AI calls from the browser after Phase 2.** Non-negotiable: unmeterable and uncapped.
3. **Every action that burns a credit must refund on failure.**
4. Check margin per render at the end of every phase.
5. Ship behind a flag, measure, then remove the flag.
