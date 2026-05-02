"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Hero } from "@/components/hero";
import {
  ArrowRightIcon,
  CameraIcon,
  CheckIcon,
  CompassIcon,
  MessageIcon,
  RouteIcon,
  TentIcon,
  UserIcon,
} from "@/components/icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

const OPEN_SANS: React.CSSProperties = {
  fontFamily: "var(--font-open-sans), ui-sans-serif, system-ui, sans-serif",
};

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="landing-theme flex min-h-screen flex-col bg-background text-foreground">
      <TopNav />
      <main className="flex-1">
        <Hero />
        <ProductFlowSection />
        <BuiltForCampsSection />
        <BeforeAfterSection />
        <UseCasesSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Top nav                                                          */
/* --------------------------------------------------------------- */

function TopNav() {
  return (
    <header className="border-b border-border/50 bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10 lg:px-10 xl:px-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-[15px] font-semibold uppercase tracking-[0.28em] text-foreground">
            KaribuLink
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            href="#how-it-works"
            className="hidden text-sm font-medium text-muted hover:text-foreground sm:inline-block"
          >
            How it works
          </Link>
          <Link
            href="#use-cases"
            className="hidden text-sm font-medium text-muted hover:text-foreground sm:inline-block"
          >
            Use cases
          </Link>
          <Link
            href="/demo-camp"
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-xs font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            View Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- */
/*  Product flow — QR/NFC scan → profile → lead → follow-up         */
/* --------------------------------------------------------------- */

function ProductFlowSection() {
  const steps = [
    {
      n: "01",
      icon: RouteIcon,
      title: "Scan or tap",
      body: "A guest or operator scans a QR code or taps an NFC tag.",
    },
    {
      n: "02",
      icon: TentIcon,
      title: "Camp profile opens",
      body: "Your branded mobile experience loads — no app, no login.",
    },
    {
      n: "03",
      icon: UserIcon,
      title: "Lead captured",
      body: "Their details land in structured form, ready to follow up.",
    },
    {
      n: "04",
      icon: MessageIcon,
      title: "WhatsApp follow-up",
      body: "One tap reaches them on the channel they actually answer.",
    },
  ];
  return (
    <section
      id="how-it-works"
      className="px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            How it works
          </p>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            From a single tap to a{" "}
            <em className="not-italic text-primary">tracked conversation.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-12 lg:mt-24 lg:grid-cols-4 lg:gap-10"
        >
          {steps.map((step) => (
            <FlowStep key={step.n} {...step} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FlowStep({
  n,
  icon: Icon,
  title,
  body,
}: {
  n: string;
  icon: typeof RouteIcon;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#2f4a32] text-[#faf7f0]">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-mono text-[12px] font-medium tracking-[0.32em] text-primary">
          {n}
        </p>
      </div>
      <h3 className="font-serif mt-5 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[26px]">
        {title}
      </h3>
      <p
        className="mt-3 max-w-xs text-[15px] leading-[1.7] text-muted"
        style={OPEN_SANS}
      >
        {body}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Built for safari camps                                           */
/* --------------------------------------------------------------- */

function BuiltForCampsSection() {
  const features = [
    {
      icon: CompassIcon,
      title: "Trade-fair lead capture",
      body: "Scannable camp brochure for fairs like Karibu Kili. Operators leave their details with a single tap.",
    },
    {
      icon: UserIcon,
      title: "Guest data capture",
      body: "Replace paper waivers and welcome cards with a calm mobile check-in your team actually uses.",
    },
    {
      icon: MessageIcon,
      title: "WhatsApp follow-up",
      body: "One-tap messages to operators and guests on the channel they actually answer.",
    },
    {
      icon: CameraIcon,
      title: "CSV export, CRM-ready",
      body: "Every lead exports cleanly. Drop it into your CRM, or send it forward as it comes in.",
    },
  ];
  return (
    <section className="bg-[#f4e8d2] px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            Built for safari camps
          </p>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            One link.{" "}
            <em className="not-italic text-primary">Four jobs done.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-2 sm:gap-12 lg:mt-24 lg:gap-14"
        >
          {features.map((f) => (
            <FeatureBlock key={f.title} {...f} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FeatureBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof CompassIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2f4a32] text-[#faf7f0]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[26px]">
          {title}
        </h3>
        <p
          className="mt-3 text-[15px] leading-[1.7] text-muted"
          style={OPEN_SANS}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Before vs After                                                  */
/* --------------------------------------------------------------- */

function BeforeAfterSection() {
  const before = [
    "Lost business cards",
    "Paper waiver forms",
    "Missed follow-ups",
  ];
  const after = [
    "Every interaction captured",
    "Instant WhatsApp follow-up",
    "Clean data export for CRM use",
  ];
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            What changes
          </p>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            Same camp.{" "}
            <em className="not-italic text-primary">Different week.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-16 grid gap-10 sm:mt-20 lg:mt-24 lg:grid-cols-2 lg:gap-16"
        >
          <CompareColumn label="Before" items={before} variant="missed" />
          <CompareColumn label="After" items={after} variant="kept" />
        </Reveal>
      </div>
    </section>
  );
}

function CompareColumn({
  label,
  items,
  variant,
}: {
  label: string;
  items: string[];
  variant: "missed" | "kept";
}) {
  const isAfter = variant === "kept";
  return (
    <div>
      <p
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.32em] ${
          isAfter ? "text-primary" : "text-muted"
        }`}
      >
        {label}
      </p>
      <ul className="mt-6 space-y-4 sm:mt-8">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-4">
            <span
              className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                isAfter
                  ? "bg-primary/15 text-primary"
                  : "bg-foreground/10 text-foreground/40"
              }`}
              aria-hidden
            >
              {isAfter ? (
                <CheckIcon className="h-3.5 w-3.5" />
              ) : (
                <span className="text-base leading-none">✕</span>
              )}
            </span>
            <span
              className={`font-serif text-[19px] font-medium leading-snug tracking-tight sm:text-[22px] ${
                isAfter ? "text-foreground" : "text-foreground/80"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Use cases                                                        */
/* --------------------------------------------------------------- */

function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="bg-[#f4e8d2] px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            Where it earns its keep
          </p>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            Two places.{" "}
            <em className="not-italic text-primary">One platform.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-16 grid gap-6 sm:mt-20 lg:mt-24 lg:grid-cols-2 lg:gap-8"
        >
          <UseCaseCard
            label="Trade Fairs"
            title="Karibu Kili and beyond."
            body="Operators scan your camp's QR, see your brochure, and leave their details. You walk away with structured leads instead of a stack of business cards."
            href="/camp/serengeti-view-camp?mode=fair"
            cta="See Fair Mode"
          />
          <UseCaseCard
            label="At Camp"
            title="The first hour, made easy."
            body="Replace paper waivers, welcome packets, and repeat questions with a single mobile hub guests reach in one tap."
            href="/demo-camp"
            cta="See the camp experience"
          />
        </Reveal>
      </div>
    </section>
  );
}

function UseCaseCard({
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
    <article className="rounded-3xl bg-[#faf7f0] p-8 shadow-[0_2px_18px_-8px_rgba(31,31,27,0.12)] sm:p-10">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
        {label}
      </p>
      <h3 className="font-serif mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[34px]">
        {title}
      </h3>
      <p
        className="mt-5 max-w-md text-[15px] leading-[1.7] text-muted sm:text-base"
        style={OPEN_SANS}
      >
        {body}
      </p>
      <Link
        href={href}
        className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

/* --------------------------------------------------------------- */
/*  Final CTA — olive bookend                                        */
/* --------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="bg-[#2f4a32] px-6 py-24 text-[#faf7f0] sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#faf7f0]/65">
          Ready when you are
        </p>
        <h2 className="font-serif mt-7 text-4xl font-semibold leading-[1.05] tracking-tight text-[#faf7f0] sm:text-5xl lg:text-[56px]">
          Capture every camp interaction.
          <br />
          <em className="not-italic text-[#c46a2b]">
            Starting with the next one.
          </em>
        </h2>
        <p
          className="mx-auto mt-7 max-w-md text-[15px] leading-[1.7] text-[#faf7f0]/75 sm:text-base"
          style={OPEN_SANS}
        >
          Use KaribuLink at fairs, camps, and guest check-ins.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#c46a2b] px-9 text-[15px] font-semibold tracking-tight text-[#faf7f0] shadow-[0_22px_44px_-20px_rgba(196,106,43,0.65)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[#a94f1f] active:scale-[0.98]"
          >
            View Live Camp Demo
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="group inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-[#f4e8d2] hover:text-[#faf7f0]"
          >
            See How It Works
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Footer                                                           */
/* --------------------------------------------------------------- */

function LandingFooter() {
  return (
    <footer className="border-t border-border/50 bg-background px-6 py-10 sm:px-10 lg:px-10 xl:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
            KaribuLink
          </p>
          <p
            className="mt-1 text-xs leading-relaxed text-muted"
            style={OPEN_SANS}
          >
            Welcome, made digital. Built for safari camps in East Africa.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          © {new Date().getFullYear()} KaribuLink
        </p>
      </div>
    </footer>
  );
}
