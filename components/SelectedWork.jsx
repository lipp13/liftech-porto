"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

const PROJECTS = [
  {
    id: "aura",
    num: "01",
    title: "AURA",
    subtitle: "Premium E-Commerce Experience",
    year: "2026",
    layout: "centered",
    description:
      "A bespoke digital flagship for an avant-garde luxury horology maison. Engineered with fluid web transitions, custom micro-interactions, and an editorial product catalog.",
    deliverables: ["Creative Direction", "Next.js 16", "GSAP Motion", "Tailwind CSS"],
    metrics: "+42% Avg. Session Time • 98/100 Lighthouse Performance",
    theme: {
      bg: "bg-[#161614]",
      accent: "#ffffff",
    },
  },
  {
    id: "echotic",
    num: "02",
    title: "ECHOTIC",
    subtitle: "Immersive Concert & Live Stage Platform",
    year: "2025",
    layout: "asymmetric",
    description:
      "Spatial ticketing platform integrating real-time 3D acoustic stage previews, dynamic acoustic frequency visualizers, and instant zero-latency checkout flows.",
    deliverables: ["Web Audio API", "Next.js", "Custom Canvas Shaders", "Lenis"],
    metrics: "120k Concurrent Handled • <35ms Interaction Latency",
    theme: {
      bg: "bg-[#1c1e22]",
      accent: "#96a0b5",
    },
  },
  {
    id: "optik-ezia",
    num: "03",
    title: "OPTIK EZIA",
    subtitle: "Modern Optical Company & Atelier",
    year: "2025",
    layout: "fullwidth",
    description:
      "An editorial digital flagship for an artisanal eyewear maison in Tokyo. Features virtual frame try-on previews, refractive lens simulations, and bespoke typographic layout.",
    deliverables: ["Brand Identity", "Next.js", "Algolia Search", "GSAP ScrollTrigger"],
    metrics: "Site of the Day Winner • 3.2x Mobile Conversion Rate",
    theme: {
      bg: "bg-[#23211f]",
      accent: "#d4a373",
    },
  },
];

