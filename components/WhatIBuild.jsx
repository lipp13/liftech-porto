"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

const PILLARS = [
  {
    num: "01",
    title: "INTERFACES",
    subtitle: "Fluid design systems & digital direction.",
    detail: "Designing typography-driven editorial layouts with mathematical spatial grids and refined contrast.",
  },
  {
    num: "02",
    title: "INTERACTIONS",
    subtitle: "Physics-grounded micro-motion & feedback.",
    detail: "Crafting tactile mouse-following elements, scroll-driven narratives, and smooth inertial transitions.",
  },
  {
    num: "03",
    title: "DIGITAL BRANDS",
    subtitle: "Art-directed web identities & typography.",
    detail: "Establishing memorable digital personalities that communicate prestige through restraint and whitespace.",
  },
  {
    num: "04",
    title: "WEB EXPERIENCES",
    subtitle: "Next.js architectures & GSAP motion.",
    detail: "Engineering edge-cached, ultra-performant web applications with flawless 60fps animation pipelines.",
  },
];

export default function WhatIBuild() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-line",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".pillar-row",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pillars-list",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-52 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-16">
        02 / WHAT I BUILD
      </div>

      {/* Large Editorial Manifesto */}
      <div className="mb-24 md:mb-36">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-[-0.04em] leading-[0.95] text-[#111110]">
          <div className="overflow-hidden py-1">
            <span className="manifesto-line block">DIGITAL PRODUCTS</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="manifesto-line block font-serif italic font-normal text-[#2a2926]">
              that feel
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="manifesto-line block">AS GOOD</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="manifesto-line block text-[#585650]">
              AS THEY WORK.
            </span>
          </div>
        </h2>
      </div>

      {/* Interactive Typography Lines */}
      <div className="pillars-list grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 flex flex-col divide-y divide-[rgba(17,17,16,0.08)]">
          {PILLARS.map((pillar, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={pillar.num}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`pillar-row py-8 md:py-10 cursor-pointer transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-35 hover:opacity-75"
                }`}
                data-cursor-expand="true"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="text-xs font-mono text-[#88857d]">
                      {pillar.num}
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111110]">
                      {pillar.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#88857d]">
                    &rarr;
                  </span>
                </div>
                <p className="text-sm md:text-base font-serif italic text-[#585650] pl-8 md:pl-14">
                  {pillar.subtitle}
                </p>

                {/* Mobile Expansion */}
                {isActive && (
                  <div className="lg:hidden mt-4 pl-8 md:pl-14 pt-3 border-t border-[rgba(17,17,16,0.08)]">
                    <p className="text-sm text-[#111110] leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Detail Preview */}
        <div className="hidden lg:block lg:col-span-4 sticky top-36">
          <div className="p-8 rounded-3xl bg-[#f0eee6] border border-[rgba(17,17,16,0.08)]">
            <div className="flex items-center justify-between text-xs font-mono text-[#88857d] pb-4 border-b border-[rgba(17,17,16,0.08)] mb-6">
              <span>DISCIPLINE DETAIL</span>
              <span>{PILLARS[activeIndex].num} / 04</span>
            </div>
            <h4 className="text-xl font-medium text-[#111110] mb-3">
              {PILLARS[activeIndex].title}
            </h4>
            <p className="text-sm text-[#585650] leading-relaxed">
              {PILLARS[activeIndex].detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
