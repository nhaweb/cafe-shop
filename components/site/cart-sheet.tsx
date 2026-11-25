"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cartCount, cartTotal, useCart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { serifDisplay } from "@/lib/styles";
import { QuantityStepper } from "./quantity-stepper";

/** Global cart drawer, mounted once in the site layout. Also rehydrates the persisted cart after mount. */
export function CartSheet() {
  const { items, open, setOpen } = useCart();

  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);

  // A toast must never sit on top of the cart's checkout button.
  useEffect(() => {
    if (open) toast.dismiss();
  }, [open]);

  const count = cartCount(items);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full gap-0 bg-cream sm:max-w-md">
        <SheetHeader className="h-20 flex-row items-center gap-3 border-b border-border px-5">
          <SheetTitle className={`${serifDisplay} text-[28px]`}>Giỏ hàng</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">{count} món</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-5 px-5">
            <p className={`${serifDisplay} text-[28px]`}>
              Giỏ hàng <em>đang trống.</em>
            </p>
            <p className="text-[15px] text-muted-foreground">Chọn một ly cà phê hoặc một túi hạt để bắt đầu.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/thuc-don">Xem thực đơn</Link>
              </Button>
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href="/ca-phe-hat">Cà phê hạt</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5">
              {items.map((item) => (
                <CartLine key={item.id} item={item} onNavigate={() => setOpen(false)} />
              ))}
            </ul>
            <SheetFooter className="gap-4 border-t border-border p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold">Tạm tính</span>
                <span className="text-lg font-semibold tabular-nums">{formatPrice(cartTotal(items))}</span>
              </div>
              <p className="text-[13px] text-muted-foreground">
                Phí giao hàng (nếu có) được quán xác nhận khi gọi lại. Thanh toán khi nhận hàng.
              </p>
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link href="/thanh-toan">Đặt hàng</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartLine({ item, onNavigate }: { item: CartItem; onNavigate: () => void }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const options = Object.values(item.options);

  return (
    <li className="flex gap-4 border-b border-border py-5 last:border-b-0">
      <Link href={`/san-pham/${item.slug}`} onClick={onNavigate} className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-espresso/10">
        <Image src={item.img} alt="" fill sizes="80px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/san-pham/${item.slug}`} onClick={onNavigate} className="font-serif text-lg italic leading-tight">
            {item.name}
          </Link>
          <span className="shrink-0 text-sm font-semibold tabular-nums">{formatPrice(item.unitPrice * item.qty)}</span>
        </div>
        {options.length > 0 && <p className="text-[13px] text-muted-foreground">{options.join(" · ")}</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantityStepper size="sm" value={item.qty} onChange={(q) => setQty(item.id, q)} />
          <Button variant="link" size="sm" className="text-[13px]" onClick={() => remove(item.id)}>
            Xoá
          </Button>
        </div>
      </div>
    </li>
  );
}
