"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { StatCard } from "@/components/admin/data-preview-card";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CheckIcon,
  MessageIcon,
  PhoneIcon,
  StarIcon,
  UserIcon,
} from "@/components/icons";
import {
  clearLocalFairLeads,
  downloadLeadsCSV,
  fetchFairLeads,
  type FairLead,
  type FairLeadSource,
} from "@/lib/fair-leads";
import { listProperties } from "@/data/mock";

const SHORTLIST_KEY = "kl-shortlist";
const WA_CLICKS_KEY = "kl-wa-clicks";

export function FairLeadsBoard() {
  const [hydrated, setHydrated] = useState(false);
  const [leads, setLeads] = useState<FairLead[]>([]);
  const [source, setSource] = useState<FairLeadSource>("empty");
  const [shortlistCount, setShortlistCount] = useState(0);
  const [waClicks, setWaClicks] = useState(0);

  const reload = async () => {
    const result = await fetchFairLeads();
    setLeads(result.leads);
    setSource(result.source);

    if (typeof window !== "undefined") {
      try {
        const sl = JSON.parse(
          window.localStorage.getItem(SHORTLIST_KEY) ?? "[]",
        );
        setShortlistCount(Array.isArray(sl) ? sl.length : 0);
      } catch {
        /* ignore */
      }
      try {
        const raw = window.localStorage.getItem(WA_CLICKS_KEY) ?? "0";
        const n = parseInt(raw, 10);
        setWaClicks(Number.isFinite(n) ? n : 0);
      } catch {
        /* ignore */
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await reload();
      if (!cancelled) setHydrated(true);
    })();

    const onStorage = (e: StorageEvent) => {
      if (
        e.key === null ||
        e.key.startsWith("kl-fair-leads-") ||
        e.key === SHORTLIST_KEY ||
        e.key === WA_CLICKS_KEY
      ) {
        void reload();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      cancelled = true;
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }, []);

  const leadsToday = useMemo(() => {
    if (!hydrated) return 0;
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    return leads.filter((l) => {
      if (!l.createdAt) return false;
      const dt = new Date(l.createdAt);
      return (
        dt.getFullYear() === y &&
        dt.getMonth() === m &&
        dt.getDate() === d
      );
    }).length;
  }, [hydrated, leads]);

  const clearLocal = () => {
    if (typeof window === "undefined") return;
    if (
      !window.confirm(
        "Clear local lead copies, the shortlist, and WhatsApp tap count on this device?\n\nCloud rows in Supabase are not affected.",
      )
    ) {
      return;
    }
    clearLocalFairLeads();
    try {
      window.localStorage.removeItem(SHORTLIST_KEY);
      window.localStorage.removeItem(WA_CLICKS_KEY);
    } catch {
      /* ignore */
    }
    void reload();
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    downloadLeadsCSV(leads);
  };

  const sampleSlug = listProperties()[0]?.slug;

  return (
    <AdminShell
      title="Fair Leads"
      description="Tour-operator interest collected from your Fair Mode pages — ready to act on."
      actions={
        sampleSlug && (
          <Link
            href={`/camp/${sampleSlug}?mode=fair`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium hover:border-primary/40"
          >
            Open Fair Mode
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )
      }
    >
      <SourceBanner source={source} hydrated={hydrated} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={UserIcon}
          label="Total leads"
          value={hydrated ? leads.length : 0}
          hint={source === "cloud" ? "Cloud (Supabase)" : "This device"}
        />
        <StatCard
          icon={BinocularsIcon}
          label="Today"
          value={hydrated ? leadsToday : 0}
          hint="New since midnight"
        />
        <StatCard
          icon={StarIcon}
          label="Shortlists"
          value={hydrated ? shortlistCount : 0}
          hint="Camps saved by visitors"
        />
        <StatCard
          icon={MessageIcon}
          label="WhatsApp taps"
          value={hydrated ? waClicks : 0}
          hint="Clicks on the green pill"
        />
      </div>

      <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-[34px]">
          {leads.length === 0
            ? "Recent activity"
            : `${leads.length} ${leads.length === 1 ? "lead" : "leads"}`}
        </h2>
        <div className="flex flex-wrap gap-2">
          {hydrated && leads.length > 0 && (
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover active:scale-[0.98]"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 -rotate-90" />
              Download CSV
            </button>
          )}
          {hydrated && leads.length > 0 && (
            <button
              type="button"
              onClick={clearLocal}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-3 text-xs font-medium text-muted hover:border-danger/40 hover:text-danger"
            >
              Clear local data
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        {!hydrated ? (
          <p className="rounded-3xl border border-border bg-surface p-8 text-center text-sm text-muted">
            Loading…
          </p>
        ) : leads.length === 0 ? (
          <EmptyState sampleSlug={sampleSlug} />
        ) : (
          <ul className="grid gap-3">
            {leads.map((lead, i) => (
              <li key={lead.id ?? `${lead.createdAt}-${lead.email}-${i}`}>
                <LeadCard lead={lead} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}

/* --------------------------------------------------------------- */

function SourceBanner({
  source,
  hydrated,
}: {
  source: FairLeadSource;
  hydrated: boolean;
}) {
  if (!hydrated) return null;
  if (source === "cloud") {
    return (
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Live · Supabase
      </div>
    );
  }
  if (source === "local") {
    return (
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Local fallback · this device
      </div>
    );
  }
  return null;
}

function LeadCard({ lead }: { lead: FairLead }) {
  const phoneClean = lead.phone.replace(/[^0-9+]/g, "");
  const wa = phoneClean.replace(/^\+/, "");
  const messageBody = [
    `New Fair Lead — ${lead.campName}`,
    `Name: ${lead.name}`,
    `Company: ${lead.company}`,
    `Email: ${lead.email}`,
    lead.message ? `Message: ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(messageBody)}`
    : null;

  return (
    <article className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
      <header className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <p className="font-serif text-lg font-medium leading-tight tracking-tight text-foreground sm:text-xl">
            {lead.name || "—"}
          </p>
          {lead.company && (
            <p className="text-sm text-muted">{lead.company}</p>
          )}
        </div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted">
          <p>{lead.campName || lead.campSlug}</p>
          <p className="mt-0.5 text-muted/80">
            {formatTimestamp(lead.createdAt)}
          </p>
        </div>
      </header>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <DetailRow label="Email" value={lead.email} />
        <DetailRow label="Phone" value={lead.phone} />
      </dl>

      {lead.message && (
        <div className="mt-4 rounded-2xl border border-border bg-background p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            Message
          </p>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            {lead.message}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 text-sm font-semibold text-white shadow-[0_8px_22px_-12px_rgba(37,211,102,0.6)] transition-colors hover:bg-[#1ebe5a] active:scale-[0.98]"
          >
            <MessageIcon className="h-4 w-4" />
            WhatsApp
          </a>
        ) : (
          <span
            aria-disabled
            className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium text-muted"
          >
            <MessageIcon className="h-4 w-4" />
            No phone
          </span>
        )}
        <CopyButton value={lead.email} label="Copy email" />
        <CopyButton
          value={phoneClean || lead.phone}
          label="Copy phone"
          disabled={!lead.phone}
        />
      </div>
    </article>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      <p className="mt-0.5 break-all text-sm text-foreground/90">
        {value || <span className="text-muted">—</span>}
      </p>
    </div>
  );
}

function CopyButton({
  value,
  label,
  disabled = false,
}: {
  value?: string;
  label: string;
  disabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    if (!value || disabled) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };
  const isDisabled = disabled || !value;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors ${
        isDisabled
          ? "border-border bg-background text-muted/60 cursor-not-allowed"
          : copied
            ? "border-primary/50 bg-primary/10 text-primary"
            : "border-border bg-background text-foreground hover:border-primary/40"
      }`}
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5" />
          Copied
        </>
      ) : (
        label
      )}
    </button>
  );
}

function EmptyState({ sampleSlug }: { sampleSlug?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface px-6 py-12 text-center sm:py-16">
      <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-primary/10 text-primary">
        <PhoneIcon className="h-5 w-5" />
      </span>
      <h3 className="font-serif mt-4 text-2xl font-medium tracking-tight text-foreground">
        No fair leads yet.
      </h3>
      <p className="mt-2 max-w-sm mx-auto text-sm leading-relaxed text-muted">
        Share your Fair Mode link to start collecting interest.
      </p>
      {sampleSlug && (
        <Link
          href={`/camp/${sampleSlug}?mode=fair`}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
        >
          Preview the fair page
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function formatTimestamp(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
