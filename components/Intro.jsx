"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

export default function Intro() {
  const containerRef = useRef(null);
  const wordsRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Differential scroll velocity on triad words
      gsap.to(word1Ref.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(word2Ref.current, {
        y: -55,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(word3Ref.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });

      // Scrub statement opacity
      const words = wordsRef.current?.querySelectorAll(".intro-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: "top 80%",
              end: "bottom 70%",
              scrub: 0.8,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statement =
    "I build digital experiences where design, technology and motion meet.";

  return (
    <section
      ref={containerRef}
      className="relative py-36 md:py-56 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-20">
        01 / INTRODUCTION
      </div>

      {/* Triad Rhythm with Differential Velocity */}
      <div className="mb-24 md:mb-36 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-14 text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#111110]">
        <span ref={word1Ref} className="inline-block will-change-transform">
          DESIGN.
        </span>
        <span
          ref={word2Ref}
          className="inline-block font-serif italic font-normal text-[#585650] will-change-transform"
        >
          code.
        </span>
        <span ref={word3Ref} className="inline-block will-change-transform">
          MOTION.
        </span>
      </div>

      {/* Statement */}
      <div className="max-w-4xl">
        <p
          ref={wordsRef}
          className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.035em] leading-[1.15] text-[#111110]"
        >
          {statement.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="intro-word inline-block mr-[0.26em] transition-colors"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
