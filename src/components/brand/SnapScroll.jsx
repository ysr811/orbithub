"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useDesktop } from "@/hooks/useDesktop";

export default function SnapScroll({ children, selector, className }) {
  const lenis = useLenis();
  const containerRef = useRef(null);
  const isDesktop = useDesktop();

  useEffect(() => {
    if (!isDesktop || !lenis || !containerRef.current) return;

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: 1,
      debounce: 200,
    });

    const targets = selector
      ? containerRef.current.querySelectorAll(selector)
      : containerRef.current.children;

    if (targets?.length) {
      snap.addElements(targets, { align: "start" });
    }

    return () => {
      snap.destroy();
    };
  }, [isDesktop, lenis, selector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
