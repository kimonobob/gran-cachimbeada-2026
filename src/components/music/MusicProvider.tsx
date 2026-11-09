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
import { buildQueue, takeNext } from "@/lib/shuffle";
import { loadYouTubeApi, youtubeErrorMessage, YT_STATE, type YTPlayer } from "@/lib/youtube";
import type { Song } from "@/types";
import { PlayerStage } from "./PlayerStage";

export type PlayerStatus =
  | "idle"
  | "loading"
  | "playing"
  | "paused"
  | "buffering"
  | "blocked"
  | "external"
  | "error";

export type ArtistFilter = "all" | string;

type MusicContextValue = {
  songs: Song[];
  filteredSongs: Song[];
  filter: ArtistFilter;
  current: Song | null;
  status: PlayerStatus;
  errorMessage: string | null;
  /** El reproductor oficial ya fue creado (el usuario pulsó reproducir). */
  active: boolean;
  collapsed: boolean;
  /** Incrementa con cada selección aleatoria (útil para animaciones). */
  pickCount: number;
  setFilter: (filter: ArtistFilter) => void;
  playSong: (id: string) => void;
  playArtist: (artistId: string) => void;
  surprise: () => void;
  next: () => void;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
  close: () => void;
  registerSlot: (el: HTMLElement | null) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic debe usarse dentro de <MusicProvider>");
  return ctx;
}

const idsFor = (filter: ArtistFilter) =>
  catalog.filter((s) => filter === "all" || s.artistId === filter).map((s) => s.id);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<ArtistFilter>("all");
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [pickCount, setPickCount] = useState(0);
  const [slotEl, setSlotEl] = useState<HTMLElement | null>(null);

  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef(false);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const currentRef = useRef<string | null>(null);
  const filterRef = useRef<ArtistFilter>("all");
  const blockedTimer = useRef<number | null>(null);
  const nextRef = useRef<() => void>(() => {});

  const current = useMemo(() => catalog.find((s) => s.id === currentId) ?? null, [currentId]);
  const filteredSongs = useMemo(
    () => catalog.filter((s) => filter === "all" || s.artistId === filter),
    [filter],
  );

  const clearBlockedTimer = () => {
    if (blockedTimer.current !== null) {
      window.clearTimeout(blockedTimer.current);
      blockedTimer.current = null;
    }
  };

  /** Si el navegador bloquea el autoplay, el estado queda en "unstarted"/"cued". */
  const watchForAutoplayBlock = useCallback(() => {
    clearBlockedTimer();
    blockedTimer.current = window.setTimeout(() => {
      const state = playerRef.current?.getPlayerState();
      if (state === YT_STATE.UNSTARTED || state === YT_STATE.CUED) setStatus("blocked");
    }, 3500);
  }, []);

  const handleStateChange = useCallback((state: number) => {
    switch (state) {
      case YT_STATE.PLAYING:
        clearBlockedTimer();
        setStatus("playing");
        break;
      case YT_STATE.PAUSED:
        setStatus("paused");
        break;
      case YT_STATE.BUFFERING:
        setStatus("buffering");
        break;
      case YT_STATE.ENDED:
        nextRef.current();
        break;
    }
  }, []);

  const startVideo = useCallback(
    async (videoId: string) => {
      if (playerRef.current && playerReadyRef.current) {
        playerRef.current.loadVideoById(videoId);
        watchForAutoplayBlock();
        return;
      }
      try {
        const YT = await loadYouTubeApi();
        const mount = mountRef.current;
        if (!mount) return;
        if (playerRef.current) {
          // El reproductor se está creando: solo cambia el video cuando esté listo.
          return;
        }
        const target = document.createElement("div");
        mount.replaceChildren(target);
        playerRef.current = new YT.Player(target, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              playerReadyRef.current = true;
              const wanted = catalog.find((s) => s.id === currentRef.current)?.youtubeVideoId;
              if (wanted && wanted !== videoId) e.target.loadVideoById(wanted);
              else e.target.playVideo();
              watchForAutoplayBlock();
            },
            onStateChange: (e) => handleStateChange(e.data),
            onError: (e) => {
              clearBlockedTimer();
              setErrorMessage(youtubeErrorMessage(e.data));
              setStatus("error");
            },
          },
        });
      } catch {
        setErrorMessage(
          "No pudimos conectar con YouTube. Revisa tu conexión o abre la canción en YouTube.",
        );
        setStatus("error");
      }
    },
    [handleStateChange, watchForAutoplayBlock],
  );

  const playSong = useCallback(
    (id: string) => {
      const song = catalog.find((s) => s.id === id);
      if (!song) return;
      currentRef.current = id;
      queueRef.current = queueRef.current.filter((q) => q !== id);
      setCurrentId(id);
      setErrorMessage(null);
      setCollapsed(false);

      if (!song.youtubeVideoId) {
        playerRef.current?.pauseVideo();
        setStatus("external");
        return;
      }
      setActive(true);
      setStatus("loading");
      void startVideo(song.youtubeVideoId);
    },
    [startVideo],
  );

  const pickNext = useCallback(
    (forFilter: ArtistFilter = filterRef.current) => {
      const { id, queue } = takeNext(queueRef.current, idsFor(forFilter), currentRef.current);
      queueRef.current = queue;
      if (id) {
        setPickCount((n) => n + 1);
        playSong(id);
      }
    },
    [playSong],
  );

  useEffect(() => {
    nextRef.current = () => pickNext();
  }, [pickNext]);

  const setFilter = useCallback((f: ArtistFilter) => {
    filterRef.current = f;
    setFilterState(f);
    queueRef.current = buildQueue(idsFor(f), currentRef.current);
  }, []);

  const playArtist = useCallback(
    (artistId: string) => {
      setFilter(artistId);
      pickNext(artistId);
    },
    [pickNext, setFilter],
  );

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!currentRef.current || !player) {
      if (currentRef.current) playSong(currentRef.current);
      else pickNext();
      return;
    }
    if (status === "playing" || status === "buffering") {
      player.pauseVideo();
    } else if (status === "error") {
      pickNext();
    } else {
      setCollapsed(false);
      setActive(true);
      player.playVideo();
    }
  }, [pickNext, playSong, status]);

  const collapse = useCallback(() => {
    // El video debe permanecer visible mientras suena: al minimizar se pausa.
    playerRef.current?.pauseVideo();
    setCollapsed(true);
  }, []);

  const expand = useCallback(() => setCollapsed(false), []);

  const close = useCallback(() => {
    playerRef.current?.pauseVideo();
    setActive(false);
    setCollapsed(false);
  }, []);

  useEffect(() => () => clearBlockedTimer(), []);

  const value: MusicContextValue = {
    songs: catalog,
    filteredSongs,
    filter,
    current,
    status,
    errorMessage,
    active,
    collapsed,
    pickCount,
    setFilter,
    playSong,
    playArtist,
    surprise: () => pickNext(),
    next: () => pickNext(),
    toggle,
    collapse,
    expand,
    close,
    registerSlot: setSlotEl,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <PlayerStage mountRef={mountRef} slotEl={slotEl} />
    </MusicContext.Provider>
  );
}
