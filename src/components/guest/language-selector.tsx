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
        className="h-9 cursor-pointer appearance-none rounded-full border border-white/20 bg-white/10 pl-3 pr-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        {LANGUAGES.map((l) => (
          <option key={l} value={l} className="text-foreground">
            {l}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 12 8"
        aria-hidden
        className="pointer-events-none absolute right-2 h-2 w-2.5 text-white/85"
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
