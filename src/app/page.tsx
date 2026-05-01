import {
  Card,
  Eyebrow,
  LinkButton,
  Section,
  SectionHeading,
} from "@/components/ui";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { GuestPreviewSection } from "@/components/guest-preview-section";
import {
  ArrowRightIcon,
  CheckIcon,
  CompassIcon,
  LeafIcon,
  ShieldIcon,
  TentIcon,
  UserIcon,
} from "@/components/icons";

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <GuestPreviewSection />
        <ProblemSection />
        <SolutionSection />
        <ServesSection />
        <HowItWorks />
        <AiNativeSection />
        <FairDemoCta />
      </main>
      <SiteFooter />
    </>
  );
}

function ProblemSection() {
  const points = [
    "Paper guest books, lost forms, and check-in queues at arrival.",
    "Guests asking the same questions on radios, in WhatsApp, at the bar.",
    "Camp briefings repeated five times a day by the same exhausted manager.",
    "No durable record of who came, what they loved, or what to fix.",
  ];
  return (
    <Section id="problem" className="bg-surface/40">
      <SectionHeading
        eyebrow="The problem"
        title="Hospitality runs on welcome. Welcome still runs on paper."
        description="The first hour of a guest's stay is a loop of forms, repeat questions, and tired briefings. The data that should belong to the property — preferences, dietary needs, sightings, feedback — disappears the moment they leave."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {points.map((p) => (
          <Card key={p} className="flex gap-3">
            <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <p className="text-foreground/90 leading-relaxed">{p}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function SolutionSection() {
  const features = [
    {
      icon: CompassIcon,
      title: "One link, one tap",
      copy: "Guests scan an NFC tag or open a link. No app, no login, no friction. They land in a hub built for their property and their journey.",
    },
    {
      icon: LeafIcon,
      title: "Welcome, concierge, and data — together",
      copy: "Camp info, services, safety, sightings, registration. The first hour becomes a calm self-serve experience that frees up your team.",
    },
    {
      icon: ShieldIcon,
      title: "Guest data that stays yours",
      copy: "A durable, structured record of every guest who stayed — preferences, feedback, repeat-visit history. Owned by the property, not a platform.",
    },
  ];
  return (
    <Section id="solution">
      <SectionHeading
        eyebrow="The solution"
        title="A digital welcome you can hand a guest in a single tap."
        description="KaribuLink sits between the NFC tag at reception and the data you wish you'd kept. It's a calm, beautiful hub for the first hour — and a structured guest record for everything after."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, copy }) => (
          <Card key={title}>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-2xl font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-3 text-muted leading-relaxed">{copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ServesSection() {
  const audiences = [
    {
      icon: CompassIcon,
      label: "Tour Operators",
      copy: "Daily route hubs, guide prompts, and a memory CTA that keeps your trip alive long after the last sundowner.",
    },
    {
      icon: TentIcon,
      label: "Camps & Lodges",
      copy: "Replace the welcome packet, the laminated info card, and the check-in form with one warm, branded link.",
    },
    {
      icon: UserIcon,
      label: "BnBs & Boutique Stays",
      copy: "Self check-in, house rules, neighborhood tips, and a feedback loop — without paying enterprise prices.",
    },
  ];
  return (
    <Section id="serves" className="bg-surface/40">
      <SectionHeading
        eyebrow="Who it serves"
        title="Built for the operators who already do this work — by hand."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {audiences.map(({ icon: Icon, label, copy }) => (
          <Card key={label} className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold tracking-tight">
                {label}
              </h3>
            </div>
            <p className="mt-4 text-muted leading-relaxed">{copy}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "We design your hub",
      copy: "Camp info, services, safety, sightings, registration — pre-filled with your property's voice and visuals.",
    },
    {
      n: "02",
      title: "You place the link",
      copy: "An NFC tag at reception, a QR on the welcome card, a link in the pre-arrival email. Guests reach it in one tap.",
    },
    {
      n: "03",
      title: "Guests self-onboard",
      copy: "Registration, dietary needs, briefings, sightings — handled before they reach the bar.",
    },
    {
      n: "04",
      title: "You keep the record",
      copy: "Every interaction is structured guest data you own — feedback, preferences, repeat visitors.",
    },
  ];
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps. Designed to fit a camp, not a hotel chain."
      />
      <ol className="mt-12 grid gap-5 md:grid-cols-2">
        {steps.map((s) => (
          <li key={s.n}>
            <Card>
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-3xl font-semibold text-primary">
                  {s.n}
                </span>
                <h3 className="font-serif text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-muted leading-relaxed">{s.copy}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function AiNativeSection() {
  const principles = [
    "AI drafts the welcome content; humans approve every word.",
    "Guides see suggestions; guides decide what's said.",
    "Guest data is structured for AI — but never sold or trained on.",
    "When the network drops, the welcome page still works.",
  ];
  return (
    <section id="ai" className="bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AI-native, human-safe
            </span>
            <h2 className="font-serif mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              We use AI to do more welcoming — not less welcoming.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
              Hospitality is a human craft. AI here is back-of-house: it drafts,
              suggests, and structures — so your team can spend the saved
              minutes on the guest in front of them.
            </p>
          </div>
          <ul className="grid gap-3">
            {principles.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-primary-foreground/90 leading-relaxed">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FairDemoCta() {
  return (
    <Section id="demo">
      <Card className="text-center px-6 py-12 sm:px-12 sm:py-16">
        <div className="flex justify-center">
          <Eyebrow>Fair demo</Eyebrow>
        </div>
        <h2 className="font-serif mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          See KaribuLink the way a guest would.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted leading-relaxed">
          No login, no signup, no demo call required. Tap a link, land in a
          hub, decide for yourself. If it feels right, we'll build yours next.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/demo-camp" size="lg">
            View Demo Camp
            <ArrowRightIcon className="h-4 w-4" />
          </LinkButton>
          <LinkButton href="/demo-operator" variant="secondary" size="lg">
            View Demo Tour Operator
            <ArrowRightIcon className="h-4 w-4" />
          </LinkButton>
        </div>
      </Card>
    </Section>
  );
}
