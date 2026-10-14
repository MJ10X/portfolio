import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { PenaltyShootout } from "@/components/site/penalty-shootout";
import { SiteNav } from "@/components/site/nav";
import { IntroLogo } from "@/components/site/intro-logo";
import { pageHead } from "@/lib/seo";

const EASE_CINE = [0.16, 1, 0.3, 1] as const;

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "Minhal Javed — Creative Developer",
      description:
        "I solve problems with code, curiosity & a garnish of creativity. An interactive portfolio you explore by taking a shot.",
      shareDescription: "An interactive portfolio. Aim, shoot, and discover the work.",
    }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<"intro" | "play">("intro");
  const [logoTakingOver, setLogoTakingOver] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SiteNav visible={stage === "play"} />

      <AnimatePresence mode="wait">
        {stage === "intro" ? (
          <motion.section
            key="intro"
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: EASE_CINE }}
            className="flex min-h-screen flex-col justify-center px-5 md:px-10"
          >
            <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:items-end md:gap-0">
              <div className="flex flex-col gap-0">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: logoTakingOver ? 0 : 1, y: 0 }}
                  transition={
                    logoTakingOver
                      ? { duration: 0.5, ease: EASE_CINE }
                      : { duration: 1.2, ease: EASE_CINE }
                  }
                  className="display-xl"
                >
                  MINHAL
                  <br />
                  JAVED
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: logoTakingOver ? 0 : 1 }}
                  transition={
                    logoTakingOver
                      ? { duration: 0.5, ease: EASE_CINE }
                      : { duration: 1, delay: 0.8 }
                  }
                  className="label mt-8 text-primary!"
                >
                  Creative Developer
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: logoTakingOver ? 0 : 1 }}
                  transition={
                    logoTakingOver
                      ? { duration: 0.5, ease: EASE_CINE }
                      : { duration: 1, delay: 1.4 }
                  }
                  className="mt-4 max-w-[40ch] text-sm text-muted-foreground md:text-base"
                >
                  I solve problems with code, curiosity &amp; a garnish of creativity.
                </motion.p>
              </div>
              {/* Centers the logo within the leftover space beside the title on desktop; on mobile it just stacks above, unaffected. */}
              <div className="md:flex md:flex-1 md:justify-center">
                <IntroLogo
                  onCenterStart={() => setLogoTakingOver(true)}
                  onComplete={() => setStage("play")}
                />
              </div>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: logoTakingOver ? 0 : 1 }}
              transition={
                logoTakingOver ? { duration: 0.5, ease: EASE_CINE } : { duration: 1, delay: 2.2 }
              }
              onClick={() => setStage("play")}
              className={`label absolute bottom-10 right-5 hover:text-primary! md:right-10 ${
                logoTakingOver ? "pointer-events-none" : ""
              }`}
            >
              Skip intro →
            </motion.button>
          </motion.section>
        ) : (
          <motion.section
            key="play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE_CINE }}
            className="relative min-h-screen"
          >
            {/* spacer */}
            <div className="pointer-events-none absolute left-5 top-20  z-30 md:top-24 md:left-10">
              <div className="w-full h-4"></div>
              <p className="label ">01 / The pitch</p>

              <p className="mt-3 hidden max-w-[24ch] font-mono text-xs leading-relaxed text-muted-foreground md:block">
                Instead of a menu, you get the ball. Hit a target to enter a section.
              </p>
            </div>
            {/* spacer */}
            <div className="w-full h-10"></div>
            <PenaltyShootout />
            <div className="absolute bottom-6 right-5 z-30 md:right-10">
              <Link to="/work" className="label hover:text-primary!">
                Skip experience →
              </Link>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
