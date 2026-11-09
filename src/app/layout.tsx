import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Serif, Manrope } from "next/font/google";
import { event, siteUrl } from "@/data/event";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "800", "900"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title = `${event.name} · ${event.subtitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${event.name}`,
  },
  description: event.description,
  keywords: [
    "Gran Cachimbeada",
    "Recepción al Cachimbo",
    "Ingeniería Económica",
    "UNA Puno",
    "Universidad Nacional del Altiplano",
    "Águilas de América",
    "Rosita de Espinar",
    "Roy Gentiles",
    "Puno",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: event.name,
    title,
    description: event.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: event.description,
  },
  other: {
    "event:start_time": event.startDate,
  },
  robots: { index: true, follow: true },
  appleWebApp: { title: event.name },
};

export const viewport: Viewport = {
  themeColor: "#0E0B11",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-PE"
      className={`${display.variable} ${serif.variable} ${sans.variable} antialiased`}
    >
      <body className="min-h-dvh overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
