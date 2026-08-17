"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

const PROJECTS = [
  {
    id: "aura",
    num: "01",
    title: "AURA",
    subtitle: "Premium E-Commerce & Concept Store",
    category: "E-Commerce / Experience",
    year: "2026",
    deliverables: ["Creative Direction", "Next.js 16", "Tailwind CSS", "GSAP Motion"],
    description:
      "A bespoke digital flagship for a luxury horology and avant-garde concept brand. Engineered with fluid web transitions, custom audio cues, and an editorial product catalog.",
    metrics: "+42% Avg. Session Time • 98/100 Lighthouse Performance",
    previewType: "aura",
    colorScheme: {
      bg: "bg-[#161614]",
      text: "text-[#f5f4ef]",
      badge: "border-[#ffffff]/20 text-[#ffffff]/80",
    },
  },
  {
    id: "echotic",
    num: "02",
    title: "ECHOTIC",
    subtitle: "Immersive Concert & Live Stage Platform",
    category: "Web Application / Audio-Visual",
    year: "2025",
    deliverables: ["Interactive Engineering", "Web Audio API", "Lenis", "Custom Shaders"],
    description:
      "Spatial ticketing platform integrating real-time 3D seat previews, dynamic acoustic frequency visualizers, and instant zero-latency checkout flows.",
    metrics: "120k Concurrent Users Handled • <35ms Interaction Latency",
    previewType: "echotic",
    colorScheme: {
      bg: "bg-[#1e2022]",
      text: "text-[#eef1f5]",
      badge: "border-[#96a0b5]/30 text-[#96a0b5]",
    },
  },
  {
    id: "optik-ezia",
    num: "03",
    title: "OPTIK EZIA",
    subtitle: "Modern Optical Company & Atelier",
    category: "Brand Experience / Commerce",
    year: "2025",
    deliverables: ["Design System", "Next.js", "Algolia Search", "Framer Motion / GSAP"],
    description:
      "An editorial digital flagship for an artisanal eyewear maison in Tokyo. Features virtual frame try-on previews, refractive lens simulations, and bespoke typographic layout.",
    metrics: "Featured on SiteInspire • 3.2x Mobile Conversion Rate",
    previewType: "optik",
    colorScheme: {
      bg: "bg-[#252422]",
      text: "text-[#f7f5f0]",
      badge: "border-[#d4a373]/30 text-[#d4a373]",
    },
  },
  {
    id: "liftech",
    num: "04",
    title: "LIFTECH",
    subtitle: "Personal Digital Experience & Motion Engine",
    category: "Creative Dev / Motion Design",
    year: "2026",
    deliverables: ["Full Architecture", "GSAP ScrollTrigger", "Lenis Smooth Scroll", "Tailwind 4"],
    description:
      "A high-calibre creative portfolio engineered with strict editorial design principles, smooth scroll harmonization, generative canvas ribbons, and tactile micro-interactions.",
    metrics: "Sub-100ms Page Load • 100/100 Core Web Vitals",
    previewType: "liftech",
    colorScheme: {
      bg: "bg-[#18191a]",
      text: "text-[#f9f8f6]",
      badge: "border-[#e5e5e5]/20 text-[#e5e5e5]/80",
    },
  },
];

