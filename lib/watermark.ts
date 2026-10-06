import {COMPLIANCE_LABEL, WATERMARK_TEXT} from "./constants";

/**
 * Burns the compliance label (and optionally a watermark) into a render.
 *
 * The label is a compliance requirement, not a free-tier limitation: property
 * advertising is regulated on accurate depiction, and an AI render of a floor
 * plan is an impression, not a survey. It goes on every tier, forever.
 *
 * Client-side compositing is removable by a determined user. That is accepted
 * for now — Phase 3 moves watermarking server-side. The label is cheap
 * insurance in the meantime, not a DRM mechanism.
 */

type ComposeOptions = {
    /** Adds the diagonal product watermark. Free tier only. */
    watermark?: boolean;
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        // Required to read cross-origin renders back out of the canvas.
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image for compositing"));
        img.src = src;
    });

const drawComplianceLabel = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
) => {
    // Scale with the image so the label is legible at any render size.
    const fontSize = Math.max(11, Math.round(width * 0.016));
    const padX = Math.round(fontSize * 0.9);
    const padY = Math.round(fontSize * 0.6);
    const barHeight = fontSize + padY * 2;

    ctx.save();

    ctx.font = `600 ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    const textWidth = ctx.measureText(COMPLIANCE_LABEL).width;
    const barWidth = textWidth + padX * 2;
    const x = 0;
    const y = height - barHeight;

    ctx.fillStyle = "rgba(0, 0, 0, 0.62)";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillText(COMPLIANCE_LABEL, x + padX, y + barHeight / 2);

    ctx.restore();
};

const drawWatermark = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
) => {
    const fontSize = Math.max(28, Math.round(width * 0.075));

    ctx.save();

    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.atan2(height, width));

    ctx.font = `800 ${fontSize}px system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.18)";
    ctx.lineWidth = Math.max(1, fontSize * 0.02);

    ctx.fillText(WATERMARK_TEXT, 0, 0);
    ctx.strokeText(WATERMARK_TEXT, 0, 0);

    ctx.restore();
};

/**
 * Returns a PNG blob of `src` with the compliance label burned in.
 * Returns null if compositing is impossible (no DOM, blocked canvas read),
 * so callers can fall back to the original rather than fail the export.
 */
export const composeExport = async (
    src: string,
    { watermark = false }: ComposeOptions = {},
): Promise<Blob | null> => {
    if (typeof window === "undefined" || typeof document === "undefined") return null;

    try {
        const img = await loadImage(src);

        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (!width || !height) return null;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        ctx.drawImage(img, 0, 0, width, height);

        if (watermark) drawWatermark(ctx, width, height);
        drawComplianceLabel(ctx, width, height);

        return await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob) => resolve(blob), "image/png");
        });
    } catch {
        // A tainted canvas (missing CORS headers on the host) lands here.
        return null;
    }
};
