import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/site/faq-list";
import { ProductGrid } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { SiteNav } from "@/components/site/site-nav";
import { SpaceCarousel } from "@/components/site/space-carousel";
import { Testimonials } from "@/components/site/testimonials";
import { VisitSection } from "@/components/site/visit-section";
import { Button } from "@/components/ui/button";
import beanShopImg from "@/public/images/b-dong-goi.jpg";
import heroImg from "@/public/images/hero.jpg";
import { getFeatured } from "@/lib/catalog";
import { orderFaqs, promises, spacePhotos } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { eyebrow, focusRing, gutter, label, sectionTitle, serifDisplay } from "@/lib/styles";

export default async function Home() {
  const [drinks, beans] = await Promise.all([getFeatured("drink"), getFeatured("bean")]);
  const signature = drinks.find((d) => d.slug === "ca-phe-den-da");

  return (
    <>
      <Hero signaturePrice={signature ? formatPrice(signature.price) : undefined} />
      <main>
        <FeaturedMenu products={drinks} />
        <About />
        <BeansTeaser products={beans} />
        <Space />
        <Testimonials />
        <OrderFaq />
        <VisitSection />
      </main>
    </>
  );
}

function Hero({ signaturePrice }: { signaturePrice?: string }) {
  const heroRows = [
    { left: "Cà phê đen đá", right: signaturePrice ?? "" },
    { left: "Bạc xỉu", right: "Bán chạy nhất" },
  ];
  const tabs = [
    { label: "Thực đơn", href: "/thuc-don" },
    { label: "Cà phê hạt", href: "/ca-phe-hat" },
    { label: "Ghé quán", href: "#ghe-quan" },
  ];

  return (
    <header className="relative h-[95svh] min-h-[560px] overflow-hidden bg-espresso text-cream md:h-[calc(100svh-46px)] md:min-h-[640px]">
      <Image
        src={heroImg}
        alt="Ly cà phê sữa đá và ly nước lọc trên bàn gỗ dưới nắng"
        fill
        sizes="100vw"
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        // Desktop: zoom + shift right (translate ≤ (scale-1)/2) so the drinks clear the bottom-left copy.
        className="object-cover md:translate-x-[22%] md:scale-[1.45]"
      />

      {/* Scrims: top for the nav, bottom-left for the copy */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/50 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(30_29_26/0.92)_0%,rgb(30_29_26/0.55)_42%,transparent_72%)] md:bg-[radial-gradient(120%_95%_at_0%_100%,rgb(30_29_26/0.9)_0%,rgb(30_29_26/0.4)_45%,transparent_72%)]"
      />

      <SiteNav variant="overlay" />

      {/* Copy anchored bottom-left at a 7% margin; CTA bottom-right */}
      <div className="absolute inset-x-5 bottom-6 z-10 flex flex-col gap-8 md:inset-x-[7%] md:bottom-18 md:flex-row md:items-end md:justify-between">
        <Reveal className="md:w-[46%] md:min-w-[540px]">
          <h1 className={`${serifDisplay} text-[40px] md:text-[64px]`}>
            Cà phê <em>đậm.</em>
            <br />
            Khoảnh khắc <em>tốt hơn.</em>
          </h1>

          {/* One shared grid so the dividers line up across rows */}
          <ul className="mt-7 grid max-w-md grid-cols-[minmax(0,1fr)_1px_auto] items-center gap-x-6 gap-y-1.5 text-[15px] md:gap-x-8">
            {heroRows.map((r) => (
              <li key={r.left} className="contents">
                <span>{r.left}</span>
                <span aria-hidden className="h-[0.9em] w-px bg-cream/60" />
                <span className="font-semibold">{r.right}</span>
              </li>
            ))}
          </ul>

          <ol className="mt-10 flex gap-6 overflow-x-auto border-t border-cream/35 text-[15px] font-semibold md:gap-8">
            {tabs.map((l, i) => (
              <li key={l.href} className="relative shrink-0">
                {i === 0 && <span aria-hidden className="absolute inset-x-0 -top-px h-px bg-cream" />}
                <Link
                  href={l.href}
                  className={`flex h-11 items-center transition-opacity hover:opacity-85 ${i === 0 ? "" : "opacity-50"} ${focusRing}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={150} className="flex flex-col gap-2 md:flex-row">
          <Button asChild variant="outline-light" size="lg" className="w-full md:w-auto">
            <Link href="/ca-phe-hat">Mua cà phê hạt</Link>
          </Button>
          <Button asChild variant="light" size="lg" className="w-full md:w-auto">
            <Link href="/thuc-don">Xem thực đơn</Link>
          </Button>
        </Reveal>
      </div>
    </header>
  );
}

function SectionHead({ eyebrowText, title, href, cta }: { eyebrowText?: string; title: React.ReactNode; href: string; cta: string }) {
  return (
    <Reveal className={`${gutter} mb-8 flex items-end justify-between gap-6 md:mb-10`}>
      <div>
        {eyebrowText && <p className={`${eyebrow} mb-4`}>{eyebrowText}</p>}
        <h2 className={sectionTitle}>{title}</h2>
      </div>
      <Button asChild>
        <Link href={href}>{cta}</Link>
      </Button>
    </Reveal>
  );
}

function FeaturedMenu({ products }: { products: Awaited<ReturnType<typeof getFeatured>> }) {
  return (
    <section id="thuc-don" className="scroll-mt-4 bg-paper pb-20 pt-14 md:pb-28 md:pt-20">
      <SectionHead
        title={
          <>
            Thực đơn <em>cà phê</em>
          </>
        }
        href="/thuc-don"
        cta="Xem toàn bộ"
      />
      <ProductGrid products={products} />
    </section>
  );
}

function About() {
  return (
    <section id="ve-quan" className="scroll-mt-4 bg-coffee px-5 py-24 text-center text-cream md:py-32">
      <Reveal>
        <p className={`${label} text-cream/70`}>Về quán</p>
        <p className={`${serifDisplay} mx-auto mt-6 max-w-4xl text-[28px] md:text-[42px]`}>
          {site.name} là quán cà phê nhỏ ở <em>{site.city}</em> — nơi mỗi ly được pha chậm rãi,
          đậm vị và vừa vặn cho một buổi ngồi lại.
        </p>
        <Button asChild variant="outline-light" className="mt-10">
          <Link href="/ve-quan">Câu chuyện của quán</Link>
        </Button>
      </Reveal>
    </section>
  );
}

function BeansTeaser({ products }: { products: Awaited<ReturnType<typeof getFeatured>> }) {
  return (
    <section className="bg-cream pb-20 md:pb-28">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/5] md:order-2 md:aspect-auto md:min-h-[640px]">
          <Image
            src={beanShopImg}
            alt="Cà phê xay được xúc vào túi giấy trên quầy"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-5 py-16 md:px-[12%] md:py-20">
          <Reveal className="max-w-lg">
            <p className={eyebrow}>Cà phê hạt</p>
            <h2 className={`${serifDisplay} mt-4 text-[34px] md:text-[46px]`}>
              Mang vị của quán <em>về nhà</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Chính những mẻ hạt quán dùng mỗi ngày, rang mới và đóng túi để bạn pha phin, pha máy hay
              pour-over tại nhà.
            </p>
            <dl className="mt-10 border-b border-espresso/15">
              {promises.map((p) => (
                <div key={p.title} className="grid gap-1 border-t border-espresso/15 py-4 md:grid-cols-[180px_1fr] md:gap-6">
                  <dt className="text-sm font-semibold">{p.title}</dt>
                  <dd className="text-[15px] text-muted-foreground">{p.body}</dd>
                </div>
              ))}
            </dl>
            <Button asChild className="mt-10">
              <Link href="/ca-phe-hat">Xem tất cả cà phê hạt</Link>
            </Button>
          </Reveal>
        </div>
      </div>
      <ProductGrid products={products} columns={3} className="mt-1" />
    </section>
  );
}

function Space() {
  return (
    <section className="overflow-hidden bg-espresso py-20 text-cream md:py-28">
      <div className={gutter}>
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`${label} text-cream/70`}>Không gian</p>
            <h2 className={`${sectionTitle} mt-4`}>
              Một chỗ ngồi <em>yên</em>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-cream/70">
            Cửa kính lớn, nhiều ánh sáng, bàn gỗ và ổ cắm ở mọi góc. Đến để làm việc, đọc sách hay chỉ ngồi
            nhìn phố.
          </p>
        </Reveal>
        <SpaceCarousel photos={spacePhotos} tone="dark" />
      </div>
    </section>
  );
}

function OrderFaq() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className={`${gutter} grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20`}>
        <Reveal>
          <p className={eyebrow}>Đặt hàng</p>
          <h2 className={`${sectionTitle} mt-4`}>
            Câu hỏi <em>thường gặp</em>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Không thấy câu trả lời? Gọi {site.phone} hoặc{" "}
            <Link href="/lien-he" className="underline decoration-espresso/30 underline-offset-4 hover:decoration-espresso">
              nhắn cho quán
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={100}>
          <FaqList items={orderFaqs.slice(0, 4)} />
        </Reveal>
      </div>
    </section>
  );
}
