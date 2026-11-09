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
| Hero | Título animado, iluminación ambiental, partículas, cuenta regresiva y un botón **Escuchar música** destacado que lleva a la sección de música |
| Escucha sus más grandes éxitos | Los tres artistas a pantalla completa y sin marcos. El botón **Escuchar** reproduce al azar cualquiera de sus audios (cola *shuffle*: no se repite ninguno hasta que suenan todos). Tocar la foto de un artista reproduce solo sus audios, y el que suena se resalta |
| Mini reproductor | Al salir de la sección aparece una barra flotante con pausa, otra al azar y cerrar |
| Evento | Fecha, hora, cuenta regresiva, el lugar (foto, mapa, "Cómo llegar", "Agregar al calendario"), plano del escenario y las entradas GOLDEN, VIP y GENERAL con su precio y su botón de WhatsApp |
| Sorteo | Premios por tipo de entrada, logotipos informativos, fecha, procedimiento y términos editables |
| Afiche | Afiche original con visor ampliado, descarga y botón para compartir |
| SEO | Metadatos, Open Graph (imagen generada), favicon y datos estructurados `MusicEvent` |

**Música:** no suena nada al abrir la página; el audio empieza solo cuando el visitante pulsa
"Escuchar". Los MP3 están en `public/audio/`.

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
    sections/             # Hero, EventDetails (lugar + entradas), Raffle, Poster
    music/                # MusicProvider (audio), MusicSection, MiniPlayer
    ui/                   # Reveal, SectionHeading, CountdownDisplay, botones
  data/                   # <- TODO EL CONTENIDO EDITABLE
    event.ts  artists.ts  songs.ts  tickets.ts  raffle.ts  navigation.ts
  hooks/useCountdown.ts
  lib/
    shuffle.ts            # lógica aleatoria pura (sin React)
    links.ts              # WhatsApp y Google Calendar
    structured-data.ts    # schema.org Event
  types/index.ts
public/audio/              # audios de los artistas (MP3)
public/images/
  afiche-original.png     # afiche oficial (descargable)
  afiche-share.jpg        # versión liviana para la imagen de redes
  artists/                # fotos y logos optimizados (WebP)
scripts/shuffle.test.mjs  # pruebas
```

---

## Guía de edición

### Detalles del evento — `src/data/event.ts`

- **Lugar:** `venue` (nombre, tipo, dirección, enlace y mapa de Google Maps, foto). La foto
  del local y el plano del escenario están en `public/images/venue/`.
- **Fecha/hora:** cambia `startDate` (formato ISO con `-05:00`) y las etiquetas
  `dateLabel`, `timeLabel`, `dateLong` y `timeLong`.
- **Contacto:** `contact.whatsapp` en formato internacional sin `+` (ej. `51904536741`).
- **Redes sociales:** agrega solo cuentas oficiales.

  ```ts
  social: [{ label: "Facebook", url: "https://facebook.com/...", icon: "facebook" }],
  ```

### Entradas y precios — `src/data/tickets.ts`

Hay tres entradas: GOLDEN (S/ 60), VIP (S/ 50) y GENERAL (S/ 40).

```ts
price: 60,                     // número en soles; null = "Por confirmar"
zone: "Zona más cercana al escenario",
color: "#F5B642",              // color de la zona en el plano
benefits: ["..."],              // opcional: solo se muestra si tiene elementos
raffle: "Participa en...",     // null = no participa en el sorteo
whatsappMessage: "Hola, ...",  // mensaje predefinido de WhatsApp
```

### Sorteo — `src/data/raffle.ts`

Completa `drawDate`, `procedure`, `delivery` y la lista `terms`. Los valores `null`
se muestran como "Por anunciar".

### Audios — `src/data/songs.ts`

1. Copia el MP3 a `public/audio/` (nombre sin espacios ni tildes, ej. `roy-gentiles-6.mp3`).
2. Para los audios numerados basta con cambiar la cantidad:

   ```ts
   ...clips("roy-gentiles", 6),   // busca roy-gentiles-1.mp3 … roy-gentiles-6.mp3
   ```

3. Para ponerle el nombre real a un audio (si no, se muestra "Éxito 1", "Éxito 2"…),
   agrega una entrada con `title`:

   ```ts
   { id: "roy-gentiles-1", artistId: "roy-gentiles",
     audioSrc: "/audio/roy-gentiles-1.mp3", title: "Nombre de la canción" },
   ```

Si el arreglo queda vacío, la sección muestra un mensaje sin errores.

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

- Asegúrate de contar con permiso para publicar los audios de los artistas.
- Claude es una marca de Anthropic y ChatGPT es una marca de OpenAI. Sus logotipos aparecen
  solo con fines informativos. El sorteo no está patrocinado ni avalado por esas empresas.
- El repositorio no contiene credenciales.
