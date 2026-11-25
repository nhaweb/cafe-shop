import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { focusRing, gutter, imageZoom } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function ProductCard({
  product,
  sizes,
  headingLevel: Heading = "h3",
}: {
  product: Product;
  sizes: string;
  /** h2 when the grid sits directly under the page h1, h3 under a section h2. */
  headingLevel?: "h2" | "h3";
}) {
  const p = product;
  return (
    <Link href={`/san-pham/${p.slug}`} className={cn("group block", focusRing)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-espresso/10 md:aspect-square">
        <Image src={p.img} alt={p.alt} fill sizes={sizes} placeholder="blur" className={imageZoom} />
        {p.badge && (
          <Badge className="absolute left-3 top-3 h-6 bg-cream px-2 text-xs font-semibold text-espresso">{p.badge}</Badge>
        )}
      </div>
      <div className="mt-3 flex flex-col gap-1 pr-3 text-[13px] md:flex-row md:justify-between md:gap-4 md:pr-5 md:text-sm">
        <div className="min-w-0">
          <Heading className="font-serif text-base italic md:text-lg">{p.name}</Heading>
          <p className="text-muted-foreground">{p.note}</p>
        </div>
        <p className="shrink-0 font-semibold">
          {p.optionGroups?.some((g) => g.choices.some((c) => c.delta > 0)) && (
            <span className="font-normal text-muted-foreground">Từ </span>
          )}
          {formatPrice(p.price)}
        </p>
      </div>
    </Link>
  );
}

type ProductGridProps = {
  products: Product[];
  /** 4 = default menu grid; 3 = wider cards (beans). */
  columns?: 3 | 4;
  className?: string;
  headingLevel?: "h2" | "h3";
};

/** Edge-to-edge grid with a 4px gutter between photos (CLAUDE.md → Layout). */
export function ProductGrid({ products, columns = 4, className, headingLevel }: ProductGridProps) {
  const sizes = columns === 4 ? "(min-width: 768px) 25vw, 50vw" : "(min-width: 768px) 33vw, 50vw";
  return (
    <div
      className={cn(
        gutter,
        "grid grid-cols-2 gap-x-1 gap-y-8 md:gap-y-12",
        columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % columns) * 80}>
          <ProductCard product={p} sizes={sizes} headingLevel={headingLevel} />
        </Reveal>
      ))}
    </div>
  );
}
