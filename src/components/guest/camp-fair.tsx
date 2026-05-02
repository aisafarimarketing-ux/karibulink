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
    <div className="fair-theme bg-background text-foreground pb-24 sm:pb-0">
      <Hero property={property} fair={fair} />
      <QuickInfo fair={fair} />
      <Summary property={property} fair={fair} />
      <ActionBar property={property} fair={fair} />
      <Accommodation fair={fair} />
      <Experience fair={fair} />
      <TradeOverview fair={fair} />
      <Policies fair={fair} />
      <Inquiry property={property} fair={fair} />
      <BottomCTA property={property} fair={fair} />
      <StickyBar property={property} fair={fair} />
    </div>
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
  const heroMeta = (fair.highlights ?? []).slice(0, 3);
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
            {heroMeta.length > 0 && (
              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.2em] text-[#faf7f0]/85 sm:text-[13px]">
                {heroMeta.map((item, i) => (
                  <li key={item} className="flex items-center gap-x-6">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="hidden h-1 w-1 rounded-full bg-[#faf7f0]/60 sm:inline-block"
                      />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/*  2a. Quick Info — silk-grid stats strip under the hero            */
/* --------------------------------------------------------------- */

function QuickInfo({ fair }: { fair: FairMode }) {
  const facts: { label: string; value: string }[] = [];
  if (fair.accommodation?.rooms !== undefined) {
    facts.push({
      label: "Stay",
      value: `${fair.accommodation.rooms} Luxury Tents`,
    });
  }
  if (fair.accommodation?.capacity !== undefined) {
    facts.push({
      label: "Guests",
      value: `Up to ${fair.accommodation.capacity} Guests`,
    });
  }
  if (fair.airstripDistance) {
    facts.push({ label: "Access", value: fair.airstripDistance });
  }
  if (fair.season) {
    facts.push({ label: "Season", value: fair.season });
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
            className="fair-silk-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            role="list"
          >
            {facts.map((fact) => (
              <li key={fact.label} className="px-5 py-6 sm:px-6 sm:py-7">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                  {fact.label}
                </p>
                <p className="font-serif mt-2 text-[19px] font-medium leading-snug tracking-tight text-foreground sm:text-[21px]">
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
/*  2b. Intro — headline, paragraph, "Best for" list                 */
/* --------------------------------------------------------------- */

function Summary({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const bestForList = fair.bestForList ?? [];
  return (
    <Reveal>
      <section className="px-6 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-muted">
            Overview
          </p>
          <h2 className="font-serif mt-4 text-[34px] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[44px]">
            Located in the central Serengeti migration corridor
          </h2>
          <p className="mt-7 text-lg leading-[1.7] text-foreground/85 sm:text-xl">
            {fair.about ?? property.welcomeMessage}
          </p>
          {bestForList.length > 0 && (
            <div className="mt-9">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Best for
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-foreground/90">
                {bestForList.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-x-3"
                  >
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-foreground/30"
                      />
                    )}
                    <span className="font-serif text-lg font-medium tracking-tight text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
      <section className="fair-section-frame mt-20 px-6 py-20 sm:mt-28 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Stay" title="Accommodation" />
          {acc.descriptor && (
            <p className="mt-6 max-w-xl text-lg leading-[1.7] text-foreground/80 sm:text-xl">
              {acc.descriptor}
            </p>
          )}
          {acc.features && acc.features.length > 0 && (
            <ul className="fair-silk-grid mt-10 grid-cols-1 sm:grid-cols-2">
              {acc.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 px-5 py-5 text-[15px] leading-relaxed text-foreground/90 sm:px-6 sm:py-6"
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
          <ul className="fair-silk-grid mt-10 grid-cols-1 sm:grid-cols-2">
            {activities.map((a) => (
              <li
                key={a.title}
                className="group flex items-start gap-3 px-5 py-6 transition-transform duration-200 hover:-translate-y-[1px] sm:px-6 sm:py-7"
              >
                <span
                  aria-hidden
                  className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
                >
                  <CompassIcon className="h-3 w-3" />
                </span>
                <div className="flex-1">
                  <p className="font-serif text-lg font-medium leading-tight tracking-tight text-foreground sm:text-xl">
                    {a.title}
                  </p>
                  {a.description && (
                    <p className="mt-1 text-[15px] leading-relaxed text-foreground/70">
                      {a.description}
                    </p>
                  )}
                  {a.meta && (
                    <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                      {a.meta}
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
/*  6. Trade Overview — structured silk-grid rows                    */
/* --------------------------------------------------------------- */

function TradeOverview({ fair }: { fair: FairMode }) {
  const tov = fair.tradeOverview ?? {};
  const rows: { label: string; values: string[] }[] = [];
  if (tov.location?.length || fair.accessNote) {
    rows.push({
      label: "Location",
      values: tov.location ?? [fair.accessNote!].filter(Boolean),
    });
  }
  if (tov.bestFor?.length || fair.bestFor) {
    rows.push({
      label: "Best For",
      values: tov.bestFor ?? [fair.bestFor!].filter(Boolean),
    });
  }
  if (tov.onTheGround?.length || fair.guidingNote || fair.operatorResponseNote) {
    rows.push({
      label: "On the Ground",
      values:
        tov.onTheGround ??
        [fair.guidingNote, fair.operatorResponseNote].filter(
          (v): v is string => Boolean(v),
        ),
    });
  }
  if (tov.capacity?.length) {
    rows.push({ label: "Capacity", values: tov.capacity });
  }
  if (tov.languages?.length) {
    rows.push({ label: "Languages", values: tov.languages });
  }
  if (rows.length === 0) return null;

  return (
    <Reveal>
      <section className="fair-section-frame mt-20 px-6 py-20 sm:mt-28 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="For the trade" title="Trade Overview" />
          <dl className="fair-silk-grid mt-10 grid-cols-1">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-3 px-5 py-5 sm:grid-cols-[180px_1fr] sm:gap-6 sm:px-7 sm:py-6"
              >
                <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted sm:pt-[3px]">
                  {row.label}
                </dt>
                <dd className="space-y-1.5 text-[15px] leading-relaxed text-foreground/85">
                  {row.values.map((v) => (
                    <p key={v}>{v}</p>
                  ))}
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
/*  8. Inquiry form                                                  */
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

  return (
    <section
      id="inquiry"
      className="fair-section-frame mt-20 scroll-mt-12 bg-[#f4e8d2] px-6 py-20 sm:mt-28 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
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
                  Send a formal inquiry. Your message goes directly to the
                  camp. Most replies within 24 hours.
                </p>
                <form onSubmit={onSubmit} className="mt-10 grid gap-7">
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
                  <label className="fair-field block">
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
                      className="mt-2 w-full bg-transparent px-0 py-2 text-base leading-relaxed text-foreground placeholder:text-muted/70 focus:outline-none"
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
    <label className="fair-field block">
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
        className="mt-2 h-11 w-full bg-transparent px-0 text-base text-foreground placeholder:text-muted/70 focus:outline-none"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  9. Bottom CTA — connect direct                                   */
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
            No middle desks. Your message goes directly to the camp manager.
            Most responses happen within 24 hours on WhatsApp.
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
              Call Camp
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  10. Sticky bottom action bar — mobile-only, appears after hero   */
/* --------------------------------------------------------------- */

function StickyBar({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:hidden"
        >
          <div
            className="flex items-stretch gap-2 rounded-full bg-background/95 p-1.5 shadow-[0_18px_36px_-12px_rgba(31,31,27,0.25)] backdrop-blur-md"
            style={{ border: "1px solid var(--line)" }}
          >
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[14px] font-semibold tracking-tight text-primary-foreground active:scale-[0.98]"
            >
              <MessageIcon className="h-4 w-4" />
              Chat
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[14px] font-semibold tracking-tight text-foreground active:scale-[0.98]"
              style={{ border: "1px solid var(--line)" }}
            >
              Send Inquiry
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
