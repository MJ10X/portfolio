import { useState } from "react";
import { motion } from "motion/react";

const EASE_CINE = [0.16, 1, 0.3, 1] as const;

// Cropped tightly around the mark's own bounding box (source viewBox was 0 0 595 842).
const VIEW_BOX = "130 205 295 315";

// Lengths are the paths' own total perimeter (straight segments + the closing
// Z), computed ahead of time rather than measured via getTotalLength() in an
// effect. Setting stroke-dasharray/dashoffset from the very first render (SSR
// included) matters here: CSS animation-delay changes made *after* an
// animation has already started (as a post-mount effect would) aren't
// reliably honored by browsers, which was making the draw finish instantly.
//
// START_DELAY holds the strokes back until the title + subtext (which finish
// fading in around 2.4s, see index.tsx) have fully loaded, so the sequence
// reads as: text first, then the logo draws itself in.
const START_DELAY = 2.4;
const DRAW_PATHS = [
  {
    id: "top",
    d: "M153.54 229.3 L275.58 313.74 L399.83 228.36 L400.30 285.65 L275.62 366.39 L201.38 317.62 L202.04 369.51 L153.39 369.04 Z",
    length: 834.11,
    duration: 2,
    delay: START_DELAY,
  },
  {
    id: "bottom",
    d: "M153.41 392.67 L253.25 392.29 L203.19 437.48 L203.17 460.21 L355.97 460.50 L355.19 340.36 L399.79 314.43 L400.27 496 L152.56 495.69 Z",
    length: 1046.85,
    duration: 2,
    delay: START_DELAY + 1.35,
  },
] as const;

const FINAL_PATHS = [
  "m153.41 392.67 l99.84-0.38 -50.06 45.19 -0.02 22.73 152.8 0.29 -0.78-120.14 44.6-25.93 0.48 181.57 -247.71-0.31z",
  "m153.54 229.3 l122.04 84.44 124.25-85.38 0.47 57.29 -124.68 80.74 -74.24-48.77 0.66 51.89 -48.65-0.47z",
];

// drawing -> the two strokes trace themselves in, outline only
// centering -> layout animation carries it from beside the title to screen-center, still outline only
// revealing -> once centered, the outline fades out as the solid mark fades/scales in
// blinking -> two on/off cycles, ending invisible right as the game takes over
type Phase = "drawing" | "centering" | "revealing" | "blinking" | "done";

export function IntroLogo({
  onCenterStart,
  onComplete,
}: {
  /** Fires the instant the mark starts moving to center, so callers can fade out surrounding UI. */
  onCenterStart?: () => void;
  /** Fires once the final blink lands invisible,  the cue to swap in the next scene. */
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("drawing");
  const centered = phase !== "drawing";
  const filled = phase === "revealing" || phase === "blinking" || phase === "done";

  return (
    <motion.div
      layout
      aria-hidden="true"
      transition={{ duration: 0.8, ease: EASE_CINE }}
      onLayoutAnimationComplete={() => {
        if (phase === "centering") setPhase("revealing");
      }}
      className={
        centered
          ? "fixed left-1/2 top-1/2 z-40 aspect-[59/63] w-56 -translate-x-1/2 -translate-y-1/2 md:w-[450px]"
          : "relative aspect-[59/63] w-20 shrink-0 md:w-28 lg:w-96"
      }
    >
      <motion.svg
        viewBox={VIEW_BOX}
        className="h-full w-full overflow-visible"
        animate={
          phase === "blinking"
            ? { opacity: [1, 1, 0, 1, 0] }
            : phase === "done"
              ? { opacity: 0 }
              : { opacity: 1 }
        }
        transition={
          phase === "blinking"
            ? { duration: 1.1, times: [0, 0.2, 0.45, 0.7, 1], ease: "easeInOut" }
            : { duration: 0.2 }
        }
        onAnimationComplete={() => {
          if (phase === "blinking") {
            setPhase("done");
            onComplete?.();
          }
        }}
      >
        <motion.g
          animate={{ opacity: filled ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {DRAW_PATHS.map(({ id, d, length, duration, delay }) => (
            <path
              key={id}
              d={d}
              className="intro-logo__draw-line"
              style={
                {
                  "--length": length,
                  "--duration": `${duration}s`,
                  "--delay": `${delay}s`,
                } as React.CSSProperties
              }
              onAnimationEnd={() => {
                if (id === "bottom" && phase === "drawing") {
                  onCenterStart?.();
                  setPhase("centering");
                }
              }}
            />
          ))}
        </motion.g>
        <motion.g
          fill="var(--color-foreground)"
          fillRule="evenodd"
          style={{ transformOrigin: "center" }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={filled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          onAnimationComplete={() => {
            if (phase === "revealing") setPhase("blinking");
          }}
        >
          {FINAL_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </motion.g>
      </motion.svg>
    </motion.div>
  );
}
