"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Pause, Play, SkipForward, X } from "lucide-react";
import { artistById } from "@/data/artists";
import { songTitle } from "@/data/songs";
import { useMusic } from "./MusicProvider";
import { Equalizer } from "./Equalizer";

/** Mini reproductor flotante: aparece cuando hay música y la sección no está a la vista. */
export function MiniPlayer() {
  const { current, status, progress, sectionVisible, toggle, next, stop } = useMusic();
  const visible = current !== null && status !== "idle" && !sectionVisible;
  const artist = current ? artistById(current.artistId) : undefined;
  const isPlaying = status === "playing" || status === "loading";

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          role="region"
          aria-label="Reproductor de música"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 overflow-hidden rounded-full border border-white/10 bg-ink-900/90 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[360px]"
        >
          <div className="flex items-center gap-3 py-2 pr-2 pl-2">
            <a
              href="#musica"
              className="relative size-11 shrink-0 overflow-hidden rounded-full bg-wine-800 ring-1 ring-gold/40"
              aria-label="Ir a la sección de música"
            >
              {artist && (
                <Image src={artist.photo} alt="" fill sizes="44px" className="object-cover object-top" />
              )}
            </a>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 truncate text-sm font-semibold text-cream">
                <Equalizer playing={status === "playing"} className="shrink-0" />
                <span className="truncate">{artist?.name}</span>
              </p>
              <p className="truncate text-xs text-cream/55">
                {status === "error" ? "No se pudo reproducir · prueba otra" : songTitle(current)}
              </p>
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-ink-950 transition hover:scale-105"
            >
              {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Otra canción al azar"
              className="grid size-10 shrink-0 place-items-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <SkipForward className="size-4" />
            </button>
            <button
              type="button"
              onClick={stop}
              aria-label="Detener y cerrar"
              className="grid size-10 shrink-0 place-items-center rounded-full text-cream/60 transition hover:bg-white/10 hover:text-cream"
            >
              <X className="size-4" />
            </button>
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
            <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
