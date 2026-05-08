import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "var(--gradient-splash)" }}
        >
          {/* Floating particles */}
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6 + Math.random() * 14,
                height: 6 + Math.random() * 14,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 ? "var(--lime)" : "var(--berry)",
                filter: "blur(6px)",
                opacity: 0.5,
              }}
              animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            <motion.div
              className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl glass-strong shadow-glow"
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-5xl">🥤</span>
            </motion.div>

            <h1 className="font-display text-5xl font-bold tracking-tight text-white">
              DENOV <span style={{ color: "var(--lime)" }}>FRESH</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-sm font-light tracking-[0.3em] text-white/70"
            >
              FRESHNESS IN EVERY SIP
            </motion.p>

            <motion.div
              className="mt-10 h-0.5 w-32 overflow-hidden rounded-full bg-white/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full"
                style={{ background: "var(--gradient-fresh)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
