"use client";

import { ShoppingBagIcon } from "lucide-react";
import { cartCount, useCart } from "@/lib/cart";
import { focusRing } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Header bag icon with the item count; opens the cart sheet. */
export function CartButton() {
  const count = useCart((s) => cartCount(s.items));
  const setOpen = useCart((s) => s.setOpen);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Giỏ hàng, ${count} món`}
      className={cn(
        "relative flex h-10 items-center gap-2 rounded-btn px-2.5 text-[15px] font-semibold transition-colors hover:bg-white/15",
        focusRing,
      )}
    >
      <ShoppingBagIcon className="size-5" strokeWidth={1.6} />
      <span className="hidden md:inline">Giỏ hàng</span>
      <span
        aria-hidden
        className={cn(
          "grid h-5 min-w-5 place-items-center bg-cream px-1 text-xs font-semibold text-espresso tabular-nums",
          count === 0 && "bg-cream/25 text-cream",
        )}
      >
        {count}
      </span>
    </button>
  );
}
