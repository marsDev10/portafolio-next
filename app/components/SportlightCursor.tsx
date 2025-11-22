"use client";

import { useEffect, useRef } from "react";

export function SpotlightCursor() {
  const frameRef = useRef<number | null>(null);
  const latestPos = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const updatePosition = () => {
      frameRef.current = null;

      document.documentElement.style.setProperty("--cursor-x", `${latestPos.current.x}%`);
      document.documentElement.style.setProperty("--cursor-y", `${latestPos.current.y}%`);
    };

    const handleMove = (e: PointerEvent) => {
      latestPos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <div className="fixed inset-0 -z-10 cursor-spotlight" />;
}
