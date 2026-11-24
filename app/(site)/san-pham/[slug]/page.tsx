import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/site/add-to-cart";
import { SiteBreadcrumb } from "@/components/site/page-intro";
import { ProductGrid } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { SiteNav } from "@/components/site/site-nav";
import { Badge } from "@/components/ui/badge";
import { getProduct, getRelated, products } from "@/lib/catalog";
import { site } from "@/lib/site";
import { gutter, sectionTitle, serifDisplay } from "@/lib/styles";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/san-pham/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: `${product.note}. ${product.description[0]}` };
}

export default async function ProductPage({ params }: PageProps<"/san-pham/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const related = await getRelated(product);
  const isBean = product.kind === "bean";
  const parent = isBean ? { label: "Cà phê hạt", href: "/ca-phe-hat" } : { label: "Thực đơn", href: "/thuc-don" };

  return (
    <>
      <SiteNav active={isBean ? "ca-phe-hat" : "thuc-don"} />
      <main>
        <section className="grid bg-paper md:grid-cols-2">
          <div className="relative aspect-[4/5] bg-latte md:sticky md:top-0 md:h-svh md:self-start md:aspect-auto">
            <Image
              src={product.img}
              alt={product.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>

          <div className="px-5 pb-20 pt-8 md:px-[10%] md:pb-28 md:pt-12">
            <SiteBreadcrumb crumbs={[parent, { label: product.name }]} />

            <Reveal className="mt-10 md:mt-16">
              {product.badge && <Badge className="mb-5 h-6 bg-latte px-2 text-xs font-semibold text-espresso">{product.badge}</Badge>}
              <h1 className={`${serifDisplay} text-[40px] italic md:text-[56px]`}>{product.name}</h1>
              <p className="mt-3 text-[15px] text-muted-foreground">{product.note}</p>

              <div className="mt-8 space-y-4 text-base leading-relaxed">
                {product.description.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              {product.tastingNotes && (
                <ul className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold" aria-label="Hương vị">
                  {product.tastingNotes.map((n, i) => (
                    <li key={n} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden className="h-[0.9em] w-px bg-espresso/30" />}
                      {n}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10">
                <AddToCart product={product} />
              </div>

              <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                {isBean
                  ? "Giao toàn quốc, thanh toán khi nhận hàng. Hạt được rang trong vòng 7 ngày trước khi gửi."
                  : `Nhận tại quán hoặc giao trong bán kính ${site.deliveryRadius}. Thanh toán khi nhận.`}
              </p>

              {product.details && (
                <dl className="mt-12 border-b border-espresso/15">
                  {product.details.map((d) => (
                    <div key={d.term} className="grid grid-cols-[140px_1fr] gap-6 border-t border-espresso/15 py-4">
                      <dt className="text-sm font-semibold text-muted-foreground">{d.term}</dt>
                      <dd className="text-[15px]">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Reveal>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-cream pb-20 pt-16 md:pb-28 md:pt-20">
            <Reveal className={`${gutter} mb-8 md:mb-10`}>
              <h2 className={sectionTitle}>
                Có thể bạn <em>cũng thích</em>
              </h2>
            </Reveal>
            <ProductGrid products={related} />
          </section>
        )}
      </main>
    </>
  );
}
