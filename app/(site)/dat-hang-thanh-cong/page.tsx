import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/site/order-confirmation";
import { SiteNav } from "@/components/site/site-nav";
import { gutter } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-cream py-16 md:py-24">
        <div className={gutter}>
          <OrderConfirmation />
        </div>
      </main>
    </>
  );
}
