"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, site, type NavKey } from "@/lib/site";
import { serifDisplay } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Mobile menu: full-height sheet from the right (shadcn Sheet / Radix Dialog). */
export function MobileNav({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="h-10 rounded-btn px-2.5 text-sm font-semibold transition-colors hover:bg-white/15 md:hidden"
        >
          Menu
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 bg-espresso text-cream sm:max-w-sm [&_[data-slot=sheet-close]]:text-cream [&_[data-slot=sheet-close]]:hover:bg-white/10">
        <SheetHeader className="h-20 justify-center border-b border-cream/20 px-5">
          <SheetTitle className="font-serif text-2xl font-normal text-cream">{site.name}</SheetTitle>
          <SheetDescription className="sr-only">Điều hướng trang</SheetDescription>
        </SheetHeader>

        <ul className="flex flex-col px-5 py-6">
          <li>
            <Link href="/" onClick={() => setOpen(false)} className={cn(serifDisplay, "block py-2 text-[34px]")}>
              Trang chủ
            </Link>
          </li>
          {navLinks.map((l) => (
            <li key={l.key}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.key ? "page" : undefined}
                className={cn(serifDisplay, "block py-2 text-[34px]", active === l.key && "italic")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto px-5 pb-8">
          <Separator className="bg-cream/20" />
          <dl className="mt-6 space-y-1 text-sm text-cream/70">
            <dt className="sr-only">Giờ mở cửa</dt>
            <dd>Mở cửa {site.hours}</dd>
            <dt className="sr-only">Địa chỉ</dt>
            <dd>{site.address}</dd>
          </dl>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <Button asChild variant="light">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Chỉ đường
              </a>
            </Button>
            <Button asChild variant="outline-light">
              <a href={`tel:${site.phone}`}>Gọi cho quán</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
