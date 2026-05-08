import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, MapPin, MessageSquare, Phone, User, Wallet } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatSum } from "@/lib/products";
import { useTelegramUser, hapticSuccess, haptic } from "@/lib/telegram";
import { submitOrder } from "@/lib/order.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Buyurtma berish — Denov Fresh" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);
  const nav = useNavigate();
  const { user, initData } = useTelegramUser();
  const submit = useServerFn(submitOrder);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill name from Telegram
  useEffect(() => {
    if (user && !name) {
      setName(`${user.first_name}${user.last_name ? " " + user.last_name : ""}`);
    }
  }, [user, name]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 12 || !address.trim()) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      haptic("medium");
      return;
    }
    setLoading(true);
    try {
      const res = await submit({
        data: {
          initData,
          customer: { name: name.trim(), phone: phone.trim(), address: address.trim(), note: note.trim() },
          tgUser: user
            ? { id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name }
            : undefined,
          items: items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.qty, price: i.product.price })),
          total,
        },
      });

      if (res.ok) {
        hapticSuccess();
        clear();
        nav({ to: "/success" });
      } else {
        toast.error("Buyurtma yuborilmadi. Qayta urinib ko'ring");
      }
    } catch (err) {
      console.error(err);
      toast.error("Tarmoq xatosi. Qayta urinib ko'ring");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-xl font-bold">Savatcha bo'sh</h1>
          <Link to="/menu" className="gradient-fresh mt-4 inline-block rounded-2xl px-5 py-2.5 text-sm font-semibold text-white">
            Menyuga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32">
      <header className="sticky top-0 z-30 px-4 pt-4">
        <div className="glass-strong mx-auto flex max-w-md items-center gap-3 rounded-2xl px-3 py-3">
          <Link to="/cart" className="hover:bg-secondary flex h-9 w-9 items-center justify-center rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-lg font-bold">Buyurtma berish</h1>
        </div>
      </header>

      <main className="mx-auto mt-5 max-w-md px-4">
        {user && (
          <div className="glass mb-3 flex items-center gap-3 rounded-2xl p-3">
            {user.photo_url ? (
              <img src={user.photo_url} alt="" className="h-9 w-9 rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="bg-fresh/15 text-fresh flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold">
                {user.first_name[0]}
              </div>
            )}
            <div className="min-w-0 flex-1 text-xs">
              <div className="text-muted-foreground">Telegram orqali</div>
              <div className="truncate font-semibold">
                {user.first_name} {user.last_name ?? ""}
                {user.username && <span className="text-muted-foreground"> · @{user.username}</span>}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <Field icon={<User className="h-4 w-4" />} label="Ism">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingiz"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>

          <Field icon={<Phone className="h-4 w-4" />} label="Telefon">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 90 417 20 08"
              inputMode="tel"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>

          <Field icon={<MapPin className="h-4 w-4" />} label="Manzil">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ko'cha, uy, kvartira"
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>

          <Field icon={<MessageSquare className="h-4 w-4" />} label="Izoh (ixtiyoriy)">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Domofon, qavat va h.k."
              rows={2}
              className="w-full resize-none bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>

          {/* Payment */}
          <div className="bg-card shadow-card rounded-2xl p-4">
            <div className="text-muted-foreground mb-2 text-xs">To'lov turi</div>
            <div className="bg-secondary flex items-center gap-3 rounded-xl p-3">
              <div className="gradient-fresh flex h-10 w-10 items-center justify-center rounded-xl text-white">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Naqd</div>
                <div className="text-muted-foreground text-xs">Yetkazilganda to'laysiz</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card shadow-card rounded-2xl p-4">
            <div className="text-muted-foreground mb-2 text-xs">Buyurtma</div>
            <div className="space-y-1.5 text-sm">
              {items.map((i) => (
                <div key={i.product.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {i.product.name} ×{i.qty}
                  </span>
                  <span className="font-medium">{formatSum(i.product.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-display font-semibold">Jami</span>
              <span className="text-gradient-fresh font-display text-xl font-bold">{formatSum(total)}</span>
            </div>
          </div>
        </form>
      </main>

      <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="fixed inset-x-0 bottom-0 z-30 px-4 pb-5 pt-3">
        <div className="mx-auto max-w-md">
          <button
            onClick={onSubmit}
            disabled={loading}
            className="gradient-fresh shadow-glow w-full rounded-2xl py-4 font-display text-base font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Yuborilmoqda..." : `Buyurtmani tasdiqlash · ${formatSum(total)}`}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="bg-card shadow-card block rounded-2xl p-4">
      <div className="text-muted-foreground mb-1.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider">
        <span className="text-fresh">{icon}</span>
        {label}
      </div>
      <div className="text-foreground text-sm">{children}</div>
    </label>
  );
}
