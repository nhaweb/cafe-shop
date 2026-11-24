import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { gutter, pageTitle } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export type Crumb = { label: string; href?: string };

type PageIntroProps = {
  crumbs: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  /** Right-hand slot on desktop (e.g. a button). */
  aside?: ReactNode;
  className?: string;
};

/** Opening block of inner pages: breadcrumb, serif H1, lead paragraph. */
export function PageIntro({ crumbs, title, lead, aside, className }: PageIntroProps) {
  return (
    <div className={cn(gutter, "pb-12 pt-10 md:pb-16 md:pt-14", className)}>
      <SiteBreadcrumb crumbs={crumbs} />
      <Reveal className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1 className={pageTitle}>{title}</h1>
          {lead && <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{lead}</p>}
        </div>
        {aside}
      </Reveal>
    </div>
  );
}

export function SiteBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const all: Crumb[] = [{ label: "Trang chủ", href: "/" }, ...crumbs];
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-[13px] text-muted-foreground">
        {all.map((c, i) => (
          <Fragment key={c.label}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {c.href && i < all.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={c.href}>{c.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{c.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
