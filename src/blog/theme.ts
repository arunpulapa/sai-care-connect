// Per-category visual theme for the blog. Every string is a full, literal
// Tailwind class so the compiler can see it (no dynamic class construction).
// This lets each topic own a distinct accent while staying on-brand.

export interface CategoryTheme {
  /** Rich gradient used on cover art panels. */
  gradient: string;
  /** Soft chip/badge background + text. */
  soft: string;
  /** Accent text colour. */
  text: string;
  /** Solid accent dot / bar. */
  dot: string;
  /** Hover glow shadow (arbitrary colour). */
  glow: string;
}

const THEMES: Record<string, CategoryTheme> = {
  Charging: {
    gradient: "from-amber-400 via-amber-500 to-orange-600",
    soft: "bg-amber-50 text-amber-700",
    text: "text-amber-600",
    dot: "bg-amber-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(245,158,11,0.45)]",
  },
  Battery: {
    gradient: "from-emerald-400 via-emerald-500 to-teal-600",
    soft: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(16,185,129,0.45)]",
  },
  "Screen Repair": {
    gradient: "from-violet-400 via-violet-500 to-purple-600",
    soft: "bg-violet-50 text-violet-700",
    text: "text-violet-600",
    dot: "bg-violet-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(139,92,246,0.45)]",
  },
  "Water Damage": {
    gradient: "from-sky-400 via-sky-500 to-blue-600",
    soft: "bg-sky-50 text-sky-700",
    text: "text-sky-600",
    dot: "bg-sky-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(14,165,233,0.45)]",
  },
  Overheating: {
    gradient: "from-orange-400 via-red-500 to-rose-600",
    soft: "bg-red-50 text-red-700",
    text: "text-red-600",
    dot: "bg-red-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(239,68,68,0.45)]",
  },
  Diagnostics: {
    gradient: "from-indigo-400 via-indigo-500 to-blue-600",
    soft: "bg-indigo-50 text-indigo-700",
    text: "text-indigo-600",
    dot: "bg-indigo-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(99,102,241,0.45)]",
  },
  Software: {
    gradient: "from-fuchsia-400 via-fuchsia-500 to-purple-600",
    soft: "bg-fuchsia-50 text-fuchsia-700",
    text: "text-fuchsia-600",
    dot: "bg-fuchsia-500",
    glow: "hover:shadow-[0_28px_56px_-24px_rgba(217,70,239,0.45)]",
  },
};

const FALLBACK: CategoryTheme = {
  gradient: "from-orange-400 via-orange-500 to-amber-600",
  soft: "bg-orange-50 text-orange-700",
  text: "text-orange-600",
  dot: "bg-orange-500",
  glow: "hover:shadow-[0_28px_56px_-24px_rgba(249,115,22,0.45)]",
};

export function categoryTheme(category: string): CategoryTheme {
  return THEMES[category] ?? FALLBACK;
}
