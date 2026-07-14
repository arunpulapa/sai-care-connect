import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BatteryCharging,
  Smartphone,
  ShieldAlert,
  Zap,
  Wrench,
  Cpu,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";
import { POSTS } from "../blog/posts";
import { categoryTheme } from "../blog/theme";
import { CoverArt } from "../components/blog/CoverArt";
import { BlogFooter, BlogFloatingActions } from "../components/blog/BlogChrome";
import { SiteNavbar } from "../components/layout/SiteNavbar";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Mobile Repair Tips & Guides — Garooda Mobiles Blog | Tadepalligudem" },
      {
        name: "description",
        content:
          "Expert phone repair guides from Garooda Mobiles, Tadepalligudem — fix slow charging, save a water-damaged phone, extend battery life, and know when to visit a pro.",
      },
      { property: "og:title", content: "Garooda Mobiles Blog — Phone Repair Tips & Guides" },
      {
        property: "og:description",
        content: "Practical, expert mobile repair guides for Tadepalligudem & West Godavari.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const ICONS: Record<string, LucideIcon> = {
  BatteryCharging,
  Smartphone,
  ShieldAlert,
  Zap,
  Wrench,
  Cpu,
};

function BlogIndex() {
  const [activeCat, setActiveCat] = useState<string>("All");

  const categories = useMemo(() => {
    const set = Array.from(new Set(POSTS.map((p) => p.category)));
    return ["All", ...set];
  }, []);

  const visible = useMemo(
    () => (activeCat === "All" ? POSTS : POSTS.filter((p) => p.category === activeCat)),
    [activeCat],
  );

  const featured = POSTS[0];
  const FeaturedIcon = ICONS[featured.icon] ?? Wrench;
  const featTheme = categoryTheme(featured.category);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-500/20">
      <SiteNavbar active="blog" />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" />
        <div className="pointer-events-none absolute -top-24 -right-16 h-96 w-96 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="section-shell relative px-4 sm:px-6 py-16 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-300">
            <BookOpen className="h-3.5 w-3.5" /> Garooda Journal
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl sm:text-6xl font-bold leading-[1.03] tracking-tight">
            Phone repair tips from{" "}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              real technicians
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
            Practical, no-jargon advice from the Garooda Mobiles workbench in Tadepalligudem — fix
            everyday phone problems yourself, dodge the costly myths, and know exactly when it's
            time to see a pro.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-orange-400" /> {POSTS.length} in-depth guides
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" /> Genuine-parts advice
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-400 fill-orange-400" /> 5,000+ repairs done
            </span>
          </div>
        </div>
      </section>

      <main className="section-shell px-4 sm:px-6 py-12 sm:py-16">
        {/* FEATURED */}
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Editor's pick
        </p>
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className={`group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 ${featTheme.glow}`}
        >
          <div className="grid md:grid-cols-2">
            <CoverArt
              Icon={FeaturedIcon}
              gradient={featTheme.gradient}
              className="min-h-[240px] md:min-h-[340px]"
              iconClassName="h-20 w-20"
            />
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className={`rounded-full px-3 py-1 ${featTheme.soft}`}>
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min read
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl sm:text-[32px] font-bold leading-[1.1] tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
                {featured.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{featured.excerpt}</p>
              <span
                className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${featTheme.text}`}
              >
                Read the guide
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>

        {/* CATEGORY FILTER */}
        <div className="mt-14 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Browse
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                activeCat === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => {
            const Icon = ICONS[post.icon] ?? Wrench;
            const theme = categoryTheme(post.category);
            return (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 ${theme.glow}`}
              >
                <div className="relative">
                  <CoverArt
                    Icon={Icon}
                    gradient={theme.gradient}
                    className="h-40"
                    iconClassName="h-12 w-12"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
                  </div>
                  <h3 className="mt-2.5 font-display text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold ${theme.text}`}
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA STRIP */}
        <div className="relative mt-16 overflow-hidden rounded-3xl section-dark px-7 sm:px-12 py-11 sm:py-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.06]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300">
              <Sparkles className="h-3.5 w-3.5" /> Free doorstep pickup
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-[32px] font-bold text-white">
              Still stuck? Let the experts take a look.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-neutral-400">
              Free diagnostic, transparent pricing, genuine parts, and free doorstep pickup within
              Tadepalligudem. Book your repair in under 2 minutes.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                hash="intake-form"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
              >
                Book a Repair Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+918125019015"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Call 8125019015
              </a>
            </div>
          </div>
        </div>
      </main>

      <BlogFooter />
      <BlogFloatingActions />
    </div>
  );
}
