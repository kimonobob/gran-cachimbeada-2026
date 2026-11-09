"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { songs as catalog } from "@/data/songs";
import { takeNext } from "@/lib/shuffle";
import type { Song } from "@/types";
import { MiniPlayer } from "./MiniPlayer";

export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "error";

/** "all" = todos los artistas; o el id de un artista. */
export type PlayScope = "all" | string;

type MusicContextValue = {
  songs: Song[];
  current: Song | null;
  status: PlayerStatus;
  scope: PlayScope;
  /** Progreso de 0 a 1 del audio actual. */
  progress: number;
  /** Incrementa con cada selección aleatoria (útil para animaciones). */
  pickCount: number;
  /** La sección de música está visible (el mini reproductor se oculta). */
  sectionVisible: boolean;
  /** Reproduce un audio aleatorio de `scope` (todos o un artista). */
  playRandom: (scope?: PlayScope) => void;
  next: () => void;
  toggle: () => void;
  stop: () => void;
  setSectionVisible: (visible: boolean) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic debe usarse dentro de <MusicProvider>");
  return ctx;
}

const idsFor = (scope: PlayScope) =>
  catalog.filter((s) => scope === "all" || s.artistId === scope).map((s) => s.id);

/**
 * Estado global del reproductor de audio (HTMLAudioElement).
 * Nada suena hasta que el visitante pulsa "Escuchar".
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [scope, setScope] = useState<PlayScope>("all");
  const [progress, setProgress] = useState(0);
  const [pickCount, setPickCount] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const currentRef = useRef<string | null>(null);
  const scopeRef = useRef<PlayScope>("all");
  const nextRef = useRef<() => void>(() => {});

  const current = useMemo(() => catalog.find((s) => s.id === currentId) ?? null, [currentId]);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.addEventListener("playing", () => setStatus("playing"));
      audio.addEventListener("pause", () => {
        if (!audio.ended) setStatus((s) => (s === "error" ? s : "paused"));
      });
      audio.addEventListener("waiting", () => setStatus("loading"));
      audio.addEventListener("timeupdate", () =>
        setProgress(audio.duration ? audio.currentTime / audio.duration : 0),
      );
      audio.addEventListener("ended", () => nextRef.current());
      audio.addEventListener("error", () => setStatus("error"));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const playSong = useCallback(
    (song: Song) => {
      const audio = getAudio();
      currentRef.current = song.id;
      setCurrentId(song.id);
      setProgress(0);
      setStatus("loading");
      audio.src = song.audioSrc;
      audio.play().catch((err: unknown) => {
        // AbortError: se cambió de audio antes de que empezara (no es un error real).
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
      });
    },
    [getAudio],
  );

  const playRandom = useCallback(
    (nextScope: PlayScope = scopeRef.current) => {
      if (nextScope !== scopeRef.current) {
        scopeRef.current = nextScope;
        setScope(nextScope);
        queueRef.current = [];
      }
      const { id, queue } = takeNext(queueRef.current, idsFor(nextScope), currentRef.current);
      queueRef.current = queue;
      const song = catalog.find((s) => s.id === id);
      if (song) {
        setPickCount((n) => n + 1);
        playSong(song);
      }
    },
    [playSong],
  );

  useEffect(() => {
    nextRef.current = () => playRandom();
  }, [playRandom]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentRef.current || status === "error") {
      playRandom();
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => setStatus("error"));
    } else {
      audio.pause();
    }
  }, [playRandom, status]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    currentRef.current = null;
    setCurrentId(null);
    setStatus("idle");
    setProgress(0);
  }, []);

  useEffect(() => () => audioRef.current?.pause(), []);

  const value: MusicContextValue = {
    songs: catalog,
    current,
    status,
    scope,
    progress,
    pickCount,
    sectionVisible,
    playRandom,
    next: () => playRandom(),
    toggle,
    stop,
    setSectionVisible,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <MiniPlayer />
    </MusicContext.Provider>
  );
}
