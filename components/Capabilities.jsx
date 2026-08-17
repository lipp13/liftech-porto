"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

const CAPABILITIES = [
  {
    num: "01",
    name: "DESIGN",
    subtitle: "Interfaces, visual systems, digital direction.",
    details:
      "Crafting bespoke design languages from scratch. Focusing on editorial typography rhythms, asymmetric spatial grids, curated palettes, and interactive prototypes that establish distinct digital brand identities.",
    technologies: ["Design Systems", "Figma", "Art Direction", "Micro-Interactions", "Responsive Grids"],
    codeSnippet: `// 01. Design Token Architecture
export const EditorialSystem = {
  rhythm: "8pt fluid scale",
  type: "Grotesk Display / Editorial Serif",
  motionTokens: {
    duration: "1.2s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  }
};`,
  },
  {
    num: "02",
    name: "DEVELOPMENT",
    subtitle: "React, Next.js, modern frontend architecture.",
    details:
      "Building resilient web apps with Next.js App Router, SSR/SSG caching, type-safe API boundaries, WebGL/HTML5 Canvas shaders, and scalable modular component architectures.",
    technologies: ["Next.js 16", "React 19", "JavaScript (ESNext)", "Tailwind CSS", "REST & GraphQL"],
    codeSnippet: `// 02. High Performance Architecture
export default async function Page() {
  const dataset = await fetchArchive({ cache: "force-cache" });
  return <EditorialPipeline data={dataset} />;
}`,
  },
  {
    num: "03",
    name: "MOTION",
    subtitle: "GSAP, scroll experiences, interaction design.",
    details:
      "Engineering silky 60fps animations with GSAP, ScrollTrigger, and Lenis smooth scrolling. Bringing interfaces to life through choreographed entrance sequences, scroll-scrubbed narratives, and magnetic cursor feedback.",
    technologies: ["GSAP 3", "ScrollTrigger", "Lenis Smooth Scroll", "Canvas 2D", "Physics-based Easing"],
    codeSnippet: `// 03. ScrollTrigger Synchronization
gsap.timeline({
  scrollTrigger: {
    trigger: element,
    scrub: 0.8,
    start: "top 80%",
  }
}).from(targets, { yPercent: 100, opacity: 0 });`,
  },
  {
    num: "04",
    name: "EXPERIENCE",
    subtitle: "Responsive, accessible, performance-focused products.",
    details:
      "Delivering near-perfect Core Web Vitals (95+ Lighthouse), sub-second First Contentful Paint, WCAG accessibility standards, and responsive adaptability across all viewports from 320px mobile to 4K displays.",
    technologies: ["Core Web Vitals", "WCAG 2.1 AA", "SEO Optimization", "Dynamic OpenGraph", "Cross-Browser QA"],
    codeSnippet: `// 04. Vitals & Accessibility Standard
const vitalsMetrics = {
  FCP: "< 0.8s",
  LCP: "< 1.2s",
  CLS: "0.00",
  a11yScore: "100/100"
};`,
  },
];

export default function Capabilities() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-row",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
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
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(18,18,18,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-4">
            <span>02</span>
            <span>/</span>
            <span>EXPERTISE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] text-[#121212]">
            CAPABILITIES
          </h2>
        </div>
        <p className="text-sm font-mono text-[#5e5c57] max-w-xs">
          Rigorous engineering discipline combined with nuanced creative direction and motion craft.
        </p>
      </div>

      {/* Main Grid: Interactive Capability List + Live Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Big Typography List */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-[rgba(18,18,18,0.08)]">
          {CAPABILITIES.map((cap, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={cap.num}
                onClick={() => setActiveIndex(index)}
                className={`capability-row group cursor-pointer py-8 md:py-10 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                data-cursor-expand="true"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="text-xs font-mono text-[#8c8982]">
                      {cap.num}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#121212] group-hover:translate-x-2 transition-transform duration-300">
                      {cap.name}
                    </h3>
                  </div>
                  <span
                    className={`text-xl font-light transition-transform duration-300 ${
                      isActive ? "rotate-45 text-[#121212]" : "text-[#8c8982]"
                    }`}
                  >
                    +
                  </span>
                </div>

                <p className="text-sm md:text-base font-serif italic text-[#5e5c57] pl-8 md:pl-12">
                  {cap.subtitle}
                </p>

                {/* Mobile Expansion View */}
                {isActive && (
                  <div className="lg:hidden mt-6 pl-8 md:pl-12 pt-4 border-t border-[rgba(18,18,18,0.08)]">
                    <p className="text-sm text-[#3a3935] leading-relaxed mb-4">
                      {cap.details}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#121212] text-[#f9f8f6]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Desktop Interactive Engineering Inspector */}
        <div className="hidden lg:block lg:col-span-5 sticky top-32">
          <div className="rounded-2xl bg-[#f2f0eb] border border-[rgba(18,18,18,0.08)] p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(18,18,18,0.08)] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#121212]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#121212] font-semibold">
                  {CAPABILITIES[activeIndex].name} // SPECIFICATION
                </span>
              </div>
              <span className="text-xs font-mono text-[#8c8982]">
                {CAPABILITIES[activeIndex].num} OF 04
              </span>
            </div>

            <p className="text-sm text-[#3a3935] leading-relaxed mb-6 font-normal">
              {CAPABILITIES[activeIndex].details}
            </p>

            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c8982] block mb-3">
                Core Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {CAPABILITIES[activeIndex].technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-[#ffffff] border border-[rgba(18,18,18,0.08)] text-[#121212]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Snippet */}
            <div className="rounded-xl bg-[#121212] text-[#f9f8f6] p-4 text-xs font-mono overflow-x-auto">
              <div className="text-[#8c8982] text-[10px] pb-2 border-b border-[#333] mb-2 flex items-center justify-between">
                <span>inspector.config.js</span>
                <span>EXEC: OK</span>
              </div>
              <pre className="text-[#dcdad4] leading-relaxed">
                <code>{CAPABILITIES[activeIndex].codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
