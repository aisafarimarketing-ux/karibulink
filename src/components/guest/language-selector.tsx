"use client";

import { LANGUAGES, useLanguage, type Language } from "./language-context";

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
        aria-label="Change language"
        className="h-9 cursor-pointer appearance-none rounded-full border border-[#c9a84c] bg-[#f5f1e6] pl-3.5 pr-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1f3d2b] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60 dark:border-[#c9a84c]/55 dark:bg-[#0f1f17] dark:text-[#f5f1e6] dark:hover:bg-[#15291f]"
      >
        {LANGUAGES.map((l) => (
          <option
            key={l}
            value={l}
            className="bg-[#f5f1e6] text-[#1f3d2b] dark:bg-[#0f1f17] dark:text-[#f5f1e6]"
          >
            {l}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 12 8"
        aria-hidden
        className="pointer-events-none absolute right-2.5 h-2 w-2.5 text-[#1f3d2b] dark:text-[#f5f1e6]"
      >
        <path
          d="M1 1l5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
