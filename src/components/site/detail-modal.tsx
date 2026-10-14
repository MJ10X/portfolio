import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** A plain bullet, or a bullet with a bold lead-in ("Mood Kit,  …"). */
export type DetailPoint = string | { title: string; text: string };

export function DetailModal({
  trigger,
  no,
  name,
  headline,
  body,
  points,
  meta,
  stack = [],
  images,
  fallback,
  demoUrl,
  demoLabel = "View live",
  githubUrl,
}: {
  /** The clickable card/button that opens the modal. */
  trigger: ReactNode;
  no: string;
  name: string;
  /** Optional big line under the title. */
  headline?: ReactNode;
  /** One paragraph, or several. */
  body?: string | string[] | undefined;
  points?: DetailPoint[] | undefined;
  /** Short mono line under the body,  role, category, whatever fits. */
  meta?: string | undefined;
  stack?: string[] | undefined;
  /** 2-3 screenshots; falls back to `fallback` when empty, or nothing at all. */
  images?: string[] | undefined;
  fallback?: ReactNode;
  demoUrl?: string | undefined;
  /** Text for the demo link, e.g. "Play Store". Defaults to "View live". */
  demoLabel?: string | undefined;
  githubUrl?: string | undefined;
}) {
  const hasLinks = Boolean(demoUrl || githubUrl);
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-h-[85vh] w-[92vw] max-w-4xl flex-col gap-0 overflow-hidden rounded-none border-border bg-background p-0 shadow-none sm:rounded-none">
        <DialogHeader className="shrink-0 space-y-0 border-b border-border p-8 pb-6 text-left md:p-10 md:pb-6">
          <div className="flex items-baseline gap-4 pr-6">
            <span className="label !text-primary">{no}</span>
            <DialogTitle className="display-md font-display font-normal tracking-tight text-foreground">
              {name}
            </DialogTitle>
          </div>
          {/* Radix wants a description for a11y; hide it visually when there's no headline. */}
          <DialogDescription
            className={
              headline
                ? "mt-4 max-w-[52ch] text-lg leading-snug tracking-tight text-foreground"
                : "sr-only"
            }
          >
            {headline ?? `Details for ${name}`}
          </DialogDescription>
        </DialogHeader>

        {/* Separate scroll region: the header stays put, only this scrolls.
            min-h-0 is required here,  without it a flex child won't shrink
            below its content size, so overflow-y-auto silently does nothing. */}
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-8 pt-6 md:p-10 md:pt-6">
          {images && images.length > 0 ? (
            <div className="mx-auto grid max-w-sm grid-cols-2 gap-2 sm:max-w-md sm:grid-cols-3">
              {images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${name} screenshot ${i + 1}`}
                  className="aspect-[4/3] w-full border border-border object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          ) : fallback ? (
            <div className="mx-auto max-w-sm">{fallback}</div>
          ) : null}

          {paragraphs.map((text) => (
            <p key={text} className="leading-relaxed text-muted-foreground">
              {text}
            </p>
          ))}

          {points && points.length > 0 ? (
            <ul className="space-y-4 border-l border-border pl-5">
              {points.map((pt) => (
                <li
                  key={typeof pt === "string" ? pt : pt.title}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {typeof pt === "string" ? (
                    pt
                  ) : (
                    <>
                      <span className="text-foreground">{pt.title}</span>,  {pt.text}
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : null}

          {meta ? (
            <p className="font-mono text-xs leading-relaxed text-muted-foreground">{meta}</p>
          ) : null}

          {stack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : null}

          {hasLinks ? (
            <div className="flex gap-6 border-t border-border pt-6">
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label !text-primary hover:opacity-70"
                >
                  {demoLabel} →
                </a>
              ) : null}
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label !text-primary hover:opacity-70"
                >
                  GitHub →
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
