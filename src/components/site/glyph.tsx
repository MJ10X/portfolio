export type GlyphShape = "grid" | "orbit" | "map" | "cards" | "flow";

/** Abstract stand-in visual, used wherever a project has no image yet. */
export function Glyph({ shape }: { shape: GlyphShape }) {
  const base = "absolute inset-0 opacity-70";
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-card">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-pitch)" }}
      />
      {shape === "orbit" && (
        <div className={base}>
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
          <div className="pulse-ring absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary" />
        </div>
      )}
      {shape === "map" && (
        <div className={base}>
          <div
            className="absolute inset-6 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "12% 16%",
            }}
          />
          <span
            className="absolute left-[36%] top-[58%] h-3 w-3 rounded-full bg-primary"
            style={{ boxShadow: "var(--glow-accent)" }}
          />
          <span className="pulse-ring absolute left-[34%] top-[56%] h-6 w-6 rounded-full border border-primary" />
        </div>
      )}
      {shape === "grid" && (
        <div className={`${base} flex items-center justify-center gap-3`}>
          {[-12, -4, 4, 12].map((r) => (
            <span
              key={r}
              className="h-28 w-20 border border-primary/40"
              style={{ transform: `rotate(${r}deg)` }}
            />
          ))}
        </div>
      )}
      {shape === "cards" && (
        <div className={`${base} flex flex-col justify-center gap-3 p-10`}>
          {[90, 60, 35].map((w) => (
            <span key={w} className="h-2 bg-primary/40" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}
      {shape === "flow" && (
        <div className={`${base} flex items-center justify-center`}>
          <svg viewBox="0 0 200 120" className="h-2/3 w-2/3">
            <path
              d="M10 60 C 60 10, 90 110, 140 60 S 190 20, 195 60"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1"
            />
            <circle cx="140" cy="60" r="3" fill="var(--primary)" />
          </svg>
        </div>
      )}
    </div>
  );
}
