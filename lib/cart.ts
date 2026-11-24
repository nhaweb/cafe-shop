"use client";

import type { StaticImageData } from "next/image";
import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProductKind } from "./catalog";

export type CartItem = {
  /** slug + chosen options, so the same drink with different options is a separate line. */
  id: string;
  slug: string;
  name: string;
  kind: ProductKind;
  img: StaticImageData;
  options: Record<string, string>;
  unitPrice: number;
  qty: number;
};

export type PlacedOrder = {
  code: string;
  placedAt: string;
  name: string;
  phone: string;
  method: "pickup" | "delivery";
  address?: string;
  items: CartItem[];
  total: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  lastOrder: PlacedOrder | null;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "id" | "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setLastOrder: (order: PlacedOrder) => void;
};

const lineId = (slug: string, options: Record<string, string>) =>
  [slug, ...Object.entries(options).map(([k, v]) => `${k}=${v}`)].join("|");

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      lastOrder: null,
      setOpen: (open) => set({ open }),
      add: (item, qty = 1) =>
        set((s) => {
          const id = lineId(item.slug, item.options);
          const existing = s.items.find((i) => i.id === id);
          return {
            items: existing
              ? s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
              : [...s.items, { ...item, id, qty }],
          };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      setLastOrder: (lastOrder) => set({ lastOrder }),
    }),
    {
      name: "pml-cart",
      // window.* so the server never touches Node's experimental localStorage global.
      storage: createJSONStorage(() => window.localStorage),
      partialize: (s) => ({ items: s.items, lastOrder: s.lastOrder }),
      // Rehydrated by <CartSheet> after mount, so server and first client render match.
      skipHydration: true,
    },
  ),
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.qty, 0);
export const cartTotal = (items: CartItem[]) => items.reduce((n, i) => n + i.qty * i.unitPrice, 0);

/** True once the persisted cart has been read from localStorage (false on the server and first render). */
export function useCartHydrated() {
  return useSyncExternalStore(
    (cb) => useCart.persist.onFinishHydration(cb),
    () => useCart.persist.hasHydrated(),
    () => false,
  );
}
