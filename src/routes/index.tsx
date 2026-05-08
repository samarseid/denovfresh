import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Sparkles, Clock } from "lucide-react";
import { SplashScreen } from "@/components/SplashScreen";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";
import { initTelegram } from "@/lib/telegram";
import mojito from "@/assets/hero-mojito.jpg";
import smoothie from "@/assets/hero-smoothie.jpg";
import waffle from "@/assets/hero-waffle.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const slides = [
  { img: mojito, title: "Ice Cold Moxitos", subtitle: "🧊 Salqin va premium", tint: "from-fresh/70 to-berry/40" },
  { img: smoothie, title: "Fresh Smoothies", subtitle: "🍓 Tabiiy & yangi", tint: "from-mango/70 to-berry/40" },
  { img: waffle, title: "Premium Waffles", subtitle: "🧇 Belgian zavqi", tint: "from-fresh/70 to-mango/50" },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const [activeCat, setActiveCat] = useState<string>("all");

  useEffect(() => {
    initTelegram();
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const featured = useMemo(
    () => (activeCat === "all" ? products.slice(0, 6) : products.filter((p) => p.category === activeCat)),
    [activeCat],
  );

  return (
    <div className="bg-background relative min-h-screen pb-28">
      <SplashScreen />

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 px-4 pt-4">
        <div className="glass-strong shadow-card mx-auto flex max-w-md items-center justify-between rounded-2xl px-4 py-3">
          <div>
            <div className="text-gradient-fresh font-display text-lg font-bold leading-none">Denov Fresh</div>
            <div className="text-muted-foreground mt-1 flex items-center gap-1 text-[10px]">
              <span className="bg-lime inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
              Yetkazish faol
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-1.5 rounded-xl bg-secondary/60 px-3 py-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" />
            10:00 — 23:00
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4">
        {/* Hero Slider */}
        <section className="mt-5">
          <div className="shadow-float relative aspect-[16/11] overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img src={slides[slide].img} alt={slides[slide].title} className="h-full w-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${slides[slide].tint}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-white drop-shadow-md"
                  >
                    <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-medium backdrop-blur">
                      <Sparkles className="h-3 w-3" /> Premium
                    </div>
                    <div className="text-sm font-light opacity-90">{slides[slide].subtitle}</div>
                    <h2 className="font-display text-3xl font-bold leading-tight">{slides[slide].title}</h2>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 right-4 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "bg-white w-6" : "bg-white/50 w-1.5"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Kategoriyalar</h3>
            <Link to="/menu" className="text-fresh inline-flex items-center text-xs font-medium">
              Barchasi <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
            <CategoryPill id="all" name="Hammasi" emoji="✨" active={activeCat === "all"} onClick={() => setActiveCat("all")} />
            {categories.map((c) => (
              <CategoryPill
                key={c.id}
                id={c.id}
                name={c.name}
                emoji={c.emoji}
                active={activeCat === c.id}
                onClick={() => setActiveCat(c.id)}
              />
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Bestseller</h3>
            <span className="text-muted-foreground text-xs">🔥 Eng ko'p sotilgan</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>

        {/* Instagram CTA */}
        <section className="mt-8">
          <a
            href="https://instagram.com/denov.fresh"
            target="_blank"
            rel="noreferrer"
            className="gradient-mango shadow-glow flex items-center justify-between overflow-hidden rounded-3xl px-5 py-4 text-white"
          >
            <div>
              <div className="text-xs font-light opacity-90">Instagram'da kuzating</div>
              <div className="font-display text-lg font-bold">@denov.fresh</div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Sparkles className="h-6 w-6" />
            </div>
          </a>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function CategoryPill({
  name, emoji, active, onClick,
}: { id: string; name: string; emoji: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all ${
        active
          ? "gradient-fresh shadow-glow scale-105 text-white"
          : "glass text-foreground hover:scale-[1.02]"
      }`}
    >
      <span className="mr-1.5">{emoji}</span>
      {name}
    </button>
  );
}
