import { notFound } from "next/navigation";
import { PropertyEditor } from "@/components/admin/property-editor";
import { DEMO_PROPERTY_SLUG, getProperty } from "@/data/mock";

export const metadata = { title: "Properties — KaribuLink Admin" };

export default function PropertiesPage() {
  const property = getProperty(DEMO_PROPERTY_SLUG);
  if (!property) notFound();
  return <PropertyEditor initialProperty={property} />;
}
