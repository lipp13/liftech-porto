"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    const handleHoverElements = () => {
      const interactiveEls = document.querySelectorAll(
        "a, button, [data-cursor-expand], [data-cursor-text]"
      );

      interactiveEls.forEach((el) => {
        const text = el.getAttribute("data-cursor-text");
        const onEnter = () => {
          if (text) {
            setCursorText(text);
            gsap.to(follower, {
              scale: 3.2,
              backgroundColor: "rgba(18, 18, 18, 0.9)",
              backdropFilter: "blur(4px)",
              borderColor: "transparent",
              duration: 0.3,
            });
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
          } else {
            gsap.to(follower, {
              scale: 1.8,
              borderColor: "rgba(18, 18, 18, 0.4)",
              backgroundColor: "rgba(18, 18, 18, 0.04)",
              duration: 0.25,
            });
          }
        };

        const onLeave = () => {
          setCursorText("");
          gsap.to(follower, {
            scale: 1,
            backgroundColor: "transparent",
            borderColor: "rgba(18, 18, 18, 0.25)",
            backdropFilter: "none",
            duration: 0.3,
          });
          gsap.to(cursor, { opacity: 1, duration: 0.2 });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Run after DOM has painted
    const timer = setTimeout(handleHoverElements, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#121212] pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } hidden md:block`}
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[rgba(18,18,18,0.25)] pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } hidden md:flex`}
      >
        {cursorText && (
          <span className="text-[8px] font-mono tracking-widest text-[#f9f8f6] uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
