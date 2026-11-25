import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { SiteBreadcrumb } from "@/components/site/page-intro";
import { SiteNav } from "@/components/site/site-nav";
import { SpaceCarousel } from "@/components/site/space-carousel";
import { Button } from "@/components/ui/button";
import khongGianImg from "@/public/images/store.jpg";
import phinImg from "@/public/images/phin.jpg";
import quayBarImg from "@/public/images/quay-bar.jpg";
import { spacePhotos } from "@/lib/content";
import { site } from "@/lib/site";
import {
  eyebrow,
  gutter,
  label,
  sectionTitle,
  serifDisplay,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Về quán",
  description: `Câu chuyện của ${site.name}: một quán cà phê nhỏ ở ${site.city}, pha chậm, rang mới và luôn có chỗ ngồi yên.`,
};

const values = [
  {
    n: "01",
    title: "Hạt Việt, rang mới",
    body: "Robusta Đắk Lắk và Arabica Cầu Đất, mua trực tiếp từ nông hộ và rang theo mẻ nhỏ mỗi tuần.",
  },
  {
    n: "02",
    title: "Pha chậm, đúng vị",
    body: "Phin vẫn là trung tâm của quầy bar. Mỗi ly được pha khi bạn gọi, không pha sẵn.",
  },
  {
    n: "03",
    title: "Chỗ ngồi yên",
    body: "Nhạc nhỏ, ánh sáng tự nhiên, wifi ổn định. Ngồi bao lâu cũng được.",
  },
];

const facts = [
  { value: "[2019]", label: "Năm mở cửa" },
  { value: "[2]", label: "Vùng trồng hợp tác" },
  { value: "[40+]", label: "Chỗ ngồi" },
  { value: "[300+]", label: "Ly mỗi ngày" },
];

export default function AboutPage() {
  return (
    <>
      <SiteNav active="ve-quan" />
      <main>
        {/* Photo hero */}
        <header className="relative h-[70svh] min-h-[480px] overflow-hidden bg-espresso text-cream">
          <Image
            src={khongGianImg}
            alt="Không gian quán với cửa kính lớn và bàn ghế gỗ"
            fill
            sizes="100vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(44_34_30/0.9)_0%,rgb(44_34_30/0.45)_45%,rgb(44_34_30/0.15)_100%)]"
          />
          <div className="absolute inset-x-5 top-8 z-10 [&_*]:text-cream/90 md:inset-x-[7%]">
            <SiteBreadcrumb crumbs={[{ label: "Về quán" }]} />
          </div>
          <Reveal className="absolute inset-x-5 bottom-10 z-10 md:inset-x-[7%] md:bottom-18">
            <p className={`${label} text-cream/90`}>Về quán</p>
            <h1
              className={`${serifDisplay} mt-4 max-w-3xl text-[40px] md:text-[64px]`}
            >
              Một quán nhỏ, <em>pha chậm</em> từng ly
            </h1>
          </Reveal>
        </header>

        {/* Story */}
        <section className="bg-paper py-14 md:py-20">
          <div
            className={`${gutter} grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-20 md:px-[7%]`}
          >
            <Reveal>
              <p className={eyebrow}>Câu chuyện</p>
              <h2 className={`${sectionTitle} mt-4`}>
                Bắt đầu từ <em>một cái phin</em>
              </h2>
            </Reveal>
            <Reveal
              delay={100}
              className="max-w-2xl space-y-5 text-base leading-relaxed md:text-[17px]"
            >
              <p>
                {site.name} bắt đầu như một quầy cà phê phin nhỏ ở {site.city}.
                [Viết lại đoạn này bằng câu chuyện thật của quán: ai mở quán, vì
                sao, năm nào.]
              </p>
              <p>
                Đến hôm nay, quầy bar vẫn giữ phin làm trung tâm, bên cạnh máy
                espresso cho những ly latte và americano. Hạt được chọn từ Tây
                Nguyên và Lâm Đồng, rang mỗi tuần để ly nào cũng đậm và thơm.
              </p>
              <p className="text-muted-foreground">
                Chúng tôi muốn quán là nơi bạn có thể ghé vội một ly mang đi,
                hoặc ngồi cả buổi chiều mà không ai giục.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Facts strip */}
        <section className="bg-latte text-espresso">
          <dl
            className={`${gutter} grid grid-cols-2 py-14 md:grid-cols-4 md:py-16`}
          >
            {facts.map((f, i) => (
              <Reveal
                key={f.label}
                delay={i * 60}
                className="border-espresso/15 px-0 py-4 md:border-l md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0"
              >
                <dt className="text-sm text-muted-foreground">{f.label}</dt>
                <dd
                  className={`${serifDisplay} mt-2 text-[40px] md:text-[56px]`}
                >
                  {f.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* Values: alternating 50/50 */}
        <section className="grid bg-paper md:grid-cols-2">
          <div className="relative aspect-[5/4] md:aspect-auto md:min-h-[560px]">
            <Image
              src={phinImg}
              alt="Phin cà phê nhỏ giọt xuống ly thuỷ tinh"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-5 py-12 md:px-[12%] md:py-16">
            <Reveal className="w-full max-w-lg">
              <p className={eyebrow}>Điều chúng tôi giữ</p>
              <h2 className={`${serifDisplay} mt-4 text-[34px] md:text-[46px]`}>
                Ba thứ <em>không đổi</em>
              </h2>
              <ol className="mt-10 border-b border-espresso/15">
                {values.map((v) => (
                  <li
                    key={v.n}
                    className="grid grid-cols-[48px_1fr] gap-4 border-t border-espresso/15 py-5"
                  >
                    <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                      {v.n}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl italic">{v.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                        {v.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section className="grid border-t border-espresso/25 bg-paper md:grid-cols-2">
          <div className="flex items-center px-5 py-16 md:order-1 md:px-[12%] md:py-20">
            <Reveal className="w-full max-w-lg">
              <p className={eyebrow}>Đội ngũ</p>
              <h2 className={`${serifDisplay} mt-4 text-[34px] md:text-[46px]`}>
                Những người <em>sau quầy</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                [Giới thiệu ngắn về barista, người rang hạt và đội ngũ của
                quán.] Họ nhớ tên khách quen, nhớ ly quen, và luôn sẵn lòng gợi
                ý một loại hạt mới.
              </p>
            </Reveal>
          </div>
          <div className="relative aspect-[5/4] md:order-2 md:aspect-auto md:min-h-[560px]">
            <Image
              src={quayBarImg}
              alt="Quầy bar với máy pha espresso và kệ cà phê hạt"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </section>

        {/* Gallery */}
        <section className="overflow-hidden bg-latte py-14 text-espresso md:py-20">
          <div className={gutter}>
            <Reveal className="mb-10">
              <p className={`${label} text-muted-foreground`}>Không gian</p>
              <h2 className={`${sectionTitle} mt-4`}>
                Ghé một lần, <em>ngồi lâu hơn</em>
              </h2>
            </Reveal>
            <SpaceCarousel photos={spacePhotos} tone="light" />
          </div>
        </section>

        <section className="bg-paper">
          <Reveal
            className={`${gutter} flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20`}
          >
            <p
              className={`${serifDisplay} max-w-2xl text-[28px] md:text-[40px]`}
            >
              Hẹn gặp bạn <em>ở quán</em>.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/lien-he">Giờ mở cửa & chỉ đường</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/thuc-don">Xem thực đơn</Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
