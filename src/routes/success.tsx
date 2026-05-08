import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/success")({
  head: () => ({ meta: [{ title: "Buyurtma qabul qilindi — Denov Fresh" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  useEffect(() => {
    try {
      (window as any)?.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.("success");
    } catch {}
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
         style={{ background: "var(--gradient-splash)" }}>
      {/* Confetti */}
      {[...Array(24)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-sm"
          style={{
            width: 6,
            height: 12,
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            background: ["#7ED321", "#FF9F1C", "#FF4D6D", "#fff"][i % 4],
          }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{ y: "120vh", opacity: [0, 1, 1, 0], rotate: 540 }}
          transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.8, repeat: Infinity, repeatDelay: 4 }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center text-white"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
          className="animate-glow gradient-fresh mx-auto flex h-28 w-28 items-center justify-center rounded-full shadow-glow"
        >
          <Check className="h-14 w-14" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display mt-8 text-3xl font-bold"
        >
          Buyurtmangiz qabul qilindi!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-3 text-sm font-light text-white/80"
        >
          Tez orada siz bilan bog'lanamiz
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="glass mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
        >
          <Clock className="h-4 w-4" />
          20–30 daqiqa
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <Link to="/" className="inline-block rounded-2xl bg-white/15 px-8 py-3 text-sm font-semibold backdrop-blur hover:bg-white/25">
            Bosh sahifaga qaytish
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
