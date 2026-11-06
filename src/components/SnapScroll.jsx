"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

export default function SnapScroll({
  children,
  enabled = true,
  type = "mandatory",
  duration = 1,
  debounce = 200,
  align = "start",
  selector,
  className,
}) {
  const lenis = useLenis();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !lenis || !containerRef.current) return;

    const snap = new Snap(lenis, {
      type,
      duration,
      debounce,
    });

    const targets = selector
      ? containerRef.current.querySelectorAll(selector)
      : containerRef.current.children;

    if (targets && targets.length > 0) {
      snap.addElements(targets, { align });
    }

    return () => {
      snap.destroy();
    };
  }, [enabled, lenis, type, duration, debounce, align, selector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
