import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  MapPin,
  Phone as PhoneIcon,
  Instagram,
  Globe,
  Wrench,
  ClipboardList,
  Zap,
  Menu,
  X,
} from "lucide-react";
import garoodaLogo from "../../assets/garooda_logo.jpeg";
import { SHOP_PHONE, WhatsAppIcon } from "./brand";

export interface NavItem {
  label: string;
  /** Section id on the home page. Use "top" for the top of the page. */
  id: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Home", id: "top" },
  { label: "Services", id: "services" },
  { label: "Pricing", id: "pricing" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

export interface SiteNavbarProps {
  /** Which page is active — controls the highlighted item. */
  active?: "home" | "blog";
  /** Section links (label + home section id). Defaults to the standard set. */
  navItems?: NavItem[];
  blogLabel?: string;
  bookLabel?: string;
  hubOperational?: string;

  /**
   * Smooth in-page scroll for section links. Provide this on the home page.
   * When omitted (blog & other pages), section links navigate to "/" + hash.
   */
  onSection?: (id: string) => void;
  /** Home: smooth-scroll to the booking form. Otherwise links to /#intake-form. */
  onBook?: () => void;
  /** Home: reset view + scroll to top on brand click. Otherwise links to "/". */
  onBrand?: () => void;

  /** Bilingual toggle (home only). Rendered only when onToggleLang is provided. */
  lang?: "en" | "te";
  onToggleLang?: () => void;

  /** Technician portal toggle (home only). */
  viewMode?: "client" | "technician";
  isAuthorized?: boolean;
  onToggleView?: () => void;
  techLabel?: string;
  clientLabel?: string;
}

export function SiteNavbar({
  active = "home",
  navItems = DEFAULT_ITEMS,
  blogLabel = "Blog",
  bookLabel = "Book Repair",
  hubOperational = "Open Now",
  onSection,
  onBook,
  onBrand,
  lang,
  onToggleLang,
  viewMode = "client",
  isAuthorized = false,
  onToggleView,
  techLabel = "Technician Panel",
  clientLabel = "Customer View",
}: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isClient = viewMode === "client";

  // Renders a section link as a smooth-scroll button (home) or a cross-page
  // Link that lands on "/" and scrolls to the matching section (other pages).
  const sectionLink = (item: NavItem, className: string, onNavigate?: () => void): ReactNode => {
    if (onSection) {
      return (
        <button
          key={item.label}
          onClick={() => {
            onNavigate?.();
            onSection(item.id);
          }}
          className={className}
        >
          {item.label}
        </button>
      );
    }
    if (item.id === "top") {
      return (
        <Link key={item.label} to="/" onClick={onNavigate} className={className}>
          {item.label}
        </Link>
      );
    }
    return (
      <Link key={item.label} to="/" hash={item.id} onClick={onNavigate} className={className}>
        {item.label}
      </Link>
    );
  };

  const desktopItemCls =
    "text-[13px] font-semibold text-slate-600 hover:text-orange-600 transition-all duration-300 cursor-pointer relative py-1.5 group";
  const mobileItemCls =
    "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 cursor-pointer";

  const underline = (
    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 group-hover:w-full" />
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Tier 1: utility strip ── */}
      <div className="hidden md:block bg-slate-900 text-slate-300">
        <div className="section-shell flex items-center justify-between gap-6 px-6 h-9 text-[11.5px] font-medium">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Garooda+Mobiles+Tadepalligudem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" />
            <span>Opp-Chennai Shopping Mall, Tadepalligudem</span>
          </a>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              <span className="font-semibold text-orange-300">{hubOperational}</span>
              <span className="text-slate-500">· 10 AM – 10 PM</span>
            </span>
            <span className="h-3.5 w-px bg-white/10" />
            <a
              href="tel:+918125019015"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-orange-400" /> +91 81250 19015
            </a>
            {onToggleLang && (
              <>
                <span className="h-3.5 w-px bg-white/10" />
                <button
                  onClick={onToggleLang}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  title="Switch language"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {lang === "en" ? "తెలుగు" : "English"}
                </button>
              </>
            )}
            <span className="h-3.5 w-px bg-white/10" />
            <a
              href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-white transition-colors"
              title="Follow us on Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Tier 2: main bar ── */}
      <div className="backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
        <div className="section-shell flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
          {/* Brand */}
          {onBrand ? (
            <button
              onClick={onBrand}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
              aria-label="Garooda Mobiles — home"
            >
              <BrandLogo />
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="Garooda Mobiles — home"
            >
              <BrandLogo />
            </Link>
          )}

          {/* Desktop nav */}
          {isClient && (
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => sectionLink(item, desktopItemCls))}
              <Link
                to="/blog"
                className={
                  active === "blog"
                    ? "text-[13px] font-semibold text-orange-600 transition-all duration-300 relative py-1.5"
                    : desktopItemCls
                }
                aria-current={active === "blog" ? "page" : undefined}
              >
                {blogLabel}
                {active !== "blog" && underline}
              </Link>
            </nav>
          )}

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthorized && onToggleView && (
              <button
                onClick={onToggleView}
                className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-50 hover:bg-orange-100 px-3.5 py-2.5 text-xs font-bold tracking-wide text-orange-700 transition-all duration-300 cursor-pointer"
              >
                {isClient ? (
                  <>
                    <Wrench className="h-3.5 w-3.5" />
                    <span className="hidden lg:inline">{techLabel}</span>
                  </>
                ) : (
                  <>
                    <ClipboardList className="h-3.5 w-3.5" />
                    <span className="hidden lg:inline">{clientLabel}</span>
                  </>
                )}
              </button>
            )}

            {/* Call — mobile only */}
            <a
              href="tel:+918125019015"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-orange-600 shadow-sm transition active:scale-95"
              aria-label="Call Garooda Mobiles"
            >
              <PhoneIcon className="h-4.5 w-4.5" />
            </a>

            {/* Primary CTA — Book */}
            {isClient &&
              (onBook ? (
                <button
                  onClick={onBook}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm px-4 sm:px-5 py-2.5 shadow-[0_8px_20px_-6px_rgba(249,115,22,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  <span className="hidden sm:inline">{bookLabel}</span>
                  <span className="sm:hidden">Book</span>
                </button>
              ) : (
                <a
                  href="/#intake-form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm px-4 sm:px-5 py-2.5 shadow-[0_8px_20px_-6px_rgba(249,115,22,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  <span className="hidden sm:inline">{bookLabel}</span>
                  <span className="sm:hidden">Book</span>
                </a>
              ))}

            {/* Mobile menu toggle */}
            {isClient && (
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {isClient && menuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="section-shell px-4 sm:px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => sectionLink(item, mobileItemCls, () => setMenuOpen(false)))}
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className={
                active === "blog" ? `${mobileItemCls} text-orange-700 bg-orange-50` : mobileItemCls
              }
            >
              {blogLabel}
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {onBook ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onBook();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm px-4 py-3 shadow-sm transition active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  {bookLabel}
                </button>
              ) : (
                <a
                  href="/#intake-form"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm px-4 py-3 shadow-sm transition active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  {bookLabel}
                </a>
              )}
              <a
                href={`https://wa.me/${SHOP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold text-sm px-4 py-3 shadow-sm transition active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
            {/* utility row */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <a
                href="tel:+918125019015"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
              >
                <PhoneIcon className="h-4 w-4 text-orange-500" /> +91 81250 19015
              </a>
              <div className="flex items-center gap-2">
                {onToggleLang && (
                  <button
                    onClick={onToggleLang}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {lang === "en" ? "తెలుగు" : "English"}
                  </button>
                )}
                <a
                  href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function BrandLogo() {
  return (
    <div className="relative">
      <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-md opacity-20 group-hover:opacity-35 transition duration-300" />
      <img
        src={garoodaLogo}
        alt="Garooda Mobiles Logo"
        className="relative h-10 w-auto object-contain rounded-xl mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}
