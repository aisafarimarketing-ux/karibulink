import Link from "next/link";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CameraIcon,
  CompassIcon,
  InfoIcon,
  MessageIcon,
  MoonIcon,
  PhoneIcon,
  RouteIcon,
  ShieldIcon,
} from "@/components/icons";
import { iconFor } from "@/lib/icon-map";
import {
  AccordionAutoOpenScript,
  AccordionSection,
} from "./accordion-section";
import { HeroCard } from "./hero-card";
import { MobileFrame } from "./mobile-frame";
import { StickyActionBar, type ActionItem } from "./sticky-action-bar";
import { StickyBottomBar } from "./sticky-bottom-bar";
import type { Operator, SafariRoute } from "@/data/types";

const ACTIONS: ActionItem[] = [
  { id: "route", label: "Today's Route", iconKey: "route" },
  { id: "expect", label: "What to Expect", iconKey: "binoculars" },
  { id: "guide", label: "Ask Guide", iconKey: "message" },
  { id: "memories", label: "Memories", iconKey: "camera" },
  { id: "emergency", label: "Emergency", iconKey: "shield" },
];

const ACCORDION_GROUP = "operator-hub";

export function OperatorHub({ operator }: { operator: Operator }) {
  const todayRoute = operator.routes[0];
  const j = operator.journeyNotes;

  return (
    <main className="flex-1 pb-28">
      <MobileFrame>
        <HeroCard
          eyebrow={j.heroEyebrow}
          status="On safari · 24°C"
          title={j.heroTitle}
          description={j.heroSubtitle}
          meta={operator.name}
        />
        <StickyActionBar actions={ACTIONS} />
        {todayRoute && <RouteSummary route={todayRoute} />}
        <Sections operator={operator} />
        <Emergency operator={operator} />
      </MobileFrame>

      <StickyBottomBar
        phone={operator.emergencyContact.phone}
        directionsQuery={`${operator.name} ${todayRoute?.fromTo ?? ""}`}
      />
      <AccordionAutoOpenScript />
    </main>
  );
}

