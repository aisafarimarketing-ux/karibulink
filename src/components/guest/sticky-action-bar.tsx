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
    <div className="sticky top-0 z-40 bg-background/85 px-3 pt-3 pb-1 backdrop-blur-md sm:px-4 sm:pt-4 dark:bg-[rgba(8,24,18,0.85)]">
      <nav aria-label="Section navigation">
        <ul className="flex items-stretch gap-0.5 rounded-full bg-soft/85 p-1 dark:bg-white/[0.06]">
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
                    "flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-2 text-center",
                    "transition-all duration-200 active:scale-[0.97]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    isActive
                      ? "bg-[#2f4a32] text-[#faf7f0] shadow-[0_4px_12px_-6px_rgba(31,51,35,0.5)]"
                      : "text-foreground/65 hover:text-foreground",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden truncate text-[11px] font-semibold leading-none tracking-tight sm:block">
                    {label}
                  </span>
                  <span className="truncate text-[10px] font-semibold leading-none tracking-tight sm:hidden">
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
