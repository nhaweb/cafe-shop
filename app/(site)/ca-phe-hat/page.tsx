import type { Metadata } from "next";
import Image from "next/image";
import { FaqList } from "@/components/site/faq-list";
import { PageIntro } from "@/components/site/page-intro";
import { ProductGrid } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { SiteNav } from "@/components/site/site-nav";
import beansImg from "@/public/images/b-hat-rang-2.jpg";
import { getProducts } from "@/lib/catalog";
import { orderFaqs, promises } from "@/lib/content";
import { site } from "@/lib/site";
import { eyebrow, gutter, sectionTitle, serifDisplay } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Cà phê hạt",
  description: `Cà phê hạt và bột rang mới của ${site.name}: Robusta Đắk Lắk, Arabica Cầu Đất, Pml Blend. Xay theo yêu cầu, giao toàn quốc.`,
};

const brewGuide = [
  { method: "Phin", grind: "Xay vừa", ratio: "20g cà phê · 60–80ml nước 92–96°C", pick: "Robusta Đắk Lắk, Pml Blend" },
  { method: "Máy espresso", grind: "Xay mịn", ratio: "18g · 36g espresso trong 25–30 giây", pick: "Pml Blend, Arabica Cầu Đất" },
  { method: "Pour-over", grind: "Xay vừa – thô", ratio: "15g · 250ml nước 92°C", pick: "Arabica Cầu Đất" },
];

export default async function BeansPage() {
  const beans = await getProducts(["bean"]);

  return (
    <>
      <SiteNav active="ca-phe-hat" />
      <main>
        <div className="bg-paper">
          <PageIntro
            crumbs={[{ label: "Cà phê hạt" }]}
            title={
              <>
                Cà phê hạt, <em>rang mới</em>
              </>
            }
            lead="Những mẻ hạt quán dùng mỗi ngày, rang theo mẻ nhỏ và gửi đi trong 24 giờ. Chọn khối lượng và độ xay hợp với cách bạn pha."
          />
          <ProductGrid products={beans} columns={4} headingLevel="h2" className="pb-14 md:pb-20" />
        </div>

        {/* Promises strip */}
        <section className="bg-latte text-espresso">
          <div className={`${gutter} grid gap-0 py-14 md:grid-cols-3 md:py-16`}>
            {promises.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 80}
                className="border-t border-espresso/15 py-6 first:border-t-0 md:border-l md:border-t-0 md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0"
              >
                <h2 className="font-serif text-2xl font-light italic">{p.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Brew guide: 50/50 photo + table */}
        <section className="grid bg-paper md:grid-cols-2">
          <div className="relative aspect-[5/4] md:aspect-auto md:min-h-[560px]">
            <Image src={beansImg} alt="Hạt cà phê rang đổ ra từ bao bố" fill sizes="(min-width: 768px) 50vw, 100vw" placeholder="blur" className="object-cover" />
          </div>
          <div className="flex items-center px-5 py-12 md:px-[10%] md:py-16">
            <Reveal className="w-full max-w-xl">
              <p className={eyebrow}>Hướng dẫn chọn hạt</p>
              <h2 className={`${serifDisplay} mt-4 text-[34px] md:text-[46px]`}>
                Pha thế nào, <em>chọn hạt nấy</em>
              </h2>
              <dl className="mt-10 border-b border-espresso/15">
                {brewGuide.map((g) => (
                  <div key={g.method} className="grid gap-1 border-t border-espresso/15 py-5 md:grid-cols-[140px_1fr] md:gap-6">
                    <dt className="font-serif text-xl italic">{g.method}</dt>
                    <dd className="space-y-1 text-[15px]">
                      <p>
                        <span className="font-semibold">{g.grind}</span>
                        <span className="text-muted-foreground"> · {g.ratio}</span>
                      </p>
                      <p className="text-muted-foreground">Gợi ý: {g.pick}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-espresso/25 bg-paper py-14 md:py-20">
          <div className={`${gutter} grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20`}>
            <Reveal>
              <p className={eyebrow}>Giao hàng & thanh toán</p>
              <h2 className={`${sectionTitle} mt-4`}>
                Câu hỏi <em>thường gặp</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <FaqList items={orderFaqs.filter((f) => !f.q.includes("đồ uống"))} />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
