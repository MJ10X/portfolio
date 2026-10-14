import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/lab", label: "Lab" },
  { to: "/now", label: "Now" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav({ visible = true }: { visible?: boolean }) {
  return (
    // Liquid Glass, Cupertino-adjacent,  recreated with an SVG lens-distortion
    // filter + backdrop-blur, not lifted from a private framework.
    <header
      title="🧊 tried to sneak a bit of Apple's liquid glass in here,  don't tell Tim"
      className={`glass-nav fixed inset-x-0 top-0 z-50 transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="glass-nav__filter" aria-hidden="true" />
      <div className="glass-nav__overlay" aria-hidden="true" />
      <div className="glass-nav__specular" aria-hidden="true" />
      <div className="glass-nav__content">
        <nav className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-y-2 px-5 py-4 md:flex-nowrap md:py-5 md:px-10">
          <Link
            to="/"
            className="label whitespace-nowrap !text-foreground hover:!text-primary transition-colors"
          >
            Minhal Javed
          </Link>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 md:gap-7">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="label hover:!text-primary transition-colors"
                  activeProps={{ className: "label !text-primary" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Empty lens: feDisplacementMap warps the blurred backdrop by its own
          soft alpha edge, which is what makes this read as glass, not just blur. */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="glass-nav-lens" x="-20%" y="-20%" width="140%" height="140%">
          <feComponentTransfer in="SourceAlpha" result="alpha">
            <feFuncA type="identity" />
          </feComponentTransfer>
          <feGaussianBlur in="alpha" stdDeviation="14" result="blur" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blur"
            scale="18"
            xChannelSelector="A"
            yChannelSelector="A"
          />
        </filter>
      </svg>
    </header>
  );
}

export function SectionFooter() {
  return (
    <footer className="mx-auto max-w-[1400px] px-5 pb-16 pt-24 md:px-10">
      <div className="hairline flex flex-wrap items-center justify-between gap-4 pt-6">
        <span className="label">© {new Date().getFullYear()} Minhal Javed</span>
        <Link to="/contact" className="label !text-primary hover:opacity-70">
          Got a problem worth solving? →
        </Link>
      </div>
    </footer>
  );
}
