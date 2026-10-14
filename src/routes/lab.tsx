import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import type { DetailPoint } from "@/components/site/detail-modal";
import { LabModal } from "@/components/site/lab-modal";
import type { GlyphShape } from "@/components/site/glyph";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/lab")({
  head: () =>
    pageHead({
      path: "/lab",
      title: "Lab — Minhal Javed",
      description:
        "Academic, research and side projects by Minhal Javed: Tutor X, DYNR, indoor AR navigation, Moody, a global crime data science study and cross-instance security research.",
      shareDescription: "Things I built because I wondered what if?",
    }),
  component: LabPage,
});

type Experiment = {
  no: string;
  name: string;
  /** Short category shown on the card. */
  tag: string;
  /** Short description shown on the card. */
  body: string;
  /** Abstract visual shown in the modal until the project has media. */
  shape: GlyphShape;
  /** Overview paragraphs (one string each) shown in the modal. */
  details?: string[];
  /** Numbered highlights shown in the modal. */
  points?: DetailPoint[];
  /** Mono line in the modal (supervisor, course, etc). */
  meta?: string;
  stack?: string[];
  demoUrl?: string;
  /** Text for the demo link; defaults to "View live". */
  demoLabel?: string;
  githubUrl?: string;
};
// Media needs no fields: drop files in public/labs_assets/ named
//   l_01.mp4            (one looping video, shown first)
//   l_01_1.jpeg, l_01_2.jpg, ...   (gallery images, numbered from 1)
// where 01 is the project's number.

