import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OperatorHub } from "@/components/guest/operator-hub";
import { getOperator, listOperators } from "@/data/mock";

export function generateStaticParams() {
  return listOperators().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const operator = getOperator(slug);
  if (!operator) return { title: "Not found" };
  return {
    title: `${operator.name} — KaribuLink`,
    description: operator.journeyNotes.heroSubtitle,
  };
}

export default async function OperatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const operator = getOperator(slug);
  if (!operator) notFound();
  return <OperatorHub operator={operator} />;
}
