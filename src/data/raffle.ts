/**
 * Sorteo especial. Completa los campos cuando los organizadores los definan.
 * Los valores `null` o listas vacías se muestran como "Por anunciar".
 */
export const raffle = {
  title: "Tu entrada también puede traerte un premio",
  highlight: "¡A más entradas, más oportunidades de ganar!",
  prizes: [
    { ticket: "GOLDEN", prize: "2 meses de Claude Code o ChatGPT" },
    { ticket: "VIP", prize: "1 mes de Claude Code o ChatGPT" },
  ],
  /** Ej.: "Viernes 20 de noviembre de 2026, 8:00 p. m." */
  drawDate: null as string | null,
  /** Ej.: "En vivo durante el evento" */
  procedure: null as string | null,
  /** Ej.: "El ganador será contactado por WhatsApp..." */
  delivery: null as string | null,
  terms: [] as string[],
  disclaimer:
    "Claude es una marca de Anthropic y ChatGPT es una marca de OpenAI. El sorteo es organizado por los responsables del evento y no está patrocinado, avalado ni administrado por dichas empresas. Participar no garantiza obtener un premio.",
};
