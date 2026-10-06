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

**Why this segment, in one line:** the top-down 3D floor plan is an existing, already-purchased listing
asset ($40/storey at 48 h from BoxBrownie), and photographers are the reseller multiplier inside it.
**But see the thesis below — the speed wedge is gone**; nine AI-native competitors already render in
10–30 seconds and some are free, so we win on geometry fidelity and reseller workflow or not at all.

**Cut from scope:** generic image→mesh, community/social feed, "2D→3D for anything" positioning,
and any pitch to architects before Phase 6.

Each day is one sitting. Checkboxes are the unit of progress. Do not start a phase before its predecessor's exit criteria pass.

---

## Market thesis and competitive landscape

**Researched 2026-10-06.** The earlier version of this section carried a low-confidence price estimate.
It has been replaced with verified figures, and one finding **invalidates the original wedge**.

### The human incumbents — our estimate was right, and the gap is real

| Provider | Product | Price | Turnaround | Input |
| --- | --- | --- | --- | --- |
| BoxBrownie | 3D Full Color floor plan redraw | **US$40 / storey** | **48 h** | **"Almost any type of drawing — from a photo of builder's plans to a quick hand-drawn sketch"** |
| BoxBrownie | 2D redraw (B&W / colour / textured) | $30–35 | 24 h | same |
| BoxBrownie | Custom 3D floor plan | from $200 | 48 h+ | same |
| The 2D3D Floor Plan Company | 3D floor plan, white-label wholesale | from **$79** | 24–48 h | existing plan |

BoxBrownie's floor-plan *redraw* takes exactly our input and returns exactly our output, for **$40 at
48 hours**. Against human services the speed and cost advantage is genuine and large.

### CubiCasa is not a competitor — different input, different job

- **$22.99 (Base) / $29.99 (Plus) per scan**, 24 h turnaround, and **base 2D plans are now free and
  unlimited in the US**.
- But it requires a **5–10 minute phone walkthrough of the physical property**. It does not accept an
  existing 2D plan image.
- **Implication:** CubiCasa owns "I am standing in the house." We own "I have a plan file and no site
  access" — archived listings, off-market and pre-construction stock, developer plans, anything already
  drawn. That is a real segmentation, not a weakness. Their free 2D tier does, however, mean **never try
  to sell a 2D plan.**

### The finding that breaks the original wedge: the AI-native category already exists

At least nine products already do AI 2D-plan → 3D render, several with free tiers, most in 10–30 seconds:

| Product | Speed | Pricing | Note |
| --- | --- | --- | --- |
| Rendair AI | seconds | **$19/mo / 500 credits (~$0.04 per render)**; $49/1500; $190/7500 | Credits never expire |
| Vizcraft | ~10 s | **free** | "any clean 2D plan, blueprint or CAD export" |
| Edensign | ~10 s | paid, **batch processing** | markets "ready for MLS" |
| Drafto | ~30 s | subscription, "unlimited renders" | same pitch as ours, verbatim |
| Archome AI | seconds | commercial licence | **explicitly targets "real estate photographers who resell to agents" — our beachhead** |
| Artificial Studio, Dehome, floor-plan.ai, Homiwork | seconds | free / freemium | |

**Three consequences, stated plainly:**

1. **"60 seconds from a floor plan" is not a differentiator. It is table stakes.** The Day 5 headline cannot
   rest on speed. Our speed advantage is only over *human* services, and the buyer comparing us to
   Vizcraft sees parity at a price of zero.
2. **The planned pricing is uncompetitive.** Pro at $29 / 100 renders is ~$0.29 per render against
   Rendair's ~$0.04. Phase 3 pricing must be rebuilt around this, not around BoxBrownie's $40.
3. **The beachhead is already contested** — Archome AI markets to precisely the reseller segment, and
   white-labelling is already shipped by CubiCasa, The 2D3D Floor Plan Company and Halo Renders.

### What is actually left to win on

Speed is gone and price is a race to zero, so the defensible ground is narrower and more specific:

- **Geometry fidelity.** Every diffusion-based competitor hallucinates walls, and our render prompt is
  unusually strict about preserving plan geometry and stripping text. This is the one claim that is
  *measurable and checkable* by a buyer: "does the render match the plan I gave you?" It is also the
  claim that **Phase 6's CV pipeline would own outright**, because prompting cannot get there.
- **Reseller workflow depth, not the render.** Bulk queue, per-listing folder naming, API into an
  existing order form, white-label delivery, predictable per-listing cost. Competitors have one or two of
  these; a complete reseller pipeline is a thinner field than a render endpoint.
- **Compliance posture.** "Artist's impression — not to scale" on every export, and an explicit accuracy
  stance, in a segment where advertising misrepresentation is regulated.

**The strategic revision:** Phase 6 (real, CV-derived geometry) moves from "the moat, later, only if
pulled" to **the actual differentiator, and the reason this company survives a price war**. It should be
pulled forward the moment Phase 1 confirms that fidelity is what buyers complain about.

### Risks, restated

- **MLS / advertising misrepresentation.** Regulated accuracy in property advertising; hallucinated
  geometry is real exposure. Mitigated by the label from Day 4, and argues again for Phase 6.
- **Commodity collapse.** The render itself trends to free. If the only product is a render endpoint, there
  is no business — hence workflow depth and fidelity, not speed.
- **Segment too small locally.** The reseller multiplier cuts both ways; individual agents are the broad
  market underneath.

### Falsification, updated

The original test was "does anyone want this". Nine funded competitors answer that: **yes**. The real
question is now **"can we beat free?"** Phase 1 must therefore include a head-to-head: run the same five
plans through Roomify, Vizcraft and Rendair, and have photographers pick blind. If we do not win on
fidelity, we have no wedge at all and the plan needs rethinking before Phase 2 — not after.

