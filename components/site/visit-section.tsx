import Image from "next/image";
import { Button } from "@/components/ui/button";
import gheQuanImg from "@/public/images/ghe-quan.jpg";
import { site } from "@/lib/site";
import { eyebrow, focusRing, linkUnderline, serifDisplay } from "@/lib/styles";
import { Reveal } from "./reveal";

/** 50/50 sand panel: photo left, address / hours / phone right. Used on Home and Liên hệ. */
export function VisitSection({ id = "ghe-quan", headingLevel = "h2" }: { id?: string; headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const details = [
    { term: "Địa chỉ", value: site.address },
    { term: "Giờ mở cửa", value: `${site.hours} · ${site.hoursNote}` },
    { term: "Điện thoại", value: site.phone, href: `tel:${site.phone}` },
    { term: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <section id={id} className="grid scroll-mt-4 bg-latte md:min-h-[720px] md:grid-cols-2">
      <div className="relative aspect-[4/5] md:aspect-auto">
        <Image
          src={gheQuanImg}
          alt="Barista đứng sau quầy, ly cà phê đá trên quầy"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover"
        />
      </div>

      <div className="flex items-center px-5 py-16 md:px-[12%] md:py-20">
        <Reveal className="w-full max-w-lg">
          <p className={eyebrow}>Ghé quán</p>
          <Heading className={`${serifDisplay} mt-4 text-[34px] md:text-[46px]`}>
            Hẹn gặp bạn ở <em>{site.name}</em>
          </Heading>

          <dl className="mt-10 border-b border-espresso/15">
            {details.map((d) => (
              <div key={d.term} className="grid gap-1 border-t border-espresso/15 py-4 md:grid-cols-[140px_1fr] md:gap-6">
                <dt className="text-sm font-semibold text-muted-foreground">{d.term}</dt>
                <dd className="text-[15px]">
                  {d.href ? (
                    <a href={d.href} className={`${linkUnderline} ${focusRing}`}>
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-2">
            <Button asChild>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                Chỉ đường
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`tel:${site.phone}`}>Gọi cho quán</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
