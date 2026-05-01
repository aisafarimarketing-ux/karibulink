import { AdminShell } from "@/components/admin/admin-shell";
import {
  DataPreviewCard,
  StatCard,
} from "@/components/admin/data-preview-card";
import {
  CompassIcon,
  LeafIcon,
  RouteIcon,
  TentIcon,
} from "@/components/icons";
import {
  DEMO_OPERATOR_SLUG,
  DEMO_PROPERTY_SLUG,
  listOperators,
  listOrganizations,
  listProperties,
} from "@/data/mock";

export const metadata = { title: "Dashboard — KaribuLink Admin" };

export default function AdminDashboard() {
  const orgs = listOrganizations();
  const properties = listProperties();
  const operators = listOperators();
  const totalPages = properties.length + operators.length;

  const demoProperty = properties.find((p) => p.slug === DEMO_PROPERTY_SLUG);
  const demoOperator = operators.find((o) => o.slug === DEMO_OPERATOR_SLUG);

  return (
    <AdminShell
      title="Welcome back."
      description="A quiet control center for the people who run camps, lodges, BnBs, and tour operations. Edit what guests see — without ever shipping code."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={LeafIcon}
          label="Organizations"
          value={orgs.length}
          hint="Camps, lodges, BnBs, operators"
        />
        <StatCard
          icon={TentIcon}
          label="Properties"
          value={properties.length}
          hint="Camps · lodges · BnBs"
        />
        <StatCard
          icon={CompassIcon}
          label="Operators"
          value={operators.length}
          hint="Tour-operator journeys"
        />
        <StatCard
          icon={RouteIcon}
          label="Guest pages"
          value={totalPages}
          hint="Live across all properties"
        />
      </div>

      <h2 className="font-serif mt-12 text-2xl font-medium tracking-tight text-foreground">
        Quick edits
      </h2>
      <p className="mt-1 text-sm text-muted">
        Open the editable form for the demo content — everything below renders
        on the live guest page.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {demoProperty && (
          <DataPreviewCard
            icon={TentIcon}
            title="Edit demo camp"
            description={`${demoProperty.name} · ${demoProperty.location}`}
            meta="Property"
            href="/admin/properties"
            cta="Open editor"
          >
            <PreviewMeta
              items={[
                { label: "Amenities", value: demoProperty.amenities.length },
                { label: "Services", value: demoProperty.services.length },
                { label: "Safety notes", value: demoProperty.safetyNotes.length },
                { label: "Sightings", value: demoProperty.sightings.length },
                { label: "Staff", value: demoProperty.staff.length },
              ]}
            />
          </DataPreviewCard>
        )}
        {demoOperator && (
          <DataPreviewCard
            icon={CompassIcon}
            title="Edit demo operator"
            description={`${demoOperator.name} · ${
              demoOperator.routes[0]?.fromTo ?? "Routes"
            }`}
            meta="Operator"
            href="/admin/operators"
            cta="Open editor"
          >
            <PreviewMeta
              items={[
                { label: "Routes", value: demoOperator.routes.length },
                { label: "Guides", value: demoOperator.guides.length },
                { label: "Vehicles", value: demoOperator.vehicles.length },
                {
                  label: "Expectations",
                  value: demoOperator.journeyNotes.expectations.length,
                },
                {
                  label: "Prompts",
                  value: demoOperator.journeyNotes.prompts.length,
                },
              ]}
            />
          </DataPreviewCard>
        )}
      </div>

      <h2 className="font-serif mt-12 text-2xl font-medium tracking-tight text-foreground">
        Workspace
      </h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <DataPreviewCard
          icon={LeafIcon}
          title="Organizations"
          description="Each camp, lodge, BnB, or tour operator is owned by an organization."
          href="/admin/organizations"
          cta="View list"
          meta={`${orgs.length} total`}
        />
        <DataPreviewCard
          icon={TentIcon}
          title="Properties"
          description="The places guests stay. Welcome content, amenities, safety, staff."
          href="/admin/properties"
          cta="Edit content"
          meta={`${properties.length} total`}
        />
        <DataPreviewCard
          icon={RouteIcon}
          title="Guest pages"
          description="Every live URL — what each NFC tap or link opens for the guest."
          href="/admin/pages"
          cta="See live URLs"
          meta={`${totalPages} live`}
        />
      </div>
    </AdminShell>
  );
}

function PreviewMeta({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.label}
          className="rounded-2xl border border-border bg-background px-3 py-2"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            {item.label}
          </p>
          <p className="mt-1 font-serif text-base font-medium text-foreground">
            {item.value}
          </p>
        </li>
      ))}
    </ul>
  );
}
