import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useCart } from "@/lib/store";
import { formatSum } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Savatcha — Denov Fresh" }],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = useCart((s) => s.total());

  return (
    <div className="bg-background min-h-screen pb-40">
      <header className="sticky top-0 z-30 px-4 pt-4">
        <div className="glass-strong mx-auto flex max-w-md items-center justify-between rounded-2xl px-4 py-3">
          <h1 className="font-display text-xl font-bold">Savatcha</h1>
          <span className="text-muted-foreground text-xs">{items.length} ta tovar</span>
        </div>
      </header>

      <main className="mx-auto mt-4 max-w-md px-4">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card shadow-card mt-10 flex flex-col items-center rounded-3xl p-10 text-center"
          >
            <div className="gradient-cool mb-5 flex h-20 w-20 items-center justify-center rounded-3xl">
              <ShoppingBag className="text-fresh h-9 w-9" />
            </div>
            <h2 className="font-display text-xl font-bold">Savatcha bo'sh</h2>
            <p className="text-muted-foreground mt-1 text-sm">Mahsulotlardan boshlang</p>
            <Link to="/menu" className="gradient-fresh shadow-glow mt-5 rounded-2xl px-6 py-3 text-sm font-semibold text-white">
              Menyuga o'tish
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {items.map((it) => (
                <motion.div
                  key={it.product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="bg-card shadow-card flex gap-3 overflow-hidden rounded-2xl p-3"
                >
                  <img src={it.product.image} alt={it.product.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display text-sm font-semibold leading-tight">{it.product.name}</h3>
                      <p className="text-gradient-fresh font-display mt-1 text-base font-bold">
                        {formatSum(it.product.price * it.qty)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="bg-secondary flex items-center gap-2 rounded-xl px-1 py-1">
                        <button
                          onClick={() => setQty(it.product.id, it.qty - 1)}
                          className="hover:bg-card flex h-7 w-7 items-center justify-center rounded-lg"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.product.id, it.qty + 1)}
                          className="hover:bg-card flex h-7 w-7 items-center justify-center rounded-lg"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(it.product.id)}
                        className="text-muted-foreground hover:text-destructive flex h-8 w-8 items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {items.length > 0 && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          className="fixed inset-x-0 bottom-24 z-30 px-4"
        >
          <div className="glass-strong shadow-float mx-auto flex max-w-md items-center justify-between gap-3 rounded-3xl p-3">
            <div className="px-3">
              <div className="text-muted-foreground text-[11px]">Jami</div>
              <div className="text-gradient-fresh font-display text-xl font-bold">{formatSum(total)}</div>
            </div>
            <Link
              to="/checkout"
              className="gradient-fresh shadow-glow flex-1 rounded-2xl px-6 py-3.5 text-center text-sm font-semibold text-white"
            >
              Buyurtma berish →
            </Link>
          </div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
