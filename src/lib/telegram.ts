import { useEffect, useState } from "react";

export type TgUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
  is_premium?: boolean;
};

type TelegramWebApp = {
  initData: string;
  initDataUnsafe?: { user?: TgUser; start_param?: string };
  ready: () => void;
  expand: () => void;
  setHeaderColor?: (c: string) => void;
  setBackgroundColor?: (c: string) => void;
  enableClosingConfirmation?: () => void;
  HapticFeedback?: { impactOccurred: (s: "light" | "medium" | "heavy") => void; notificationOccurred: (s: "success" | "error" | "warning") => void };
  MainButton?: { hide: () => void };
  colorScheme?: "light" | "dark";
  themeParams?: Record<string, string>;
};

export function getTg(): TelegramWebApp | null {
  if (typeof window === "undefined") return null;
  return (window as any)?.Telegram?.WebApp ?? null;
}

let _initialized = false;

export function initTelegram() {
  const tg = getTg();
  if (!tg || _initialized) return;
  _initialized = true;
  try {
    tg.ready();
    tg.expand();
    tg.setHeaderColor?.("#0B6B2E");
    tg.setBackgroundColor?.("#F7FBF9");
  } catch (e) {
    console.warn("[telegram] init failed", e);
  }
}

export function haptic(type: "light" | "medium" | "heavy" = "light") {
  getTg()?.HapticFeedback?.impactOccurred(type);
}

export function hapticSuccess() {
  getTg()?.HapticFeedback?.notificationOccurred("success");
}

export function useTelegramUser() {
  const [user, setUser] = useState<TgUser | null>(null);
  const [initData, setInitData] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let tries = 0;
    const tick = () => {
      const tg = getTg();
      if (tg) {
        initTelegram();
        setUser(tg.initDataUnsafe?.user ?? null);
        setInitData(tg.initData ?? "");
        setReady(true);
        return;
      }
      if (tries++ < 30) setTimeout(tick, 100);
      else setReady(true);
    };
    tick();
  }, []);

  return { user, initData, ready, isTelegram: !!getTg() };
}
