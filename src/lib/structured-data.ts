import { artists } from "@/data/artists";
import { event, posterImage, siteUrl } from "@/data/event";
import { tickets } from "@/data/tickets";
import { whatsappUrl } from "@/lib/links";

/** Datos estructurados schema.org/MusicEvent con lugar y precios configurados. */
export function eventJsonLd() {
  const { venue } = event;

  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${event.name} - ${event.subtitle}`,
    alternateName: event.fullName,
    description: event.description,
    startDate: event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: `${venue.name} - ${venue.type}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Panamá 613",
        addressLocality: "Puno",
        postalCode: "21001",
        addressCountry: "PE",
      },
    },
    image: [`${siteUrl}${posterImage.src}`],
    url: siteUrl,
    performer: artists.map((a) => ({ "@type": "PerformingGroup", name: a.name })),
    offers: tickets
      .filter((t) => t.price !== null)
      .map((t) => ({
        "@type": "Offer",
        name: `Entrada ${t.name}`,
        price: t.price,
        priceCurrency: "PEN",
        url: whatsappUrl(t.whatsappMessage),
      })),
    organizer: {
      "@type": "Organization",
      name: `${event.fullName} - ${event.institution}`,
      url: siteUrl,
    },
  };
}
