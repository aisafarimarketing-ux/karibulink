"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { CampHub } from "@/components/guest/camp-hub";
import {
  ArrowRightIcon,
  CameraIcon,
  CheckIcon,
  ChevronDownIcon,
  CompassIcon,
  InfoIcon,
  PhoneIcon,
  TentIcon,
  UserIcon,
} from "@/components/icons";
import { ICON_KEYS } from "@/lib/icon-map";
import {
  PROPERTY_TYPE_LABELS,
  presetFor,
} from "@/data/presets";
import type {
  IconItem,
  IconKey,
  Property,
  PropertySection,
  PropertyType,
  Sighting,
  Staff,
} from "@/data/types";
import { AdminSidebar } from "./admin-sidebar";

const ICON_OPTIONS = ICON_KEYS.map((k) => ({ value: k, label: k }));

export const propertyStorageKey = (slug: string) => `kl-property-${slug}`;

type View = "edit" | "preview";

type UpdateFn = <K extends keyof Property>(key: K, value: Property[K]) => void;

export function PropertyEditor({
  initialProperty,
}: {
  initialProperty: Property;
}) {
  const storageKey = propertyStorageKey(initialProperty.slug);
  const [property, setProperty] = useState<Property>(initialProperty);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<View>("edit");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setProperty(JSON.parse(stored) as Property);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(property));
    } catch {
      /* ignore */
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

  const update: UpdateFn = (key, value) => {
    setProperty((p) => ({ ...p, [key]: value }));
  };

  const updateIconList =
    (key: "amenities" | "services" | "safetyNotes") =>
    (idx: number, patch: Partial<IconItem>) => {
      setProperty((p) => ({
        ...p,
        [key]: p[key].map((it, i) => (i === idx ? { ...it, ...patch } : it)),
      }));
    };

  const addIconList =
    (key: "amenities" | "services" | "safetyNotes") =>
    (item: IconItem) => {
      setProperty((p) => ({ ...p, [key]: [...p[key], item] }));
    };

  const removeIconList =
    (key: "amenities" | "services" | "safetyNotes") =>
    (idx: number) => {
      setProperty((p) => ({
        ...p,
        [key]: p[key].filter((_, i) => i !== idx),
      }));
    };

  const setType = (type: PropertyType) => {
    setProperty((p) => ({ ...p, type }));
  };
  const loadPreset = () => {
    const t = (property.type ?? "camp") as PropertyType;
    setProperty((p) => ({ ...p, type: t, sections: presetFor(t) }));
  };
  const updateSection = (idx: number, patch: Partial<PropertySection>) => {
    setProperty((p) => ({
      ...p,
      sections: (p.sections ?? []).map((s, i) =>
        i === idx ? { ...s, ...patch } : s,
      ),
    }));
  };
  const addSection = () => {
    setProperty((p) => ({
      ...p,
      sections: [
        ...(p.sections ?? []),
        {
          id: `custom-${Date.now()}`,
          type: "custom",
          title: "New section",
          content: "Describe this section.",
          enabled: true,
        },
      ],
    }));
  };
  const removeSection = (idx: number) => {
    setProperty((p) => ({
      ...p,
      sections: (p.sections ?? []).filter((_, i) => i !== idx),
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
                Edit camp page
              </h1>
              <p className="mt-1 text-sm text-muted">
                Update copy, photos, and items. The phone preview reflects
                changes live.
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Demo mode — changes saved on this device
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

        <ViewTabs view={view} setView={setView} />

        <main className="flex-1 px-4 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
              <div className={`${view === "edit" ? "" : "hidden lg:block"}`}>
                <div className="space-y-4">
                  <CollapsibleSection
                    icon={InfoIcon}
                    title="Hero"
                    description="The first thing guests see."
                    defaultOpen
                  >
                    <div className="grid gap-3">
                      <Field
                        label="Camp name"
                        value={property.name}
                        onChange={(v) => update("name", v)}
                      />
                      <TextAreaField
                        label="Welcome message"
                        value={property.welcomeMessage}
                        onChange={(v) => update("welcomeMessage", v)}
                        rows={3}
                        hint="Shown as the main hero text."
                      />
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    icon={CameraIcon}
                    title="Photos"
                    description="The hero image. JPG or PNG, stored on this device."
                    defaultOpen
                  >
                    <ImageUpload
                      value={property.heroImageUrl ?? null}
                      onChange={(url) =>
                        update("heroImageUrl", url ?? undefined)
                      }
                    />
                  </CollapsibleSection>

                  <CollapsibleSection
                    icon={UserIcon}
                    title="Check In"
                    description="Waiver text. Registration fields are standard."
                    defaultOpen
                  >
                    <div className="grid gap-3">
                      <TextAreaField
                        label="Waiver text"
                        value={property.waiverText ?? ""}
                        onChange={(v) => update("waiverText", v)}
                        rows={5}
                        hint="Example: 'By staying with us, you agree to…'"
                      />
                      <p className="rounded-xl border border-dashed border-border bg-background p-3 text-[11px] leading-snug text-muted">
                        Guest registration fields (name, email, country,
                        optional tour operator) stay fixed in this demo.
                      </p>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    icon={TentIcon}
                    title="Your Stay"
                    description="Camp info, house rules, team."
                    defaultOpen
                  >
                    <div className="grid gap-5">
                      <TextAreaField
                        label="Section intro"
                        value={property.yourStayIntro ?? ""}
                        onChange={(v) => update("yourStayIntro", v)}
                        rows={2}
                      />
                      <SubGroup label="Amenities (camp info)">
                        <IconItemList
                          items={property.amenities}
                          onUpdate={updateIconList("amenities")}
                          onRemove={removeIconList("amenities")}
                          onAdd={() =>
                            addIconList("amenities")({
                              iconKey: "info",
                              label: "New amenity",
                              detail: "Describe it.",
                            })
                          }
                          addLabel="Add amenity"
                        />
                      </SubGroup>
                      <SubGroup label="House rules">
                        <RulesList
                          rules={property.rules}
                          setRules={(next) => update("rules", next)}
                        />
                      </SubGroup>
                      <SubGroup label="Team">
                        <StaffList
                          staff={property.staff}
                          setStaff={(next) => update("staff", next)}
                        />
                      </SubGroup>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    icon={CompassIcon}
                    title="Experiences"
                    description="Services and recent sightings."
                    defaultOpen
                  >
                    <div className="grid gap-5">
                      <TextAreaField
                        label="Section intro"
                        value={property.experiencesIntro ?? ""}
                        onChange={(v) => update("experiencesIntro", v)}
                        rows={2}
                      />
                      <SubGroup label="Services">
                        <IconItemList
                          items={property.services}
                          onUpdate={updateIconList("services")}
                          onRemove={removeIconList("services")}
                          onAdd={() =>
                            addIconList("services")({
                              iconKey: "coffee",
                              label: "New service",
                              detail: "Describe it.",
                            })
                          }
                          addLabel="Add service"
                        />
                      </SubGroup>
                      <SubGroup label="Recent sightings">
                        <SightingsList
                          sightings={property.sightings}
                          setSightings={(next) => update("sightings", next)}
                        />
                      </SubGroup>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    icon={PhoneIcon}
                    title="Help"
                    description="Safety notes and emergency contact."
                    defaultOpen
                  >
                    <div className="grid gap-5">
                      <TextAreaField
                        label="Section intro"
                        value={property.helpIntro ?? ""}
                        onChange={(v) => update("helpIntro", v)}
                        rows={2}
                      />
                      <SubGroup label="Safety notes">
                        <IconItemList
                          items={property.safetyNotes}
                          onUpdate={updateIconList("safetyNotes")}
                          onRemove={removeIconList("safetyNotes")}
                          onAdd={() =>
                            addIconList("safetyNotes")({
                              iconKey: "shield",
                              label: "New note",
                              detail: "Describe it.",
                            })
                          }
                          addLabel="Add safety note"
                        />
                      </SubGroup>
                      <SubGroup label="Emergency contact">
                        <div className="grid gap-2 sm:grid-cols-2">
                          <Field
                            label="Label"
                            value={property.emergencyContact.label}
                            onChange={(v) =>
                              update("emergencyContact", {
                                ...property.emergencyContact,
                                label: v,
                              })
                            }
                          />
                          <Field
                            label="Phone"
                            value={property.emergencyContact.phone}
                            onChange={(v) =>
                              update("emergencyContact", {
                                ...property.emergencyContact,
                                phone: v,
                              })
                            }
                          />
                        </div>
                      </SubGroup>
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection
                    icon={InfoIcon}
                    title="Property type & sections"
                    description="Pick a preset for camps, hotels, boutique stays, or BnBs. Sections are the foundation for any property type."
                  >
                    <div className="grid gap-4">
                      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                        <SelectField
                          label="Property type"
                          value={property.type ?? "camp"}
                          options={(
                            Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]
                          ).map((v) => ({
                            value: v,
                            label: PROPERTY_TYPE_LABELS[v],
                          }))}
                          onChange={(v) => setType(v as PropertyType)}
                        />
                        <button
                          type="button"
                          onClick={loadPreset}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover active:scale-[0.98]"
                        >
                          Load preset
                        </button>
                      </div>
                      <div className="grid gap-3">
                        {(property.sections ?? []).length === 0 && (
                          <p className="rounded-2xl bg-background p-4 text-sm text-muted">
                            No sections yet — choose a property type and load
                            its preset to start.
                          </p>
                        )}
                        {(property.sections ?? []).map((section, i) => (
                          <SectionRow
                            key={`${section.id}-${i}`}
                            section={section}
                            onUpdate={(patch) => updateSection(i, patch)}
                            onRemove={() => removeSection(i)}
                          />
                        ))}
                        <AddButton label="Add section" onClick={addSection} />
                      </div>
                    </div>
                  </CollapsibleSection>

                  <SaveStatus />
                </div>
              </div>

              <div className={`${view === "preview" ? "mt-4" : "hidden lg:block"}`}>
                <PreviewPane property={property} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Mobile Edit / Preview tabs                                       */
/* --------------------------------------------------------------- */

function ViewTabs({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  const tabClass = (active: boolean) =>
    `flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted hover:text-foreground"
    }`;
  return (
    <div className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[1280px] gap-1 p-2">
        <button
          type="button"
          onClick={() => setView("edit")}
          aria-pressed={view === "edit"}
          className={tabClass(view === "edit")}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setView("preview")}
          aria-pressed={view === "preview"}
          className={tabClass(view === "preview")}
        >
          Preview
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Collapsible section card (visible header, body toggles)          */
/* --------------------------------------------------------------- */

function CollapsibleSection({
  icon: Icon,
  title,
  description,
  defaultOpen = false,
  children,
}: {
  icon: typeof InfoIcon;
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={defaultOpen || undefined}
      className="group rounded-3xl bg-surface shadow-[0_2px_14px_-6px_rgba(31,58,46,0.10)] transition-shadow open:shadow-[0_8px_28px_-12px_rgba(31,58,46,0.16)]"
    >
      <summary className="flex cursor-pointer items-center gap-4 rounded-3xl p-6 outline-none transition-colors [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-primary/40">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-open:bg-primary group-open:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl font-medium leading-tight tracking-tight text-foreground sm:text-2xl">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-xs leading-snug text-muted">
              {description}
            </p>
          )}
        </div>
        <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-border/40 px-6 py-6 sm:px-7 sm:py-7">
        {children}
      </div>
    </details>
  );
}

/* --------------------------------------------------------------- */
/*  Sub-group inside a collapsible section                           */
/* --------------------------------------------------------------- */

function SubGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Save status                                                      */
/* --------------------------------------------------------------- */

function SaveStatus() {
  return (
    <div className="sticky bottom-4 z-10 rounded-3xl border border-border bg-surface/95 p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckIcon className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-medium text-foreground">Saved locally</p>
          <p className="text-[11px] text-muted">
            Demo mode — changes saved on this device
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Image upload                                                     */
/* --------------------------------------------------------------- */

function ImageUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}) {
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

  if (value) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/95 px-4 text-xs font-semibold text-foreground hover:bg-white active:scale-[0.97]">
              Replace photo
              <input
                type="file"
                accept="image/*"
                onChange={handle}
                className="sr-only"
              />
            </label>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur hover:bg-white/20 active:scale-[0.97]"
            >
              Remove photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <label className="flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-foreground">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
        <CameraIcon className="h-5 w-5" />
      </span>
      <span className="font-semibold text-foreground">Upload photo</span>
      <span className="text-[11px] text-muted">JPG or PNG · click to choose</span>
      <input
        type="file"
        accept="image/*"
        onChange={handle}
        className="sr-only"
      />
    </label>
  );
}

/* --------------------------------------------------------------- */
/*  Reusable item lists                                              */
/* --------------------------------------------------------------- */

function IconItemList({
  items,
  onUpdate,
  onAdd,
  onRemove,
  addLabel,
}: {
  items: IconItem[];
  onUpdate: (idx: number, patch: Partial<IconItem>) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
  addLabel: string;
}) {
  return (
    <div className="grid gap-3">
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-background p-3 text-xs text-muted">
          No items yet — add one below.
        </p>
      )}
      {items.map((item, i) => (
        <div
          key={i}
          className="grid gap-2 rounded-2xl bg-background p-4 sm:grid-cols-[120px_1fr_2fr_auto]"
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
      <AddButton label={addLabel} onClick={onAdd} />
    </div>
  );
}

function SightingsList({
  sightings,
  setSightings,
}: {
  sightings: Sighting[];
  setSightings: (next: Sighting[]) => void;
}) {
  const update = (i: number, patch: Partial<Sighting>) =>
    setSightings(
      sightings.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    );
  const add = () =>
    setSightings([
      ...sightings,
      { day: "Today", animal: "New sighting", area: "", spotter: "" },
    ]);
  const remove = (i: number) =>
    setSightings(sightings.filter((_, idx) => idx !== i));

  return (
    <div className="grid gap-3">
      {sightings.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-background p-3 text-xs text-muted">
          No sightings yet.
        </p>
      )}
      {sightings.map((s, i) => (
        <div
          key={i}
          className="grid gap-2 rounded-2xl bg-background p-4 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]"
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
  );
}

function StaffList({
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
  const remove = (i: number) => setStaff(staff.filter((_, idx) => idx !== i));

  return (
    <div className="grid gap-3">
      {staff.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-background p-3 text-xs text-muted">
          No team yet.
        </p>
      )}
      {staff.map((m, i) => (
        <div
          key={i}
          className="grid gap-2 rounded-2xl bg-background p-4 sm:grid-cols-[1fr_1fr_2fr_auto]"
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
  );
}

function RulesList({
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
    <div className="grid gap-3">
      {rules.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-background p-3 text-xs text-muted">
          No rules yet.
        </p>
      )}
      {rules.map((r, i) => (
        <div
          key={i}
          className="grid gap-2 rounded-2xl bg-background p-4 sm:grid-cols-[1fr_auto]"
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
  );
}

/* --------------------------------------------------------------- */
/*  Right column: live phone preview                                 */
/* --------------------------------------------------------------- */

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
        <div className="h-[640px] overflow-y-auto bg-background sm:h-[720px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <CampHub property={property} inPreview />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/*  Form primitives                                                  */
/* --------------------------------------------------------------- */

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
        <span
          className={`text-xs font-medium text-foreground ${
            compact ? "text-[11px]" : ""
          }`}
        >
          {label}
        </span>
        {hint && <span className="text-[10px] text-muted">{hint}</span>}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-xl bg-background px-3.5 text-sm text-foreground transition-colors focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
  compact?: boolean;
  hint?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-baseline justify-between gap-3">
        <span
          className={`text-xs font-medium text-foreground ${
            compact ? "text-[11px]" : ""
          }`}
        >
          {label}
        </span>
        {hint && <span className="text-[10px] text-muted">{hint}</span>}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`mt-1.5 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm leading-relaxed text-foreground transition-colors focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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
      <span
        className={`text-xs font-medium text-foreground ${
          compact ? "text-[11px]" : ""
        }`}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full cursor-pointer rounded-xl bg-background px-3.5 text-sm text-foreground transition-colors focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 ${
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
      className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10 active:scale-[0.98]"
    >
      <span aria-hidden className="text-base font-bold">
        +
      </span>
      {label}
    </button>
  );
}

function SectionRow({
  section,
  onUpdate,
  onRemove,
}: {
  section: PropertySection;
  onUpdate: (patch: Partial<PropertySection>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl bg-background p-4 sm:grid-cols-[1fr_2fr_auto_auto]">
      <Field
        label="Title"
        value={section.title}
        onChange={(v) => onUpdate({ title: v })}
        compact
      />
      <TextAreaField
        label="Content"
        value={section.content}
        onChange={(v) => onUpdate({ content: v })}
        rows={2}
        compact
      />
      <label className="flex items-center justify-center gap-2 self-end rounded-xl bg-surface px-3 py-2 text-[11px] font-medium text-muted">
        <input
          type="checkbox"
          checked={section.enabled}
          onChange={(e) => onUpdate({ enabled: e.target.checked })}
          className="h-3.5 w-3.5 accent-primary"
        />
        Enabled
      </label>
      <RemoveButton onClick={onRemove} />
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className="inline-flex h-9 items-center justify-center gap-1.5 self-end rounded-full border border-border bg-background px-3 text-[11px] font-semibold text-muted transition-colors hover:border-danger/50 hover:bg-danger/5 hover:text-danger sm:self-stretch sm:h-auto"
    >
      <span aria-hidden>✕</span>
      <span>Remove</span>
    </button>
  );
}

