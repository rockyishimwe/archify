import puter from "@heyputer/puter.js";
import {ROOMIFY_RENDER_PROMPT} from "./constants";

export const fetchAsDataUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * puter.ai.txt2img is documented as resolving to an <img> element, but the
 * gateway has also been seen returning a bare URL string or a wrapper object.
 * Probe the known shapes rather than asserting one, so an unexpected response
 * surfaces as an error instead of silently becoming `undefined`.
 */
const extractImageUrl = (response: unknown): string | null => {
    if (!response) return null;

    if (typeof response === "string") return response || null;

    if (typeof HTMLImageElement !== "undefined" && response instanceof HTMLImageElement) {
        return response.src || null;
    }

    if (typeof response === "object") {
        const candidate = response as Record<string, unknown>;

        for (const key of ["src", "url", "image_url", "output", "data"]) {
            const value = candidate[key];
            if (typeof value === "string" && value) return value;
        }
    }

    return null;
};

export const generate3DView = async ({ sourceImage }: Generate3DViewParams) => {
    const dataUrl = sourceImage.startsWith('data:')
        ? sourceImage
        : await fetchAsDataUrl(sourceImage);

    const base64Data = dataUrl.split(',')[1];
    const mimeType = dataUrl.split(';')[0].split(':')[1];

    if(!mimeType || !base64Data) throw new Error('Invalid source image payload');

    const response = await puter.ai.txt2img(ROOMIFY_RENDER_PROMPT, {
        provider: "gemini",
        model: "gemini-2.5-flash-image-preview",
        input_image: base64Data,
        input_image_mime_type: mimeType,
        ratio: { w: 1024, h: 1024 },
    });

    const rawImageUrl = extractImageUrl(response);

    if (!rawImageUrl) {
        console.error('Unrecognised txt2img response shape', response);
        throw new Error('The model did not return an image. Please try again.');
    }

    const renderedImage = rawImageUrl.startsWith('data:')
    ? rawImageUrl : await fetchAsDataUrl(rawImageUrl);

    return { renderedImage, renderedPath: undefined };
}
