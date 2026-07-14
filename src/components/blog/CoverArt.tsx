import type { LucideIcon } from "lucide-react";

/**
 * Decorative, illustration-style cover art for blog cards & headers.
 * Pure CSS + a Lucide icon — no photography, so there are zero image-licensing
 * concerns. A category gradient is layered with a dot grid, soft glow blobs and
 * a large faded icon watermark, with the topic icon centred on top.
 */
export function CoverArt({
  Icon,
  gradient,
  className = "",
  iconClassName = "h-14 w-14",
}: {
  Icon: LucideIcon;
  gradient: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {/* dotted texture */}
      <div className="pointer-events-none absolute inset-0 cover-dots opacity-30" />
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-10 -left-8 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-6 h-40 w-40 rounded-full bg-black/10 blur-2xl" />
      {/* large watermark icon */}
      <Icon
        className="pointer-events-none absolute -right-5 -bottom-6 h-40 w-40 text-white/15"
        strokeWidth={1.1}
      />
      {/* focal icon */}
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="grid place-items-center rounded-2xl bg-white/15 p-4 ring-1 ring-white/25 backdrop-blur-sm">
          <Icon className={`text-white ${iconClassName}`} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  );
}
