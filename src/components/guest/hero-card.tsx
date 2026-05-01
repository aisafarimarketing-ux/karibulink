import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";

const SKY = `linear-gradient(180deg,
  #0c1d18 0%,
  #16302a 18%,
  #2c5648 38%,
  #d4a05a 58%,
  #b25a2a 72%,
  #4a2510 86%,
  #14080a 100%)`;

const SKY_DARK = `linear-gradient(180deg,
  #050d0a 0%,
  #0d1c16 22%,
  #1a3326 42%,
  #6e4a26 62%,
  #4a2510 78%,
  #14080a 92%,
  #050a08 100%)`;

const STAR_DOTS =
  "radial-gradient(1px 1px at 14% 12%, #fff 99%, transparent 100%)," +
  "radial-gradient(1px 1px at 32% 22%, #fff 99%, transparent 100%)," +
  "radial-gradient(1px 1px at 48% 8%, #fff 99%, transparent 100%)," +
  "radial-gradient(1px 1px at 62% 28%, #fff 99%, transparent 100%)," +
  "radial-gradient(1px 1px at 76% 14%, #fff 99%, transparent 100%)," +
  "radial-gradient(1px 1px at 88% 24%, #fff 99%, transparent 100%)," +
  "radial-gradient(1px 1px at 22% 32%, #fff 99%, transparent 100%)";

/**
 * Minimal, emotional hero.
 * Just a small label (the place name) and a main message. No paragraphs.
 */
export function HeroCard({
  label,
  message,
  imageUrl,
  homeHref = "/",
  toolbar,
}: {
  label: string;
  message: string;
  imageUrl?: string | null;
  homeHref?: string;
  toolbar?: ReactNode;
}) {
  const showImage = Boolean(imageUrl);
  return (
    <div className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] shadow-[0_20px_60px_-25px_rgba(31,58,46,0.45)] sm:aspect-[16/11]">
        {showImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl ?? undefined}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 dark:hidden"
              style={{ background: SKY }}
            />
            <div
              className="absolute inset-0 hidden dark:block"
              style={{ background: SKY_DARK }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-70"
              style={{
                backgroundImage: STAR_DOTS,
                backgroundSize: "260px 200px",
                backgroundRepeat: "repeat",
              }}
            />
            <div className="pointer-events-none absolute right-[12%] top-[52%] h-32 w-32 -translate-y-1/2 rounded-full bg-[#f5b86e] opacity-60 blur-3xl" />
            <div className="pointer-events-none absolute right-[14%] top-[55%] h-12 w-12 -translate-y-1/2 rounded-full bg-[#fce0a0]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          </>
        )}

        <div className="relative flex h-full flex-col p-5 text-white">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={homeHref}
              className="text-[10px] uppercase tracking-[0.22em] text-white/75 hover:text-white"
            >
              ← KaribuLink
            </Link>
            <div className="flex items-center gap-2">
              {toolbar}
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/85">
              {label}
            </p>
            <h1 className="font-serif mt-2 text-3xl font-medium leading-[1.05] tracking-tight sm:text-[34px]">
              {message}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
