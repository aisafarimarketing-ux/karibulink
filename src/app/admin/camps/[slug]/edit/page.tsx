import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PropertyEditor } from "@/components/admin/property-editor";
import { getProperty, listProperties } from "@/data/mock";

export function generateStaticParams() {
  return listProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  return {
    title: property
      ? `Edit ${property.name} — KaribuLink Admin`
      : "Edit camp — KaribuLink Admin",
  };
}

export default async function EditCampPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();
  return <PropertyEditor initialProperty={property} />;
}
