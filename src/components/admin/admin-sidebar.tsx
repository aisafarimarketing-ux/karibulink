"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CompassIcon,
  InfoIcon,
  LeafIcon,
  RouteIcon,
  TentIcon,
} from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: InfoIcon },
  { href: "/admin/organizations", label: "Organizations", icon: LeafIcon },
  { href: "/admin/properties", label: "Properties", icon: TentIcon },
  { href: "/admin/operators", label: "Operators", icon: CompassIcon },
  { href: "/admin/pages", label: "Guest pages", icon: RouteIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:gap-1 lg:border-r lg:border-border/60 lg:bg-surface/40 lg:px-4 lg:py-6">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-serif text-base font-semibold">
            K
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            KaribuLink
          </span>
        </Link>
        <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
          Control center
        </p>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(pathname, item.href)}
            />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-border bg-background p-4">
          <p className="text-xs font-medium text-foreground">Mock workspace</p>
          <p className="mt-1 text-[11px] text-muted leading-relaxed">
            Edits don't persist yet — this is the visual foundation for the
            real admin.
          </p>
        </div>
      </aside>

      <div className="lg:hidden border-b border-border/60 bg-surface/40">
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground font-serif text-xs font-semibold">
              K
            </span>
            <span className="font-serif text-base font-semibold tracking-tight">
              KaribuLink
            </span>
          </Link>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            Admin
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive(pathname, item.href)}
              compact
            />
          ))}
        </nav>
      </div>
    </>
  );
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
  compact = false,
}: {
  href: string;
  label: string;
  icon: NavItem["icon"];
  active: boolean;
  compact?: boolean;
}) {
  const base = compact
    ? "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium tracking-tight transition-colors"
    : "inline-flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium tracking-tight transition-colors";

  const styles = active
    ? compact
      ? "border-primary/50 bg-primary text-primary-foreground"
      : "bg-primary text-primary-foreground"
    : compact
      ? "border-border bg-background text-foreground/80 hover:border-primary/30 hover:text-foreground"
      : "text-foreground/80 hover:bg-background hover:text-foreground";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
