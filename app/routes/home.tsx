import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import Upload from "../../components/Upload";
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

    const { isSignedIn } = useOutletContext<AuthContext>();

    const handleUploadComplete = async (base64Image: string) => {
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

                      <Upload onComplete={handleUploadComplete} />
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
      </div>
  )
}
