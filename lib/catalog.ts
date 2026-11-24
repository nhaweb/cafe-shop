import type { StaticImageData } from "next/image";
import beanArabicaImg from "../public/images/b-tui-hat.jpg";
import beanBlendImg from "../public/images/b-hat-rang-2.jpg";
import beanGroundImg from "../public/images/b-xay.jpg";
import beanRobustaImg from "../public/images/b-hat-rang.jpg";
import americanoImg from "../public/images/p-americano.jpg";
import bacXiuImg from "../public/images/p-bac-xiu.jpg";
import croissantImg from "../public/images/p-croissant.jpg";
import denDaImg from "../public/images/p-den-da.jpg";
import latteImg from "../public/images/p-latte.jpg";
import suaDaImg from "../public/images/p-sua-da.jpg";
import traDaoImg from "../public/images/p-tra-chanh.jpg";
import traChanhImg from "../public/images/p-tra-chanh-2.jpg";
import phinNongImg from "../public/images/phin.jpg";
import caPheMuoiImg from "../public/images/phin-2.jpg";

/*
 * Product catalogue — stand-in data until Sanity is integrated.
 * The shapes mirror the planned Sanity schema (category / product), and pages only read data through
 * the async getters at the bottom, so swapping them for GROQ queries does not touch the UI.
 * All prices are placeholders: replace them with the café's real prices.
 */

export type ProductKind = "drink" | "food" | "bean";

export type Category = { slug: string; title: string; kind: ProductKind };

export type OptionChoice = { label: string; /** VND added to the base price. */ delta: number };
export type OptionGroup = { id: string; label: string; choices: OptionChoice[] };

export type Product = {
  slug: string;
  name: string;
  kind: ProductKind;
  category: string;
  /** One-line description shown on cards. */
  note: string;
  /** Paragraphs for the product page. */
  description: string[];
  /** Base price in VND (placeholder). */
  price: number;
  img: StaticImageData;
  alt: string;
  badge?: string;
  featured?: boolean;
  optionGroups?: OptionGroup[];
  /** Facts table on the product page (origin, roast…). */
  details?: { term: string; value: string }[];
  tastingNotes?: string[];
};

export const categories: Category[] = [
  { slug: "ca-phe", title: "Cà phê", kind: "drink" },
  { slug: "tra", title: "Trà", kind: "drink" },
  { slug: "banh", title: "Bánh", kind: "food" },
  { slug: "hat", title: "Cà phê hạt", kind: "bean" },
];

/* ---------- Reusable option groups ---------- */

const size: OptionGroup = {
  id: "size",
  label: "Cỡ ly",
  choices: [
    { label: "Ly vừa", delta: 0 },
    { label: "Ly lớn", delta: 10000 },
  ],
};
const ice: OptionGroup = {
  id: "da",
  label: "Đá",
  choices: [
    { label: "Đá vừa", delta: 0 },
    { label: "Ít đá", delta: 0 },
    { label: "Đá riêng", delta: 0 },
  ],
};
const sugar: OptionGroup = {
  id: "duong",
  label: "Độ ngọt",
  choices: [
    { label: "Ngọt vừa", delta: 0 },
    { label: "Ít ngọt", delta: 0 },
    { label: "Không đường", delta: 0 },
  ],
};
const weight: OptionGroup = {
  id: "khoi-luong",
  label: "Khối lượng",
  choices: [
    { label: "250g", delta: 0 },
    { label: "500g", delta: 110000 },
    { label: "1kg", delta: 330000 },
  ],
};
const grind: OptionGroup = {
  id: "xay",
  label: "Xay",
  choices: [
    { label: "Nguyên hạt", delta: 0 },
    { label: "Xay pha phin", delta: 0 },
    { label: "Xay pha máy", delta: 0 },
    { label: "Xay pour-over", delta: 0 },
  ],
};

const icedCoffee = [size, ice, sugar];

/* ---------- Products ---------- */

