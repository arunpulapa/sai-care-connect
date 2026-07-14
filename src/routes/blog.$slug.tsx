import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BatteryCharging,
  Smartphone,
  ShieldAlert,
  Zap,
  Wrench,
  Cpu,
  Clock,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  Info,
  Quote,
  ChevronDown,
  ArrowRight,
  MapPin,
  Calendar,
  type LucideIcon,
} from "lucide-react";
import { getPost, getRelatedPosts, type Block, type Post } from "../blog/posts";
import { categoryTheme } from "../blog/theme";
import { CoverArt } from "../components/blog/CoverArt";
import {
  BlogFooter,
  BlogFloatingActions,
  BackToBlog,
  SHOP_PHONE,
} from "../components/blog/BlogChrome";
import { SiteNavbar } from "../components/layout/SiteNavbar";

const SITE = "https://www.garoodamobiles.com";

const ICONS: Record<string, LucideIcon> = {
  BatteryCharging,
  Smartphone,
  ShieldAlert,
  Zap,
  Wrench,
  Cpu,
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const url = `${SITE}/blog/${post.slug}`;

    const articleLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      author: { "@type": "Organization", name: "Garooda Mobiles" },
      publisher: {
        "@type": "Organization",
        name: "Garooda Mobiles",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Opp-Chennai Shopping Mall",
          addressLocality: "Tadepalligudem",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
      },
      dateModified: post.updated,
      mainEntityOfPage: url,
    };

    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleLd) },
        { type: "application/ld+json", children: JSON.stringify(faqLd) },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: Article,
});

// ── Inline **bold** parser ─────────────────────────────────────────────
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

