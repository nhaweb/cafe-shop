"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart, useCartHydrated } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { pageTitle } from "@/lib/styles";

/** Shows the order just placed (kept in the persisted cart store until the backend exists). */
export function OrderConfirmation() {
  const hydrated = useCartHydrated();
  const order = useCart((s) => s.lastOrder);

  if (!hydrated) return <div className="min-h-[50vh]" aria-busy="true" />;

  if (!order) {
    return (
      <div className="flex min-h-[40vh] flex-col items-start justify-center gap-6">
        <h1 className={pageTitle}>
          Chưa có <em>đơn hàng nào</em>
        </h1>
        <Button asChild>
          <Link href="/thuc-don">Xem thực đơn</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-20">
      <div>
        <p className="text-sm font-semibold text-muted-foreground">Mã đơn {order.code}</p>
        <h1 className={`${pageTitle} mt-4`}>
          Cảm ơn {order.name}, <em>quán đã nhận đơn.</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Quán sẽ gọi số <span className="font-semibold text-espresso">{order.phone}</span> trong ít phút để xác nhận
          {order.method === "delivery" ? " và báo phí giao hàng." : ". Hẹn gặp bạn ở quầy!"} Cần đổi gì, gọi{" "}
          <a href={`tel:${site.phone}`} className="underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/">Về trang chủ</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ca-phe-hat">Xem cà phê hạt</Link>
          </Button>
        </div>
      </div>

      <div className="bg-latte p-5 md:p-8">
        <h2 className="font-serif text-2xl font-light">Chi tiết đơn</h2>
        <dl className="mt-6 border-b border-espresso/15 text-[15px]">
          <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-espresso/15 py-3">
            <dt className="text-muted-foreground">Nhận hàng</dt>
            <dd>{order.method === "pickup" ? `Tại quán · ${site.address}` : `Giao tới ${order.address}`}</dd>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-espresso/15 py-3">
            <dt className="text-muted-foreground">Thanh toán</dt>
            <dd>Khi nhận hàng</dd>
          </div>
        </dl>
        <ul className="mt-4">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4 py-2 text-[15px]">
              <span>
                {i.qty} × <span className="font-serif italic">{i.name}</span>
                <span className="block text-[13px] text-muted-foreground">{Object.values(i.options).join(" · ")}</span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums">{formatPrice(i.unitPrice * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-espresso/15 pt-4 text-lg font-semibold">
          <span>Tổng</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
