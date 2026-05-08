import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { type Product, formatSum } from "@/lib/products";
import { useCart } from "@/lib/store";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group bg-card shadow-card relative overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="from-fresh/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <h3 className="text-foreground line-clamp-1 font-display text-base font-semibold">{product.name}</h3>
        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">{product.desc}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-gradient-fresh font-display text-lg font-bold">{formatSum(product.price)}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success(`${product.name} qo'shildi`, { duration: 1400 });
            }}
            className="gradient-fresh shadow-glow flex h-10 w-10 items-center justify-center rounded-2xl text-white"
            aria-label="Savatchaga qo'shish"
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