**Sources:** BoxBrownie pricing and floor-plan pages; CubiCasa pricing via G2 and product pages; Rendair
AI pricing; Vizcraft, Drafto, Edensign, Archome AI product pages. Verified 2026-10-06.

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
- [x] ~~Verify the price assumption~~ **Done 2026-10-06 — see the thesis section. BoxBrownie 3D = $40/storey at 48 h from the same input we take; CubiCasa needs an on-site scan so it is not a comparable; but nine AI-native competitors already render in 10–30 s, some free, and Rendair is ~$0.04/render.**
- [ ] **Run the head-to-head, because speed is no longer the wedge.** Put the same 5 listing plans through Roomify, Vizcraft (free), Rendair and Drafto. Save all outputs side by side. Score each on: does the geometry match the plan, is all text removed, are rooms furnished sensibly
- [ ] **If we do not clearly win on geometry fidelity, stop and say so here.** That is the only ground left to win on, and discovering it in Phase 1 is cheap. Do not proceed to Day 5 copy on an unverified quality claim
- [ ] Allow upload + 1 generation with **no account** (localStorage counter; trivially bypassable, fine for now)
- [ ] Watermark the anonymous render (canvas overlay, bottom-right)
- [ ] **Burn "Artist's impression — not to scale" into every export, on every tier.** Advertising-misrepresentation exposure is real in this segment, and this is standard industry practice. Not a Phase 3 item
- [ ] Gate only the *clean download* and the *second render* behind signup
- [ ] Keep Puter auth as the account layer for now — just move it *after* the value, not before

### Day 5 — A landing page that sells one thing to one buyer
- [ ] **Headline commits to the segment and to fidelity, not speed** — speed is table stakes now (competitors run 10–30 s, some free). Lead on the checkable claim: *"3D floor plans that actually match your plan."* Keep the turnaround as support, not as the promise. Kill "AI-first design environment" and anything about creativity
- [ ] Hero = a real before/after of a **recognisably residential listing plan**, above the fold. Not an abstract or architectural-competition plan
- [ ] Second fold speaks to the reseller, not the end client: *"Add it to your listing package. Costs you cents, resells at $40."*
- [ ] 3–4 example listing plans users can click to try without uploading anything
- [ ] Single CTA: upload. Remove every competing CTA
- [ ] Compare against the **human** incumbent, where our advantage is real: *"$40 and two days at BoxBrownie, or now."* Do **not** invite comparison against the free AI tools on speed
- [ ] If the Day 4 head-to-head produced a clear fidelity win, **put the side-by-side on the page**. It is the only defensible claim we have

### Day 6 — Instrumentation and priced waitlist
- [ ] Analytics (PostHog or Plausible): `page_view`, `upload_started`, `render_started`, `render_succeeded`, `render_failed`, `download_clicked`, `signup_started`, `signup_completed`
- [ ] Email capture on the result screen, pitched at the segment: *"Want bulk upload for a whole listing package? Join the list"*
- [ ] A `/pricing` page framed the way the industry already buys — **per plan alongside the subscription**. Anchor against the **human** incumbent ($40/storey at BoxBrownie), not against Rendair's ~$0.04/render, and test ~$3–5/plan. **Price before building billing**; the clicks are the signal
- [ ] Note in the page copy what the cheap AI tools do not do: bulk, per-listing delivery, white-label, API
- [ ] Separate the waitlist by self-declared role (photographer / agent / designer / other). This tells you whether the beachhead choice was right

### Day 7 — Put it in front of photographers specifically
- [ ] Deploy (Vercel / Fly — the Dockerfile already works)
- [ ] **Channels, narrowed to the segment:** the large real-estate-photography Facebook groups, r/RealEstatePhotography, PFRE (Photography For Real Estate), a local real-estate-media Slack or WhatsApp group, LinkedIn. **Dropped: r/InteriorDesign and r/Architects — the product is not their deliverable until Phase 4 and Phase 6 respectively**
- [ ] Build a named list of 50 listing photographers / media companies in the target geography. They are directory-listed and searchable; this is an afternoon of work
- [ ] **DM 20 of them with their own recent listing's floor plan already rendered.** Highest-conversion action in the entire phase. Do not send a link to a generic demo
- [ ] Ask each one the two questions that matter: *"What do you pay for this today, and how long does it take?"* and **"Have you tried the free AI floor-plan tools, and why did you stop?"** — the second answer is the whole product strategy
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
- [ ] Sanity-check per-plan price against **both** anchors: the human incumbent ($40/storey) above us, and Rendair at ~$0.04/render below us. We cannot win the bottom; price for workflow value, not per-render cost

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

## Phase 6 — Real geometry (the moat, 2–3 months — now the primary differentiator)

> **Revised after the 2026-10-06 competitor research.** Speed is table stakes and per-render price is
> racing to zero, so a prompt-based render endpoint is not a business. CV-derived geometry is the one
> thing nine diffusion competitors cannot prompt their way to, and it is what turns "a render" into
> measurements, quantities and CAD export. **Pull this forward the moment Phase 1 confirms fidelity is
> what buyers complain about** — do not treat it as optional.

Not day-planned. Three triggers, any one of which starts it: customers asking for measurements or CAD export; advertising-accuracy complaints making hallucinated geometry a business problem; **or the Phase 1 head-to-head showing that fidelity is the axis buyers judge on.** In a commoditised render market the third is the likeliest, and it arrives early.

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
8. **Never compete on speed or per-render price.** Nine AI-native competitors are at 10–30 seconds and ~$0.04/render, some free. Compete on geometry fidelity, reseller workflow and compliance.
9. **Never sell a 2D floor plan.** CubiCasa gives them away free and unlimited in the US.
