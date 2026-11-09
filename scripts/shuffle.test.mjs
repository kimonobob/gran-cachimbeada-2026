// Pruebas de la lógica aleatoria. Ejecutar con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildQueue, shuffle, takeNext } from "../src/lib/shuffle.ts";

const ids = ["a", "b", "c", "d", "e"];

test("shuffle conserva todos los elementos", () => {
  for (let i = 0; i < 200; i++) {
    assert.deepEqual(shuffle(ids).sort(), [...ids].sort());
  }
});

test("buildQueue nunca empieza con la canción a evitar", () => {
  for (let i = 0; i < 1000; i++) {
    assert.notEqual(buildQueue(ids, "c")[0], "c");
  }
});

test("recorre todo el catálogo antes de repetir y nunca repite consecutivas", () => {
  let queue = [];
  let last = null;
  const played = [];
  for (let i = 0; i < ids.length * 50; i++) {
    const next = takeNext(queue, ids, last);
    assert.notEqual(next.id, last);
    played.push(next.id);
    queue = next.queue;
    last = next.id;
  }
  for (let round = 0; round < 50; round++) {
    const slice = played.slice(round * ids.length, (round + 1) * ids.length);
    assert.equal(new Set(slice).size, ids.length, `ronda ${round}: ${slice}`);
  }
});

test("respeta el filtro de canciones disponibles", () => {
  let queue = buildQueue(ids);
  const subset = ["b", "d"];
  for (let i = 0; i < 20; i++) {
    const next = takeNext(queue, subset, null);
    assert.ok(subset.includes(next.id));
    queue = next.queue;
  }
});

test("catálogo vacío devuelve null sin fallar", () => {
  assert.deepEqual(takeNext([], [], null), { id: null, queue: [] });
});

test("catálogo de una canción la repite sin bloquearse", () => {
  assert.equal(takeNext([], ["solo"], "solo").id, "solo");
});

test("distribución aproximadamente uniforme de la primera canción", () => {
  const counts = Object.fromEntries(ids.map((id) => [id, 0]));
  const runs = 20000;
  for (let i = 0; i < runs; i++) counts[buildQueue(ids)[0]]++;
  for (const id of ids) {
    const ratio = counts[id] / runs;
    assert.ok(Math.abs(ratio - 0.2) < 0.02, `${id}: ${ratio}`);
  }
});
