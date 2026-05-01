import { notFound } from "next/navigation";
import { OperatorHub } from "@/components/guest/operator-hub";
import { DEMO_OPERATOR_SLUG, getOperator } from "@/data/mock";

export const metadata = {
  title: "Your Safari Journey — KaribuLink Demo",
  description: "Demo tour-operator hub for a multi-day safari journey.",
};

export default function DemoOperatorPage() {
  const operator = getOperator(DEMO_OPERATOR_SLUG);
  if (!operator) notFound();
  return <OperatorHub operator={operator} />;
}
