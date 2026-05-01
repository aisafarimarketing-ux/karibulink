import Link from "next/link";
import {
  Card,
  Eyebrow,
  LinkButton,
  Section,
  SectionHeading,
} from "@/components/ui";
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
import type { Operator, SafariRoute } from "@/data/types";

const QUICK_ACTIONS = [
  { href: "#route", label: "Today's Route", icon: RouteIcon },
  { href: "#expect", label: "What to Expect", icon: BinocularsIcon },
  { href: "#guide", label: "Ask Your Guide", icon: MessageIcon },
  { href: "#memories", label: "Save Memories", icon: CameraIcon },
  { href: "#emergency", label: "Emergency", icon: ShieldIcon },
];

export function OperatorHub({ operator }: { operator: Operator }) {
  const todayRoute = operator.routes[0];
  return (
    <main className="flex-1">
      <Hero operator={operator} />
      <QuickActions />
      {todayRoute && <RouteSection route={todayRoute} />}
      <Expect operator={operator} />
      <Guide operator={operator} />
      <NightArrival />
      <Memories />
      <Emergency operator={operator} />
    </main>
  );
}

function Hero({ operator }: { operator: Operator }) {
  const j = operator.journeyNotes;
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-[#16291f] text-primary-foreground" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 25%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 65% 55%, #fff 1px, transparent 1px), radial-gradient(2px 2px at 80% 80%, #fff 1px, transparent 1px)",
          backgroundSize: "120px 120px, 90px 90px, 140px 140px",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-14 text-primary-foreground sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70 hover:text-primary-foreground"
        >
          ← KaribuLink
        </Link>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/80">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {j.heroEyebrow}
        </span>
        <h1 className="font-serif mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
          {j.heroTitle}
        </h1>
        <p className="mt-5 max-w-xl text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
          {j.heroSubtitle}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
          {operator.name}
        </p>
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <section className="px-5 sm:px-8 lg:px-12 -mt-10 sm:-mt-14 relative">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-start gap-3 rounded-3xl border border-border bg-surface p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground transition-colors group-hover:bg-primary-hover">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium tracking-tight text-foreground">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteSection({ route }: { route: SafariRoute }) {
  return (
    <Section id="route">
      <SectionHeading
        eyebrow={`Day ${route.day} · ${route.name}`}
        title={route.fromTo}
        description="A drive day with a long, slow afternoon in the park. Bring a water bottle, sunscreen, and a layer — the rooftop is breezy."
      />
      <ol className="mt-10 grid gap-3">
        {route.stops.map((r, i) => (
          <li key={`${r.time}-${r.title}`}>
            <Card className="flex gap-4">
              <div className="flex w-16 shrink-0 flex-col items-center">
                <span className="font-mono text-xs tracking-wider text-primary">
                  {r.time}
                </span>
                <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-sm font-semibold">
                  {i + 1}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-1 text-muted leading-relaxed">{r.detail}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Expect({ operator }: { operator: Operator }) {
  const items = operator.journeyNotes.expectations;
  if (items.length === 0) return null;
  return (
    <Section id="expect" className="bg-surface/40">
      <SectionHeading
        eyebrow="What to expect"
        title="The country, the people, and the wildlife."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = iconFor(item.iconKey);
          return (
            <Card key={item.label} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold tracking-tight">
                  {item.label}
                </h3>
                <p className="mt-1 text-muted leading-relaxed">{item.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function Guide({ operator }: { operator: Operator }) {
  const lead = operator.guides[0];
  const prompts = operator.journeyNotes.prompts;
  return (
    <Section id="guide">
      <SectionHeading
        eyebrow="Ask your guide"
        title="Conversation starters, if you'd like them."
        description="A guide loves a curious guest. Pick any of these in the vehicle, or ignore them and just watch — both are good."
      />
      {prompts.length > 0 && (
        <div className="mt-10 grid gap-3">
          {prompts.map((p) => (
            <Card key={p} className="flex items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent/20 text-primary">
                <MessageIcon className="h-5 w-5" />
              </span>
              <p className="text-foreground/90 leading-relaxed">{p}</p>
            </Card>
          ))}
        </div>
      )}
      {lead && (
        <Card className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-semibold">
              {lead.initials}
            </div>
            <div>
              <p className="font-serif text-lg font-semibold tracking-tight">
                {lead.name}
              </p>
              <p className="text-sm text-muted">{lead.role}</p>
            </div>
          </div>
          <a
            href={`tel:${lead.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium hover:border-primary/40"
          >
            <PhoneIcon className="h-4 w-4 text-primary" />
            Call {lead.name.split(" ")[0]}
          </a>
        </Card>
      )}
    </Section>
  );
}

function NightArrival() {
  return (
    <section id="night" className="bg-[#0d1a14] text-primary-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/80">
          <MoonIcon className="h-3.5 w-3.5" />
          Night arrival mode
        </span>
        <h2 className="font-serif mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Arriving after dark? We've got you.
        </h2>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
          When the sun is down, this hub switches to low-light mode: bigger
          buttons, dimmer screen, only the essentials.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <NightCard
            icon={CompassIcon}
            title="Where am I?"
            detail="Your driver knows. We'll send the ETA and gate name to your phone the moment you cross into the park."
          />
          <NightCard
            icon={InfoIcon}
            title="Tent number & path"
            detail="When you reach camp, the askari walks you to your tent. Your tent number waits for you here."
          />
          <NightCard
            icon={ShieldIcon}
            title="One-tap reception"
            detail="One big button. Reach the manager on duty without scrolling, without typing."
          />
        </div>
      </div>
    </section>
  );
}

function NightCard({
  icon: Icon,
  title,
  detail,
}: {
  icon: typeof CompassIcon;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-serif text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-primary-foreground/80 leading-relaxed">
        {detail}
      </p>
    </div>
  );
}

function Memories() {
  return (
    <Section id="memories">
      <Card className="grid gap-8 px-6 py-12 sm:grid-cols-[1.2fr_1fr] sm:items-center sm:px-12 sm:py-16">
        <div>
          <Eyebrow>Save the memory</Eyebrow>
          <h2 className="font-serif mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            The trip ends. The story shouldn't.
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            At the end of your journey, this hub turns into a quiet memory book
            — guide notes, sightings, a few photos, the names of the people you
            met. Yours to keep, share, and come back to.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#" size="lg">
              Start my memory book
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/" variant="secondary" size="lg">
              About KaribuLink
            </LinkButton>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { day: "Day 1", caption: "Tarangire baobabs" },
            { day: "Day 2", caption: "Lake Manyara" },
            { day: "Day 3", caption: "Ngorongoro Crater" },
            { day: "Day 4", caption: "Serengeti" },
          ].map((m, i) => (
            <div
              key={m.day}
              className={`rounded-2xl border border-border bg-background p-4 ${
                i === 0 ? "sm:translate-y-2" : ""
              } ${i === 1 ? "sm:-translate-y-2" : ""}`}
            >
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/15 via-accent/20 to-primary/30" />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted">
                {m.day}
              </p>
              <p className="font-serif text-sm font-semibold">{m.caption}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function Emergency({ operator }: { operator: Operator }) {
  return (
    <Section id="emergency" className="bg-surface/40">
      <Card className="border-danger/40 bg-danger/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-danger text-white">
              <ShieldIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-serif text-xl font-semibold tracking-tight">
                In an emergency
              </p>
              <p className="mt-1 text-muted">
                {operator.emergencyContact.label} — on call across all your
                travel days. One tap. One person picks up.
              </p>
            </div>
          </div>
          <a
            href={`tel:${operator.emergencyContact.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-danger px-6 text-sm font-medium text-white hover:opacity-90"
          >
            <PhoneIcon className="h-4 w-4" />
            {operator.emergencyContact.phone}
          </a>
        </div>
      </Card>
    </Section>
  );
}
