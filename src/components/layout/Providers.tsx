"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { MusicProvider } from "@/components/music/MusicProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <MusicProvider>{children}</MusicProvider>
    </MotionConfig>
  );
}
