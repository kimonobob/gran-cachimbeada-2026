import type { Ticket } from "@/types";

/**
 * Entradas. Cambia `price` (número, en soles) y `benefits` cuando estén
 * confirmados. Mientras `price` sea `null` se muestra "Precio por confirmar".
 */
export const tickets: Ticket[] = [
  {
    id: "golden",
    name: "GOLDEN",
    tagline: "La experiencia más completa de la noche.",
    price: null,
    currency: "S/",
    benefits: [],
    raffle: "Participa en el sorteo de 2 meses de Claude Code o ChatGPT.",
    ctaLabel: "Consultar entrada GOLDEN",
    whatsappMessage:
      "Hola, quisiera información para adquirir una entrada GOLDEN de la Gran Cachimbeada de Ingeniería Económica 2026.",
  },
  {
    id: "vip",
    name: "VIP",
    tagline: "Vive la noche con un acceso preferente.",
    price: null,
    currency: "S/",
    benefits: [],
    raffle: "Participa en el sorteo de 1 mes de Claude Code o ChatGPT.",
    ctaLabel: "Consultar entrada VIP",
    whatsappMessage:
      "Hola, quisiera información para adquirir una entrada VIP de la Gran Cachimbeada de Ingeniería Económica 2026.",
  },
];
