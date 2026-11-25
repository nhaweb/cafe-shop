import Link from "next/link";
import { navLinks, site, type NavKey } from "@/lib/site";
import { focusRing } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { CartButton } from "./cart-button";
import { MobileNav } from "./mobile-nav";

type SiteNavProps = {
  /** `overlay` sits on top of the home hero photo; `solid` is the sand bar of inner pages. */
  variant?: "overlay" | "solid";
  /** Highlights the current section (passed by each page, so the nav needs no client routing hooks). */
  active?: NavKey;
};

export function SiteNav({ variant = "solid", active }: SiteNavProps) {
  return (
    <nav
      className={cn(
        "z-20",
        variant === "overlay" ? "absolute inset-x-0 top-0 text-cream" : "relative bg-paper text-espresso",
      )}
    >
      <div className="mx-auto w-full max-w-page px-5">
        <div
          className={cn(
            "grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-6",
            variant === "overlay" && "border-b border-cream/25",
          )}
        >
          <ul className="col-start-1 row-start-1 hidden items-center gap-1 justify-self-start md:flex">
            {navLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={active === l.key ? "page" : undefined}
                  className={cn(
                    "rounded-btn px-2.5 py-1.5 text-[13px] font-light uppercase tracking-[0.02em] transition-colors hover:bg-current/10",
                    active === l.key && "bg-current/10",
                    focusRing,
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className={cn(
              "col-start-2 row-start-1 font-brand text-xl font-light uppercase tracking-[0.02em] md:text-2xl",
              focusRing,
            )}
          >
            {site.name}
          </Link>

          <div className="col-start-3 row-start-1 flex items-center gap-1 justify-self-end md:gap-5">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("hidden text-[13px] font-light uppercase tracking-[0.02em] transition-opacity hover:opacity-60 lg:block", focusRing)}
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
