import Link from "next/link";
import { LinkButton } from "./ui";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground font-serif text-sm font-semibold">
            K
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            KaribuLink
          </span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted sm:flex">
          <Link href="#problem" className="hover:text-foreground transition-colors">
            Why
          </Link>
          <Link href="#how" className="hover:text-foreground transition-colors">
            How it works
          </Link>
          <Link href="#serves" className="hover:text-foreground transition-colors">
            Who it serves
          </Link>
        </div>
        <LinkButton href="/demo-camp" variant="primary" size="md">
          See a demo
        </LinkButton>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground font-serif text-xs font-semibold">
            K
          </span>
          <span className="text-sm text-muted">
            KaribuLink — Welcome, made digital.
          </span>
        </div>
        <p className="text-xs text-muted">
          Karibu means welcome in Swahili. Built with care in East Africa.
        </p>
      </div>
    </footer>
  );
}
