import { Check, Crown, Gift, MessageCircle, Star } from "lucide-react";
import { tickets } from "@/data/tickets";
import { whatsappUrl } from "@/lib/links";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/buttons";
import { cn } from "@/lib/cn";
import type { Ticket } from "@/types";

export function Tickets() {
  return (
    <section
      id="entradas"
      aria-labelledby="entradas-title"
      className="relative overflow-hidden bg-gradient-to-b from-ink-950 via-wine-950/60 to-ink-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="entradas-title"
          align="center"
          eyebrow="Entradas"
          title={
            <>
              Elige tu <span className="font-serif font-normal text-gold normal-case italic">acceso</span>
            </>
          }
          description="Consulta disponibilidad y precios directamente con la organización por WhatsApp."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {tickets.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.12} className="h-full">
              <TicketCard ticket={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  const golden = ticket.id === "golden";
  const Icon = golden ? Crown : Star;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-500 hover:-translate-y-1 sm:p-9",
        golden
          ? "border-gold/35 bg-[linear-gradient(160deg,rgba(245,182,66,0.14),rgba(21,16,26,0.9)_45%)] hover:border-gold/60 hover:shadow-[0_30px_80px_-40px_rgba(245,182,66,0.6)]"
          : "border-rose/30 bg-[linear-gradient(160deg,rgba(214,76,143,0.14),rgba(21,16,26,0.9)_45%)] hover:border-rose/55 hover:shadow-[0_30px_80px_-40px_rgba(214,76,143,0.6)]",
      )}
    >
      {/* Perforación tipo ticket */}
      <span aria-hidden className="absolute top-[52%] -left-3 size-6 rounded-full bg-ink-950" />
      <span aria-hidden className="absolute top-[52%] -right-3 size-6 rounded-full bg-ink-950" />

      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-[11px] font-semibold tracking-[0.3em] uppercase", golden ? "text-gold" : "text-rose")}>
            Entrada
          </p>
          <h3
            className={cn(
              "mt-2 font-display text-6xl leading-none font-black tracking-tight sm:text-7xl",
              golden ? "text-gold" : "text-cream",
            )}
          >
            {ticket.name}
          </h3>
        </div>
        <span
          className={cn(
            "grid size-12 place-items-center rounded-full border",
            golden ? "border-gold/40 text-gold" : "border-rose/40 text-rose",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
      </div>
      <p className="mt-4 text-cream/65">{ticket.tagline}</p>

      <div className="mt-8">
        {ticket.price !== null ? (
          <p className="font-display text-5xl font-extrabold">
            <span className="mr-1 align-top text-2xl text-cream/60">{ticket.currency}</span>
            {ticket.price}
          </p>
        ) : (
          <p className="font-display text-3xl font-extrabold text-cream/85 uppercase">Precio por confirmar</p>
        )}
      </div>

      <div aria-hidden className="my-8 border-t border-dashed border-white/15" />

      <ul className="flex-1 space-y-3 text-sm">
        {ticket.benefits.length > 0 ? (
          ticket.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Check className={cn("mt-0.5 size-4 shrink-0", golden ? "text-gold" : "text-rose")} aria-hidden />
              <span className="text-cream/80">{b}</span>
            </li>
          ))
        ) : (
          <li className="text-cream/50">Beneficios por anunciar.</li>
        )}
        <li className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-3">
          <Gift className={cn("mt-0.5 size-4 shrink-0", golden ? "text-gold" : "text-rose")} aria-hidden />
          <span className="text-cream/85">{ticket.raffle}</span>
        </li>
      </ul>

      <a
        href={whatsappUrl(ticket.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass(golden ? "primary" : "rose", "mt-8 w-full")}
      >
        <MessageCircle className="size-4" aria-hidden />
        {ticket.ctaLabel}
      </a>
    </article>
  );
}
