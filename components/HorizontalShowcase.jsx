"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

const HORIZONTAL_MODULES = [
  {
    num: "04A",
    title: "KINETIC ENGINE",
    type: "GSAP 3 / Lenis / Canvas2D",
    desc: "Physics-grounded animation orchestrations synchronized at 60fps across variable refresh displays.",
    tag: "EXPERIMENTAL ARCHIVE",
  },
  {
    num: "04B",
    title: "EDITORIAL DESIGN SYSTEM",
    type: "Tailwind 4 / Fluid Typography",
    desc: "Harmonized typography tokens, mathematical spatial ratios, and asymmetric responsive grids.",
    tag: "DESIGN SPECIFICATION",
  },
  {
    num: "04C",
    title: "SPATIAL AUDIO INTERFACE",
    type: "Web Audio API / Visualizer",
    desc: "Real-time frequency extraction and harmonic waveform distortion mapped directly to scroll velocity.",
    tag: "ACOUSTIC LAB",
  },
  {
    num: "04D",
    title: "HEADLESS NEXT.JS PIPELINE",
    type: "App Router / Server Actions",
    desc: "Edge-cached data fetching with sub-second page loads and zero layout shift on hydration.",
    tag: "CORE INFRASTRUCTURE",
  },
];

export default function HorizontalShowcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Only pin horizontal on medium+ screens to keep mobile scroll pristine
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const totalScroll = track.scrollWidth - window.innerWidth + 120;

        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f0eee6] border-y border-[rgba(17,17,16,0.08)] py-20 md:py-0 md:h-screen md:flex md:items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 md:hidden mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-2">
          LABORATORY & EXPERIMENTAL ARCHIVES
        </div>
        <h3 className="text-2xl font-medium tracking-tight text-[#111110]">
          EXPERIMENTAL MODULES
        </h3>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-16 w-full md:w-max"
      >
        {/* Intro Block for Desktop */}
        <div className="hidden md:flex flex-col justify-between w-[380px] shrink-0 p-10 rounded-3xl bg-[#f8f6f0] border border-[rgba(17,17,16,0.08)]">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-4">
              03 / LABORATORY
            </div>
            <h3 className="text-4xl font-medium tracking-tight text-[#111110] leading-none mb-4">
              INTERACTIVE ARCHIVES
            </h3>
            <p className="text-sm text-[#585650] leading-relaxed">
              Exploratory prototypes, custom audio-visual experiments, and performance stress tests.
            </p>
          </div>
          <div className="text-xs font-mono text-[#88857d] tracking-widest">
            SCROLL HORIZONTALLY &rarr;
          </div>
        </div>

        {/* Horizontal Project Modules */}
        {HORIZONTAL_MODULES.map((item) => (
          <div
            key={item.num}
            className="flex flex-col justify-between w-full md:w-[460px] h-[340px] md:h-[480px] shrink-0 p-8 md:p-12 rounded-3xl bg-[#161614] text-[#f8f6f0] shadow-xl group hover:border-white/20 border border-transparent transition-all duration-300 select-none"
          >
            <div className="flex items-center justify-between text-xs font-mono text-white/50 tracking-widest">
              <span>{item.num}</span>
              <span>{item.tag}</span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest block mb-2">
                {item.type}
              </span>
              <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">
                {item.title}
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>STATUS: PRODUCTION</span>
              <span className="text-white group-hover:translate-x-1 transition-transform">
                ARCHIVE SPEC &nearr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
