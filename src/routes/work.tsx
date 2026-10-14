import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { DetailModal } from "@/components/site/detail-modal";
import { InfoCard } from "@/components/site/info-card";
import { Glyph, type GlyphShape } from "@/components/site/glyph";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () =>
    pageHead({
      path: "/work",
      title: "Work — Minhal Javed",
      description:
        "Experience and selected projects by Minhal Javed: Ring Builder, Jira clone, AI chatbots, ML fault detection, computer vision for methane detection and lead and SEO automation engines.",
      shareDescription: "Experience and selected projects. Problems first, technology second.",
    }),
  component: WorkPage,
});

type Project = {
  no: string;
  name: string;
  /** Short description shown on the card. */
  body: string;
  /** Longer write-up (one string per paragraph) shown in the modal instead of `body`. */
  details?: string[];
  /** Bulleted details shown in the modal only. */
  points?: string[];
  stack?: string[];
  /**
   * Optional 2-3 extra screenshots for the modal gallery. The cover image itself
   * needs no field: it's picked up from public/projects_assets/p_<no>.<ext>.
   */
  images?: string[];
  demoUrl?: string;
  /** Text for the demo link; defaults to "View live" in the modal. */
  demoLabel?: string;
  githubUrl?: string;
  accentShape: GlyphShape;
};

const EXPERIENCE = [
  {
    org: "Useryze",
    role: "Software Engineer",
    period: "August 2025 - Present",
    location: "US-based, remote",
  },
  {
    org: "Raythorne",
    role: "Full Stack Software Developer",
    period: "July 2024 - August 2025",
    location: "Lahore, Pakistan",
  },
  {
    org: "LUMO",
    role: "Founding Engineer",
    period: "Feb 2025 - Dec 2025",
    location: "UK-based, remote",
  },
  {
    org: "BioForce",
    role: "Mobile App Developer",
    period: "May 2022 - July 2023",
    location: "Multan, Pakistan",
  },
];

