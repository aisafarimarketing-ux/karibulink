import { supabase } from "./supabase";

const LOCAL_PREFIX = "kl-fair-leads-";

/**
 * Public lead shape used by the dashboard.
 *
 * `id` and `createdAt` may be empty for local-only entries that haven't
 * synced to Supabase. Otherwise they map to the `fair_leads` row.
 */
export interface FairLead {
  id?: string;
  campSlug: string;
  campName: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  createdAt: string;
}

interface FairLeadRow {
  id: string;
  camp_slug: string;
  camp_name: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  created_at: string;
}

interface FairLeadInsert {
  camp_slug: string;
  camp_name: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  source: string;
}

const localKey = (slug: string) => `${LOCAL_PREFIX}${slug}`;

function rowToLead(row: FairLeadRow): FairLead {
  return {
    id: row.id,
    campSlug: row.camp_slug,
    campName: row.camp_name,
    name: row.name ?? "",
    company: row.company ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    message: row.message ?? "",
    source: row.source ?? "",
    createdAt: row.created_at,
  };
}

/**
 * Persist a lead. Always writes to localStorage as a fallback,
 * additionally writes to Supabase when configured. Never throws.
 */
export async function saveFairLead(input: {
  campSlug: string;
  campName: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
}): Promise<{ cloud: boolean }> {
  const lead: FairLead = {
    campSlug: input.campSlug,
    campName: input.campName,
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone,
    message: input.message,
    source: input.source ?? "fair-mode",
    createdAt: new Date().toISOString(),
  };

  // Always write to localStorage first so a network failure doesn't lose the lead.
  if (typeof window !== "undefined") {
    try {
      const key = localKey(lead.campSlug);
      const raw = window.localStorage.getItem(key);
      const list: FairLead[] = raw ? (JSON.parse(raw) as FairLead[]) : [];
      const safe = Array.isArray(list) ? list : [];
      window.localStorage.setItem(
        key,
        JSON.stringify([...safe, lead]),
      );
    } catch {
      /* ignore */
    }
  }

  if (!supabase) return { cloud: false };

  try {
    const payload: FairLeadInsert = {
      camp_slug: lead.campSlug,
      camp_name: lead.campName,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: lead.source,
    };
    const { error } = await supabase.from("fair_leads").insert([payload]);
    if (error) return { cloud: false };
    return { cloud: true };
  } catch {
    return { cloud: false };
  }
}

export type FairLeadSource = "cloud" | "local" | "empty";

/**
 * Read all leads. Tries Supabase first, falls back to localStorage on
 * error or missing env. The returned `source` indicates which one
 * supplied the data.
 */
export async function fetchFairLeads(): Promise<{
  leads: FairLead[];
  source: FairLeadSource;
}> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("fair_leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && Array.isArray(data)) {
        return {
          leads: (data as FairLeadRow[]).map(rowToLead),
          source: data.length > 0 ? "cloud" : "empty",
        };
      }
    } catch {
      /* fall through to local */
    }
  }

  if (typeof window === "undefined") {
    return { leads: [], source: "empty" };
  }

  const collected: FairLead[] = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(LOCAL_PREFIX)) continue;
      try {
        const raw = window.localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) continue;
        for (const item of parsed) {
          if (item && typeof item === "object") {
            collected.push(localToLead(item));
          }
        }
      } catch {
        /* skip bad key */
      }
    }
  } catch {
    /* ignore */
  }
  collected.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  return {
    leads: collected,
    source: collected.length > 0 ? "local" : "empty",
  };
}

/**
 * Wipe local copies. Cloud rows are not touched.
 */
export function clearLocalFairLeads(): void {
  if (typeof window === "undefined") return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(LOCAL_PREFIX)) keys.push(key);
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
}

interface LocalLeadShape {
  property?: string;
  campSlug?: string;
  campName?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  createdAt?: string;
  timestamp?: string;
}

/** Parse a localStorage row that may use older field names. */
function localToLead(raw: unknown): FairLead {
  const r = (raw && typeof raw === "object" ? raw : {}) as LocalLeadShape;
  return {
    campSlug: r.campSlug ?? r.property ?? "",
    campName: r.campName ?? "",
    name: r.name ?? "",
    company: r.company ?? "",
    email: r.email ?? "",
    phone: r.phone ?? "",
    message: r.message ?? "",
    source: r.source ?? "fair-mode",
    createdAt: r.createdAt ?? r.timestamp ?? "",
  };
}

/* --------------------------------------------------------------- */
/*  CSV export                                                      */
/* --------------------------------------------------------------- */

const CSV_HEADERS = [
  "Company",
  "Name",
  "Email",
  "Phone",
  "Message",
  "Camp",
  "Date",
] as const;

export function leadsToCSV(leads: FairLead[]): string {
  const rows: string[][] = [
    [...CSV_HEADERS],
    ...leads.map((l) => [
      l.company,
      l.name,
      l.email,
      cleanPhone(l.phone),
      l.message,
      l.campName,
      formatCSVDate(l.createdAt),
    ]),
  ];
  return rows.map((row) => row.map(escapeCSV).join(",")).join("\r\n");
}

export function downloadLeadsCSV(leads: FairLead[]): void {
  if (typeof window === "undefined") return;
  const csv = leadsToCSV(leads);
  // BOM helps Excel open UTF-8 correctly.
  const blob = new Blob(["﻿" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fair-leads-${todayStamp()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function cleanPhone(value: string): string {
  if (!value) return "";
  return value.replace(/[^0-9+]/g, "");
}

function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (
    str.includes(",") ||
    str.includes('"') ||
    str.includes("\n") ||
    str.includes("\r")
  ) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatCSVDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString();
}

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}
