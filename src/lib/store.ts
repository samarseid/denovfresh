import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p) =>
        set((s) => {
          const ex = s.items.find((i) => i.product.id === p.id);
          if (ex) return { items: s.items.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i)) };
          return { items: [...s.items, { product: p, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.product.id !== id) : s.items.map((i) => (i.product.id === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "denov-cart" },
  ),
);
