import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-neutral-900">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-orange-500">g</span>
      garooda<span className="font-medium text-neutral-400"> mobiles</span>
    </span>
  );
}

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 text-center">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="relative">
        <BrandMark />
        <h1 className="mt-10 font-display text-8xl sm:text-9xl font-bold tracking-tight text-neutral-900">
          4<span className="text-orange-500">0</span>4
        </h1>
        <h2 className="mt-4 font-display text-2xl font-bold text-neutral-800">Page not found</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
          The page you're looking for doesn't exist or has moved. Let's get you back to booking your repair.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to home
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 text-center">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="relative">
        <BrandMark />
        <div className="mx-auto mt-10 grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 border border-orange-100 text-3xl">
          🔧
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-neutral-900">
          This page didn't load
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
          Something went wrong on our end. Try refreshing, or head back home — your booking is safe.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-orange-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "garooda Mobiles — Premium Device Repair in Tadepalligudem" },
      { name: "description", content: "Premium mobile & device repair in Tadepalligudem — genuine parts, transparent pricing, doorstep pickup and same-day service." },
      { name: "author", content: "garooda Mobiles" },
      { property: "og:title", content: "garooda Mobiles — Device Repair in Tadepalligudem" },
      { property: "og:description", content: "Genuine parts, transparent pricing, same-day repairs. Book instantly on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
    </QueryClientProvider>
  );
}
