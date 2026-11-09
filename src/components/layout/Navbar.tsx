"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { event } from "@/data/event";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import { cn } from "@/lib/cn";
import { navItems } from "@/data/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta la sección visible.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menú móvil: Escape para cerrar, bloquea el scroll y enfoca el primer enlace.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#contenido"
        className="sr-only rounded-full bg-gold px-4 py-2 text-ink-950 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8"
      >
        <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir al inicio">
          <Image
            src="/images/logo-fie.png"
            alt="Logo de Ingeniería Económica UNA-Puno"
            width={44}
            height={44}
            priority
            className="size-10 rounded-full ring-1 ring-gold/40 transition duration-300 group-hover:scale-105 group-hover:ring-gold sm:size-11"
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-lg font-extrabold tracking-wide uppercase">
              {event.name}
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-cream/50 uppercase">
              Ing. Económica 2026
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  activeId === item.id ? "text-cream" : "text-cream/55 hover:text-cream",
                )}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink-950 sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden />
            Contacto
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pt-6 pb-10">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-white/[0.06] py-4 font-display text-4xl font-extrabold tracking-tight uppercase"
                  >
                    {item.label}
                    <span className="font-sans text-xs tracking-widest text-cream/35">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp {event.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
