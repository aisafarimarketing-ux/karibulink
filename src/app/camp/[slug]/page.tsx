import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CampHub } from "@/components/guest/camp-hub";
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
  if (!property) return { title: "Not found" };
  return {
    title: `${property.name} — KaribuLink`,
    description: property.welcomeMessage,
  };
}

export default async function CampPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();
  return <CampHub property={property} />;
}
