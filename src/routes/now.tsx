import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/now")({
  head: () =>
    pageHead({
      path: "/now",
      title: "Now — Minhal Javed",
      description:
        "Currently studying Interdisciplinary Computing at IT:U in Linz, Austria, and exploring AI, creative technology and interactive experiences.",
      shareDescription: "What Minhal Javed is doing at this exact moment.",
    }),
  component: NowPage,
});

const ITEMS = [
  {
    k: "Studying",
    v: "MSc Interdisciplinary Computing at IT:U,  Linz, Austria. Computer science with the walls taken out.",
  },
  {
    k: "Exploring",
    v: "AI, creative technology, interactive experiences, and better ways to solve problems that aren't yet well-defined.",
  },
  {
    k: "Building",
    v: "Small experiments, most of which end up in the Lab. Some of them even work.",
  },
  {
    k: "Breaking",
    v: "Things. Then occasionally figuring out why they broke, which is the actual job.",
  },
  { k: "Elsewhere", v: "Watching too much football and pretending it's design research." },
];

function NowPage() {
  return (
    <PageShell
      index="05 / Now"
      title={
        <>
          Currently, in <span className="text-primary">Linz.</span>
        </>
      }
      lede="A short, honest snapshot,  updated whenever the answer changes."
    >
      <div className="max-w-3xl">
        {ITEMS.map((it, i) => (
          <Reveal key={it.k} delay={i * 0.06}>
            <div className="hairline grid gap-3 py-8 md:grid-cols-[160px_1fr] md:gap-10">
              <p className="label !text-primary">{it.k}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{it.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