export default function SelectedWork() {
  const containerRef = useRef(null);
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Animate project compositions on scroll
      const projectItems = document.querySelectorAll(".project-composition");

      projectItems.forEach((item) => {
        const imageWrapper = item.querySelector(".project-visual-wrapper");
        const meta = item.querySelector(".project-meta");

        if (imageWrapper) {
          gsap.fromTo(
            imageWrapper,
            { scale: 0.94, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.6,
              },
            }
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(18,18,18,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-4">
            <span>01</span>
            <span>/</span>
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] text-[#121212]">
            SELECTED WORK
          </h2>
        </div>
        <p className="text-sm font-mono text-[#5e5c57] max-w-xs">
          Carefully selected commissions, editorial experiments, and high-performance digital platforms.
        </p>
      </div>

      {/* Projects Editorial Compositions */}
      <div className="flex flex-col gap-28 md:gap-40">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="project-composition group relative"
          >
            {/* Top Meta Line */}
            <div className="flex items-center justify-between pb-5 border-b border-[rgba(18,18,18,0.08)] text-xs font-mono text-[#8c8982] uppercase tracking-wider mb-8">
              <div className="flex items-center gap-3">
                <span className="text-[#121212] font-semibold">{project.num}</span>
                <span>—</span>
                <span>{project.category}</span>
              </div>
              <div>{project.year}</div>
            </div>

            {/* Large Visual Display Composition */}
            <div
              onClick={() => setActiveProjectModal(project)}
              data-cursor-text="EXPLORE"
              className={`project-visual-wrapper cursor-pointer relative w-full h-[400px] sm:h-[500px] md:h-[620px] rounded-2xl md:rounded-3xl overflow-hidden ${project.colorScheme.bg} shadow-2xl transition-transform duration-700 ease-out group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]`}
            >
              {/* Internal Bespoke Editorial UI Mockup / Generative Graphic */}
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between select-none">
                {/* Visual Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-white/20" />
                    <span className="text-xs font-mono tracking-widest text-white/60 uppercase">
                      {project.title} &bull; STUDIO ARCHIVE
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    {project.deliverables.slice(0, 2).map((item, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${project.colorScheme.badge}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Center Generative & Typographic Art Representation */}
                <div className="my-auto text-center relative flex flex-col items-center justify-center">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <div className="w-72 h-72 rounded-full border border-white/40 animate-spin [animation-duration:30s]" />
                    <div className="absolute w-96 h-96 rounded-full border border-dashed border-white/20" />
                  </div>

                  {project.previewType === "aura" && (
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-mono tracking-[0.3em] text-white/50 mb-3">
                        HOROLOGY & LUXURY CONCEPT
                      </span>
                      <h3 className="text-5xl sm:text-7xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        AURA
                      </h3>
                      <div className="mt-4 flex items-center gap-4 text-xs font-mono text-white/60">
                        <span>44.0 MM</span>
                        <span>&bull;</span>
                        <span>TITANIUM CASE</span>
                        <span>&bull;</span>
                        <span>LIMITED EDITION</span>
                      </div>
                    </div>
                  )}

                  {project.previewType === "echotic" && (
                    <div className="flex flex-col items-center">
                      <div className="flex gap-1 items-end h-16 mb-4">
                        {[40, 65, 85, 30, 95, 50, 75, 90, 60, 45, 80, 55, 35].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-1.5 bg-white/40 rounded-full group-hover:bg-white/80 transition-colors"
                          />
                        ))}
                      </div>
                      <h3 className="text-5xl sm:text-7xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        ECHOTIC
                      </h3>
                      <span className="text-[11px] font-mono tracking-[0.25em] text-white/50 mt-3">
                        SPATIAL ACOUSTICS & TICKETING
                      </span>
                    </div>
                  )}

                  {project.previewType === "optik" && (
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-10 border-2 border-white/30 rounded-full mb-4 flex items-center justify-center group-hover:border-white/70 transition-colors">
                        <div className="w-6 h-6 rounded-full border border-white/40" />
                      </div>
                      <h3 className="text-5xl sm:text-7xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        OPTIK EZIA
                      </h3>
                      <span className="text-[11px] font-mono tracking-[0.25em] text-white/50 mt-3">
                        TOKYO ATELIER &bull; PRECISION EYEWEAR
                      </span>
                    </div>
                  )}

                  {project.previewType === "liftech" && (
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-mono text-emerald-400 tracking-widest mb-3">
                        SYS: 60FPS SYNCHRONIZED
                      </span>
                      <h3 className="text-5xl sm:text-7xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        LIFTECH
                      </h3>
                      <span className="text-[11px] font-mono tracking-[0.25em] text-white/50 mt-3">
                        ENGINEERING &bull; MOTION ARCHITECTURE
                      </span>
                    </div>
                  )}
                </div>

                {/* Visual Footer Inside Card */}
                <div className="flex items-center justify-between z-10 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span>{project.metrics}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-white group-hover:translate-x-1 transition-transform">
                    <span>VIEW CASE STUDY</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metadata & Editorial Description */}
            <div className="project-meta grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 items-start">
              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[#121212]">
                  {project.title}
                </h3>
                <p className="text-sm font-serif italic text-[#5e5c57] mt-1">
                  {project.subtitle}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-sm md:text-base text-[#5e5c57] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                {project.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono text-[#5e5c57] border border-[rgba(18,18,18,0.12)] px-2.5 py-1 rounded-md bg-[#f2f0eb]/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Case Study Deep-Dive Modal */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
          onClick={() => setActiveProjectModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f9f8f6] rounded-3xl p-8 md:p-12 shadow-2xl border border-[rgba(18,18,18,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-6 border-b border-[rgba(18,18,18,0.08)]">
              <div>
                <div className="text-xs font-mono text-[#8c8982] uppercase tracking-widest mb-1">
                  Case Study — {activeProjectModal.num}
                </div>
                <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#121212]">
                  {activeProjectModal.title}
                </h3>
                <p className="text-sm font-serif italic text-[#5e5c57] mt-0.5">
                  {activeProjectModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="w-10 h-10 rounded-full border border-[rgba(18,18,18,0.15)] flex items-center justify-center text-[#121212] hover:bg-[#121212] hover:text-[#f9f8f6] transition-colors"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7 flex flex-col gap-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-2">
                    Executive Summary
                  </h4>
                  <p className="text-base text-[#3a3935] leading-relaxed">
                    {activeProjectModal.description}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#f2f0eb] border border-[rgba(18,18,18,0.06)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#121212] font-semibold block mb-1">
                    Key Performance Impact
                  </span>
                  <span className="text-sm font-mono text-[#5e5c57]">
                    {activeProjectModal.metrics}
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-[rgba(18,18,18,0.08)] md:pl-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-3">
                    Tech Stack & Scope
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#121212] text-[#f9f8f6]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-1">
                    Timeline & Completion
                  </h4>
                  <p className="text-sm font-mono text-[#5e5c57]">
                    Completed in {activeProjectModal.year} &bull; Production Release
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-[rgba(18,18,18,0.08)] flex justify-between items-center">
              <span className="text-xs font-mono text-[#8c8982]">
                LifTech Engineering Archives
              </span>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#121212] text-[#f9f8f6] text-xs font-mono tracking-wider uppercase hover:bg-[#333] transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
