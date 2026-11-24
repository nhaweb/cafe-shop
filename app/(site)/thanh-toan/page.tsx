import type { Metadata } from "next";
import { CheckoutForm } from "@/components/site/checkout-form";
import { SiteBreadcrumb } from "@/components/site/page-intro";
import { SiteNav } from "@/components/site/site-nav";
import { gutter, pageTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Đặt hàng",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-cream pb-20 md:pb-28">
        <div className={`${gutter} pt-10 md:pt-14`}>
          <SiteBreadcrumb crumbs={[{ label: "Đặt hàng" }]} />
          <h1 className={`${pageTitle} mb-12 mt-10 md:mb-16 md:mt-14`}>
            Hoàn tất <em>đơn hàng</em>
          </h1>
          <CheckoutForm />
        </div>
      </main>
    </>
  );
}
