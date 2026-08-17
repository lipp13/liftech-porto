"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

const HORIZONTAL_PROJECTS = [
  {
    num: "01",
    name: "AURA",
    category: "PREMIUM DIGITAL COMMERCE",
    year: "2026",
    synopsis: "Haute horlogerie digital flagship with micro-interactions and editorial catalog architecture.",
    theme: "bg-[#161614]",
    accent: "text-white",
  },
  {
    num: "02",
    name: "ECHOTIC",
    category: "IMMERSIVE DIGITAL EXPERIENCE",
    year: "2025",
    synopsis: "Spatial acoustics ticketing platform with real-time frequency visualizers and zero-latency checkout.",
    theme: "bg-[#1c1e22]",
    accent: "text-[#96a0b5]",
  },
  {
    num: "03",
    name: "OPTIK EZIA",
    category: "OPTICAL BRAND EXPERIENCE",
    year: "2025",
    synopsis: "Tokyo atelier eyewear maison featuring virtual try-on previews and bespoke typographic layout.",
    theme: "bg-[#23211f]",
    accent: "text-[#d4a373]",
  },
];

export default function HorizontalShowcase() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
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
      className="relative bg-[#f0eee6] border-y border-[rgba(17,17,16,0.08)] py-24 md:py-0 md:h-screen md:flex md:items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 md:hidden mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-2">
          04 / PROJECT WORLD
        </div>
        <h3 className="text-2xl font-medium tracking-tight text-[#111110]">
          HORIZONTAL ARCHIVES
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
              04 / SEQUENCE
            </div>
            <h3 className="text-4xl font-medium tracking-tight text-[#111110] leading-none mb-4">
              PROJECT HORIZON
            </h3>
            <p className="text-sm text-[#585650] leading-relaxed">
              Continuous horizontal exploration of selected digital flagships and interactive architectures.
            </p>
          </div>
          <div className="text-xs font-mono text-[#88857d] tracking-widest uppercase">
            SCROLL HORIZONTALLY &rarr;
          </div>
        </div>

        {/* Project Sequence Cards */}
        {HORIZONTAL_PROJECTS.map((item) => (
          <div
            key={item.num}
            data-cursor-text="VIEW"
            className={`flex flex-col justify-between w-full md:w-[500px] h-[360px] md:h-[500px] shrink-0 p-8 md:p-12 rounded-3xl ${item.theme} text-[#f8f6f0] shadow-2xl transition-all duration-300 select-none`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
              <span>{item.num} / ARCHIVE</span>
              <span>{item.year}</span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest block mb-2">
                {item.category}
              </span>
              <h4 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                {item.name}
              </h4>
              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                {item.synopsis}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
              <span>EXPLORE CASE STUDY</span>
              <span className="text-white">&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
