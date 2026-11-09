"use client";

import { useEffect, useState, type RefObject } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Pause, Play, SkipForward, X } from "lucide-react";
import { artistById } from "@/data/artists";
import { youtubeWatchUrl } from "@/lib/links";
import { cn } from "@/lib/cn";
import { useMusic } from "./MusicProvider";
import { Equalizer } from "./Equalizer";

type Rect = { top: number; left: number; width: number; height: number };

/**
 * Contenedor único del reproductor oficial de YouTube.
 * - Acoplado: se posiciona sobre el espacio reservado en la sección Música.
 * - Flotante: al salir de la sección, se convierte en un mini reproductor.
 * El iframe nunca se mueve en el DOM, así que no se recarga al cambiar de modo.
 * Mientras suena, el video siempre es visible (mínimo 200 px de alto).
 */
export function PlayerStage({
  mountRef,
  slotEl,
}: {
  mountRef: RefObject<HTMLDivElement | null>;
  slotEl: HTMLElement | null;
}) {
  const { active, collapsed, current, status, toggle, next, collapse, expand, close } = useMusic();
  const [docked, setDocked] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!slotEl) return;
    const measure = () => {
      const r = slotEl.getBoundingClientRect();
      setRect({
        top: r.top + window.scrollY,
        left: r.left + window.scrollX,
        width: r.width,
        height: r.height,
      });
    };
    const io = new IntersectionObserver(([entry]) => setDocked(entry.isIntersecting), {
      threshold: 0.3,
    });
    const ro = new ResizeObserver(measure);
    io.observe(slotEl);
    ro.observe(slotEl);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [slotEl]);

  const isDocked = active && docked && rect !== null && slotEl !== null;
  const isMini = active && !isDocked;
  const isPlaying = status === "playing" || status === "buffering";
  const artist = current ? artistById(current.artistId) : undefined;

  return (
    <>
      <div
        role={isMini ? "region" : undefined}
        aria-label={isMini ? "Reproductor flotante" : undefined}
        aria-hidden={!active}
        style={
          isDocked && rect
            ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
            : undefined
        }
        className={cn(
          "z-40",
          !active && "pointer-events-none fixed -left-[9999px] top-0 h-[200px] w-[356px] opacity-0",
          isDocked && "absolute overflow-hidden rounded-2xl",
          isMini &&
            "fixed inset-x-3 bottom-3 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px]",
        )}
      >
        <div
          className={cn(
            "relative w-full bg-black",
            isDocked && "h-full",
            isMini && (collapsed ? "h-0" : "h-[200px] sm:h-[214px]"),
            !active && "h-full",
          )}
        >
          <div ref={mountRef} className="absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full" />
        </div>

        {isMini && current && (
          <div className="flex items-center gap-3 px-3 py-2.5">
            <Equalizer playing={isPlaying} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream">{current.title}</p>
              <p className="truncate text-xs text-cream/60">
                {status === "blocked"
                  ? "Pulsa reproducir para iniciar"
                  : status === "error"
                    ? "No disponible · prueba otra"
                    : artist?.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <IconButton
                label={isPlaying ? "Pausar" : "Reproducir"}
                onClick={() => {
                  if (collapsed) expand();
                  toggle();
                }}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
              </IconButton>
              <IconButton label="Siguiente canción" onClick={next}>
                <SkipForward className="size-4" />
              </IconButton>
              {current.youtubeVideoId && (
                <a
                  href={youtubeWatchUrl(current.youtubeVideoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir en YouTube"
                  className="hidden size-9 items-center justify-center rounded-full text-cream/70 transition hover:bg-white/10 hover:text-cream sm:inline-flex"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
              <IconButton
                label={collapsed ? "Mostrar video" : "Minimizar (pausa la música)"}
                onClick={collapsed ? expand : collapse}
              >
                {collapsed ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </IconButton>
              <IconButton label="Cerrar reproductor" onClick={close}>
                <X className="size-4" />
              </IconButton>
            </div>
          </div>
        )}
      </div>
      {/* Espacio para que el mini reproductor no tape el final de la página. */}
      <div aria-hidden className={cn(isMini ? (collapsed ? "h-20" : "h-72") : "h-0")} />
    </>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-gold"
    >
      {children}
    </button>
  );
}
