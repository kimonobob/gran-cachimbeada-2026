export type Artist = {
  id: string;
  name: string;
  /** Fotografía real del artista (PNG/WebP con fondo transparente). */
  photo: string;
  photoAlt: string;
  /** Logotipo opcional para superponer en la tarjeta. */
  logo?: string;
  logoAlt?: string;
  /** Color de acento usado en la tarjeta y en el reproductor. */
  accent: string;
};

export type Song = {
  id: string;
  artistId: string;
  /** Ruta del archivo de audio dentro de /public (ej. "/audio/archivo.mp3"). */
  audioSrc: string;
  /** Nombre de la canción. Si se omite se muestra "Éxito N". */
  title?: string;
};

export type Ticket = {
  id: "golden" | "vip";
  name: string;
  tagline: string;
  /** `null` mientras el precio no esté confirmado. */
  price: number | null;
  currency: string;
  /** Lista vacía mientras los beneficios no estén confirmados. */
  benefits: string[];
  raffle: string;
  ctaLabel: string;
  whatsappMessage: string;
};

export type SocialLink = {
  label: string;
  url: string;
  icon: "facebook" | "instagram" | "tiktok" | "youtube" | "link";
};
