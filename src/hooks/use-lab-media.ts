import { useEffect, useState } from "react";

export type LabMediaItem = { type: "video" | "image"; src: string };

const VIDEO_EXTENSIONS = ["mp4", "webm"];
const IMAGE_EXTENSIONS = ["jpeg", "jpg", "png", "webp", "gif"];
const MAX_IMAGES = 8;

// Remembers what was found per project so reopening a modal doesn't re-probe.
const cache = new Map<string, LabMediaItem[]>();

/** HEAD-probes `<base>.<ext>` for every extension in parallel; first hit in list order wins. */
async function findFile(
  base: string,
  extensions: string[],
  signal: AbortSignal,
): Promise<string | null> {
  const hits = await Promise.all(
    extensions.map(async (ext) => {
      const url = `${base}.${ext}`;
      try {
        const res = await fetch(url, { method: "HEAD", signal });
        // The dev server answers unknown paths with its own HTML page, so
        // text/html counts as "not there".
        const type = res.headers.get("content-type") ?? "";
        return res.ok && !type.includes("text/html") ? url : null;
      } catch {
        return null;
      }
    }),
  );
  return hits.find((url): url is string => url !== null) ?? null;
}

/**
 * Finds a Lab project's media in public/labs_assets/, keyed by its
 * number ("L03" -> "l_03"):
 *   l_03.mp4 | .webm          one looping video (shown first)
 *   l_03_1.jpeg, l_03_2.jpg …  gallery images, numbered from 1 until a gap
 * Results appear progressively as they're found.
 */
export function useLabMedia(no: string): LabMediaItem[] {
  const key = no.toLowerCase().replace(/^l/, "l_");
  const [items, setItems] = useState<LabMediaItem[]>(cache.get(key) ?? []);

  useEffect(() => {
    const cached = cache.get(key);
    if (cached) {
      setItems(cached);
      return;
    }

    const ctrl = new AbortController();
    const base = `/labs_assets/${key}`;
    let video: LabMediaItem | null = null;
    const images: LabMediaItem[] = [];
    const publish = () => {
      if (!ctrl.signal.aborted) setItems(video ? [video, ...images] : [...images]);
    };

    const findVideo = findFile(base, VIDEO_EXTENSIONS, ctrl.signal).then((src) => {
      if (src) video = { type: "video", src };
      publish();
    });

    const findImages = (async () => {
      for (let i = 1; i <= MAX_IMAGES; i++) {
        const src = await findFile(`${base}_${i}`, IMAGE_EXTENSIONS, ctrl.signal);
        if (!src) break;
        images.push({ type: "image", src });
        publish();
      }
    })();

    Promise.all([findVideo, findImages]).then(() => {
      if (ctrl.signal.aborted) return;
      cache.set(key, video ? [video, ...images] : [...images]);
    });

    return () => ctrl.abort();
  }, [key]);

  return items;
}
