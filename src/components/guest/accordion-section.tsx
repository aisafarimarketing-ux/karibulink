import type { ComponentType, ReactNode, SVGProps } from "react";
import { ChevronDownIcon } from "@/components/icons";

export function AccordionSection({
  id,
  group,
  icon: Icon,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  id?: string;
  group?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      id={id}
      name={group}
      open={defaultOpen || undefined}
      className="group scroll-mt-20 rounded-2xl bg-soft/70 transition-colors open:bg-soft open:shadow-[0_4px_24px_-16px_rgba(31,51,35,0.22)] dark:bg-white/[0.04] dark:open:bg-white/[0.06]"
    >
      <summary className="flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3.5 outline-none transition-transform duration-150 active:scale-[0.99] [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-primary/40">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#2f4a32]/10 text-[#2f4a32] transition-colors group-open:bg-[#2f4a32] group-open:text-[#faf7f0]">
          <Icon className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="font-serif block truncate text-[15px] font-medium leading-tight tracking-tight text-foreground">
            {title}
          </span>
          {subtitle && (
            <span className="block truncate text-[11px] leading-snug text-muted">
              {subtitle}
            </span>
          )}
        </span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 pt-1">
        <div className="border-t border-border/40 pt-4">{children}</div>
      </div>
    </details>
  );
}

/**
 * Inline script: when the URL hash points at a <details> section,
 * open it and scroll into view. Listens for hashchange too.
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