const PROJECTS: Project[] = [
  {
    no: "01",
    name: "Computer Vision for Methane Detection",
    body: "Used sensor data and GPS data to pinpoint locations of elevated methane values on a GIS platform, then ran computer vision models to find the exact location of the leak among many false positives.",
    details: [
      "Methane leaks are hard to find precisely: a sensor reading tells you the air nearby is off, not which part of the site is responsible. This project starts from that gap. Sensor readings are paired with GPS data and plotted on a GIS platform, so areas of elevated methane show up on a map instead of as rows in a table.",
      "A raised reading on the map is only the first step, and it comes with plenty of false positives. The second stage runs computer vision models to sort through those candidates and narrow them down to the exact location of the leak, so the follow-up is a specific spot rather than a general area.",
    ],
    stack: ["Computer Vision", "GIS"],
    accentShape: "map",
  },
  {
    no: "02",
    name: "Ring Builder",
    body: "A complete tool to design a ring in a real-time 3D view by selecting different settings, shapes and band styles. Developed with React, a Node.js backend and AWS, and integrated into multiple Shopify stores.",
    details: [
      "Ring Builder lets a customer design a ring themselves instead of picking from a fixed catalogue. They choose settings, shapes and band styles, and the ring updates in a real-time 3D view as each choice is made, so they can see exactly what they are building before they commit to it.",
      "Under the hood it is a React front end talking to a Node.js backend running on AWS. The tool was built to be integrated into several Shopify stores rather than living in just one, so the same configurator serves multiple storefronts.",
    ],
    stack: ["React", "Node.js", "AWS", "Shopify"],
    accentShape: "grid",
  },
  {
    no: "03",
    name: "Bioforce Mobile App",
    body: "A general info app for a pesticide company to showcase their products, with live weather and nearby dealer info based on the user's location. It also has an admin panel to add and edit products.",
    details: [
      "Bioforce is a general information app for a pesticide company. It showcases the company's products, shows live weather, and lists nearby dealers based on the user's location, so the things a customer actually needs to check are in one place on their phone.",
      "The app is built for farmers, so the design leans on simple, clear navigation with minimal steps, large easy-to-read fonts, and icons, images and color-coded notifications that make complex information easier to take in. It is mobile-first and tuned to run smoothly even on devices with limited hardware. A companion admin panel lets the company add and edit products, and the whole thing is built with Flutter on Firebase.",
    ],
    stack: ["Flutter", "Firebase"],
    demoUrl: "https://play.google.com/store/apps/details?id=com.bioforceguide.app&hl=en",
    demoLabel: "Play Store",
    accentShape: "cards",
  },
  {
    no: "04",
    name: "Lumo",
    body: "An AI toy that allows children to talk, learn and imagine, featuring different stories and daily conversation.",
    details: [
      "Lumo is an AI toy that children can talk to. Instead of tapping through a screen, a child speaks and the toy answers, which turns learning and imagination into a conversation. It can tell different stories and hold everyday chat, so it works as a playmate as much as a teaching tool.",
      "It was built while working as founding engineer at LUMO, so the work covered the product from its earliest stages. A live version is linked below.",
    ],
    demoUrl: "https://lumo-eight.vercel.app/",
    accentShape: "orbit",
  },
  {
    no: "05",
    name: "AI Chatbot",
    body: "A CRM and instruction-manual chatbot for a power router company. It switches automatically to live support when a query falls beyond its boundaries.",
    details: [
      "This chatbot was built for a power router company to act as both a CRM assistant and an instruction manual. Users can ask questions about the equipment and get answers in plain language, instead of searching through manuals or waiting for a person to reply.",
      "It also knows its limits. When a question falls beyond what the chatbot is set up to answer, it automatically hands the conversation over to live support rather than guessing. The backend runs on FastAPI with an Angular front end.",
    ],
    stack: ["FastAPI", "Angular"],
    accentShape: "flow",
  },
  {
    no: "06",
    name: "Jira Clone",
    body: "A complete Jira clone made for internal team logging of tickets, based on one division account for a global team, using Jira's exposed APIs.",
    details: [
      "This is a complete Jira clone built for internal use, so a team can log tickets without working directly in Jira itself. It was designed around a single division account shared by a global team, keeping ticket logging simple for everyone in it.",
      "Rather than replacing Jira's data, it works with it: the clone talks to Jira through its exposed APIs, so tickets created in the tool end up in the real system. The interface is built in Angular, with a FastAPI backend sitting between the two.",
    ],
    stack: ["Angular", "FastAPI", "Jira API"],
    accentShape: "cards",
  },
  {
    no: "07",
    name: "ML FDR",
    body: "Detecting faults in signals during testing of power routers using different ML models and detection techniques.",
    details: [
      "When power routers are tested, the signals they produce carry the evidence of whether the hardware is behaving. Faults tend to hide inside those signals, and picking them out by hand is slow and error-prone. ML FDR applies machine learning to that problem.",
      "The project uses a range of ML models and detection techniques to identify faults in the test signals automatically, so problems can be caught during testing rather than later.",
    ],
    accentShape: "map",
  },
  {
    no: "08",
    name: "Mechanical Design Fault Detection (DFM)",
    body: "Used ML models to find design faults in mechanical CAD design files before sending them for production.",
    details: [
      "In mechanical design, a fault that slips through to production is expensive to fix. This project moves that check earlier: instead of finding problems after manufacturing has started, the design files are inspected before they are sent to production.",
      "ML models analyze the mechanical CAD design files directly to find design faults, giving designers the chance to correct them at the drawing stage.",
    ],
    accentShape: "grid",
  },
  // {
  //   no: "09",
  //   name: "SEO Content Engine",
  //   body: "Ingests Google Search Console data and internal sales data and runs them through AI and gap-detection rules to find keywords on Semrush, then generates content such as blogs and posts from them using GPT models.",
  //   stack: ["Google Search Console", "Semrush", "GPT"],
  //   accentShape: "cards",
  // },
  // {
  //   no: "10",
  //   name: "Leads Generator Engine",
  //   body: "Used the Google Maps API and LinkedIn search mechanics to automate the process of finding leads, with their emails, from a simple keyword search.",
  //   stack: ["Google Maps API", "LinkedIn"],
  //   accentShape: "flow",
  // },
];

const IMAGE_EXTENSIONS = ["jpeg", "jpg", "png", "webp"];

/**
 * Cover image for a project: tries public/projects_assets/p_<no>.<ext> for each
 * extension in turn, and falls back to the abstract Glyph when none exist.
 */
function ProjectVisual({ project: p }: { project: Project }) {
  const [attempt, setAttempt] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const ext = IMAGE_EXTENSIONS[attempt];

  // A load error that happens before hydration never reaches onError, so catch
  // an already-failed image here.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setAttempt((a) => a + 1);
  }, [attempt]);

  if (!ext) return <Glyph shape={p.accentShape} />;

  return (
    <img
      key={ext}
      ref={imgRef}
      src={`/projects_assets/p_${p.no}.${ext}`}
      alt={`${p.name} preview`}
      className="aspect-[4/3] w-full border border-border object-cover"
      loading="lazy"
      onError={() => setAttempt((a) => a + 1)}
    />
  );
}

