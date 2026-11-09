import type { Ticket } from "@/types";

/**
 * Entradas y zonas (ver el plano en /public/images/venue/escenario-zonas.webp).
 * `price` en soles. `benefits` es opcional: se muestra solo si tiene elementos.
 * `raffle` en `null` = esa entrada no participa en el sorteo.
 */
export const tickets: Ticket[] = [
  {
    id: "golden",
    name: "GOLDEN",
    zone: "Zona más cercana al escenario",
    price: 60,
    currency: "S/",
    color: "#F5B642",
    benefits: [],
    raffle: "Participa en el sorteo de 2 meses de Claude Code o ChatGPT.",
    ctaLabel: "Consultar entrada GOLDEN",
    whatsappMessage:
      "Hola, quisiera información para adquirir una entrada GOLDEN de la Gran Cachimbeada de Ingeniería Económica 2026.",
  },
  {
    id: "vip",
    name: "VIP",
    zone: "Zona intermedia, frente al escenario",
    price: 50,
    currency: "S/",
    color: "#A855F7",
    benefits: [],
    raffle: "Participa en el sorteo de 1 mes de Claude Code o ChatGPT.",
    ctaLabel: "Consultar entrada VIP",
    whatsappMessage:
      "Hola, quisiera información para adquirir una entrada VIP de la Gran Cachimbeada de Ingeniería Económica 2026.",
  },
  {
    id: "general",
    name: "GENERAL",
    zone: "Zona posterior",
    price: 40,
    currency: "S/",
    color: "#E0413F",
    benefits: [],
    raffle: null,
    ctaLabel: "Consultar entrada GENERAL",
    whatsappMessage:
      "Hola, quisiera información para adquirir una entrada GENERAL de la Gran Cachimbeada de Ingeniería Económica 2026.",
  },
];
