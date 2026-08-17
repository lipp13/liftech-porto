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
        ".contact-line",
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
      className="relative py-36 md:py-56 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(17,17,16,0.08)]"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-20">
        07 / INITIATE
      </div>

      <div className="mb-24 md:mb-36">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium tracking-[-0.045em] leading-[0.92] text-[#111110]">
          <div className="overflow-hidden py-1">
            <span className="contact-line block">LET'S</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-line block">MAKE</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-line block font-serif italic font-normal text-[#2a2926]">
              something
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-line block text-[#111110]">GOOD.</span>
          </div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12 border-t border-[rgba(17,17,16,0.08)] items-end">
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
