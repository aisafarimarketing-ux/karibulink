"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CameraIcon,
  CheckIcon,
  CompassIcon,
  InfoIcon,
  LeafIcon,
  MessageIcon,
  PhoneIcon,
  ShieldIcon,
  StarIcon,
  TentIcon,
} from "@/components/icons";
import {
  AccordionAutoOpenScript,
  AccordionSection,
} from "./accordion-section";
import { MobileFrame } from "./mobile-frame";
import { ThemeToggle } from "./theme-toggle";
import type { FairMode, Property } from "@/data/types";

const SHORTLIST_KEY = "kl-shortlist";
const leadsKey = (slug: string) => `kl-fair-leads-${slug}`;

const ACCORDION_GROUP = "fair";
const FALLBACK_FAIR: FairMode = {
  tagline: "Designed for unforgettable safari experiences.",
  highlights: [],
};

export function CampFair({ property }: { property: Property }) {
  const fair = property.fairMode ?? FALLBACK_FAIR;

  return (
    <main className="flex-1 pb-12">
      <MobileFrame>
        <FairHero property={property} fair={fair} />
        <Highlights fair={fair} />
        <ActionRow property={property} fair={fair} />
        <Sections property={property} fair={fair} />
        <LeadCapture property={property} />
      </MobileFrame>
      <AccordionAutoOpenScript />
    </main>
  );
}

/* --------------------------------------------------------------- */
/*  Hero                                                              */
/* --------------------------------------------------------------- */

