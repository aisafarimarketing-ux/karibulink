"use client";

import { CompassIcon, MessageIcon, PhoneIcon } from "@/components/icons";
import { useT } from "./language-context";

const cleanPhone = (phone: string) => phone.replace(/[^0-9+]/g, "");

/**
 * Sticks to the bottom of the surrounding scroll container.
 *
 * - On the live guest pages this is the phone-shell scroll container
 *   (desktop) or body (mobile).
 * - In the admin preview this is the preview pane's scroll container.
 *
 * Always rendered inside <MobileFrame>.
 */
export function StickyBottomBar({
  phone,
  whatsappPhone,
  directionsQuery,
}: {
  phone: string;
  whatsappPhone?: string;
  directionsQuery: string;
}) {
  const t = useT();
  const wa = cleanPhone(whatsappPhone ?? phone).replace(/^\+/, "");
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    directionsQuery,
  )}`;

  return (
    <div
      className="sticky inset-x-0 bottom-0 z-30 mt-4 px-3 sm:px-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <div className="rounded-full bg-background/95 p-1.5 shadow-[0_18px_40px_-18px_rgba(31,51,35,0.45)] backdrop-blur ring-1 ring-border/40">
        <div className="grid grid-cols-3 items-center gap-1">
          <BarAction
            href={`tel:${cleanPhone(phone)}`}
            icon={PhoneIcon}
            label={t("callLabel")}
            variant="ghost"
          />
          <BarAction
            href={`https://wa.me/${wa}`}
            icon={MessageIcon}
            label={t("whatsappLabel")}
            variant="primary"
            external
          />
          <BarAction
            href={directions}
            icon={CompassIcon}
            label={t("directionsLabel")}
            variant="ghost"
            external
          />
        </div>
      </div>
    </div>
  );
}

function BarAction({
  href,
  icon: Icon,
  label,
  variant,
  external = false,
}: {
  href: string;
  icon: typeof PhoneIcon;
  label: string;
  variant: "primary" | "ghost";
  external?: boolean;
}) {
  const isPrimary = variant === "primary";
  const styles = isPrimary
    ? "bg-[#25d366] text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.55)] hover:bg-[#1ebe5a]"
    : "text-foreground/75 hover:bg-soft hover:text-foreground";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={label}
      {...linkProps}
      className={`inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold tracking-tight transition-all duration-150 active:scale-[0.97] ${styles}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </a>
  );
}
