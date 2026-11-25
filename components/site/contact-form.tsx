"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { phoneSchema } from "@/lib/validation";

const topics = ["Hỏi về đồ uống", "Cà phê hạt & đơn hàng", "Đặt bàn cho nhóm", "Góp ý cho quán"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập tên của bạn"),
  phone: phoneSchema,
  topic: z.enum(topics, { message: "Chọn một chủ đề" }),
  message: z.string().trim().min(10, "Lời nhắn cần ít nhất 10 ký tự").max(1000, "Tối đa 1000 ký tự"),
});

type Values = z.infer<typeof schema>;

/** Contact form. UI only for now: submitting shows a confirmation; wiring to the backend comes with phase 2. */
export function ContactForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", topic: undefined, message: "" },
  });

  async function onSubmit(values: Values) {
    // TODO(phase 2): send to the backend (Neon) / notify the café.
    await new Promise((r) => setTimeout(r, 500));
    toast.success(`Cảm ơn ${values.name}! Quán sẽ liên hệ lại sớm.`);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-name">Tên của bạn</FieldLabel>
                <Input {...field} id="contact-name" autoComplete="name" aria-invalid={fieldState.invalid} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-phone">Số điện thoại</FieldLabel>
                <Input {...field} id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={fieldState.invalid} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        </div>

        <Controller
          name="topic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-topic">Chủ đề</FieldLabel>
              <Select name={field.name} value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id="contact-topic" className="w-full bg-transparent" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Chọn chủ đề" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contact-message">Lời nhắn</FieldLabel>
              <Textarea {...field} id="contact-message" rows={5} aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <div>
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Đang gửi…" : "Gửi lời nhắn"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
