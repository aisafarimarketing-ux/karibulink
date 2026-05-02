"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Hero } from "@/components/hero";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: easeOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-theme flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <ImageBreak />
        <WhoItsForSection />
        <HowItWorksSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}

const MID_IMAGE_SRC =
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80";

function ImageBreak() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-[#0a1a13]">
      <motion.img
        src={MID_IMAGE_SRC}
        alt=""
        loading="lazy"
        initial={{ scale: 1 }}
        animate={{ scale: 1.04 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle warm overlay matching the hero treatment. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.10), rgba(168,92,46,0.18))",
        }}
      />
      {/* Bottom darken so the line of copy reads cleanly. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      <div className="relative flex h-full items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20 xl:px-24">
        <Reveal>
          <p className="font-serif max-w-3xl text-[34px] font-medium leading-[1.05] tracking-tight text-white sm:text-[44px] lg:text-[56px]">
            Every interaction
            <br />
            <em className="font-normal italic">becomes data.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */

function ProblemSection() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 xl:px-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
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
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-20 grid gap-12 sm:mt-24 sm:grid-cols-2 sm:gap-10 lg:mt-32 lg:grid-cols-4 lg:gap-12"
        >
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
            mark="missed"
            title="WhatsApp"
            body="Unstructured."
          />
          <CompareRow
            mark="kept"
            title="KaribuLink"
            body="Captured, organized, actionable."
            highlight
          />
        </Reveal>
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

function WhoItsForSection() {
  return (
    <section
      id="who-its-for"
      className="bg-[var(--soft)] px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 xl:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted">
            Who It's For
          </p>
          <h2 className="font-serif mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
            One system.
            <br />
            <em className="font-normal italic text-foreground/70">
              Three touchpoints.
            </em>
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-20 grid gap-14 sm:mt-24 lg:mt-32 lg:grid-cols-3 lg:gap-14"
        >
          <ModeBlock
            title="For Hospitality Brands"
            sub="Camps, lodges, hotels, and BnBs."
            body="Capture guest data, manage waivers, and build lasting relationships."
            href="/demo-camp"
            cta="See the camp experience"
          />
          <ModeBlock
            title="For Tour Operators"
            sub="At fairs and on the road."
            body="Scan, connect, and capture leads at fairs — instantly."
            href="/camp/serengeti-view-camp?mode=fair"
            cta="See Fair Mode"
          />
          <ModeBlock
            title="For Guests"
            sub="No app. No login."
            body="A calm, mobile-first welcome they reach in a single tap."
            href="/demo-camp"
            cta="Open the demo"
          />
        </Reveal>
      </div>
    </section>
  );
}

function ModeBlock({
  title,
  sub,
  body,
  href,
  cta,
}: {
  title: string;
  sub?: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div>
      <h3 className="font-serif text-[30px] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[34px] lg:text-[36px]">
        {title}
      </h3>
      {sub && (
        <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted">
          {sub}
        </p>
      )}
      <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-muted sm:text-base">
        {body}
      </p>
      <Link
        href={href}
        className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary"
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
      className="bg-[#163a2e] px-6 py-24 text-[#f6f1e6] sm:px-10 sm:py-32 lg:px-16 lg:py-40 xl:px-24"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c8a24b]">
            How It Works
          </p>
          <h2 className="font-serif mt-5 max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-[#f6f1e6] sm:text-5xl lg:text-[60px]">
            Simple. Fast.{" "}
            <em className="font-normal italic text-[#f6f1e6]/65">
              Effective.
            </em>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-12 sm:mt-20 sm:grid-cols-3 sm:gap-8 lg:mt-24 lg:gap-10">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.1 + i * 0.1}>
              <li>
                <p className="font-serif text-[14px] font-medium tracking-[0.32em] text-[#c8a24b]">
                  {step.number}
                </p>
                <h3 className="font-serif mt-5 text-[28px] font-medium leading-tight tracking-tight text-[#f6f1e6] sm:text-[32px]">
                  {step.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#f6f1e6]/70">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section
      className="px-6 pt-24 pb-40 sm:px-10 sm:pt-32 sm:pb-48 lg:px-16 lg:pt-40 lg:pb-56 xl:px-24"
      style={{
        background: "linear-gradient(180deg, #e7dfcd 0%, #d8cba8 100%)",
      }}
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
          Used by camps preparing for Karibu Kili Fair
        </p>
        <h2 className="font-serif mt-7 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[60px]">
          Start capturing
          <br />
          <em className="font-normal italic text-primary">what matters.</em>
        </h2>
        <p className="mx-auto mt-7 max-w-md text-[15px] leading-[1.7] text-muted sm:text-base">
          Use KaribuLink at fairs, camps, and guest check-ins.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(183,107,62,0.65)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            Get Started
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground hover:text-primary"
          >
            View Demo
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------------- */

function LandingFooter() {
  return (
    <footer
      className="border-t border-border/40 px-6 py-10 sm:px-10 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#d8cba8" }}
    >
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
