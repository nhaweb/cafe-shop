import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { FaqList } from "@/components/site/faq-list";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { SiteNav } from "@/components/site/site-nav";
import { VisitSection } from "@/components/site/visit-section";
import { visitFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import { eyebrow, focusRing, gutter, linkUnderline, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Địa chỉ, giờ mở cửa và cách liên hệ ${site.name} ở ${site.city}.`,
};

export default function ContactPage() {
  const channels = [
    { label: "Điện thoại", value: site.phone, href: `tel:${site.phone}` },
    { label: "Zalo", value: "Nhắn Zalo cho quán", href: site.zaloUrl },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...site.social.map((s) => ({ label: s.label, value: `${site.name} trên ${s.label}`, href: s.href })),
  ];

  return (
    <>
      <SiteNav active="lien-he" />
      <main>
        <section className="bg-paper pb-14 md:pb-20">
          <PageIntro
            crumbs={[{ label: "Liên hệ" }]}
            title={
              <>
                Nói chuyện <em>với quán</em>
              </>
            }
            lead="Hỏi về đơn hàng, đặt bàn cho nhóm hay chỉ muốn góp ý một ly cà phê: để lại lời nhắn, quán trả lời trong giờ mở cửa."
          />
          <div className={`${gutter} grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-20`}>
            <Reveal>
              <dl className="border-b border-espresso/15">
                {channels.map((c) => (
                  <div key={c.label} className="grid grid-cols-[120px_1fr] gap-4 border-t border-espresso/15 py-4">
                    <dt className="text-sm font-semibold text-muted-foreground">{c.label}</dt>
                    <dd className="text-[15px]">
                      <a href={c.href} className={`${linkUnderline} ${focusRing}`}>
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <VisitSection id="dia-chi" />

        <section className="bg-paper py-14 md:py-20">
          <div className={`${gutter} grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20`}>
            <Reveal>
              <p className={eyebrow}>Trước khi ghé</p>
              <h2 className={`${sectionTitle} mt-4`}>
                Câu hỏi <em>thường gặp</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <FaqList items={visitFaqs} />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
