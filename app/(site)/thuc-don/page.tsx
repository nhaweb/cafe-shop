import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { ProductGrid } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { SiteNav } from "@/components/site/site-nav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMenuCategories, getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";
import { gutter, serifDisplay } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Thực đơn",
  description: `Thực đơn đồ uống và bánh của ${site.name}: cà phê phin, bạc xỉu, cà phê muối, trà đào và croissant.`,
};

export default async function MenuPage() {
  const [categories, items] = await Promise.all([getMenuCategories(), getProducts(["drink", "food"])]);
  const tabs = [{ slug: "tat-ca", title: "Tất cả" }, ...categories];

  return (
    <>
      <SiteNav active="thuc-don" />
      <main className="bg-paper">
        <PageIntro
          crumbs={[{ label: "Thực đơn" }]}
          title={
            <>
              <em>Hôm nay</em> uống gì?
            </>
          }
          lead={`Pha tại quầy mỗi ngày từ ${site.hours}. Chọn món, tuỳ chỉnh cỡ ly, đá, độ ngọt rồi đặt để mang đi hoặc giao trong bán kính ${site.deliveryRadius}.`}
        />

        <Tabs defaultValue="tat-ca" className="gap-0 pb-14 md:pb-20">
          <div className={gutter}>
            <TabsList variant="line" className="mb-10 w-full justify-start group-data-horizontal/tabs:h-auto gap-6 overflow-x-auto border-b border-espresso/15 p-0 md:gap-8">
              {tabs.map((t) => (
                <TabsTrigger
                  key={t.slug}
                  value={t.slug}
                  className="h-11 flex-none px-0 text-[15px] font-semibold text-muted-foreground hover:text-espresso data-active:text-espresso after:bg-espresso group-data-horizontal/tabs:after:bottom-0 group-data-horizontal/tabs:after:h-0.5"
                >
                  {t.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((t) => (
            <TabsContent key={t.slug} value={t.slug}>
              <ProductGrid
                headingLevel="h2"
                products={t.slug === "tat-ca" ? items : items.filter((p) => p.category === t.slug)}
              />
            </TabsContent>
          ))}
        </Tabs>

        <section className="border-t border-espresso/25 bg-paper">
          <Reveal className={`${gutter} flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16`}>
            <p className={`${serifDisplay} max-w-2xl text-[28px] md:text-[36px]`}>
              Muốn pha ở nhà? Quán bán <em>chính hạt này</em>.
            </p>
            <Button asChild>
              <Link href="/ca-phe-hat">Xem cà phê hạt</Link>
            </Button>
          </Reveal>
        </section>
      </main>
    </>
  );
}
