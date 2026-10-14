import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SiteNav, SectionFooter } from "./nav";

export function PageShell({
  index,
  title,
  lede,
  children,
}: {
  index: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1400px] px-5 pt-32 md:px-10 md:pt-44"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
          style={{ background: "var(--gradient-pitch)" }}
          aria-hidden="true"
        />
        <span className="label">{index}</span>
        <motion.h1
          className="display-lg mt-6 max-w-[18ch]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        {lede ? (
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">{lede}</p>
        ) : null}
        <div className="mt-20">{children}</div>
      </motion.main>
      <SectionFooter />
    </div>
  );
}
