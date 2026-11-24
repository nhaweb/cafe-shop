"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cartTotal, useCart, useCartHydrated } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { serifDisplay } from "@/lib/styles";
import { phoneSchema } from "@/lib/validation";
import { QuantityStepper } from "./quantity-stepper";

const times = ["Sớm nhất có thể", "Trong 30 phút", "Trong 1 giờ", "Chiều nay", "Ngày mai"] as const;

const schema = z
  .object({
    name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
    phone: phoneSchema,
    method: z.enum(["pickup", "delivery"]),
    address: z.string().trim(),
    time: z.enum(times),
    note: z.string().trim().max(500, "Tối đa 500 ký tự"),
  })
  .refine((v) => v.method === "pickup" || v.address.length >= 10, {
    path: ["address"],
    message: "Nhập địa chỉ giao hàng đầy đủ (số nhà, đường, phường, quận/tỉnh)",
  });

type Values = z.infer<typeof schema>;

const methods = [
  { value: "pickup", title: "Nhận tại quán", body: `${site.address}. Trả tiền khi nhận.` },
  { value: "delivery", title: "Giao tận nơi", body: "Thanh toán tiền mặt cho người giao (COD)." },
] as const;

/** Sample order code + timestamp (the backend will issue real codes in phase 2). */
function newOrderStamp() {
  return { code: `PML${Date.now().toString(36).slice(-6).toUpperCase()}`, placedAt: new Date().toISOString() };
}

/** Checkout: customer details + order summary. UI only: placing an order stores a sample order locally (phase 2 → Neon). */
export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useCartHydrated();
  const { items, setQty, remove, clear, setLastOrder } = useCart();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", method: "pickup", address: "", time: "Sớm nhất có thể", note: "" },
  });
  const method = useWatch({ control: form.control, name: "method" });

  const total = cartTotal(items);
  const hasDrinks = items.some((i) => i.kind !== "bean");

  async function onSubmit(values: Values) {
    // TODO(phase 2): Server Action → validate prices against the catalogue, insert into Neon, notify the café.
    await new Promise((r) => setTimeout(r, 700));
    setLastOrder({
      ...newOrderStamp(),
      name: values.name,
      phone: values.phone,
      method: values.method,
      address: values.method === "delivery" ? values.address : undefined,
      items,
      total,
    });
    clear();
    router.push("/dat-hang-thanh-cong");
  }

  if (!hydrated) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-start justify-center gap-6">
        <p className={`${serifDisplay} text-[32px] md:text-[44px]`}>
          Giỏ hàng <em>đang trống.</em>
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/thuc-don">Xem thực đơn</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ca-phe-hat">Cà phê hạt</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-14 md:grid-cols-[1.3fr_1fr] md:gap-20">
      <FieldGroup className="gap-10">
        <FieldSet>
          <FieldLegend className="font-serif text-2xl font-light">1. Thông tin của bạn</FieldLegend>
          <div className="grid gap-6 md:grid-cols-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="co-name">Họ tên</FieldLabel>
                  <Input {...field} id="co-name" autoComplete="name" aria-invalid={fieldState.invalid} />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="co-phone">Số điện thoại</FieldLabel>
                  <Input {...field} id="co-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={fieldState.invalid} />
                  <FieldDescription>Quán gọi số này để xác nhận đơn.</FieldDescription>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </div>
        </FieldSet>

        <FieldSet>
          <FieldLegend className="font-serif text-2xl font-light">2. Nhận hàng</FieldLegend>
          <Controller
            name="method"
            control={form.control}
            render={({ field }) => (
              <RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} className="grid gap-2 md:grid-cols-2">
                {methods.map((m) => (
                  <FieldLabel key={m.value} htmlFor={`co-method-${m.value}`} className="bg-paper has-data-checked:border-espresso has-data-checked:bg-paper">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle className="font-semibold">{m.title}</FieldTitle>
                        <FieldDescription>{m.body}</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value={m.value} id={`co-method-${m.value}`} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            )}
          />

          {method === "delivery" && (
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="co-address">Địa chỉ giao hàng</FieldLabel>
                  <Input {...field} id="co-address" autoComplete="street-address" aria-invalid={fieldState.invalid} />
                  {hasDrinks && (
                    <FieldDescription>
                      Đồ uống chỉ giao trong bán kính {site.deliveryRadius} quanh quán. Cà phê hạt giao toàn quốc.
                    </FieldDescription>
                  )}
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          )}

          <Controller
            name="time"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="co-time">{method === "pickup" ? "Thời gian đến lấy" : "Thời gian giao"}</FieldLabel>
                <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="co-time" className="w-full bg-paper md:w-72">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {times.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="note"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="co-note">Ghi chú (không bắt buộc)</FieldLabel>
                <Textarea {...field} id="co-note" rows={3} placeholder="Ví dụ: gọi trước khi giao, để đá riêng…" />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </FieldSet>

        <FieldSet>
          <FieldLegend className="font-serif text-2xl font-light">3. Thanh toán</FieldLegend>
          <p className="border border-espresso/15 bg-paper p-4 text-[15px]">
            <span className="font-semibold">Thanh toán khi nhận hàng.</span>{" "}
            <span className="text-muted-foreground">
              Tiền mặt cho người giao, hoặc trả tại quầy khi đến lấy. Quán sẽ gọi xác nhận đơn và báo phí giao (nếu có).
            </span>
          </p>
        </FieldSet>
      </FieldGroup>

      {/* Order summary */}
      <aside className="md:sticky md:top-8 md:self-start">
        <div className="bg-latte p-5 md:p-8">
          <h2 className="font-serif text-2xl font-light">Đơn của bạn</h2>
          <ul className="mt-6 border-t border-espresso/15">
            {items.map((i) => (
              <li key={i.id} className="flex gap-4 border-b border-espresso/15 py-4">
                <div className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-cream">
                  <Image src={i.img} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex justify-between gap-3">
                    <span className="font-serif text-lg italic leading-tight">{i.name}</span>
                    <span className="shrink-0 text-sm font-semibold tabular-nums">{formatPrice(i.unitPrice * i.qty)}</span>
                  </div>
                  <span className="text-[13px] text-muted-foreground">{Object.values(i.options).join(" · ")}</span>
                  <div className="mt-1 flex items-center justify-between">
                    <QuantityStepper size="sm" value={i.qty} onChange={(q) => setQty(i.id, q)} />
                    <Button type="button" variant="link" size="sm" className="text-[13px]" onClick={() => remove(i.id)}>
                      Xoá
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tạm tính</dt>
              <dd className="tabular-nums">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phí giao hàng</dt>
              <dd>{method === "pickup" ? "Miễn phí" : "Quán báo khi xác nhận"}</dd>
            </div>
            <div className="flex justify-between border-t border-espresso/15 pt-3 text-lg font-semibold">
              <dt>Tổng</dt>
              <dd className="tabular-nums">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Đang gửi đơn…" : "Đặt hàng"}
          </Button>
          <p className="mt-3 text-[13px] text-muted-foreground">
            Bằng việc đặt hàng, bạn đồng ý với{" "}
            <Link href="/chinh-sach" className="underline underline-offset-4">
              chính sách giao hàng & đổi trả
            </Link>
            .
          </p>
        </div>
      </aside>
    </form>
  );
}
