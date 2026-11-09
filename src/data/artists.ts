import type { Artist } from "@/types";

/**
 * Artistas del evento. Las imágenes viven en /public/images/artists.
 * El `id` se usa para relacionar canciones en `songs.ts`.
 */
export const artists: Artist[] = [
  {
    id: "aguilas-de-america",
    name: "Águilas de América",
    photo: "/images/artists/aguilas-de-america.webp",
    photoAlt: "Integrantes de la agrupación Águilas de América",
    logo: "/images/artists/aguilas-de-america-logo.webp",
    logoAlt: "Logotipo de Águilas de América",
    accent: "#F5B642",
  },
  {
    id: "rosita-de-espinar",
    name: "Rosita de Espinar",
    photo: "/images/artists/rosita-de-espinar.webp",
    photoAlt: "Rosita de Espinar con su logotipo",
    accent: "#D64C8F",
  },
  {
    id: "roy-gentiles",
    name: "Roy Gentiles",
    photo: "/images/artists/roy-gentiles.webp",
    photoAlt: "Roy Gentiles",
    logo: "/images/artists/roy-gentiles-logo.webp",
    logoAlt: "Logotipo de Roy Gentiles",
    accent: "#8FA8FF",
  },
];

export const artistById = (id: string) => artists.find((a) => a.id === id);
