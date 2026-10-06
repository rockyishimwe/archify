import { useNavigate, useOutletContext, useParams} from "react-router";
import {useEffect, useRef, useState} from "react";
import {generate3DView} from "../../lib/ai.action";
import {Box, Download, RefreshCcw, Share2, X} from "lucide-react";
import Button from "../../components/ui/Button";
import {createProject, getProjectById} from "../../lib/puter.action";
import {composeExport} from "../../lib/watermark";
import {ReactCompareSlider, ReactCompareSliderImage} from "react-compare-slider";

const VisualizerId = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userId, isSignedIn } = useOutletContext<AuthContext>()

    const hasInitialGenerated = useRef(false);

    const [project, setProject] = useState<DesignItem | null>(null);
    const [isProjectLoading, setIsProjectLoading] = useState(true);

    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const [isExporting, setIsExporting] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);

    const [renderError, setRenderError] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    const handleBack = () => navigate('/');

    const triggerDownload = (href: string) => {
        const link = document.createElement('a');
        link.href = href;
        link.download = `roomify-${id || 'design'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExport = async () => {
        if (!currentImage || isExporting) return;

        setIsExporting(true);
        setExportError(null);

        let objectUrl: string | null = null;

        try {
            // Always burn the compliance label in. Watermark only while signed
            // out, i.e. the free tier.
            const composed = await composeExport(currentImage, {
                watermark: !isSignedIn,
            });

            if (composed) {
                objectUrl = URL.createObjectURL(composed);
                triggerDownload(objectUrl);
                return;
            }

            // Compositing failed (tainted canvas / no CORS headers). Fall back to
            // the raw render rather than failing the export, but say so.
            setExportError(
                'Downloaded without the "not to scale" label — the label could not be applied to this render.'
            );

            // `download` is ignored for cross-origin URLs, which would navigate
            // away instead of saving. Data URLs can be used directly.
            if (currentImage.startsWith('data:')) {
                triggerDownload(currentImage);
                return;
            }

            const response = await fetch(currentImage);
            if (!response.ok) throw new Error(`Download failed: ${response.status}`);

            objectUrl = URL.createObjectURL(await response.blob());
            triggerDownload(objectUrl);
        } catch (error) {
            console.error('Export failed: ', error);
            setExportError('Could not download the render. Please try again.');
        } finally {
            // Revoking synchronously can cancel the download that was just started.
            if (objectUrl) {
                const url = objectUrl;
                setTimeout(() => URL.revokeObjectURL(url), 10_000);
            }
            setIsExporting(false);
        }
    }

    const runGeneration = async (item: DesignItem) => {
        if(!id || !item.sourceImage) return;

        try {
            setIsProcessing(true);
            setRenderError(null);
            const result = await generate3DView({ sourceImage: item.sourceImage });

            if(result.renderedImage) {
                setCurrentImage(result.renderedImage);

                const updatedItem = {
                    ...item,
                    renderedImage: result.renderedImage,
                    renderedPath: result.renderedPath,
                    timestamp: Date.now(),
                    ownerId: item.ownerId ?? userId ?? null,
                    isPublic: item.isPublic ?? false,
                }

                const saved = await createProject({ item: updatedItem, visibility: "private" })

                if(saved) {
                    setProject(saved);
                    setCurrentImage(saved.renderedImage || result.renderedImage);
                }
            } else {
                setRenderError('The render came back empty. Please try again.');
            }
        } catch (error) {
            console.error('Generation failed: ', error)
            setRenderError(
                error instanceof Error
                    ? error.message
                    : 'Rendering failed. Please try again.'
            );
        } finally {
            setIsProcessing(false);
        }
    }

    const handleRetry = () => {
        if (!project || isProcessing) return;
        void runGeneration(project);
    };

    useEffect(() => {
        let isMounted = true;

        const loadProject = async () => {
            if (!id) {
                setIsProjectLoading(false);
                return;
            }

            setIsProjectLoading(true);
            setNotFound(false);
            setRenderError(null);

            const fetchedProject = await getProjectById({ id });

            if (!isMounted) return;

            setProject(fetchedProject);
            setNotFound(!fetchedProject);
            setCurrentImage(fetchedProject?.renderedImage || null);
            setIsProjectLoading(false);
            hasInitialGenerated.current = false;
        };

        loadProject();

        return () => {
            isMounted = false;
        };
    }, [id]);

    useEffect(() => {
        if (
            isProjectLoading ||
            hasInitialGenerated.current ||
            !project?.sourceImage
        )
            return;

        if (project.renderedImage) {
            setCurrentImage(project.renderedImage);
            hasInitialGenerated.current = true;
            return;
        }

        hasInitialGenerated.current = true;
        void runGeneration(project);
    }, [project, isProjectLoading]);

    if (!isProjectLoading && (notFound || !id)) {
        return (
            <div className="visualizer">
                <nav className="topbar">
                    <div className="brand">
                        <Box className="logo" />
                        <span className="name">Roomify</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleBack} className="exit">
                        <X className="icon" /> Exit Editor
                    </Button>
                </nav>

                <section className="content">
                    <div className="panel">
                        <div className="empty-state">
                            <h2>Project not found</h2>
                            <p>
                                This project does not exist, or it belongs to a different
                                Puter account. Check that you are signed in to the account
                                that created it.
                            </p>
                            <Button onClick={handleBack}>Back to projects</Button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="visualizer">
            <nav className="topbar">
                <div className="brand">
                    <Box className="logo" />

                    <span className="name">Roomify</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleBack} className="exit">
                    <X className="icon" /> Exit Editor
                </Button>
            </nav>

            <section className="content">
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-meta">
                            <p>Project</p>
                            <h2>{project?.name || `Residence ${id}`}</h2>
                            <p className="note">Created by You</p>
                        </div>

                        <div className="panel-actions">
                            <Button
                                size="sm"
                                onClick={handleExport}
                                className="export"
                                disabled={!currentImage || isExporting}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                {isExporting ? 'Preparing...' : 'Export'}
                            </Button>
                            <Button size="sm" onClick={() => {}} className="share">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {exportError && (
                        <p className="panel-error" role="alert">{exportError}</p>
                    )}

                    {renderError && (
                        <div className="panel-error is-actionable" role="alert">
                            <span>{renderError}</span>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleRetry}
                                disabled={isProcessing}
                            >
                                <RefreshCcw className="w-4 h-4 mr-2" /> Try again
                            </Button>
                        </div>
                    )}

                    <div className={`render-area ${isProcessing ? 'is-processing': ''}`}>
                        {currentImage ? (
                            <img src={currentImage} alt="AI Render" className="render-img" />
                        ) : (
                            <div className="render-placeholder">
                                {project?.sourceImage && (
                                    <img src={project?.sourceImage} alt="Original" className="render-fallback" />
                                )}
                            </div>
                        )}

                        {isProcessing && (
                            <div className="render-overlay">
                                <div className="rendering-card">
                                    <RefreshCcw className="spinner" />
                                    <span className="title">Rendering...</span>
                                    <span className="subtitle">Generating your 3D visualization</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                <div className="panel compare">
                    <div className="panel-header">
                        <div className="panel-meta">
                            <p>Comparison</p>
                            <h3>Before and After</h3>
                        </div>
                        <div className="hint">Drag to compare</div>
                    </div>

                    <div className="compare-stage">
                        {project?.sourceImage && currentImage ? (
                            <ReactCompareSlider
                                defaultValue={50}
                                style={{ width: '100%', height: 'auto' }}
                                itemOne={
                                    <ReactCompareSliderImage src={project?.sourceImage} alt="before" className="compare-img" />
                                }
                                itemTwo={
                                    <ReactCompareSliderImage src={currentImage} alt="after" className="compare-img" />
                                }
                            />
                        ) : (
                            <div className="compare-fallback">
                                {project?.sourceImage && (
                                    <img src={project.sourceImage} alt="Before" className="compare-img" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
export default VisualizerId
