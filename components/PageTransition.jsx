"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PageTransition() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    const tl = gsap.timeline({
      onComplete: () => setIsDone(true),
    });

    tl.to(text, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    })
      .to(
        text,
        {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
        },
        "+=0.1"
      )
      .to(overlay, {
        yPercent: -100,
        duration: 0.45,
        ease: "power4.inOut",
      });
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f8f6f0] pointer-events-none"
    >
      <span
        ref={textRef}
        className="opacity-0 translate-y-3 text-xs font-mono tracking-[0.3em] uppercase text-[#111110]"
      >
        LIFTECH &bull; 2026
      </span>
    </div>
  );
}
