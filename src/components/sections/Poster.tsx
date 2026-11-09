"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Download, Maximize2, Share2, X } from "lucide-react";
import { event, posterImage } from "@/data/event";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/buttons";

export function Poster() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  const openViewer = () => dialogRef.current?.showModal();
  const closeViewer = () => dialogRef.current?.close();

  useEffect(() => {
    if (shareState !== "copied") return;
    const t = window.setTimeout(() => setShareState("idle"), 2500);
    return () => window.clearTimeout(t);
  }, [shareState]);

  const share = async () => {
    const url = window.location.origin + window.location.pathname;
    const data = {
      title: `${event.name} · ${event.subtitle}`,
      text: `${event.fullName} — ${event.dateLong}, ${event.timeLong}.`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    } catch {
      // El usuario canceló o el portapapeles no está disponible.
    }
  };

  return (
    <section id="afiche" aria-labelledby="afiche-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="afiche-title"
            eyebrow="Afiche oficial"
            title={
              <>
                Compártelo con tu <span className="font-serif font-normal text-gold normal-case italic">promo</span>
              </>
            }
            description="Descarga el afiche oficial y comparte la página para que nadie de tu promoción se quede fuera."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={openViewer} className={buttonClass("secondary")}>
                <Maximize2 className="size-4" aria-hidden />
                Ampliar
              </button>
              <a href={posterImage.src} download="afiche-gran-cachimbeada-2026.png" className={buttonClass("secondary")}>
                <Download className="size-4" aria-hidden />
                Descargar
              </a>
              <button type="button" onClick={share} className={buttonClass("primary")}>
                {shareState === "copied" ? <Check className="size-4" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
                {shareState === "copied" ? "Enlace copiado" : "Compartir página"}
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {shareState === "copied" ? "Enlace copiado al portapapeles" : ""}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mx-auto w-full max-w-md">
          <button
            type="button"
            onClick={openViewer}
            className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_-40px_rgba(214,76,143,0.45)] transition duration-700 hover:-rotate-1 hover:scale-[1.02]"
            aria-label="Ampliar afiche oficial"
          >
            <Image
              src={posterImage.src}
              alt={posterImage.alt}
              width={posterImage.width}
              height={posterImage.height}
              sizes="(min-width:1024px) 448px, 90vw"
              className="h-auto w-full"
            />
            <span className="absolute inset-0 grid place-items-center bg-ink-950/0 opacity-0 transition duration-500 group-hover:bg-ink-950/40 group-hover:opacity-100">
              <span className="grid size-14 place-items-center rounded-full bg-cream text-ink-950">
                <Maximize2 className="size-5" aria-hidden />
              </span>
            </span>
          </button>
        </Reveal>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Afiche oficial ampliado"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink-950/90 backdrop:backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeViewer();
        }}
      >
        <div className="relative flex h-[100dvh] w-[100vw] items-center justify-center p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && closeViewer()}>
          <Image
            src={posterImage.src}
            alt={posterImage.alt}
            width={posterImage.width}
            height={posterImage.height}
            sizes="100vw"
            className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain"
          />
          <button
            type="button"
            onClick={closeViewer}
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-cream text-ink-950 transition hover:scale-105"
            aria-label="Cerrar"
            autoFocus
          >
            <X className="size-5" />
          </button>
        </div>
      </dialog>
    </section>
  );
}
