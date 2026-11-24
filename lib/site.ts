// Business facts — every value in [brackets] is a placeholder to replace.
// Will move to the Sanity `siteSettings` document when the CMS is integrated.
export const site = {
  name: "Pml Coffee",
  city: "[Sài Gòn]",
  address: "[Số nhà, tên đường, phường, quận]",
  hours: "[7:00] – [22:00]",
  hoursNote: "Mở cửa tất cả các ngày trong tuần",
  phone: "[0900 000 000]",
  email: "[hello@pmlcoffee.vn]",
  zaloUrl: "#", // [Link Zalo OA hoặc zalo.me/<số điện thoại>]
  mapsUrl: "#", // [Link Google Maps của quán]
  deliveryRadius: "[5 km]",
  copyrightYear: 2026,
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
  ],
} as const;

/** Main navigation, shared by every page header and the mobile menu. */
export const navLinks = [
  { key: "thuc-don", label: "Thực đơn", href: "/thuc-don" },
  { key: "ca-phe-hat", label: "Cà phê hạt", href: "/ca-phe-hat" },
  { key: "ve-quan", label: "Về quán", href: "/ve-quan" },
  { key: "lien-he", label: "Liên hệ", href: "/lien-he" },
] as const;

export type NavKey = (typeof navLinks)[number]["key"];
