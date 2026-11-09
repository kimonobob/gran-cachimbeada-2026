import Image from "next/image";
import { artists } from "@/data/artists";
import { songs } from "@/data/songs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { Artist } from "@/types";
import { ListenButton } from "./ListenButton";

export function Artists() {
  return (
    <section
      id="artistas"
      aria-labelledby="artistas-title"
      className="relative overflow-hidden bg-ink-950 py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="artistas-title"
          eyebrow="Line-up 2026"
          title={
            <>
              Artistas que <span className="font-serif font-normal text-gold normal-case italic">harán</span> historia
            </>
          }
          description="Tres artistas y una sola noche para recibir a la nueva promoción de Ingeniería Económica. Elige uno y escucha su repertorio."
        />

        <ul
          className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0"
          aria-label="Artistas invitados"
        >
          {artists.map((artist, i) => (
            <li
              key={artist.id}
              className={cn(
                "w-[84%] shrink-0 snap-center sm:w-[60%] lg:w-auto",
                i === 0 && "lg:col-span-2",
              )}
            >
              <Reveal delay={i * 0.12} className="h-full">
                <ArtistCard artist={artist} index={i} wide={i === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-center text-xs text-cream/40 lg:hidden" aria-hidden>
          Desliza para ver a los tres artistas →
        </p>
      </div>
    </section>
  );
}

function ArtistCard({ artist, index, wide }: { artist: Artist; index: number; wide: boolean }) {
  const songCount = songs.filter((s) => s.artistId === artist.id).length;
  const isGroupPhoto = artist.id === "aguilas-de-america";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-ink-800 to-wine-950 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20",
        wide && "lg:min-h-[460px] lg:flex-row-reverse",
      )}
      style={{ "--accent": artist.accent } as React.CSSProperties}
    >
      {/* Foto */}
      <div className={cn("relative h-72 overflow-hidden sm:h-80", wide ? "lg:h-auto lg:flex-[1.4]" : "lg:h-[26rem]")}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-90"
          style={{
            background: `radial-gradient(60% 70% at 50% 85%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%)`,
          }}
        />
        <Image
          src={artist.photo}
          alt={artist.photoAlt}
          fill
          sizes={wide ? "(min-width:1024px) 60vw, 84vw" : "(min-width:1024px) 45vw, 84vw"}
          className={cn(
            "transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]",
            isGroupPhoto
              ? "object-cover object-[50%_20%] lg:object-contain lg:object-bottom"
              : "object-contain object-bottom",
          )}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/90 to-transparent lg:hidden" />
      </div>

      {/* Texto */}
      <div className={cn("relative flex flex-1 flex-col justify-end gap-5 p-6 sm:p-8", wide && "lg:max-w-md lg:justify-center lg:p-12")}>
        <span className="font-display text-sm font-semibold tracking-[0.3em] text-cream/40">
          0{index + 1}
        </span>
        {artist.logo && (
          <div className="relative h-14 w-44 sm:h-16 sm:w-52">
            <Image
              src={artist.logo}
              alt={artist.logoAlt ?? ""}
              fill
              sizes="208px"
              className="object-contain object-left"
            />
          </div>
        )}
        <div>
          <h3 className="font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-5xl">
            {artist.name}
          </h3>
          <p className="mt-2 text-sm text-cream/50">
            {songCount > 0 ? `${songCount} canciones en el reproductor` : "Repertorio próximamente"}
          </p>
        </div>
        <ListenButton artistId={artist.id} disabled={songCount === 0} />
        <span
          aria-hidden
          className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 group-hover:scale-x-100 sm:inset-x-8"
        />
      </div>
    </article>
  );
}
