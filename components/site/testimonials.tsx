import { testimonials } from "@/lib/content";
import { eyebrow, gutter, sectionTitle } from "@/lib/styles";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <section className="bg-cream py-14 md:py-20">
      <div className={gutter}>
        <Reveal>
          <p className={eyebrow}>Khách nói gì</p>
          <h2 className={`${sectionTitle} mt-4`}>
            Những ly <em>được nhớ</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="md:border-l md:border-espresso/15 md:px-8 md:first:border-l-0 md:first:pl-0">
              <figure className="flex h-full flex-col border-t border-espresso/15 pt-6 md:border-t-0 md:pt-0">
                <blockquote className="font-serif text-[22px] font-light leading-snug md:text-[24px]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
