import type { Song } from "@/types";

/**
 * Audios de los artistas (archivos en /public/audio).
 *
 * Para agregar uno:
 *   1. Copia el MP3 a public/audio/ (nombre sin espacios ni tildes).
 *   2. Añade una entrada con un `id` único, el `artistId` de `artists.ts`
 *      y la ruta en `audioSrc`.
 *   3. Opcional: `title` con el nombre real de la canción. Si no lo pones,
 *      se muestra "Éxito 1", "Éxito 2", etc.
 *
 * Si el arreglo queda vacío, la sección muestra un estado vacío.
 */
const clips = (artistId: string, count: number): Song[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${artistId}-${i + 1}`,
    artistId,
    audioSrc: `/audio/${artistId}-${i + 1}.mp3`,
  }));

export const songs: Song[] = [
  ...clips("aguilas-de-america", 5),
  ...clips("rosita-de-espinar", 3),
  ...clips("roy-gentiles", 5),
];

/** Ejemplo para poner el nombre real a un audio:
 *  { id: "aguilas-de-america-1", artistId: "aguilas-de-america",
 *    audioSrc: "/audio/aguilas-de-america-1.mp3", title: "Nombre real" }
 */

export function songTitle(song: Song) {
  if (song.title) return song.title;
  const index = songs.filter((s) => s.artistId === song.artistId).indexOf(song);
  return `Éxito ${index + 1}`;
}
