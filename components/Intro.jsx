"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

export default function Intro() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".intro-word");

      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 70%",
              scrub: 0.8,
            },
          }
        );
      }

      gsap.fromTo(
        ".manifesto-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const introSentence =
    "Developer & creative technologist focused on building digital products where design, motion, and engineering meet.";

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(18,18,18,0.08)]"
    >
      {/* Section Number & Category */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-12">
        <div className="flex items-center gap-2">
          <span>00</span>
          <span>/</span>
          <span>PHILOSOPHY</span>
        </div>
        <div className="hidden sm:block">MANUAL CRAFT & HIGH PERFORMANCE</div>
      </div>

      {/* Main Progressive Scroll-Scrubbed Text Reveal */}
      <div className="max-w-5xl">
        <p
          ref={textRef}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-[-0.03em] leading-[1.2] text-[#121212]"
        >
          {introSentence.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="intro-word inline-block mr-[0.28em] transition-colors"
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Editorial Manifesto / 3 Architectural Principles */}
      <div className="manifesto-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-[rgba(18,18,18,0.08)]">
        {[
          {
            num: "01",
            title: "Architectural Rigor",
            description:
              "Writing clean, modular frontend systems with modern Next.js App Router, SSR caching, and rock-solid state lifecycles.",
          },
          {
            num: "02",
            title: "Choreographed Motion",
            description:
              "Utilizing GSAP and Lenis for physics-grounded animations, scroll-scrubbed narratives, and buttery 60fps micro-interactions.",
          },
          {
            num: "03",
            title: "Editorial Composition",
            description:
              "Treating whitespace, typography hierarchy, and subtle borders as active functional design tools rather than decoration.",
          },
        ].map((item) => (
          <div
            key={item.num}
            className="manifesto-card flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-[#f2f0eb]/70 border border-[rgba(18,18,18,0.06)] hover:border-[rgba(18,18,18,0.18)] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-[#8c8982] tracking-wider">
                {item.num}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#121212]/30" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium tracking-tight text-[#121212] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#5e5c57] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
