import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowRightIcon, CompassIcon, TentIcon } from "@/components/icons";
import {
  getOrganization,
  listOperators,
  listProperties,
} from "@/data/mock";

export const metadata = { title: "Guest pages — KaribuLink Admin" };

export default function GuestPagesPage() {
  const properties = listProperties();
  const operators = listOperators();

  return (
    <AdminShell
      title="Guest pages"
      description="Every live URL across the workspace. This is what each NFC tap or shared link opens for the guest."
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
        Properties · {properties.length}
      </p>
      <ul className="mt-3 grid gap-3">
        {properties.map((p) => {
          const org = getOrganization(p.organizationId);
          return (
            <li key={p.id}>
              <PageRow
                icon={TentIcon}
                title={p.name}
                meta={`${org?.region ?? p.location}${
                  org ? ` · ${org.country}` : ""
                }`}
                slug={`/camp/${p.slug}`}
                editHref="/admin/properties"
              />
            </li>
          );
        })}
      </ul>

      <p className="mt-12 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        Operators · {operators.length}
      </p>
      <ul className="mt-3 grid gap-3">
        {operators.map((o) => {
          const org = getOrganization(o.organizationId);
          return (
            <li key={o.id}>
              <PageRow
                icon={CompassIcon}
                title={o.name}
                meta={`${org?.region ?? ""}${org ? ` · ${org.country}` : ""}`}
                slug={`/operator/${o.slug}`}
                editHref="/admin/operators"
              />
            </li>
          );
        })}
      </ul>
    </AdminShell>
  );
}

function PageRow({
  icon: Icon,
  title,
  meta,
  slug,
  editHref,
}: {
  icon: typeof TentIcon;
  title: string;
  meta: string;
  slug: string;
  editHref: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-serif text-lg font-medium tracking-tight text-foreground">
            {title}
          </p>
          <p className="text-xs text-muted">{meta}</p>
          <p className="font-mono mt-1 text-xs text-primary">{slug}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={slug}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:border-primary/40"
        >
          View live
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <Link
          href={editHref}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
