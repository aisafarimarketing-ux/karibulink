"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ImageSlider } from "@/components/image-slider";
import {
  ArrowRightIcon,
  CheckIcon,
  CompassIcon,
  MessageIcon,
  RouteIcon,
  TentIcon,
  UserIcon,
  CameraIcon,
} from "@/components/icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

const OPEN_SANS: React.CSSProperties = {
  fontFamily: "var(--font-open-sans), ui-sans-serif, system-ui, sans-serif",
};

const SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=2400&q=80",
];

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
      initial={{ opacity: 0, y: 22 }}
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
    <div className="landing-theme min-h-screen bg-background text-foreground">
      <TopNav />
      <main>
        <HeroPhoto />
        <TrustStrip />
        <IntroSection />
        <PhoneShowcase />
        <UseCasesSection />
        <BeforeAfterSection />
        <ShowcaseSection />
        <FeaturesSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Top nav — slim, transparent over hero, solid on scroll           */
/* --------------------------------------------------------------- */

function TopNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-10 sm:py-6 lg:px-12">
        <Link
          href="/"
          className="font-serif text-base font-semibold tracking-tight text-[#faf7f0]"
        >
          KaribuLink
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            href="#how-it-works"
            className="hidden text-[12px] font-medium uppercase tracking-[0.18em] text-[#faf7f0]/80 hover:text-[#faf7f0] sm:inline-block"
          >
            How it works
          </Link>
          <Link
            href="/demo-fair"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#faf7f0]/10 px-4 text-[12px] font-semibold tracking-tight text-[#faf7f0] backdrop-blur transition-colors hover:bg-[#faf7f0]/20 sm:px-5"
            style={{ border: "1px solid rgba(250,247,240,0.3)" }}
          >
            View Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- */
/*  Hero — full-bleed photo slider                                   */
/* --------------------------------------------------------------- */

function HeroPhoto() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[88vh] min-h-[600px] w-full">
        <ImageSlider
          images={SHOWCASE_IMAGES}
          interval={6000}
          showDots={false}
          alt="KaribuLink — safari hospitality"
          className="bg-transparent"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/45 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: easeOut }}
          className="absolute inset-x-0 bottom-0 px-5 pb-12 text-[#faf7f0] sm:px-10 sm:pb-16 lg:px-12 lg:pb-24"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#faf7f0]/75 sm:text-[11px]">
              For safari camps & boutique lodges
            </p>
            <h1 className="font-serif mt-5 max-w-3xl text-[36px] font-semibold leading-[1.02] tracking-tight sm:text-[58px] lg:text-[76px]">
              The mobile layer between your camp{" "}
              <em className="not-italic text-[#f4e8d2]">and your guests.</em>
            </h1>
            <p
              className="mt-6 max-w-md text-[15px] leading-[1.65] text-[#faf7f0]/85 sm:text-[17px]"
              style={OPEN_SANS}
            >
              KaribuLink replaces business cards, paper forms, and missed
              follow-ups with one premium experience operators and guests
              actually want to use.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/demo-fair"
                className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#c46a2b] px-8 text-[14px] font-semibold tracking-tight text-[#faf7f0] shadow-[0_22px_44px_-20px_rgba(196,106,43,0.6)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[#a94f1f] active:scale-[0.98] sm:text-[15px]"
              >
                Open the Trade Demo
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/demo-camp"
                className="inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-[14px] font-semibold tracking-tight text-[#f4e8d2] hover:text-[#faf7f0] sm:text-sm"
              >
                See the camp experience
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Trust strip — slim credibility band                              */
/* --------------------------------------------------------------- */

