import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";
import { Button } from "@/components/ui/button";
import { gutter, pageTitle } from "@/lib/styles";

export function NotFoundContent() {
  return (
    <>
      <SiteNav />
      <main className="bg-cream">
        <div className={`${gutter} flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20`}>
          <p className="text-sm font-semibold text-muted-foreground">Lỗi 404</p>
          <h1 className={pageTitle}>
            Trang này <em>không có ở đây.</em>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Có thể đường dẫn đã thay đổi. Ghé thực đơn hoặc quay về trang chủ nhé.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/thuc-don">Xem thực đơn</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Về trang chủ</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
