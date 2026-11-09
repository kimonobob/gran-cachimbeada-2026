import { cn } from "@/lib/cn";

/** Barras animadas discretas que indican reproducción. */
export function Equalizer({ playing, className }: { playing: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("eq inline-flex h-4 items-end gap-[3px]", playing && "eq-on", className)}
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="eq-bar w-[3px] rounded-full bg-gold" />
      ))}
    </span>
  );
}
