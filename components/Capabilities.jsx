"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

const DISCIPLINES = [
  {
    num: "01",
    name: "DESIGN",
    subtitle: "Interfaces, visual systems, digital direction.",
    description:
      "Typographic hierarchies, asymmetric editorial grids, curated palettes, and interactive prototypes that establish distinct digital brand identities.",
    previewCode: "01 // EDITORIAL DESIGN SYSTEM\nrhythm: 8pt fluid\ntypography: Grotesk Display / Serif\ncomposition: Asymmetric Whitespace",
  },
  {
    num: "02",
    name: "DEVELOPMENT",
    subtitle: "React, Next.js, modern frontend architecture.",
    description:
      "Next.js App Router, SSR/SSG caching, type-safe API boundaries, custom Canvas shaders, and scalable modular component architectures.",
    previewCode: "02 // REACT & NEXT.JS ENGINE\nruntime: Node / Edge\nrendering: Hybrid SSR + Static\nperformance: High-Efficiency Pipeline",
  },
  {
    num: "03",
    name: "MOTION",
    subtitle: "GSAP, scroll experiences, interaction design.",
    description:
      "Silky 60fps animations with GSAP, ScrollTrigger, and Lenis smooth scrolling. Physics-grounded entrance choreographies and magnetic micro-interactions.",
    previewCode: "03 // MOTION CHOREOGRAPHY\nengine: GSAP 3 + ScrollTrigger\nsmoothing: Lenis Physics\ntiming: Cinematic Bezier",
  },
  {
    num: "04",
    name: "EXPERIENCE",
    subtitle: "Responsive, accessible, performance-focused products.",
    description:
      "Fast page loads, accessibility standards, and responsive adaptability across all viewports from 320px mobile to wide desktop displays.",
    previewCode: "04 // EXPERIENCE STANDARD\naccessibility: WCAG AA\nresponsiveness: Fluid Clamp Scale\narchitecture: Modular Zero-Shift",
  },
];

export default function Capabilities() {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-20 md:mb-28">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-4">
            05 / WHAT I DO
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-[-0.04em] text-[#111110]">
            CAPABILITIES
          </h2>
        </div>
        <p className="text-xs font-mono text-[#585650] max-w-xs uppercase tracking-wider">
          Engineering rigor &bull; Creative direction &bull; Motion craft
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 flex flex-col divide-y divide-[rgba(17,17,16,0.08)]">
          {DISCIPLINES.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.num}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                className={`capability-item py-8 md:py-10 cursor-pointer transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-35 hover:opacity-75"
                }`}
                data-cursor-expand="true"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="text-xs font-mono text-[#88857d]">
                      {item.num}
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111110]">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#88857d]">
                    &rarr;
                  </span>
                </div>
                <p className="text-sm md:text-base font-serif italic text-[#585650] pl-8 md:pl-14">
                  {item.subtitle}
                </p>

                {isHovered && (
                  <div className="lg:hidden mt-4 pl-8 md:pl-14 pt-3 border-t border-[rgba(17,17,16,0.08)]">
                    <p className="text-sm text-[#111110] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:block lg:col-span-4 sticky top-36">
          <div className="p-8 rounded-3xl bg-[#f0eee6] border border-[rgba(17,17,16,0.08)]">
            <div className="flex items-center justify-between text-xs font-mono text-[#88857d] pb-4 border-b border-[rgba(17,17,16,0.08)] mb-6">
              <span>DISCIPLINE SPEC</span>
              <span>{DISCIPLINES[hoveredIndex].num} / 04</span>
            </div>

            <p className="text-sm text-[#111110] leading-relaxed mb-6 font-normal">
              {DISCIPLINES[hoveredIndex].description}
            </p>

            <div className="p-4 rounded-2xl bg-[#111110] text-[#f8f6f0] text-xs font-mono">
              <pre className="text-[#d0cdc4] leading-relaxed whitespace-pre-wrap">
                <code>{DISCIPLINES[hoveredIndex].previewCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
