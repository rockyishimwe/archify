# Roomify → SaaS: Phased Build Plan

**Product:** 3D floor plans for property listings, in 60 seconds.

**Beachhead:** **real estate listing photographers and media companies** — businesses that already
produce listing assets, already hold the digitised floor plan, and resell to 30–80 agents each.
Sell them margin on an existing invoice line, not a gadget.

**Market sequence:** listing photographers / media companies (beachhead, a reseller multiplier) →
individual agents and brokerages (the broad market underneath) → interior designers (**only once
Phase 4 ships style variants and eye-level views — today's top-down output is not their
deliverable**) → architecture firms (**only after Phase 6 gives real geometry; their accuracy bar is
a liability bar, and diffusion hallucinates walls**).

**Why this segment, in one line:** the top-down 3D floor plan is not a novelty we must create demand
for — it is an existing, named, already-purchased listing asset with an established price and a
24–48 hour human turnaround we beat by three orders of magnitude.

**Cut from scope:** generic image→mesh, community/social feed, "2D→3D for anything" positioning,
and any pitch to architects before Phase 6.

Each day is one sitting. Checkboxes are the unit of progress. Do not start a phase before its predecessor's exit criteria pass.

---

## Market thesis and its assumptions

The segment choice rests on four claims. The first three I am confident in from the product itself;
the fourth is an **unverified estimate from background knowledge, not live research** — Day 4 checks it
before a line of Phase 1 copy is written.

| Claim | Confidence | How it is tested |
| --- | --- | --- |
| Today's only output is a top-down 3D floor plan, which **is** a real-estate listing asset and **is not** a designer's or architect's deliverable | High — read off our own build | Already true |
| Photographers hold the input file already digitised (CubiCasa / Matterport scans); agents often hold only a PDF or a phone photo of paper | High | Day 7 DMs reveal file quality immediately |
| Accuracy tolerance is lowest in real estate (marketing collateral nobody measures from) and highest in architecture (client deliverable, liability) | High | Complaint themes in Phase 1 |
| Incumbents (CubiCasa, BoxBrownie, PlanUp, regional shops) charge roughly **$20–60 per plan at 24–48h turnaround** | **Low — estimate, must verify** | **Day 4 competitor price check** |

**Why the photographer, not the agent:**

1. They already produce listing assets — we add an invoice line, we do not change behaviour.
2. They already hold the plan as a file.
3. **They are a multiplier**: one photographer serves 30–80 agents, so ten of them reach hundreds of listings.
4. They are a business, so they buy monthly and resell at markup — which is exactly what the Studio tier and the API are for.
5. They are **findable by name this afternoon**: local, searchable, directory-listed, concentrated in a few large Facebook groups. "Interior designers" are not.

**The two risks, named:**

- **MLS / advertising misrepresentation.** Property advertising is regulated on accurate depiction, and hallucinated geometry in a listing asset is real exposure. Mitigation is standard industry practice — label every export *"artist's impression — not to scale"* — baked in from Day 4, not bolted on after a complaint. This is also the strongest long-run argument for Phase 6.
- **The segment may be too small locally.** The multiplier cuts both ways: saturate it and growth stalls. Mitigation: individual agents are the broad market underneath, reachable with the same product and nearly the same copy.

**Falsification:** if the Day 4 price check shows incumbents at roughly $10 and sub-6-hour turnaround, the wedge is no longer price. Shift the pitch to turnaround and volume, and say so in the Day 5 copy.

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
- [x] Visualizer: real failure UI for `generate3DView` — message + Retry button, not a blank canvas
- [x] Visualizer: 404 state for an unknown `:id`
- [x] Build the missing `AuthRequiredModal` (type + `.auth-modal` CSS already exist) so signed-out users get a prompt, not a dead dropzone
- [x] `lib/ai.action.ts` — runtime guard on the `txt2img` response shape instead of a blind `as HTMLImageElement`
- [x] `lib/constants.ts` — delete the 7 unused exports
- [x] `type.d.ts` — delete `AppStatus` (ambient enum; crashes if ever used at runtime), `VisualizerProps`, `VisualizerLocationState`, `CardProps`
- [x] `lib/puter.worker.js` — stop overwriting `isPublic: true` on list; sort by `timestamp` desc
- [x] `npm run typecheck && npm run build` clean; commit
- [x] *(folded in)* empty-gallery state on home; removed the `ButtonProps` duplicate shadow and the orphaned `RenderCompletePayload`

**Exit:** a stranger can sign in, upload, render, download, and hit no dead link or silent failure.

---

## Phase 1 — Kill the signup wall and test demand (4 days)

Goal: find out whether listing photographers will pay, before paying to rebuild anything.
This is the most important phase in the document. Do not skip to Phase 2 because rebuilding is more fun.

