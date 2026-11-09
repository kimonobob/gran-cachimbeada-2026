"use client";

import { useEffect, useState } from "react";

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** `true` cuando la fecha ya llegó. Nunca se devuelven números negativos. */
  isPast: boolean;
  /** `false` hasta montar en el cliente (evita desajustes de hidratación). */
  ready: boolean;
};

function compute(target: number): Omit<Countdown, "ready"> {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: diff === 0,
  };
}

export function useCountdown(targetIso: string): Countdown {
  const [state, setState] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    ready: false,
  });

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => setState({ ...compute(target), ready: true });
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return state;
}
