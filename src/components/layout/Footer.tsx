import { ExternalLink, MessageCircle } from "lucide-react";
import { event } from "@/data/event";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import { navItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-serif text-2xl text-gold italic">Gran</p>
            <p className="font-display text-5xl leading-none font-black uppercase sm:text-6xl">Cachimbeada</p>
            <p className="mt-3 text-sm tracking-[0.3em] text-cream/55 uppercase">{event.subtitle}</p>
            <p className="mt-6 text-sm text-cream/60">
              <time dateTime={event.startDate}>{event.dateLong} · {event.timeLong}</time>
            </p>
          </div>

          <nav aria-label="Secciones">
            <p className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-cream/40 uppercase">Explora</p>
            <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-cream/70 transition hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#afiche" className="text-cream/70 transition hover:text-gold">
                  Afiche
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[11px] font-semibold tracking-[0.25em] text-cream/40 uppercase">Contacto</p>
            <a
              href={whatsappUrl(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp {event.contact.phoneDisplay}
            </a>
            {event.social.length > 0 && (
              <ul className="mt-5 space-y-2 text-sm">
                {event.social.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cream/70 hover:text-cream"
                    >
                      <ExternalLink className="size-3.5" aria-hidden />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-sm text-cream/55">{event.institution}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {event.fullName}. {event.city}.
          </p>
          <p>Videos musicales reproducidos desde YouTube. Las marcas pertenecen a sus titulares.</p>
        </div>
      </div>
    </footer>
  );
}
