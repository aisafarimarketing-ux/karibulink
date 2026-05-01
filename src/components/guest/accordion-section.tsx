import type { ComponentType, ReactNode, SVGProps } from "react";
import { ChevronDownIcon } from "@/components/icons";

export function AccordionSection({
  id,
  group,
  icon: Icon,
  title,
  count,
  defaultOpen = false,
  children,
}: {
  id?: string;
  group?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      id={id}
      name={group}
      open={defaultOpen || undefined}
      className="group rounded-2xl border border-border bg-surface transition-colors open:border-primary/40 open:shadow-[0_4px_24px_-12px_rgba(31,58,46,0.18)]"
    >
      <summary className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-primary/40">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-open:bg-primary group-open:text-primary-foreground transition-colors">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1 text-left">
          <span className="font-serif block text-base font-medium leading-tight tracking-tight text-foreground">
            {title}
          </span>
          {typeof count === "number" && (
            <span className="text-xs text-muted">
              {count} {count === 1 ? "item" : "items"}
            </span>
          )}
        </span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-border/60 px-4 py-4">{children}</div>
    </details>
  );
}

/**
 * Inline script: when the URL hash points at a <details> section,
 * open it and scroll into view. Listens for hashchange too.
 * Runs once per hub page; no client component needed.
 */
export function AccordionAutoOpenScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){function o(){try{var h=window.location.hash;if(!h)return;var el=document.querySelector(h);if(el&&el.tagName==='DETAILS'){el.open=true;el.scrollIntoView({behavior:'smooth',block:'start'});}}catch(e){}}window.addEventListener('hashchange',o);if(document.readyState!=='loading')o();else document.addEventListener('DOMContentLoaded',o);})();`,
      }}
    />
  );
}
