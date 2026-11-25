import type { Metadata } from "next";
import { PageIntro } from "@/components/site/page-intro";
import { Reveal } from "@/components/site/reveal";
import { SiteNav } from "@/components/site/site-nav";
import { site } from "@/lib/site";
import { focusRing, gutter, linkUnderline } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Giao hàng & đổi trả",
  description: `Chính sách giao hàng, thanh toán và đổi trả của ${site.name}.`,
};

// [Placeholder policy: review with the café before launch.]
const sections = [
  {
    id: "giao-hang",
    title: "Giao hàng",
    body: [
      `Đồ uống: giao trong bán kính ${site.deliveryRadius} quanh quán, trong giờ mở cửa ${site.hours}. Thời gian giao thường 20–40 phút sau khi quán xác nhận đơn.`,
      "Cà phê hạt và bột: giao toàn quốc qua đơn vị vận chuyển. Nội thành 1–2 ngày, các tỉnh khác 2–4 ngày làm việc. Đơn được gửi đi trong 24 giờ sau khi xác nhận.",
      "[Phí giao hàng: miễn phí cho đơn cà phê hạt từ 300.000₫; các đơn khác quán báo phí khi gọi xác nhận.]",
    ],
  },
  {
    id: "thanh-toan",
    title: "Thanh toán",
    body: [
      "Quán hiện nhận thanh toán khi nhận hàng (COD) bằng tiền mặt, hoặc trả tại quầy khi bạn đến lấy.",
      "Mỗi đơn đặt online đều được quán gọi điện xác nhận trước khi pha hoặc đóng gói. Nếu quán không liên lạc được sau 2 lần gọi, đơn sẽ tạm huỷ.",
    ],
  },
  {
    id: "doi-tra",
    title: "Đổi trả",
    body: [
      "Cà phê hạt: đổi mới miễn phí trong 7 ngày nếu túi bị rách, sai loại, sai khối lượng hoặc sai độ xay. Vui lòng giữ túi và chụp ảnh khi nhận hàng.",
      "Đồ uống: nếu ly bị đổ, sai món hoặc không đúng tuỳ chọn, hãy gọi quán ngay để được pha lại.",
      "Quán không nhận đổi trả với lý do thay đổi khẩu vị sau khi đã mở túi.",
    ],
  },
  {
    id: "bao-quan",
    title: "Bảo quản cà phê",
    body: [
      "Giữ túi kín, để nơi khô ráo, tránh nắng và không cho vào tủ lạnh. Cà phê ngon nhất trong 2–6 tuần sau ngày rang in trên túi; sau khi mở, nên dùng trong khoảng 3 tuần.",
    ],
  },
];

export default function PolicyPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-paper pb-14 md:pb-20">
        <PageIntro
          crumbs={[{ label: "Giao hàng & đổi trả" }]}
          title={
            <>
              Giao hàng <em>& đổi trả</em>
            </>
          }
          lead={`Những điều cần biết khi đặt đồ uống và cà phê hạt từ ${site.name}.`}
        />
        <div className={`${gutter} grid gap-12 md:grid-cols-[220px_1fr] md:gap-20`}>
          <nav aria-label="Mục lục" className="md:sticky md:top-8 md:self-start">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold md:flex-col">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={`${linkUnderline} ${focusRing}`}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-2xl">
            {sections.map((s) => (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-8 border-t border-espresso/15 py-10 first:pt-0 first:border-t-0">
                  <h2 className="font-serif text-[28px] font-light md:text-[34px]">{s.title}</h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed">
                    {s.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
            <p className="text-sm text-muted-foreground">
              Có câu hỏi khác? Gọi{" "}
              <a href={`tel:${site.phone}`} className={linkUnderline}>
                {site.phone}
              </a>{" "}
              hoặc email{" "}
              <a href={`mailto:${site.email}`} className={linkUnderline}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