function FairHero({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const showImage = Boolean(property.heroImageUrl);
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_20px_60px_-25px_rgba(31,58,46,0.45)] sm:aspect-[16/11]">
        {showImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.heroImageUrl ?? undefined}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0c1d18 0%, #16302a 18%, #2c5648 38%, #d4a05a 58%, #b25a2a 72%, #4a2510 86%, #14080a 100%)",
            }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/80" />

        <div className="relative flex h-full flex-col p-5 text-white">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/camp/${property.slug}`}
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-white/80 hover:text-white"
            >
              ← Guest mode
            </Link>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a84c]/55 bg-[#0f1f17]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f1e6] backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-[#c9a84c]" />
                Fair Mode
              </span>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/85">
              {property.location}
            </p>
            <h1 className="font-serif mt-2 text-[34px] font-medium leading-[1.05] tracking-tight sm:text-[42px]">
              {property.name}
            </h1>
            {fair.tagline && (
              <p className="mt-3 max-w-md text-sm leading-snug text-white/90 sm:text-base">
                {fair.tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Highlights row                                                    */
/* --------------------------------------------------------------- */

function Highlights({ fair }: { fair: FairMode }) {
  if (!fair.highlights || fair.highlights.length === 0) return null;
  const items = fair.highlights.slice(0, 3);
  return (
    <section className="px-3 pt-3 sm:px-4">
      <ul className="grid grid-cols-3 gap-2">
        {items.map((h) => (
          <li
            key={h}
            className="rounded-2xl border border-border bg-surface px-2 py-3 text-center shadow-[0_4px_14px_-8px_rgba(31,58,46,0.18)]"
          >
            <p className="font-serif text-[13px] font-medium leading-tight text-foreground sm:text-sm">
              {h}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Top action row                                                    */
/* --------------------------------------------------------------- */

function ActionRow({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const [shortlisted, setShortlisted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const list = JSON.parse(
        window.localStorage.getItem(SHORTLIST_KEY) ?? "[]",
      ) as string[];
      setShortlisted(Array.isArray(list) && list.includes(property.slug));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [property.slug]);

  const toggleShortlist = () => {
    try {
      const list: string[] = JSON.parse(
        window.localStorage.getItem(SHORTLIST_KEY) ?? "[]",
      );
      const next = shortlisted
        ? list.filter((s) => s !== property.slug)
        : Array.from(new Set([...list, property.slug]));
      window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(next));
      setShortlisted(!shortlisted);
    } catch {
      /* ignore */
    }
  };

  const wa = (
    fair.whatsappPhone ?? property.emergencyContact.phone
  )
    .replace(/[^0-9+]/g, "")
    .replace(/^\+/, "");
  const message = `Hi, I saw your camp at Karibu Kili Fair and I'm interested in working with you.`;
  const waUrl = `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;

  return (
    <section className="px-3 pt-4 sm:px-4">
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={toggleShortlist}
          aria-pressed={shortlisted}
          className={`flex h-16 flex-col items-center justify-center gap-1 rounded-2xl border text-center transition-all duration-150 active:scale-[0.97] ${
            shortlisted && hydrated
              ? "border-[#b06a3b] bg-[#b06a3b] text-white shadow-[0_2px_10px_-2px_rgba(176,106,59,0.45)]"
              : "border-border bg-surface text-foreground hover:border-[#b06a3b]/50"
          }`}
        >
          <span aria-hidden className="text-base leading-none">
            {shortlisted && hydrated ? "❤" : "♡"}
          </span>
          <span className="text-[11px] font-semibold tracking-tight">
            Shortlist
          </span>
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 flex-col items-center justify-center gap-1 rounded-2xl bg-[#25d366] text-center text-white transition-all duration-150 hover:bg-[#1ebe5a] active:scale-[0.97]"
        >
          <MessageIcon className="h-4 w-4" />
          <span className="text-[11px] font-semibold tracking-tight">
            WhatsApp
          </span>
        </a>

        <a
          href="#partnership"
          className="flex h-16 flex-col items-center justify-center gap-1 rounded-2xl bg-primary text-center text-primary-foreground transition-all duration-150 hover:bg-primary-hover active:scale-[0.97]"
        >
          <ArrowRightIcon className="h-4 w-4" />
          <span className="text-[11px] font-semibold tracking-tight">
            Work with us
          </span>
        </a>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Accordion sections                                                */
/* --------------------------------------------------------------- */

function Sections({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  return (
    <section className="px-3 pt-4 sm:px-4">
      <div className="grid gap-2">
        {fair.about && (
          <AccordionSection
            id="about"
            group={ACCORDION_GROUP}
            icon={InfoIcon}
            title="About the Camp"
            subtitle={property.location}
            defaultOpen
          >
            <p className="text-sm leading-relaxed text-foreground/85">
              {fair.about}
            </p>
          </AccordionSection>
        )}

        {fair.accommodation && (
          <AccordionSection
            id="accommodation"
            group={ACCORDION_GROUP}
            icon={TentIcon}
            title="Accommodation"
            subtitle={
              fair.accommodation.rooms !== undefined &&
              fair.accommodation.capacity !== undefined
                ? `${fair.accommodation.rooms} tents · ${fair.accommodation.capacity} guests`
                : undefined
            }
          >
            <div className="grid gap-3">
              {(fair.accommodation.rooms !== undefined ||
                fair.accommodation.capacity !== undefined) && (
                <div className="grid grid-cols-2 gap-2">
                  {fair.accommodation.rooms !== undefined && (
                    <Stat label="Rooms" value={String(fair.accommodation.rooms)} />
                  )}
                  {fair.accommodation.capacity !== undefined && (
                    <Stat
                      label="Capacity"
                      value={`${fair.accommodation.capacity} guests`}
                    />
                  )}
                </div>
              )}
              {fair.accommodation.features &&
                fair.accommodation.features.length > 0 && (
                  <BulletList items={fair.accommodation.features} />
                )}
            </div>
          </AccordionSection>
        )}

        {fair.policies && (
          <AccordionSection
            id="policies"
            group={ACCORDION_GROUP}
            icon={ShieldIcon}
            title="Policies"
            subtitle="Children · occupancy"
          >
            <div className="grid gap-3">
              {fair.policies.childPolicy && (
                <PolicyRow label="Child policy" value={fair.policies.childPolicy} />
              )}
              {fair.policies.occupancy && (
                <PolicyRow label="Occupancy" value={fair.policies.occupancy} />
              )}
            </div>
          </AccordionSection>
        )}

        {fair.rates && (
          <AccordionSection
            id="rates"
            group={ACCORDION_GROUP}
            icon={LeafIcon}
            title="Rates & Terms"
            subtitle={fair.rates.priceRange}
          >
            <div className="grid gap-3">
              {fair.rates.priceRange && (
                <PolicyRow label="Price range" value={fair.rates.priceRange} />
              )}
              {fair.rates.paymentTerms && (
                <PolicyRow label="Payment terms" value={fair.rates.paymentTerms} />
              )}
              {fair.rates.discounts && (
                <PolicyRow label="Discounts" value={fair.rates.discounts} />
              )}
            </div>
          </AccordionSection>
        )}

        {fair.uniqueSellingPoints && fair.uniqueSellingPoints.length > 0 && (
          <AccordionSection
            id="unique"
            group={ACCORDION_GROUP}
            icon={StarIcon}
            title="What Makes Us Unique"
            subtitle={`${fair.uniqueSellingPoints.length} reasons`}
          >
            <BulletList items={fair.uniqueSellingPoints} accent />
          </AccordionSection>
        )}

        {fair.activities && fair.activities.length > 0 && (
          <AccordionSection
            id="activities"
            group={ACCORDION_GROUP}
            icon={CompassIcon}
            title="Activities"
            subtitle={`${fair.activities.length} on offer`}
          >
            <ul className="grid gap-2">
              {fair.activities.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/20 text-primary">
                    <BinocularsIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-snug text-foreground/90">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionSection>
        )}

        <AccordionSection
          id="photos"
          group={ACCORDION_GROUP}
          icon={CameraIcon}
          title="Photos"
          subtitle="A few moments from the camp"
        >
          <PhotoGrid heroImageUrl={property.heroImageUrl} />
        </AccordionSection>

        <AccordionSection
          id="contact"
          group={ACCORDION_GROUP}
          icon={PhoneIcon}
          title="Contact"
          subtitle={fair.email ?? property.emergencyContact.label}
        >
          <div className="grid gap-2">
            <a
              href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Phone
                </span>
              </span>
              <span className="text-xs text-muted">
                {property.emergencyContact.phone}
              </span>
            </a>
            {fair.email && (
              <a
                href={`mailto:${fair.email}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/40"
              >
                <span className="flex items-center gap-2">
                  <MessageIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Email
                  </span>
                </span>
                <span className="text-xs text-muted">{fair.email}</span>
              </a>
            )}
            <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-3">
              <span className="flex items-center gap-2">
                <CompassIcon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Location
                </span>
              </span>
              <span className="text-right text-xs text-muted">
                {property.location}
              </span>
            </div>
          </div>
        </AccordionSection>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  Lead capture                                                      */
