import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/lib/content";

/** Hairline accordion (shadcn Accordion / Radix). Answers stay in the DOM, so they are indexable. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="border-t border-espresso/15">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q} className="border-b border-espresso/15">
          <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline md:text-[17px]">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
