import { Link, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/store";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const count = useCart((s) => s.count());

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2">
      <div className="glass-strong shadow-float mx-auto flex max-w-md items-center justify-around rounded-3xl px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                  active ? "gradient-fresh shadow-glow text-primary-foreground scale-110" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {to === "/cart" && count > 0 && (
                  <span className="bg-berry absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white shadow">
                    {count}
                  </span>
                )}
              </span>
              <span className={`text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