const EXPERIMENTS: Experiment[] = [
  {
    no: "L01",
    name: "Tutor X",
    tag: "Platform",
    shape: "cards",
    body: "A tutoring platform where students can find tutors for various subjects and topics. A student puts up a request in real time, any relevant available tutor places a bid for the session, and the student chooses based on the tutor's profile.",
    details: [
      "Finding a tutor usually means searching, comparing and waiting. Tutor X flips that around: a student puts up a request in real time for the subject or topic they need help with, and relevant tutors who are available right then respond to it.",
      "Instead of assigning a tutor, the platform lets tutors place a bid for the session, and the student chooses based on each tutor's profile. The app is built with Flutter, with Firebase, MongoDB and Node.js behind it.",
    ],
    points: [
      {
        title: "Real-time requests",
        text: "students post what they need help with and it reaches relevant, available tutors as it happens.",
      },
      { title: "Tutor bidding", text: "available tutors place a bid for the session." },
      { title: "Student's choice", text: "the student picks a tutor based on their profile." },
    ],
    stack: ["Flutter", "Firebase", "MongoDB", "Node.js"],
  },
  {
    no: "L02",
    name: "DYNR",
    tag: "ML",
    shape: "flow",
    body: "Discover your next restaurant. Finds food using ML algorithms based on authentic food reviews, sorting and matching the taste profiles of the user.",
    details: [
      "Picking a restaurant often comes down to scrolling through ratings and hoping for the best. DYNR, short for Discover Your Next Restaurant, tries to find food you will actually like by leaning on authentic food reviews instead.",
      "Machine learning algorithms process those reviews, then sort and match restaurants against each user's taste profile, so the results are matched to the person rather than to the crowd. The app is built with Flutter and a FastAPI backend.",
    ],
    points: [
      { title: "Authentic reviews", text: "food discovery is driven by genuine review content." },
      {
        title: "Taste profiles",
        text: "each user's preferences are sorted and matched against restaurants.",
      },
      { title: "ML matching", text: "machine learning algorithms do the sorting and matching." },
    ],
    stack: ["Flutter", "FastAPI"],
  },
  {
    no: "L03",
    name: "Indoor Navigation",
    tag: "AR",
    shape: "map",
    body: "An indoor navigation platform using AR and BLE beacons to triangulate location. Useful for getting around office buildings, hospitals and malls where GPS doesn't help.",
    details: [
      "GPS stops being useful the moment you walk indoors, which is exactly when people need directions in office buildings, hospitals and malls. This platform fills that gap using AR and BLE beacons.",
      "Bluetooth Low Energy beacons placed around a building let the system triangulate where a person is, and an augmented-reality layer guides them from there. The Android app is native Kotlin, Unity powers the AR experience, and a Node.js backend with MongoDB stores the data behind it.",
    ],
    points: [
      {
        title: "BLE beacons",
        text: "beacons around the building are used to triangulate the user's location.",
      },
      {
        title: "AR guidance",
        text: "augmented reality makes finding your way indoors easier where GPS doesn't help.",
      },
      { title: "Large buildings", text: "useful in office buildings, hospitals and malls." },
    ],
    stack: ["Kotlin (Android)", "Unity", "Node.js", "MongoDB"],
  },
  {
    no: "L04",
    name: "Moody",
    tag: "HCI",
    shape: "orbit",
    body: "Designed for our Human-Computer Interaction course: a mental health app that supports young adults, and teenagers in particular, in managing their mental health. The project let us explore the intersection of technology and psychology, aiming to address the unique challenges adolescents face today.",
    details: [
      "Moody was designed for our Human-Computer Interaction course: a mental health app that supports young adults, and teenagers in particular, in managing their mental health.",
      "The project let us explore the intersection of technology and psychology, aiming to address the unique challenges adolescents face today. It combines a private mood diary, a peer community, calming audio, an AI chat companion and a physical mood kit into one experience.",
    ],
    points: [
      {
        title: "Personalized Mood Tracking",
        text: "an interactive digital diary for documenting feelings and thoughts in a private, safe space. Since journaling can be a therapeutic outlet, a streak system encourages consistent use.",
      },
      {
        title: "Digital Forum",
        text: "a supportive community where users can post their issues, seek advice and offer support to their peers, which has been shown to be crucial for improving emotional resilience.",
      },
      {
        title: "DeStress Exercises",
        text: "a curated selection of ambient sounds (calming instrumentals, nature sounds and more) with an interactive equalizer to customize the experience, complemented by guided visualization exercises that promote mindfulness and relaxation.",
      },
      {
        title: "Chat with Moody",
        text: "an AI chatbot for immediate support. Users can talk through their feelings and concerns and receive tailored responses and resources.",
      },
      {
        title: "Mood Kit",
        text: "a sensor-enabled stress ball that detects stress levels in real time and prompts calming exercises or ambient sounds when stress is detected, plus a deck of cards with QR codes linked to nature sounds associated with various locations.",
      },
    ],
  },
  {
    no: "L05",
    name: "Data Science Project",
    tag: "Data Science",
    shape: "grid",
    body: "Worked with data from the Global Crime Database to determine trends and patterns in global crime and establish causal inferences. Used statistical inference to investigate the relationship between the weapons used in an attack and the location and group associated. Implemented a sophisticated machine learning model to assess potential casualties by analyzing a combination of weapon types, target specifications and attack methodologies.",
    details: [
      "The project works with data from the Global Crime Database to determine trends and patterns in global crime and establish causal inferences.",
      "Statistical inference is used to investigate the relationship between the weapons used in an attack and the location and group associated with it. On top of that, a machine learning model assesses potential casualties by analyzing a combination of weapon types, target specifications and attack methodologies.",
    ],
    points: [
      {
        title: "Trends and patterns",
        text: "global crime data explored to determine trends and establish causal inferences.",
      },
      {
        title: "Statistical inference",
        text: "the relationship between weapons used, location and the group associated.",
      },
      {
        title: "Casualty model",
        text: "a machine learning model assessing potential casualties from weapon types, target specifications and attack methodologies.",
      },
    ],
  },
  {
    no: "L06",
    name: "DRP: Cross-Instance Vulnerability Assessment",
    tag: "Security Research",
    shape: "grid",
    body: "Led a research initiative focused on identifying cross-instance security vulnerabilities in multi-store e-commerce platforms (e.g., Shopify-like ecosystems).",
    details: [
      "Platforms that host many independent stores, like Shopify-style ecosystems, put every store on shared infrastructure. This research initiative, supervised by Dr. Basit Shafiq, set out to identify cross-instance vulnerabilities: ways one store could be exposed through the platform it shares with others.",
      "Testing with Burp Suite covered authentication flows, session handling and data isolation across tenants, and the findings were documented alongside mitigation strategies for strengthening isolation between stores.",
    ],
    points: [
      "Conducted in-depth security testing using Burp Suite to analyze authentication flows, session handling and data isolation across tenants.",
      "Identified and documented potential privilege escalation and data leakage risks arising from shared infrastructure and misconfigurations.",
      "Proposed mitigation strategies to enhance platform-level cybersecurity and strengthen isolation between independent store instances.",
    ],
    meta: "Supervisor: Dr. Basit Shafiq",
    stack: ["Burp Suite"],
  },
  {
    no: "L07",
    name: "Machine Learning Project: Content Moderation and Toxicity Classification",
    tag: "Machine Learning",
    shape: "flow",
    body: "Worked with data consisting of Wikipedia comments to implement models that can predict toxicity levels to varying degrees.",
    details: [
      "Online communities need ways to spot toxic comments at scale. This project works with a dataset of Wikipedia comments to build models that predict toxicity levels to varying degrees, rather than just a yes-or-no label.",
      "To cover different levels of complexity, the models range from Logistic Regression through a Bi-directional LSTM to BERT, and the experiments are judged with metrics such as Precision, Recall and F1 score to find the most valid one.",
    ],
    points: [
      "Developed and fine-tuned models involving Logistic Regression, Bi-directional LSTM and BERT to cover different levels of complexity.",
      "Determined the most valid experiment using multiple methods of assessment such as Precision, Recall and F1 score.",
    ],
    stack: ["Logistic Regression", "Bi-LSTM", "BERT"],
  },
];

