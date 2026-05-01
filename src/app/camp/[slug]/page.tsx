import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CampFair } from "@/components/guest/camp-fair";
import { CampHubWithStorage } from "@/components/guest/camp-hub-with-storage";
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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string | string[] }>;
}) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const property = getProperty(slug);
  if (!property) notFound();

  const fair = Array.isArray(mode) ? mode[0] === "fair" : mode === "fair";
  if (fair) {
    return <CampFair property={property} />;
  }
  return <CampHubWithStorage initialProperty={property} />;
}
