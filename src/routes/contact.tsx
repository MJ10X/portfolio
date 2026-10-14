import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteNav } from "@/components/site/nav";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact — Minhal Javed",
      description:
        "Got a problem worth solving? Reach Minhal Javed by email, LinkedIn or GitHub and let's make something interesting.",
      shareDescription: "Let's make something interesting.",
    }),
  component: ContactPage,
});

const CHANNELS = [
  { label: "Email", value: "minhaljaved10@gmail.com", href: "mailto:minhaljaved10@gmail.com" },
  { label: "LinkedIn", value: "/in/minhaljaved", href: "https://linkedin.com/in/minhaljaved" },
  { label: "GitHub", value: "@MJ10X", href: "https://github.com/MJ10X" },
];

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SiteNav />
      {/* stadium lights fading out */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-pitch)" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 py-32 md:px-10">
        <span className="label">06 / Contact</span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display-lg mt-6"
        >
          Got a problem
          <br />
          worth solving?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-2xl tracking-tight text-primary md:text-3xl"
        >
          Let&apos;s make something interesting.
        </motion.p>

        <div className="mt-20 max-w-3xl">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
              className="hairline group flex items-baseline justify-between gap-6 py-6 transition-colors hover:text-primary"
            >
              <span className="label group-hover:!text-primary">{c.label}</span>
              <span className="text-lg tracking-tight md:text-2xl">{c.value}</span>
              <span className="label group-hover:!text-primary">→</span>
            </motion.a>
          ))}
        </div>

        <motion.a
          href="mailto:minhaljaved10@gmail.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 inline-flex w-fit items-center gap-3 border border-primary px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          style={{ boxShadow: "var(--glow-soft)" }}
        >
          Say hello →
        </motion.a>

        <p className="label mt-24">End of experience · thanks for playing</p>
      </main>
    </div>
  );
}
