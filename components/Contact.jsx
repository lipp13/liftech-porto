"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

export default function Contact() {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const email = "liftech.studio@alifalfathar.dev";

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-headline-line",
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
        ".contact-cta-block",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      {/* Category Marker */}
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-16">
        06 / INITIATE
      </div>

      {/* Cinematic Conclusion Headline */}
      <div className="mb-20 md:mb-32">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.8rem] font-medium tracking-[-0.045em] leading-[0.92] text-[#111110]">
          <div className="overflow-hidden py-1">
            <span className="contact-headline-line block">LET'S MAKE</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-headline-line block font-serif italic font-normal text-[#2a2926]">
              something
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-headline-line block text-[#111110]">GOOD.</span>
          </div>
        </h2>
      </div>

      {/* Direct Contact CTA & Quick Actions */}
      <div className="contact-cta-block grid grid-cols-1 md:grid-cols-12 gap-8 pt-12 border-t border-[rgba(17,17,16,0.08)] items-end">
        <div className="md:col-span-7">
          <p className="text-base md:text-lg text-[#585650] leading-relaxed max-w-lg mb-6">
            Have a project, idea, or collaboration in mind? I am currently accepting select creative development and frontend engineering commissions.
          </p>

          <button
            onClick={handleCopy}
            data-cursor-text="COPY"
            className="group flex items-center gap-3 text-sm font-mono text-[#111110] hover:opacity-75 transition-opacity"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="border-b border-[#111110] pb-0.5">{email}</span>
            <span className="text-xs text-[#88857d]">
              {copied ? "[COPIED ✓]" : "[CLICK TO COPY]"}
            </span>
          </button>
        </div>

        <div className="md:col-span-5 flex md:justify-end">
          <a
            href={`mailto:${email}?subject=Project%20Inquiry%20%E2%80%94%20LifTech`}
            data-cursor-expand="true"
            className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#111110] hover:opacity-70 transition-opacity"
          >
            <span>START A CONVERSATION</span>
            <span className="text-base group-hover:translate-x-1.5 transition-transform duration-300">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
