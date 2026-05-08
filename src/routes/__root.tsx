import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-gradient-fresh font-display text-7xl font-bold">404</h1>
        <h2 className="text-foreground mt-4 text-xl font-semibold">Sahifa topilmadi</h2>
        <p className="text-muted-foreground mt-2 text-sm">Bu sahifa mavjud emas.</p>
        <div className="mt-6">
          <Link to="/" className="gradient-fresh shadow-glow inline-flex rounded-2xl px-6 py-3 text-sm font-medium text-white">
            Bosh sahifa
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-foreground text-xl font-semibold">Xatolik yuz berdi</h1>
        <p className="text-muted-foreground mt-2 text-sm">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="gradient-fresh mt-4 rounded-2xl px-6 py-3 text-sm font-medium text-white"
        >
          Qayta urinish
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0B6B2E" },
      { title: "Denov Fresh — Freshness in Every Sip" },
      { name: "description", content: "Premium fresh kokteyl, smuzi, moxito va vaflilar — Denov shahri bo'ylab tez yetkazib berish." },
      { property: "og:title", content: "Denov Fresh — Freshness in Every Sip" },
      { property: "og:description", content: "Premium kokteyl, smuzi, moxito va vaflilar." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Sora:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [{ src: "https://telegram.org/js/telegram-web-app.js", defer: true }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
