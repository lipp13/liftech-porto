"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";

export default function VisualManifesto() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll(".manifesto-word");

      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            scale: 0.9,
            opacity: 0.2,
            letterSpacing: "-0.06em",
          },
          {
            scale: 1,
            opacity: 1,
            letterSpacing: "-0.04em",
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.8,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-36 md:py-60 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)] flex flex-col justify-center select-none"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-16">
        02 / VISUAL MANIFESTO
      </div>

      <div ref={textRef} className="max-w-5xl">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium tracking-[-0.045em] leading-[0.92] text-[#111110]">
          <div className="overflow-hidden py-1">
            <span className="manifesto-word block">DIGITAL EXPERIENCES</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="manifesto-word block font-serif italic font-normal text-[#2a2926] tracking-[-0.025em]">
              should feel
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="manifesto-word block text-[#111110]">ALIVE.</span>
          </div>
        </h2>
      </div>

      <div className="mt-16 pt-8 border-t border-[rgba(17,17,16,0.08)] flex flex-col sm:flex-row items-baseline justify-between text-xs font-mono text-[#585650] gap-4">
        <div>RESTRAINED AESTHETICS &bull; INTENTIONAL MOTION</div>
        <div className="text-[11px] text-[#88857d]">PACED FOR COGNITIVE CLARITY</div>
      </div>
    </section>
  );
}
