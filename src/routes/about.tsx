import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { InfoCard } from "@/components/site/info-card";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About — Minhal Javed",
      description:
        "Engineer by training, creative thinker by nature. Minhal Javed builds digital products, experiments and experiences across frontend, backend, AI and automation.",
      shareDescription: "How a creative developer thinks about problems, curiosity and craft.",
    }),
  component: AboutPage,
});

const FACETS = [
  { k: "Frontend", v: "Interfaces that feel like objects, not forms." },
  { k: "Backend", v: "Boring, predictable systems so the front can be brave." },
  { k: "AI", v: "Models as materials, useful only inside a good system." },
  { k: "Automation", v: "If I do it twice by hand, it becomes a pipeline." },
  { k: "Interactive", v: "Products that respond, react and reward attention." },
  { k: "Experimental", v: "Ideas built purely to find out what happens." },
];

const EDUCATION = [
  { org: "IT:U", role: "MSc Interdisciplinary Computing" },
  { org: "LUMS", role: "BS Computer Science" },
];

function AboutPage() {
  return (
    <PageShell
      index="03 / About"
      title={
        <>
          Engineer by training.
          <br />
          <span className="text-primary">Creative thinker</span> by nature.
        </>
      }
      // lede="I build digital products, experiments and experiences where technology meets curiosity."
    >
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p>
              I studied BS Computer Science at LUMS, which taught me how systems work. Everything
              interesting since then has come from asking what else they could do.
            </p>
            <p>
              I work across the whole span of a product, the interface, the service behind it, the
              model in the middle, and the quiet automation that keeps it alive. I like the moment
              where a vague, badly described problem finally snaps into a shape you can build.
            </p>
            <p>
              Right now I&apos;m in Linz, Austria, doing an MSc in Interdisciplinary Computing at
              IT:U. I like sitting between disciplines because that&apos;s where the strange, good
              ideas tend to live.
            </p>
            <p>
              Outside of code, I&apos;m a huge football fan. A proper culer at heart, supporting FC
              Barcelona and idolizing Messi. I love football for its creativity, instinct, and the
              way something completely unexpected can happen in a matter of seconds.
            </p>
            <p>
              I love travelling too. I like seeing new cities, walking around unfamiliar streets,
              experiencing different cultures, meeting random people and just being somewhere
              completely different. I&apos;m always looking for the next place to go and the next
              experience to have. I think some of the best ideas come from getting away from what
              you already know.
            </p>
            <p className="text-foreground">
              I don&apos;t just write code. I think about problems differently and then I build the
              thing that proves it.
            </p>
            <p>
              This website is a little bit of everything. It&apos;s my digital CV, my portfolio, and
              also a place where I dump the things I&apos;ve built, places I&apos;ve travelled,
              things I&apos;ve learned and random extracurricular stuff that I find interesting.
            </p>
          </div>
        </Reveal>
        <div className="md:col-span-5">
          {FACETS.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.06}>
              <div className="hairline py-6">
                <p className="label !text-primary">{f.k}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-24">
        <p className="label">Education</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EDUCATION.map((e) => (
            <InfoCard key={e.org} org={e.org} role={e.role} />
          ))}
        </div>
      </Reveal>
    </PageShell>
  );
}
