/**
 * Tiny class-name joiner. Filters falsy values and joins the rest with
 * a space. Mirrors clsx's API for the cases we actually use, without
 * pulling in the dependency.
 */
export function cn(
  ...inputs: Array<string | number | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}
