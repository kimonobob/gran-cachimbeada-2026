import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-gold uppercase",
        )}
      >
        <span aria-hidden className="h-px w-8 bg-gold/60" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-5xl leading-[0.92] font-extrabold tracking-tight text-cream uppercase sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-cream/65 sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
