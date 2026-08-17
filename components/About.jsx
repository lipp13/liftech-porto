"use client";

import { useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

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
            start: "top 70%",
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
      className="relative py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-16">
        06 / ABOUT
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 about-reveal">
          <span className="text-xs font-mono text-[#88857d] uppercase tracking-widest block mb-2">
            CREATIVE DEVELOPER
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111110] leading-none mb-6">
            ALIF ALFATHAR
          </h2>
          <p className="text-sm font-mono text-[#585650] uppercase tracking-wider">
            INDONESIA &bull; WORKING GLOBALLY
          </p>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6 text-lg sm:text-xl text-[#33322d] leading-relaxed about-reveal font-normal">
          <p>
            Creative developer from Indonesia. I build digital experiences combining frontend engineering, visual design, and motion.
          </p>
          <p className="text-base text-[#585650]">
            Focusing on clean component architectures with Next.js, fluid physics with GSAP and Lenis, and generous whitespace that lets typography and products speak clearly.
          </p>

          <div className="pt-6 border-t border-[rgba(17,17,16,0.08)] flex flex-wrap items-center gap-8 text-xs font-mono text-[#585650]">
            <div>TIMEZONE: UTC+7 (WIB)</div>
            <div>STATUS: OPEN FOR SELECT COMMISSIONS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
