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

export function StickyActionBar({ actions }: { actions: ActionItem[] }) {
  const [active, setActive] = useState<string | null>(actions[0]?.id ?? null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
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

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [actions]);

  // Keep the active chip visible inside the horizontal scroll container.
  useEffect(() => {
    if (!active) return;
    const item = itemRefs.current.get(active);
    const list = listRef.current;
    if (!item || !list) return;

    const itemRect = item.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    if (
      itemRect.left < listRect.left + 8 ||
      itemRect.right > listRect.right - 8
    ) {
      item.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

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
    <div className="sticky top-0 z-40 border-b border-[#c9a84c]/20 bg-[rgba(224,216,195,0.92)] backdrop-blur-md dark:border-[#c9a84c]/25 dark:bg-[rgba(8,24,18,0.92)]">
      <nav aria-label="Section navigation">
        <ul
          ref={listRef}
          className="flex gap-2 overflow-x-auto px-3 py-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {actions.map((a) => {
            const Icon = iconFor(a.iconKey);
            const isActive = active === a.id;
            const label = a.labelKey ? t(a.labelKey) : (a.label ?? "");
            return (
              <li key={a.id} className="snap-start shrink-0">
                <a
                  ref={(el) => {
                    if (el) itemRefs.current.set(a.id, el);
                    else itemRefs.current.delete(a.id);
                  }}
                  href={`#${a.id}`}
                  onClick={(e) => handleClick(e, a.id)}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "inline-flex h-11 min-w-[92px] items-center justify-center gap-2 whitespace-nowrap rounded-full border px-3 text-xs font-semibold tracking-tight",
                    "transition-all duration-150 active:scale-[0.97]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "sm:min-w-[104px]",
                    isActive
                      ? "border-transparent bg-[#b06a3b] text-white shadow-[0_2px_10px_-2px_rgba(176,106,59,0.45)] dark:bg-[#c9a84c] dark:text-[#1f3d2b]"
                      : "border-[#c9a84c]/35 bg-[#f5f1e6] text-[#1f3d2b] hover:border-[#c9a84c] dark:border-[#c9a84c]/35 dark:bg-white/[0.08] dark:text-foreground dark:hover:border-[#c9a84c]/55",
                  ].join(" ")}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "" : "text-[#b06a3b] dark:text-[#c9a84c]"
                    }`}
                  />
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
