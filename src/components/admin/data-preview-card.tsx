import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowRightIcon } from "@/components/icons";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="font-serif mt-4 text-4xl font-medium tracking-tight text-foreground">
        {value}
      </p>
      {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function DataPreviewCard({
  icon: Icon,
  title,
  description,
  meta,
  href,
  cta,
  children,
}: {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  meta?: ReactNode;
  href?: string;
  cta?: string;
  children?: ReactNode;
}) {
  const inner = (
    <>
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground transition-colors group-hover:bg-primary-hover">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-xl font-medium tracking-tight text-foreground">
              {title}
            </h3>
            {meta && <span className="text-xs text-muted">{meta}</span>}
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      {children && <div className="mt-5">{children}</div>}
      {href && cta && (
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
          {cta}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
        </div>
      )}
    </>
  );

  const className =
    "group block rounded-3xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_20px_40px_-20px_rgba(31,58,46,0.18)]";

  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}
