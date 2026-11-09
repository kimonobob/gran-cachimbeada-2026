import Image from "next/image";
import { CalendarDays, Headphones, ArrowRight } from "lucide-react";
import { event } from "@/data/event";
import { artists } from "@/data/artists";
import { CountdownDisplay } from "@/components/ui/CountdownDisplay";
import { buttonClass } from "@/components/ui/buttons";
import type { CSSProperties } from "react";

// Partículas con posiciones fijas (deterministas para evitar desajustes SSR).
const particles = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    top: `${(55 + r(2) * 45).toFixed(2)}%`,
    size: 1 + Math.round(r(3) * 2),
    d: `${(10 + r(4) * 14).toFixed(1)}s`,
    delay: `${(-r(5) * 20).toFixed(1)}s`,
    dx: `${Math.round((r(6) - 0.5) * 80)}px`,
    o: (0.25 + r(7) * 0.5).toFixed(2),
    gold: r(8) > 0.35,
  };
});

const d = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export function Hero() {
  const [aguilas, rosita, roy] = [
    artists.find((a) => a.id === "aguilas-de-america"),
    artists.find((a) => a.id === "rosita-de-espinar"),
    artists.find((a) => a.id === "roy-gentiles"),
  ];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950"
    >
      {/* Iluminación ambiental */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_110%,var(--color-wine-900)_0%,transparent_60%)]" />
        <div className="absolute -top-[20%] -left-[15%] size-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(245,182,66,0.22),transparent_60%)] blur-2xl" />
        <div className="absolute top-[10%] -right-[25%] size-[65vmax] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(214,76,143,0.2),transparent_60%)] blur-2xl" />
        {/* Haces de luz de escenario */}
        <div className="fade-in absolute -top-10 left-[18%] h-[85%] w-40 origin-top -rotate-[18deg] bg-gradient-to-b from-gold/20 via-gold/5 to-transparent blur-2xl" style={d(0.4)} />
        <div className="fade-in absolute -top-10 right-[18%] h-[85%] w-40 origin-top rotate-[18deg] bg-gradient-to-b from-rose/20 via-rose/5 to-transparent blur-2xl" style={d(0.6)} />
        {particles.map((p, i) => (
          <span
            key={i}
            className={`particle absolute rounded-full ${p.gold ? "bg-gold" : "bg-cream"}`}
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                "--d": p.d,
                "--delay": p.delay,
                "--dx": p.dx,
                "--o": p.o,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Fotografías de los artistas, integradas al fondo */}
      <div
        aria-hidden
        className="fade-in pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46%] [mask-image:linear-gradient(to_top,transparent_0%,black_35%,black_75%,transparent_100%)] sm:h-[52%]"
        style={d(0.8)}
      >
        {rosita && (
          <div className="absolute bottom-0 left-[-12%] h-[90%] w-[45%] opacity-35 sm:left-[2%] sm:w-[30%] lg:left-[6%] lg:w-[22%]">
            <Image src={rosita.photo} alt="" fill sizes="(min-width:1024px) 22vw, 45vw" className="object-contain object-bottom" />
          </div>
        )}
        {aguilas && (
          <div className="absolute bottom-0 left-1/2 h-[80%] w-[110%] -translate-x-1/2 opacity-30 sm:w-[70%] lg:w-[48%]">
            <Image src={aguilas.photo} alt="" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-contain object-bottom" priority />
          </div>
        )}
        {roy && (
          <div className="absolute right-[-12%] bottom-0 h-[95%] w-[40%] opacity-35 sm:right-[2%] sm:w-[26%] lg:right-[7%] lg:w-[18%]">
            <Image src={roy.photo} alt="" fill sizes="(min-width:1024px) 18vw, 40vw" className="object-contain object-bottom" />
          </div>
        )}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pt-28 pb-24 text-center sm:px-8 sm:pt-32">
        <p className="rise mb-6 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.35em] text-cream/70 uppercase sm:text-xs" style={d(0.1)}>
          <span aria-hidden className="h-px w-6 bg-gold/70 sm:w-10" />
          {event.eyebrow}
          <span aria-hidden className="h-px w-6 bg-gold/70 sm:w-10" />
        </p>

        <h1 id="hero-title" className="relative">
          <span
            className="rise block font-serif text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.8] text-gold italic"
            style={d(0.25)}
          >
            Gran
          </span>
          <span
            className="rise title-shine block font-display text-[clamp(3.25rem,16vw,12.5rem)] leading-[0.85] font-black tracking-[-0.01em] uppercase"
            style={d(0.4)}
          >
            Cachimbeada
          </span>
        </h1>

        <p className="rise mt-5 text-sm font-semibold tracking-[0.42em] text-cream/85 uppercase sm:text-base" style={d(0.6)}>
          {event.subtitle}
        </p>

        <p className="rise mt-7 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-ink-950/40 px-5 py-2.5 text-sm font-semibold tracking-[0.2em] text-cream backdrop-blur-md" style={d(0.75)}>
          <CalendarDays className="size-4 text-gold" aria-hidden />
          <time dateTime={event.startDate}>
            {event.dateLabel} <span className="mx-1.5 text-gold">|</span> {event.timeLabel}
          </time>
        </p>

        <div className="rise mt-8" style={d(0.9)}>
          <CountdownDisplay />
        </div>

        <div className="rise mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row" style={d(1.05)}>
          {/* Botón de música destacado: lleva a "Escucha sus más grandes éxitos". */}
          <a
            href="#musica"
            className="group relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 pr-8 pl-4 text-base font-bold tracking-wide text-ink-950 shadow-[0_0_0_1px_rgba(245,182,66,0.4),0_18px_50px_-12px_rgba(245,182,66,0.75)] transition-all duration-300 hover:scale-[1.04] hover:bg-gold-soft active:scale-[0.97] sm:w-auto sm:text-lg"
          >
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:2.6s]" />
            <span className="relative grid size-10 place-items-center rounded-full bg-ink-950 text-gold">
              <Headphones className="size-5" aria-hidden />
            </span>
            <span className="relative">Escuchar música</span>
            <span aria-hidden className="eq eq-on relative inline-flex h-4 items-end gap-[3px] [&>span]:bg-ink-950">
              <span className="eq-bar w-[3px] rounded-full" />
              <span className="eq-bar w-[3px] rounded-full" />
              <span className="eq-bar w-[3px] rounded-full" />
              <span className="eq-bar w-[3px] rounded-full" />
            </span>
          </a>
          <a href="#evento" className={buttonClass("secondary", "w-full sm:w-auto")}>
            Conoce el evento
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>

      <a
        href="#musica"
        className="fade-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-cream/45 uppercase transition hover:text-cream sm:flex"
        style={d(1.4)}
        aria-label="Desplázate para ver más"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/30 pt-1.5">
          <span className="scroll-dot block h-1.5 w-1 rounded-full bg-gold" />
        </span>
        Scroll
      </a>
    </section>
  );
}
