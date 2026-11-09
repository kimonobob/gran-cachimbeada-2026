"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  Music2,
  Pause,
  Play,
  Shuffle,
  SkipForward,
  Sparkles,
} from "lucide-react";
import { artists, artistById } from "@/data/artists";
import { youtubeThumbnail, youtubeWatchUrl } from "@/lib/links";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/buttons";
import type { Song } from "@/types";
import { useMusic, type PlayerStatus } from "./MusicProvider";
import { Equalizer } from "./Equalizer";

const statusText: Record<PlayerStatus, string> = {
  idle: "Listo para sonar",
  loading: "Cargando el video oficial…",
  buffering: "Cargando…",
  playing: "Sonando ahora",
  paused: "En pausa",
  blocked: "Tu navegador bloqueó la reproducción automática. Pulsa reproducir o toca el video.",
  external: "Esta canción se escucha en su plataforma original.",
  error: "No se pudo reproducir",
};

const coverFor = (song: Song | null) => {
  if (!song) return null;
  if (song.coverImage) return song.coverImage;
  if (song.youtubeVideoId) return youtubeThumbnail(song.youtubeVideoId);
  return artistById(song.artistId)?.photo ?? null;
};

export function MusicSection() {
  const music = useMusic();
  const { songs, current, status, active } = music;
  const isEmpty = songs.length === 0;

  return (
    <section
      id="musica"
      aria-labelledby="musica-title"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-wine-950 to-ink-950 py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute top-1/3 left-1/2 size-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,76,143,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="musica-title"
          eyebrow="Experiencia musical"
          title={
            <>
              Calienta la <span className="font-serif font-normal text-rose normal-case italic">noche</span>
            </>
          }
          description="Escucha al azar canciones de los artistas de la Gran Cachimbeada con sus videos oficiales de YouTube. Pulsa «Sorpréndeme» y deja que suene."
        />

        {isEmpty ? (
          <EmptyCatalog />
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
            <div className="flex min-w-0 flex-col gap-6">
              <ArtistFilters />
              <NowPlayingCard />
            </div>
            <div className="flex min-w-0 flex-col gap-6">
              <VideoSlot />
              <TrackList />
            </div>
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          {current ? `${statusText[status]}: ${current.title}` : ""}
        </p>
        {active && (
          <p className="mt-6 text-center text-xs text-cream/40">
            El reproductor te acompañará mientras recorres la página.
          </p>
        )}
      </div>
    </section>
  );
}

function ArtistFilters() {
  const { filter, setFilter, songs } = useMusic();
  const options = [
    { id: "all", label: "Todos", count: songs.length },
    ...artists.map((a) => ({
      id: a.id,
      label: a.name,
      count: songs.filter((s) => s.artistId === a.id).length,
    })),
  ];

  return (
    <div role="radiogroup" aria-label="Filtrar por artista" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((o) => {
        const selected = filter === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setFilter(o.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-all duration-300",
              selected
                ? "border-gold bg-gold text-ink-950"
                : "border-white/10 bg-white/[0.03] text-cream/70 hover:border-white/25 hover:text-cream",
            )}
          >
            {o.label}
            <span className={cn("ml-2 text-xs", selected ? "text-ink-950/60" : "text-cream/35")}>
              {o.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function NowPlayingCard() {
  const { current, status, errorMessage, toggle, next, surprise, filteredSongs, pickCount } =
    useMusic();
  const artist = current ? artistById(current.artistId) : undefined;
  const isPlaying = status === "playing" || status === "buffering";
  const isLoading = status === "loading" || status === "buffering";
  const noSongs = filteredSongs.length === 0;
  const discLabel = artist?.photo ?? null;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-900/70 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Disco */}
        <div className="relative size-28 shrink-0 sm:size-36">
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,#18121c_0px,#18121c_2px,#100c13_3px,#100c13_4px)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10",
              isPlaying && "spin-slow",
            )}
          >
            <div className="absolute inset-[30%] overflow-hidden rounded-full bg-wine-800 ring-2 ring-gold/60">
              {discLabel ? (
                <Image src={discLabel} alt="" fill sizes="60px" className="object-cover object-top" />
              ) : (
                <span className="grid h-full place-items-center font-display text-xs font-black text-gold">
                  GC
                </span>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,transparent_0deg,rgba(255,255,255,0.08)_40deg,transparent_80deg,transparent_200deg,rgba(255,255,255,0.06)_240deg,transparent_280deg)]" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
            {isPlaying ? (
              <Equalizer playing />
            ) : isLoading ? (
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
            ) : (
              <Music2 className="size-3.5" aria-hidden />
            )}
            {status === "blocked" || status === "external" || status === "error"
              ? status === "error"
                ? "Error"
                : "Atención"
              : statusText[status]}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id ?? "none"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="line-clamp-2 font-display text-3xl leading-[0.95] font-extrabold uppercase sm:text-4xl">
                {current?.title ?? "Elige tu canción"}
              </h3>
              <p className="mt-1.5 truncate text-sm text-cream/60">
                {artist?.name ?? "Águilas de América · Rosita de Espinar · Roy Gentiles"}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {(status === "blocked" || status === "external" || status === "error") && (
        <div
          role="status"
          className={cn(
            "mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm",
            status === "error"
              ? "border-rose/30 bg-rose/[0.08] text-cream"
              : "border-gold/25 bg-gold/[0.06] text-cream/85",
          )}
        >
          <AlertCircle className={cn("mt-0.5 size-4 shrink-0", status === "error" ? "text-rose" : "text-gold")} aria-hidden />
          <div className="space-y-2">
            <p>{status === "error" ? errorMessage : statusText[status]}</p>
            <ExternalLinks song={current} />
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          disabled={noSongs}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
          className="grid size-14 shrink-0 place-items-center rounded-full bg-gold text-ink-950 transition hover:scale-105 hover:bg-gold-soft active:scale-95 disabled:opacity-40"
        >
          {isPlaying ? (
            <Pause className="size-6 fill-current" />
          ) : (
            <Play className="ml-0.5 size-6 fill-current" />
          )}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={noSongs}
          aria-label="Siguiente canción"
          title="Siguiente canción"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-cream transition hover:border-white/35 hover:bg-white/[0.06] disabled:opacity-40"
        >
          <SkipForward className="size-5" />
        </button>
        <button
          type="button"
          onClick={surprise}
          disabled={noSongs}
          className={buttonClass("rose", "ml-auto px-5")}
        >
          <motion.span
            key={pickCount}
            initial={{ rotate: -180, scale: 0.6 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="inline-flex"
          >
            <Sparkles className="size-4" aria-hidden />
          </motion.span>
          Sorpréndeme
        </button>
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-cream/40">
        <Shuffle className="size-3.5" aria-hidden />
        Modo aleatorio: escucharás todo el repertorio antes de que una canción se repita.
      </p>

      {current && status !== "error" && status !== "external" && (
        <div className="mt-4">
          <ExternalLinks song={current} />
        </div>
      )}
    </div>
  );
}

function ExternalLinks({ song }: { song: Song | null }) {
  if (!song) return null;
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
      {song.youtubeVideoId && (
        <a
          href={youtubeWatchUrl(song.youtubeVideoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-cream/60 underline-offset-4 transition hover:text-cream hover:underline"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          Abrir en YouTube
        </a>
      )}
      {song.spotifyUrl && (
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[#1ed760]/80 underline-offset-4 transition hover:text-[#1ed760] hover:underline"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          Escuchar en Spotify
        </a>
      )}
    </div>
  );
}

function VideoSlot() {
  const { registerSlot, current, active, surprise, filteredSongs } = useMusic();
  const cover = coverFor(current);

  return (
    <div
      ref={registerSlot}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black"
    >
      {!active && (
        <button
          type="button"
          onClick={surprise}
          disabled={filteredSongs.length === 0}
          className="group absolute inset-0 grid place-items-center text-center"
          aria-label="Reproducir una canción aleatoria"
        >
          {cover && (
            <Image src={cover} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55" unoptimized={cover.startsWith("http")} />
          )}
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(14,11,17,0.85))]" />
          <span className="relative flex flex-col items-center gap-4 px-6">
            <span className="grid size-16 place-items-center rounded-full border border-cream/30 bg-ink-950/50 backdrop-blur-md transition group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink-950 sm:size-20">
              <Play className="ml-1 size-7 fill-current" aria-hidden />
            </span>
            <span className="text-sm text-cream/70">
              El video oficial aparecerá aquí
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function TrackList() {
  const { filteredSongs, current, playSong, status } = useMusic();

  if (filteredSongs.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-cream/55">
        Este artista aún no tiene canciones en el reproductor. Muy pronto.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <p className="border-b border-white/[0.06] px-5 py-3 text-[11px] font-semibold tracking-[0.2em] text-cream/45 uppercase">
        Repertorio · {filteredSongs.length} canciones
      </p>
      <ol className="max-h-80 overflow-y-auto py-2">
        {filteredSongs.map((song, i) => {
          const isCurrent = current?.id === song.id;
          const artist = artistById(song.artistId);
          return (
            <li key={song.id}>
              <button
                type="button"
                onClick={() => playSong(song.id)}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-4 px-5 py-2.5 text-left transition hover:bg-white/[0.04]",
                  isCurrent && "bg-white/[0.05]",
                )}
              >
                <span className="w-5 shrink-0 text-center text-xs text-cream/35 tabular-nums">
                  {isCurrent ? (
                    <Equalizer playing={status === "playing"} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate text-sm", isCurrent ? "text-gold" : "text-cream/90")}>
                    {song.title}
                  </span>
                  <span className="block truncate text-xs text-cream/45">
                    {artist?.name}
                    {song.source && song.source !== artist?.name ? ` · ${song.source}` : ""}
                  </span>
                </span>
                {!song.youtubeVideoId && song.spotifyUrl && (
                  <span className="text-[10px] tracking-wider text-[#1ed760]/80 uppercase">Spotify</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function EmptyCatalog() {
  return (
    <div className="mt-14 flex flex-col items-center rounded-[28px] border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
      <span className="grid size-16 place-items-center rounded-full border border-gold/30 text-gold">
        <Music2 className="size-7" aria-hidden />
      </span>
      <h3 className="mt-6 font-display text-3xl font-extrabold uppercase">El repertorio llega muy pronto</h3>
      <p className="mt-3 max-w-md text-sm text-cream/60">
        Estamos preparando la selección de canciones de Águilas de América, Rosita de Espinar y Roy
        Gentiles.
      </p>
      <p className="mt-6 rounded-xl bg-black/40 px-4 py-3 font-mono text-xs text-cream/50">
        Para organizadores: agrega canciones en <span className="text-gold">src/data/songs.ts</span>
      </p>
    </div>
  );
}
