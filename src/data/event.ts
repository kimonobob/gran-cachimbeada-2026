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
    "La Gran Recepción al Cachimbo de Ingeniería Económica de la Universidad Nacional del Altiplano - Puno. Una noche con Águilas de América, Rosita de Espinar y Roy Gentiles en Pérgola Jardín Puno.",

  /** Fecha y hora con desfase de Lima (UTC-5). */
  startDate: "2026-11-19T19:00:00-05:00",
  timeZone: "America/Lima",
  dateLabel: "19 NOV",
  timeLabel: "7:00 PM",
  dateLong: "Jueves 19 de noviembre de 2026",
  timeLong: "7:00 p. m. (hora de Lima)",

  institution: "Universidad Nacional del Altiplano - Puno",
  city: "Puno, Perú",

  /** Lugar del evento. */
  venue: {
    name: "Pérgola Jardín Puno",
    type: "Salón de eventos",
    address: "Av. Panamá 613, Puno 21001, Perú",
    /** Enlace de Google Maps (búsqueda por nombre y dirección). */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=P%C3%A9rgola%20Jard%C3%ADn%20Puno%2C%20Av.%20Panam%C3%A1%20613%2C%20Puno%2021001",
    /** Mapa insertado (no requiere clave de API). Pon `null` para ocultarlo. */
    mapEmbedUrl:
      "https://www.google.com/maps?q=P%C3%A9rgola%20Jard%C3%ADn%20Puno%2C%20Av.%20Panam%C3%A1%20613%2C%20Puno%2021001&output=embed" as string | null,
    photo: {
      src: "/images/venue/pergola-jardin-puno.webp",
      width: 1244,
      height: 773,
      alt: "Entrada de Pérgola Jardín Puno, salón de eventos con techo rojo y alfombra roja",
    },
  },

  /** Plano del escenario con las zonas de entradas. */
  stageMap: {
    src: "/images/venue/escenario-zonas.webp",
    width: 1400,
    height: 968,
    alt: "Plano del escenario: zona GOLDEN junto al escenario, VIP al medio y GENERAL al fondo",
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
