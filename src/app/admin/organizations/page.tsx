import { AdminShell } from "@/components/admin/admin-shell";
import { EditableSectionCard } from "@/components/admin/editable-section-card";
import {
  SelectInput,
  TextInput,
} from "@/components/admin/form";
import { LeafIcon } from "@/components/icons";
import { listOrganizations, listProperties } from "@/data/mock";
import type { OrganizationType } from "@/data/types";

export const metadata = { title: "Organizations — KaribuLink Admin" };

const TYPE_LABEL: Record<OrganizationType, string> = {
  camp: "Camp",
  lodge: "Lodge",
  bnb: "BnB",
  tour_operator: "Tour operator",
};

const TYPE_OPTIONS = (Object.keys(TYPE_LABEL) as OrganizationType[]).map(
  (t) => ({ value: t, label: TYPE_LABEL[t] }),
);

export default function OrganizationsPage() {
  const orgs = listOrganizations();
  const properties = listProperties();
  const propertyCount = (orgId: string) =>
    properties.filter((p) => p.organizationId === orgId).length;

  return (
    <AdminShell
      title="Organizations"
      description="The legal entities behind every property and operator. One org can own many camps, lodges, or journeys."
    >
      <div className="grid gap-4">
        {orgs.map((org) => (
          <EditableSectionCard
            key={org.id}
            icon={LeafIcon}
            title={org.name}
            description={`${TYPE_LABEL[org.type]} · ${org.region}, ${org.country}`}
            meta={
              <span>
                {propertyCount(org.id)} propert
                {propertyCount(org.id) === 1 ? "y" : "ies"}
              </span>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Name" defaultValue={org.name} />
              <SelectInput
                label="Type"
                options={TYPE_OPTIONS}
                defaultValue={org.type}
              />
              <TextInput label="Country" defaultValue={org.country} />
              <TextInput label="Region" defaultValue={org.region} />
              <TextInput
                label="Contact email"
                type="email"
                defaultValue={org.contactEmail}
              />
              <TextInput
                label="Phone"
                type="tel"
                defaultValue={org.phone}
              />
            </div>
          </EditableSectionCard>
        ))}
      </div>
    </AdminShell>
  );
}