export default function SelectedWork() {
  const containerRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const storyElements = document.querySelectorAll(".project-story");

      storyElements.forEach((story) => {
        const visual = story.querySelector(".project-story-visual");
        const title = story.querySelector(".project-story-title");
        const meta = story.querySelector(".project-story-meta");

        if (visual) {
          gsap.fromTo(
            visual,
            { scale: 0.93, clipPath: "inset(4% 4% 4% 4% round 16px)" },
            {
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              ease: "none",
              scrollTrigger: {
                trigger: story,
                start: "top 80%",
                end: "top 25%",
                scrub: 0.7,
              },
            }
          );
        }

        if (title) {
          gsap.fromTo(
            title,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: story,
                start: "top 70%",
              },
            }
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: story,
                start: "top 65%",
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
      className="relative py-28 md:py-44 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 md:mb-36">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-4">
            02 / SELECTED WORK
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-[-0.04em] text-[#111110]">
            EDITORIAL STORIES
          </h2>
        </div>
        <p className="text-xs font-mono text-[#585650] max-w-xs uppercase tracking-wider">
          Commercial commissions & digital architectures &bull; 2025 — 2026
        </p>
      </div>

      {/* Full-Width Project Stories */}
      <div className="flex flex-col gap-36 md:gap-52">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="project-story group relative flex flex-col"
          >
            {/* Story Header */}
            <div className="project-story-title flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[rgba(17,17,16,0.08)] mb-8">
              <div className="flex items-baseline gap-4 md:gap-6">
                <span className="text-xs font-mono text-[#88857d]">
                  {project.num}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111110]">
                  {project.title}
                </h3>
                <span className="text-sm font-serif italic text-[#585650] hidden sm:inline">
                  {project.subtitle}
                </span>
              </div>
              <span className="text-xs font-mono text-[#88857d] uppercase tracking-widest">
                {project.year}
              </span>
            </div>

            {/* Massive Editorial Project Visual (80–90% Viewport Space) */}
            <div
              onClick={() => setActiveModal(project)}
              data-cursor-text="VIEW"
              className={`project-story-visual cursor-pointer relative w-full h-[420px] sm:h-[540px] md:h-[680px] rounded-3xl overflow-hidden ${project.theme.bg} shadow-2xl transition-transform duration-700 ease-out`}
            >
              {/* Internal Bespoke Artwork Composition */}
              <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between select-none">
                <div className="flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
                  <span>{project.title} &bull; STUDIO ARCHIVE</span>
                  <span className="hidden sm:inline">PROD // DEPLOYED</span>
                </div>

                {/* Center Visual Persona */}
                <div className="my-auto text-center relative flex flex-col items-center justify-center">
                  {project.id === "aura" && (
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono tracking-[0.35em] text-white/40 mb-3 uppercase">
                        Haute Horlogerie Maison
                      </span>
                      <h4 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        AURA
                      </h4>
                      <div className="mt-4 flex items-center gap-4 text-xs font-mono text-white/60">
                        <span>44MM CHRONOGRAPH</span>
                        <span>&bull;</span>
                        <span>TITANIUM CERAMIC</span>
                      </div>
                    </div>
                  )}

                  {project.id === "echotic" && (
                    <div className="flex flex-col items-center">
                      <div className="flex gap-1.5 items-end h-14 mb-4">
                        {[35, 60, 90, 45, 100, 55, 80, 95, 40, 70, 85].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-1.5 bg-white/40 rounded-full group-hover:bg-white/80 transition-colors"
                          />
                        ))}
                      </div>
                      <h4 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        ECHOTIC
                      </h4>
                      <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 mt-3 uppercase">
                        Spatial Acoustics & Live Concerts
                      </span>
                    </div>
                  )}

                  {project.id === "optik-ezia" && (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-9 border border-white/40 rounded-full mb-4 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border border-white/50" />
                      </div>
                      <h4 className="text-6xl sm:text-8xl md:text-9xl font-light tracking-[-0.05em] text-white group-hover:scale-105 transition-transform duration-700">
                        OPTIK EZIA
                      </h4>
                      <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 mt-3 uppercase">
                        Tokyo Atelier &bull; Precision Frames
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-4 border-t border-white/10">
                  <span>{project.metrics}</span>
                  <span className="inline-flex items-center gap-2 text-white group-hover:translate-x-1 transition-transform">
                    EXPLORE CASE STUDY &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Metadata & Editorial Synopsis */}
            <div className="project-story-meta grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 items-start">
              <div className="md:col-span-8">
                <p className="text-base text-[#585650] leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-2 md:justify-end">
                {project.deliverables.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono text-[#585650] border border-[rgba(17,17,16,0.12)] px-2.5 py-1 rounded-md bg-[#f0eee6]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#f8f6f0] rounded-3xl p-8 md:p-12 shadow-2xl border border-[rgba(17,17,16,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-6 border-b border-[rgba(17,17,16,0.08)]">
              <div>
                <span className="text-[11px] font-mono text-[#88857d] uppercase tracking-widest block mb-1">
                  PROJECT {activeModal.num} &bull; {activeModal.year}
                </span>
                <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#111110]">
                  {activeModal.title}
                </h3>
                <p className="text-sm font-serif italic text-[#585650] mt-0.5">
                  {activeModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-2xl text-[#111110] hover:opacity-60 transition-opacity p-2"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="py-8 flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#88857d] mb-2">
                  OVERVIEW
                </h4>
                <p className="text-base text-[#111110] leading-relaxed">
                  {activeModal.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0eee6]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#111110] font-semibold block mb-1">
                  IMPACT & METRICS
                </span>
                <span className="text-sm font-mono text-[#585650]">
                  {activeModal.metrics}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#88857d] mb-2">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModal.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#111110] text-[#f8f6f0]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(17,17,16,0.08)] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#111110] text-[#f8f6f0] text-xs font-mono tracking-wider uppercase"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
