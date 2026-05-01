import type {
  ComponentPropsWithoutRef,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const inputBase =
  "block w-full rounded-2xl bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20";

export function FieldLabel({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint && (
          <span className="text-[11px] text-muted">{hint}</span>
        )}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function TextInput({
  label,
  hint,
  className = "",
  ...rest
}: { label?: string; hint?: string } & ComponentPropsWithoutRef<"input">) {
  const input = (
    <input {...rest} className={`${inputBase} h-12 ${className}`} />
  );
  if (!label) return input;
  return (
    <FieldLabel label={label} hint={hint}>
      {input}
    </FieldLabel>
  );
}

export function TextArea({
  label,
  hint,
  rows = 4,
  className = "",
  ...rest
}: { label?: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ta = (
    <textarea
      {...rest}
      rows={rows}
      className={`${inputBase} ${className}`}
    />
  );
  if (!label) return ta;
  return (
    <FieldLabel label={label} hint={hint}>
      {ta}
    </FieldLabel>
  );
}

export function SelectInput({
  label,
  hint,
  options,
  className = "",
  ...rest
}: {
  label?: string;
  hint?: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const select = (
    <select
      {...rest}
      className={`${inputBase} h-12 cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22 fill=%22none%22 stroke=%22%236f6a5e%22 stroke-width=%221.5%22><path d=%22M1 1l5 5 5-5%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10 ${className}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
  if (!label) return select;
  return (
    <FieldLabel label={label} hint={hint}>
      {select}
    </FieldLabel>
  );
}

export function SaveButton({
  children = "Save changes",
  hint = "Mock — changes don't persist yet",
}: {
  children?: ReactNode;
  hint?: string;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-8 flex flex-col items-stretch gap-3 rounded-3xl border border-border bg-surface/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted">{hint}</p>
      <button
        type="button"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
      >
        {children}
      </button>
    </div>
  );
}
