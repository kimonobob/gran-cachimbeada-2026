/**
 * Lógica de reproducción aleatoria, independiente de React.
 *
 * Usa una cola tipo "shuffle bag": todas las canciones disponibles se
 * reparten al azar y se consumen una a una antes de volver a mezclar.
 * Al rearmar la cola se evita que la primera canción sea la última que sonó.
 */

export type Rng = () => number;

/** Mezcla Fisher–Yates. No modifica el arreglo original. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Crea una cola mezclada cuyo primer elemento nunca es `avoid` (si hay alternativa). */
export function buildQueue(
  ids: readonly string[],
  avoid: string | null = null,
  rng: Rng = Math.random,
): string[] {
  const queue = shuffle(ids, rng);
  if (avoid !== null && queue.length > 1 && queue[0] === avoid) {
    const swapWith = 1 + Math.floor(rng() * (queue.length - 1));
    [queue[0], queue[swapWith]] = [queue[swapWith], queue[0]];
  }
  return queue;
}

/**
 * Toma la siguiente canción de la cola.
 * - Descarta IDs que ya no pertenecen al conjunto disponible (p. ej. tras filtrar).
 * - Si la cola se vacía, la vuelve a mezclar evitando repetir `lastId`.
 */
export function takeNext(
  queue: readonly string[],
  available: readonly string[],
  lastId: string | null,
  rng: Rng = Math.random,
): { id: string | null; queue: string[] } {
  if (available.length === 0) return { id: null, queue: [] };

  const allowed = new Set(available);
  let pending = queue.filter((id) => allowed.has(id) && id !== lastId);

  if (pending.length === 0) {
    pending = buildQueue(available, lastId, rng);
  }

  const [id, ...rest] = pending;
  return { id, queue: rest };
}
