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
      <QuickActions property={property} fair={fair} />
      <ContactCardSection property={property} fair={fair} />
      <PropertyOverview property={property} fair={fair} />
      <Rooms fair={fair} />
      <Experiences fair={fair} />
      <TradeFit fair={fair} />
      <InclusionsExclusions fair={fair} />
      <OffersTerms fair={fair} />
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
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:h-14 sm:px-8 lg:px-16">
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
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-soft/60 hover:text-foreground"
          >
            <ShareIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleShortlist}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? "Saved" : "Save camp"}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-soft/60 hover:text-foreground"
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
  return (
    <section
      id="trade-hero"
      className="relative w-full overflow-hidden"
    >
      <div className="relative h-[70vh] w-full sm:h-[80vh] lg:h-[86vh]">
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Trade profile badge */}
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
          className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#faf7f0] sm:left-8 sm:top-8 sm:text-[11px]"
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
          className="absolute inset-x-0 bottom-0 px-4 pb-7 text-[#faf7f0] sm:px-10 sm:pb-12 lg:px-16 lg:pb-20"
        >
          <div className="mx-auto max-w-5xl">
            {fair.collection && (
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#faf7f0]/70 sm:text-[11px]">
                {fair.collection}
              </p>
            )}
            <h1 className="font-serif mt-2.5 text-[34px] font-medium leading-[0.98] tracking-tight sm:text-[56px] lg:text-[76px]">
              {property.name}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-[#faf7f0]/85 sm:text-[13px]">
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
            </p>
            {heroMeta.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {heroMeta.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#faf7f0]/95 sm:px-3 sm:py-1.5 sm:text-[11px]"
                    style={{
                      border: "1px solid rgba(250, 247, 240, 0.35)",
                      background: "rgba(0, 0, 0, 0.18)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {item}
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
      <Section className="pt-10 sm:pt-14 lg:pt-20">
        <SnapshotEyebrow text="Trade Snapshot" />
        <ul className="fair-silk-grid mt-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <li key={item.label} className="px-4 py-4 sm:px-5 sm:py-6">
              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.24em] text-muted sm:text-[10px] sm:tracking-[0.26em]">
                {item.label}
              </p>
              <p className="font-serif mt-2 text-[16px] font-medium leading-snug tracking-tight text-foreground sm:text-[19px]">
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
/*  4. Quick Actions                                                 */
/* --------------------------------------------------------------- */

function QuickActions({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const phone = fair.contact?.whatsapp ?? fair.whatsappPhone ?? property.emergencyContact.phone;
  const wa = whatsappLink(phone, property.name);
  const factSheet = fair.downloadables?.[0];
  return (
    <Reveal>
      <Section className="pt-8 sm:pt-12">
        <div className="fair-box p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[14px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover sm:h-12"
            >
              <MessageIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 text-[14px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60"
              style={{ border: "1px solid var(--line)" }}
            >
              Request Trade Pack
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
            {factSheet && (
              <a
                href={factSheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 text-[14px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60"
                style={{ border: "1px solid var(--line)" }}
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                Fact Sheet
              </a>
            )}
          </div>
        </div>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  5. Contact Card section — moved up on mobile                     */
/* --------------------------------------------------------------- */

function ContactCardSection({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  if (!fair.contact) return null;
  return (
    <Reveal>
      <Section className="pt-10 sm:pt-14">
        <ContactCard property={property} fair={fair} />
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
    <aside className="fair-box p-5 sm:p-7">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        Trade Contact
      </p>
      <div className="mt-4 flex items-start gap-4">
        <div
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2f4a32] text-[#faf7f0]"
        >
          <span className="font-serif text-base font-medium tracking-tight">
            {initials}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg font-medium leading-tight tracking-tight text-foreground sm:text-xl">
            {c.name}
          </p>
          <p className="mt-0.5 text-[13px] text-muted">{c.title}</p>
          {c.company && (
            <p className="mt-0.5 text-[13px] text-muted">{c.company}</p>
          )}
        </div>
      </div>

      <dl className="fair-rows mt-5 text-[14px] text-foreground/85">
        <div className="flex items-start justify-between gap-4 py-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Email
          </dt>
          <dd className="text-right break-all">
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
      </dl>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary px-2 text-[12px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover sm:text-[13px]"
        >
          <MessageIcon className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <a
          href={`mailto:${c.email}`}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-2 text-[12px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60 sm:text-[13px]"
          style={{ border: "1px solid var(--line)" }}
        >
          <MailIcon className="h-3.5 w-3.5" />
          Email
        </a>
        <a
          href={`tel:${c.phone.replace(/\s+/g, "")}`}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-2 text-[12px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60 sm:text-[13px]"
          style={{ border: "1px solid var(--line)" }}
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Call
        </a>
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------- */
/*  6. Property Overview — short                                     */
/* --------------------------------------------------------------- */

function PropertyOverview({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  return (
    <Reveal>
      <Section className="pt-10 sm:pt-14 lg:pt-20">
        <SectionTitle eyebrow="Overview" title="About the camp" />
        <p className="mt-5 text-[15.5px] leading-[1.7] text-foreground/85 sm:text-lg">
          {fair.about ?? property.welcomeMessage}
        </p>
        {fair.vibeText && (
          <p
            className="font-serif mt-5 border-l-2 pl-4 text-[16px] leading-relaxed tracking-tight text-foreground/80 sm:pl-5 sm:text-[19px]"
            style={{ borderColor: "var(--primary)" }}
          >
            {fair.vibeText}
          </p>
        )}
        {fair.overviewImageUrl && (
          <div
            className="mt-7 overflow-hidden"
            style={{ border: "1px solid var(--line)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fair.overviewImageUrl}
              alt=""
              loading="lazy"
              className="h-52 w-full object-cover sm:h-72 lg:h-80"
            />
          </div>
        )}
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  7. Rooms & Setups                                                */
/* --------------------------------------------------------------- */

function Rooms({ fair }: { fair: FairMode }) {
  const rooms: FairRoomSetup[] = fair.roomSetups ?? [];
  if (rooms.length === 0) return null;
  return (
    <Reveal>
      <Section className="fair-section-frame mt-10 sm:mt-16" framePadded>
        <SectionTitle eyebrow="Stay" title="Rooms & Setups" />
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-foreground/75 sm:text-base">
          Sixteen tents, three layouts. Mix and match within the same camp.
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {rooms.map((r) => (
            <li
              key={r.title}
              className="fair-box flex overflow-hidden sm:flex-col"
            >
              {r.thumbnailUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={r.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  className="h-auto w-28 shrink-0 object-cover sm:h-44 sm:w-full"
                />
              )}
              <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32] sm:h-9 sm:w-9">
                    {renderIcon(r.iconKey, "h-3.5 w-3.5 sm:h-4 sm:w-4")}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                    × {r.count}
                  </span>
                </div>
                <h3 className="font-serif text-[17px] font-medium leading-tight tracking-tight text-foreground sm:text-xl">
                  {r.title}
                </h3>
                {r.description && (
                  <p className="text-[13px] leading-relaxed text-foreground/75 line-clamp-3 sm:text-[14px]">
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
/*  8. Experiences                                                   */
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
      <Section className="pt-10 sm:pt-16 lg:pt-20">
        <SectionTitle eyebrow="Days at camp" title="Experiences" />
        <div className="mt-7 grid gap-7 lg:grid-cols-2 lg:gap-12">
          <ExperienceList
            label="Included"
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
      <ul className="fair-rows fair-box mt-3">
        {items.map((a) => (
          <li
            key={a.title}
            className="flex items-start gap-3 px-4 py-4 sm:px-5 sm:py-5"
          >
            <span
              aria-hidden
              className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
            >
              {renderIcon(a.iconKey ?? "compass", "h-3 w-3")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-serif text-[16px] font-medium leading-tight tracking-tight text-foreground sm:text-lg">
                  {a.title}
                </p>
                <span
                  className="ml-1 shrink-0 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px]"
                  style={{
                    border: "1px solid var(--line)",
                    color: tone === "included" ? "#2f4a32" : "var(--primary)",
                  }}
                >
                  {tag}
                </span>
              </div>
              {a.description && (
                <p className="mt-1 text-[13px] leading-relaxed text-foreground/70 sm:text-[14px]">
                  {a.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  9. Trade Fit — compact chip cloud                                */
/* --------------------------------------------------------------- */

function TradeFit({ fair }: { fair: FairMode }) {
  const m = fair.matchAttributes;
  if (!m) return null;
  const chips: string[] = [
    ...(m.idealFor ?? []),
    ...(m.styleTags ?? []),
    ...(m.experiences ?? []),
    ...(m.suitability ?? []),
  ];
  if (chips.length === 0 && !m.customFitNotes) return null;
  return (
    <Reveal>
      <Section className="pt-10 sm:pt-16 lg:pt-20">
        <SectionTitle eyebrow="Match profile" title="Trade Fit" />
        {chips.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((t) => (
              <li
                key={t}
                className="px-3 py-1.5 text-[12px] tracking-tight text-foreground sm:text-[13px]"
                style={{ border: "1px solid var(--line)" }}
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        {m.customFitNotes && (
          <div className="fair-box mt-5 p-5 sm:p-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
              Custom Fit Note
            </p>
            <p className="font-serif mt-3 text-[15.5px] leading-relaxed tracking-tight text-foreground/85 sm:text-[18px]">
              {m.customFitNotes}
            </p>
          </div>
        )}
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  10. Inclusions & Exclusions — accordion on mobile                */
/* --------------------------------------------------------------- */

function InclusionsExclusions({ fair }: { fair: FairMode }) {
  const inc = fair.inclusions ?? [];
  const exc = fair.exclusions ?? [];
  if (inc.length === 0 && exc.length === 0) return null;
  return (
    <Reveal>
      <Section className="fair-section-frame mt-10 sm:mt-16" framePadded>
        <SectionTitle eyebrow="The rate" title="Inclusions & Exclusions" />
        <div className="mt-7 grid gap-3 lg:grid-cols-2 lg:gap-6">
          {inc.length > 0 && (
            <AccordionPanel
              label="Included"
              count={inc.length}
              icon="check"
            >
              <ul className="fair-rows">
                {inc.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 px-4 py-3 text-[14px] leading-relaxed text-foreground/85"
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
            </AccordionPanel>
          )}
          {exc.length > 0 && (
            <AccordionPanel
              label="Not Included"
              count={exc.length}
              icon="x"
            >
              <ul className="fair-rows">
                {exc.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 px-4 py-3 text-[14px] leading-relaxed text-foreground/75"
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
            </AccordionPanel>
          )}
        </div>
      </Section>
    </Reveal>
  );
}

function AccordionPanel({
  label,
  count,
  icon,
  children,
}: {
  label: string;
  count: number;
  icon: "check" | "x";
  children: ReactNode;
}) {
  return (
    <details className="fair-box group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 outline-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className={
              icon === "check"
                ? "grid h-7 w-7 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32]"
                : "grid h-7 w-7 place-items-center rounded-full text-foreground/50"
            }
            style={icon === "x" ? { border: "1px solid var(--line)" } : undefined}
          >
            {icon === "check" ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <XIcon className="h-3.5 w-3.5" />
            )}
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
            {label}
          </span>
          <span className="text-[13px] text-muted">({count})</span>
        </div>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div
        className="border-t pb-2"
        style={{ borderColor: "var(--line)" }}
      >
        {children}
      </div>
    </details>
  );
}

/* --------------------------------------------------------------- */
/*  11. Offers & Terms                                               */
/* --------------------------------------------------------------- */

function OffersTerms({ fair }: { fair: FairMode }) {
  if (!fair.offersText && !fair.termsText) return null;
  return (
    <Reveal>
      <Section className="pt-10 sm:pt-16">
        <SectionTitle eyebrow="Commercial" title="Offers & Terms" />
        <div className="fair-box mt-6 grid gap-5 p-5 sm:grid-cols-2 sm:gap-10 sm:p-7">
          {fair.offersText && (
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Current Offers
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/85 sm:text-[15px]">
                {fair.offersText}
              </p>
            </div>
          )}
          {fair.termsText && (
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                Booking Terms
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/85 sm:text-[15px]">
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
/*  12. Trade Materials                                              */
/* --------------------------------------------------------------- */

function TradeMaterials({ fair }: { fair: FairMode }) {
  const items: FairDownloadable[] = fair.downloadables ?? [];
  if (items.length === 0) return null;
  return (
    <Reveal>
      <Section className="pt-10 sm:pt-16" id="materials">
        <SectionTitle eyebrow="Resources" title="Trade Materials" />
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-foreground/75 sm:text-base">
          Rate sheets, image library, and sample itineraries for your team.
        </p>
        <ul className="fair-rows fair-box mt-6">
          {items.map((d) => (
            <li
              key={d.title}
              className="flex items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-5"
            >
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2f4a32]/10 text-[#2f4a32] sm:h-10 sm:w-10"
              >
                {renderIcon(d.iconKey, "h-3.5 w-3.5 sm:h-4 sm:w-4")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-[15px] font-medium leading-tight tracking-tight text-foreground sm:text-[17px]">
                  {d.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {d.fileType}
                </p>
              </div>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${d.title}`}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[12px] font-semibold tracking-tight text-foreground transition-colors hover:bg-soft/60 sm:h-10 sm:px-5 sm:text-[13px]"
                style={{ border: "1px solid var(--line)" }}
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
                <span className="sm:hidden sr-only">Download</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </Reveal>
  );
}

/* --------------------------------------------------------------- */
/*  13. Social proof                                                 */
/* --------------------------------------------------------------- */

function SocialProof({ fair }: { fair: FairMode }) {
  const { socialLinks, tripadvisor, testimonial } = fair;
  if (!socialLinks?.length && !tripadvisor && !testimonial) return null;
  return (
    <Reveal>
      <Section className="pt-10 sm:pt-16">
        <SectionTitle eyebrow="Trust" title="Voices & Reviews" />
        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_1fr_1.5fr] lg:gap-5">
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
                      <span className="text-muted text-right text-[13px]">{s.handle}</span>
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
              <p className="font-serif mt-4 text-[40px] font-medium leading-none tracking-tight text-foreground sm:text-[52px]">
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
              <blockquote className="font-serif mt-4 flex-1 text-[16px] leading-relaxed tracking-tight text-foreground/90 sm:text-[20px]">
                <span aria-hidden className="mr-1 text-primary">“</span>
                {testimonial.quote}
                <span aria-hidden className="ml-1 text-primary">”</span>
              </blockquote>
              <figcaption className="mt-4 text-[13px] text-muted">
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
/*  14. Lead Capture                                                 */
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
      className="fair-section-frame mt-10 scroll-mt-12 bg-[#f4e8d2] sm:mt-16"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
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
                <h2 className="font-serif mt-5 text-[32px] font-medium leading-[1] tracking-tight text-foreground sm:text-[44px]">
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
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-semibold tracking-tight text-primary-foreground transition-colors hover:bg-primary-hover"
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
                    className="inline-flex h-12 items-center justify-center gap-1.5 px-2 text-sm font-semibold tracking-tight text-foreground/70 hover:text-foreground"
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
                className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
              >
                <div>
                  <SectionTitle eyebrow="Trade enquiry" title={headline} />
                  <p className="mt-4 max-w-md text-[15.5px] leading-[1.7] text-foreground/75 sm:text-base">
                    {subcopy}
                  </p>
                  {lc?.bullets && lc.bullets.length > 0 && (
                    <ul className="fair-rows fair-box mt-6 bg-background">
                      {lc.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 px-4 py-3 text-[13.5px] leading-relaxed text-foreground/85 sm:text-[14px]"
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
                <form onSubmit={onSubmit} className="grid gap-6">
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
                        className="mt-2 h-12 w-full bg-transparent px-0 text-base text-foreground focus:outline-none"
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
                    className="mt-1 inline-flex h-13 min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-9 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_22px_44px_-20px_rgba(196,106,43,0.55)] transition-colors hover:bg-primary-hover sm:self-start"
                    style={{ height: "52px" }}
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
        <span className="text-[15px] font-medium text-foreground">
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
        className="mt-2 h-12 w-full bg-transparent px-0 text-base text-foreground placeholder:text-muted/70 focus:outline-none"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  15. Bottom CTA strip — desktop                                   */
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
      <section className="bg-[#2f4a32] px-4 py-14 text-[#faf7f0] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#faf7f0]/65">
            {property.name}
          </p>
          <h2 className="font-serif mt-5 text-[28px] font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-[48px]">
            Talk to the camp directly.
          </h2>
          <p className="mt-5 max-w-md mx-auto text-[15px] leading-[1.7] text-[#faf7f0]/75 sm:text-lg">
            No middle desks. Your message goes directly to the camp manager.
            Most responses within 24 hours on WhatsApp.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c46a2b] px-9 text-[15px] font-semibold tracking-tight text-[#faf7f0] shadow-[0_22px_44px_-20px_rgba(196,106,43,0.6)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[#a94f1f] active:scale-[0.98] sm:h-[52px]"
            >
              <MessageIcon className="h-4 w-4" />
              Chat with Camp
            </a>
            <a
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center gap-2 px-2 text-sm font-semibold tracking-tight text-[#f4e8d2] hover:text-[#faf7f0] sm:h-[52px]"
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
/*  16. Sticky bottom action bar — mobile                            */
/* --------------------------------------------------------------- */

function StickyBar({
  property,
  fair,
}: {
  property: Property;
  fair: FairMode;
}) {
  const [heroPassed, setHeroPassed] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("trade-hero");
    const inquiry = document.getElementById("inquiry");

    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(
        ([entry]) => setHeroPassed(!entry.isIntersecting),
        { threshold: 0, rootMargin: "0px 0px -40px 0px" },
      );
      o.observe(hero);
      observers.push(o);
    }

    if (inquiry) {
      const o = new IntersectionObserver(
        ([entry]) => setFormInView(entry.isIntersecting),
        { threshold: 0.15 },
      );
      o.observe(inquiry);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const visible = heroPassed && !formInView;
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
    ? "px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-24"
    : "px-4 sm:px-8 lg:px-16";
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
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
        {eyebrow}
      </p>
      <h2 className="font-serif mt-3 text-[26px] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[36px] lg:text-[44px]">
        {title}
      </h2>
    </header>
  );
}

function SnapshotEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-8 bg-foreground/30" />
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
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
