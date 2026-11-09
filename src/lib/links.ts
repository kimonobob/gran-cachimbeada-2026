import { event } from "@/data/event";

export function whatsappUrl(message?: string, phone: string = event.contact.whatsapp) {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hola, quisiera información sobre la Gran Cachimbeada de Ingeniería Económica 2026.";

export function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youtubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** Enlace "Agregar a Google Calendar" (duración estimada de 5 h). */
export function googleCalendarUrl() {
  const start = new Date(event.startDate);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const location = [event.venue.name, event.venue.address, event.city].filter(Boolean).join(", ");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.name} - ${event.subtitle}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.description,
    location,
    ctz: event.timeZone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
