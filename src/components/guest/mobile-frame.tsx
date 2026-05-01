import type { ReactNode } from "react";

/**
 * Mobile-app sized container.
 *
 * On phones the page renders edge-to-edge.
 * On larger viewports the content is centered into a phone-width column
 * (~ 460px) so the guest hub feels like an app, not a desktop site.
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full sm:max-w-[460px]">{children}</div>
  );
}
