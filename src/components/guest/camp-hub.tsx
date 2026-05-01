import Link from "next/link";
import {
  BinocularsIcon,
  CoffeeIcon,
  InfoIcon,
  LeafIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { iconFor } from "@/lib/icon-map";
import {
  AccordionAutoOpenScript,
  AccordionSection,
} from "./accordion-section";
import { StickyBottomBar } from "./sticky-bottom-bar";
import { ThemeToggle } from "./theme-toggle";
import type { Property } from "@/data/types";

const QUICK_ACTIONS = [
  { href: "#register", label: "Register", icon: UserIcon },
  { href: "#camp-info", label: "Camp Info", icon: InfoIcon },
  { href: "#safety", label: "Safety", icon: ShieldIcon },
  { href: "#services", label: "Services", icon: CoffeeIcon },
  { href: "#sightings", label: "Sightings", icon: BinocularsIcon },
  { href: "#contact", label: "Contact", icon: PhoneIcon },
];

const ACCORDION_GROUP = "camp-hub";

export function CampHub({ property }: { property: Property }) {
  return (
    <main className="flex-1 pb-24">
      <Hero property={property} />
      <QuickActions />
      <Registration />
      <Sections property={property} />
      <Contact property={property} />

      <StickyBottomBar
        phone={property.emergencyContact.phone}
        directionsQuery={`${property.name} ${property.location}`}
      />
      <AccordionAutoOpenScript />
    </main>
  );
}

function Hero({ property }: { property: Property }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#1f3a2e] dark:bg-[#06120a]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 25% 30%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 70% 60%, #fff 1px, transparent 1px), radial-gradient(1px 1px at 40% 80%, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px, 110px 110px, 90px 90px",
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-5 pt-5 pb-10 text-white sm:px-8 sm:pb-12 lg:px-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.22em] text-white/70 hover:text-white"
          >
            ← KaribuLink
          </Link>
          <ThemeToggle />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/85">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {property.heroSubtitle}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Camp is open · 24°C
          </span>
        </div>
        <h1 className="font-serif mt-3 text-2xl font-medium leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          {property.heroTitle}
        </h1>
        <p className="mt-2 max-w-md text-sm leading-snug text-white/75 line-clamp-2">
          {property.welcomeMessage}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
          {property.location}
        </p>
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <section className="relative -mt-7 px-5 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-md sm:max-w-lg">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-surface p-2 shadow-[0_8px_30px_-12px_rgba(31,58,46,0.18)] sm:gap-3 sm:p-3">
          {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-center transition-all duration-150 hover:bg-background active:scale-[0.97] sm:gap-2 sm:min-h-24"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground transition-colors group-hover:bg-primary-hover">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-medium tracking-tight text-foreground sm:text-xs">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Registration() {
  return (
    <section
      id="register"
      className="px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Check-in
              </span>
              <h2 className="font-serif mt-2 text-xl font-medium leading-tight tracking-tight text-foreground sm:text-2xl">
                Register your stay
              </h2>
            </div>
            <span className="text-[10px] text-muted">~10 sec</span>
          </div>
          <form className="mt-4 grid gap-2 sm:grid-cols-2">
            <SlimField label="Full name" placeholder="As on your passport" />
            <SlimField label="Email" type="email" placeholder="you@example.com" />
            <SlimField label="Country" placeholder="Country of residence" />
            <SlimField
              label="Tour operator"
              placeholder="Optional"
              optional
            />
            <button
              type="button"
              className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.98] sm:col-span-2"
            >
              Submit registration
            </button>
            <p className="text-[10px] text-muted sm:col-span-2">
              Demo — nothing is saved.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function SlimField({
  label,
  type = "text",
  placeholder,
  optional = false,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        {optional && (
          <span className="text-[10px] text-muted">optional</span>
        )}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none"
      />
    </label>
  );
}

function Sections({ property }: { property: Property }) {
  return (
    <section className="px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-5xl gap-2">
        {property.amenities.length > 0 && (
          <AccordionSection
            id="camp-info"
            group={ACCORDION_GROUP}
            icon={InfoIcon}
            title="About the camp"
            count={property.amenities.length}
          >
            <ItemList items={property.amenities} accent={false} />
          </AccordionSection>
        )}

        {property.services.length > 0 && (
          <AccordionSection
            id="services"
            group={ACCORDION_GROUP}
            icon={CoffeeIcon}
            title="Services"
            count={property.services.length}
          >
            <ServiceList items={property.services} />
          </AccordionSection>
        )}

        {property.safetyNotes.length > 0 && (
          <AccordionSection
            id="safety"
            group={ACCORDION_GROUP}
            icon={ShieldIcon}
            title="Safety"
            count={property.safetyNotes.length}
          >
            <ItemList items={property.safetyNotes} accent />
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-danger/40 bg-danger/5 p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-foreground">
                <span className="font-medium">Emergency: </span>
                {property.emergencyContact.label}
              </p>
              <a
                href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-danger px-3 text-xs font-medium text-white hover:opacity-90"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                {property.emergencyContact.phone}
              </a>
            </div>
          </AccordionSection>
        )}

        {property.sightings.length > 0 && (
          <AccordionSection
            id="sightings"
            group={ACCORDION_GROUP}
            icon={BinocularsIcon}
            title="Recent sightings"
            count={property.sightings.length}
          >
            <ul className="grid gap-2">
              {property.sightings.map((s) => (
                <li
                  key={`${s.day}-${s.animal}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-2.5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <BinocularsIcon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 leading-tight">
                    <p className="text-sm font-medium text-foreground">
                      {s.animal}
                    </p>
                    <p className="text-xs text-muted">
                      {s.area} · {s.spotter}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-muted">
                    {s.day}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionSection>
        )}

        {property.staff.length > 0 && (
          <AccordionSection
            id="team"
            group={ACCORDION_GROUP}
            icon={UserIcon}
            title="Meet the team"
            count={property.staff.length}
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {property.staff.map((m) => (
                <div
                  key={m.name}
                  className="rounded-xl border border-border bg-background p-3"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary font-serif text-xs font-semibold">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <p className="mt-2 font-serif text-sm font-medium tracking-tight">
                    {m.name}
                  </p>
                  <p className="text-[11px] text-primary">{m.role}</p>
                  <p className="mt-1 text-[11px] text-muted leading-snug">
                    {m.bio}
                  </p>
                </div>
              ))}
            </div>
          </AccordionSection>
        )}

        {property.rules.length > 0 && (
          <AccordionSection
            id="rules"
            group={ACCORDION_GROUP}
            icon={LeafIcon}
            title="House rules"
            count={property.rules.length}
          >
            <ul className="grid gap-2">
              {property.rules.map((rule) => (
                <li
                  key={rule}
                  className="flex gap-2 rounded-xl border border-border bg-background p-3"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-snug text-foreground/90">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionSection>
        )}
      </div>
    </section>
  );
}

function ItemList({
  items,
  accent,
}: {
  items: { iconKey: string; label: string; detail: string }[];
  accent: boolean;
}) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => {
        const Icon = iconFor(item.iconKey as never);
        return (
          <li
            key={item.label}
            className="flex gap-3 rounded-xl border border-border bg-background p-3"
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                accent
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="mt-0.5 text-xs text-muted leading-snug">
                {item.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ServiceList({
  items,
}: {
  items: { iconKey: string; label: string; detail: string }[];
}) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => {
        const Icon = iconFor(item.iconKey as never);
        return (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/20 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted leading-snug">{item.detail}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.95]"
            >
              Request
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Contact({ property }: { property: Property }) {
  return (
    <section
      id="contact"
      className="px-5 pt-6 sm:px-8 sm:pt-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Contact
            </span>
            <span className="text-[10px] text-muted">{property.location}</span>
          </div>
          <h2 className="font-serif mt-2 text-lg font-medium leading-tight tracking-tight text-foreground">
            We're a tap away.
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a
              href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
              className="inline-flex h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 hover:border-primary/40"
            >
              <span className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {property.emergencyContact.label}
                </span>
              </span>
              <span className="text-xs text-muted">
                {property.emergencyContact.phone}
              </span>
            </a>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 hover:border-primary/40"
            >
              <span className="text-sm font-medium">Back to KaribuLink</span>
              <span className="text-xs text-muted">karibulink.com</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
