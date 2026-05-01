import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Singleton Supabase client.
 *
 * Returns `null` when env vars are missing so callers can fall back to
 * localStorage gracefully. Build never fails just because Supabase
 * isn't configured.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const hasSupabase = supabase !== null;
