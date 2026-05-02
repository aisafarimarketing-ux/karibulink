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
  CompassIcon,
  MessageIcon,
  PhoneIcon,
  StarIcon,
  TentIcon,
  UserIcon,
  MoonIcon,
  CameraIcon,
  RouteIcon,
  InfoIcon,
} from "@/components/icons";
import { saveFairLead } from "@/lib/fair-leads";
import type {
  FairActivity,
  FairDownloadable,
  FairMode,
  FairRoomSetup,
  IconKey,
  Property,
} from "@/data/types";

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
    <div className="fair-theme bg-background text-foreground pb-28 sm:pb-0">
      <MobileHeader property={property} />
      <Hero property={property} fair={fair} />
      <TradeSnapshot fair={fair} />
      <OverviewAndContact property={property} fair={fair} />
      <Rooms fair={fair} />
      <Experiences fair={fair} />
      <InclusionsExclusions fair={fair} />
      <OffersTerms fair={fair} />
      <TradeFit fair={fair} />
      <TradeMaterials fair={fair} />
      <SocialProof fair={fair} />
      <LeadCapture property={property} fair={fair} />
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
    message ??
    `Hello, I'm interested in ${campName}. I saw your trade profile on KaribuLink.`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}

const ICON_MAP: Record<string, (props: { className?: string }) => ReactNode> = {
  user: UserIcon,
  tent: TentIcon,
  moon: MoonIcon,
  compass: CompassIcon,
  star: StarIcon,
  camera: CameraIcon,
  route: RouteIcon,
  info: InfoIcon,
};

