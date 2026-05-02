import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CampFair } from "@/components/guest/camp-fair";
import { DEMO_PROPERTY_SLUG, getProperty } from "@/data/mock";

export const metadata: Metadata = {
  title: "Fair Mode Demo — KaribuLink",
  description:
    "What a tour operator sees after scanning your QR at a trade fair.",
};

export default function DemoFairPage() {
  const property = getProperty(DEMO_PROPERTY_SLUG);
  if (!property) notFound();
  return (
    <div className="min-h-screen sm:bg-[#e0d8c3] sm:py-10 lg:py-14 dark:sm:bg-[#08130d]">
      <DemoBackLink />
      <div className="mx-auto w-full bg-background sm:relative sm:max-w-[420px] sm:overflow-hidden sm:rounded-[40px] sm:shadow-[0_30px_80px_-25px_rgba(31,58,46,0.35)] dark:sm:shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)]">
        <DynamicIsland />
        <CampFair property={property} />
      </div>
    </div>
  );
}

function DemoBackLink() {
  return (
    <div className="hidden sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 pb-6 lg:px-16">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-foreground/65 hover:text-foreground"
        >
          ← KaribuLink
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
          Fair Mode · phone preview
        </p>
      </div>
    </div>
  );
}

/**
 * Dynamic-island chrome — only visible inside the phone-shaped column on
 * desktop. Sits above the sticky header via z-index so it reads as part
 * of the device, not the page content.
 */
function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-2.5 z-[60] hidden h-[22px] w-[110px] -translate-x-1/2 rounded-full bg-[#1f1f1b] sm:block"
    />
  );
}
