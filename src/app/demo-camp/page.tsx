import { notFound } from "next/navigation";
import { CampHubWithStorage } from "@/components/guest/camp-hub-with-storage";
import { DEMO_PROPERTY_SLUG, getProperty } from "@/data/mock";

export const metadata = {
  title: "Serengeti View Camp — KaribuLink Demo",
  description: "Demo guest hub for a premium safari camp.",
};

export default function DemoCampPage() {
  const property = getProperty(DEMO_PROPERTY_SLUG);
  if (!property) notFound();
  return <CampHubWithStorage initialProperty={property} />;
}
