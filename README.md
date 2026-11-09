# Gran Cachimbeada · Ingeniería Económica 2026

Página web oficial de la **Gran Recepción al Cachimbo de Ingeniería Económica** de la
Universidad Nacional del Altiplano - Puno.

- **Fecha:** jueves 19 de noviembre de 2026, 7:00 p. m. (America/Lima)
- **Artistas:** Águilas de América · Rosita de Espinar · Roy Gentiles
- **Contacto:** WhatsApp 904 536 741

Construida con **Next.js (App Router) + TypeScript estricto + Tailwind CSS 4 + Motion +
Lucide**. La página se prerenderiza como contenido estático. No usa base de datos ni backend.

---

## Funcionalidades

| Sección | Qué hace |
| --- | --- |
| Hero | Título animado, iluminación ambiental, partículas, cuenta regresiva y llamadas a la acción |
| Artistas | Tres tarjetas con fotos reales. En móvil se muestran como carrusel. "Escuchar repertorio" filtra el reproductor por artista |
| Música | Reproductor aleatorio con la **YouTube IFrame Player API**, cola *shuffle*, filtro por artista y botones Sorpréndeme, Siguiente y Reproducir/Pausar |
| Reproductor flotante | Al salir de la sección, el mismo video pasa a una ventana compacta sin recargarse. Mide al menos 200 px de alto y se puede minimizar (al hacerlo se pausa) |
| Evento | Componente `EventDetails` con fecha, hora, lugar (editable), mapa opcional, contacto, cuenta regresiva y "Agregar a mi calendario" |
| Entradas | Tarjetas GOLDEN y VIP con precio y beneficios editables, y botón a WhatsApp con un mensaje distinto para cada entrada |
| Sorteo | Premios por tipo de entrada, logotipos informativos, fecha, procedimiento y términos editables |
| Afiche | Afiche original con visor ampliado, descarga y botón para compartir |
| SEO | Metadatos, Open Graph (imagen generada), favicon y datos estructurados `MusicEvent` |

**Música:** no se reproduce nada al abrir la página. El script de YouTube solo se descarga
cuando el visitante pulsa reproducir. Los errores (video eliminado, inserción no permitida,
sin conexión) y los bloqueos de reproducción automática muestran un mensaje y el enlace
"Abrir en YouTube".

---

## Desarrollo local

Requisitos: Node.js 20.9 o superior y npm.

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
```

Otros comandos:

```bash
npm run typecheck  # chequeo de TypeScript
npm run lint       # ESLint
npm test           # pruebas de la lógica aleatoria (node:test)
npm run build      # build de producción
npm start          # sirve el build de producción
```

---

## Estructura

```text
src/
  app/
    layout.tsx            # fuentes, metadatos SEO, proveedores
    page.tsx              # composición de secciones + JSON-LD
    globals.css           # tema (colores, tipografías) y animaciones
    icon.svg              # favicon
    opengraph-image.tsx   # imagen para compartir en redes
  components/
    layout/               # Navbar, Footer, Providers
    sections/             # Hero, Artists, EventDetails, Tickets, Raffle, Poster
    music/                # MusicProvider (estado + YouTube), PlayerStage, MusicSection
    ui/                   # Reveal, SectionHeading, CountdownDisplay, botones
  data/                   # <- TODO EL CONTENIDO EDITABLE
    event.ts  artists.ts  songs.ts  tickets.ts  raffle.ts  navigation.ts
  hooks/useCountdown.ts
  lib/
    shuffle.ts            # lógica aleatoria pura (sin React)
    youtube.ts            # carga de la IFrame API y mensajes de error
    links.ts              # WhatsApp, YouTube, Google Calendar
    structured-data.ts    # schema.org Event
  types/index.ts
public/images/
  afiche-original.png     # afiche oficial (descargable)
  afiche-share.jpg        # versión liviana para la imagen de redes
  artists/                # fotos y logos optimizados (WebP)
