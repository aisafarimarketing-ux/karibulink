import Link from "next/link";
import {
  Card,
  Eyebrow,
  LinkButton,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  BinocularsIcon,
  CompassIcon,
  CoffeeIcon,
  InfoIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { iconFor } from "@/lib/icon-map";
import type { Property } from "@/data/types";

const QUICK_ACTIONS = [
  { href: "#register", label: "Register", icon: UserIcon },
  { href: "#camp-info", label: "Camp Info", icon: InfoIcon },
  { href: "#safety", label: "Safety", icon: ShieldIcon },
  { href: "#services", label: "Services", icon: CoffeeIcon },
  { href: "#sightings", label: "Recent Sightings", icon: BinocularsIcon },
  { href: "#contact", label: "Contact", icon: PhoneIcon },
];

export function CampHub({ property }: { property: Property }) {
  return (
    <main className="flex-1">
      <Hero property={property} />
      <QuickActions />
      <CampInfo property={property} />
      <Services property={property} />
      <Safety property={property} />
      {property.rules.length > 0 && <Rules property={property} />}
      {property.sightings.length > 0 && <Sightings property={property} />}
      <Team property={property} />
      <Registration />
      <Contact property={property} />
    </main>
  );
}

function Hero({ property }: { property: Property }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/95 to-primary text-primary-foreground" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 25% 30%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 70% 60%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px, 110px 110px, 90px 90px",
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
          {property.heroSubtitle}
        </span>
        <h1 className="font-serif mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
          {property.heroTitle}
        </h1>
        <p className="mt-5 max-w-xl text-base sm:text-lg text-primary-foreground/80 leading-relaxed">
          {property.welcomeMessage}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
          {property.location}
        </p>
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <section className="px-5 sm:px-8 lg:px-12 -mt-10 sm:-mt-14 relative">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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

function CampInfo({ property }: { property: Property }) {
  if (property.amenities.length === 0) return null;
  return (
    <Section id="camp-info">
      <SectionHeading
        eyebrow="Camp info"
        title="The essentials, in one place."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {property.amenities.map((item) => {
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

function Services({ property }: { property: Property }) {
  if (property.services.length === 0) return null;
  return (
    <Section id="services" className="bg-surface/40">
      <SectionHeading
        eyebrow="Services"
        title="Ask for what you need. We'll handle the rest."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {property.services.map((item) => {
          const Icon = iconFor(item.iconKey);
          return (
            <Card key={item.label} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/20 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold tracking-tight">
                    {item.label}
                  </h3>
                  <button
                    type="button"
                    className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
                  >
                    Request
                  </button>
                </div>
                <p className="mt-1 text-muted leading-relaxed">{item.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function Safety({ property }: { property: Property }) {
  if (property.safetyNotes.length === 0) return null;
  return (
    <Section id="safety">
      <SectionHeading
        eyebrow="Safety"
        title="Calm, clear, ready."
        description="Wildlife, weather, paths after dark — what you need to know to feel at ease."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {property.safetyNotes.map((item) => {
          const Icon = iconFor(item.iconKey);
          return (
            <Card key={item.label}>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold tracking-tight">
                {item.label}
              </h3>
              <p className="mt-2 text-muted leading-relaxed">{item.detail}</p>
            </Card>
          );
        })}
      </div>
      <Card className="mt-6 flex flex-col gap-2 border-danger/40 bg-danger/5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-foreground">In an emergency</p>
          <p className="text-sm text-muted">{property.emergencyContact.label}</p>
        </div>
        <a
          href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-danger px-5 text-sm font-medium text-white hover:opacity-90"
        >
          <PhoneIcon className="h-4 w-4" />
          {property.emergencyContact.phone}
        </a>
      </Card>
    </Section>
  );
}

function Rules({ property }: { property: Property }) {
  return (
    <Section id="rules">
      <SectionHeading
        eyebrow="House rules"
        title="A few small things, for the place and the people."
      />
      <Card className="mt-10">
        <ul className="grid gap-3">
          {property.rules.map((rule) => (
            <li
              key={rule}
              className="flex gap-3 rounded-2xl border border-border bg-background p-4"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-foreground/90 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function Sightings({ property }: { property: Property }) {
  return (
    <Section id="sightings" className="bg-surface/40">
      <SectionHeading
        eyebrow="Recent sightings"
        title="What guides have spotted in the last 48 hours."
        description="Updated by our guides each evening. Tomorrow's plan is shaped by what came in today."
      />
      <ul className="mt-10 grid gap-3">
        {property.sightings.map((s) => (
          <li key={`${s.day}-${s.animal}`}>
            <Card className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <BinocularsIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold tracking-tight">
                    {s.animal}
                  </p>
                  <p className="text-sm text-muted">
                    {s.area} · {s.spotter}
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                {s.day}
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Team({ property }: { property: Property }) {
  if (property.staff.length === 0) return null;
  return (
    <Section id="team">
      <SectionHeading
        eyebrow="Meet the team"
        title="The people who make it feel like home."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {property.staff.map((m) => (
          <Card key={m.name}>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary font-serif text-lg font-semibold">
              {m.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <h3 className="mt-4 font-serif text-lg font-semibold tracking-tight">
              {m.name}
            </h3>
            <p className="text-sm text-primary">{m.role}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{m.bio}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Registration() {
  return (
    <Section id="register" className="bg-surface/40">
      <SectionHeading
        eyebrow="Guest registration"
        title="A few details. Then please go and have your gin and tonic."
        description="Your details stay with the property. Required for park regulations and to make your stay easier — never sold, never shared."
      />
      <Card className="mt-10">
        <form className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" placeholder="As on your passport" />
          <Field label="Country" placeholder="Country of residence" />
          <Field label="Email" type="email" placeholder="you@example.com" />
          <Field label="Phone" type="tel" placeholder="+255 …" />
          <Field label="Passport number" placeholder="For park records" />
          <Field label="Arrival date" type="date" />

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground">
              Dietary needs
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Vegetarian",
                "Vegan",
                "Gluten-free",
                "Halal",
                "Pescatarian",
                "No restrictions",
              ].map((d) => (
                <label
                  key={d}
                  className="cursor-pointer rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:border-primary/40 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary"
                >
                  <input type="checkbox" className="sr-only" />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground">
              Anything we should know?
            </label>
            <textarea
              rows={4}
              placeholder="Allergies, mobility needs, special occasions, surprises in the works…"
              className="mt-2 w-full rounded-2xl border border-border bg-background p-4 text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">Demo only — nothing is saved.</p>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Submit registration
            </button>
          </div>
        </form>
      </Card>
    </Section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none"
      />
    </label>
  );
}

function Contact({ property }: { property: Property }) {
  return (
    <Section id="contact">
      <Card className="grid gap-6 sm:grid-cols-2 sm:items-center">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-serif mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
            We're a tap away.
          </h2>
          <p className="mt-2 text-muted leading-relaxed">
            Tent radio · WhatsApp · or walk over to the main lounge — coffee on
            all day.
          </p>
        </div>
        <div className="grid gap-3">
          <a
            href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-12 items-center justify-between gap-3 rounded-2xl border border-border bg-background px-5 hover:border-primary/40"
          >
            <span className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">{property.emergencyContact.label}</span>
            </span>
            <span className="text-sm text-muted">
              {property.emergencyContact.phone}
            </span>
          </a>
          <a
            href="#"
            className="inline-flex h-12 items-center justify-between gap-3 rounded-2xl border border-border bg-background px-5 hover:border-primary/40"
          >
            <span className="flex items-center gap-3">
              <CompassIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">Directions</span>
            </span>
            <span className="text-sm text-muted">{property.location}</span>
          </a>
          <LinkButton
            href="/"
            variant="secondary"
            size="md"
            className="justify-between"
          >
            <span>Back to KaribuLink</span>
            <span className="text-sm text-muted">karibulink.com</span>
          </LinkButton>
        </div>
      </Card>
    </Section>
  );
}
