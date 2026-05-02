"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

// Hero photo. Replace this URL with your own asset (e.g. /hero-savanna.jpg)
// or a different Unsplash photo. The CSS scene below renders as a fallback
// if the image fails to load.
const HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
}

/* --------------------------------------------------------------- */
/*  Mobile: full-bleed image with overlay text                      */
/* --------------------------------------------------------------- */

function MobileHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a1a13] lg:hidden">
      {/* CSS scene fallback (visible if photo fails). */}
      <div className="absolute inset-0">
        <SafariScene />
      </div>

      {/* Real safari photo with subtle slow zoom. */}
      <motion.img
        src={HERO_IMAGE_SRC}
        alt=""
        loading="eager"
        initial={{ scale: 1 }}
        animate={{ scale: 1.04 }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle warm tint over the photo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.10), rgba(168,92,46,0.20))",
        }}
      />
      {/* Legibility gradients: dark top + dark bottom, image breathes through middle. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 via-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Brand wordmark at top */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
        className="relative px-6 pt-12 sm:px-10 sm:pt-16"
      >
        <p className="font-serif text-[15px] font-semibold uppercase tracking-[0.3em] text-white">
          Karibulink
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-white/65">
          Connect. Capture. Grow.
        </p>
      </motion.div>

      {/* Bottom content */}
      <div className="relative mt-auto flex min-h-[100svh] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18, delayChildren: 0.4 },
            },
          }}
          className="font-serif text-[44px] font-medium leading-[1.02] tracking-tight text-white sm:text-[56px]"
        >
          <Line>Capture every</Line>
          <Line>guest and operator —</Line>
          <Line>
            <em className="relative inline-block font-normal italic text-white">
              instantly.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-1 h-[2px] bg-accent"
              />
            </em>
          </Line>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.25 }}
          className="mt-9 max-w-md text-base leading-[1.7] text-white/80"
        >
          From fairs to camp check-ins, KaribuLink turns every interaction
          into structured data you can use.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 1.45 }}
          className="mt-12 flex flex-col gap-3"
        >
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(183,107,62,0.65)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            View Demo
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="group inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-white/85 hover:text-white"
          >
            See how it works
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 1.7 }}
          className="mt-10 text-[11px] uppercase tracking-[0.28em] text-white/65"
        >
          Built for hospitality brands and tour operators
        </motion.p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Desktop: split-screen editorial                                  */
/* --------------------------------------------------------------- */

function DesktopHero() {
  return (
    <section className="relative hidden bg-background lg:grid lg:min-h-[100svh] lg:grid-cols-[1.02fr_1fr]">
      <LeftContent />
      <RightImage />
    </section>
  );
}

function LeftContent() {
  return (
    <div className="relative flex flex-col bg-background px-16 pt-20 pb-20 xl:px-24">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <p className="font-serif text-[15px] font-semibold uppercase tracking-[0.3em] text-foreground/90">
          Karibulink
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-muted">
          Connect. Capture. Grow.
        </p>
      </motion.div>

      <div className="my-0 flex flex-1 flex-col justify-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18, delayChildren: 0.25 },
            },
          }}
          className="font-serif text-[64px] font-medium leading-[1.02] tracking-tight text-foreground xl:text-[72px]"
        >
          <Line>Capture every</Line>
          <Line>guest and operator —</Line>
          <Line>
            <em className="relative inline-block font-normal italic text-primary">
              instantly.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-1 h-[3px] bg-accent"
              />
            </em>
          </Line>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.05 }}
          className="mt-10 max-w-md text-[17px] leading-[1.7] text-muted"
        >
          From fairs to camp check-ins, KaribuLink turns every interaction
          into structured data you can use.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 1.25 }}
          className="mt-14 flex flex-row flex-wrap items-center gap-4"
        >
          <Link
            href="/demo-camp"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(183,107,62,0.65)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            View Demo
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="group inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground hover:text-primary"
          >
            See how it works
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 1.5 }}
        className="text-[11px] uppercase tracking-[0.28em] text-muted"
      >
        Built for hospitality brands and tour operators
      </motion.p>
    </div>
  );
}

function Line({ children }: { children: ReactNode }) {
  return (
    <motion.span variants={lineVariants} className="block">
      {children}
    </motion.span>
  );
}

function RightImage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: easeOut, delay: 0.1 }}
      className="relative h-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <SafariScene />
      </div>
      <motion.img
        src={HERO_IMAGE_SRC}
        alt=""
        loading="eager"
        initial={{ scale: 1 }}
        animate={{ scale: 1.03 }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Subtle warm tint over the photo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.10), rgba(168,92,46,0.20))",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/70 to-transparent" />
    </motion.div>
  );
}

/* --------------------------------------------------------------- */
/*  CSS fallback scene (used behind the image on both layouts)      */
/* --------------------------------------------------------------- */

function SafariScene() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a1a13 0%, #14302a 18%, #2c5749 36%, #d8a560 56%, #b75f30 70%, #4a2510 84%, #18090a 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 14% 18%, #fff 99%, transparent 100%)," +
            "radial-gradient(1px 1px at 32% 28%, #fff 99%, transparent 100%)," +
            "radial-gradient(1px 1px at 48% 12%, #fff 99%, transparent 100%)," +
            "radial-gradient(1px 1px at 62% 24%, #fff 99%, transparent 100%)," +
            "radial-gradient(1px 1px at 76% 16%, #fff 99%, transparent 100%)," +
            "radial-gradient(1px 1px at 88% 32%, #fff 99%, transparent 100%)," +
            "radial-gradient(1px 1px at 22% 36%, #fff 99%, transparent 100%)",
          backgroundSize: "260px 200px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="pointer-events-none absolute right-[28%] top-[55%] h-44 w-44 -translate-y-1/2 rounded-full bg-[#f5b86e] opacity-50 blur-3xl" />
      <div className="pointer-events-none absolute right-[30%] top-[58%] h-16 w-16 -translate-y-1/2 rounded-full bg-[#fce0a0] opacity-90 blur-md" />
      <svg
        className="absolute inset-x-0 bottom-[28%] w-full"
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 120 L0 60 Q120 40 220 70 T440 60 Q560 30 680 55 T800 50 L800 120 Z"
          fill="#1c2a22"
          opacity="0.55"
        />
      </svg>
    </>
  );
}
