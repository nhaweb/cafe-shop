const vnd = new Intl.NumberFormat("vi-VN");

/** 29000 → "29.000₫" */
export function formatPrice(value: number) {
  return `${vnd.format(value)}₫`;
}
