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
  LeafIcon,
  MessageIcon,
  MoonIcon,
  PhoneIcon,
  RouteIcon,
  ShieldIcon,
  StarIcon,
  UserIcon,
} from "@/components/icons";

export const metadata = {
  title: "Your Safari Journey — KaribuLink Demo",
  description: "Demo tour-operator hub for a multi-day safari journey.",
};

const QUICK_ACTIONS = [
  { href: "#route", label: "Today's Route", icon: RouteIcon },
  { href: "#expect", label: "What to Expect", icon: BinocularsIcon },
  { href: "#guide", label: "Ask Your Guide", icon: MessageIcon },
  { href: "#memories", label: "Save Memories", icon: CameraIcon },
  { href: "#emergency", label: "Emergency", icon: ShieldIcon },
];

const ROUTE = [
  {
    time: "07:30",
    title: "Depart Arusha",
    detail: "Coffee, water, and a rest stop at the Maasai market. Roughly 3 hours of road.",
  },
  {
    time: "10:30",
    title: "Mto wa Mbu — coffee + rooftop view",
    detail: "Stretch your legs, watch the Rift Valley wall rise on your left.",
  },
  {
    time: "11:30",
    title: "Tarangire gate — into the park",
    detail: "Park fees handled. Roof up, cameras out. We're on guide-time from here.",
  },
  {
    time: "13:00",
    title: "Picnic lunch under a baobab",
    detail: "The big-tusker matriarchs come down to drink at midday. We sit and watch.",
  },
  {
    time: "16:30",
    title: "Sundowners on the Tarangire River escarpment",
    detail: "Gin, tonic, and a herd of 200 elephants moving downriver in the gold light.",
  },
  {
    time: "18:00",
    title: "Camp",
    detail: "Hot showers, dinner, sleep to the sound of lions calling across the valley.",
  },
];

const EXPECT = [
  {
    icon: LeafIcon,
    label: "Landscape",
    detail:
      "Tarangire's signature: ancient baobabs, golden grasslands, and a river valley that holds water all year — which is why everything else gathers here.",
  },
  {
    icon: UserIcon,
    label: "Culture",
    detail:
      "You'll pass through Maasai grazing land. If you'd like to visit a boma, ask your guide — it's an arranged visit, not a stop on a tour.",
  },
  {
    icon: BinocularsIcon,
    label: "Wildlife — likely",
    detail:
      "Elephants in family groups, giraffe, zebra, impala, baboons. Tarangire is the elephant park.",
  },
  {
    icon: StarIcon,
    label: "Wildlife — possible",
    detail:
      "Lion (especially in trees), leopard at dusk, cheetah on the open plains, the rare fringe-eared oryx.",
  },
];

const GUIDE_PROMPTS = [
  "What's the most exciting thing you've seen this week?",
  "Why are the elephants here, and not somewhere else right now?",
  "Tell me about the baobabs — how old is the biggest one we passed?",
  "What's the bird I keep hearing? The one that sounds like water dripping.",
  "Where would you go if you had a free day in Tarangire?",
];

export default function DemoOperatorPage() {
  return (
    <main className="flex-1">
      <Hero />
      <QuickActions />
      <Route />
      <Expect />
      <Guide />
      <NightArrival />
      <Memories />
      <Emergency />
    </main>
  );
}

function Hero() {
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
          Day 1 of 7 · Safari Journey
        </span>
        <h1 className="font-serif mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
          Welcome to Your Safari Journey
        </h1>
        <p className="mt-5 max-w-xl text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
          Today: Arusha to Tarangire. Your guide is James — Maasai-born,
          quiet expert on big cats. Everything you need is below. Tap any card.
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

function Route() {
  return (
    <Section id="route">
      <SectionHeading
        eyebrow="Today's route"
        title="Arusha → Tarangire"
        description="A drive day with a long, slow afternoon in the park. Bring a water bottle, sunscreen, and a layer — the rooftop is breezy."
      />
      <ol className="mt-10 grid gap-3">
        {ROUTE.map((r, i) => (
          <li key={r.time} className="relative">
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

function Expect() {
  return (
    <Section id="expect" className="bg-surface/40">
      <SectionHeading
        eyebrow="What to expect"
        title="The country, the people, and the wildlife of Tarangire."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {EXPECT.map(({ icon: Icon, label, detail }) => (
          <Card key={label} className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold tracking-tight">
                {label}
              </h3>
              <p className="mt-1 text-muted leading-relaxed">{detail}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Guide() {
  return (
    <Section id="guide">
      <SectionHeading
        eyebrow="Ask your guide"
        title="Conversation starters, if you'd like them."
        description="A guide loves a curious guest. Pick any of these in the vehicle, or ignore them and just watch — both are good."
      />
      <div className="mt-10 grid gap-3">
        {GUIDE_PROMPTS.map((p) => (
          <Card key={p} className="flex items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent/20 text-primary">
              <MessageIcon className="h-5 w-5" />
            </span>
            <p className="text-foreground/90 leading-relaxed">{p}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-lg font-semibold">
            JL
          </div>
          <div>
            <p className="font-serif text-lg font-semibold tracking-tight">
              James Lekishon
            </p>
            <p className="text-sm text-muted">
              Your guide today · 14 years in northern Tanzania
            </p>
          </div>
        </div>
        <a
          href="tel:+255700000001"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium hover:border-primary/40"
        >
          <PhoneIcon className="h-4 w-4 text-primary" />
          Call James
        </a>
      </Card>
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
            At the end of your journey, this hub turns into a quiet memory
            book — guide notes, sightings, a few photos, the names of the
            people you met. Yours to keep, share, and come back to.
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

function Emergency() {
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
                Operations is on call 24/7 across all your travel days. One
                tap. One person picks up.
              </p>
            </div>
          </div>
          <a
            href="tel:+255700000002"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-danger px-6 text-sm font-medium text-white hover:opacity-90"
          >
            <PhoneIcon className="h-4 w-4" />
            Call operations
          </a>
        </div>
      </Card>
    </Section>
  );
}
