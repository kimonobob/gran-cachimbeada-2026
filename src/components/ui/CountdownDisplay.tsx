"use client";

import { PartyPopper } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { event } from "@/data/event";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/** Cuenta regresiva. Al llegar la fecha muestra un mensaje en lugar de números. */
export function CountdownDisplay({
  size = "md",
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { days, hours, minutes, seconds, isPast, ready } = useCountdown(event.startDate);

  if (ready && isPast) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/[0.06] px-5 py-4 text-cream",
          className,
        )}
        role="status"
      >
        <PartyPopper className="size-5 text-gold" aria-hidden />
        <span className="text-sm sm:text-base">
          ¡La Gran Cachimbeada ya comenzó! Gracias por ser parte de esta noche.
        </span>
      </div>
    );
  }

  const units = [
    { label: "Días", value: ready ? String(days) : "--" },
    { label: "Horas", value: ready ? pad(hours) : "--" },
    { label: "Min", value: ready ? pad(minutes) : "--" },
    { label: "Seg", value: ready ? pad(seconds) : "--" },
  ];

  return (
    <div
      className={cn("flex items-stretch", size === "lg" ? "gap-2 sm:gap-4" : "gap-2 sm:gap-3", className)}
      role="timer"
      aria-label={
        ready
          ? `Faltan ${days} días, ${hours} horas, ${minutes} minutos para el evento`
          : "Cuenta regresiva para el evento"
      }
    >
      {units.map((u, i) => (
        <div key={u.label} className="flex items-stretch gap-2 sm:gap-3">
          <div
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-ink-950/60 backdrop-blur-md",
              size === "lg"
                ? "min-w-[4.5rem] px-3 py-4 sm:min-w-[7rem] sm:px-5 sm:py-6"
                : "min-w-[4rem] px-3 py-3 sm:min-w-[5rem]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "font-display leading-none font-extrabold tabular-nums",
                size === "lg" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl",
                i === 0 ? "text-gold" : "text-cream",
              )}
            >
              {u.value}
            </span>
            <span className="mt-1.5 text-[10px] tracking-[0.25em] text-cream/50 uppercase">
              {u.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
