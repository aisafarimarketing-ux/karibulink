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
  MessageIcon,
  PhoneIcon,
  RouteIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { ICON_KEYS } from "@/lib/icon-map";
import {
  DEMO_OPERATOR_SLUG,
  getOperator,
  listOperators,
} from "@/data/mock";
import type { Operator, SafariRoute } from "@/data/types";

export const metadata = { title: "Operators — KaribuLink Admin" };

const ICON_OPTIONS = ICON_KEYS.map((k) => ({ value: k, label: k }));

export default function OperatorsPage() {
  const operators = listOperators();
  const operator = getOperator(DEMO_OPERATOR_SLUG);

  return (
    <AdminShell
      title="Operators"
      description="The journeys you run. Edit routes, guides, vehicles, and the welcome content guests see each day."
      actions={
        operator && (
          <Link
            href={`/operator/${operator.slug}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium hover:border-primary/40"
          >
            View live page
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )
      }
    >
      <OperatorPicker operators={operators} activeSlug={DEMO_OPERATOR_SLUG} />

      {operator ? (
        <OperatorEditor operator={operator} />
      ) : (
        <p className="rounded-3xl border border-border bg-surface p-6 text-muted">
          Demo operator not found.
        </p>
      )}
    </AdminShell>
  );
}

function OperatorPicker({
  operators,
  activeSlug,
}: {
  operators: Operator[];
  activeSlug: string;
}) {
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {operators.map((o) => {
        const active = o.slug === activeSlug;
        return (
          <span
            key={o.id}
            aria-current={active}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
              active
                ? "border-primary/50 bg-primary text-primary-foreground"
                : "border-border bg-surface text-foreground/70"
            }`}
          >
            <CompassIcon className="h-4 w-4" />
            {o.name}
          </span>
        );
      })}
    </div>
  );
}

function OperatorEditor({ operator }: { operator: Operator }) {
  return (
    <form className="grid gap-6">
      <EditableSectionCard
        icon={InfoIcon}
        title="Journey welcome"
        description="The hero copy at the top of the live operator hub."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Operator name"
            defaultValue={operator.name}
            className="sm:col-span-2"
          />
          <TextInput
            label="Slug"
            defaultValue={operator.slug}
            hint="URL: /operator/[slug]"
          />
          <TextInput
            label="Hero eyebrow"
            defaultValue={operator.journeyNotes.heroEyebrow}
          />
          <TextInput
            label="Hero title"
            defaultValue={operator.journeyNotes.heroTitle}
            className="sm:col-span-2"
          />
          <TextArea
            label="Hero subtitle"
            defaultValue={operator.journeyNotes.heroSubtitle}
            className="sm:col-span-2"
            rows={3}
          />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={RouteIcon}
        title="Route"
        description="The day-by-day plan. Today shows the active route below."
        meta={`${operator.routes.length} route${operator.routes.length === 1 ? "" : "s"}`}
      >
        <div className="grid gap-6">
          {operator.routes.map((route) => (
            <RouteEditor key={route.id} route={route} />
          ))}
          <DashedAddButton label="Add another day" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={UserIcon}
        title="Guides"
        description="The guides leading the journey — name, role, contact."
        meta={`${operator.guides.length} guide${operator.guides.length === 1 ? "" : "s"}`}
      >
        <div className="grid gap-3">
          {operator.guides.map((g, i) => (
            <div
              key={`guide-${i}`}
              className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[120px_1fr_1fr]"
            >
              <TextInput label="Initials" defaultValue={g.initials} />
              <TextInput label="Name" defaultValue={g.name} />
              <TextInput label="Role" defaultValue={g.role} />
              <TextArea
                label="Bio"
                defaultValue={g.bio}
                rows={2}
                className="sm:col-span-2"
              />
              <TextInput label="Phone" type="tel" defaultValue={g.phone} />
            </div>
          ))}
          <DashedAddButton label="Add guide" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={CompassIcon}
        title="Vehicles"
        description="What guests will be riding in. Type, plate, capacity."
        meta={`${operator.vehicles.length} vehicle${operator.vehicles.length === 1 ? "" : "s"}`}
      >
        <div className="grid gap-3">
          {operator.vehicles.map((v, i) => (
            <div
              key={`vehicle-${i}`}
              className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[2fr_1fr_1fr]"
            >
              <TextInput label="Type" defaultValue={v.type} />
              <TextInput label="Registration" defaultValue={v.registration} />
              <TextInput
                label="Capacity"
                type="number"
                defaultValue={v.capacity}
              />
            </div>
          ))}
          <DashedAddButton label="Add vehicle" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={BinocularsIcon}
        title="What to expect"
        description="Landscape, culture, wildlife — the framing copy guests read on the way."
        meta={`${operator.journeyNotes.expectations.length} items`}
      >
        <div className="grid gap-3">
          {operator.journeyNotes.expectations.map((item, i) => (
            <div
              key={`expect-${i}`}
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
          <DashedAddButton label="Add expectation" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={MessageIcon}
        title="Guide prompts"
        description="Conversation starters. Shown to guests on the journey hub."
        meta={`${operator.journeyNotes.prompts.length} prompts`}
      >
        <div className="grid gap-3">
          {operator.journeyNotes.prompts.map((p, i) => (
            <TextArea
              key={`prompt-${i}`}
              defaultValue={p}
              rows={2}
              aria-label={`Prompt ${i + 1}`}
            />
          ))}
          <DashedAddButton label="Add prompt" />
        </div>
      </EditableSectionCard>

      <EditableSectionCard
        icon={ShieldIcon}
        title="Emergency contact"
        description="The 24-hour operations line shown on the emergency card."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Label"
            defaultValue={operator.emergencyContact.label}
          />
          <TextInput
            label="Phone"
            type="tel"
            defaultValue={operator.emergencyContact.phone}
          />
        </div>
      </EditableSectionCard>

      <SaveButton />
    </form>
  );
}

function RouteEditor({ route }: { route: SafariRoute }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="grid gap-3 sm:grid-cols-[100px_1fr_1fr]">
        <TextInput label="Day" type="number" defaultValue={route.day} />
        <TextInput label="Name" defaultValue={route.name} />
        <TextInput label="From → To" defaultValue={route.fromTo} />
      </div>
      <div className="mt-4 grid gap-3">
        <p className="text-sm font-medium text-foreground">
          Stops · {route.stops.length}
        </p>
        {route.stops.map((s, i) => (
          <div
            key={`stop-${i}`}
            className="grid gap-3 rounded-xl border border-border bg-surface p-3 sm:grid-cols-[100px_1fr_2fr]"
          >
            <TextInput label="Time" defaultValue={s.time} />
            <TextInput label="Title" defaultValue={s.title} />
            <TextArea label="Detail" defaultValue={s.detail} rows={2} />
          </div>
        ))}
        <DashedAddButton label="Add stop" />
      </div>
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
