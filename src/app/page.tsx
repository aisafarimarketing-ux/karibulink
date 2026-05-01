import Link from "next/link";
import { Hero } from "@/components/hero";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

export default function LandingPage() {
  return (
    <div className="landing-theme flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <TwoModesSection />
        <HowItWorksSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}

/* --------------------------------------------------------------- */

function ProblemSection() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 xl:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
            The Old Way
          </p>
          <h2 className="font-serif mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
            Paper is lost.
            <br />
            <em className="font-normal italic text-foreground/70">
              Opportunities are too.
            </em>
          </h2>
        </div>
        <div className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-8 lg:mt-24 lg:gap-12">
          <CompareRow
            mark="missed"
            title="Paper waivers"
            body="Lost or forgotten."
          />
          <CompareRow
            mark="missed"
            title="Business cards"
            body="Easily misplaced."
          />
          <CompareRow
            mark="kept"
            title="KaribuLink"
            body="Captured, organized, actionable."
            highlight
          />
        </div>
      </div>
    </section>
  );
}

function CompareRow({
  mark,
  title,
  body,
  highlight = false,
}: {
  mark: "missed" | "kept";
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`border-l ${
        highlight ? "border-primary" : "border-foreground/15"
      } pl-5 sm:pl-6`}
    >
      {mark === "kept" ? (
        <span
          className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary"
          aria-label="Kept"
        >
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
      ) : (
        <span
          className="grid h-7 w-7 place-items-center rounded-full bg-foreground/8 text-foreground/40"
          aria-label="Missed"
        >
          <span aria-hidden className="text-base leading-none">
            ✕
          </span>
        </span>
      )}
      <h3 className="font-serif mt-4 text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

/* --------------------------------------------------------------- */

function TwoModesSection() {
  return (
    <section
      id="modes"
      className="bg-[var(--soft)] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 xl:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
          One Platform. Two Modes.
        </p>
        <h2 className="font-serif mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
          Built for hospitality.
          <br />
          <em className="font-normal italic text-foreground/70">
            Designed for action.
          </em>
        </h2>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <ModeBlock
            label="For Camps"
            title="Concierge Mode"
            body="Capture guest data, manage waivers, and build lasting relationships."
            href="/demo-camp"
            cta="Open Concierge Mode"
          />
          <ModeBlock
            label="For Operators"
            title="Fair Mode"
            body="Scan, connect, and capture leads at fairs — instantly."
            href="/camp/serengeti-view-camp?mode=fair"
            cta="Open Fair Mode"
          />
        </div>
      </div>
    </section>
  );
}

function ModeBlock({
  label,
  title,
  body,
  href,
  cta,
}: {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
        {label}
      </p>
      <h3 className="font-serif mt-3 text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
        {body}
      </p>
      <Link
        href={href}
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

/* --------------------------------------------------------------- */

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Capture",
      body: "Scan a QR or tap an NFC to open the experience.",
    },
    {
      number: "02",
      title: "Organize",
      body: "Every submission becomes structured data.",
    },
    {
      number: "03",
      title: "Act",
      body: "Follow up through WhatsApp, CSV export, or your CRM.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 xl:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
          How It Works
        </p>
        <h2 className="font-serif mt-5 max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
          Simple. Fast.{" "}
          <em className="font-normal italic text-foreground/70">Effective.</em>
        </h2>

        <ol className="mt-16 grid gap-14 sm:mt-20 sm:grid-cols-3 sm:gap-10 lg:mt-24">
          {steps.map((step) => (
            <li key={step.number}>
              <p className="font-serif text-[14px] font-medium tracking-[0.32em] text-primary">
                {step.number}
              </p>
              <h3 className="font-serif mt-4 text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-[28px]">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16 lg:pb-40 xl:px-24">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-[var(--soft)] px-8 py-16 text-center shadow-[0_24px_60px_-32px_rgba(22,58,46,0.22)] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
          Start capturing
          <br />
          <em className="font-normal italic text-primary">what matters.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
          Use KaribuLink at fairs, camps, and guest check-ins.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/demo-camp"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold tracking-tight text-primary-foreground shadow-[0_18px_36px_-18px_rgba(183,107,62,0.55)] transition-all hover:bg-primary-hover active:scale-[0.98]"
          >
            Get Started
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo-camp"
            className="inline-flex h-12 items-center justify-center gap-1.5 px-1 text-sm font-semibold tracking-tight text-foreground hover:text-primary"
          >
            View Demo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */

function LandingFooter() {
  return (
    <footer className="border-t border-border/40 px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
            Karibulink
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Welcome, made digital. Built with care in East Africa.
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
          © {new Date().getFullYear()} KaribuLink
        </p>
      </div>
    </footer>
  );
}
