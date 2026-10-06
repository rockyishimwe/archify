# Roomify → SaaS: Phased Build Plan

**Product:** 3D floor plans for property listings — **the only one that ships proof it matches your plan.**

**Positioning:** not faster, not cheaper. **Checkable.** Speed is table stakes (competitors run 10–30 s,
several free) and per-render price is racing to zero (~$0.04). The one axis nobody in our segment is
competing on is *verifiable geometric fidelity*.

**Beachhead:** **real estate listing photographers and media companies** — businesses that already
produce listing assets, already hold the digitised floor plan, and resell to 30–80 agents each.
Sell them margin on an existing invoice line, not a gadget.

**Market sequence:** listing photographers / media companies (beachhead, a reseller multiplier) →
individual agents and brokerages (the broad market underneath) → interior designers (**only once
Phase 5 ships style variants and eye-level views — today's top-down output is not their deliverable**)
→ architecture firms (**only after Phase 7 gives real geometry; their accuracy bar is a liability bar**).

**Cut from scope:** generic image→mesh, community/social feed, "2D→3D for anything" positioning,
selling a 2D floor plan (CubiCasa gives those away free), competing on speed or per-render price,
and any pitch to architects before Phase 7.

Each day is one sitting. Checkboxes are the unit of progress. Do not start a phase before its
predecessor's exit criteria pass.

---

## Market thesis and competitive landscape

**Researched 2026-10-06.** An earlier version of this section rested on a price/speed wedge. The
research **invalidated that wedge** and replaced it with a narrower, truer one.

### The human incumbents — the gap here is real

| Provider | Product | Price | Turnaround | Input |
| --- | --- | --- | --- | --- |
| BoxBrownie | 3D Full Color floor plan redraw | **US$40 / storey** | **48 h** | **"Almost any type of drawing — from a photo of builder's plans to a quick hand-drawn sketch"** |
| BoxBrownie | 2D redraw (B&W / colour / textured) | $30–35 | 24 h | same |
| BoxBrownie | Custom 3D floor plan | from $200 | 48 h+ | same |
| The 2D3D Floor Plan Company | 3D floor plan, white-label wholesale | from **$79** | 24–48 h | existing plan |

BoxBrownie's *redraw* takes exactly our input and returns exactly our output for **$40 at 48 hours**,
and **bills per image, so a three-storey listing costs $120.** Against humans our advantage is genuine.

### CubiCasa is not a competitor — different input, different job

- **$22.99 (Base) / $29.99 (Plus) per scan**, 24 h, and **base 2D plans are now free and unlimited in the US**.
- Requires a **5–10 minute phone walkthrough of the physical property**. It does not accept a plan image.
- **Implication:** they own "I am standing in the house." We own "I have a plan file and no site access" —
  archived listings, off-market and pre-construction stock, developer plans. Their free 2D tier means
  **never try to sell a 2D plan.**

### The finding that broke the speed wedge

At least nine products already do AI 2D-plan → 3D render, several free, most in 10–30 seconds:

| Product | Speed | Pricing | Note |
| --- | --- | --- | --- |
| Rendair AI | seconds | **$19/mo / 500 credits (~$0.04 per render)** | credits never expire |
| Vizcraft | ~10 s | **free** | "any clean 2D plan, blueprint or CAD export" |
| Edensign | ~10 s | paid, **batch** | markets "ready for MLS" |
| Drafto | ~30 s | subscription, "unlimited renders" | our exact pitch, near-verbatim |
| Archome AI | seconds | commercial licence | **explicitly targets "photographers who resell to agents" — our beachhead** |
| Artificial Studio, Dehome, floor-plan.ai, Homiwork | seconds | free / freemium | |

So: **"60 seconds from a floor plan" is table stakes.** Our speed advantage exists only against human
services, and a buyer comparing us to Vizcraft sees parity at a price of zero.

### The category's shared, documented failure

Independent sources converge on one root cause: these tools treat a plan as **pixels, not as a technical
document**. The model "doesn't know that a large rectangle is a 51 sqm living room and a small rectangle
is a 7 sqm toilet — it just sees shapes and fills them with whatever looks good."

The named symptoms, each of which is **checkable by a buyer holding the original plan**:

- **Walls drift** — "walls sit in the wrong place, the kitchen is a foot too narrow"
- **Invented features** — a freestanding tub, windows the plan does not have
- **Outdoor rooms vanish** — porches, courtyards, balconies disappear entirely
- **Furniture in the wrong rooms** — beds in living rooms, sofas in bedrooms
- **Flat, overlit lighting** not calculated from plan orientation

### Failure map and the attack on each

| Competitor | Their specific failure | Our attack |
| --- | --- | --- |
| **BoxBrownie** | Humans and latency; not self-serve; **per-image billing** | Instant, self-serve, **priced per listing, not per storey** |
| **CubiCasa** | **Needs a physical walkthrough**; useless for off-market, pre-construction, archived or remote stock | "You already have the plan. No second trip." |
| **Rendair / Vizcraft / Dehome / Homiwork / Artificial Studio** | Generic image tools → full geometry drift; no listing workflow; murky commercial licence on free tiers | Verifiable fidelity, listing-grade delivery, clean commercial licence |
| **Drafto** | Same diffusion drift; targets agents *and* developers *and* architects *and* designers — **no depth for any** | Specialise entirely in the listing asset |
| **Edensign** | Closest on workflow, still diffusion so still drifts; no reseller/white-label pipeline | Fidelity + white-label + API |
| **Archome AI** | **Closest on segment**, but a generic AI tool suite with a render endpoint, not a listing pipeline | Fidelity + workflow depth |
| **VirtualSpaces / Aginera** | **Closest on strategy** ("spec-accurate", "data-grounded") — but aimed at designers, developers, architects and homeowners, outputs interior perspectives rather than top-down listing assets, ~2 min, no volume pipeline | Same accuracy principle, aimed at the **listing asset and the reseller, at volume** |

**IP flag, not legal advice:** VirtualSpaces states a **patent with a June 2026 priority date, filed in
150+ countries**, on spec-driven floor-plan-to-3D, plus a year of hand-built floor-plan conventions.
**Phase 7 is gated on a real IP opinion** (see its checkpoint). This is also evidence the ground is valuable.

### What is left to win on

- **Geometry fidelity, proven.** Every diffusion competitor hallucinates, and our render prompt is already
  unusually strict about preserving geometry and stripping text. The only claim a buyer can *check*.
- **Reseller workflow depth**, not the render — bulk, per-listing delivery, white-label, API, per-listing pricing.
- **Compliance posture** in a regulated advertising context.

### Falsification, updated

The original test was "does anyone want this". Nine competitors answer **yes**. The real question is
**"can we beat free?"** Phase 1 answers it with a head-to-head, and Phase 4 turns the answer into the product.
**If we do not win on fidelity, we have no wedge at all** — and that must be discovered in Phase 1, not after.

**Sources:** BoxBrownie pricing and floor-plan pages; CubiCasa pricing via G2 and product pages; Rendair AI
pricing; Vizcraft, Drafto, Edensign, Archome AI, VirtualSpaces, Aginera product and blog pages. Verified 2026-10-06.

---

## The product idea: build the referee before the better player

Everyone's weakness is **unverifiable accuracy**. The obvious response — build more accurate generation —
is slow, hard, and patent-adjacent. The sharper move is to build the **measurement** first.

> **Plan Match Report.** For every render, detect the geometry in the *source plan* and in the *output
> render*, align them, and return a **fidelity score plus flagged discrepancies**: "wall at kitchen/dining
> boundary shifted ~0.4 m", "balcony in plan, missing in render", "window added, not in plan".

Why this is the right first build:

1. **Measuring is far easier than fixing.** Detection *for comparison* is a much smaller problem than full procedural reconstruction.
2. **It is the marketing.** No competitor can publish this number, because theirs would be bad.
3. **It works on top of what exists.** It wraps the current Gemini output; no re-platform needed to prototype.
4. **It gives us the honest out.** Low score → regenerate, flag, or auto-refund the credit. A trust product in a regulated advertising context.
5. **It builds the dataset** that makes Phase 7's real geometry tractable.

They ship an image and hope. **We ship an image and a receipt.**

---

## Phase 0 — Stabilize what exists (3 days) ✅ COMPLETE

Goal: the current Puter build stops embarrassing us, so it can carry a demand test.
Rule: **only fix what survives the re-platform.**

### Day 1 — Visible defects
- [x] `app/root.tsx` — remove the stray `;` rendering as text after `<Outlet />`
- [x] `app/routes/home.tsx` — real `meta()`: title, description, OG image
- [x] `components/Navbar.tsx` — wrap `<a>` in `<li>`; remove the 4 dead nav links
- [x] `app/routes/home.tsx` — remove hardcoded "Community" badge and "By JS Mastery"
- [x] Remove the "Roomify 2.0" announce bar and the dead "Watch Demo" button
- [x] `lib/puter.action.ts` — strip the 3 debug `console.log`s in `getProjectById`
- [x] Decide the name once — **Roomify**. README, `package.json` and UI now agree; the GitHub repo stays `rockyishimwe/archify`

### Day 2 — Upload + export correctness
- [x] `components/Upload.tsx` — delete the local `UploadProps` shadow; honor the `boolean` return so failures surface
- [x] `components/Upload.tsx` — clear existing interval/timeout at the top of `processFile`
- [x] `components/Upload.tsx` — one size limit (10 MB) enforced in code, matching all copy; `accept` aligned with `handleDrop`
- [x] `app/routes/visualizer.$id.tsx` — fix `handleExport`: fetch → blob → object URL → deferred revoke
- [x] `app/routes/home.tsx` — drop the dead, misspelled `initialRendered` navigation state

### Day 3 — Error states and dead code
- [x] Visualizer: failure UI for `generate3DView` — message + Retry button
- [x] Visualizer: 404 state for an unknown `:id`
- [x] Built the missing `AuthRequiredModal`
- [x] `lib/ai.action.ts` — runtime guard on the `txt2img` response shape
- [x] `lib/constants.ts` — deleted the 7 unused exports
- [x] `type.d.ts` — deleted `AppStatus`, `VisualizerProps`, `VisualizerLocationState`, `CardProps`
- [x] `lib/puter.worker.js` — stop overwriting `isPublic: true` on list; sort by `timestamp` desc
- [x] `npm run typecheck && npm run build` clean; committed
- [x] *(folded in)* empty-gallery state; removed the `ButtonProps` shadow and orphaned `RenderCompletePayload`

**Exit:** met — no dead link or silent failure.

---

## Phase 1 — Prove the fidelity claim, then test demand (4 days)

Goal: establish whether we actually beat the free tools on geometry, then find out whether
photographers will pay for that. **The most important phase in the document.**

### Day 4 — The head-to-head (this is now the gate)
- [x] ~~Verify the price assumption~~ **Done 2026-10-06 — see thesis.**
- [ ] **Run the head-to-head.** Same 5 real listing plans through **Roomify, Vizcraft (free), Rendair, Drafto**. Save every output
- [ ] Score each render manually against its source plan on: **wall positions, room count, outdoor rooms preserved, text fully removed, furniture in the correct rooms, invented features**
- [ ] Record the scores in a table in this file. This is the founding dataset for Phase 4
- [ ] **If we do not clearly win on fidelity, stop and write that here.** It is the only ground left. Do not write Day 6 copy on an unverified quality claim
- [ ] Tune `ROOMIFY_RENDER_PROMPT` against the five failure modes and re-score. Prompt work is the cheapest fidelity gain available

### Day 5 — Anonymous generation, watermark, compliance label
- [ ] Allow upload + 1 generation with **no account** (localStorage counter; trivially bypassable, fine for now)
- [ ] Watermark the anonymous render (canvas overlay, bottom-right)
- [ ] **Burn "Artist's impression — not to scale" into every export, on every tier.** Advertising-misrepresentation exposure is real here; this is a compliance line, not a free-tier limitation
- [ ] Gate only the *clean download* and the *second render* behind signup
- [ ] Keep Puter auth as the account layer — just move it *after* the value, not before

### Day 6 — A landing page that sells the checkable claim
- [ ] **Headline leads on fidelity, not speed:** *"3D floor plans that actually match your plan."* Speed is support, never the promise
- [ ] **Put the Day 4 side-by-side on the page.** If we won, this is the entire argument
- [ ] Compare against the **human** incumbent, where our advantage is real: *"$40 and two days at BoxBrownie, or now."* Do not invite comparison against free AI tools on speed
- [ ] Second fold speaks to the reseller: *"Add it to your listing package. Costs you cents, resells at $40."*
- [ ] 3–4 example listing plans, clickable, no upload needed
- [ ] Single CTA: upload. Remove every competing CTA

### Day 7 — Instrument, price, and put it in front of photographers
- [ ] Analytics (PostHog or Plausible): `page_view`, `upload_started`, `render_started`, `render_succeeded`, `render_failed`, `download_clicked`, `signup_started`, `signup_completed`
- [ ] Email capture on the result screen: *"Want bulk upload for a whole listing package? Join the list"*
- [ ] `/pricing` page: **per plan alongside subscription**, anchored on BoxBrownie's $40/storey, testing ~$3–5/plan. Never anchor on Rendair's $0.04. **Price before building billing**
- [ ] Say in the copy what the cheap tools do not do: bulk, per-listing delivery, white-label, API, **a fidelity report**
- [ ] Segment the waitlist by role (photographer / agent / designer / other) — this tests the beachhead choice
- [ ] Deploy (Vercel / Fly — the Dockerfile already works)
- [ ] **Channels, narrowed:** large real-estate-photography Facebook groups, r/RealEstatePhotography, PFRE, a local real-estate-media group, LinkedIn. **Dropped: r/InteriorDesign and r/Architects** — not their deliverable until Phase 5 and Phase 7
- [ ] Build a named list of 50 listing photographers / media companies locally. They are directory-listed; this is an afternoon
- [ ] **DM 20 of them with their own recent listing's plan already rendered.** Highest-conversion action in the phase. Never a generic demo link
- [ ] Ask the two questions that matter: *"What do you pay for this today, and how long does it take?"* and **"Have you tried the free AI tools, and why did you stop?"** — the second answer is the product strategy
- [ ] Track: visit → render, render → email, pricing clicks, **DM reply rate**

**Exit criteria (be honest):** a **documented fidelity win** over Vizcraft and Rendair; ≥100 renders by
strangers; ≥15% render→email; ≥10 pricing clicks; **≥3 photographers who state their current price**.
Miss badly and the problem is positioning or buyer, not code. Re-run against individual agents — **not**
designers, who have no product yet.

---

## Phase 2 — Re-platform onto a real backend (8 days)

Goal: a substrate that can bill, meter, query across users, and not leak AI cost.
Stack: keep React Router 7 (SSR, loaders/actions). Add Postgres (Supabase or Neon), server-side auth,
R2/S3 media, server-side generation.

### Day 8 — Schema and project setup
- [ ] Provision Postgres + object storage
- [ ] Schema: `users`, `projects`, `renders`, `credits_ledger`, `shares`, `api_keys`
- [ ] `renders` carries `style`, `view_type`, `prompt_version`, `status`, `cost_cents`
- [ ] **`renders` also carries `fidelity_score` and `fidelity_report` (jsonb) from day one** — Phase 4 depends on it
- [ ] Migrations + typed client

### Day 9 — Auth
- [ ] Email magic link + Google OAuth. No third-party OS in the funnel
- [ ] Server sessions; move auth out of `root.tsx` client state into a root loader
- [ ] Anonymous → account migration: claim the pre-signup render on signup

### Day 10–11 — Server-side generation
- [ ] Move `generate3DView` behind a server action. **No AI call from the browser, ever again**
- [ ] Job queue + status polling (renders take 10–40 s; do not hold a request open)
- [ ] Per-user rate limit and a hard daily cost ceiling
- [ ] Record every render with its cost — this is margin visibility

### Day 12 — Media pipeline
- [ ] Replace `lib/puter.hosting.ts` with S3/R2 upload + signed URLs
- [ ] Thumbnails for the gallery (it currently loads full-size renders)
- [ ] Delete `lib/puter.hosting.ts`, `lib/puter.worker.js`, `lib/puter.action.ts`, and the `.puter.site` helpers in `lib/utils.ts`

### Day 13 — Port the UI
- [ ] Home gallery and visualizer read from loaders, not `useEffect` fetches (also fixes empty/404 states not appearing in SSR)
- [ ] Remove `@heyputer/puter.js` entirely (also clears the SSR hazard of its top-level imports)

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
- [ ] Credit ledger: grant, spend, refund (a failed render **must** refund)
- [ ] Cost per action: top-down render 1, style-variant pack 4, perspective pack 6
- [ ] Visible balance in the navbar; block + upsell at zero

### Day 17 — Stripe
Priced for a reseller: a photographer cares about **cost per plan against what they bill the agent**.
- [ ] Free: 3 renders, watermarked, "artist's impression" label, no commercial use
- [ ] **Pay-as-you-go credit packs** (25 / 100 / 500 plans) — the framing the industry already buys in
- [ ] Pro $29/mo: 100 renders, clean, commercial licence
- [ ] Studio $99/mo: 500 renders, bulk upload, 3 seats, API — **the reseller tier; the beachhead should land here**
- [ ] **Price per listing, not per storey** — a direct attack on BoxBrownie's per-image billing
- [ ] Sanity-check against **both** anchors: BoxBrownie's $40/storey above us, Rendair's ~$0.04/render below us. **We cannot win the bottom; price for workflow and fidelity, not per-render cost**
- [ ] Checkout, customer portal, webhooks (`subscription.updated`, `invoice.paid`, `payment_failed`)

### Day 18 — Paywall UX
- [ ] Watermark on the free tier only, applied **server-side**
- [ ] Keep "artist's impression — not to scale" on **every** tier
- [ ] Upgrade prompts at the three real moments: download, second render, variant pack
- [ ] Real `/pricing` page replacing the Phase 1 waitlist version

### Day 19 — Ops
- [ ] Admin view: users, renders, spend, margin per user
- [ ] Churn and failed-payment email flows
- [ ] Verify unit economics: revenue per render vs. Gemini cost. **Negative margin means fix pricing before Phase 4**

**Exit:** a stranger can pay you money without you touching anything.

---

## Phase 4 — Plan Match: the differentiator (7 days)

**This is the product.** Promoted ahead of features because it is the only thing in the plan that
nine competitors cannot copy by prompting, and because it converts an unverifiable aesthetic claim
into an artifact the buyer can check. Build the referee before the better player.

### Day 20–21 — Plan geometry extraction
- [ ] CV pass over the **source plan**: wall segments, door openings, window openings, room polygons
- [ ] OCR the dimension text and room labels where present — the plan is a document, not pixels
- [ ] Output a normalised structured representation (rooms, areas, adjacencies, openings)
- [ ] Validate against the Day 4 plan set; this is why that dataset exists

### Day 22 — Render geometry extraction and alignment
- [ ] Same detection pass over the **output render**
- [ ] Register the two representations to a common scale and origin
- [ ] Handle the honest failure case: when alignment confidence is low, say so rather than scoring badly

### Day 23 — Fidelity score and discrepancy list
- [ ] Score components: wall-position deviation, room count match, **outdoor rooms preserved**, openings added or lost, residual text detected
- [ ] Human-readable discrepancies: *"wall at kitchen/dining boundary shifted ~0.4 m"*, *"balcony in plan, missing in render"*, *"window added, not in plan"*
- [ ] Persist to `renders.fidelity_score` / `fidelity_report`

### Day 24 — The Plan Match Report (the receipt)
- [ ] Overlay view: source plan and render geometry, discrepancies highlighted
- [ ] Shareable, exportable report attached to every render — **the thing no competitor can publish**
- [ ] Surfaced in bulk output too, so a photographer can triage 20 listings at a glance

### Day 25 — Act on the score
- [ ] Auto-regenerate below a threshold, up to N attempts, keeping the best score
- [ ] **Auto-refund the credit** when we cannot clear the bar. Trust product, not a render endpoint
- [ ] Surface the score pre-download so nobody ships a bad render unknowingly

### Day 26 — Geometry-locked generation
- [ ] Feed the extracted geometry back into generation: extrude walls/openings procedurally, constrain the diffusion pass to materials and furnishing **inside locked geometry**
- [ ] **Geometry from CV, beauty from diffusion** — the hybrid, and the honest route to a fidelity claim
- [ ] A/B against the unconstrained pass using the Day 23 score. Keep whichever actually wins

**Exit:** every render ships with a score and a report; we can state a fidelity number publicly and
defend it; low-fidelity renders never reach a customer silently.

---

## Phase 5 — Attack the named defects, then widen (9 days)

Each item here is a **documented competitor failure**, not a feature wish.

### Day 27 — Bulk upload
- [ ] Drop 20 plans → queue → progress board → zip download
- [ ] **Per-listing folder naming**, so output drops straight into a delivery package
- [ ] **Multi-storey billed as one listing** — directly attacks BoxBrownie's $40-per-image model
- [ ] The feature that converts a Studio subscription, and the one the beachhead asks for first

### Day 28 — Outdoor rooms and text removal, as guarantees
- [ ] **Porches, balconies, courtyards and patios preserved** — the category loses these entirely
- [ ] **Guaranteed full text removal**, asserted by the Phase 4 score, not just requested in the prompt
- [ ] Regression suite over the Day 4 plan set so these never silently regress

### Day 29 — Room-function correction
- [ ] Per-room function override: *"this is a nursery, not a bedroom"*
- [ ] Furnish / unfurnish toggle
- [ ] Kills the documented "beds in living rooms, sofas in bedrooms" complaint

### Day 30–31 — Style variants
- [ ] 6 presets: Scandinavian, Japandi, industrial, minimal, warm traditional, mid-century
- [ ] Wire the existing `DesignConfig` / `Material` types into a prompt builder
- [ ] One upload → parallel variant pack → grid result view
- [ ] **The gate on the designer market**; for the photographer beachhead it is an upsell, not the hook

### Day 32–33 — Perspective / eye-level views
- [ ] New prompt family: interior views from the plan, not only orthographic top-down
- [ ] Room detection (Phase 4 already provides it) → "show me the living room / kitchen / primary bedroom"
- [ ] 5–8 angles per plan as a pack; agents use these as listing hero shots
- [ ] Second half of the designer-market unlock

### Day 34 — Render history
- [ ] Timeline of every render per project (the Day 8 schema supports it)
- [ ] Compare any two; set any render as the project cover
- [ ] Stop overwriting. Ever

### Day 35 — Iterative refine
- [ ] Text instruction against an existing render: "darker floors", "remove the rug"
- [ ] Chained edits using the Day 34 history trail
- [ ] **Re-score after every edit** so refinement cannot quietly destroy fidelity
- [ ] The retention feature — it keeps people out of Photoshop

**Exit:** a paying user has a reason to come back next week, and each of the five documented category
defects has a named counter.

---

## Phase 6 — Reseller distribution (6 days)

### Day 36–37 — Branded client-share links
- [ ] Public share URL: logo, project name, before/after slider, render gallery, **Plan Match Report**
- [ ] Comment threads, so the *client* lands inside your product
- [ ] Pro: your logo. Studio: custom domain — **white-labelling matters because our brand should be invisible in the photographer → agent → buyer chain**
- [ ] Every shared render is an ad. The scaffolded `isPublic` / `sharedBy` / `sharedAt` fields finally earn their keep

### Day 38 — PDF / presentation export
- [ ] One click: cover, plan, renders, before/after, **fidelity report**, branding
- [ ] Agents and firms deliver PDFs, not PNGs. Small feature, justifies the price jump

### Day 39–40 — Public API
- [ ] `POST /v1/renders`, `GET /v1/renders/:id`, webhooks; fidelity score in the response
- [ ] Keyed and metered against the same credit ledger
- [ ] Docs + a Zapier/Make integration
- [ ] Concrete integrators for this segment: **floor-plan scan providers (CubiCasa, Matterport), listing-media delivery platforms, and photographers' own order forms**

### Day 41 — Teams
- [ ] Organisations, seats, shared project library, roles
- [ ] Unblocks media companies with several shooters, and later architecture firms — the real ACV

**Exit:** customers have switching costs, and renders you never see are bringing in new users.

---

## Phase 7 — Full geometry and CAD (2–3 months — gated)

Phase 4 already builds the detection front half. This phase takes it to true dimensioned output.

### Gate before any work starts
- [ ] **Obtain a real IP opinion.** VirtualSpaces states a patent with a **June 2026 priority date filed in
      150+ countries** on spec-driven floor-plan-to-3D. Our hybrid differs, but this is a question for a
      lawyer, not an assumption. **Do not commit a quarter of engineering before this is answered**

### Then
- [ ] Procedural extrusion → dimensioned glTF
- [ ] In-browser walkthrough (Three.js / R3F)
- [ ] Measurements, areas, material quantities
- [ ] Export to SketchUp / Revit / IFC — where firms actually spend money
- [ ] AR mobile view (sales feature)

**Three triggers, any one of which starts it:** customers asking for measurements or CAD export;
advertising-accuracy complaints making hallucinated geometry a business problem; or Phase 4's scores
showing fidelity is the axis buyers judge on. In a commoditised render market the third arrives first.

Expansion order, if it comes: elevations / facade → site plans & landscaping → commercial & retail
layouts → full CAD. Expand along the customer's workflow, never along the technology.

---

## Standing rules

1. **Phase 1's exit criteria are a gate, not a formality.** A failed fidelity test means changing the product, not writing more code.
2. **No AI calls from the browser after Phase 2.** Unmeterable and uncapped.
3. **Every action that burns a credit must refund on failure** — including a failed fidelity bar.
4. Check margin per render at the end of every phase.
5. Ship behind a flag, measure, then remove the flag.
6. **Every export carries "artist's impression — not to scale", on every tier, forever.** A compliance line in a regulated advertising context, not a watermark.
7. **Do not pitch designers before Phase 5 or architects before Phase 7.** Today's output is not their deliverable, and a bad first impression on a segment is expensive to undo.
8. **Never compete on speed or per-render price.** Nine AI-native competitors are at 10–30 s and ~$0.04/render, some free. Compete on fidelity, reseller workflow and compliance.
9. **Never sell a 2D floor plan.** CubiCasa gives them away free and unlimited in the US.
10. **Never publish a fidelity claim we have not measured.** The whole strategy is that our number is checkable; one inflated claim destroys it.