function renderIcon(key: IconKey | undefined, className: string) {
  const Component = (key && ICON_MAP[key]) || CompassIcon;
  return <Component className={className} />;
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/* --------------------------------------------------------------- */
/*  1. Mobile header — slim, sticky                                  */
/* --------------------------------------------------------------- */

function MobileHeader({ property }: { property: Property }) {
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

  const onShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: property.name, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(250, 247, 240, 0.92)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5 sm:h-14 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="font-serif text-base font-medium tracking-tight text-foreground sm:text-lg"
        >
          KaribuLink
        </Link>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onShare}
            aria-label="Share"
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-soft/60 hover:text-foreground"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleShortlist}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? "Saved" : "Save camp"}
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-soft/60 hover:text-foreground"
          >
            <span aria-hidden className="text-base leading-none">
              {shortlisted && hydrated ? "❤" : "♡"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- */
/*  2. Hero                                                          */
/* --------------------------------------------------------------- */

function Hero({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const imageSrc = property.heroImageUrl || HERO_FALLBACK_SRC;
  const heroMeta = (fair.highlights ?? []).slice(0, 3);
  const totalRooms = fair.accommodation?.rooms;
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[78vh] w-full sm:h-[82vh] lg:h-[86vh]">
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Trade profile badge */}
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
          className="absolute left-5 top-5 inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#faf7f0] sm:left-8 sm:top-8 sm:text-[11px]"
          style={{
            border: "1px solid rgba(250, 247, 240, 0.55)",
            background: "rgba(0, 0, 0, 0.18)",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[#c46a2b]"
          />
          Trade Profile
        </motion.span>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut, delay: 0.2 }}
          className="absolute inset-x-0 bottom-0 px-5 pb-9 text-[#faf7f0] sm:px-10 sm:pb-14 lg:px-16 lg:pb-20"
        >
          <div className="mx-auto max-w-5xl">
            {fair.collection && (
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#faf7f0]/70 sm:text-[11px]">
                {fair.collection}
              </p>
            )}
            <h1 className="font-serif mt-3 text-[40px] font-medium leading-[0.96] tracking-tight sm:text-[60px] lg:text-[76px]">
              {property.name}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.22em] text-[#faf7f0]/85 sm:text-[13px]">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden>📍</span>
                {property.location}
              </span>
              {fair.rating && (
                <>
                  <span aria-hidden className="text-[#faf7f0]/40">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <StarIcon className="h-3 w-3" />
                    {fair.rating.stars.toFixed(1)}
                  </span>
                </>
              )}
              {totalRooms !== undefined && (
                <>
                  <span aria-hidden className="text-[#faf7f0]/40">·</span>
                  <span>{totalRooms} Tents</span>
                </>
              )}
              {fair.destinationTag && (
                <>
                  <span aria-hidden className="text-[#faf7f0]/40">·</span>
                  <span>{fair.destinationTag.split(",")[0]}</span>
                </>
              )}
            </p>
            {fair.tagline && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#faf7f0]/90 sm:text-lg">
                {fair.tagline}
              </p>
            )}
            {heroMeta.length > 0 && (
              <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#faf7f0]/85 sm:text-[12px]">
                {heroMeta.map((item, i) => (
                  <li key={item} className="flex items-center gap-x-5">
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
/*  3. Trade Snapshot                                                */
/* --------------------------------------------------------------- */

function TradeSnapshot({ fair }: { fair: FairMode }) {
  const items = fair.snapshot;
  if (!items || items.length === 0) return null;
  return (
    <Reveal>
      <Section className="pt-12 sm:pt-16 lg:pt-20">
        <SnapshotEyebrow text="Trade Snapshot" />
        <ul className="fair-silk-grid mt-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <li key={item.label} className="px-4 py-5 sm:px-5 sm:py-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-muted">
                {item.label}
              </p>
              <p className="font-serif mt-2 text-[17px] font-medium leading-snug tracking-tight text-foreground sm:text-[19px]">
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  4. Property Overview + Contact Card                              */
/* --------------------------------------------------------------- */

function OverviewAndContact({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  return (
    <Reveal>
      <Section className="pt-14 sm:pt-20 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <SectionTitle eyebrow="Overview" title="Property Overview" />
            <p className="mt-7 text-base leading-[1.75] text-foreground/85 sm:text-lg">
              {fair.about ?? property.welcomeMessage}
            </p>
            {fair.vibeText && (
              <p className="font-serif mt-6 border-l-2 pl-5 text-[17px] leading-relaxed tracking-tight text-foreground/80 sm:text-[19px]"
                 style={{ borderColor: "var(--primary)" }}>
                {fair.vibeText}
              </p>
            )}
            {fair.overviewImageUrl && (
              <div className="mt-8 overflow-hidden" style={{ border: "1px solid var(--line)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fair.overviewImageUrl}
                  alt=""
                  loading="lazy"
                  className="h-56 w-full object-cover sm:h-72 lg:h-80"
                />
              </div>
            )}
          </div>
          <ContactCard property={property} fair={fair} />
        </div>
      </Section>
    </Reveal>
  );
}

function ContactCard({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const c = fair.contact;
  if (!c) return null;
  const wa = whatsappLink(c.whatsapp ?? c.phone, property.name);
  const initials = c.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  return (
    <aside className="fair-box self-start p-6 sm:p-7">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        Trade Contact
      </p>
      <div className="mt-5 flex items-start gap-4">
        <div
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2f4a32] text-[#faf7f0]"
        >
          <span className="font-serif text-base font-medium tracking-tight">
            {initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-serif text-xl font-medium leading-tight tracking-tight text-foreground">
            {c.name}
          </p>
          <p className="mt-0.5 text-[13px] text-muted">{c.title}</p>
          {c.company && (
            <p className="mt-0.5 text-[13px] text-muted">{c.company}</p>
          )}
        </div>
      </div>

      <dl className="fair-rows mt-6 text-[14px] text-foreground/85">
        <div className="flex items-start justify-between gap-4 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Email
          </dt>
          <dd className="text-right">
            <a className="hover:underline" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Phone
          </dt>
          <dd>
            <a className="hover:underline" href={`tel:${c.phone.replace(/\s+/g, "")}`}>
              {c.phone}
            </a>
          </dd>
        </div>
        {c.website && (
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              Website
            </dt>
            <dd>
              <a
                className="hover:underline"
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.website.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-3 text-[13px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          <MessageIcon className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <a
          href={`mailto:${c.email}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60"
          style={{ border: "1px solid var(--line)" }}
        >
          <MailIcon className="h-3.5 w-3.5" />
          Email
        </a>
        <a
          href={`tel:${c.phone.replace(/\s+/g, "")}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60"
          style={{ border: "1px solid var(--line)" }}
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Call
        </a>
        {c.website && (
          <a
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60"
            style={{ border: "1px solid var(--line)" }}
          >
            <GlobeIcon className="h-3.5 w-3.5" />
            Website
          </a>
        )}
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------- */
/*  5. Rooms & Setups                                                */
/* --------------------------------------------------------------- */

function Rooms({ fair }: { fair: FairMode }) {
  const rooms: FairRoomSetup[] = fair.roomSetups ?? [];
  if (rooms.length === 0) return null;
  return (
    <Reveal>
      <Section className="fair-section-frame mt-14 sm:mt-20" framePadded>
        <SectionTitle eyebrow="Stay" title="Rooms & Setups" />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
          Sixteen tents, three layouts. Mix and match for couples,
          families, or single travellers within the same camp.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {rooms.map((r) => (
            <li
              key={r.title}
              className="fair-box flex flex-col overflow-hidden"
            >
              {r.thumbnailUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={r.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full object-cover sm:h-44"
                />
              )}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]">
                    {renderIcon(r.iconKey, "h-4 w-4")}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                    × {r.count}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium leading-tight tracking-tight text-foreground">
                  {r.title}
                </h3>
                {r.description && (
                  <p className="text-[14px] leading-relaxed text-foreground/75">
                    {r.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  6. Experiences                                                   */
/* --------------------------------------------------------------- */

function Experiences({ fair }: { fair: FairMode }) {
  const all: FairActivity[] = (fair.activities ?? []).map((a) =>
    typeof a === "string" ? { title: a } : a,
  );
  if (all.length === 0) return null;
  const included = all.filter(
    (a) => a.category !== "optional" && !/add-on|premium add/i.test(a.meta ?? ""),
  );
  const optional = all.filter(
    (a) => a.category === "optional" || /add-on|premium add/i.test(a.meta ?? ""),
  );
  return (
    <Reveal>
      <Section className="pt-14 sm:pt-20 lg:pt-24">
        <SectionTitle eyebrow="Days at camp" title="Experiences" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <ExperienceList
            label="Included Experiences"
            items={included}
            tone="included"
          />
          {optional.length > 0 && (
            <ExperienceList
              label="Optional Add-ons"
              items={optional}
              tone="optional"
            />
          )}
        </div>
      </Section>
    </Reveal>
  );
}

function ExperienceList({
  label,
  items,
  tone,
}: {
  label: string;
  items: FairActivity[];
  tone: "included" | "optional";
}) {
  if (items.length === 0) return null;
  const tag = tone === "included" ? "Included" : "Add-on";
  return (
    <div>
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
        {label}
      </p>
      <ul className="fair-rows mt-4 fair-box">
        {items.map((a) => (
          <li
            key={a.title}
            className="flex items-start gap-3 px-5 py-5 transition-transform duration-200 hover:-translate-y-[1px]"
          >
            <span
              aria-hidden
              className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
            >
              {renderIcon(a.iconKey ?? "compass", "h-3 w-3")}
            </span>
            <div className="flex-1">
              <p className="font-serif text-lg font-medium leading-tight tracking-tight text-foreground">
                {a.title}
              </p>
              {a.description && (
                <p className="mt-1 text-[14px] leading-relaxed text-foreground/70">
                  {a.description}
                </p>
              )}
              {a.meta && (
                <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                  {a.meta}
                </p>
              )}
            </div>
            <span
              className="ml-2 hidden shrink-0 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] sm:inline-block"
              style={{
                border: "1px solid var(--line)",
                color:
                  tone === "included" ? "#2f4a32" : "var(--primary)",
              }}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  7. Inclusions & Exclusions                                       */
/* --------------------------------------------------------------- */

function InclusionsExclusions({ fair }: { fair: FairMode }) {
  const inc = fair.inclusions ?? [];
  const exc = fair.exclusions ?? [];
  if (inc.length === 0 && exc.length === 0) return null;
  return (
    <Reveal>
      <Section className="fair-section-frame mt-14 sm:mt-20" framePadded>
        <SectionTitle eyebrow="The rate" title="Inclusions & Exclusions" />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {inc.length > 0 && (
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                Included
              </p>
              <ul className="fair-rows mt-4 fair-box">
                {inc.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 px-5 py-3.5 text-[14px] leading-relaxed text-foreground/85"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {exc.length > 0 && (
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                Not Included
              </p>
              <ul className="fair-rows mt-4 fair-box">
                {exc.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 px-5 py-3.5 text-[14px] leading-relaxed text-foreground/75"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-foreground/50"
                      style={{ border: "1px solid var(--line)" }}
                    >
                      <XIcon className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  8. Offers & Terms                                                */
/* --------------------------------------------------------------- */

function OffersTerms({ fair }: { fair: FairMode }) {
  if (!fair.offersText && !fair.termsText) return null;
  return (
    <Reveal>
      <Section className="pt-14 sm:pt-20">
        <SectionTitle eyebrow="Commercial" title="Offers & Terms" />
        <div className="fair-box mt-8 grid gap-6 p-6 sm:grid-cols-2 sm:gap-10 sm:p-8">
          {fair.offersText && (
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Current Offers
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                {fair.offersText}
              </p>
            </div>
          )}
          {fair.termsText && (
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Booking Terms
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                {fair.termsText}
              </p>
            </div>
          )}
        </div>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  9. Trade Fit                                                     */
/* --------------------------------------------------------------- */

function TradeFit({ fair }: { fair: FairMode }) {
  const m = fair.matchAttributes;
  if (!m) return null;
  const blocks: { label: string; tags: string[] }[] = [];
  if (m.idealFor?.length) blocks.push({ label: "Ideal For", tags: m.idealFor });
  if (m.experiences?.length)
    blocks.push({ label: "Experiences", tags: m.experiences });
  if (m.styleTags?.length) blocks.push({ label: "Style", tags: m.styleTags });
  if (m.suitability?.length)
    blocks.push({ label: "Suitability", tags: m.suitability });
  if (blocks.length === 0 && !m.customFitNotes) return null;
  return (
    <Reveal>
      <Section className="fair-section-frame mt-14 sm:mt-20" framePadded>
        <div className="flex items-baseline justify-between gap-6">
          <SectionTitle eyebrow="Match profile" title="Trade Fit" />
          <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted sm:inline">
            For your client briefs
          </span>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.label} className="fair-box p-5 sm:p-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                {b.label}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {b.tags.map((t) => (
                  <li
                    key={t}
                    className="px-2.5 py-1 text-[12px] tracking-tight text-foreground"
                    style={{ border: "1px solid var(--line)" }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {m.customFitNotes && (
          <div className="fair-box mt-5 p-5 sm:p-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
              Custom Fit Notes
            </p>
            <p className="font-serif mt-3 text-[16px] leading-relaxed tracking-tight text-foreground/85 sm:text-[18px]">
              {m.customFitNotes}
            </p>
          </div>
        )}
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  10. Trade Materials                                              */
/* --------------------------------------------------------------- */

function TradeMaterials({ fair }: { fair: FairMode }) {
  const items: FairDownloadable[] = fair.downloadables ?? [];
  if (items.length === 0) return null;
  return (
    <Reveal>
      <Section className="pt-14 sm:pt-20" id="materials">
        <SectionTitle eyebrow="Resources" title="Trade Materials" />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
          Everything an operator needs to sell the camp confidently —
          rate sheets, image library, sample itineraries.
        </p>
        <ul className="fair-rows mt-8 fair-box">
          {items.map((d) => (
            <li
              key={d.title}
              className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5"
            >
              <span
                aria-hidden
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
              >
                {renderIcon(d.iconKey, "h-4 w-4")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-[16px] font-medium leading-tight tracking-tight text-foreground sm:text-[17px]">
                  {d.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                  {d.fileType}
                </p>
              </div>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[12px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60 sm:px-5 sm:text-[13px]"
                style={{ border: "1px solid var(--line)" }}
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden">Get</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  11. Social proof — Social / TripAdvisor / Quote                  */
/* --------------------------------------------------------------- */

function SocialProof({ fair }: { fair: FairMode }) {
  const { socialLinks, tripadvisor, testimonial } = fair;
  if (!socialLinks?.length && !tripadvisor && !testimonial) return null;
  return (
    <Reveal>
      <Section className="pt-14 sm:pt-20">
        <SectionTitle eyebrow="Trust" title="Voices & Reviews" />
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr_1.5fr]">
          {socialLinks && socialLinks.length > 0 && (
            <div className="fair-box p-5 sm:p-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Social
              </p>
              <ul className="fair-rows mt-3 text-[14px]">
                {socialLinks.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-base text-foreground hover:text-primary"
                    >
                      {s.label}
                    </a>
                    {s.handle && (
                      <span className="text-muted">{s.handle}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tripadvisor && (
            <div className="fair-box p-5 sm:p-6">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                TripAdvisor
              </p>
              <p className="font-serif mt-4 text-[44px] font-medium leading-none tracking-tight text-foreground sm:text-[52px]">
                {tripadvisor.rating.toFixed(1)}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[#c46a2b]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.round(tripadvisor.rating) ? "" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
              {tripadvisor.reviewCount && (
                <p className="mt-3 text-[13px] text-muted">
                  Based on {tripadvisor.reviewCount.toLocaleString()} reviews
                </p>
              )}
              {tripadvisor.url && (
                <a
                  href={tripadvisor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-semibold tracking-tight text-foreground hover:bg-soft/60"
                  style={{ border: "1px solid var(--line)" }}
                >
                  Read reviews
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              )}
            </div>
          )}
          {testimonial && (
            <figure className="fair-box flex flex-col p-5 sm:p-7">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Operator Quote
              </p>
              <blockquote className="font-serif mt-4 flex-1 text-[18px] leading-relaxed tracking-tight text-foreground/90 sm:text-[22px]">
                <span aria-hidden className="mr-1 text-primary">“</span>
                {testimonial.quote}
                <span aria-hidden className="ml-1 text-primary">”</span>
              </blockquote>
              <figcaption className="mt-5 text-[13px] text-muted">
                <span className="font-medium text-foreground">
                  {testimonial.author}
                </span>
                {testimonial.role && <> · {testimonial.role}</>}
              </figcaption>
            </figure>
          )}
        </div>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  12. Lead Capture                                                 */
/* --------------------------------------------------------------- */

function LeadCapture({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const lc = fair.leadCapture;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    whatsapp: "",
    interest: lc?.interestOptions?.[0] ?? "",
    message: "",
  });

  const phone = fair.contact?.whatsapp ?? fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);

  const onChange =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void saveFairLead({
      campSlug: property.slug,
      campName: property.name,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.whatsapp,
      message: `[${form.interest}] ${form.message}`.trim(),
      source: "fair-mode",
    });
    setSubmitted(true);
  };

  const headline = lc?.headline ?? "Send Trade Inquiry";
  const subcopy =
    lc?.subcopy ??
    "Send a formal inquiry. Your message goes directly to the camp. Most replies within 24 hours.";

  return (
    <section
      id="inquiry"
      className="fair-section-frame mt-14 scroll-mt-12 bg-[#f4e8d2] sm:mt-20"
    >
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <Reveal>
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
                <h2 className="font-serif mt-5 text-[36px] font-medium leading-[1] tracking-tight text-foreground sm:text-[44px]">
                  Request sent.
                </h2>
                <p className="mt-4 max-w-md text-base leading-[1.7] text-foreground/75 sm:text-lg">
                  The camp will reply directly. You can also continue on
                  WhatsApp now.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover"
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
                        email: "",
                        company: "",
                        whatsapp: "",
                        interest: lc?.interestOptions?.[0] ?? "",
                        message: "",
                      });
                    }}
                    className="inline-flex h-[52px] items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground/70 hover:text-foreground"
                  >
                    Send another request
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
                className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
              >
                <div>
                  <SectionTitle eyebrow="Trade enquiry" title={headline} />
                  <p className="mt-5 max-w-md text-base leading-[1.7] text-foreground/75 sm:text-lg">
                    {subcopy}
                  </p>
                  {lc?.bullets && lc.bullets.length > 0 && (
                    <ul className="fair-rows mt-8 fair-box bg-background">
                      {lc.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 px-4 py-3.5 text-[14px] leading-relaxed text-foreground/85"
                        >
                          <span
                            aria-hidden
                            className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
                          >
                            <CheckIcon className="h-2.5 w-2.5" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <form onSubmit={onSubmit} className="grid gap-7">
                  <Field
                    label="Full name"
                    value={form.name}
                    onChange={onChange("name")}
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
                    label="Company"
                    value={form.company}
                    onChange={onChange("company")}
                    required
                  />
                  <Field
                    label="WhatsApp number"
                    type="tel"
                    value={form.whatsapp}
                    onChange={onChange("whatsapp")}
                    placeholder="+255 …"
                    required
                  />
                  {lc?.interestOptions && lc.interestOptions.length > 0 && (
                    <label className="fair-field block">
                      <span className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Interest
                        </span>
                      </span>
                      <select
                        value={form.interest}
                        onChange={onChange("interest")}
                        className="mt-2 h-11 w-full bg-transparent px-0 text-base text-foreground focus:outline-none"
                      >
                        {lc.interestOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
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
                      rows={3}
                      placeholder="Group size, dates, special requests."
                      className="mt-2 w-full bg-transparent px-0 py-2 text-base leading-relaxed text-foreground placeholder:text-muted/70 focus:outline-none"
                    />
                  </label>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-colors hover:bg-primary-hover sm:self-start"
                  >
                    {lc?.ctaLabel ?? "Send Inquiry"}
                    <ArrowRightIcon className="h-4 w-4" />
                  </motion.button>
                  {lc?.disclaimer && (
                    <p className="text-[12px] leading-relaxed text-muted">
                      {lc.disclaimer}
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
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
/*  13. Bottom CTA strip — desktop                                   */
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
      <section className="bg-[#2f4a32] px-5 py-16 text-[#faf7f0] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#faf7f0]/65">
            {property.name}
          </p>
          <h2 className="font-serif mt-5 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[48px]">
            Talk to the camp directly.
          </h2>
          <p className="mt-5 max-w-md mx-auto text-base leading-[1.7] text-[#faf7f0]/75 sm:text-lg">
            No middle desks. Your message goes directly to the camp manager.
            Most responses happen within 24 hours on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
              href="#inquiry"
              className="inline-flex h-[52px] items-center justify-center gap-2 px-2 text-sm font-semibold tracking-tight text-[#f4e8d2] hover:text-[#faf7f0]"
            >
              Request Trade Pack
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  14. Sticky bottom action bar — mobile                            */
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
      setVisible(window.scrollY > window.innerHeight * 0.5);
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
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 text-[13px] font-semibold tracking-tight text-primary-foreground active:scale-[0.98]"
            >
              <MessageIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-semibold tracking-tight text-foreground active:scale-[0.98]"
              style={{ border: "1px solid var(--line)" }}
            >
              Trade Pack
              <ArrowRightIcon className="h-3.5 w-3.5" />
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

function Section({
  children,
  className = "",
  id,
  framePadded = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  framePadded?: boolean;
}) {
  const padding = framePadded
    ? "px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24"
    : "px-5 sm:px-8 lg:px-16";
  return (
    <section id={id} className={`${padding} ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

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
      <h2 className="font-serif mt-3 text-[30px] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[40px] lg:text-[48px]">
        {title}
      </h2>
    </header>
  );
}

function SnapshotEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-8 bg-foreground/30" />
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.32em] text-muted">
        {text}
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