scripts/shuffle.test.mjs  # pruebas
```

---

## Guía de edición

### Detalles del evento — `src/data/event.ts`

- **Lugar:** completa `venue.name`, `venue.address` y `venue.mapsUrl` (enlace de Google
  Maps). Mientras `name` sea `null`, la web muestra "Por confirmar". El JSON-LD también
  usa estos datos.
- **Fecha/hora:** cambia `startDate` (formato ISO con `-05:00`) y las etiquetas
  `dateLabel`, `timeLabel`, `dateLong` y `timeLong`.
- **Contacto:** `contact.whatsapp` en formato internacional sin `+` (ej. `51904536741`).
- **Redes sociales:** agrega solo cuentas oficiales.

  ```ts
  social: [{ label: "Facebook", url: "https://facebook.com/...", icon: "facebook" }],
  ```

### Precios y beneficios — `src/data/tickets.ts`

```ts
price: 50,                     // número en soles; null = "Precio por confirmar"
benefits: ["Acceso preferente", "..."],
whatsappMessage: "Hola, ...",  // mensaje predefinido de WhatsApp
```

### Sorteo — `src/data/raffle.ts`

Completa `drawDate`, `procedure`, `delivery` y la lista `terms`. Los valores `null`
se muestran como "Por anunciar".

### Canciones — `src/data/songs.ts`

1. Copia el ID del video: `https://www.youtube.com/watch?v=`**`qXjTzhqsYKU`**
2. Agrega una entrada:

   ```ts
   {
     id: "aguilas-nueva-cancion",      // único
     title: "Nombre de la canción",
     artistId: "aguilas-de-america",   // id definido en artists.ts
     youtubeVideoId: "XXXXXXXXXXX",
     spotifyUrl: "https://open.spotify.com/track/...", // opcional
     coverImage: "/images/covers/portada.webp",        // opcional
     source: "Canal que publica el video",             // opcional
   },
   ```

3. Usa videos de canales oficiales que permitan la inserción. Para comprobar un video:
   `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=ID&format=json`
   (si responde `401` o `404`, ese video no se puede insertar).

Una canción con `spotifyUrl` y sin `youtubeVideoId` muestra el botón "Escuchar en Spotify".
Si el arreglo queda vacío, la sección muestra un estado vacío sin errores.

### Artistas e imágenes — `src/data/artists.ts`

- Coloca las imágenes en `public/images/artists/`. Funcionan mejor en PNG o WebP con fondo
  transparente.
- Actualiza `photo`, `photoAlt`, `logo` (opcional) y `accent` (color de la tarjeta).
- El `id` debe coincidir con el `artistId` de las canciones.

### Afiche

Reemplaza `public/images/afiche-original.png`. Si cambian sus dimensiones, actualiza
`posterImage` en `event.ts` y regenera `afiche-share.jpg` (ancho de 600 px).

### Colores y tipografía

Están en el bloque `@theme` de `src/app/globals.css` y en las fuentes de `src/app/layout.tsx`.

---

## Subir a GitHub

```bash
git init            # (si aún no existe el repositorio)
git add .
git commit -m "Primera versión de la web Gran Cachimbeada 2026"
git branch -M main

# Con GitHub CLI (requiere `gh auth login`):
gh repo create gran-cachimbeada-2026 --public --source=. --remote=origin --push

# O manualmente: crea el repositorio vacío "gran-cachimbeada-2026" en github.com y luego
git remote add origin https://github.com/TU_USUARIO/gran-cachimbeada-2026.git
git push -u origin main
```

## Desplegar en Vercel

**Opción A: desde la web (recomendada)**

1. Entra a [vercel.com/new](https://vercel.com/new) e inicia sesión con GitHub.
2. Importa el repositorio `gran-cachimbeada-2026`. Vercel detecta Next.js automáticamente.
3. (Opcional) En *Environment Variables* agrega `NEXT_PUBLIC_SITE_URL` con tu dominio final.
4. Pulsa **Deploy**. Cada `git push` a `main` vuelve a desplegar el sitio.

**Opción B: CLI**

```bash
npm i -g vercel
vercel login
vercel          # despliegue de prueba
vercel --prod   # producción
```

Después de desplegar, prueba cómo se ve el enlace al compartirlo con el
[depurador de Facebook](https://developers.facebook.com/tools/debug/) (WhatsApp usa los
mismos metadatos Open Graph).

---

## Notas legales

- Los videos se reproducen con el reproductor oficial de YouTube, siempre visible. No se
  extrae el audio.
- Claude es una marca de Anthropic y ChatGPT es una marca de OpenAI. Sus logotipos aparecen
  solo con fines informativos. El sorteo no está patrocinado ni avalado por esas empresas.
- El repositorio no contiene credenciales.