### Day 4 — Competitor check, anonymous generation, legal label
- [ ] **Verify the price assumption first (30 minutes, before any copy is written).** Get current per-plan price and turnaround for CubiCasa, BoxBrownie, PlanUp, and two regional shops in the target geography. Write the real numbers into the thesis table above
- [ ] If they are at ~$10 and sub-6-hour turnaround, **the wedge is turnaround and volume, not price** — note that here and carry it into Day 5
- [ ] Allow upload + 1 generation with **no account** (localStorage counter; trivially bypassable, fine for now)
- [ ] Watermark the anonymous render (canvas overlay, bottom-right)
- [ ] **Burn "Artist's impression — not to scale" into every export, on every tier.** Advertising-misrepresentation exposure is real in this segment, and this is standard industry practice. Not a Phase 3 item
- [ ] Gate only the *clean download* and the *second render* behind signup
- [ ] Keep Puter auth as the account layer for now — just move it *after* the value, not before

### Day 5 — A landing page that sells one thing to one buyer
- [ ] Headline commits to the segment: **"3D floor plans for every listing, in 60 seconds."** Kill "AI-first design environment" and anything about design environments or creativity
- [ ] Hero = a real before/after of a **recognisably residential listing plan**, above the fold. Not an abstract or architectural-competition plan
- [ ] Second fold speaks to the reseller, not the end client: *"Add it to your listing package. Costs you cents, resells at $40."*
- [ ] 3–4 example listing plans users can click to try without uploading anything
- [ ] Single CTA: upload. Remove every competing CTA
- [ ] Say the turnaround number against the incumbent's, using the **verified** Day 4 figures

### Day 6 — Instrumentation and priced waitlist
- [ ] Analytics (PostHog or Plausible): `page_view`, `upload_started`, `render_started`, `render_succeeded`, `render_failed`, `download_clicked`, `signup_started`, `signup_completed`
- [ ] Email capture on the result screen, pitched at the segment: *"Want bulk upload for a whole listing package? Join the list"*
- [ ] A `/pricing` page framed the way the industry already buys — **per plan alongside the subscription**, e.g. ~$2/plan at volume against the $20–60 they pay now, plus the Studio tier for volume. **Price before building billing**; the clicks are the signal
- [ ] Separate the waitlist by self-declared role (photographer / agent / designer / other). This tells you whether the beachhead choice was right

### Day 7 — Put it in front of photographers specifically
- [ ] Deploy (Vercel / Fly — the Dockerfile already works)
- [ ] **Channels, narrowed to the segment:** the large real-estate-photography Facebook groups, r/RealEstatePhotography, PFRE (Photography For Real Estate), a local real-estate-media Slack or WhatsApp group, LinkedIn. **Dropped: r/InteriorDesign and r/Architects — the product is not their deliverable until Phase 4 and Phase 6 respectively**
- [ ] Build a named list of 50 listing photographers / media companies in the target geography. They are directory-listed and searchable; this is an afternoon of work
- [ ] **DM 20 of them with their own recent listing's floor plan already rendered.** Highest-conversion action in the entire phase. Do not send a link to a generic demo
- [ ] Ask each one the only question that matters: *"What do you pay for this today, and how long does it take?"* — this is how the Day 4 estimate becomes fact
- [ ] Track: visit → render, render → email, pricing clicks, **and reply rate on the 20 DMs**

**Exit criteria (be honest):** ≥100 renders by people you don't know, ≥15% render→email conversion, ≥10 pricing clicks, **and ≥3 photographers who say they would pay and tell you their current price**. Miss badly and the problem is positioning or buyer, not code. Re-run Phase 1 against individual agents (the broad market underneath) before touching Phase 2 — **not** against designers, who have no product yet.

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
Priced for a reseller: a photographer cares about **cost per plan against what they bill the agent**,
not about a monthly allowance. Offer both, and lead with per-plan.
- [ ] Free: 3 renders, watermarked, "artist's impression" label, no commercial use
- [ ] **Pay-as-you-go credit packs** (e.g. 25 / 100 / 500 plans) — the framing the industry already buys in, and the one the Day 6 pricing page tested
- [ ] Pro $29/mo: 100 renders, clean, commercial license
- [ ] Studio $99/mo: 500 renders, bulk upload, 3 seats, API — **the reseller tier; this is the plan the beachhead is expected to land on**
- [ ] Checkout, customer portal, webhooks (`subscription.updated`, `invoice.paid`, `payment_failed`)
- [ ] Sanity-check per-plan price against the **verified** Day 4 incumbent figures

