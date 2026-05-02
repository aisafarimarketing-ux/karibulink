"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

const OPEN_SANS: React.CSSProperties = {
  fontFamily: "var(--font-open-sans), ui-sans-serif, system-ui, sans-serif",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#2f4a32] text-[#faf7f0]">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 sm:pt-20 sm:pb-28 lg:px-10 lg:pt-24 lg:pb-32 xl:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 xl:gap-24">
          <Copy />
          <PhoneMockup />
        </div>
      </div>
      {/* Subtle warm wash so the band reads layered, not flat. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(31,51,35,0.55) 100%)",
        }}
      />
    </section>
  );
}

function Copy() {
  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#faf7f0]/70"
      >
        For safari camps
      </motion.p>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.14, delayChildren: 0.2 },
          },
        }}
        className="font-serif mt-6 text-[38px] font-semibold leading-[1.05] tracking-tight text-[#faf7f0] sm:text-[50px] lg:text-[56px] xl:text-[62px]"
      >
        <Line>Turn every guest and</Line>
        <Line>operator interaction</Line>
        <Line>into a{" "}
          <em className="relative inline-block font-semibold italic text-[#f4e8d2]">
            captured relationship.
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-1 h-[3px] bg-[#c46a2b]"
            />
          </em>
        </Line>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.95 }}
        className="mt-7 max-w-md text-[15px] leading-[1.7] text-[#faf7f0]/80 sm:text-[17px]"
        style={OPEN_SANS}
      >
        KaribuLink helps safari camps and boutique lodges replace paper
        forms, business cards, and missed follow-ups with one simple mobile
        experience.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 1.15 }}
        className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
      >
        <Link
          href="/demo-camp"
          className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#c46a2b] px-9 text-[15px] font-semibold tracking-tight text-[#faf7f0] shadow-[0_22px_44px_-20px_rgba(196,106,43,0.6)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[#a94f1f] active:scale-[0.98]"
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
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 1.4 }}
        className="font-mono mt-10 text-[11px] uppercase tracking-[0.28em] text-[#faf7f0]/55"
      >
        Built for safari camps and boutique hospitality teams in Africa
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

/* --------------------------------------------------------------- */
/*  Phone mockup — stylized app preview, no real photos              */
/* --------------------------------------------------------------- */

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
      className="relative mx-auto w-[280px] sm:w-[300px] lg:w-[320px]"
      aria-hidden
    >
      <div
        className="relative aspect-[9/19.5] rounded-[2.6rem] bg-[#1f1f1b] p-3"
        style={{
          boxShadow:
            "0 30px 80px -32px rgba(0, 0, 0, 0.55), 0 1px 0 0 rgba(255,255,255,0.06) inset",
        }}
      >
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#faf7f0]">
          {/* Dynamic island / camera */}
          <div className="absolute left-1/2 top-2.5 z-10 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-[#1f1f1b]" />

          <div className="relative flex h-full flex-col px-3 pb-4 pt-9">
            {/* Hero card preview — olive green block with text only */}
            <div className="overflow-hidden rounded-2xl bg-[#2f4a32] p-4 text-[#faf7f0]">
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#faf7f0]/65">
                Karibu — welcome
              </p>
              <p className="font-serif mt-1.5 text-[22px] font-semibold leading-[1.05]">
                Welcome.
              </p>
              <p className="font-mono mt-1.5 text-[8px] uppercase tracking-[0.18em] text-[#faf7f0]/55">
                Serengeti View Camp
              </p>
            </div>

            {/* Quick actions preview */}
            <div className="mt-3">
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  "Check In",
                  "Stay",
                  "Experience",
                  "Help",
                  "Safety",
                  "Contact",
                ].map((label, i) => (
                  <div
                    key={`${label}-${i}`}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl bg-[#f4e8d2]"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        i === 0 ? "bg-[#c46a2b]" : "bg-[#2f4a32]/35"
                      }`}
                    />
                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#1f1f1b]/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section rows preview */}
            <div className="mt-3 space-y-1.5">
              {["Check In", "Your Stay", "Experiences", "Help"].map(
                (label, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-xl bg-[#f4e8d2] px-3 py-2"
                  >
                    <span className="grid h-5 w-5 place-items-center rounded-md bg-[#c46a2b]/20">
                      <span className="block h-1 w-1 rounded-full bg-[#c46a2b]" />
                    </span>
                    <div className="flex-1">
                      <div className="font-serif text-[10px] font-semibold leading-tight text-[#1f1f1b]">
                        {label}
                      </div>
                      <div className="mt-0.5 h-[3px] w-[60%] rounded-full bg-[#2f4a32]/15" />
                    </div>
                    <span
                      className={`text-[8px] text-[#1f1f1b]/40 ${
                        i === 0 ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </div>
                ),
              )}
            </div>

            {/* Bottom action bar */}
            <div className="mt-auto rounded-2xl bg-[#f4e8d2] p-2">
              <div className="grid grid-cols-3 gap-1.5">
                <div className="flex h-7 items-center justify-center rounded-lg bg-[#c46a2b] text-[8px] font-semibold tracking-tight text-[#faf7f0]">
                  Call
                </div>
                <div className="flex h-7 items-center justify-center rounded-lg bg-[#25d366] text-[8px] font-semibold tracking-tight text-white">
                  WhatsApp
                </div>
                <div className="flex h-7 items-center justify-center rounded-lg bg-[#faf7f0] text-[8px] font-semibold tracking-tight text-[#1f1f1b]">
                  Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
