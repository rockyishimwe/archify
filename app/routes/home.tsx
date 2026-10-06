import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import Upload from "../../components/Upload";
import Button from "../../components/ui/Button";
import AuthRequiredModal from "../../components/AuthRequiredModal";
import {useNavigate, useOutletContext} from "react-router";
import {useEffect, useRef, useState} from "react";
import {createProject, getProjects} from "../../lib/puter.action";
import {MAX_FILE_SIZE_MB} from "../../lib/constants";

const TITLE = "Roomify — Photoreal renders from floor plans, in 60 seconds";
const DESCRIPTION =
  "Upload a 2D floor plan and get a photorealistic top-down 3D render back in under a minute. Walls extruded, doors opened, furniture placed. No CAD, no waiting on a studio.";
const OG_IMAGE = "/readme/readme-hero.webp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: TITLE },
    { name: "description", content: DESCRIPTION },

    { property: "og:type", content: "website" },
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:image", content: OG_IMAGE },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export default function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<DesignItem[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const isCreatingProjectRef = useRef(false);

    const { isSignedIn, signIn } = useOutletContext<AuthContext>();

    // A plan uploaded while signed out. Held in memory until the visitor signs
    // in: Puter forces authentication before any AI call, so we cannot render
    // anonymously on this stack (see ROADMAP Phase 2 Day 10-11).
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
    const [pendingError, setPendingError] = useState<string | null>(null);

    const createAndOpen = async (base64Image: string) => {
        try {
            if(isCreatingProjectRef.current) return false;
            isCreatingProjectRef.current = true;
            const newId = Date.now().toString();
            const name = `Residence ${newId}`;

            const newItem = {
                id: newId, name, sourceImage: base64Image,
                renderedImage: undefined,
                timestamp: Date.now()
            }

            const saved = await createProject({ item: newItem, visibility: 'private' });

            if(!saved) {
                console.error("Failed to create project");
                return false;
            }

            setProjects((prev) => [saved, ...prev]);

            // The visualizer loads the project by id, so no navigation state is needed.
            navigate(`/visualizer/${newId}`);

            return true;
        } finally {
            isCreatingProjectRef.current = false;
        }
    }

    const handleUploadComplete = async (base64Image: string) => {
        // Uploading is open to everyone; the account is asked for at the moment
        // of value instead of before it.
        if (!isSignedIn) {
            setPendingImage(base64Image);
            setPendingError(null);
            return true;
        }

        return createAndOpen(base64Image);
    }

    const handleRenderPending = async () => {
        if (!pendingImage) return;

        setIsAuthPromptOpen(false);
        setPendingError(null);

        try {
            const signedIn = await signIn();
            if (!signedIn) {
                setPendingError("Sign in was cancelled. Your plan is still here.");
                return;
            }

            const created = await createAndOpen(pendingImage);
            if (!created) {
                setPendingError("We could not start your project. Please try again.");
                return;
            }

            setPendingImage(null);
        } catch (e) {
            console.error(`Puter sign in failed: ${e}`);
            setPendingError("Sign in failed. Please try again.");
        }
    }

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const items = await getProjects();
                if (!isMounted) return;
                setProjects(items);
            } finally {
                if (isMounted) setIsLoadingProjects(false);
            }
        }

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, [isSignedIn]);

  return (
      <div className="home">
          <Navbar />

          <section className="hero">
              <h1>Photoreal renders from your floor plans, in 60 seconds</h1>

              <p className="subtitle">
                  Upload a 2D plan. Get a photorealistic top-down 3D render back — walls extruded, doors opened, furniture placed. No CAD, no waiting on a studio.
              </p>

              <div className="actions">
                  <a href="#upload" className="cta">
                      Render my floor plan <ArrowRight className="icon" />
                  </a>
              </div>

              <div id="upload" className="upload-shell">
                <div className="grid-overlay" />

                  <div className="upload-card">
                      <div className="upload-head">
                          <div className="upload-icon">
                              <Layers className="icon" />
                          </div>

                          <h3>Upload your floor plan</h3>
                          <p>Supports JPG, PNG, and WebP up to {MAX_FILE_SIZE_MB} MB</p>
                      </div>

                      {pendingImage ? (
                          <div className="pending-plan">
                              <img src={pendingImage} alt="Your floor plan" className="pending-preview" />

                              <div className="pending-copy">
                                  <h4>Your plan is ready to render</h4>
                                  <p>
                                      Renders are stored in your own Puter account, so you keep
                                      every file. Creating one is free.
                                  </p>

                                  {pendingError && (
                                      <p className="pending-error" role="alert">{pendingError}</p>
                                  )}

                                  <div className="pending-actions">
                                      <Button onClick={() => setIsAuthPromptOpen(true)}>
                                          Render this plan
                                      </Button>
                                      <button
                                          type="button"
                                          className="pending-cancel"
                                          onClick={() => {
                                              setPendingImage(null);
                                              setPendingError(null);
                                          }}
                                      >
                                          Choose a different plan
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <Upload onComplete={handleUploadComplete} />
                      )}
                  </div>
              </div>
          </section>

          <section id="projects" className="projects">
              <div className="section-inner">
                  <div className="section-head">
                      <div className="copy">
                          <h2>Projects</h2>
                          <p>Every plan you have rendered, newest first.</p>
                      </div>
                  </div>

                  {!isLoadingProjects && projects.length === 0 && (
                      <div className="empty-state">
                          <h2>{isSignedIn ? "No projects yet" : "Sign in to see your projects"}</h2>
                          <p>
                              {isSignedIn
                                  ? "Upload a floor plan above and your first render will show up here."
                                  : "Your plans and renders are stored in your own Puter account."}
                          </p>
                          <a href="#upload" className="cta">Upload a floor plan</a>
                      </div>
                  )}

                  <div className="projects-grid">
                      {projects.map(({id, name, renderedImage, sourceImage, timestamp}) => (
                          <div key={id} className="project-card group" onClick={() => navigate(`/visualizer/${id}`)}>
                              <div className="preview">
                                  <img src={renderedImage || sourceImage} alt={name || "Project"} />

                                  {!renderedImage && (
                                      <div className="badge">
                                          <span>Plan only</span>
                                      </div>
                                  )}
                              </div>

                              <div className="card-body">
                                  <div>
                                      <h3>{name}</h3>

                                      <div className="meta">
                                          <Clock size={12} />
                                          <span>{new Date(timestamp).toLocaleDateString()}</span>
                                      </div>
                                  </div>
                                  <div className="arrow">
                                      <ArrowUpRight size={18} />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          <AuthRequiredModal
              isOpen={isAuthPromptOpen}
              onConfirm={handleRenderPending}
              onCancel={() => setIsAuthPromptOpen(false)}
              title="Create a free account to render"
              description="Roomify renders run on your own Puter account, so your plans and renders stay yours. It takes a few seconds and costs nothing."
              confirmLabel="Continue with Puter"
          />
      </div>
  )
}
