import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { EditableSectionCard } from "@/components/admin/editable-section-card";
import {
  SaveButton,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/admin/form";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CompassIcon,
  InfoIcon,
  LeafIcon,
  PhoneIcon,
  ShieldIcon,
  TentIcon,
  UserIcon,
} from "@/components/icons";
import { ICON_KEYS } from "@/lib/icon-map";
import {
  DEMO_PROPERTY_SLUG,
  getProperty,
  listProperties,
} from "@/data/mock";
import type { Property } from "@/data/types";

export const metadata = { title: "Properties — KaribuLink Admin" };

const ICON_OPTIONS = ICON_KEYS.map((k) => ({ value: k, label: k }));

export default function PropertiesPage() {
  const properties = listProperties();
  const property = getProperty(DEMO_PROPERTY_SLUG);

  return (
    <AdminShell
      title="Properties"
      description="Edit what guests see on their welcome hub. Every change here will surface on the live page once persistence is wired up."
      actions={
        property && (
          <Link
            href={`/camp/${property.slug}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium hover:border-primary/40"
          >
            View live page
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )
      }
    >
      <PropertyPicker properties={properties} activeSlug={DEMO_PROPERTY_SLUG} />

      {property ? (
        <PropertyEditor property={property} />
      ) : (
        <p className="rounded-3xl border border-border bg-surface p-6 text-muted">
          Demo property not found.
        </p>
      )}
    </AdminShell>
  );
}

function PropertyPicker({
  properties,
  activeSlug,
}: {
  properties: Property[];
  activeSlug: string;
}) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {properties.map((p) => {
        const active = p.slug === activeSlug;
        return (
          <span
            key={p.id}
            aria-current={active}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-primary/50 bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground/70"
            }`}
          >
            <TentIcon className="h-4 w-4" />
            {p.name}
            {!active && (
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                read-only
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function PropertyEditor({ property }: { property: Property }) {
  return (
    <form className="grid gap-6">
      <EditableSectionCard
        icon={InfoIcon}
        title="Welcome"
        description="The first thing your guest sees when they tap the link."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Property name"
            defaultValue={property.name}
            className="sm:col-span-2"
          />
          <TextInput label="Hero title" defaultValue={property.heroTitle} />
          <TextInput
            label="Hero eyebrow"
            defaultValue={property.heroSubtitle}
          />
          <TextInput label="Location" defaultValue={property.location} />
          <TextInput
            label="Slug"
            defaultValue={property.slug}
            hint="URL: /camp/[slug]"
          />
          <TextArea
            label="Welcome message"
            defaultValue={property.welcomeMessage}
            className="sm:col-span-2"
            rows={4}
          />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={InfoIcon}
        title="Camp info / amenities"
        description="The essentials — meals, Wi-Fi, power, water, check-in."
        meta={`${property.amenities.length} items`}
      >
        <ItemList items={property.amenities} keyPrefix="amenity" />
      </EditableSectionCard>

      <EditableSectionCard
        icon={LeafIcon}
        title="House rules"
        description="A few small things, for the place and the people."
        meta={`${property.rules.length} rules`}
      >
        <div className="grid gap-3">
          {property.rules.map((rule, i) => (
            <TextArea
              key={`rule-${i}`}
              defaultValue={rule}
              rows={2}
              aria-label={`Rule ${i + 1}`}
            />
          ))}
          <DashedAddButton label="Add rule" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={CompassIcon}
        title="Services"
        description="What guests can request from their phone."
        meta={`${property.services.length} services`}
      >
        <ItemList items={property.services} keyPrefix="service" />
      </EditableSectionCard>

      <EditableSectionCard
        icon={ShieldIcon}
        title="Safety"
        description="Wildlife, weather, paths after dark — what to know to feel at ease."
        meta={`${property.safetyNotes.length} notes`}
      >
        <ItemList items={property.safetyNotes} keyPrefix="safety" />
      </EditableSectionCard>

      <EditableSectionCard
        icon={BinocularsIcon}
        title="Recent sightings"
        description="What guides have spotted in the last 48 hours."
        meta={`${property.sightings.length} sightings`}
      >
        <div className="grid gap-3">
          {property.sightings.map((s, i) => (
            <div
              key={`sighting-${i}`}
              className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-2"
            >
              <TextInput label="When" defaultValue={s.day} />
              <TextInput label="Animal" defaultValue={s.animal} />
              <TextInput label="Where" defaultValue={s.area} />
              <TextInput label="Spotted by" defaultValue={s.spotter} />
            </div>
          ))}
          <DashedAddButton label="Add sighting" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={UserIcon}
        title="Staff"
        description="The people guests will meet on arrival."
        meta={`${property.staff.length} people`}
      >
        <div className="grid gap-3">
          {property.staff.map((m, i) => (
            <div
              key={`staff-${i}`}
              className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[1fr_1fr_2fr]"
            >
              <TextInput label="Name" defaultValue={m.name} />
              <TextInput label="Role" defaultValue={m.role} />
              <TextArea label="Bio" defaultValue={m.bio} rows={2} />
            </div>
          ))}
          <DashedAddButton label="Add staff member" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={PhoneIcon}
        title="Contact / emergency"
        description="The 24-hour number on the safety card."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Label"
            defaultValue={property.emergencyContact.label}
          />
          <TextInput
            label="Phone"
            type="tel"
            defaultValue={property.emergencyContact.phone}
          />
        </div>
      </EditableSectionCard>

      <SaveButton />
    </form>
  );
}

function ItemList({
  items,
  keyPrefix,
}: {
  items: { iconKey: string; label: string; detail: string }[];
  keyPrefix: string;
}) {
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <div
          key={`${keyPrefix}-${i}`}
          className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[160px_1fr_2fr]"
        >
          <SelectInput
            label="Icon"
            options={ICON_OPTIONS}
            defaultValue={item.iconKey}
          />
          <TextInput label="Label" defaultValue={item.label} />
          <TextArea label="Detail" defaultValue={item.detail} rows={2} />
        </div>
      ))}
      <DashedAddButton label={`Add ${keyPrefix}`} />
    </div>
  );
}

function DashedAddButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-foreground"
    >
      + {label}
    </button>
  );
}
