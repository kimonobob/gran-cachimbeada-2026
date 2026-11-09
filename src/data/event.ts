import type { SocialLink } from "@/types";

/**
 * Información central del evento.
 * Edita este archivo para actualizar fecha, lugar, contacto o redes.
 */
export const event = {
  eyebrow: "Gran Recepción al Cachimbo",
  name: "Gran Cachimbeada",
  subtitle: "Ingeniería Económica 2026",
  fullName: "Gran Recepción al Cachimbo - Ingeniería Económica",
  description:
    "La Gran Recepción al Cachimbo de Ingeniería Económica de la Universidad Nacional del Altiplano - Puno. Una noche con Águilas de América, Rosita de Espinar y Roy Gentiles.",

  /** Fecha y hora con desfase de Lima (UTC-5). */
  startDate: "2026-11-19T19:00:00-05:00",
  timeZone: "America/Lima",
  dateLabel: "19 NOV",
  timeLabel: "7:00 PM",
  dateLong: "Jueves 19 de noviembre de 2026",
  timeLong: "7:00 p. m. (hora de Lima)",

  institution: "Universidad Nacional del Altiplano - Puno",
  city: "Puno, Perú",

  /**
   * Lugar del evento. Deja los valores en `null` hasta confirmarlo.
   * Ejemplo:
   *   name: "Coliseo ...",
   *   address: "Av. ..., Puno",
   *   mapsUrl: "https://maps.app.goo.gl/...",
   */
  venue: {
    name: null as string | null,
    address: null as string | null,
    mapsUrl: null as string | null,
  },

  contact: {
    phoneDisplay: "904 536 741",
    /** Número en formato internacional sin "+" ni espacios (Perú: 51). */
    whatsapp: "51904536741",
  },

  /** Redes oficiales del evento. No agregues cuentas que no sean oficiales. */
  social: [] as SocialLink[],
} as const;

/** URL pública del sitio. Configúrala en Vercel con NEXT_PUBLIC_SITE_URL. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const posterImage = {
  src: "/images/afiche-original.png",
  width: 1080,
  height: 1450,
  alt: "Afiche oficial de la Gran Recepción al Cachimbo de Ingeniería Económica: Águilas de América, Rosita de Espinar y Roy Gentiles, 19 de noviembre, 7 p. m.",
};
