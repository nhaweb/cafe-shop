import Link from "next/link";
import { site } from "@/lib/site";
import { focusRing, gutter, serifDisplay } from "@/lib/styles";
import { FitText } from "./fit-text";

const columns = [
  {
    title: "Cửa hàng",
    items: [
      { label: "Thực đơn", href: "/thuc-don" },
      { label: "Cà phê hạt", href: "/ca-phe-hat" },
      { label: "Giỏ hàng & đặt hàng", href: "/thanh-toan" },
      { label: "Giao hàng & đổi trả", href: "/chinh-sach" },
    ],
  },
  {
    title: "Ghé quán",
    items: [
      { label: site.address, href: site.mapsUrl },
      { label: site.hours, href: "/lien-he" },
      { label: site.phone, href: `tel:${site.phone}` },
      { label: "Về quán", href: "/ve-quan" },
    ],
  },
  { title: "Kết nối", items: [...site.social, { label: "Liên hệ", href: "/lien-he" }] },
];

export function SiteFooter() {
  return (
    <footer className="bg-espresso pt-20 text-cream md:pt-28">
      <div className={gutter}>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-[1.4fr_1fr_1.2fr_1fr] md:px-[8%]">
          <p className={`${serifDisplay} col-span-2 max-w-xs text-[26px] md:col-span-1`}>
            Cà phê ngon, <em>chỗ ngồi yên.</em>
          </p>
          {columns.map((col) => (
            <div key={col.title} className={col.title === "Ghé quán" ? "col-span-2 md:col-span-1" : ""}>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-cream/60">{col.title}</h3>
              <ul className="mt-5 space-y-3.5 text-sm font-semibold">
                {col.items.map((it) => (
                  <li key={it.label}>
                    {it.href.startsWith("/") ? (
                      <Link href={it.href} className={`transition-opacity hover:opacity-60 ${focusRing}`}>
                        {it.label}
                      </Link>
                    ) : (
                      <a href={it.href} className={`transition-opacity hover:opacity-60 ${focusRing}`}>
                        {it.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32" aria-hidden>
          <FitText text={site.name} max={340} className="font-serif font-light leading-[1.1] tracking-[-0.03em]" />
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-cream/15 py-6 text-[13px] font-semibold uppercase tracking-[0.04em] sm:flex-row sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name} {site.city}
          </p>
          <a href="#top" className={`normal-case tracking-normal text-cream/60 transition-colors hover:text-cream ${focusRing}`}>
            Lên đầu trang ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
