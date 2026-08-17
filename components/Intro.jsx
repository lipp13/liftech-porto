"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

export default function Intro() {
  const containerRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Scrub word reveal
      const words = wordsRef.current?.querySelectorAll(".intro-scrub-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.8,
            },
          }
        );
      }

      // Pillar words reveal
      gsap.fromTo(
        ".pillar-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pillar-container",
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statement =
    "I create digital experiences where visual design and technology meet.";

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      {/* Category Marker */}
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-16">
        01 / DISCIPLINE
      </div>

      {/* Triad Rhythm: DESIGN. CODE. MOTION. */}
      <div className="pillar-container mb-20 md:mb-28 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111110]">
        <span className="pillar-item">DESIGN.</span>
        <span className="pillar-item font-serif italic font-normal text-[#585650]">
          code.
        </span>
        <span className="pillar-item">MOTION.</span>
      </div>

      {/* Main Large Typography Statement with ScrollTrigger scrub */}
      <div className="max-w-4xl">
        <p
          ref={wordsRef}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-normal tracking-[-0.035em] leading-[1.18] text-[#111110]"
        >
          {statement.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="intro-scrub-word inline-block mr-[0.28em] transition-colors"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
