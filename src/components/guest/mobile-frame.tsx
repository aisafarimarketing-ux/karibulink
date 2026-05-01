import type { ReactNode } from "react";

/**
 * Mobile-app sized container.
 *
 * - Mobile (< sm): renders edge-to-edge in normal flow (body scrolls).
 * - Desktop (sm+): the wrapper becomes a fixed full-viewport backdrop
 *   in warm sand; the inner shell is a rounded, internally-scrolling
 *   phone screen centered on top. Sticky elements inside (action bar
 *   at top, bottom bar) anchor to the shell's scroll container.
 *
 * `inPreview` skips the desktop wrapping — used by the admin preview
 * which already provides its own scroll container.
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
    <div className="sm:fixed sm:inset-0 sm:flex sm:items-center sm:justify-center sm:bg-[#e0d8c3] sm:p-4 sm:dark:bg-[#08130d] lg:p-6">
      <div className="relative w-full sm:flex sm:h-[min(900px,calc(100vh-2rem))] sm:w-[460px] sm:flex-col sm:overflow-hidden sm:rounded-[28px] sm:bg-background sm:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.35)]">
        <div className="sm:flex-1 sm:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