function LabPage() {
  return (
    <PageShell
      index="04 / Lab"
      title={
        <>
          Things I built because I wondered <span className="text-primary">what if?</span>
        </>
      }
      lede="No clients, no briefs, no deadlines. Objects on a workbench, some finished, most not."
    >
      {/* Lines come from each card's own right/bottom border (plus the top/left
          here), not a gray grid background, so empty cells in the last row stay black. */}
      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIMENTS.map((e, i) => (
          <Reveal key={e.no} delay={i * 0.05}>
            <LabModal
              no={e.no}
              name={e.name}
              tag={e.tag}
              shape={e.shape}
              details={e.details}
              highlights={e.points}
              meta={e.meta}
              stack={e.stack}
              demoUrl={e.demoUrl}
              demoLabel={e.demoLabel}
              githubUrl={e.githubUrl}
              trigger={
                <button
                  type="button"
                  className="group relative h-full w-full cursor-pointer overflow-hidden border-b border-r border-border bg-background p-8 text-left transition-colors duration-500 hover:bg-card"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-border opacity-0 transition-all duration-700 group-hover:opacity-100"
                    style={{ boxShadow: "var(--glow-soft)" }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="label !text-primary">{e.no}</span>
                    <span className="label">{e.tag}</span>
                  </div>
                  <h2 className="mt-16 text-2xl tracking-tight transition-transform duration-500 group-hover:-translate-y-1">
                    {e.name}
                  </h2>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                    {e.body}
                  </p>
                  <p className="label mt-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:!text-primary">
                    View details →
                  </p>
                </button>
              }
            />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16">
        <p className="max-w-[46ch] font-mono text-xs leading-relaxed text-muted-foreground">
          This shelf is designed to grow. Each experiment is a self-contained component, new ones
          drop straight into the grid.
        </p>
      </Reveal>
    </PageShell>
  );
}
