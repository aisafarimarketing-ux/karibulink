"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "./icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1f3d2b] text-white">
      <BackgroundGlow />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-24 pb-28 text-center sm:px-8 sm:pt-32 sm:pb-36 lg:pt-40 lg:pb-44">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/75 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8a96a]" />
          Karibu — welcome
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
          className="font-serif mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[72px]"
        >
          Welcome your guests digitally,
          <span className="block text-white/85">before they arrive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg"
        >
          KaribuLink helps tour operators, camps, lodges, and BnBs deliver a
          seamless guest experience — from journey to camp to memory.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.28 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <HeroButton href="/demo-camp" variant="primary">
            View Demo Camp
          </HeroButton>
          <HeroButton href="/demo-operator" variant="secondary">
            View Demo Tour Operator
          </HeroButton>
        </motion.div>
      </div>
    </section>
  );
}

function HeroButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const base =
    "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-medium tracking-tight transition-colors transition-shadow sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f3d2b]";

  const styles =
    variant === "primary"
      ? "bg-white text-[#1f3d2b] shadow-[0_1px_0_0_rgba(0,0,0,0.05)] hover:bg-[#f7f1e6] hover:shadow-lg"
      : "border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10 hover:border-white/35";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      <motion.span
        className="inline-flex items-center gap-2"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {children}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
      </motion.span>
    </Link>
  );
}

function BackgroundGlow() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(900px 500px at 50% -10%, rgba(200,169,106,0.18), transparent 60%), radial-gradient(700px 400px at 50% 110%, rgba(31,61,43,0.9), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </>
  );
}
