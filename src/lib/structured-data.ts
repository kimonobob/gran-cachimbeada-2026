import { artists } from "@/data/artists";
import { event, posterImage, siteUrl } from "@/data/event";

/**
 * Datos estructurados schema.org/Event.
 * Solo incluye el lugar cuando está confirmado en `event.ts`; no se inventan
 * precios ni ofertas.
 */
export function eventJsonLd() {
  const { venue } = event;
  const location = venue.name
    ? {
        "@type": "Place",
        name: venue.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: venue.address ?? undefined,
          addressLocality: "Puno",
          addressCountry: "PE",
        },
      }
    : {
        "@type": "Place",
        name: event.city,
        address: { "@type": "PostalAddress", addressLocality: "Puno", addressCountry: "PE" },
      };

  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${event.name} - ${event.subtitle}`,
    alternateName: event.fullName,
    description: event.description,
    startDate: event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location,
    image: [`${siteUrl}${posterImage.src}`],
    url: siteUrl,
    performer: artists.map((a) => ({ "@type": "PerformingGroup", name: a.name })),
    organizer: {
      "@type": "Organization",
      name: `${event.fullName} - ${event.institution}`,
      url: siteUrl,
    },
  };
}
