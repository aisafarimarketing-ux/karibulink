"use client";

import { motion } from "framer-motion";
import {
  BinocularsIcon,
  CompassIcon,
  InfoIcon,
  RouteIcon,
  ShieldIcon,
  TentIcon,
  UserIcon,
} from "./icons";
import { Eyebrow } from "./ui";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

export function GuestPreviewSection() {
  return (
    <section
      id="see"
      className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-2xl"
        >
          <Eyebrow>The guest experience</Eyebrow>
          <h2 className="font-serif mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            See what your guest sees.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg lg:text-xl">
            Three real surfaces from the live demos. No app, no login — every
            screen reachable from a single NFC tap or a link in your
            pre-arrival email.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <PreviewCard
            delay={0.0}
            icon={TentIcon}
            title="Camp Hub"
            copy="Welcome screen, camp info, services, safety. The first hour of a guest's stay, handled."
            preview={<CampHubPreview />}
          />
          <PreviewCard
            delay={0.1}
            icon={CompassIcon}
            title="Safari Journey"
            copy="A daily route hub, what-to-expect notes, and prompts for talking to your guide. Like a beautiful itinerary that thinks."
            preview={<JourneyPreview />}
          />
          <PreviewCard
            delay={0.2}
            icon={BinocularsIcon}
            title="Sightings Wall"
            copy="What guides spotted in the last 48 hours. Updated each evening — tomorrow's plan shaped by today."
            preview={<SightingsPreview />}
          />
        </div>
      </div>
    </section>
  );
}

function PreviewCard({
  icon: Icon,
  title,
  copy,
  preview,
  delay,
}: {
  icon: typeof TentIcon;
  title: string;
  copy: string;
  preview: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      className="group flex flex-col gap-6 rounded-3xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(31,58,46,0.25)] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground transition-colors group-hover:bg-primary-hover">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-serif text-2xl font-medium tracking-tight text-foreground">
          {title}
        </h3>
      </div>

      <p className="text-muted leading-relaxed">{copy}</p>

      <div className="mt-auto rounded-2xl border border-border bg-background p-4">
        {preview}
      </div>
    </motion.article>
  );
}

function CampHubPreview() {
  const items = [
    { icon: UserIcon, label: "Register" },
    { icon: InfoIcon, label: "Camp" },
    { icon: ShieldIcon, label: "Safety" },
    { icon: CompassIcon, label: "Activities" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Karibu
        </span>
        <span className="text-[9px] font-mono tracking-wider text-muted">
          Tap to begin
        </span>
      </div>
      <p className="font-serif mt-3 text-base font-medium leading-tight text-foreground">
        Serengeti View Camp
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface p-2"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] font-medium text-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyPreview() {
  const stops = [
    { time: "07:30", title: "Depart Arusha", n: 1 },
    { time: "11:30", title: "Tarangire gate", n: 2 },
    { time: "16:30", title: "Sundowners", n: 3 },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
          <RouteIcon className="h-2.5 w-2.5" />
          Day 1 of 7
        </span>
        <span className="text-[9px] font-mono tracking-wider text-muted">
          Arusha → Tarangire
        </span>
      </div>
      <p className="font-serif mt-3 text-base font-medium leading-tight text-foreground">
        Today's route
      </p>
      <ol className="mt-3 space-y-2">
        {stops.map((s) => (
          <li
            key={s.n}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-2"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground font-serif">
              {s.n}
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-[11px] font-medium text-foreground">
                {s.title}
              </p>
              <p className="font-mono text-[9px] tracking-wider text-muted">
                {s.time}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SightingsPreview() {
  const sightings = [
    { animal: "Leopard with cub", area: "Seronera river", time: "Sunrise" },
    { animal: "Pride of 11 lions", area: "Naabi Hill", time: "Dusk" },
    { animal: "Cheetah on a kill", area: "Central plains", time: "Midday" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
          <BinocularsIcon className="h-2.5 w-2.5" />
          Last 48h
        </span>
        <span className="text-[9px] font-mono tracking-wider text-muted">
          By guides
        </span>
      </div>
      <p className="font-serif mt-3 text-base font-medium leading-tight text-foreground">
        Recent sightings
      </p>
      <ul className="mt-3 space-y-2">
        {sightings.map((s) => (
          <li
            key={s.animal}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-2"
          >
            <div className="flex items-center gap-2 leading-tight">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <BinocularsIcon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[11px] font-medium text-foreground">
                  {s.animal}
                </p>
                <p className="text-[9px] text-muted">{s.area}</p>
              </div>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-muted">
              {s.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
