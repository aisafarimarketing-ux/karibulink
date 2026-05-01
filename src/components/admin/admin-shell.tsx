import type { ReactNode } from "react";
import { AdminSidebar } from "./admin-sidebar";

export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border/60 bg-background">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-5 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:px-12 lg:py-12">
            <div>
              <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="mt-2 max-w-2xl text-base text-muted leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex flex-wrap gap-2">{actions}</div>
            )}
          </div>
        </header>
        <main className="flex-1 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
