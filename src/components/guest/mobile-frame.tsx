import type { ReactNode } from "react";

/**
 * Mobile-app sized container — natural body scroll on every device.
 *
 * - Mobile (< sm): renders edge-to-edge, no outer chrome.
 * - Desktop (sm+): centred max-w-[460px] column with a soft drop shadow
 *   floating on a warm-sand outer background. Body scrolls; sticky
 *   elements inside (action bar, bottom bar) track the body, so there
 *   is no nested scrollbar.
 *
 * `inPreview` skips the wrapping for the admin preview which provides
 * its own scroll container.
 */
export function MobileFrame({
  children,
  inPreview = false,
}: {
  children: ReactNode;
  inPreview?: boolean;
}) {
  if (inPreview) {
    return <div className="w-full">{children}</div>;
  }
  return (
    <div className="bg-background sm:bg-[#e0d8c3] dark:sm:bg-[#08130d]">
      <div className="mx-auto w-full sm:max-w-[460px] sm:bg-background sm:shadow-[0_30px_80px_-25px_rgba(31,58,46,0.18)] dark:sm:shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)]">
        {children}
      </div>
    </div>
  );
}
