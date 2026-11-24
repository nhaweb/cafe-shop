/* Style primitives shared by every page (see CLAUDE.md → Design system). Buttons live in components/ui/button.tsx. */

export const gutter = "mx-auto w-full max-w-page px-5";
export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";
export const label = "text-sm font-semibold";
export const eyebrow = "text-sm font-semibold text-muted-foreground";
export const serifDisplay = "font-serif font-light leading-[1.08] tracking-[-0.015em]";
/** Section titles: 32–34px mobile / 44–46px desktop. */
export const sectionTitle = `${serifDisplay} text-[32px] md:text-[44px]`;
/** Inner-page H1 (pages without a photo hero). */
export const pageTitle = `${serifDisplay} text-[40px] md:text-[64px]`;
export const linkUnderline =
  "underline decoration-espresso/30 underline-offset-4 transition-colors hover:decoration-espresso";
export const imageZoom =
  "object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none";
