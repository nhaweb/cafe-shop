import { z } from "zod";

/** Vietnamese mobile/landline: 10–11 digits starting with 0 (or +84), spaces/dots allowed. */
export const phoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s.-]/g, "").replace(/^\+84/, "0"))
  .pipe(z.string().regex(/^0\d{9,10}$/, "Số điện thoại chưa đúng (ví dụ 0901 234 567)"));
