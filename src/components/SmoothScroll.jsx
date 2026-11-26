"use client";

import { ReactLenis } from "lenis/react";
import { useDesktop } from "@/hooks/useDesktop";

const LENIS_OPTIONS = { lerp: 0.1, duration: 1.5, smoothWheel: true };

export default function SmoothScroll({ children }) {
  const isDesktop = useDesktop();

  return (
    <>
      {isDesktop && <ReactLenis root options={LENIS_OPTIONS} />}
      {children}
    </>
  );
}
