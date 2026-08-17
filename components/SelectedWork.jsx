"use client";

import { useState } from "react";
import ProjectScene from "./ProjectScene";

const PROJECTS = [
  {
    id: "aura",
    num: "01",
    title: "AURA",
    subtitle: "Premium E-Commerce Experience",
    year: "2026",
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
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section
      id="work"
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

      {/* Project Scenes */}
      <div className="flex flex-col">
        {PROJECTS.map((project) => (
          <ProjectScene
            key={project.id}
            project={project}
            onOpenModal={setActiveModal}
          />
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
