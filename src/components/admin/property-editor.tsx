"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { CampHub } from "@/components/guest/camp-hub";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CoffeeIcon,
  InfoIcon,
  LeafIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { ICON_KEYS } from "@/lib/icon-map";
import type {
  IconItem,
  IconKey,
  Property,
  Sighting,
  Staff,
} from "@/data/types";
import { AdminSidebar } from "./admin-sidebar";

const ICON_OPTIONS = ICON_KEYS.map((k) => ({ value: k, label: k }));

export const propertyStorageKey = (slug: string) => `kl-property-${slug}`;

export function PropertyEditor({
  initialProperty,
}: {
  initialProperty: Property;
}) {
  const storageKey = propertyStorageKey(initialProperty.slug);
  const [property, setProperty] = useState<Property>(initialProperty);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only — avoid hydration mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setProperty(JSON.parse(stored) as Property);
      }
    } catch {
      /* ignore parse / storage errors */
    }
    setHydrated(true);
  }, [storageKey]);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(property));
    } catch {
      /* localStorage quota or disabled */
    }
  }, [hydrated, property, storageKey]);

  const resetToDefaults = () => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setProperty(initialProperty);
  };

  const update = <K extends keyof Property>(key: K, value: Property[K]) => {
    setProperty((p) => ({ ...p, [key]: value }));
  };

  const updateItem =
    (key: "amenities" | "services" | "safetyNotes") =>
    (idx: number, patch: Partial<IconItem>) => {
      setProperty((p) => ({
        ...p,
        [key]: p[key].map((it, i) => (i === idx ? { ...it, ...patch } : it)),
      }));
    };

  const addItem =
    (key: "amenities" | "services" | "safetyNotes") =>
    (item: IconItem) => {
      setProperty((p) => ({ ...p, [key]: [...p[key], item] }));
    };

  const removeItem =
    (key: "amenities" | "services" | "safetyNotes") =>
    (idx: number) => {
      setProperty((p) => ({
        ...p,
        [key]: p[key].filter((_, i) => i !== idx),
      }));
    };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <AdminSidebar />
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 px-5 py-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:px-10">
            <div>
              <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Edit camp
              </h1>
              <p className="mt-1 text-sm text-muted">
                Upload a hero photo, change copy, add or remove items. The
                preview updates live.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Changes are saved locally on this device (demo mode)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetToDefaults}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-muted hover:border-danger/40 hover:text-foreground"
              >
                Reset to defaults
              </button>
              <Link
                href={`/camp/${property.slug}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium hover:border-primary/40"
              >
                View live page
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-4">
                <HeroEditor
                  property={property}
                  update={update}
                />

                <IntrosEditor property={property} update={update} />

                <ListEditor
                  title="Amenities (Camp info)"
                  description="Meals, Wi-Fi, power, water, check-in."
                  icon={InfoIcon}
                  items={property.amenities}
                  onUpdate={updateItem("amenities")}
                  onAdd={() =>
                    addItem("amenities")({
                      iconKey: "info",
                      label: "New amenity",
                      detail: "Describe it.",
                    })
                  }
                  onRemove={removeItem("amenities")}
                />

                <ListEditor
                  title="Services"
                  description="What guests can request."
                  icon={CoffeeIcon}
                  items={property.services}
                  onUpdate={updateItem("services")}
                  onAdd={() =>
                    addItem("services")({
                      iconKey: "coffee",
                      label: "New service",
                      detail: "Describe it.",
                    })
                  }
                  onRemove={removeItem("services")}
                />

                <ListEditor
                  title="Safety"
                  description="Wildlife, paths after dark, emergency notes."
                  icon={ShieldIcon}
                  items={property.safetyNotes}
                  onUpdate={updateItem("safetyNotes")}
                  onAdd={() =>
                    addItem("safetyNotes")({
                      iconKey: "shield",
                      label: "New note",
                      detail: "Describe it.",
                    })
                  }
                  onRemove={removeItem("safetyNotes")}
                />

                <SightingsEditor
                  sightings={property.sightings}
                  setSightings={(next) => update("sightings", next)}
                />

                <StaffEditor
                  staff={property.staff}
                  setStaff={(next) => update("staff", next)}
                />

                <RulesEditor
                  rules={property.rules}
                  setRules={(next) => update("rules", next)}
                />

                <EmergencyEditor
                  property={property}
                  update={update}
                />

                <SaveBar />
              </div>

              <PreviewPane property={property} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Hero (image + main fields)                                */
/* ------------------------------------------------------------------ */

function IntrosEditor({
  property,
  update,
}: {
  property: Property;
  update: <K extends keyof Property>(key: K, value: Property[K]) => void;
}) {
  return (
    <SectionCard
      title="Section copy"
      description="The short intro shown at the top of each guest section, plus your waiver text."
      icon={InfoIcon}
    >
      <div className="grid gap-3">
        <TextAreaField
          label="Your Stay intro"
          value={property.yourStayIntro ?? ""}
          onChange={(v) => update("yourStayIntro", v)}
          rows={2}
        />
        <TextAreaField
          label="Experiences intro"
          value={property.experiencesIntro ?? ""}
          onChange={(v) => update("experiencesIntro", v)}
          rows={2}
        />
        <TextAreaField
          label="Help intro"
          value={property.helpIntro ?? ""}
          onChange={(v) => update("helpIntro", v)}
          rows={2}
        />
        <TextAreaField
          label="Waiver text (Check In)"
          value={property.waiverText ?? ""}
          onChange={(v) => update("waiverText", v)}
          rows={4}
        />
      </div>
    </SectionCard>
  );
}

function HeroEditor({
  property,
  update,
}: {
  property: Property;
  update: <K extends keyof Property>(key: K, value: Property[K]) => void;
}) {
  return (
    <SectionCard
      title="Hero"
      description="The first thing guests see."
    >
      <ImageUpload
        value={property.heroImageUrl ?? null}
        onChange={(url) => update("heroImageUrl", url ?? undefined)}
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field
          label="Camp name"
          value={property.name}
          onChange={(v) => update("name", v)}
          className="sm:col-span-2"
        />
        <Field
          label="Hero title"
          value={property.heroTitle}
          onChange={(v) => update("heroTitle", v)}
        />
        <Field
          label="Hero eyebrow"
          value={property.heroSubtitle}
          onChange={(v) => update("heroSubtitle", v)}
        />
        <Field
          label="Location"
          value={property.location}
          onChange={(v) => update("location", v)}
        />
        <Field
          label="Slug"
          value={property.slug}
          onChange={(v) => update("slug", v)}
          hint="URL: /camp/[slug]"
        />
        <TextAreaField
          label="Welcome message"
          value={property.welcomeMessage}
          onChange={(v) => update("welcomeMessage", v)}
          className="sm:col-span-2"
          rows={3}
        />
      </div>
    </SectionCard>
  );
}

function ImageUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result;
      if (typeof url === "string") onChange(url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        Hero photo
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handle}
        className="hidden"
      />
      {value ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-white/95 px-4 text-xs font-semibold text-foreground hover:bg-white"
              >
                Replace photo
              </button>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Remove photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background text-sm font-medium text-muted hover:border-primary/40 hover:text-foreground"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
            <ArrowRightIcon className="h-4 w-4 -rotate-90" />
          </span>
          Upload photo
          <span className="text-[11px] text-muted">JPG or PNG · stored locally</span>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: List editor (amenities / services / safety)               */
/* ------------------------------------------------------------------ */

function ListEditor({
  title,
  description,
  icon: Icon,
  items,
  onUpdate,
  onAdd,
  onRemove,
}: {
  title: string;
  description: string;
  icon: typeof InfoIcon;
  items: IconItem[];
  onUpdate: (idx: number, patch: Partial<IconItem>) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <SectionCard title={title} description={description} icon={Icon}>
      <div className="grid gap-3">
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-background p-4 text-sm text-muted">
            No items yet. Add one below.
          </p>
        )}
        {items.map((item, i) => (
          <div
            key={i}
            className="grid gap-2 rounded-2xl border border-border bg-background p-3 sm:grid-cols-[120px_1fr_2fr_auto]"
          >
            <SelectField
              label="Icon"
              value={item.iconKey}
              options={ICON_OPTIONS}
              onChange={(v) => onUpdate(i, { iconKey: v as IconKey })}
              compact
            />
            <Field
              label="Label"
              value={item.label}
              onChange={(v) => onUpdate(i, { label: v })}
              compact
            />
            <TextAreaField
              label="Detail"
              value={item.detail}
              onChange={(v) => onUpdate(i, { detail: v })}
              rows={2}
              compact
            />
            <RemoveButton onClick={() => onRemove(i)} />
          </div>
        ))}
        <AddButton label={`Add to ${title.toLowerCase()}`} onClick={onAdd} />
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Sightings                                                 */
/* ------------------------------------------------------------------ */

function SightingsEditor({
  sightings,
  setSightings,
}: {
  sightings: Sighting[];
  setSightings: (next: Sighting[]) => void;
}) {
  const update = (i: number, patch: Partial<Sighting>) =>
    setSightings(sightings.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const add = () =>
    setSightings([
      ...sightings,
      { day: "Today", animal: "New sighting", area: "", spotter: "" },
    ]);
  const remove = (i: number) =>
    setSightings(sightings.filter((_, idx) => idx !== i));

  return (
    <SectionCard
      title="Sightings"
      description="What guides spotted in the last 48 hours."
      icon={BinocularsIcon}
    >
      <div className="grid gap-3">
        {sightings.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-background p-4 text-sm text-muted">
            No sightings yet.
          </p>
        )}
        {sightings.map((s, i) => (
          <div
            key={i}
            className="grid gap-2 rounded-2xl border border-border bg-background p-3 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]"
          >
            <Field
              label="When"
              value={s.day}
              onChange={(v) => update(i, { day: v })}
              compact
            />
            <Field
              label="Animal"
              value={s.animal}
              onChange={(v) => update(i, { animal: v })}
              compact
            />
            <Field
              label="Where"
              value={s.area}
              onChange={(v) => update(i, { area: v })}
              compact
            />
            <Field
              label="Spotted by"
              value={s.spotter}
              onChange={(v) => update(i, { spotter: v })}
              compact
            />
            <RemoveButton onClick={() => remove(i)} />
          </div>
        ))}
        <AddButton label="Add sighting" onClick={add} />
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Staff                                                     */
/* ------------------------------------------------------------------ */

function StaffEditor({
  staff,
  setStaff,
}: {
  staff: Staff[];
  setStaff: (next: Staff[]) => void;
}) {
  const update = (i: number, patch: Partial<Staff>) =>
    setStaff(staff.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  const add = () =>
    setStaff([
      ...staff,
      { name: "New person", role: "Role", bio: "Short bio." },
    ]);
  const remove = (i: number) =>
    setStaff(staff.filter((_, idx) => idx !== i));

  return (
    <SectionCard title="Team" description="Who guests will meet on arrival." icon={UserIcon}>
      <div className="grid gap-3">
        {staff.map((m, i) => (
          <div
            key={i}
            className="grid gap-2 rounded-2xl border border-border bg-background p-3 sm:grid-cols-[1fr_1fr_2fr_auto]"
          >
            <Field
              label="Name"
              value={m.name}
              onChange={(v) => update(i, { name: v })}
              compact
            />
            <Field
              label="Role"
              value={m.role}
              onChange={(v) => update(i, { role: v })}
              compact
            />
            <TextAreaField
              label="Bio"
              value={m.bio}
              onChange={(v) => update(i, { bio: v })}
              rows={2}
              compact
            />
            <RemoveButton onClick={() => remove(i)} />
          </div>
        ))}
        <AddButton label="Add person" onClick={add} />
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Rules                                                     */
/* ------------------------------------------------------------------ */

function RulesEditor({
  rules,
  setRules,
}: {
  rules: string[];
  setRules: (next: string[]) => void;
}) {
  const update = (i: number, value: string) =>
    setRules(rules.map((r, idx) => (idx === i ? value : r)));
  const add = () => setRules([...rules, "New rule"]);
  const remove = (i: number) => setRules(rules.filter((_, idx) => idx !== i));

  return (
    <SectionCard title="House rules" description="A few small things." icon={LeafIcon}>
      <div className="grid gap-3">
        {rules.map((r, i) => (
          <div
            key={i}
            className="grid gap-2 rounded-2xl border border-border bg-background p-3 sm:grid-cols-[1fr_auto]"
          >
            <TextAreaField
              label={`Rule ${i + 1}`}
              value={r}
              onChange={(v) => update(i, v)}
              rows={2}
              compact
            />
            <RemoveButton onClick={() => remove(i)} />
          </div>
        ))}
        <AddButton label="Add rule" onClick={add} />
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Section: Emergency contact                                         */
/* ------------------------------------------------------------------ */

function EmergencyEditor({
  property,
  update,
}: {
  property: Property;
  update: <K extends keyof Property>(key: K, value: Property[K]) => void;
}) {
  return (
    <SectionCard
      title="Emergency contact"
      description="The 24-hour line shown on the safety card."
      icon={PhoneIcon}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Label"
          value={property.emergencyContact.label}
          onChange={(v) =>
            update("emergencyContact", { ...property.emergencyContact, label: v })
          }
        />
        <Field
          label="Phone"
          value={property.emergencyContact.phone}
          onChange={(v) =>
            update("emergencyContact", { ...property.emergencyContact, phone: v })
          }
        />
      </div>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  Save bar                                                            */
/* ------------------------------------------------------------------ */

function SaveBar() {
  return (
    <div className="sticky bottom-4 z-10 flex flex-col items-stretch gap-3 rounded-3xl border border-border bg-surface/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted">
        Edits auto-save to this device. Real cloud sync coming next.
      </p>
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover active:scale-[0.98]"
      >
        Save changes
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Right column: live phone preview                                    */
/* ------------------------------------------------------------------ */

function PreviewPane({ property }: { property: Property }) {
  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Live preview
        </p>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          updates instantly
        </span>
      </div>
      <div className="overflow-hidden rounded-[2.5rem] border border-border bg-background shadow-[0_30px_80px_-30px_rgba(31,58,46,0.45)]">
        <div className="h-[720px] overflow-y-auto bg-background">
          <CampHub property={property} inPreview />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Building blocks                                                     */
/* ------------------------------------------------------------------ */

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: typeof InfoIcon;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
      <header className="flex items-start gap-3 border-b border-border/60 pb-4">
        {Icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div>
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground sm:text-xl">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-muted leading-snug">
              {description}
            </p>
          )}
        </div>
      </header>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
  className = "",
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-baseline justify-between gap-3">
        <span className={`text-xs font-medium text-foreground ${compact ? "text-[11px]" : ""}`}>
          {label}
        </span>
        {hint && <span className="text-[10px] text-muted">{hint}</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 ${
          compact ? "h-9 text-xs" : "h-11"
        }`}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  className = "",
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
  compact?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={`text-xs font-medium text-foreground ${compact ? "text-[11px]" : ""}`}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 ${
          compact ? "text-xs" : ""
        }`}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  compact = false,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  compact?: boolean;
}) {
  return (
    <label className="block">
      <span className={`text-xs font-medium text-foreground ${compact ? "text-[11px]" : ""}`}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full cursor-pointer rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 ${
          compact ? "h-9 text-xs" : "h-11"
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-foreground"
    >
      + {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className="self-end rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-medium text-muted hover:border-danger/50 hover:text-danger sm:self-stretch"
    >
      ✕ Remove
    </button>
  );
}
