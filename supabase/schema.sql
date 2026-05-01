-- KaribuLink — Supabase schema
--
-- Paste this into the Supabase SQL editor (or apply via the CLI) to
-- create the table that Fair Mode lead capture writes to.

create table if not exists public.fair_leads (
  id          uuid primary key default gen_random_uuid(),
  camp_slug   text not null,
  camp_name   text not null,
  name        text not null,
  company     text not null,
  email       text not null,
  phone       text,
  message     text,
  source      text not null default 'fair-mode',
  created_at  timestamptz not null default now()
);

create index if not exists fair_leads_camp_slug_idx on public.fair_leads (camp_slug);
create index if not exists fair_leads_created_at_idx on public.fair_leads (created_at desc);

-- Row Level Security: open enough for the demo.
--
-- The browser uses the anon key, so we explicitly allow anon to insert
-- leads and read them. Tighten this once authentication and roles
-- ship.
alter table public.fair_leads enable row level security;

drop policy if exists "fair_leads anon insert" on public.fair_leads;
create policy "fair_leads anon insert"
  on public.fair_leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "fair_leads anon read" on public.fair_leads;
create policy "fair_leads anon read"
  on public.fair_leads
  for select
  to anon, authenticated
  using (true);
