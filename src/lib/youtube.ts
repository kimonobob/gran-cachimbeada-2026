/**
 * Carga perezosa de la YouTube IFrame Player API.
 * Solo se descarga cuando el visitante decide reproducir música.
 */

export type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(videoId: string): void;
  getPlayerState(): number;
  destroy(): void;
};

type YTPlayerOptions = {
  videoId: string;
  width?: string | number;
  height?: string | number;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (e: { target: YTPlayer }) => void;
    onStateChange?: (e: { data: number; target: YTPlayer }) => void;
    onError?: (e: { data: number }) => void;
  };
};

type YTNamespace = {
  Player: new (el: HTMLElement | string, opts: YTPlayerOptions) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

let apiPromise: Promise<YTNamespace> | null = null;

export function loadYouTubeApi(timeoutMs = 15000): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      apiPromise = null;
      reject(new Error("timeout"));
    }, timeoutMs);

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      window.clearTimeout(timer);
      if (window.YT) resolve(window.YT);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timer);
      apiPromise = null;
      script.remove();
      reject(new Error("network"));
    };
    document.head.appendChild(script);
  });

  return apiPromise;
}

/** Mensajes para los códigos de error de la IFrame API. */
export function youtubeErrorMessage(code: number): string {
  switch (code) {
    case 2:
      return "El enlace del video no es válido.";
    case 5:
      return "Este video no se puede reproducir en el navegador.";
    case 100:
      return "El video ya no está disponible o es privado.";
    case 101:
    case 150:
      return "El propietario no permite reproducir este video fuera de YouTube.";
    default:
      return "No pudimos reproducir este video.";
  }
}
