import { CalendarClock, FileText, PackageCheck, Ticket } from "lucide-react";
import { raffle } from "@/data/raffle";
import { Reveal } from "@/components/ui/Reveal";
import { claudePath, openAiPath } from "@/components/ui/brand-paths";

const pending = "Por anunciar";

export function Raffle() {
  const info = [
    { icon: CalendarClock, label: "Fecha del sorteo", value: raffle.drawDate ?? pending },
    { icon: Ticket, label: "Procedimiento", value: raffle.procedure ?? pending },
    { icon: PackageCheck, label: "Entrega de premios", value: raffle.delivery ?? pending },
  ];

  return (
    <section id="sorteo" aria-labelledby="sorteo-title" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[radial-gradient(90%_120%_at_0%_0%,rgba(245,182,66,0.12),transparent_55%),radial-gradient(90%_120%_at_100%_100%,rgba(214,76,143,0.14),transparent_55%)] bg-ink-900 p-7 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
              <div>
                <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-gold uppercase">
                  <span aria-hidden className="h-px w-8 bg-gold/60" />
                  Sorteo especial
                </p>
                <h2
                  id="sorteo-title"
                  className="font-display text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-6xl"
                >
                  {raffle.title}
                </h2>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {raffle.prizes.map((p) => (
                    <li key={p.ticket} className="rounded-2xl border border-white/[0.08] bg-ink-950/50 p-5">
                      <p className={`font-display text-2xl font-black ${p.ticket === "GOLDEN" ? "text-gold" : "text-rose"}`}>
                        {p.ticket}
                      </p>
                      <p className="mt-1 text-sm text-cream/75">Participa por {p.prize}.</p>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 font-serif text-3xl text-cream italic sm:text-4xl">{raffle.highlight}</p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 sm:gap-6" aria-label="Premios: suscripción a Claude Code o ChatGPT">
                  <BrandBadge name="Claude Code" path={claudePath} color="#D97757" />
                  <span className="font-serif text-2xl text-cream/40 italic">o</span>
                  <BrandBadge name="ChatGPT" path={openAiPath} color="#F7EFE6" />
                </div>
                <p className="max-w-xs text-center text-xs text-cream/40">
                  Logotipos mostrados solo con fines informativos.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-4 border-t border-white/[0.08] pt-10 sm:grid-cols-3">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-cream/45 uppercase">{item.label}</p>
                    <p className="mt-1 text-sm text-cream/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <details className="group mt-8 rounded-2xl border border-white/[0.08] bg-ink-950/40 p-5">
              <summary className="flex cursor-pointer list-none items-center gap-3 text-sm font-semibold text-cream/80 [&::-webkit-details-marker]:hidden">
                <FileText className="size-4 text-gold" aria-hidden />
                Términos y condiciones
                <span aria-hidden className="ml-auto text-cream/40 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-4 space-y-3 text-sm text-cream/60">
                {raffle.terms.length > 0 ? (
                  <ul className="list-disc space-y-1.5 pl-5">
                    {raffle.terms.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Los términos y condiciones del sorteo serán publicados por la organización.</p>
                )}
                <p className="text-xs text-cream/40">{raffle.disclaimer}</p>
              </div>
            </details>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrandBadge({ name, path, color }: { name: string; path: string; color: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <span className="grid size-24 place-items-center rounded-3xl border border-white/10 bg-ink-950/70 sm:size-28">
        <svg viewBox="0 0 24 24" className="size-11 sm:size-12" role="img" aria-label={`Logotipo de ${name}`}>
          <path d={path} fill={color} />
        </svg>
      </span>
      <figcaption className="text-sm font-semibold text-cream/80">{name}</figcaption>
    </figure>
  );
}
