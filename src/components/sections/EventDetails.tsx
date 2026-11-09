import Image from "next/image";
import {
  CalendarDays,
  CalendarPlus,
  Clock,
  Gift,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { event } from "@/data/event";
import { tickets } from "@/data/tickets";
import { googleCalendarUrl, defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountdownDisplay } from "@/components/ui/CountdownDisplay";
import { buttonClass } from "@/components/ui/buttons";
import type { Ticket } from "@/types";

/**
 * Sección Evento: fecha, hora, lugar (foto + mapa), plano del escenario y entradas.
 * Todo el contenido viene de `src/data/event.ts` y `src/data/tickets.ts`.
 */
export function EventDetails() {
  const { venue, stageMap } = event;

  const details = [
    { icon: CalendarDays, label: "Fecha", value: event.dateLong },
    { icon: Clock, label: "Hora", value: event.timeLong },
    { icon: MapPin, label: "Lugar", value: venue.name, hint: venue.type },
    {
      icon: MessageCircle,
      label: "Contacto",
      value: event.contact.phoneDisplay,
      hint: "WhatsApp",
      href: whatsappUrl(defaultWhatsappMessage),
    },
  ];

  return (
    <section id="evento" aria-labelledby="evento-title" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Encabezado + cuenta regresiva */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            id="evento-title"
            eyebrow="Detalles del evento"
            title={
              <>
                Una noche para <span className="font-serif font-normal text-gold normal-case italic">recordar</span>
              </>
            }
            description={event.description}
          />
          <Reveal delay={0.15}>
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-cream/45 uppercase">Cuenta regresiva</p>
            <CountdownDisplay size="lg" />
          </Reveal>
        </div>

        {/* Datos clave */}
        <dl className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6">
                <d.icon className="size-5 text-gold" aria-hidden />
                <dt className="mt-5 text-[11px] font-semibold tracking-[0.25em] text-cream/45 uppercase">{d.label}</dt>
                <dd className="mt-1.5">
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="font-display text-xl leading-tight font-extrabold uppercase underline-offset-4 hover:text-gold hover:underline sm:text-2xl">
                      {d.value}
                    </a>
                  ) : (
                    <span className="font-display text-xl leading-tight font-extrabold uppercase sm:text-2xl">{d.value}</span>
                  )}
                  {d.hint && <span className="mt-1 block text-sm text-cream/55">{d.hint}</span>}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        {/* El lugar */}
        <div className="mt-20 sm:mt-24">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-gold uppercase">
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              El lugar
            </p>
            <h3 className="font-display text-4xl leading-none font-extrabold uppercase sm:text-5xl">{venue.name}</h3>
            <p className="mt-3 flex items-start gap-2 text-cream/65">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>
                {venue.type} · {venue.address}
              </span>
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
            <Reveal className="h-full">
              <figure className="group relative h-full min-h-64 overflow-hidden rounded-3xl">
                <Image
                  src={venue.photo.src}
                  alt={venue.photo.alt}
                  width={venue.photo.width}
                  height={venue.photo.height}
                  sizes="(min-width:1024px) 58vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 p-5 sm:p-7">
                  <span className="rounded-full bg-ink-950/60 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase backdrop-blur-md">
                    {venue.type}
                  </span>
                  <p className="mt-3 font-display text-2xl font-extrabold uppercase sm:text-3xl">{venue.name}</p>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col gap-4">
                {venue.mapEmbedUrl && (
                  <div className="relative min-h-64 flex-1 overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900">
                    <iframe
                      title={`Mapa: ${venue.name}, ${venue.address}`}
                      src={venue.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.8)]"
                    />
                  </div>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                    <Navigation className="size-4" aria-hidden />
                    Cómo llegar
                  </a>
                  <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
                    <CalendarPlus className="size-4" aria-hidden />
                    Agregar al calendario
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Entradas y zonas */}
        <div id="entradas" className="mt-20 sm:mt-28">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-gold uppercase">
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              Entradas
            </p>
            <h3 className="font-display text-4xl leading-none font-extrabold uppercase sm:text-5xl">
              Elige tu <span className="font-serif font-normal text-gold normal-case italic">zona</span>
            </h3>
            <p className="mt-3 max-w-xl text-cream/65">
              Mientras más cerca del escenario, mejor la vista. Consulta y separa tu entrada por WhatsApp.
            </p>
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
            <Reveal>
              <div className="relative">
                <div aria-hidden className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle,rgba(245,182,66,0.18),rgba(168,85,247,0.12)_45%,transparent_70%)] blur-3xl" />
                <Image
                  src={stageMap.src}
                  alt={stageMap.alt}
                  width={stageMap.width}
                  height={stageMap.height}
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className="relative h-auto w-full"
                />
              </div>
            </Reveal>

            <ul className="flex flex-col gap-4">
              {tickets.map((t, i) => (
                <li key={t.id}>
                  <Reveal delay={i * 0.1}>
                    <TicketRow ticket={t} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/80 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-[color:var(--zone)] sm:p-6"
      style={
        {
          "--zone": ticket.color,
          backgroundImage: `linear-gradient(110deg, color-mix(in srgb, ${ticket.color} 16%, transparent), transparent 55%)`,
        } as React.CSSProperties
      }
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1" style={{ background: ticket.color }} />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="font-display text-3xl leading-none font-black tracking-tight sm:text-4xl" style={{ color: ticket.color }}>
            {ticket.name}
          </h4>
          <p className="mt-1.5 text-sm text-cream/60">{ticket.zone}</p>
        </div>
        <p className="shrink-0 text-right font-display leading-none font-extrabold">
          {ticket.price !== null ? (
            <>
              <span className="mr-1 align-top text-lg text-cream/55 sm:text-xl">{ticket.currency}</span>
              <span className="text-5xl sm:text-6xl">{ticket.price}</span>
            </>
          ) : (
            <span className="text-xl text-cream/80 uppercase">Por confirmar</span>
          )}
        </p>
      </div>

      {ticket.benefits.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-cream/75">
          {ticket.benefits.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      )}

      {ticket.raffle && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-white/[0.04] px-3 py-2.5 text-sm text-cream/80">
          <Gift className="mt-0.5 size-4 shrink-0" style={{ color: ticket.color }} aria-hidden />
          {ticket.raffle}
        </p>
      )}

      <a
        href={whatsappUrl(ticket.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-ink-950 transition hover:brightness-110 active:scale-[0.98]"
        style={{ background: ticket.color }}
      >
        <MessageCircle className="size-4" aria-hidden />
        {ticket.ctaLabel}
      </a>
    </article>
  );
}