function RouteSummary({ route }: { route: SafariRoute }) {
  return (
    <section id="route" className="scroll-mt-20 px-3 pt-4 sm:px-4">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            <RouteIcon className="h-3 w-3" />
            Day {route.day} · {route.fromTo}
          </span>
          <span className="text-[10px] text-muted">
            {route.stops.length} stops
          </span>
        </div>
        <h2 className="font-serif mt-2 text-xl font-medium leading-tight tracking-tight text-foreground">
          {route.name}
        </h2>
        <ol className="mt-3 grid gap-1.5">
          {route.stops.map((r, i) => (
            <li
              key={`${r.time}-${r.title}`}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-2.5"
            >
              <span className="font-mono w-12 shrink-0 pt-0.5 text-[11px] font-medium tracking-wider text-primary">
                {r.time}
              </span>
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-medium text-primary font-serif">
                {i + 1}
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-sm font-medium text-foreground">{r.title}</p>
                <p className="mt-0.5 text-xs text-muted leading-snug">
                  {r.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Sections({ operator }: { operator: Operator }) {
  const expectations = operator.journeyNotes.expectations;
  const prompts = operator.journeyNotes.prompts;
  const lead = operator.guides[0];

  const summarize = (items: { label: string }[], take = 3) => {
    const labels = items.slice(0, take).map((i) => i.label);
    const more = items.length - take;
    return more > 0 ? `${labels.join(" · ")} +${more} more` : labels.join(" · ");
  };

  return (
    <section className="px-3 pt-4 sm:px-4">
      <div className="grid gap-2">
        {expectations.length > 0 && (
          <AccordionSection
            id="expect"
            group={ACCORDION_GROUP}
            icon={BinocularsIcon}
            title="What to expect"
            subtitle={summarize(expectations)}
          >
            <ul className="grid gap-2">
              {expectations.map((item) => {
                const Icon = iconFor(item.iconKey);
                return (
                  <li
                    key={item.label}
                    className="flex gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AccordionSection>
        )}

        <AccordionSection
          id="guide"
          group={ACCORDION_GROUP}
          icon={MessageIcon}
          title="Ask your guide"
          subtitle={
            lead
              ? `${lead.name.split(" ")[0]} · ${prompts.length} prompts`
              : `${prompts.length} conversation starters`
          }
        >
          {lead && (
            <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-xs font-semibold">
                  {lead.initials}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-foreground">
                    {lead.name}
                  </p>
                  <p className="text-[11px] text-muted">{lead.role}</p>
                </div>
              </div>
              <a
                href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-border bg-surface px-3 text-xs font-medium transition-all duration-150 hover:border-primary/40 active:scale-[0.97]"
              >
                <PhoneIcon className="h-3.5 w-3.5 text-primary" />
                Call
              </a>
            </div>
          )}
          {prompts.length > 0 && (
            <ul className="grid gap-2">
              {prompts.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/20 text-primary">
                    <MessageIcon className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-snug text-foreground/90">{p}</p>
                </li>
              ))}
            </ul>
          )}
        </AccordionSection>

        <AccordionSection
          id="night"
          group={ACCORDION_GROUP}
          icon={MoonIcon}
          title="Night arrival mode"
          subtitle="After-dark essentials"
        >
          <p className="mb-3 text-sm leading-snug text-muted">
            After dark: bigger buttons, dimmer screen, only the essentials.
          </p>
          <ul className="grid gap-2">
            {[
              {
                icon: CompassIcon,
                title: "Where am I?",
                detail: "ETA + gate name as you cross into the park.",
              },
              {
                icon: InfoIcon,
                title: "Tent number",
                detail: "Waits here when you reach camp.",
              },
              {
                icon: ShieldIcon,
                title: "One-tap reception",
                detail: "Manager on duty, no scrolling.",
              },
            ].map(({ icon: Icon, title, detail }) => (
              <li
                key={title}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/20 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="font-serif text-sm font-medium text-foreground">
                    {title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted leading-snug">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection
          id="memories"
          group={ACCORDION_GROUP}
          icon={CameraIcon}
          title="Save memories"
          subtitle="Trip-end memory book"
        >
          <p className="text-sm leading-snug text-muted">
            At trip end, this hub turns into a quiet memory book — guide notes,
            sightings, photos, names. Yours to keep.
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { day: "Day 1", caption: "Tarangire baobabs" },
              { day: "Day 2", caption: "Lake Manyara" },
              { day: "Day 3", caption: "Ngorongoro" },
              { day: "Day 4", caption: "Serengeti" },
            ].map((m) => (
              <div
                key={m.day}
                className="rounded-lg border border-border bg-background p-1.5"
              >
                <div className="aspect-square rounded-md bg-gradient-to-br from-primary/15 via-accent/20 to-primary/30" />
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-muted">
                  {m.day}
                </p>
                <p className="font-serif text-[11px] font-medium leading-tight text-foreground">
                  {m.caption}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="#"
            className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.97]"
          >
            Start my memory book
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </AccordionSection>
      </div>
    </section>
  );
}

function Emergency({ operator }: { operator: Operator }) {
  return (
    <section id="emergency" className="scroll-mt-20 px-3 pt-4 sm:px-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-danger/40 bg-danger/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-danger text-white">
            <ShieldIcon className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-base font-medium tracking-tight text-foreground">
              In an emergency
            </p>
            <p className="text-xs text-muted">
              {operator.emergencyContact.label} — 24/7
            </p>
          </div>
        </div>
        <a
          href={`tel:${operator.emergencyContact.phone.replace(/\s+/g, "")}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-danger px-5 text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
        >
          <PhoneIcon className="h-4 w-4" />
          {operator.emergencyContact.phone}
        </a>
      </div>
    </section>
  );
}
