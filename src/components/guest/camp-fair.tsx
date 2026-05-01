"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  TentIcon,
} from "@/components/icons";
import {
  AccordionAutoOpenScript,
  AccordionSection,
} from "./accordion-section";
import { saveFairLead } from "@/lib/fair-leads";
import { MobileFrame } from "./mobile-frame";
import type { FairMode, Property } from "@/data/types";

const SHORTLIST_KEY = "kl-shortlist";

const ACCORDION_GROUP = "fair";
const FALLBACK_FAIR: FairMode = {
  tagline: "An unhurried safari, well looked after.",
  highlights: [],
};

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

export function CampFair({ property }: { property: Property }) {
  const fair = property.fairMode ?? FALLBACK_FAIR;

  return (
    <div className="fair-theme">
      <main className="flex-1 pb-12">
        <MobileFrame>
          <FairHero property={property} fair={fair} />
          <Highlights fair={fair} />
          <ActionRow property={property} fair={fair} />
          <WhyThisCamp property={property} fair={fair} />
          <Sections property={property} fair={fair} />
          <LeadCapture property={property} />
        </MobileFrame>
        <AccordionAutoOpenScript />
      </main>
    </div>
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(22,58,46,0.4)] sm:aspect-[16/11]"
      >
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
        {/* Just enough darken for the lower text — keeps the upper image clean. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        <div className="relative flex h-full flex-col p-5 text-white sm:p-7">
          <Link
            href={`/camp/${property.slug}`}
            className="self-start text-[10px] uppercase tracking-[0.28em] text-white/75 hover:text-white"
          >
            KaribuLink
          </Link>

          <div className="mt-auto">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/80">
              {property.location}
            </p>
            <h1 className="font-serif mt-3 text-[44px] font-medium leading-[0.95] tracking-tight sm:text-[64px]">
              {property.name}
            </h1>
            {fair.tagline && (
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base">
                {fair.tagline}
              </p>
            )}
          </div>
        </div>
      </motion.div>
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
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
      className="px-3 pt-4 sm:px-4"
    >
      <ul className="grid grid-cols-3 gap-2">
        {items.map((h) => (
          <li
            key={h}
            className="rounded-2xl bg-soft px-3 py-3.5 text-center shadow-[0_2px_10px_-6px_rgba(22,58,46,0.18)]"
          >
            <p className="font-serif text-[15px] font-medium leading-tight text-foreground sm:text-base">
              {h}
            </p>
          </li>
        ))}
      </ul>
    </motion.section>
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

  const trackWaClick = () => {
    try {
      const raw = window.localStorage.getItem("kl-wa-clicks") ?? "0";
      const current = parseInt(raw, 10);
      window.localStorage.setItem(
        "kl-wa-clicks",
        String(Number.isFinite(current) ? current + 1 : 1),
      );
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      className="px-3 pt-5 sm:px-4 sm:pt-6"
    >
      <motion.a
        href="#partnership"
        whileTap={{ scale: 0.985 }}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-semibold tracking-tight text-primary-foreground shadow-[0_18px_36px_-18px_rgba(183,107,62,0.55)] transition-colors duration-200 hover:bg-primary-hover"
      >
        Partner with us
        <ArrowRightIcon className="h-4 w-4" />
      </motion.a>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWaClick}
          whileTap={{ scale: 0.97 }}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#25d366] text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1ebe5a]"
        >
          <MessageIcon className="h-4 w-4" />
          WhatsApp
        </motion.a>

        <motion.button
          type="button"
          onClick={toggleShortlist}
          whileTap={{ scale: 0.97 }}
          aria-pressed={shortlisted}
          className={`flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-colors duration-200 ${
            shortlisted && hydrated
              ? "bg-accent/40 text-foreground"
              : "bg-soft text-foreground hover:bg-surface"
          }`}
        >
          <span aria-hidden className="text-base leading-none">
            {shortlisted && hydrated ? "❤" : "♡"}
          </span>
          Shortlist
        </motion.button>
      </div>
    </motion.section>
  );
}

/* --------------------------------------------------------------- */
/*  Why this camp — conversion-trust signals                          */
/* --------------------------------------------------------------- */

function WhyThisCamp({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const capacity =
    fair.accommodation?.rooms !== undefined &&
    fair.accommodation?.capacity !== undefined
      ? `${fair.accommodation.rooms} tents · up to ${fair.accommodation.capacity} guests`
      : fair.accommodation?.rooms !== undefined
        ? `${fair.accommodation.rooms} tents`
        : undefined;

  const rows = [
    fair.bestFor && { label: "Best for", value: fair.bestFor },
    capacity && { label: "Capacity", value: capacity },
    fair.accessNote && { label: "Access", value: fair.accessNote },
    fair.operatorResponseNote && {
      label: "Operator response",
      value: fair.operatorResponseNote,
    },
    fair.guidingNote && { label: "Guiding", value: fair.guidingNote },
  ].filter(
    (r): r is { label: string; value: string } => Boolean(r),
  );

  if (rows.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="px-3 pt-8 sm:px-4 sm:pt-10"
    >
      <header>
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
          {property.name}
        </p>
        <h2 className="font-serif mt-2 text-[28px] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[32px]">
          Why work with us
        </h2>
      </header>
      <dl className="mt-5 grid gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl bg-soft px-4 py-3.5"
          >
            <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              {row.label}
            </dt>
            <dd className="font-serif mt-1.5 text-lg font-medium leading-snug text-foreground sm:text-xl">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.section>
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
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="px-3 pt-8 sm:px-4 sm:pt-10"
    >
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
            <p className="text-[15px] leading-relaxed text-foreground/85">
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
                  className="flex items-center gap-3 rounded-xl bg-soft p-3"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/25 text-foreground">
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
              className="flex items-center justify-between gap-3 rounded-xl bg-soft p-3 transition-colors hover:bg-surface"
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
                className="flex items-center justify-between gap-3 rounded-xl bg-soft p-3 transition-colors hover:bg-surface"
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
            <div className="flex items-start justify-between gap-3 rounded-xl bg-soft p-3">
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
    </motion.section>
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Always show the success state — local fallback inside saveFairLead
    // means the lead is never lost even if Supabase is offline.
    void saveFairLead({
      campSlug: property.slug,
      campName: property.name,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      message: form.message,
      source: "fair-mode",
    });
    setSubmitted(true);
  };

  return (
    <motion.section
      id="partnership"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="scroll-mt-20 px-3 pt-8 sm:px-4 sm:pt-10"
    >
      <div className="rounded-3xl bg-surface p-6 shadow-[0_24px_48px_-32px_rgba(22,58,46,0.28)] sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="text-center"
            >
              <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-primary/10 text-primary">
                <CheckIcon className="h-5 w-5" />
              </span>
              <h2 className="font-serif mt-4 text-[28px] font-medium tracking-tight text-foreground sm:text-[32px]">
                Thank you.
              </h2>
              <p className="mt-3 max-w-sm mx-auto text-sm leading-relaxed text-muted">
                We've noted your details. The camp will follow up within 48
                hours with their operator pack and rate sheet.
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
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-soft px-4 text-xs font-semibold text-foreground hover:bg-background"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <h2 className="font-serif text-[36px] font-medium leading-[1] tracking-tight text-foreground sm:text-[44px]">
                Let&apos;s work together
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
                Tell us about your company and we&apos;ll follow up with your
                operator pack and next steps.
              </p>
              <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
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
                  <span className="text-xs font-medium tracking-wide text-foreground">
                    A note
                  </span>
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    rows={3}
                    placeholder="Markets you serve, group size, anything else."
                    className="mt-2 w-full rounded-xl bg-soft px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/25"
                  />
                </label>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-[0_18px_36px_-18px_rgba(183,107,62,0.55)] transition-colors hover:bg-primary-hover"
                >
                  Send invitation
                </motion.button>
                <p className="mt-1 text-center text-[11px] text-muted">
                  Demo — saved on this device.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
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
      <span className="text-xs font-medium tracking-wide text-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-12 w-full rounded-xl bg-soft px-4 text-sm text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/25"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  Building blocks                                                   */
/* --------------------------------------------------------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-soft p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <p className="font-serif mt-1 text-lg font-medium text-foreground">
        {value}
      </p>
    </div>
  );
}

function PolicyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-soft p-3">
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
          className="flex gap-3 rounded-xl bg-soft p-3"
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
  "from-[#163a2e]/30 via-[#c8a24b]/30 to-[#b76b3e]/30",
  "from-[#b76b3e]/30 via-[#163a2e]/30 to-[#c8a24b]/30",
  "from-[#c8a24b]/40 via-[#b76b3e]/30 to-[#163a2e]/30",
  "from-[#163a2e]/40 via-[#163a2e]/30 to-[#c8a24b]/30",
  "from-[#b76b3e]/30 via-[#c8a24b]/30 to-[#163a2e]/30",
  "from-[#c8a24b]/30 via-[#163a2e]/30 to-[#b76b3e]/30",
];

function PhotoGrid({ heroImageUrl }: { heroImageUrl?: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PHOTO_TINTS.map((tint, i) => (
        <div
          key={i}
          className={`aspect-square overflow-hidden rounded-xl ${
            i === 0 && heroImageUrl ? "" : `bg-gradient-to-br ${tint}`
          }`}
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
