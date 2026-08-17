"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

const MILESTONES = [
  {
    period: "2024 — PRESENT",
    role: "Lead Creative Developer & Consultant",
    entity: "LifTech Studio",
    location: "Global / Remote",
    focus: "Architecting bespoke digital flagships, motion design systems, and headless Next.js platforms for global clients.",
  },
  {
    period: "2022 — 2024",
    role: "Senior Interaction Engineer",
    entity: "Avant Interactive Labs",
    location: "New York / Hybrid",
    focus: "Built WebGL-driven brand experiences, GSAP animation pipelines, and high-conversion e-commerce systems.",
  },
  {
    period: "2020 — 2022",
    role: "Frontend Engineer",
    entity: "Kinetic Digital Group",
    location: "San Francisco",
    focus: "Engineered scalable component design systems, accessibility compliance, and performance optimization.",
  },
];

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
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
      id="about"
      ref={containerRef}
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(18,18,18,0.08)]"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-16">
        <div className="flex items-center gap-2">
          <span>03</span>
          <span>/</span>
          <span>BACKGROUND</span>
        </div>
        <div className="hidden sm:block">IDENTITY & CRAFT</div>
      </div>

      {/* Main Narrative & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        <div className="lg:col-span-6 about-reveal">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#121212] leading-[1.1] mb-6">
            Bridging the gap between ambitious visual design and rigorous software engineering.
          </h2>
          <p className="text-base font-serif italic text-[#5e5c57] leading-relaxed">
            "A website should not merely load fast; it should evoke a tactile, emotional resonance with every scroll, click, and transition."
          </p>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6 text-sm md:text-base text-[#3a3935] leading-relaxed about-reveal">
          <p>
            I am a senior creative developer and interaction engineer with over 6 years of experience building editorial web applications, interactive design systems, and digital product experiences.
          </p>
          <p>
            My work is grounded in minimalism, typographic hierarchy, and carefully choreographed motion. By integrating performant modern frameworks like Next.js with GSAP and custom canvas shaders, I create interfaces that feel natural, calm, and unmistakably premium.
          </p>
          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-[#5e5c57]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>TIMEZONE: UTC-5 / EST</span>
            </div>
            <div>STATUS: TAKING SELECT COMMISSIONS</div>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="pt-12 border-t border-[rgba(18,18,18,0.08)]">
        <div className="flex items-center justify-between mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8c8982]">
            Selected Experience & Track Record
          </span>
          <span className="text-xs font-mono text-[#8c8982]">2020 — 2026</span>
        </div>

        <div className="flex flex-col divide-y divide-[rgba(18,18,18,0.08)]">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="about-reveal py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-[#f2f0eb]/40 transition-colors px-2 md:px-4 rounded-xl"
            >
              <div className="md:col-span-3 text-xs font-mono text-[#8c8982]">
                {item.period}
              </div>
              <div className="md:col-span-4">
                <h4 className="text-lg font-medium text-[#121212] group-hover:text-black">
                  {item.role}
                </h4>
                <p className="text-xs font-mono text-[#5e5c57] mt-0.5">
                  {item.entity} &bull; {item.location}
                </p>
              </div>
              <div className="md:col-span-5 text-sm text-[#5e5c57] leading-relaxed">
                {item.focus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
