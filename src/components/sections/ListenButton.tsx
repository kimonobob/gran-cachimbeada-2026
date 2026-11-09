"use client";

import { Play } from "lucide-react";
import { useMusic } from "@/components/music/MusicProvider";
import { buttonClass } from "@/components/ui/buttons";

/** Filtra el reproductor por artista, lo inicia y desplaza a la sección Música. */
export function ListenButton({ artistId, disabled }: { artistId: string; disabled?: boolean }) {
  const { playArtist } = useMusic();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        playArtist(artistId);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document
          .getElementById("musica")
          ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }}
      className={buttonClass("secondary", "w-full self-start whitespace-nowrap sm:w-auto")}
    >
      <span className="grid size-6 place-items-center rounded-full bg-[var(--accent)] text-ink-950 transition-transform group-hover:scale-110">
        <Play className="size-3 fill-current" aria-hidden />
      </span>
      Escuchar repertorio
    </button>
  );
}
