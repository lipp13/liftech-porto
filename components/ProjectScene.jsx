"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

export default function ProjectScene({ project, onOpenModal }) {
  const containerRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const visual = visualRef.current;
      if (!visual) return;

      // Scroll-driven scale & clip-path expand
      gsap.fromTo(
        visual,
        {
          scale: 0.92,
          clipPath: "inset(5% 5% 5% 5% round 20px)",
        },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={containerRef}
      className="project-scene group relative flex flex-col mb-32 md:mb-48"
    >
      {/* Project Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[rgba(17,17,16,0.08)] mb-8">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="text-xs font-mono text-[#88857d]">
            {project.num}
          </span>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111110]">
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

      {/* Massive Visual Display Container (80-90vw) */}
      <div
        ref={visualRef}
        onClick={() => onOpenModal(project)}
        data-cursor-text="VIEW"
        className={`cursor-pointer relative w-full h-[440px] sm:h-[560px] md:h-[700px] rounded-3xl overflow-hidden ${project.theme.bg} shadow-2xl transition-transform duration-700 ease-out will-change-transform`}
      >
        <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
            <span>{project.title} &bull; STUDIO ARCHIVE</span>
            <span className="hidden sm:inline">PROD // DEPLOYED</span>
          </div>

          {/* Center Visual Art */}
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

      {/* Metadata & Synopsis */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 items-start">
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
  );
}