function TrustStrip() {
  const lines = [
    "Tanzania · Kenya · Rwanda",
    "Built for Karibu Kili 2026",
    "QR · NFC · WhatsApp-first",
  ];
  return (
    <section
      className="px-5 py-5 sm:px-10 sm:py-6 lg:px-12"
      style={{ borderBottom: "1px solid rgba(31,31,27,0.08)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center sm:gap-x-10">
        {lines.map((line, i) => (
          <span
            key={line}
            className="flex items-center gap-x-6 sm:gap-x-10"
          >
            {i > 0 && (
              <span
                aria-hidden
                className="hidden h-3 w-px bg-foreground/20 sm:inline-block"
              />
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {line}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Intro — short, centered                                          */
/* --------------------------------------------------------------- */

function IntroSection() {
  return (
    <section
      id="how-it-works"
      className="px-5 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            What this is
          </p>
          <h2 className="font-serif mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[44px] lg:text-[52px]">
            A simple layer between your camp{" "}
            <em className="not-italic text-primary">and your guests.</em>
          </h2>
          <p
            className="mt-7 text-[15.5px] leading-[1.7] text-muted sm:text-[17px]"
            style={OPEN_SANS}
          >
            Operators scan your QR at trade fairs. Guests interact with your
            camp on-site. Every interaction becomes structured data — without
            another app, login, or inbox.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Phone showcase — stylized Fair Mode preview                      */
/* --------------------------------------------------------------- */

function PhoneShowcase() {
  return (
    <section className="bg-[#f4e8d2] px-5 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <FairPhonePreview />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary">
              On the trade floor
            </p>
            <h2 className="font-serif mt-5 text-[30px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[40px] lg:text-[48px]">
              What an operator sees when{" "}
              <em className="not-italic text-primary">they scan your QR.</em>
            </h2>
            <p
              className="mt-6 max-w-md text-[15.5px] leading-[1.7] text-muted sm:text-[17px]"
              style={OPEN_SANS}
            >
              A premium trade profile — not an app. Rooms, rates, fit for
              their clients, and a direct WhatsApp line to the camp manager,
              all in one mobile-first scroll.
            </p>
            <ul className="mt-7 grid gap-3 text-[14.5px] text-foreground/85">
              {[
                "Trade Snapshot — rooms, season, budget at a glance",
                "Direct WhatsApp to the camp manager",
                "Trade pack, rate sheet, sample itineraries",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"
                  >
                    <CheckIcon className="h-2.5 w-2.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/demo-fair"
              className="group mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-primary px-8 text-[15px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Open Trade Demo
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FairPhonePreview() {
  return (
    <div
      className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[360px]"
      aria-hidden
    >
      <div
        className="relative aspect-[9/19.5] rounded-[2.6rem] bg-[#1f1f1b] p-[10px]"
        style={{
          boxShadow:
            "0 30px 80px -28px rgba(31,58,46,0.45), 0 1px 0 0 rgba(255,255,255,0.06) inset",
        }}
      >
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#faf7f0]">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2 z-30 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-[#1f1f1b]" />

          {/* Hero photo region with rotating slider */}
          <div className="relative h-[42%] w-full overflow-hidden">
            <ImageSlider
              images={SHOWCASE_IMAGES.slice(0, 3)}
              interval={4500}
              showDots={false}
              className="bg-transparent"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />
            <div
              className="absolute left-3 top-9 inline-flex items-center gap-1.5 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.22em] text-white"
              style={{
                border: "1px solid rgba(255,255,255,0.45)",
                background: "rgba(0,0,0,0.18)",
              }}
            >
              <span className="h-1 w-1 rounded-full bg-[#c46a2b]" />
              Trade Profile
            </div>
            <div className="absolute inset-x-0 bottom-0 px-3 pb-3 text-white">
              <p className="font-mono text-[7px] uppercase tracking-[0.24em] text-white/75">
                Serengeti View Camp Co.
              </p>
              <p className="font-serif mt-1 text-[18px] font-semibold leading-[0.96] tracking-tight">
                Serengeti View Camp
              </p>
              <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/85">
                Central Serengeti · ★ 4.9
              </p>
            </div>
          </div>

          {/* Snapshot grid */}
          <div
            className="grid grid-cols-2"
            style={{
              gap: "1px",
              background: "rgba(31,31,27,0.08)",
              borderTop: "1px solid rgba(31,31,27,0.08)",
              borderBottom: "1px solid rgba(31,31,27,0.08)",
            }}
          >
            {[
              { l: "Rooms", v: "16 Tents" },
              { l: "Best for", v: "Couples" },
              { l: "Style", v: "Tented" },
              { l: "Season", v: "Year-round" },
            ].map((s) => (
              <div key={s.l} className="bg-[#faf7f0] px-2.5 py-2">
                <p className="font-mono text-[6.5px] uppercase tracking-[0.2em] text-[#1f1f1b]/55">
                  {s.l}
                </p>
                <p className="font-serif mt-0.5 text-[10px] font-semibold leading-tight text-[#1f1f1b]">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-2 grid grid-cols-3 gap-1.5 px-3">
            <div className="flex h-7 items-center justify-center rounded-full bg-[#c46a2b] text-[7.5px] font-semibold uppercase tracking-tight text-white">
              WhatsApp
            </div>
            <div
              className="flex h-7 items-center justify-center rounded-full text-[7.5px] font-semibold tracking-tight text-[#1f1f1b]"
              style={{ border: "1px solid rgba(31,31,27,0.12)" }}
            >
              Trade Pack
            </div>
            <div
              className="flex h-7 items-center justify-center rounded-full text-[7.5px] font-semibold tracking-tight text-[#1f1f1b]"
              style={{ border: "1px solid rgba(31,31,27,0.12)" }}
            >
              Fact Sheet
            </div>
          </div>

          {/* Contact card preview */}
          <div
            className="mx-3 mt-3 p-3"
            style={{ border: "1px solid rgba(31,31,27,0.12)" }}
          >
            <p className="font-mono text-[7px] uppercase tracking-[0.22em] text-[#1f1f1b]/55">
              Trade Contact
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-[#2f4a32] text-white">
                <span className="font-serif text-[9px] font-semibold leading-none tracking-tight">
                  EM
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-serif text-[10px] font-semibold leading-tight text-[#1f1f1b]">
                  Esther Mollel
                </p>
                <p className="text-[7.5px] text-[#1f1f1b]/55">
                  Trade & Operations Lead
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Use cases — three contexts, photo-led                            */
/* --------------------------------------------------------------- */

function UseCasesSection() {
  const cases = [
    {
      label: "At trade fairs",
      title: "Karibu Kili and beyond.",
      body: "Operators scan your QR, explore your camp, and send inquiries instantly. You walk away with structured leads instead of business cards.",
      href: "/demo-fair",
      cta: "See Fair Mode",
      image: SHOWCASE_IMAGES[1],
    },
    {
      label: "At your camp",
      title: "The first hour, made easy.",
      body: "Guests complete digital forms and interact with your team while you capture preferences, dietary needs, and follow-up details.",
      href: "/demo-camp",
      cta: "See the camp experience",
      image: SHOWCASE_IMAGES[3],
    },
    {
      label: "Boutique lodges",
      title: "A growing guest database.",
      body: "Every interaction becomes part of a calm, exportable database — yours to act on whenever you're ready.",
      href: "/demo-camp",
      cta: "See how it works",
      image: SHOWCASE_IMAGES[4],
    },
  ];
  return (
    <section
      id="use-cases"
      className="px-5 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            Where it earns its keep
          </p>
          <h2 className="font-serif mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[44px] lg:text-[52px]">
            Three contexts.{" "}
            <em className="not-italic text-primary">One platform.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-12 grid gap-5 sm:mt-16 lg:mt-20 lg:grid-cols-3 lg:gap-6"
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
  image,
}: {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
}) {
  return (
    <article
      className="group flex flex-col overflow-hidden bg-[#faf7f0]"
      style={{ border: "1px solid rgba(31,31,27,0.08)" }}
    >
      <div className="relative h-44 w-full overflow-hidden sm:h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <p className="absolute left-5 bottom-4 font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-white">
          {label}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <h3 className="font-serif text-[24px] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-[28px]">
          {title}
        </h3>
        <p
          className="mt-4 flex-1 text-[14.5px] leading-[1.7] text-muted sm:text-[15px]"
          style={OPEN_SANS}
        >
          {body}
        </p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold tracking-tight text-primary"
        >
          {cta}
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- */
/*  Before vs After — minimal comparison                             */
/* --------------------------------------------------------------- */

function BeforeAfterSection() {
  const before = [
    "Lost business cards",
    "Paper forms",
    "Scattered guest data",
    "No follow-up system",
  ];
  const after = [
    "Every interaction captured",
    "Instant WhatsApp follow-up",
    "Clean exportable data",
    "Growing guest & operator database",
  ];
  return (
    <section className="bg-[#2f4a32] px-5 py-20 text-[#faf7f0] sm:px-10 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#faf7f0]/60">
            What changes
          </p>
          <h2 className="font-serif mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight sm:text-[44px] lg:text-[52px]">
            Same camp.{" "}
            <em className="not-italic text-[#c46a2b]">Different week.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-12 grid gap-10 sm:mt-16 lg:mt-20 lg:grid-cols-2 lg:gap-16"
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
          isAfter ? "text-[#c46a2b]" : "text-[#faf7f0]/55"
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
                  ? "bg-[#c46a2b]/20 text-[#c46a2b]"
                  : "bg-[#faf7f0]/10 text-[#faf7f0]/40"
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
              className={`font-serif text-[18px] font-medium leading-snug tracking-tight sm:text-[22px] ${
                isAfter ? "text-[#faf7f0]" : "text-[#faf7f0]/80"
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
/*  Showcase — full-bleed image slider                               */
/* --------------------------------------------------------------- */

function ShowcaseSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[60vh] min-h-[420px] w-full sm:h-[68vh] lg:h-[72vh]">
        <ImageSlider
          images={SHOWCASE_IMAGES}
          interval={5500}
          alt="A glimpse of safari camps using KaribuLink"
          className="bg-transparent"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <Reveal className="absolute inset-x-0 bottom-0 px-5 pb-10 text-[#faf7f0] sm:px-10 sm:pb-14 lg:px-12 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#faf7f0]/75">
              A glimpse
            </p>
            <h2 className="font-serif mt-4 max-w-2xl text-[32px] font-semibold leading-[1.05] tracking-tight sm:text-[44px] lg:text-[52px]">
              Real camps.{" "}
              <em className="not-italic text-[#f4e8d2]">Real moments.</em>
            </h2>
            <p
              className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#faf7f0]/80 sm:text-base"
              style={OPEN_SANS}
            >
              Every camp on KaribuLink keeps its own voice — these are
              moments from the camps already using it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Features — five things, done well                                */
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
      title: "Mobile-first profiles",
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
      body: "Trade-fair inquiries, guest waivers, registrations — all structured.",
    },
    {
      icon: CameraIcon,
      title: "CSV export",
      body: "Every lead exports cleanly. Drop it into your CRM, or work it as it comes.",
    },
  ];
  return (
    <section className="px-5 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            What's in the box
          </p>
          <h2 className="font-serif mt-5 text-[32px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[44px] lg:text-[52px]">
            Five things,{" "}
            <em className="not-italic text-primary">done well.</em>
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 sm:gap-12 lg:mt-20 lg:gap-x-14"
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
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#2f4a32] text-[#faf7f0]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <h3 className="font-serif text-[20px] font-semibold leading-tight tracking-tight text-foreground sm:text-[22px]">
          {title}
        </h3>
        <p
          className="mt-3 text-[14.5px] leading-[1.7] text-muted sm:text-[15px]"
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
    <section className="bg-[#f4e8d2] px-5 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-36">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
          Ready when you are
        </p>
        <h2 className="font-serif mt-6 text-[32px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[44px] lg:text-[52px]">
          See how a real camp{" "}
          <em className="not-italic text-primary">uses KaribuLink.</em>
        </h2>
        <p
          className="mx-auto mt-6 max-w-md text-[15px] leading-[1.7] text-muted sm:text-base"
          style={OPEN_SANS}
        >
          Walk through the same flow your guests and operators will see.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="/demo-fair"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            View Live Demo
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground/70 hover:text-foreground"
          >
            Concierge Mode
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
    <footer
      className="bg-background px-5 py-10 sm:px-10 lg:px-12"
      style={{ borderTop: "1px solid rgba(31,31,27,0.08)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="font-serif text-sm font-semibold tracking-tight text-foreground">
            KaribuLink
          </p>
          <p
            className="mt-1 text-[11px] leading-relaxed text-muted"
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
