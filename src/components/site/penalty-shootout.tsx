import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";

type TargetId = "about" | "work" | "lab" | "now" | "contact";

type Target = {
  id: TargetId;
  label: string;
  /** position inside the goal frame, in % of the stage */
  x: number;
  y: number;
  to: "/about" | "/work" | "/lab" | "/now" | "/contact";
  note: string;
};

const TARGETS: Target[] = [
  { id: "about", label: "About", x: 30, y: 34, to: "/about", note: "how he thinks" },
  { id: "work", label: "Work", x: 50, y: 27, to: "/work", note: "what he builds" },
  { id: "lab", label: "Lab", x: 70, y: 34, to: "/lab", note: "what if?" },
  { id: "now", label: "Now", x: 36, y: 50, to: "/now", note: "today" },
  { id: "contact", label: "Contact", x: 64, y: 50, to: "/contact", note: "say hello" },
];

const SPOT = { x: 50, y: 78 };

export function PenaltyShootout() {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  // Off to the side of every target so nothing shows as pre-aimed before the
  // player actually moves the reticle.
  const [aim, setAim] = useState({ x: 50, y: 62 });
  const [ball, setBall] = useState(SPOT);
  const [flying, setFlying] = useState(false);
  const [hit, setHit] = useState<Target | null>(null);
  const [leaving, setLeaving] = useState(false);

  const point = useCallback((clientX: number, clientY: number) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100));
    const y = Math.min(66, Math.max(14, ((clientY - r.top) / r.height) * 100));
    setAim({ x, y });
  }, []);

  const shoot = useCallback(() => {
    if (flying || leaving) return;
    setFlying(true);
    setBall({ x: aim.x, y: aim.y });

    const target = TARGETS.reduce<{ t: Target; d: number } | null>((best, t) => {
      const d = Math.hypot(t.x - aim.x, (t.y - aim.y) * 1.4);
      return !best || d < best.d ? { t, d } : best;
    }, null);

    window.setTimeout(() => {
      if (target && target.d < 14) {
        setHit(target.t);
        window.setTimeout(() => setLeaving(true), 420);
        window.setTimeout(() => navigate({ to: target.t.to }), 1100);
      } else {
        window.setTimeout(() => {
          setBall(SPOT);
          setFlying(false);
        }, 320);
      }
    }, 620);
  }, [aim, flying, leaving, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        shoot();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shoot]);

  const scale = flying ? 0.35 : 1;

  return (
    <div
      ref={stageRef}
      onMouseMove={(e) => point(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) point(t.clientX, t.clientY);
      }}
      onClick={shoot}
      role="application"
      aria-label="Penalty shootout navigation. Aim with your cursor and click to shoot at a section."
      className="relative h-[86vh] min-h-[520px] w-full cursor-crosshair overflow-hidden select-none"
    >
      {/* stadium light + fog */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-pitch)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[120%] -translate-x-1/2 opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 40%, color-mix(in oklab, var(--haze) 30%, transparent) 50%, transparent 60%)",
        }}
      />
      {/* pitch floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] [perspective:600px]">
        <div
          className="absolute inset-0 origin-bottom opacity-25"
          style={{
            transform: "rotateX(72deg)",
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "8% 14%",
          }}
        />
      </div>

      {/* goal frame */}
      <div className="pointer-events-none absolute left-1/2 top-[16%] h-[44%] w-[74%] max-w-[1000px] -translate-x-1/2">
        <div className="absolute inset-0 border-x border-t border-foreground/25" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "3.2% 8%",
          }}
        />
      </div>

      {/* targets */}
      {TARGETS.map((t) => {
        const active = Math.hypot(t.x - aim.x, (t.y - aim.y) * 1.4) < 14 && !flying;
        const isHit = hit?.id === t.id;
        return (
          <div
            key={t.id}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            <div
              className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-500 md:h-20 md:w-20 ${
                isHit
                  ? "scale-[3] border-primary bg-primary/20 opacity-0"
                  : active
                    ? "border-primary bg-primary/10"
                    : "border-foreground/25"
              }`}
              style={active ? { boxShadow: "var(--glow-accent)" } : undefined}
            >
              <span
                className={`pulse-ring absolute inset-0 rounded-full border ${active ? "border-primary" : "border-foreground/15"}`}
              />
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase">{t.label}</span>
            </div>
            <span
              className={`label mt-3 block transition-opacity duration-500 ${active ? "opacity-100 !text-primary" : "opacity-0"}`}
            >
              {t.note}
            </span>
          </div>
        );
      })}

      {/* reticle */}
      {!flying && (
        <div
          className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 transition-transform duration-75"
          style={{ left: `${aim.x}%`, top: `${aim.y}%` }}
        >
          <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-primary/60" />
          <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/60" />
        </div>
      )}

      {/* ball */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: `${ball.x}%`,
          top: `${ball.y}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: flying
            ? "left 620ms cubic-bezier(.2,.6,.3,1), top 620ms cubic-bezier(.3,.1,.4,1), transform 620ms cubic-bezier(.2,.6,.3,1)"
            : "left 320ms ease, top 320ms ease, transform 320ms ease",
          filter: flying ? "blur(1.5px)" : "none",
        }}
      >
        <div
          className="h-8 w-8 rounded-full bg-foreground md:h-10 md:w-10"
          style={{ boxShadow: "var(--glow-soft)" }}
        />
        <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-foreground/15 blur-[2px]" />
      </div>

      {/* prompt */}
      <AnimatePresence>
        {!flying && !hit && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-x-0 bottom-8 text-center"
          >
            <p className="display-md !text-base font-mono tracking-[0.35em] uppercase text-primary">
              Take your shot →
            </p>
            <p className="label mt-3">Aim with your cursor · click or press space</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* section wipe */}
      <AnimatePresence>
        {leaving && hit && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 40%)" }}
            animate={{ clipPath: "circle(140% at 50% 40%)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-background"
          >
            <span className="display-lg text-primary">{hit.label.toUpperCase()}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
