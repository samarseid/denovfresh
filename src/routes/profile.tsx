import { createFileRoute } from "@tanstack/react-router";
import { Phone, Instagram, MapPin, Clock, Heart, Send, Crown } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { useTelegramUser } from "@/lib/telegram";
import { useCart } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profil — Denov Fresh" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, isTelegram } = useTelegramUser();
  const cartCount = useCart((s) => s.count());

  const fullName = user ? `${user.first_name}${user.last_name ? " " + user.last_name : ""}` : "Mehmon";
  const initials = user
    ? `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase() || "U"
    : "G";

  return (
    <div className="bg-background min-h-screen pb-28">
      <header className="sticky top-0 z-30 px-4 pt-4">
        <div className="glass-strong mx-auto flex max-w-md items-center justify-between rounded-2xl px-4 py-3">
          <h1 className="font-display text-xl font-bold">Profil</h1>
        </div>
      </header>

      <main className="mx-auto mt-4 max-w-md space-y-3 px-4">
        {/* User card */}
        <div className="gradient-fresh shadow-glow relative overflow-hidden rounded-3xl p-6 text-white">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <div className="relative">
              {user?.photo_url ? (
                <img
                  src={user.photo_url}
                  alt={fullName}
                  className="h-16 w-16 rounded-2xl border-2 border-white/40 object-cover shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/40 bg-white/20 font-display text-2xl font-bold backdrop-blur">
                  {initials}
                </div>
              )}
              {user?.is_premium && (
                <div className="bg-mango absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow ring-2 ring-white/60">
                  <Crown className="h-3.5 w-3.5" fill="currentColor" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display truncate text-xl font-bold">{fullName}</div>
              {user?.username ? (
                <div className="text-xs opacity-90">@{user.username}</div>
              ) : !isTelegram ? (
                <div className="text-xs opacity-80">Telegram orqali kiring</div>
              ) : (
                <div className="text-xs opacity-80">Telegram foydalanuvchi</div>
              )}
              {user?.id && (
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] backdrop-blur">
                  ID: {user.id}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
            <Heart className="h-3 w-3" fill="currentColor" /> Premium fresh experience
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Savatchada" value={`${cartCount}`} hint="ta tovar" />
          <Stat label="Status" value={user?.is_premium ? "Premium" : "Standart"} hint="Telegram" />
        </div>

        {/* Contacts */}
        <Row icon={<Phone className="h-5 w-5" />} title="Telefon" value="+998 90 417 20 08" href="tel:+998904172008" />
        <Row icon={<Instagram className="h-5 w-5" />} title="Instagram" value="@denov.fresh" href="https://instagram.com/denov.fresh" />
        <Row icon={<Send className="h-5 w-5" />} title="Telegram kanal" value="Denov Fresh" href="https://t.me/denovfresh" />
        <Row icon={<MapPin className="h-5 w-5" />} title="Manzil" value="Denov shahri" />
        <Row icon={<Clock className="h-5 w-5" />} title="Ish vaqti" value="Har kuni 10:00 — 23:00" />

        <p className="text-muted-foreground pt-4 text-center text-xs">
          © {new Date().getFullYear()} Denov Fresh — Freshness in every sip
        </p>
      </main>

      <BottomNav />
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-card shadow-card rounded-2xl p-4">
      <div className="text-muted-foreground text-[11px] uppercase tracking-wider">{label}</div>
      <div className="text-gradient-fresh font-display mt-1 text-2xl font-bold">{value}</div>
      <div className="text-muted-foreground text-[10px]">{hint}</div>
    </div>
  );
}

function Row({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const Inner = (
    <div className="bg-card shadow-card flex items-center gap-3 rounded-2xl p-4">
      <div className="gradient-cool text-fresh flex h-11 w-11 items-center justify-center rounded-2xl">{icon}</div>
      <div className="flex-1">
        <div className="text-muted-foreground text-[11px] uppercase tracking-wider">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {Inner}
    </a>
  ) : (
    Inner
  );
}
