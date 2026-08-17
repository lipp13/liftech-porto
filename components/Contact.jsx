"use client";

import { useState, useEffect, useRef } from "react";
import { registerGSAP, gsap } from "@/lib/motion";

export default function Contact() {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full Website / E-Commerce",
    message: "",
  });

  const emailAddress = "liftech.studio@alifalfathar.dev";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        projectType: "Full Website / E-Commerce",
        message: "",
      });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-28 md:py-44 px-6 md:px-12 max-w-7xl mx-auto border-t border-[rgba(18,18,18,0.08)] overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#8c8982] mb-16">
        <div className="flex items-center gap-2">
          <span>04</span>
          <span>/</span>
          <span>GET IN TOUCH</span>
        </div>
        <div className="hidden sm:block">EST / WORLDWIDE AVAILABILITY</div>
      </div>

      {/* Grand Typographic Finale */}
      <div className="mb-16 md:mb-24">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium tracking-[-0.04em] leading-[0.9] text-[#121212]">
          <div className="overflow-hidden py-1">
            <span className="contact-line block">LET'S MAKE</span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-line block font-serif italic font-normal text-[#2a2926]">
              something
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span className="contact-line block text-[#121212]">GOOD.</span>
          </div>
        </h2>
      </div>

      {/* Interactive Communication Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-[rgba(18,18,18,0.08)] items-start">
        {/* Left Column: Direct Contact & Fast Copy */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-lg md:text-xl text-[#3a3935] leading-relaxed mb-8">
              Have a project, idea, or collaboration in mind? Let's discuss your timeline, scope, and technical vision.
            </p>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8c8982]">
                Direct Electronic Mail
              </span>
              <button
                onClick={handleCopyEmail}
                data-cursor-text="COPY"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#f2f0eb] border border-[rgba(18,18,18,0.08)] hover:border-[#121212] transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-sm md:text-base text-[#121212] font-medium">
                    {emailAddress}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#5e5c57] group-hover:text-[#121212] transition-colors">
                  {copied ? "COPIED ✓" : "CLICK TO COPY"}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[rgba(18,18,18,0.08)] flex flex-col gap-2 text-xs font-mono text-[#8c8982]">
            <div>TYPICAL RESPONSE TIME: WITHIN 24 HOURS</div>
            <div>CURRENT TIMEZONE: EASTERN STANDARD (UTC-5)</div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-[#f2f0eb]/70 p-8 md:p-10 rounded-3xl border border-[rgba(18,18,18,0.08)]">
          {formSubmitted ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-[#121212] text-[#f9f8f6] flex items-center justify-center text-xl mb-4">
                ✓
              </span>
              <h3 className="text-2xl font-medium text-[#121212] mb-2">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#5e5c57] max-w-sm">
                Thank you for reaching out. I will review your project requirements and respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5e5c57] mb-2">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#ffffff] border border-[rgba(18,18,18,0.1)] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5e5c57] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@studio.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#ffffff] border border-[rgba(18,18,18,0.1)] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5e5c57] mb-2">
                  Project Scope
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-[#ffffff] border border-[rgba(18,18,18,0.1)] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212] transition-colors"
                >
                  <option>Full Website / E-Commerce</option>
                  <option>Creative Motion / GSAP Development</option>
                  <option>Next.js Frontend Engineering</option>
                  <option>Design System & Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5e5c57] mb-2">
                  Project Overview & Goals
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell me about the goals, timeline, and technical expectations..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#ffffff] border border-[rgba(18,18,18,0.1)] rounded-xl px-4 py-3 text-sm text-[#121212] focus:outline-none focus:border-[#121212] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor-expand="true"
                className="group mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#121212] text-[#f9f8f6] px-8 py-4 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-[#2a2926] transition-all duration-300 active:scale-[0.99]"
              >
                <span>START A CONVERSATION</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
