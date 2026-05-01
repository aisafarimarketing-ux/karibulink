import type { ComponentType, ReactNode, SVGProps } from "react";

export function EditableSectionCard({
  icon: Icon,
  title,
  description,
  meta,
  children,
}: {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-surface p-6 shadow-[0_2px_14px_-6px_rgba(31,58,46,0.10)] sm:p-8">
      <header className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {Icon && (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <div>
            <h2 className="font-serif text-xl font-medium leading-tight tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
            {description && (
              <p className="mt-1.5 max-w-xl text-sm text-muted leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        {meta && <div className="text-xs text-muted sm:text-right">{meta}</div>}
      </header>
      <div className="border-t border-border/40 pt-6">{children}</div>
    </section>
  );
}