/* --------------------------------------------------------------- */

function LeadCapture({ property }: { property: Property }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const key = leadsKey(property.slug);
      const existing: unknown = JSON.parse(
        window.localStorage.getItem(key) ?? "[]",
      );
      const lead = {
        ...form,
        property: property.slug,
        timestamp: new Date().toISOString(),
      };
      const list = Array.isArray(existing) ? existing : [];
      window.localStorage.setItem(key, JSON.stringify([...list, lead]));
    } catch {
      /* ignore */
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id="partnership"
        className="scroll-mt-20 px-3 pt-6 sm:px-4 sm:pt-8"
      >
        <div className="rounded-3xl border border-border bg-surface p-5 text-center sm:p-6">
          <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-primary/10 text-primary">
            <CheckIcon className="h-5 w-5" />
          </span>
          <h2 className="font-serif mt-4 text-2xl font-medium tracking-tight text-foreground">
            Thank you.
          </h2>
          <p className="mt-2 text-sm text-muted">
            Saved locally for the demo. The camp would normally receive your
            details by email and WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                company: "",
                email: "",
                phone: "",
                message: "",
              });
            }}
            className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-semibold text-muted hover:border-primary/40 hover:text-foreground"
          >
            Send another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="partnership"
      className="scroll-mt-20 px-3 pt-6 sm:px-4 sm:pt-8"
    >
      <div className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
          <span className="h-1 w-1 rounded-full bg-accent" />
          Partnership
        </span>
        <h2 className="font-serif mt-3 text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
          Interested in working with this camp?
        </h2>
        <p className="mt-2 text-sm text-muted leading-snug">
          Leave your details — the camp will follow up within 48 hours with
          their full operator pack.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
          <LeadField
            label="Your name"
            value={form.name}
            onChange={onChange("name")}
            required
          />
          <LeadField
            label="Company"
            value={form.company}
            onChange={onChange("company")}
            required
          />
          <LeadField
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="you@example.com"
            required
          />
          <LeadField
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
          />
          <label className="block">
            <span className="text-xs font-medium text-foreground">
              Message
            </span>
            <textarea
              value={form.message}
              onChange={onChange("message")}
              rows={3}
              placeholder="Tell us about your business or which markets you serve."
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary-hover active:scale-[0.98]"
          >
            Request partnership details
          </button>
          <p className="text-[10px] text-muted">
            Demo — saved locally on this device.
          </p>
        </form>
      </div>
    </section>
  );
}

function LeadField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  Building blocks                                                   */
/* --------------------------------------------------------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <p className="font-serif mt-1 text-base font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm leading-snug text-foreground/90">{value}</p>
    </div>
  );
}

function BulletList({
  items,
  accent = false,
}: {
  items: string[];
  accent?: boolean;
}) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-border bg-background p-3"
        >
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
              accent ? "bg-accent" : "bg-primary"
            }`}
          />
          <span className="text-sm leading-snug text-foreground/90">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

const PHOTO_TINTS = [
  "from-[#1f3a2e]/30 via-[#c8a96a]/30 to-[#b06a3b]/30",
  "from-[#b06a3b]/30 via-[#1f3a2e]/30 to-[#c8a96a]/30",
  "from-[#c8a96a]/40 via-[#b06a3b]/30 to-[#1f3a2e]/30",
  "from-[#1f3a2e]/40 via-[#1f3a2e]/30 to-[#c8a96a]/30",
  "from-[#b06a3b]/30 via-[#c8a96a]/30 to-[#1f3a2e]/30",
  "from-[#c8a96a]/30 via-[#1f3a2e]/30 to-[#b06a3b]/30",
];

function PhotoGrid({ heroImageUrl }: { heroImageUrl?: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PHOTO_TINTS.map((tint, i) => (
        <div
          key={i}
          className={`aspect-square overflow-hidden rounded-xl ${
            i === 0 && heroImageUrl ? "" : `bg-gradient-to-br ${tint}`
          } border border-border`}
        >
          {i === 0 && heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
