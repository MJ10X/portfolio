import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Glyph, type GlyphShape } from "@/components/site/glyph";
import type { DetailPoint } from "@/components/site/detail-modal";
import { useLabMedia } from "@/hooks/use-lab-media";

const EASE_CINE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_CINE } },
};

const pad = (n: number) => String(n).padStart(2, "0");
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Left panel: a video/gallery stage with thumbnails, or an abstract visual when there's no media yet. */
function MediaStage({
  no,
  name,
  tag,
  shape,
}: {
  no: string;
  name: string;
  tag: string;
  shape: GlyphShape;
}) {
  const found = useLabMedia(no);
  const [failed, setFailed] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  const items = found.filter((m) => !failed.includes(m.src));
  const total = items.length;
  const index = Math.min(active, Math.max(total - 1, 0));
  const current = items[index];

  const go = useCallback(
    (dir: number) => {
      if (total > 1) setActive((index + dir + total) % total);
    },
    [index, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const markFailed = (src: string) => setFailed((f) => [...f, src]);

  return (
    <div className="flex flex-col bg-card lg:h-full lg:min-h-0 lg:border-r lg:border-border">
      <div className="flex items-center justify-between px-6 py-4 pr-16 lg:pr-6">
        <span className="label">
          <span className="!text-primary">{no}</span> / {tag}
        </span>
        {total > 0 ? (
          <span className="label">
            {pad(index + 1)} / {pad(total)}
          </span>
        ) : null}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden border-y border-border bg-background lg:aspect-auto lg:min-h-0 lg:flex-1">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-pitch)" }}
        />
        {/* HUD corner ticks */}
        {[
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "bottom-3 left-3 border-b border-l",
          "bottom-3 right-3 border-b border-r",
        ].map((c) => (
          <span
            key={c}
            className={`pointer-events-none absolute z-10 h-4 w-4 border-primary/50 ${c}`}
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={current?.src ?? "glyph"}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_CINE }}
            className="absolute inset-0"
          >
            {!current ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="w-full max-w-md">
                  <Glyph shape={shape} />
                </div>
              </div>
            ) : current.type === "video" ? (
              <video
                src={current.src}
                className="pointer-events-none h-full w-full object-contain"
                aria-label={`${name} demo`}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                preload="auto"
                onError={() => markFailed(current.src)}
              />
            ) : (
              <>
                <img
                  src={current.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                />
                <img
                  src={current.src}
                  alt={`${name} screenshot ${index + 1}`}
                  className="relative h-full w-full object-contain"
                  onError={() => markFailed(current.src)}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-border bg-background/60 backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-border bg-background/60 backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex gap-2 overflow-x-auto p-3">
          {items.map((m, i) => (
            <button
              key={m.src}
              type="button"
              aria-label={`Show ${m.type} ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden border transition-opacity ${
                i === index ? "border-primary" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              {m.type === "video" ? (
                <>
                  <video
                    src={`${m.src}#t=0.1`}
                    className="pointer-events-none h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-background/40">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                </>
              ) : (
                <img src={m.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="h-3" />
      )}
    </div>
  );
}

function SectionLabel({ index, title }: { index: number; title: string }) {
  return (
    <p className="label mb-5 flex items-center gap-3">
      <span className="!text-primary">{pad(index)}</span>
      <span>{title}</span>
      <span className="h-px flex-1 bg-border" />
    </p>
  );
}

export function LabModal({
  trigger,
  no,
  name,
  tag,
  shape,
  details = [],
  highlights,
  meta,
  stack = [],
  demoUrl,
  demoLabel = "View live",
  githubUrl,
}: {
  /** The clickable card that opens the modal. */
  trigger: ReactNode;
  no: string;
  name: string;
  tag: string;
  /** Abstract visual shown until the project has images or a video. */
  shape: GlyphShape;
  /** Overview paragraphs. */
  details?: string[] | undefined;
  highlights?: DetailPoint[] | undefined;
  /** Mono line under the title (supervisor, course, etc). */
  meta?: string | undefined;
  stack?: string[] | undefined;
  demoUrl?: string | undefined;
  demoLabel?: string | undefined;
  githubUrl?: string | undefined;
}) {
  const hasLinks = Boolean(demoUrl || githubUrl);

  // Sections are numbered by what's actually present.
  const sections: { title: string; body: ReactNode }[] = [];
  if (details.length > 0) {
    sections.push({
      title: "Overview",
      body: (
        <div className="space-y-4">
          {details.map((t) => (
            <p key={t} className="leading-relaxed text-muted-foreground">
              {t}
            </p>
          ))}
        </div>
      ),
    });
  }
  if (highlights && highlights.length > 0) {
    sections.push({
      title: "Highlights",
      body: (
        <ol className="space-y-5">
          {highlights.map((pt, i) => (
            <li
              key={typeof pt === "string" ? pt : pt.title}
              className="grid grid-cols-[auto_1fr] gap-4"
            >
              <span className="pt-0.5 font-mono text-xs !text-primary">{pad(i + 1)}</span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {typeof pt === "string" ? (
                  pt
                ) : (
                  <>
                    <span className="block text-foreground">{pt.title}</span>
                    {capitalize(pt.text)}
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      ),
    });
  }
  if (stack.length > 0) {
    sections.push({
      title: "Built with",
      body: (
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {s}
            </span>
          ))}
        </div>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex h-[90vh] max-h-[90vh] w-[94vw] max-w-6xl flex-col gap-0 overflow-hidden rounded-none border-border bg-background p-0 shadow-none sm:rounded-none">
        {/* Mobile: the whole modal scrolls as one. Desktop: media left, content scrolls right. */}
        <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-[1.15fr_1fr] lg:grid-rows-1 lg:overflow-hidden">
          <MediaStage no={no} name={name} tag={tag} shape={shape} />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col p-8 md:p-10 lg:h-full lg:min-h-0 lg:overflow-y-auto"
          >
            <motion.div variants={item} className="pr-8">
              <span className="inline-block border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider !text-primary">
                {tag}
              </span>
              <DialogTitle className="display-md mt-5 font-display font-normal tracking-tight text-foreground">
                {name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {tag} project: {name}
              </DialogDescription>
              {meta ? (
                <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">
                  {meta}
                </p>
              ) : null}
            </motion.div>

            {sections.map((s, i) => (
              <motion.section key={s.title} variants={item} className="mt-10">
                <SectionLabel index={i + 1} title={s.title} />
                {s.body}
              </motion.section>
            ))}

            {hasLinks ? (
              <motion.div variants={item} className="mt-auto flex flex-wrap gap-3 pt-12">
                {demoUrl ? (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label border border-primary px-5 py-3 !text-primary transition-colors hover:bg-primary hover:!text-primary-foreground"
                  >
                    {demoLabel} →
                  </a>
                ) : null}
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label border border-border px-5 py-3 transition-colors hover:border-primary hover:!text-primary"
                  >
                    GitHub →
                  </a>
                ) : null}
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
