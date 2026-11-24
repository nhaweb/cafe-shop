import Link from "next/link";
import { navLinks, site, type NavKey } from "@/lib/site";
import { focusRing } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { CartButton } from "./cart-button";
import { MobileNav } from "./mobile-nav";

type SiteNavProps = {
  /** `overlay` sits on top of the home hero photo; `solid` is the espresso bar of inner pages. */
  variant?: "overlay" | "solid";
  /** Highlights the current section (passed by each page, so the nav needs no client routing hooks). */
  active?: NavKey;
};

export function SiteNav({ variant = "solid", active }: SiteNavProps) {
  return (
    <nav
      className={cn(
        "z-20 text-cream",
        variant === "overlay" ? "absolute inset-x-0 top-0" : "relative bg-espresso",
      )}
    >
      <div className="mx-auto w-full max-w-page px-5">
        <div
          className={cn(
            "flex h-20 items-center justify-between gap-6",
            variant === "overlay" && "border-b border-cream/25",
          )}
        >
          <Link href="/" className={cn("font-serif text-2xl font-normal tracking-[-0.02em]", focusRing)}>
            {site.name}
          </Link>

          <ul className="hidden items-center gap-2 md:flex">
            {navLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={active === l.key ? "page" : undefined}
                  className={cn(
                    "rounded-btn px-2.5 py-1.5 text-[15px] font-semibold transition-colors hover:bg-white/15",
                    active === l.key && "bg-white/15",
                    focusRing,
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-5">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("hidden text-[15px] font-semibold transition-opacity hover:opacity-60 lg:block", focusRing)}
            >
              Chỉ đường
            </a>
            <CartButton />
            <MobileNav active={active} />
          </div>
        </div>
      </div>
    </nav>
  );
}
