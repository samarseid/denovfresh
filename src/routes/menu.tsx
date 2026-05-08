import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Denov Fresh" },
      { name: "description", content: "Premium kokteyllar, smuzilar, moxitolar va vaflilar to'liq menyusi." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<string>("kokteyl");
  const list = products.filter((p) => p.category === cat);
  const active = categories.find((c) => c.id === cat)!;

  return (
    <div className="bg-background min-h-screen pb-28">
      <header className="sticky top-0 z-30 px-4 pt-4">
        <div className="glass-strong mx-auto flex max-w-md items-center justify-between rounded-2xl px-4 py-3">
          <h1 className="font-display text-xl font-bold">Menu</h1>
          <span className="text-muted-foreground text-xs">{products.length} ta mahsulot</span>
        </div>
      </header>

      <div className="mx-auto mt-4 max-w-md px-4">
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                cat === c.id ? "gradient-fresh shadow-glow text-white" : "glass text-foreground"
              }`}
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>

        <motion.h2
          key={cat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 font-display text-2xl font-bold"
        >
          {active.emoji} {active.name}
        </motion.h2>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