const SECONDARY_EXTENSIONS = ["mp4", "webm", "jpeg", "jpg", "png", "webp", "gif"];
const VIDEO_PATTERN = /\.(mp4|webm)$/i;

// Remembers the lookup per project so reopening a modal doesn't re-probe.
const secondaryCache = new Map<string, string | null>();

/**
 * Finds public/projects_assets/secondary/p_<no>.<ext> (video or image), if any.
 * HEAD-probes every extension in parallel and takes the first that exists. A
 * text/html reply counts as missing: the dev server answers unknown paths with
 * its own page instead of a 404.
 */
function useSecondaryMedia(no: string): string | null {
  const [src, setSrc] = useState<string | null>(secondaryCache.get(no) ?? null);

  useEffect(() => {
    if (secondaryCache.has(no)) {
      setSrc(secondaryCache.get(no) ?? null);
      return;
    }
    const ctrl = new AbortController();
    Promise.all(
      SECONDARY_EXTENSIONS.map(async (ext) => {
        const url = `/projects_assets/secondary/p_${no}.${ext}`;
        try {
          const res = await fetch(url, { method: "HEAD", signal: ctrl.signal });
          const type = res.headers.get("content-type") ?? "";
          return res.ok && !type.includes("text/html") ? url : null;
        } catch {
          return null;
        }
      }),
    ).then((found) => {
      if (ctrl.signal.aborted) return;
      const hit = found.find((u): u is string => u !== null) ?? null;
      secondaryCache.set(no, hit);
      setSrc(hit);
    });
    return () => ctrl.abort();
  }, [no]);

  return src;
}

/** Modal visual: the secondary video/image if one exists, otherwise `fallback`. */
function SecondaryMedia({ project: p, fallback }: { project: Project; fallback: ReactNode }) {
  const src = useSecondaryMedia(p.no);
  const [broken, setBroken] = useState(false);

  if (!src || broken) return <>{fallback}</>;

  if (VIDEO_PATTERN.test(src)) {
    return (
      // No controls, and pointer-events-none so hovering or right-clicking can't
      // surface any player UI or a "show controls" menu: it's just a looping clip.
      <video
        src={src}
        className="pointer-events-none w-full border border-border bg-card"
        aria-label={`${p.name} demo`}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="auto"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={`${p.name} screenshot`}
      className="aspect-[4/3] w-full border border-border object-cover"
      onError={() => setBroken(true)}
    />
  );
}

function WorkPage() {
  return (
    <PageShell
      index="02 / Work"
      title={
        <>
          Things built to answer <span className="text-primary">a question.</span>
        </>
      }
      lede="Each of these started as a problem someone described badly. The build was the act of understanding it properly."
    >
      <Reveal>
        <p className="label">Experience</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE.map((e) => (
            <InfoCard
              key={e.org}
              org={e.org}
              role={e.role}
              period={e.period}
              location={e.location}
            />
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-40">
        <p className="label">Projects</p>
      </Reveal>

      <div className="mt-16 space-y-32 md:space-y-48">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.no}>
            <DetailModal
              no={p.no}
              name={p.name}
              body={p.details ?? p.body}
              points={p.points}
              stack={p.stack}
              images={p.images}
              fallback={<SecondaryMedia project={p} fallback={<ProjectVisual project={p} />} />}
              demoUrl={p.demoUrl}
              demoLabel={p.demoLabel}
              githubUrl={p.githubUrl}
              trigger={
                <button
                  type="button"
                  className="group grid w-full cursor-pointer gap-10 text-left md:grid-cols-12 md:gap-14"
                >
                  <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                    <ProjectVisual project={p} />
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex items-baseline gap-4">
                      <span className="label !text-primary">{p.no}</span>
                      <h2 className="display-md">{p.name}</h2>
                    </div>
                    <p className="mt-8 max-w-[46ch] text-lg leading-relaxed md:text-xl">{p.body}</p>
                    {p.stack && p.stack.length > 0 ? (
                      <p className="label mt-6">{p.stack.join(" · ")}</p>
                    ) : null}
                    <p className="label mt-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:!text-primary">
                      View project →
                    </p>
                  </div>
                </button>
              }
            />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
