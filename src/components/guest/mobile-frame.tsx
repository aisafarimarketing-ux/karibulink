import type { ReactNode } from "react";

/**
 * Mobile-app sized container.
 *
 * On phones the page renders edge-to-edge.
 * On larger viewports the content is centered into a phone-width column
 * (~ 460px) with a soft drop shadow so it reads as a polished phone
 * screen, not a desktop site.
 *
 * Intentionally no overflow:hidden / rounded clip on the wrapper so
 * children using `position: sticky` (action bar, bottom bar) can still
 * track the body scroll context.
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full sm:max-w-[460px] sm:shadow-[0_30px_80px_-25px_rgba(31,58,46,0.22)] dark:sm:shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)]">
      {children}
    </div>
  );
}
