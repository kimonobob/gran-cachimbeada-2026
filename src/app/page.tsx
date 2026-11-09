import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MusicSection } from "@/components/music/MusicSection";
import { EventDetails } from "@/components/sections/EventDetails";
import { Tickets } from "@/components/sections/Tickets";
import { Raffle } from "@/components/sections/Raffle";
import { Poster } from "@/components/sections/Poster";
import { eventJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="contenido">
        <Hero />
        <MusicSection />
        <EventDetails />
        <Tickets />
        <Raffle />
        <Poster />
      </main>
      <Footer />
    </>
  );
}
