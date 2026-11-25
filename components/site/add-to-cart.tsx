"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { defaultOptions, priceWithOptions, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { QuantityStepper } from "./quantity-stepper";

/** Option pickers (shadcn ToggleGroup), quantity and the add-to-cart button for the product page. */
export function AddToCart({ product }: { product: Product }) {
  const [selected, setSelected] = useState(() => defaultOptions(product));
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);

  const unitPrice = priceWithOptions(product, selected);

  // Mobile: a thumb-zone bar with price + CTA until the real CTA row scrolls into view.
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top > 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function handleAdd() {
    add(
      {
        slug: product.slug,
        name: product.name,
        kind: product.kind,
        img: product.img,
        options: selected,
        unitPrice,
      },
      qty,
    );
    toast.dismiss();
    toast.success(`Đã thêm ${qty} × ${product.name} vào giỏ`, {
      duration: 3000,
      action: { label: "Xem giỏ", onClick: () => setOpen(true) },
    });
    setQty(1);
  }

  return (
    <div className="flex flex-col gap-7">
      {product.optionGroups?.map((g) => (
        <fieldset key={g.id}>
          <legend className="mb-3 text-sm font-semibold">
            {g.label}
            <span className="font-normal text-muted-foreground"> · {selected[g.id]}</span>
          </legend>
          <ToggleGroup
            type="single"
            variant="outline"
            spacing={1}
            value={selected[g.id]}
            onValueChange={(v) => v && setSelected((s) => ({ ...s, [g.id]: v }))}
            className="flex-wrap"
            aria-label={g.label}
          >
            {g.choices.map((c) => (
              <ToggleGroupItem
                key={c.label}
                value={c.label}
                className="h-10 border-espresso/30 px-3.5 font-semibold hover:bg-transparent hover:border-espresso data-[state=on]:border-espresso data-[state=on]:bg-espresso data-[state=on]:text-cream"
              >
                {c.label}
                {c.delta > 0 && <span className="font-normal opacity-70">+{formatPrice(c.delta)}</span>}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </fieldset>
      ))}

      <div className="flex flex-col gap-4 border-t border-espresso/15 pt-7">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-semibold">Thành tiền</span>
          <span className="text-2xl font-semibold tabular-nums" aria-live="polite">
            {formatPrice(unitPrice * qty)}
          </span>
        </div>
        <div ref={ctaRef} className="flex gap-2">
          <QuantityStepper value={qty} onChange={setQty} />
          <Button size="lg" className="flex-1" onClick={handleAdd}>
            Thêm vào giỏ
          </Button>
        </div>
      </div>

      <div
        aria-hidden={!showBar}
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-espresso/15 bg-cream px-5 py-3 transition-transform duration-300 ease-out md:hidden motion-reduce:transition-none ${showBar ? "translate-y-0" : "translate-y-full"}`}
      >
        <span className="text-lg font-semibold tabular-nums">{formatPrice(unitPrice * qty)}</span>
        <Button size="lg" className="flex-1" onClick={handleAdd}>
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
}
