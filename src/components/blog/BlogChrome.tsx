import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone as PhoneIcon,
  Instagram,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import garoodaLogo from "../../assets/garooda_logo.jpeg";
import akNextgenLogo from "../../assets/logo_no_bg.png";
import { SHOP_PHONE, WhatsAppIcon } from "../layout/brand";

// Re-exported so existing imports that pull these from BlogChrome keep working.
export { SHOP_PHONE, WhatsAppIcon };

const WA_TEXT = "Hi Garooda Mobiles, I have a question about my device.";

export function BlogFooter() {
  return (
    <footer className="mt-16">
      <div className="section-dark text-neutral-300">
        <div className="section-shell px-6 sm:px-10 py-12 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1.2fr]">
            <div>
              <img src={garoodaLogo} alt="Garooda Mobiles" className="h-11 w-auto rounded-lg" />
              <p className="mt-5 text-sm leading-relaxed text-neutral-400 max-w-xs">
                Tadepalligudem's most trusted mobile &amp; device repair shop — genuine parts,
                transparent pricing, and same-day service you can count on.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/garoodamobiles_tadepalligudem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow us on Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a
                  href={`https://wa.me/${SHOP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="tel:+918125019015"
                  title="Call"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
                >
                  <PhoneIcon className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                Explore
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/blog"
                    className="text-neutral-400 hover:text-orange-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="services"
                    className="text-neutral-400 hover:text-orange-400 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="pricing"
                    className="text-neutral-400 hover:text-orange-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    hash="intake-form"
                    className="text-neutral-400 hover:text-orange-400 transition-colors"
                  >
                    Book Repair
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                Visit Us
              </h4>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                  <span>
                    Opp-Chennai Shopping Mall,
                    <br />
                    Tadepalligudem, Andhra Pradesh
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <PhoneIcon className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                  <a href="tel:+918125019015" className="hover:text-orange-400 transition-colors">
                    +91 81250 19015
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid place-items-center h-4.5 w-4.5 shrink-0">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  </span>
                  <span>
                    Mon–Sun · 10:00 AM – 10:00 PM{" "}
                    <span className="text-neutral-600">(Tue closed)</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <span className="text-xs text-neutral-500 text-center sm:text-left">
              © {new Date().getFullYear()} Garooda Mobiles · Opp-Chennai Shopping Mall,
              Tadepalligudem. All Rights Reserved.
            </span>
            <a
              href="https://aknextgensolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] pl-2.5 pr-4 py-2.5 hover:border-orange-400/40 hover:bg-white/[0.07] transition-all duration-300"
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-black/25 ring-1 ring-white/10">
                <img
                  src={akNextgenLogo}
                  alt="AK NextGen Solutions logo"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="flex flex-col items-start text-left">
                <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-neutral-500">
                  Designed &amp; Developed by
                </span>
                <span className="text-sm font-extrabold tracking-tight text-orange-300 leading-tight">
                  AK NextGen Solutions
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-orange-400 transition-all duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Floating WhatsApp bubble + scroll-to-top, shared by all blog pages. */
export function BlogFloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-24 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-600 border border-slate-200 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.28)] hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <a
        href={`https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(WA_TEXT)}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-6 right-5 z-[60] flex items-center gap-3"
      >
        <span className="hidden sm:block max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white text-slate-700 text-sm font-semibold shadow-lg border border-slate-100 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:px-4 group-hover:py-2.5 transition-all duration-300">
          Chat with us on WhatsApp
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-110 active:scale-95">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
      </a>
    </>
  );
}

/** Small back-to-blog breadcrumb link used on article pages. */
export function BackToBlog() {
  return (
    <Link
      to="/blog"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" /> All articles
    </Link>
  );
}
