"use client";

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
import { HeroCard } from "./hero-card";
import { LanguageProvider, useT } from "./language-context";
import { LanguageSelector } from "./language-selector";
import { MobileFrame } from "./mobile-frame";
import { StickyActionBar, type ActionItem } from "./sticky-action-bar";
import { StickyBottomBar } from "./sticky-bottom-bar";
import type { Property } from "@/data/types";

const ACTIONS: ActionItem[] = [
  { id: "register", labelKey: "register", iconKey: "user" },
  { id: "camp-info", labelKey: "campInfo", iconKey: "info" },
  { id: "safety", labelKey: "safety", iconKey: "shield" },
  { id: "services", labelKey: "services", iconKey: "coffee" },
  { id: "sightings", labelKey: "sightings", iconKey: "binoculars" },
  { id: "contact", labelKey: "contact", iconKey: "phone" },
];

const ACCORDION_GROUP = "camp-hub";

export function CampHub({
  property,
  inPreview = false,
}: {
  property: Property;
  inPreview?: boolean;
}) {
  return (
    <LanguageProvider>
      <main className="flex-1">
        <MobileFrame inPreview={inPreview}>
          <CampHero property={property} />
          <StickyActionBar actions={ACTIONS} />
          <Registration />
          <Sections property={property} />
          <Contact property={property} />
          <StickyBottomBar
            phone={property.emergencyContact.phone}
            directionsQuery={`${property.name} ${property.location}`}
          />
        </MobileFrame>
        <AccordionAutoOpenScript />
      </main>
    </LanguageProvider>
  );
}

function CampHero({ property }: { property: Property }) {
  const t = useT();
  return (
    <HeroCard
      eyebrow={property.heroSubtitle}
      status={`${t("statusOpen")} · 24°C`}
      title={property.heroTitle}
      description={property.welcomeMessage}
      meta={property.location}
      imageUrl={property.heroImageUrl}
      toolbar={<LanguageSelector />}
    />
  );
}

function Registration() {
  const t = useT();
  return (
    <section id="register" className="scroll-mt-20 px-3 pt-4 sm:px-4">
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t("checkIn")}
          </span>
          <span className="text-[10px] text-muted">~10 sec</span>
        </div>
        <h2 className="font-serif mt-2 text-xl font-medium leading-tight tracking-tight text-foreground">
          {t("registerYourStay")}
        </h2>
        <p className="mt-1 text-xs text-muted leading-snug">
          {t("registerHelp")}
        </p>
        <form className="mt-3 grid gap-2">
          <SlimField label={t("fullName")} />
          <SlimField label={t("email")} type="email" placeholder="you@example.com" />
          <SlimField label={t("country")} />
          <SlimField label={t("tourOperator")} optional />
          <button
            type="button"
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary-hover active:scale-[0.98]"
          >
            {t("submitRegister")}
          </button>
          <p className="text-[10px] text-muted">{t("demoOnly")}</p>
        </form>
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
  const t = useT();
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        {optional && (
          <span className="text-[10px] text-muted">{t("optional")}</span>
        )}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}

function Sections({ property }: { property: Property }) {
  const t = useT();
  const summarize = (
    items: { label: string }[] | { animal: string }[],
    field: "label" | "animal" = "label",
    take = 3,
  ) => {
    const labels = items
      .slice(0, take)
      .map((it) =>
        field === "label"
          ? (it as { label: string }).label
          : (it as { animal: string }).animal,
      );
    const more = items.length - take;
    return more > 0 ? `${labels.join(" · ")} +${more} more` : labels.join(" · ");
  };

  return (
    <section className="px-3 pt-4 sm:px-4">
      <div className="grid gap-2">
        {property.amenities.length > 0 && (
          <AccordionSection
            id="camp-info"
            group={ACCORDION_GROUP}
            icon={InfoIcon}
            title={t("aboutTheCamp")}
            subtitle={summarize(property.amenities)}
          >
            <ItemList items={property.amenities} accent={false} />
          </AccordionSection>
        )}

        {property.safetyNotes.length > 0 && (
          <AccordionSection
            id="safety"
            group={ACCORDION_GROUP}
            icon={ShieldIcon}
            title={t("safety")}
            subtitle={summarize(property.safetyNotes)}
          >
            <ItemList items={property.safetyNotes} accent />
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-danger/40 bg-danger/5 p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-foreground">
                <span className="font-medium">{t("emergency")}: </span>
                {property.emergencyContact.label}
              </p>
              <a
                href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-danger px-3 text-xs font-medium text-white transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                {property.emergencyContact.phone}
              </a>
            </div>
          </AccordionSection>
        )}

        {property.services.length > 0 && (
          <AccordionSection
            id="services"
            group={ACCORDION_GROUP}
            icon={CoffeeIcon}
            title={t("services")}
            subtitle={summarize(property.services)}
          >
            <ServiceList items={property.services} />
          </AccordionSection>
        )}

        {property.sightings.length > 0 && (
          <AccordionSection
            id="sightings"
            group={ACCORDION_GROUP}
            icon={BinocularsIcon}
            title={t("recentSightings")}
            subtitle={summarize(property.sightings, "animal")}
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
            title={t("meetTheTeam")}
            subtitle={`${property.staff.length} ${
              property.staff.length === 1 ? "host" : "hosts"
            }`}
          >
            <div className="grid grid-cols-2 gap-2">
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
                  <p className="mt-2 font-serif text-sm font-medium leading-tight tracking-tight">
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
            title={t("houseRules")}
            subtitle={`${property.rules.length}`}
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
      {items.map((item, i) => {
        const Icon = iconFor(item.iconKey as never);
        return (
          <li
            key={`${item.label}-${i}`}
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
  const t = useT();
  return (
    <ul className="grid gap-2">
      {items.map((item, i) => {
        const Icon = iconFor(item.iconKey as never);
        return (
          <li
            key={`${item.label}-${i}`}
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
              {t("request")}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Contact({ property }: { property: Property }) {
  const t = useT();
  return (
    <section id="contact" className="scroll-mt-20 px-3 pt-4 sm:px-4">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {t("contact")}
          </span>
          <span className="text-[10px] text-muted">{property.location}</span>
        </div>
        <h2 className="font-serif mt-2 text-lg font-medium leading-tight tracking-tight text-foreground">
          {t("weAreATapAway")}
        </h2>
        <div className="mt-3 grid gap-2">
          <a
            href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-12 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 transition-colors hover:border-primary/40"
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
            className="inline-flex h-12 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 transition-colors hover:border-primary/40"
          >
            <span className="text-sm font-medium">{t("backToKaribuLink")}</span>
            <span className="text-xs text-muted">karibulink.com</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
