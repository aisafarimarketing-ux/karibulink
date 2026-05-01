"use client";

import { CompassIcon, MessageIcon, PhoneIcon } from "@/components/icons";
import { useT } from "./language-context";

const cleanPhone = (phone: string) => phone.replace(/[^0-9+]/g, "");

export function StickyBottomBar({
  phone,
  whatsappPhone,
  directionsQuery,
  inPreview = false,
}: {
  phone: string;
  whatsappPhone?: string;
  directionsQuery: string;
  inPreview?: boolean;
}) {
  const t = useT();
  const wa = cleanPhone(whatsappPhone ?? phone).replace(/^\+/, "");
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    directionsQuery,
  )}`;

  // In preview: sticks to the bottom of the surrounding scroll container.
  // In production: pinned to viewport bottom.
  const positionClass = inPreview
    ? "sticky inset-x-0 bottom-0 z-30"
    : "pointer-events-none fixed inset-x-0 bottom-0 z-50";

  const innerClass = inPreview
    ? "mx-auto w-full"
    : "pointer-events-auto mx-auto w-full sm:max-w-[460px]";

  return (
    <div
      className={positionClass}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className={innerClass}>
        <div className="border-t border-border/60 bg-surface/95 backdrop-blur sm:m-3 sm:rounded-2xl sm:border sm:shadow-[0_18px_40px_-18px_rgba(31,58,46,0.35)]">
          <div className="grid grid-cols-3 gap-2 px-3 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5">
            <BarAction
              href={`tel:${cleanPhone(phone)}`}
              icon={PhoneIcon}
              label={t("callLabel")}
              variant="primary"
            />
            <BarAction
              href={`https://wa.me/${wa}`}
              icon={MessageIcon}
              label={t("whatsappLabel")}
              variant="whatsapp"
              external
            />
            <BarAction
              href={directions}
              icon={CompassIcon}
              label={t("directionsLabel")}
              variant="secondary"
              external
            />
          </div>
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
  variant: "primary" | "secondary" | "whatsapp";
  external?: boolean;
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-hover"
      : variant === "whatsapp"
        ? "bg-[#25d366] text-white hover:bg-[#1ebe5a]"
        : "border border-border bg-background text-foreground hover:border-primary/40";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...linkProps}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-medium tracking-tight transition-all duration-150 active:scale-[0.97] ${styles}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}