export const products: Product[] = [
  // Cà phê
  {
    slug: "ca-phe-den-da",
    name: "Cà phê đen đá",
    kind: "drink",
    category: "ca-phe",
    note: "Phin đậm, đá lạnh",
    description: [
      "Robusta rang đậm pha phin chậm, rót qua đá. Đắng rõ, hậu vị ngọt nhẹ và mùi chocolate đen.",
      "Ly quen của những buổi sáng cần tỉnh táo.",
    ],
    price: 29000,
    img: denDaImg,
    alt: "Ly cà phê đen đá dưới nắng",
    featured: true,
    optionGroups: icedCoffee,
  },
  {
    slug: "bac-xiu",
    name: "Bạc xỉu",
    kind: "drink",
    category: "ca-phe",
    note: "Nhiều sữa, ít cà phê",
    description: [
      "Sữa tươi và sữa đặc làm nền, một chút cà phê phin rót lên trên thành từng tầng.",
      "Ngọt, béo và dịu, hợp cho người mới uống cà phê.",
    ],
    price: 35000,
    img: bacXiuImg,
    alt: "Ly bạc xỉu phân tầng trên bàn gỗ",
    badge: "Bán chạy",
    featured: true,
    optionGroups: icedCoffee,
  },
  {
    slug: "americano-da",
    name: "Americano đá",
    kind: "drink",
    category: "ca-phe",
    note: "Espresso, nước, đá",
    description: [
      "Hai shot espresso từ Arabica Cầu Đất, thêm nước và đá. Thanh, sáng vị, có chút chua trái cây.",
    ],
    price: 39000,
    img: americanoImg,
    alt: "Ly americano đá trên mặt đá cẩm thạch",
    featured: true,
    optionGroups: [size, ice],
  },
  {
    slug: "ca-phe-sua-da",
    name: "Cà phê sữa đá",
    kind: "drink",
    category: "ca-phe",
    note: "Phin, sữa đặc, đá",
    description: [
      "Cà phê phin đậm hoà cùng sữa đặc, khuấy đều rồi rót qua đá. Vị Sài Gòn quen thuộc.",
    ],
    price: 32000,
    img: suaDaImg,
    alt: "Ly cà phê sữa đá",
    featured: true,
    optionGroups: icedCoffee,
  },
  {
    slug: "ca-phe-muoi",
    name: "Cà phê muối",
    kind: "drink",
    category: "ca-phe",
    note: "Phin, kem muối béo mặn",
    description: [
      "Cà phê phin phủ lớp kem sữa đánh với chút muối biển. Mặn nhẹ làm vị đắng tròn và ngọt hơn.",
    ],
    price: 39000,
    img: caPheMuoiImg,
    alt: "Ly cà phê muối bên cạnh phin trên bàn gỗ",
    badge: "Mới",
    optionGroups: icedCoffee,
  },
  {
    slug: "ca-phe-phin-nong",
    name: "Cà phê phin nóng",
    kind: "drink",
    category: "ca-phe",
    note: "Pha tại bàn, uống chậm",
    description: [
      "Phin nhôm đặt trên ly, mang ra tận bàn để bạn ngồi đợi từng giọt. Chọn đen hoặc thêm sữa đặc.",
    ],
    price: 29000,
    img: phinNongImg,
    alt: "Phin cà phê đang nhỏ giọt xuống ly thuỷ tinh",
    optionGroups: [
      {
        id: "sua",
        label: "Kiểu",
        choices: [
          { label: "Đen", delta: 0 },
          { label: "Sữa", delta: 3000 },
        ],
      },
      sugar,
    ],
  },
  {
    slug: "latte-nong",
    name: "Latte nóng",
    kind: "drink",
    category: "ca-phe",
    note: "Espresso, sữa tươi đánh mịn",
    description: [
      "Espresso cân bằng với sữa tươi đánh mịn, lớp foam mỏng vừa đủ để vẽ một chiếc lá.",
    ],
    price: 45000,
    img: latteImg,
    alt: "Ly latte nóng có vẽ hình lá trên bàn gỗ",
    optionGroups: [size, sugar],
  },
  // Trà
  {
    slug: "tra-dao-cam-sa",
    name: "Trà đào cam sả",
    kind: "drink",
    category: "tra",
    note: "Trà đen, đào, cam, sả",
    description: [
      "Trà đen ủ lạnh với sả tươi, thêm miếng đào giòn và cam vắt. Mát, thơm, không quá ngọt.",
    ],
    price: 42000,
    img: traDaoImg,
    alt: "Ly trà đào cam sả trên bàn gỗ ngoài trời",
    optionGroups: icedCoffee,
  },
  {
    slug: "tra-chanh",
    name: "Trà đen chanh",
    kind: "drink",
    category: "tra",
    note: "Trà đen, chanh vàng, đá",
    description: ["Trà đen pha đậm, chanh vàng tươi và đá. Chua nhẹ, rất hợp ngày nắng."],
    price: 35000,
    img: traChanhImg,
    alt: "Ly trà đen chanh cạnh nửa quả chanh vàng",
    optionGroups: icedCoffee,
  },
  // Bánh
  {
    slug: "croissant-bo",
    name: "Croissant bơ",
    kind: "food",
    category: "banh",
    note: "Nướng mỗi sáng",
    description: ["Croissant bơ nướng mỗi sáng, vỏ giòn nhiều lớp. Ngon nhất khi ăn cùng một ly đen nóng."],
    price: 35000,
    img: croissantImg,
    alt: "Bánh croissant rắc đường bột trên đĩa",
  },
  // Cà phê hạt
  {
    slug: "robusta-rang-dam",
    name: "Robusta Đắk Lắk",
    kind: "bean",
    category: "hat",
    note: "Rang đậm · pha phin",
    description: [
      "Robusta chọn lọc từ Buôn Ma Thuột, rang đậm cho ly phin dày, đắng rõ và nhiều crema.",
      "Đây là hạt quán dùng cho đen đá và sữa đá mỗi ngày.",
    ],
    price: 120000,
    img: beanRobustaImg,
    alt: "Túi vải đựng hạt cà phê rang đậm",
    badge: "Hạt của quán",
    featured: true,
    optionGroups: [weight, grind],
    details: [
      { term: "Vùng trồng", value: "Buôn Ma Thuột, Đắk Lắk" },
      { term: "Giống", value: "Robusta" },
      { term: "Sơ chế", value: "Phơi tự nhiên" },
      { term: "Mức rang", value: "Đậm" },
    ],
    tastingNotes: ["Chocolate đen", "Hạt rang", "Đường thốt nốt"],
  },
  {
    slug: "arabica-cau-dat",
    name: "Arabica Cầu Đất",
    kind: "bean",
    category: "hat",
    note: "Rang vừa · pha máy, pour-over",
    description: [
      "Arabica trồng ở độ cao 1.500m tại Cầu Đất, Đà Lạt. Rang vừa để giữ độ chua sáng và hương hoa quả.",
    ],
    price: 180000,
    img: beanArabicaImg,
    alt: "Túi cà phê hạt Arabica mở miệng",
    featured: true,
    optionGroups: [weight, grind],
    details: [
      { term: "Vùng trồng", value: "Cầu Đất, Lâm Đồng" },
      { term: "Độ cao", value: "1.500m" },
      { term: "Sơ chế", value: "Honey" },
      { term: "Mức rang", value: "Vừa" },
    ],
    tastingNotes: ["Cam chín", "Mật ong", "Hạnh nhân"],
  },
  {
    slug: "pml-blend",
    name: "Pml Blend",
    kind: "bean",
    category: "hat",
    note: "70% Robusta · 30% Arabica",
    description: [
      "Phối trộn riêng của quán: Robusta cho thân dày, Arabica cho hương thơm. Hợp cả phin lẫn máy.",
    ],
    price: 150000,
    img: beanBlendImg,
    alt: "Hạt cà phê rang đổ ra từ bao bố",
    featured: true,
    optionGroups: [weight, grind],
    details: [
      { term: "Thành phần", value: "70% Robusta, 30% Arabica" },
      { term: "Mức rang", value: "Vừa – đậm" },
      { term: "Hợp với", value: "Phin, máy espresso, moka pot" },
    ],
    tastingNotes: ["Cacao", "Caramel", "Trái cây khô"],
  },
  {
    slug: "bot-pha-phin",
    name: "Bột pha phin",
    kind: "bean",
    category: "hat",
    note: "Xay sẵn · dùng ngay",
    description: [
      "Pml Blend xay sẵn độ mịn dành cho phin. Đóng túi van một chiều, nên dùng trong 3 tuần sau khi mở.",
    ],
    price: 110000,
    img: beanGroundImg,
    alt: "Cà phê xay mịn trong tay cầm máy pha",
    optionGroups: [weight],
    details: [
      { term: "Thành phần", value: "Pml Blend" },
      { term: "Độ xay", value: "Vừa (phin)" },
      { term: "Bảo quản", value: "Nơi khô, tránh nắng" },
    ],
    tastingNotes: ["Đậm", "Đắng dịu", "Hậu ngọt"],
  },
];

/* ---------- Getters (replace with Sanity queries later) ---------- */

export async function getProducts(kinds?: ProductKind[]) {
  return kinds ? products.filter((p) => kinds.includes(p.kind)) : products;
}

export async function getFeatured(kind: ProductKind) {
  return products.filter((p) => p.kind === kind && p.featured);
}

export async function getProduct(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getRelated(product: Product, limit = 4) {
  const sameKind = (p: Product) =>
    product.kind === "bean" ? p.kind === "bean" : p.kind !== "bean";
  return products.filter((p) => p.slug !== product.slug && sameKind(p)).slice(0, limit);
}

export async function getMenuCategories() {
  return categories.filter((c) => c.kind !== "bean");
}

/** Default selection = first choice of each option group. */
export function defaultOptions(product: Product): Record<string, string> {
  return Object.fromEntries((product.optionGroups ?? []).map((g) => [g.id, g.choices[0].label]));
}

export function priceWithOptions(product: Product, selected: Record<string, string>) {
  return (product.optionGroups ?? []).reduce((sum, g) => {
    const choice = g.choices.find((c) => c.label === selected[g.id]);
    return sum + (choice?.delta ?? 0);
  }, product.price);
}
