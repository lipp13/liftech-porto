"use client";

import ProjectScene from "./ProjectScene";

const PROJECTS = [
  {
    id: "aura",
    num: "01",
    title: "AURA",
    subtitle: "Avant-Garde Horology & Concept Store",
    category: "PREMIUM DIGITAL COMMERCE",
    year: "2026",
    description:
      "A bespoke digital flagship engineered with fluid web transitions, custom micro-interactions, and an editorial product catalog.",
    deliverables: ["Creative Direction", "Next.js 16", "GSAP Motion", "Tailwind CSS"],
    theme: {
      bg: "bg-[#161614]",
    },
  },
  {
    id: "echotic",
    num: "02",
    title: "ECHOTIC",
    subtitle: "Immersive Concert & Live Stage Platform",
    category: "SPATIAL AUDIO & TICKETING",
    year: "2025",
    description:
      "Spatial ticketing platform integrating real-time 3D acoustic stage previews, dynamic frequency visualizers, and instant checkout flows.",
    deliverables: ["Web Audio API", "Next.js", "Custom Canvas Shaders", "Lenis"],
    theme: {
      bg: "bg-[#1c1e22]",
    },
  },
  {
    id: "optik-ezia",
    num: "03",
    title: "OPTIK EZIA",
    subtitle: "Tokyo Atelier & Artisanal Eyewear",
    category: "BRAND EXPERIENCE & COMMERCE",
    year: "2025",
    description:
      "An editorial digital flagship for an artisanal eyewear maison in Tokyo. Features virtual frame try-on previews and bespoke typographic layout.",
    deliverables: ["Brand Identity", "Next.js", "Algolia Search", "GSAP ScrollTrigger"],
    theme: {
      bg: "bg-[#23211f]",
    },
  },
];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="relative py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 md:mb-36">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-4">
            03 / SELECTED WORK
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-[-0.04em] text-[#111110]">
            EDITORIAL STORIES
          </h2>
        </div>
        <p className="text-xs font-mono text-[#585650] max-w-xs uppercase tracking-wider">
          Commercial commissions & digital architectures &bull; 2025 — 2026
        </p>
      </div>

      <div className="flex flex-col">
        {PROJECTS.map((project) => (
          <ProjectScene key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
