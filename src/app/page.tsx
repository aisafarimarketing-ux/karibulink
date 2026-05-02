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
        <WhatThisIsSection />
        <UseCasesSection />
        <BeforeAfterSection />
        <DifferentiationSection />
        <FeaturesSection />
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
            href="#what-this-is"
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
/*  What This Is — repositioning statement                           */
/* --------------------------------------------------------------- */

function WhatThisIsSection() {
  return (
    <section
      id="what-this-is"
      className="px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            What this is
          </p>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            A simple layer between your camp{" "}
            <em className="not-italic text-primary">and your guests.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 max-w-2xl sm:mt-16">
          <p
            className="font-serif text-2xl font-medium leading-[1.4] tracking-tight text-foreground sm:text-[28px]"
          >
            Operators scan your QR at trade fairs.
            <br />
            Guests interact with your camp on-site.
          </p>
          <p
            className="mt-7 max-w-xl text-[15px] leading-[1.7] text-muted sm:text-base"
            style={OPEN_SANS}
          >
            Every interaction becomes structured data you can act on — without
            another login, another app, or another inbox.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Use cases — three contexts                                       */
/* --------------------------------------------------------------- */

function UseCasesSection() {
  const cases = [
    {
      label: "At trade fairs",
      title: "Karibu Kili and beyond.",
      body: "Tour operators scan your QR, explore your camp, and send inquiries instantly. You walk away with structured leads instead of business cards.",
      href: "/demo-fair",
      cta: "See Fair Mode",
    },
    {
      label: "At your camp",
      title: "The first hour, made easy.",
      body: "Guests complete digital forms and interact with your team while you capture structured data — preferences, dietary needs, follow-up details.",
      href: "/demo-camp",
      cta: "See the camp experience",
    },
    {
      label: "Boutique lodges",
      title: "A growing guest database.",
      body: "From check-in to guest preferences, every interaction becomes part of a calm, exportable database — yours to act on whenever you're ready.",
      href: "/demo-camp",
      cta: "See how it works",
    },
  ];
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
            Three contexts.{" "}
            <em className="not-italic text-primary">One platform.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-16 grid gap-6 sm:mt-20 lg:mt-24 lg:grid-cols-3 lg:gap-7"
        >
          {cases.map((c) => (
            <UseCaseCard key={c.label} {...c} />
          ))}
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
    <article className="flex flex-col rounded-3xl bg-[#faf7f0] p-8 shadow-[0_2px_18px_-8px_rgba(31,31,27,0.12)] sm:p-10">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
        {label}
      </p>
      <h3 className="font-serif mt-4 text-[28px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-3xl">
        {title}
      </h3>
      <p
        className="mt-5 max-w-md flex-1 text-[15px] leading-[1.7] text-muted sm:text-base"
        style={OPEN_SANS}
      >
        {body}
      </p>
      <Link
        href={href}
        className="group mt-7 inline-flex items-center gap-1.5 self-start text-sm font-semibold tracking-tight text-primary"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

/* --------------------------------------------------------------- */
/*  Before vs After                                                  */
/* --------------------------------------------------------------- */

function BeforeAfterSection() {
  const before = [
    "Lost business cards",
    "Paper forms",
    "No follow-up system",
    "Scattered guest data",
  ];
  const after = [
    "Every interaction captured",
    "Instant WhatsApp follow-up",
    "Clean exportable data",
    "Growing guest & operator database",
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
          className="mt-16 grid gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-2 lg:gap-16"
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
/*  Differentiation — what KaribuLink is not                         */
/* --------------------------------------------------------------- */

function DifferentiationSection() {
  return (
    <section className="bg-[#2f4a32] px-6 py-24 text-[#faf7f0] sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#faf7f0]/60">
            What KaribuLink is not
          </p>
          <h2 className="font-serif mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
            Not a booking system.
            <br />
            <em className="not-italic text-[#c46a2b]">Not a CRM.</em>
          </h2>
          <p
            className="mt-9 max-w-2xl text-lg leading-[1.7] text-[#faf7f0]/80 sm:text-xl"
            style={OPEN_SANS}
          >
            KaribuLink sits in between — capturing the interactions that
            usually get lost. The conversation at the trade-fair stand. The
            guest you forgot to follow up with. The operator who scanned
            your QR but never made it back to your inbox.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Features — five short bullets                                    */
/* --------------------------------------------------------------- */

function FeaturesSection() {
  const features = [
    {
      icon: RouteIcon,
      title: "QR & NFC interactions",
      body: "A scannable code or tap-to-open NFC tag is all a guest or operator needs.",
    },
    {
      icon: TentIcon,
      title: "Mobile-first camp profiles",
      body: "Your branded experience loads instantly — no app, no login, no install.",
    },
    {
      icon: MessageIcon,
      title: "WhatsApp follow-up",
      body: "One tap to continue the conversation on the channel that actually works.",
    },
    {
      icon: UserIcon,
      title: "Lead capture forms",
      body: "Trade-fair inquiries, guest waivers, registrations — all in structured form.",
    },
    {
      icon: CameraIcon,
      title: "CSV export",
      body: "Every lead exports cleanly. Drop it into your CRM, or work it as it comes.",
    },
  ];
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            What's in the box
          </p>
          <h2 className="font-serif mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            Five things,{" "}
            <em className="not-italic text-primary">done well.</em>
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
/*  Final CTA — sand-cream bookend                                   */
/* --------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="bg-[#f4e8d2] px-6 py-24 sm:px-10 sm:py-32 lg:px-10 lg:py-36 xl:px-12">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
          Ready when you are
        </p>
        <h2 className="font-serif mt-7 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
          See how a real camp{" "}
          <em className="not-italic text-primary">uses KaribuLink.</em>
        </h2>
        <p
          className="mx-auto mt-7 max-w-md text-[15px] leading-[1.7] text-muted sm:text-base"
          style={OPEN_SANS}
        >
          Walk through the same flow your guests and operators will see.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            View Live Demo
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo-fair"
            className="group inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground/70 hover:text-foreground"
          >
            See Fair Mode
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
            A mobile-first interaction layer for safari camps and boutique
            hospitality.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          © {new Date().getFullYear()} KaribuLink
        </p>
      </div>
    </footer>
  );
}
