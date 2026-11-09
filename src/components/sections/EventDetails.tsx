import { CalendarDays, CalendarPlus, Clock, MapPin, MessageCircle, Navigation, School } from "lucide-react";
import { event } from "@/data/event";
import { googleCalendarUrl, defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountdownDisplay } from "@/components/ui/CountdownDisplay";
import { buttonClass } from "@/components/ui/buttons";

type Detail = {
  icon: React.ElementType;
  label: string;
  value: string;
  hint?: string;
  action?: { href: string; label: string; icon: React.ElementType };
};

/** Detalles del evento. Toda la información viene de `src/data/event.ts`. */
export function EventDetails() {
  const { venue } = event;
  const venueConfirmed = Boolean(venue.name);

  const details: Detail[] = [
    { icon: CalendarDays, label: "Fecha", value: event.dateLong },
    { icon: Clock, label: "Hora", value: event.timeLong },
    {
      icon: MapPin,
      label: "Lugar",
      value: venueConfirmed ? (venue.name as string) : "Por confirmar",
      hint: venueConfirmed
        ? (venue.address ?? event.city)
        : "Anunciaremos el lugar muy pronto. Consulta por WhatsApp.",
      action: venue.mapsUrl
        ? { href: venue.mapsUrl, label: "Ver en Google Maps", icon: Navigation }
        : undefined,
    },
    {
      icon: MessageCircle,
      label: "Contacto",
      value: event.contact.phoneDisplay,
      hint: "WhatsApp",
      action: { href: whatsappUrl(defaultWhatsappMessage), label: "Escribir por WhatsApp", icon: MessageCircle },
    },
  ];

  return (
    <section id="evento" aria-labelledby="evento-title" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
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
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-cream/45 uppercase">
              Cuenta regresiva
            </p>
            <CountdownDisplay size="lg" />
          </Reveal>
        </div>

        <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition-colors duration-500 hover:border-gold/30">
                <d.icon className="size-5 text-gold" aria-hidden />
                <dt className="mt-6 text-[11px] font-semibold tracking-[0.25em] text-cream/45 uppercase">
                  {d.label}
                </dt>
                <dd className="mt-2 flex flex-1 flex-col">
                  <span className="font-display text-2xl leading-tight font-extrabold uppercase">{d.value}</span>
                  {d.hint && <span className="mt-1.5 text-sm text-cream/55">{d.hint}</span>}
                  {d.action && (
                    <a
                      href={d.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold underline-offset-4 hover:underline"
                    >
                      <d.action.icon className="size-4" aria-hidden />
                      {d.action.label}
                    </a>
                  )}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-white/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <School className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
              <div>
                <p className="font-semibold">{event.fullName}</p>
                <p className="mt-1 text-sm text-cream/55">{event.institution}</p>
              </div>
            </div>
            <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "shrink-0")}>
              <CalendarPlus className="size-4" aria-hidden />
              Agregar a mi calendario
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
