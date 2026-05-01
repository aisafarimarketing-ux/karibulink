"use client";

import Link from "next/link";
import {
  BinocularsIcon,
  CompassIcon,
  PhoneIcon,
  TentIcon,
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
  { id: "check-in", labelKey: "checkIn", iconKey: "user" },
  { id: "your-stay", labelKey: "yourStay", iconKey: "tent" },
  { id: "experiences", labelKey: "experiences", iconKey: "compass" },
  { id: "help", labelKey: "help", iconKey: "phone" },
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

          <section className="px-3 pt-4 sm:px-4">
            <div className="grid gap-2">
              <CheckIn />
              <YourStay property={property} />
              <Experiences property={property} />
              <Help property={property} />
            </div>
          </section>

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

/* --------------------------------------------------------------- */
/*  Hero                                                             */
/* --------------------------------------------------------------- */

function CampHero({ property }: { property: Property }) {
  const t = useT();
  return (
    <HeroCard
      label={property.name}
      message={t("welcome")}
      imageUrl={property.heroImageUrl}
      toolbar={<LanguageSelector />}
    />
  );
}

/* --------------------------------------------------------------- */
/*  Accordion 1: Check In                                            */
/* --------------------------------------------------------------- */

function CheckIn() {
  const t = useT();
  return (
    <AccordionSection
      id="check-in"
      group={ACCORDION_GROUP}
      icon={UserIcon}
      title={t("checkIn")}
      subtitle={`${t("waiverTitle")} · ${t("registerYourStay")}`}
    >
      <Waiver />
      <div className="mt-3" />
      <Registration />
    </AccordionSection>
  );
}

function Waiver() {
  const t = useT();
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="text-sm font-medium text-foreground">{t("waiverTitle")}</p>
      <p className="mt-0.5 text-xs text-muted leading-snug">
        {t("waiverHelp")}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.97]"
        >
          {t("readWaiver")}
        </button>
        <label className="inline-flex items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-border accent-primary"
          />
          {t("iAgree")}
        </label>
      </div>
    </div>
  );
}

function Registration() {
  const t = useT();
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="text-xs leading-snug text-muted">{t("registerHelp")}</p>
      <form className="mt-3 grid gap-2">
        <SlimField label={t("fullName")} />
        <SlimField label={t("email")} type="email" placeholder="you@example.com" />
        <SlimField label={t("country")} />
        <SlimField label={t("tourOperator")} optional />
        <button
          type="button"
          className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary-hover active:scale-[0.98]"
        >
          {t("submitRegister")}
        </button>
        <p className="text-[10px] text-muted">{t("demoOnly")}</p>
      </form>
    </div>
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
        className="mt-1 h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  Accordion 2: Your Stay                                           */
/* --------------------------------------------------------------- */

function YourStay({ property }: { property: Property }) {
  const t = useT();
  const subtitleParts = [
    property.amenities.length > 0 ? t("aboutTheCamp") : null,
    property.rules.length > 0 ? t("houseRules") : null,
    property.staff.length > 0 ? t("meetTheTeam") : null,
  ]
    .filter(Boolean)
    .slice(0, 3)
    .join(" · ");

  return (
    <AccordionSection
      id="your-stay"
      group={ACCORDION_GROUP}
      icon={TentIcon}
      title={t("yourStay")}
      subtitle={subtitleParts}
    >
      {property.amenities.length > 0 && (
        <SubBlock label={t("aboutTheCamp")}>
          <ItemList items={property.amenities} />
        </SubBlock>
      )}
      {property.rules.length > 0 && (
        <SubBlock label={t("houseRules")}>
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
        </SubBlock>
      )}
      {property.staff.length > 0 && (
        <SubBlock label={t("meetTheTeam")}>
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
        </SubBlock>
      )}
    </AccordionSection>
  );
}

/* --------------------------------------------------------------- */
/*  Accordion 3: Experiences                                         */
/* --------------------------------------------------------------- */

function Experiences({ property }: { property: Property }) {
  const t = useT();
  const subtitleParts = [
    property.services.length > 0 ? t("services") : null,
    property.sightings.length > 0 ? t("recentSightings") : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <AccordionSection
      id="experiences"
      group={ACCORDION_GROUP}
      icon={CompassIcon}
      title={t("experiences")}
      subtitle={subtitleParts || undefined}
    >
      {property.services.length > 0 && (
        <SubBlock label={t("services")}>
          <ServiceList items={property.services} />
        </SubBlock>
      )}
      {property.sightings.length > 0 && (
        <SubBlock label={t("recentSightings")}>
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
        </SubBlock>
      )}
    </AccordionSection>
  );
}

/* --------------------------------------------------------------- */
/*  Accordion 4: Help                                                */
/* --------------------------------------------------------------- */

function Help({ property }: { property: Property }) {
  const t = useT();
  const subtitleParts = [
    t("emergency"),
    property.safetyNotes.length > 0 ? t("safety") : null,
    t("contact"),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <AccordionSection
      id="help"
      group={ACCORDION_GROUP}
      icon={PhoneIcon}
      title={t("help")}
      subtitle={subtitleParts}
    >
      <SubBlock label={t("inEmergency")}>
        <a
          href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
          className="flex items-center justify-between gap-3 rounded-xl border border-danger/40 bg-danger/5 p-3 transition-colors hover:bg-danger/10"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-danger text-white">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                {property.emergencyContact.label}
              </p>
              <p className="text-[11px] text-muted">
                {property.emergencyContact.phone}
              </p>
            </div>
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-danger">
            24/7
          </span>
        </a>
      </SubBlock>

      {property.safetyNotes.length > 0 && (
        <SubBlock label={t("safety")}>
          <ItemList items={property.safetyNotes} accent />
        </SubBlock>
      )}

      <SubBlock label={t("contact")}>
        <div className="grid gap-2">
          <a
            href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 transition-colors hover:border-primary/40"
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
            className="inline-flex h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 transition-colors hover:border-primary/40"
          >
            <span className="text-sm font-medium">{t("backToKaribuLink")}</span>
            <span className="text-xs text-muted">karibulink.com</span>
          </Link>
        </div>
      </SubBlock>
    </AccordionSection>
  );
}

/* --------------------------------------------------------------- */
/*  Building blocks                                                  */
/* --------------------------------------------------------------- */

function SubBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

function ItemList({
  items,
  accent = false,
}: {
  items: { iconKey: string; label: string; detail: string }[];
  accent?: boolean;
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
