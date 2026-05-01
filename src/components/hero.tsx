"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CoffeeIcon,
  InfoIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
} from "./icons";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Backdrop />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-12 lg:pt-36 lg:pb-44">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Karibu — welcome
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
            className="font-serif mt-7 text-balance text-5xl font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[80px]"
          >
            Welcome your guests
            <span className="block text-primary">before they arrive.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.18 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
          >
            KaribuLink gives tour operators, camps, and stays a digital
            welcome, concierge, and guest data system — in one simple tap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.28 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <HeroButton href="/demo-camp" variant="primary">
              View Demo Camp
            </HeroButton>
            <HeroButton href="/demo-operator" variant="secondary">
              View Demo Tour Operator
            </HeroButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.42 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            <Bullet>Mobile-first</Bullet>
            <Bullet>No app to download</Bullet>
            <Bullet>Works in low signal</Bullet>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[360px] lg:max-w-none"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
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
    "group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium tracking-tight transition-all sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-lg"
      : "border border-border bg-surface text-foreground hover:border-primary/40 hover:bg-background";

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

function Backdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 0%, rgba(31,58,46,0.06), transparent 60%), radial-gradient(700px 500px at 90% 20%, rgba(200,169,106,0.16), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
    </>
  );
}

function PhoneMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(31,58,46,0.18), transparent 70%)",
        }}
      />
      <div className="mx-auto w-[300px] rounded-[2.6rem] border border-border bg-[#0f1a14] p-3 shadow-[0_30px_60px_-20px_rgba(15,26,20,0.45)] sm:w-[320px]">
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-background">
          <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/15" />
          <div className="flex h-full flex-col px-5 pt-8 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest text-muted">
                09:24
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono text-muted">
                <span className="h-2 w-3 rounded-sm border border-foreground/40" />
                100%
              </span>
            </div>

            <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.22em] text-muted">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Karibu
            </span>

            <h3 className="font-serif mt-3 text-[20px] font-medium leading-[1.05] tracking-tight text-foreground">
              Welcome to Serengeti View Camp
            </h3>
            <p className="mt-1.5 text-[10px] leading-snug text-muted">
              Tap any card. Register, find safety info, request a service, see
              what guides spotted today.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <MiniTile icon={UserIcon} label="Register" />
              <MiniTile icon={InfoIcon} label="Camp" />
              <MiniTile icon={ShieldIcon} label="Safety" />
              <MiniTile icon={CoffeeIcon} label="Services" />
              <MiniTile icon={BinocularsIcon} label="Sightings" />
              <MiniTile icon={PhoneIcon} label="Contact" />
            </div>

            <div className="mt-auto rounded-2xl border border-border bg-surface p-3">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                Spotted today
              </p>
              <div className="mt-2 flex items-start gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BinocularsIcon className="h-3.5 w-3.5" />
                </span>
                <div className="leading-tight">
                  <p className="font-serif text-[12px] font-medium text-foreground">
                    Leopard with cub
                  </p>
                  <p className="text-[9px] text-muted">
                    Seronera river · 06:14
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniTile({
  icon: Icon,
  label,
}: {
  icon: typeof UserIcon;
  label: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1.5 rounded-xl border border-border bg-surface p-2">
      <span className="grid h-6 w-6 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Icon className="h-3 w-3" />
      </span>
      <span className="text-[9px] font-medium tracking-tight text-foreground">
        {label}
      </span>
    </div>
  );
}
