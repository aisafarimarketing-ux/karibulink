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

export function HeroCard({
  eyebrow,
  status,
  title,
  description,
  meta,
  homeHref = "/",
  imageUrl,
  toolbar,
}: {
  eyebrow: string;
  status: string;
  title: string;
  description?: ReactNode;
  meta?: string;
  homeHref?: string;
  imageUrl?: string | null;
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
            {/* Darken for text legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
          </>
        ) : (
          <>
            {/* Sky gradient */}
            <div
              className="absolute inset-0 dark:hidden"
              style={{ background: SKY }}
            />
            <div
              className="absolute inset-0 hidden dark:block"
              style={{ background: SKY_DARK }}
            />

            {/* Stars in the upper portion */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-70"
              style={{
                backgroundImage: STAR_DOTS,
                backgroundSize: "260px 200px",
                backgroundRepeat: "repeat",
              }}
            />

            {/* Sun glow */}
            <div className="pointer-events-none absolute right-[12%] top-[52%] h-32 w-32 -translate-y-1/2 rounded-full bg-[#f5b86e] opacity-60 blur-3xl" />
            <div className="pointer-events-none absolute right-[14%] top-[55%] h-12 w-12 -translate-y-1/2 rounded-full bg-[#fce0a0]" />

            {/* Horizon haze */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          </>
        )}

        {/* Content */}
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/85">
                <span className="h-1 w-1 rounded-full bg-[#fce0a0]" />
                {eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fce0a0] opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fce0a0]" />
                </span>
                {status}
              </span>
            </div>
            <h1 className="font-serif mt-3 text-2xl font-medium leading-[1.05] tracking-tight sm:text-[28px]">
              {title}
            </h1>
            {description && (
              <p className="mt-2 max-w-[28ch] text-sm leading-snug text-white/80 line-clamp-2">
                {description}
              </p>
            )}
            {meta && (
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                {meta}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
