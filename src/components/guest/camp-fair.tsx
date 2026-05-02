"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  CompassIcon,
  MessageIcon,
  PhoneIcon,
} from "@/components/icons";
import { saveFairLead } from "@/lib/fair-leads";
import type { FairActivity, FairMode, Property } from "@/data/types";

const SHORTLIST_KEY = "kl-shortlist";
const HERO_FALLBACK_SRC =
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2200&q=80";

const easeOut = [0.2, 0.65, 0.3, 0.95] as const;

const FALLBACK_FAIR: FairMode = {
  tagline: "Boutique safari camp.",
  highlights: [],
};

export function CampFair({ property }: { property: Property }) {
  const fair = property.fairMode ?? FALLBACK_FAIR;

  return (
    <div className="fair-theme bg-background text-foreground">
      <Hero property={property} fair={fair} />
      <QuickInfo fair={fair} />
      <Summary property={property} fair={fair} />
      <ActionBar property={property} fair={fair} />
      <Accommodation fair={fair} />
      <Experience fair={fair} />
      <GoodToKnow fair={fair} />
      <Policies fair={fair} />
      <Inquiry property={property} fair={fair} />
      <BottomCTA property={property} fair={fair} />
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Quick Info — horizontal facts strip under the hero               */
/* --------------------------------------------------------------- */

function QuickInfo({ fair }: { fair: FairMode }) {
  const facts: { label: string; value: string }[] = [];
  if (fair.accommodation?.rooms !== undefined) {
    facts.push({ label: "Tents", value: String(fair.accommodation.rooms) });
  }
  if (fair.airstripDistance) {
    facts.push({ label: "Airstrip", value: fair.airstripDistance });
  }
  if (fair.season) {
    facts.push({ label: "Season", value: fair.season });
  }
  if (fair.guestType) {
    facts.push({ label: "Ideal for", value: fair.guestType });
  }
  if (fair.power) {
    facts.push({ label: "Power", value: fair.power });
  }
  if (facts.length === 0) return null;

  return (
    <Reveal>
      <section className="px-6 pt-14 sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-5xl">
          <ul
            className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-5 lg:gap-x-12"
            role="list"
          >
            {facts.map((fact) => (
              <li key={fact.label}>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                  {fact.label}
                </p>
                <p className="font-serif mt-2 text-[20px] font-medium leading-snug tracking-tight text-foreground sm:text-[22px]">
                  {fact.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  Helpers                                                          */
/* --------------------------------------------------------------- */

function whatsappLink(
  phone: string,
  campName: string,
  message?: string,
): string {
  const cleaned = phone.replace(/[^0-9+]/g, "").replace(/^\+/, "");
  const text =
    message ?? `Hello, I'm interested in ${campName}. I saw your camp page on KaribuLink.`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

/* --------------------------------------------------------------- */
/*  1. Hero                                                          */
/* --------------------------------------------------------------- */

function Hero({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const imageSrc = property.heroImageUrl || HERO_FALLBACK_SRC;
  const phone = fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[80vh] w-full sm:h-[85vh] lg:h-[88vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imageSrc}
          alt=""
          loading="eager"
          initial={{ scale: 1 }}
          animate={{ scale: 1.04 }}
          transition={{
            duration: 14,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Top fade for the floating button + bottom darken for the title. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* Floating Chat with Camp button */}
        <motion.a
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-5 top-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#c46a2b]/95 px-4 text-xs font-semibold text-[#faf7f0] shadow-[0_18px_36px_-18px_rgba(196,106,43,0.55)] backdrop-blur-md transition-colors hover:bg-[#a94f1f] sm:right-8 sm:top-8 sm:h-12 sm:px-5 sm:text-sm"
        >
          <MessageIcon className="h-4 w-4" />
          Chat with Camp
        </motion.a>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut, delay: 0.2 }}
          className="absolute inset-x-0 bottom-0 px-6 pb-10 text-[#faf7f0] sm:px-10 sm:pb-14 lg:px-16 lg:pb-20"
        >
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.32em] text-[#faf7f0]/65 hover:text-[#faf7f0]"
            >
              ← KaribuLink
            </Link>
            <h1 className="font-serif mt-4 text-[44px] font-medium leading-[0.95] tracking-tight sm:text-[64px] lg:text-[80px]">
              {property.name}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-[#faf7f0]/85 sm:text-sm">
              <span aria-hidden>📍</span>
              {property.location}
            </p>
            {fair.tagline && (
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[#faf7f0]/85 sm:text-lg">
                {fair.tagline}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  2. Quick Summary + highlights                                    */
/* --------------------------------------------------------------- */

function Summary({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const highlights = (fair.highlights ?? []).slice(0, 4);
  return (
    <Reveal>
      <section className="px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-3xl">
          {fair.about ? (
            <p className="text-lg leading-[1.7] text-foreground/85 sm:text-xl">
              {fair.about}
            </p>
          ) : (
            <p className="text-lg leading-[1.7] text-foreground/85 sm:text-xl">
              {property.welcomeMessage}
            </p>
          )}
          {highlights.length > 0 && (
            <ul className="mt-10 flex gap-x-8 gap-y-4 overflow-x-auto pb-2 text-sm text-foreground/80 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
              {highlights.map((h, i) => (
                <li
                  key={h}
                  className="flex items-center gap-3 whitespace-nowrap"
                >
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="hidden h-1 w-1 rounded-full bg-foreground/30 sm:inline-block"
                    />
                  )}
                  <span className="font-serif text-base font-medium tracking-tight text-foreground sm:text-lg">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  3. Primary action bar                                            */
/* --------------------------------------------------------------- */

function ActionBar({
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

  const phone = fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);

  return (
    <Reveal delay={0.05}>
      <section className="px-6 pt-10 sm:px-10 sm:pt-12 lg:px-16 lg:pt-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
          >
            <MessageIcon className="h-4 w-4" />
            Chat with Camp
          </a>
          <a
            href="#inquiry"
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background px-7 text-[15px] font-semibold tracking-tight text-foreground transition-colors hover:border-foreground/40 active:scale-[0.98]"
          >
            Send Trade Inquiry
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggleShortlist}
            aria-pressed={shortlisted}
            className="inline-flex h-[52px] items-center justify-center gap-2 px-3 text-sm font-semibold tracking-tight text-foreground/70 transition-colors hover:text-foreground sm:ml-auto"
          >
            <span aria-hidden className="text-base leading-none">
              {shortlisted && hydrated ? "❤" : "♡"}
            </span>
            {shortlisted && hydrated ? "Saved" : "Save Camp"}
          </button>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  4. Accommodation                                                 */
/* --------------------------------------------------------------- */

function Accommodation({ fair }: { fair: FairMode }) {
  const acc = fair.accommodation;
  if (!acc) return null;
  return (
    <Reveal>
      <section className="px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Stay" title="Accommodation" />
          {acc.descriptor && (
            <p className="mt-6 max-w-xl text-lg leading-[1.7] text-foreground/80 sm:text-xl">
              {acc.descriptor}
            </p>
          )}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {acc.rooms !== undefined && (
              <Stat label="Tents" value={String(acc.rooms)} />
            )}
            {acc.capacity !== undefined && (
              <Stat
                label="Capacity"
                value={`Up to ${acc.capacity} guests`}
              />
            )}
          </div>
          {acc.features && acc.features.length > 0 && (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
              {acc.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base leading-relaxed text-foreground/85"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                  />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  5. Experience                                                    */
/* --------------------------------------------------------------- */

function Experience({ fair }: { fair: FairMode }) {
  const activities: FairActivity[] = (fair.activities ?? []).map((a) =>
    typeof a === "string" ? { title: a } : a,
  );
  if (activities.length === 0) return null;
  return (
    <Reveal>
      <section className="px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Days at camp" title="Experience" />
          <ul className="mt-10 grid gap-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9">
            {activities.map((a) => (
              <li key={a.title} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
                >
                  <CompassIcon className="h-3 w-3" />
                </span>
                <div>
                  <p className="font-serif text-lg font-medium leading-tight tracking-tight text-foreground sm:text-xl">
                    {a.title}
                  </p>
                  {a.description && (
                    <p className="mt-1 text-[15px] leading-relaxed text-foreground/70">
                      {a.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  6. Good to Know — scannable definition list                      */
/* --------------------------------------------------------------- */

function GoodToKnow({ fair }: { fair: FairMode }) {
  const rows: { label: string; value: string }[] = [];
  if (fair.accessNote) {
    rows.push({ label: "Location", value: fair.accessNote });
  }
  if (fair.bestFor) {
    rows.push({ label: "Best for", value: fair.bestFor });
  }
  const logistics = [fair.guidingNote, fair.operatorResponseNote]
    .filter(Boolean)
    .join(" · ");
  if (logistics) {
    rows.push({ label: "On the ground", value: logistics });
  }
  if (rows.length === 0) return null;

  return (
    <Reveal>
      <section className="px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Good to know" title="Context for the trade" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-x-10">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                  {row.label}
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  7. Policies (collapsible)                                        */
/* --------------------------------------------------------------- */

function Policies({ fair }: { fair: FairMode }) {
  const p = fair.policies;
  if (!p || (!p.childPolicy && !p.occupancy)) return null;

  const rows: { label: string; value: string }[] = [];
  if (p.childPolicy) rows.push({ label: "Children", value: p.childPolicy });
  if (p.occupancy) rows.push({ label: "Occupancy", value: p.occupancy });

  return (
    <Reveal>
      <section className="px-6 pt-20 sm:px-10 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-primary/40">
              <SectionTitle eyebrow="Policies" title="Camp Policies" />
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-foreground/50 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pt-8">
              <dl className="grid gap-6">
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-2 text-base leading-relaxed text-foreground/85">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  7. Inquiry form                                                  */
/* --------------------------------------------------------------- */

function Inquiry({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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

  const phone = fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);
  const responseNote = fair.operatorResponseNote
    ? `Most replies happen ${fair.operatorResponseNote.toLowerCase()}.`
    : "Most replies happen within 24 hours.";

  return (
    <section
      id="inquiry"
      className="scroll-mt-12 bg-[#f4e8d2] px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <h2 className="font-serif mt-5 text-[40px] font-medium leading-[1] tracking-tight text-foreground sm:text-[48px]">
                  Inquiry sent.
                </h2>
                <p className="mt-4 max-w-md text-base leading-[1.7] text-foreground/75 sm:text-lg">
                  The camp can contact you directly, or continue on
                  WhatsApp.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-transform duration-200 hover:scale-[1.02] hover:bg-primary-hover active:scale-[0.98]"
                  >
                    <MessageIcon className="h-4 w-4" />
                    Chat with Camp
                  </a>
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
                    className="inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground/70 hover:text-foreground"
                  >
                    Send another inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                <SectionTitle
                  eyebrow="Trade enquiries"
                  title="Send Trade Inquiry"
                />
                <p className="mt-5 max-w-md text-base leading-[1.7] text-foreground/75 sm:text-lg">
                  Your details go directly to the camp. {responseNote}
                </p>
                <form onSubmit={onSubmit} className="mt-10 grid gap-5">
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={onChange("name")}
                    required
                  />
                  <Field
                    label="Company"
                    value={form.company}
                    onChange={onChange("company")}
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    placeholder="you@example.com"
                    required
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange("phone")}
                    optional
                  />
                  <label className="block">
                    <span className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Message
                      </span>
                      <span className="text-[11px] text-muted">optional</span>
                    </span>
                    <textarea
                      value={form.message}
                      onChange={onChange("message")}
                      rows={4}
                      placeholder="Markets you serve, group size, anything else."
                      className="mt-2 w-full rounded-2xl bg-background px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </label>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="mt-3 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-colors hover:bg-primary-hover sm:self-start"
                  >
                    Send Inquiry
                    <ArrowRightIcon className="h-4 w-4" />
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </span>
        {optional && (
          <span className="text-[11px] text-muted">optional</span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-12 w-full rounded-2xl bg-background px-4 text-base text-foreground placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  8. Bottom CTA                                                    */
/* --------------------------------------------------------------- */

function BottomCTA({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const phone = fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);
  return (
    <Reveal>
      <section className="bg-[#2f4a32] px-6 py-20 text-[#faf7f0] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#faf7f0]/65">
            {property.name}
          </p>
          <h2 className="font-serif mt-5 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
            Talk to the camp directly.
          </h2>
          <p className="mt-5 max-w-md mx-auto text-base leading-[1.7] text-[#faf7f0]/75 sm:text-lg">
            We respond on WhatsApp, usually within a day.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#c46a2b] px-9 text-[15px] font-semibold tracking-tight text-[#faf7f0] shadow-[0_22px_44px_-20px_rgba(196,106,43,0.6)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[#a94f1f] active:scale-[0.98]"
            >
              <MessageIcon className="h-4 w-4" />
              Chat with Camp
            </a>
            <a
              href={`tel:${property.emergencyContact.phone.replace(/\s+/g, "")}`}
              className="inline-flex h-[52px] items-center justify-center gap-2 px-2 text-sm font-semibold tracking-tight text-[#f4e8d2] hover:text-[#faf7f0]"
            >
              <PhoneIcon className="h-4 w-4" />
              Call camp
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  Building blocks                                                  */
/* --------------------------------------------------------------- */

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <header>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
        {eyebrow}
      </p>
      <h2 className="font-serif mt-4 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        {label}
      </p>
      <p className="font-serif mt-2 text-[32px] font-medium leading-tight tracking-tight text-foreground sm:text-[40px]">
        {value}
      </p>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
