import type { StaticImageData } from "next/image";
import gheQuanImg from "../public/images/ghe-quan.jpg";
import khongGianImg from "../public/images/khong-gian.jpg";
import khongGian2Img from "../public/images/khong-gian-2.jpg";
import quayBarImg from "../public/images/quay-bar.jpg";
import { site } from "./site";

/* Editorial copy shared by several pages — stand-in until the Sanity integration. [Brackets] = placeholder. */

export type Photo = { img: StaticImageData; alt: string; caption: string };

export const spacePhotos: Photo[] = [
  { img: khongGianImg, alt: "Không gian quán với cửa kính lớn và bàn ghế gỗ", caption: "Tầng trệt · cửa kính hướng ra phố" },
  { img: quayBarImg, alt: "Quầy bar với máy pha espresso và kệ cà phê hạt", caption: "Quầy bar · nơi pha từng ly" },
  { img: khongGian2Img, alt: "Góc ngồi với đèn thả và ghế gỗ", caption: "Góc làm việc · nhiều ổ cắm" },
  { img: gheQuanImg, alt: "Barista đứng sau quầy, ly cà phê đá trên quầy", caption: "Buổi sáng ở quán" },
];

export const testimonials = [
  {
    quote: "Đen đá đậm đúng kiểu mình thích, quán yên tĩnh nên sáng nào cũng ghé ngồi làm việc một tiếng.",
    name: "[Minh Anh]",
    meta: "[Khách quen · Google Maps]",
  },
  {
    quote: "Mua thử túi Arabica Cầu Đất về pha pour-over, thơm cam rất rõ. Đóng gói cẩn thận, giao 2 ngày là tới.",
    name: "[Quốc Huy]",
    meta: "[Mua cà phê hạt · Hà Nội]",
  },
  {
    quote: "Bạc xỉu ngon, nhân viên dễ thương, có chỗ đậu xe máy. Cuối tuần hơi đông nên đến sớm.",
    name: "[Thảo Vy]",
    meta: "[Khách quen · Facebook]",
  },
];

export const promises = [
  { title: "Rang mới mỗi tuần", body: "Hạt được rang theo mẻ nhỏ và giao trong vòng 7 ngày sau khi rang." },
  { title: "Xay theo cách bạn pha", body: "Nguyên hạt hoặc xay sẵn cho phin, máy espresso hay pour-over." },
  { title: "Giao toàn quốc", body: "Đóng túi van một chiều, gửi đi trong 24 giờ. Thanh toán khi nhận." },
];

export type Faq = { q: string; a: string };

export const orderFaqs: Faq[] = [
  {
    q: "Quán có giao đồ uống không?",
    a: `Có. Đồ uống được giao trong bán kính ${site.deliveryRadius} quanh quán để giữ đá và vị ngon. Ngoài bán kính này, bạn có thể đặt trước và đến lấy tại quán.`,
  },
  {
    q: "Cà phê hạt giao đi những đâu?",
    a: "Cà phê hạt và bột được giao toàn quốc. Nội thành thường 1–2 ngày, các tỉnh khác 2–4 ngày làm việc.",
  },
  {
    q: "Thanh toán thế nào?",
    a: "Bạn trả tiền mặt khi nhận hàng, hoặc thanh toán tại quán khi đến lấy. Quán sẽ gọi xác nhận đơn trước khi pha hoặc gửi đi.",
  },
  {
    q: "Phí giao hàng là bao nhiêu?",
    a: "[Miễn phí cho đơn cà phê hạt từ 300.000₫.] Với các đơn khác, quán báo phí khi gọi xác nhận đơn.",
  },
  {
    q: "Nên chọn xay sẵn hay nguyên hạt?",
    a: "Nếu bạn có máy xay, nguyên hạt giữ hương lâu hơn. Nếu không, hãy chọn độ xay đúng với dụng cụ pha (phin, máy, pour-over) và dùng trong khoảng 3 tuần sau khi mở túi.",
  },
  {
    q: "Tôi có thể đổi trả không?",
    a: "Nếu túi cà phê bị rách, sai loại hoặc sai độ xay, quán đổi mới miễn phí trong 7 ngày. Xem chi tiết ở trang Giao hàng & đổi trả.",
  },
];

export const visitFaqs: Faq[] = [
  { q: "Quán có chỗ đậu xe không?", a: "[Có chỗ để xe máy trước quán. Ô tô vui lòng đỗ ở bãi gần đó.]" },
  { q: "Có wifi và ổ cắm không?", a: "Có wifi miễn phí và ổ cắm ở hầu hết các bàn trong nhà." },
  { q: "Có thể đặt bàn cho nhóm không?", a: `Nhóm từ 6 người vui lòng gọi trước số ${site.phone} để quán giữ chỗ.` },
  { q: "Quán có thân thiện với thú cưng không?", a: "[Thú cưng được chào đón ở khu vực ngoài trời.]" },
];
