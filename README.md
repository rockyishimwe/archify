<div align="center">
  <h1>Roomify</h1>
  <p><b>Turn 2D floor plans into photorealistic 3D renders with AI.</b></p>

  <p>
    <img src="https://img.shields.io/badge/-React%2019-61DAFB?style=for-the-badge&logo=React&logoColor=black" />
    <img src="https://img.shields.io/badge/-React%20Router%207-CA4245?style=for-the-badge&logo=React-Router&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" />
    <br/>
    <img src="https://img.shields.io/badge/-Vite%207-646CFF?style=for-the-badge&logo=Vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-Puter-A855F7?style=for-the-badge&logo=Puter&logoColor=white" />
    <img src="https://img.shields.io/badge/-Gemini-4285F4?style=for-the-badge&logo=Google-Gemini&logoColor=white" />
  </p>
</div>

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [How It Works](#how-it-works)
5. [Project Structure](#project-structure)
6. [Quick Start](#quick-start)
7. [Deploying the Puter Worker](#worker)
8. [Scripts](#scripts)
9. [Roadmap](#roadmap)

## <a name="introduction">✨ Introduction</a>

**Roomify** is an AI-first architectural visualization app. Upload a flat 2D floor plan and it returns a
photorealistic, top-down 3D render of the same space — walls extruded, doors opened, windows glazed, and
furniture placed only where the plan actually indicates it. A drag-to-compare slider puts the original plan
and the finished render side by side.

There is no traditional backend. Roomify runs on **[Puter](https://puter.com)**, an "internet OS" that supplies
authentication, key-value storage, file storage, static hosting, and hosted AI models directly from the
browser — so each user's data lives in their own Puter account. The only server-side piece is a small Puter
Worker that persists project metadata per user.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[React 19](https://react.dev/)** — component-based UI library.
- **[React Router 7](https://reactrouter.com/)** — used in framework mode with SSR enabled; handles routing, data flow, and the server build.
- **[TypeScript](https://www.typescriptlang.org/)** — static typing across the app; shared types live in a single ambient `type.d.ts`.
- **[Vite 7](https://vite.dev/)** — dev server and production bundler.
- **[Tailwind CSS 4](https://tailwindcss.com/)** — wired in via `@tailwindcss/vite`, alongside a hand-written stylesheet in `app/app.css`.
- **[Puter](https://puter.com)** — cloud platform providing serverless Workers, file storage, KV storage, static hosting, and AI model access.
- **[Puter.js](https://docs.puter.com/)** — the browser SDK (`@heyputer/puter.js`) used for auth, storage, hosting, and AI calls.
- **[Gemini](https://deepmind.google/technologies/gemini/)** — `gemini-2.5-flash-image-preview`, accessed through Puter's AI gateway, performs the 2D-to-3D image generation.
- **[lucide-react](https://lucide.dev/)** — icon set.
- **[react-compare-slider](https://react-compare-slider.vercel.app/)** — the before/after comparison slider.

## <a name="features">🔋 Features</a>

👉 **2D-to-3D Visualization** — a strict, purpose-built prompt converts floor plans into orthographic top-down renders that preserve the original geometry, strip all text and annotations, and map plan icons to real furniture.

👉 **Puter Authentication** — sign in with a Puter account; uploads and project history are gated behind it, and auth state is shared app-wide through React Router's outlet context.

👉 **Persistent Media Hosting** — every source image and render is written to Puter file storage and served from your own `*.puter.site` subdomain, so projects survive reloads with stable public URLs instead of fragile base64 blobs.

👉 **Project Gallery** — your saved visualizations on the home page, newest first, with thumbnails and dates.

👉 **Side-by-Side Comparison** — drag the slider to wipe between the original plan and the AI render.

👉 **Automatic Generation** — opening a project with no render yet kicks off generation once, guarded against duplicate runs, and saves the result back automatically.

👉 **One-Click Export** — download any finished render as a PNG.

👉 **Drag-and-Drop Upload** — JPG/PNG drop zone with progress feedback and cleanup-safe timers.

## <a name="how-it-works">🧠 How It Works</a>

1. **Sign in** with Puter via the navbar.
2. **Upload** a floor plan (`components/Upload.tsx`) — it is read as a data URL in the browser.
3. **A project is created** (`createProject` in `lib/puter.action.ts`): the source image is uploaded to Puter
   hosting, and the project record is saved through the Puter Worker into your per-user KV store.
4. **You are routed to `/visualizer/:id`**, which loads the project and — if no render exists yet — calls
   `generate3DView` (`lib/ai.action.ts`). That sends the plan plus the render prompt from `lib/constants.ts`
   to Gemini through `puter.ai.txt2img` at 1024x1024.
5. **The render is hosted and saved back** to the same project record, then displayed with the comparison
   slider and an export button.

## <a name="project-structure">📁 Project Structure</a>

```
app/
  root.tsx                  # shell + auth state, shared via outlet context
  routes.ts                 # route table
  routes/home.tsx           # landing page, upload, project gallery
  routes/visualizer.$id.tsx # render view + before/after comparison
  app.css                   # application styles
components/
  Navbar.tsx                # branding, nav, sign in / out
  Upload.tsx                # drag-and-drop uploader with progress
  ui/Button.tsx             # variant + size button primitive
lib/
  ai.action.ts              # Gemini image generation via Puter AI
  puter.action.ts           # auth helpers + project CRUD against the Worker
  puter.hosting.ts          # subdomain provisioning + image uploads
  puter.worker.js           # the Puter Worker (deployed separately)
  constants.ts              # config, storage paths, render prompt
  utils.ts                  # image / blob / data-URL helpers
type.d.ts                   # global ambient types
```

## <a name="quick-start">🤸 Quick Start</a>

**Prerequisites**

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) 20 or newer
- [npm](https://www.npmjs.com/)
- A free [Puter](https://puter.com) account

**Clone the repository**

```bash
git clone https://github.com/rockyishimwe/archify.git roomify
cd roomify
```

**Install dependencies**

```bash
npm install
```

**Set up environment variables**

Create a `.env` file in the project root:

```env
VITE_PUTER_WORKER_URL="https://your-worker-url.puter.work"
```

This points at the Puter Worker that stores your projects — see [below](#worker) for how to deploy it.
Without it the app still renders and generates images, but nothing is persisted: saves become no-ops and
the gallery stays empty.

**Run the dev server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## <a name="worker">☁️ Deploying the Puter Worker</a>

`lib/puter.worker.js` is **not** bundled with the frontend — it runs on Puter and exposes three routes,
each scoped to the signed-in user's own KV store:

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/projects/save` | Create or update a project record |
| `GET` | `/api/projects/list` | List all of the user's projects |
| `GET` | `/api/projects/get?id=` | Fetch a single project by id |

To set it up: create a Worker in your Puter account, use the contents of `lib/puter.worker.js` as its
source, deploy it, then copy the resulting URL into `VITE_PUTER_WORKER_URL` and restart the dev server.

## <a name="scripts">📜 Scripts</a>

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (client + server bundles) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Generate route types and run `tsc` |

A multi-stage `Dockerfile` is included for containerized deployment.

## <a name="roadmap">🗺️ Roadmap</a>

- [ ] **Sharing and community feed** — the Share button and the public / private fields are scaffolded but not yet wired up.
- [ ] **Material and style controls** — swap floors, walls, and design styles before rendering.
- [ ] **Render history** — keep multiple generations per project instead of overwriting.
- [ ] **Project renaming and deletion.**

---

<div align="center">
  Built by <a href="https://github.com/rockyishimwe">rockyishimwe</a>.
</div>