### Day 18 — Paywall UX
- [ ] Watermark on the free tier only, applied **server-side** (client-side is removable)
- [ ] Keep the "artist's impression — not to scale" label on **every** tier; it is a compliance line, not a free-tier limitation
- [ ] Upgrade prompts at the three real moments: download, second render, variant pack
- [ ] Real `/pricing` page replacing the Phase 1 waitlist version

### Day 19 — Ops
- [ ] Admin view: users, renders, spend, margin per user
- [ ] Churn and failed-payment email flows
- [ ] Verify unit economics: revenue per render vs. Gemini cost per render. **Negative margin means fix pricing before Phase 4**

**Exit:** a stranger can pay you money without you touching anything.

---

## Phase 4 — The features people are paying for (8 days)

Reordered for the beachhead. A photographer shooting ten listings a week does not need six style
variants before they need to process ten plans at once — **bulk is the beachhead's core value prop,
not a late upsell**, so it moves to the front of this phase from its old Day 29 slot. Style variants
and eye-level views stay, because they are what unlocks the designer market later.

### Day 20 — Bulk upload (promoted from Phase 5)
- [ ] Drop 20 plans → queue → progress board → zip download
- [ ] Per-listing folder naming, so output drops straight into a delivery package
- [ ] The single feature that converts a Studio subscription, and the one the beachhead asks for first

### Day 21–22 — Style variants
- [ ] 6 presets: Scandinavian, Japandi, industrial, minimal, warm traditional, mid-century
- [ ] Wire the existing `DesignConfig` / `Material` types into a prompt builder
- [ ] One upload → parallel variant pack → grid result view
- [ ] **This is the gate on the designer market** — variants plus eye-level views are what finally make the product match a designer's deliverable. For the photographer beachhead it is an upsell, not the hook

### Day 23–24 — Perspective / eye-level views
- [ ] New prompt family: interior views from the plan, not just orthographic top-down
- [ ] Room detection → "show me the living room / kitchen / primary bedroom"
- [ ] 5–8 angles per plan as a pack
- [ ] Moves perceived value from "neat" to "worth paying for", and is the second half of the designer-market unlock. Agents will use these as listing hero shots

### Day 25 — Render history
- [ ] Timeline of every render per project (the Day 8 schema already supports it)
- [ ] Compare any two; set any render as the project cover
- [ ] Stop overwriting. Ever

### Day 26 — Iterative refine
- [ ] Text instruction against an existing render: "darker floors", "remove the rug"
- [ ] Chained edits, using the Day 24 history trail
- [ ] This is the retention feature — it keeps people out of Photoshop

### Day 27 — Furnishing control
- [ ] Per-room function override ("this is a nursery, not a bedroom")
- [ ] Furnish / unfurnish toggle
- [ ] Fixes the #1 accuracy complaint you will already be hearing by now

**Exit:** a paying user has a reason to come back next week.

---

## Phase 5 — Defensibility and distribution (6 days)

### Day 28–29 — Branded client-share links
- [ ] Public share URL: logo, project name, before/after slider, render gallery
- [ ] Comment threads, so the *client* lands inside your product
- [ ] Pro: your logo. Studio: custom domain — **white-labelling matters here, because the photographer's client is the agent and the agent's client is the buyer**; our brand should be invisible in that chain
- [ ] Highest-leverage item on this page — every shared render is an ad. The scaffolded `isPublic` / `sharedBy` / `sharedAt` fields finally earn their keep

### Day 30 — PDF / presentation export
- [ ] One click: cover, plan, renders, before/after, branding
- [ ] Architects deliver PDFs, not PNGs. Small feature, justifies the price jump

### Day 31–32 — Public API
- [ ] `POST /v1/renders`, `GET /v1/renders/:id`, webhooks
- [ ] Keyed and metered against the same credit ledger
- [ ] Docs + a Zapier/Make integration
- [ ] Pure margin, near-zero support burden. For this beachhead the integrators are concrete: **floor-plan scan providers (CubiCasa, Matterport), listing-media delivery platforms, and the photographers' own order forms**

### Day 33 — Teams
- [ ] Organizations, seats, shared project library, roles
- [ ] Unblocks media companies with several shooters, and later architecture firms — the real ACV

**Exit:** customers have switching costs, and renders you never see are bringing in new users.

---

## Phase 6 — Real geometry (the moat, 2–3 months — only if pulled)

Not day-planned. Start only when customers ask for measurements or CAD export — **or when advertising-accuracy complaints make hallucinated geometry a business problem rather than a cosmetic one**. That second trigger is the likelier one in real estate, and it is why this phase is the moat rather than a vanity project.

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
6. **Every export carries "artist's impression — not to scale", on every tier, forever.** It is a compliance line in a regulated advertising context, not a free-tier watermark.
7. **Do not pitch designers before Phase 4 or architects before Phase 6.** Today's output is not their deliverable, and a bad first impression on a segment is expensive to undo.