const CALLOUT_STYLES = {
  tip: {
    icon: Lightbulb,
    ring: "border-emerald-200 bg-emerald-50",
    chip: "bg-emerald-500",
    label: "text-emerald-700",
  },
  warning: {
    icon: AlertTriangle,
    ring: "border-red-200 bg-red-50",
    chip: "bg-red-500",
    label: "text-red-700",
  },
  info: { icon: Info, ring: "border-sky-200 bg-sky-50", chip: "bg-sky-500", label: "text-sky-700" },
  story: {
    icon: Quote,
    ring: "border-orange-200 bg-orange-50",
    chip: "bg-orange-500",
    label: "text-orange-700",
  },
} as const;

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[16.5px] leading-[1.8] text-slate-700">{renderInline(block.text)}</p>
      );

    case "h2":
      return (
        <h2
          id={block.id}
          className="section-anchor mt-14 mb-5 flex items-center gap-3 font-display text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900"
        >
          <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-500" />
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-8 mb-3 font-display text-lg font-bold tracking-tight text-slate-900">
          {block.text}
        </h3>
      );

    case "ul":
      return (
        <ul className="my-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-[1.75] text-slate-700">
              <CheckCircle2 className="mt-1 h-4.5 w-4.5 shrink-0 text-orange-500" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="my-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-[16px] leading-[1.75] text-slate-700">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-900 text-[12px] font-bold text-white">
                {i + 1}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case "steps":
      return (
        <div className="my-6 space-y-3">
          {block.items.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-colors hover:border-orange-200"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-sm font-bold text-white shadow-sm">
                {i + 1}
              </span>
              <div>
                <h4 className="font-display text-[15.5px] font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
                  {renderInline(step.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case "callout": {
      const s = CALLOUT_STYLES[block.variant];
      const Icon = s.icon;
      return (
        <div className={`my-6 flex gap-4 rounded-2xl border ${s.ring} p-5`}>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${s.chip} text-white`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div>
            {block.title && (
              <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${s.label}`}>
                {block.title}
              </p>
            )}
            <p className="mt-1 text-[15.5px] leading-relaxed text-slate-700">
              {renderInline(block.text)}
            </p>
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[520px] border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="bg-slate-900 text-white">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-slate-50" : "bg-white"}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`border-t border-slate-200 px-4 py-3 align-top leading-relaxed text-slate-700 ${
                        ci === 0 ? "font-semibold text-slate-900" : ""
                      }`}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "def":
      return (
        <div className="my-6 rounded-2xl border-l-4 border-orange-500 bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="font-display text-[15px] font-bold text-slate-900">{block.term}</p>
          <p className="mt-1.5 text-[15.5px] leading-relaxed text-slate-600">
            {renderInline(block.text)}
          </p>
        </div>
      );

    default:
      return null;
  }
}

function FaqAccordion({ faqs }: { faqs: Post["faqs"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-5 space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
              isOpen ? "border-orange-300 shadow-sm" : "border-slate-200"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-[15.5px] font-bold text-slate-900">{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-orange-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15.5px] leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Thin scroll-linked reading progress bar pinned under the navbar. */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 top-0 z-[55] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Tracks which section is in view to highlight the table of contents. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteNavbar active="blog" />
      <div className="section-shell px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900">Article not found</h1>
        <p className="mx-auto mt-3 max-w-sm text-slate-500">
          This guide may have moved. Browse all our repair tips instead.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-bold text-white"
        >
          Back to the blog
        </Link>
      </div>
      <BlogFooter />
    </div>
  );
}

function Article() {
  const { post } = Route.useLoaderData();
  const related = getRelatedPosts(post.slug);
  const HeroIcon = ICONS[post.icon] ?? Wrench;
  const theme = categoryTheme(post.category);

  const toc = post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const tocIds = useMemo(
    () =>
      post.body
        .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
        .map((b) => b.id)
        .concat("faqs"),
    [post.body],
  );
  const activeId = useActiveHeading(tocIds);
  const prettyDate = new Date(post.updated).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-orange-500/20">
      <SiteNavbar active="blog" />
      <ReadingProgress />

      {/* ARTICLE HEADER */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="section-shell relative px-4 sm:px-6 pt-8 pb-12 sm:pb-14">
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <BackToBlog />
            <span className="text-slate-300">/</span>
            <span className={`font-semibold ${theme.text}`}>{post.category}</span>
          </div>

          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ${theme.soft}`}
                >
                  <HeroIcon className="h-4 w-4" /> {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar className="h-3.5 w-3.5" /> Updated {prettyDate}
                </span>
              </div>

              <h1 className="mt-5 max-w-3xl font-display text-3xl sm:text-[42px] font-bold leading-[1.08] tracking-tight text-slate-900">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-extrabold text-orange-400">
                  G
                </span>
                <div className="text-sm leading-tight">
                  <p className="font-bold text-slate-800">Garooda Mobiles Team</p>
                  <p className="text-slate-400">Repair technicians · Tadepalligudem</p>
                </div>
              </div>
            </div>

            <CoverArt
              Icon={HeroIcon}
              gradient={theme.gradient}
              className="hidden h-44 w-44 rounded-3xl shadow-lg md:block"
              iconClassName="h-16 w-16"
            />
          </div>
        </div>
      </header>

      {/* BODY + TOC */}
      <div className="section-shell px-4 sm:px-6 py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
        <article className="min-w-0 max-w-2xl">
          {/* Key takeaways */}
          <div className="mb-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkle /> Key takeaways
            </p>
            <ul className="mt-4 space-y-2.5">
              {post.keyTakeaways.map((k, i) => (
                <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange-500" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rendered body (drop-cap on first paragraph via .article-body) */}
          <div className="article-body">
            {post.body.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>

          {/* FAQ */}
          <h2
            id="faqs"
            className="section-anchor mt-14 mb-2 flex items-center gap-3 font-display text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900"
          >
            <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-amber-500" />
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={post.faqs} />

          {/* Inline CTA */}
          <div className="mt-14 overflow-hidden rounded-3xl section-dark px-6 sm:px-9 py-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Need a hand from a real technician?
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
                  <MapPin className="h-4 w-4 text-orange-500" /> Opp-Chennai Shopping Mall,
                  Tadepalligudem · Free doorstep pickup
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={`https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(
                    "Hi Garooda Mobiles, I read your blog and need help with my device.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-95"
                >
                  Chat on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+918125019015"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Call now
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* TOC — sticky on desktop, with active-section highlight */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              On this page
            </p>
            <nav className="mt-4 space-y-1 border-l border-slate-200">
              {toc.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13.5px] leading-snug transition-colors ${
                    activeId === h.id
                      ? "border-orange-500 font-semibold text-orange-600"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                  }`}
                >
                  {h.text}
                </a>
              ))}
              <a
                href="#faqs"
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13.5px] leading-snug transition-colors ${
                  activeId === "faqs"
                    ? "border-orange-500 font-semibold text-orange-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                Frequently Asked Questions
              </a>
            </nav>

            {/* mini help card */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-display text-sm font-bold text-slate-900">Same-day repairs</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                Genuine parts · 30-day warranty · free pickup in Tadepalligudem.
              </p>
              <Link
                to="/"
                hash="intake-form"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-[13px] font-bold text-white transition-transform hover:scale-[1.02]"
              >
                Book a repair
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* RELATED */}
      <section className="border-t border-slate-200 bg-white">
        <div className="section-shell px-4 sm:px-6 py-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Keep reading
          </h2>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => {
              const Icon = ICONS[r.icon] ?? Wrench;
              const rt = categoryTheme(r.category);
              return (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 ${rt.glow}`}
                >
                  <CoverArt
                    Icon={Icon}
                    gradient={rt.gradient}
                    className="h-28"
                    iconClassName="h-10 w-10"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${rt.text}`}>
                      {r.category}
                    </span>
                    <h3 className="mt-1.5 font-display text-[16px] font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
                      {r.title}
                    </h3>
                    <span
                      className={`mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold ${rt.text}`}
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <BlogFooter />
      <BlogFloatingActions />
    </div>
  );
}

// Small inline sparkle to avoid another import name clash.
function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-orange-500"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.9 5.3L19 9.2l-5.1 1.9L12 16l-1.9-4.9L5 9.2l5.1-1.9L12 2z" />
    </svg>
  );
}
