import type { Song } from "@/types";

/**
 * Catálogo musical.
 *
 * Cada `youtubeVideoId` fue verificado con el endpoint oEmbed de YouTube
 * (video existente e insertable) el 08/11/2026. `source` indica el canal
 * que publica el video.
 *
 * Para agregar una canción:
 *   1. Copia el ID del enlace: https://www.youtube.com/watch?v=ESTE_ES_EL_ID
 *   2. Añade un objeto con un `id` único y el `artistId` de `artists.ts`.
 *   3. Opcional: `spotifyUrl` como alternativa y `coverImage` (ruta en /public).
 *
 * Si dejas el arreglo vacío, el reproductor muestra un estado vacío.
 */
export const songs: Song[] = [
  // — Águilas de América (canal oficial @aguilasdeamericaoficial)
  {
    id: "aguilas-mi-persona-especial",
    title: "Mi Persona Especial",
    artistId: "aguilas-de-america",
    youtubeVideoId: "qXjTzhqsYKU",
    source: "Águilas de América",
  },
  {
    id: "aguilas-yo-si-sufri",
    title: "Yo Sí Sufrí",
    artistId: "aguilas-de-america",
    youtubeVideoId: "FQVHreLibAE",
    source: "Águilas de América",
  },
  {
    id: "aguilas-dimelo",
    title: "Dímelo",
    artistId: "aguilas-de-america",
    youtubeVideoId: "BSM3tLjbp7U",
    source: "Águilas de América",
  },
  {
    id: "aguilas-aqui-estoy",
    title: "Aquí Estoy",
    artistId: "aguilas-de-america",
    youtubeVideoId: "z0cAUF8mhdg",
    source: "Águilas de América",
  },
  {
    id: "aguilas-mal-pensada",
    title: "Mal Pensada",
    artistId: "aguilas-de-america",
    youtubeVideoId: "x16W9yW1T5M",
    source: "Águilas de América",
  },
  {
    id: "aguilas-te-desconozco",
    title: "Te Desconozco (con Sr. Pulsera & Nicolle)",
    artistId: "aguilas-de-america",
    youtubeVideoId: "4QnKJzl5hEk",
    source: "Águilas de América",
  },

  // — Rosita de Espinar (videos oficiales publicados por sus productoras)
  {
    id: "rosita-amor-cibernetico",
    title: "Amor Cibernético",
    artistId: "rosita-de-espinar",
    youtubeVideoId: "wDquBxfcQ24",
    source: "Producciones Amor Amor",
  },
  {
    id: "rosita-la-cantina-es-mi-refugio",
    title: "La Cantina es mi Refugio",
    artistId: "rosita-de-espinar",
    youtubeVideoId: "pd_uqDSRbM4",
    source: "Producciones Amor Amor",
  },
  {
    id: "rosita-mix-tupay",
    title: "Mix Tupay",
    artistId: "rosita-de-espinar",
    youtubeVideoId: "cZrvSXFsp7g",
    source: "Pichón Producciones",
  },
  {
    id: "rosita-quedate-en-tu-casa",
    title: "Quédate en tu Casa",
    artistId: "rosita-de-espinar",
    youtubeVideoId: "wroGlrp9yj8",
    source: "RAMA Studios",
  },

  // — Roy Gentiles (canal oficial "Roy y Los Gentiles" @royinternacional)
  {
    id: "roy-no-te-supero",
    title: "No Te Supero",
    artistId: "roy-gentiles",
    youtubeVideoId: "IbSxBQUL_ts",
    source: "Roy y Los Gentiles",
  },
  {
    id: "roy-si-no-te-hubieras-ido",
    title: "Si No Te Hubieras Ido",
    artistId: "roy-gentiles",
    youtubeVideoId: "e5TcTcRMMYc",
    source: "Roy y Los Gentiles",
  },
  {
    id: "roy-entregame-tu-amor",
    title: "Entrégame tu Amor",
    artistId: "roy-gentiles",
    youtubeVideoId: "cSnCDpYp5sM",
    source: "Roy y Los Gentiles",
  },
  {
    id: "roy-palmeras-agua-y-arena",
    title: "Palmeras, Agua y Arena",
    artistId: "roy-gentiles",
    youtubeVideoId: "_p690HOPlws",
    source: "Roy y Los Gentiles",
  },
  {
    id: "roy-mix-chiquilla-perdida",
    title: "Mix Chiquilla Perdida / Cervecita / Hay Cariño",
    artistId: "roy-gentiles",
    youtubeVideoId: "keNXlO0rgKc",
    source: "Roy y Los Gentiles",
  },
];
