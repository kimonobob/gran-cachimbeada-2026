"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Pause, Play, Shuffle } from "lucide-react";
import { artists, artistById } from "@/data/artists";
import { songTitle } from "@/data/songs";
import { cn } from "@/lib/cn";
import type { Artist } from "@/types";
import { useMusic } from "./MusicProvider";
import { Equalizer } from "./Equalizer";

/**
 * "Escucha sus más grandes éxitos": los tres artistas a pantalla completa,
 * sin marcos, y un botón que reproduce al azar cualquiera de sus audios.
 */
export function MusicSection() {
  const { songs, current, status, setSectionVisible } = useMusic();
  const sectionRef = useRef<HTMLElement>(null);
  const hasMusic = current !== null && status !== "idle";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [setSectionVisible]);

  // Orden visual en escritorio: Rosita · Águilas (centro) · Roy.
  const ordered = ["rosita-de-espinar", "aguilas-de-america", "roy-gentiles"]
    .map((id) => artists.find((a) => a.id === id))
    .filter((a): a is Artist => Boolean(a));

  return (
    <section
      ref={sectionRef}
      id="musica"
      aria-labelledby="musica-title"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink-950 pt-20 pb-10 -scroll-mt-20 sm:pt-24 sm:pb-12"
    >
      {/* Ambiente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,var(--color-wine-900)_0%,transparent_70%)]" />
        <div className="absolute top-[5%] left-[10%] size-[45vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgba(245,182,66,0.12),transparent_60%)] blur-2xl" />
        <div className="absolute top-[20%] right-[5%] size-[45vmax] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(214,76,143,0.14),transparent_60%)] blur-2xl" />
        {/* Piso de escenario */}
        <div className="absolute bottom-[22%] left-1/2 h-40 w-[110%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(245,182,66,0.16),transparent)] sm:bottom-[20%]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.h2
          id="musica-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="block font-serif text-[clamp(1.9rem,6vw,3.5rem)] leading-none text-gold italic">
            Escucha sus
          </span>
          <span className="title-shine block font-display -mt-[0.08em] pt-[0.16em] text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.9] font-black tracking-tight uppercase">
            Más grandes éxitos
          </span>
        </motion.h2>

        {/* Artistas, sin marcos */}
        <ul className="mt-6 grid grid-cols-2 items-end gap-x-2 gap-y-4 sm:mt-8 lg:grid-cols-[1fr_1.55fr_1fr] lg:gap-x-6">
          {ordered.map((artist, i) => (
            <li
              key={artist.id}
              className={cn(artist.id === "aguilas-de-america" && "order-first col-span-2 lg:order-none lg:col-span-1")}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArtistFigure
                  artist={artist}
                  highlighted={hasMusic && current?.artistId === artist.id}
                  dimmed={hasMusic && current?.artistId !== artist.id}
                />
              </motion.div>
            </li>
          ))}
        </ul>

        {/* Botón principal y estado */}
        <div className="mt-6 flex min-h-[8.5rem] flex-col items-center sm:mt-8">
          {songs.length === 0 ? (
            <p className="max-w-md text-center text-sm text-cream/55">
              Los audios llegan muy pronto. (Organizadores: agréguenlos en{" "}
              <code className="text-gold">src/data/songs.ts</code>.)
            </p>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              {hasMusic ? <NowPlaying key="playing" /> : <ListenButton key="idle" />}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}

function ArtistFigure({
  artist,
  highlighted,
  dimmed,
}: {
  artist: Artist;
  highlighted: boolean;
  dimmed: boolean;
}) {
  const { playRandom } = useMusic();
  const isGroup = artist.id === "aguilas-de-america";

  return (
    <figure
      className={cn(
        "group flex flex-col items-center transition-[opacity,filter] duration-700",
        dimmed && "opacity-40 grayscale-[50%]",
      )}
    >
      <button
        type="button"
        onClick={() => playRandom(artist.id)}
        aria-label={`Escuchar a ${artist.name}`}
        className={cn(
          "relative block w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
          isGroup ? "h-36 sm:h-56 lg:h-[clamp(13rem,34vh,24rem)]" : "h-44 sm:h-64 lg:h-[clamp(15rem,40vh,28rem)]",
          highlighted && "scale-[1.03]",
        )}
      >
        {/* Halo del artista que suena */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-[10%] bottom-0 h-2/3 rounded-[50%] blur-3xl transition-opacity duration-700",
            highlighted ? "opacity-60" : "opacity-0 group-hover:opacity-30",
          )}
          style={{ background: artist.accent }}
        />
        <Image
          src={artist.photo}
          alt={artist.photoAlt}
          fill
          sizes={isGroup ? "(min-width:1024px) 45vw, 100vw" : "(min-width:1024px) 28vw, 50vw"}
          className="object-contain object-bottom [mask-image:linear-gradient(to_top,transparent_0%,black_22%)]"
        />
      </button>
      <figcaption className="mt-2 flex items-center gap-2 text-center">
        {highlighted && <Equalizer playing />}
        <span
          className={cn(
            "font-display text-base leading-none font-extrabold tracking-wide uppercase transition-colors sm:text-xl lg:text-2xl",
            highlighted ? "text-gold" : "text-cream/90",
          )}
        >
          {artist.name}
        </span>
      </figcaption>
    </figure>
  );
}

function ListenButton() {
  const { playRandom } = useMusic();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center gap-4"
    >
      <button
        type="button"
        onClick={() => playRandom("all")}
        className="group relative inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-lg font-bold tracking-wide text-ink-950 transition hover:scale-[1.04] hover:bg-gold-soft active:scale-[0.97] sm:px-14 sm:text-xl"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2.4s]" />
        <span className="relative grid size-9 place-items-center rounded-full bg-ink-950 text-gold">
          <Play className="ml-0.5 size-4 fill-current" aria-hidden />
        </span>
        <span className="relative">Escuchar</span>
      </button>
      <p className="max-w-sm text-center text-sm text-cream/50">
        Suena al azar un éxito de cualquiera de los tres. También puedes tocar a tu artista favorito.
      </p>
    </motion.div>
  );
}

function NowPlaying() {
  const { current, status, progress, pickCount, toggle, next } = useMusic();
  if (!current) return null;
  const artist = artistById(current.artistId);
  const isPlaying = status === "playing" || status === "loading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="flex w-full max-w-md flex-col items-center"
    >
      <p className="sr-only" aria-live="polite">
        {status === "error" ? "No se pudo reproducir" : `Sonando ${artist?.name}, ${songTitle(current)}`}
      </p>

      {status === "error" ? (
        <p className="mb-4 flex items-center gap-2 text-sm text-cream/80" role="status">
          <AlertCircle className="size-4 text-rose" aria-hidden />
          No se pudo reproducir este audio.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.p
            key={pickCount}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 text-center text-sm text-cream/60"
          >
            <span className="font-semibold text-cream">{artist?.name}</span> · {songTitle(current)}
          </motion.p>
        </AnimatePresence>
      )}

      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
        <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
          className="grid size-16 place-items-center rounded-full bg-gold text-ink-950 transition hover:scale-105 hover:bg-gold-soft active:scale-95"
        >
          {isPlaying ? <Pause className="size-6 fill-current" /> : <Play className="ml-1 size-6 fill-current" />}
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-4 text-sm font-semibold text-cream transition hover:border-cream/45 hover:bg-white/[0.06]"
        >
          <motion.span
            key={pickCount}
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="inline-flex"
          >
            <Shuffle className="size-4" aria-hidden />
          </motion.span>
          Otra al azar
        </button>
      </div>
    </motion.div>
  );
}
