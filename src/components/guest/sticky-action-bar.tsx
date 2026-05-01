"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { iconFor } from "@/lib/icon-map";
import type { IconKey } from "@/data/types";
import { useT, type TranslationKey } from "./language-context";

export interface ActionItem {
  id: string;
  /** Either an i18n key or a literal string. */
  labelKey?: TranslationKey;
  label?: string;
  iconKey: IconKey;
}

/**
 * Single-row sticky action bar.
 *
 * Designed for 4 actions max so they fit a standard phone width
 * without horizontal scroll. Each chip is `flex-1` with a vertical
 * icon-over-label layout, so labels stay legible at narrow widths.
 */
export function StickyActionBar({ actions }: { actions: ActionItem[] }) {
  const [active, setActive] = useState<string | null>(actions[0]?.id ?? null);
  const ignoreUntil = useRef(0);
  const t = useT();

  // Track which target section is in view; ignore observer briefly
  // after a click so we don't fight the smooth-scroll animation.
  useEffect(() => {
    const targets = actions
      .map((a) => document.getElementById(a.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < ignoreUntil.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );

    targets.forEach((tgt) => observer.observe(tgt));
    return () => observer.disconnect();
  }, [actions]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActive(id);
    ignoreUntil.current = Date.now() + 800;

    const target = document.getElementById(id);
    if (!target) return;

    if (target.tagName === "DETAILS") {
      (target as HTMLDetailsElement).open = true;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-[rgba(224,216,195,0.92)] backdrop-blur-md dark:bg-[rgba(8,24,18,0.92)]">
      <nav aria-label="Section navigation">
        <ul className="flex items-stretch gap-1.5 px-2 py-2">
          {actions.map((a) => {
            const Icon = iconFor(a.iconKey);
            const isActive = active === a.id;
            const label = a.labelKey ? t(a.labelKey) : (a.label ?? "");
            return (
              <li key={a.id} className="min-w-0 flex-1">
                <a
                  href={`#${a.id}`}
                  onClick={(e) => handleClick(e, a.id)}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "flex h-12 w-full flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-center",
                    "transition-all duration-150 active:scale-[0.97]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    isActive
                      ? "bg-[#b06a3b] text-white shadow-[0_2px_10px_-2px_rgba(176,106,59,0.45)] dark:bg-[#c9a84c] dark:text-[#1f3d2b]"
                      : "bg-[#f5f1e6] text-[#1f3d2b] dark:bg-white/[0.08] dark:text-foreground",
                  ].join(" ")}
                >
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isActive ? "" : "text-[#b06a3b] dark:text-[#c9a84c]"
                    }`}
                  />
                  <span className="block w-full truncate text-[10px] font-semibold leading-tight tracking-tight">
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
