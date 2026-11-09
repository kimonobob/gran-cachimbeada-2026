import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "rose";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink-950 hover:bg-gold-soft hover:shadow-[0_10px_40px_-12px_rgba(245,182,66,0.7)]",
  rose: "bg-rose text-cream hover:bg-[#e2609f] hover:shadow-[0_10px_40px_-12px_rgba(214,76,143,0.7)]",
  secondary:
    "border border-cream/20 bg-white/[0.03] text-cream backdrop-blur-sm hover:border-cream/45 hover:bg-white/[0.07]",
  ghost: "text-cream/75 hover:text-cream hover:bg-white/[0.06]",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
