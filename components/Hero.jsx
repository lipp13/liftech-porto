"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const headlineLine3Ref = useRef(null);
  const eyebrowRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const canvasRef = useRef(null);

  // Generative Interactive Visual Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) * window.devicePixelRatio;
      mouse.targetY = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Number of subtle harmonic wave ribbons
    const ribbonsCount = 7;

    const render = () => {
      time += 0.008;
      // Smooth lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.55;
      const centerY = height * 0.5;

      for (let i = 0; i < ribbonsCount; i++) {
        const offset = i * 0.35;
        const radius = Math.min(width, height) * (0.22 + i * 0.028);

        ctx.beginPath();
        const segments = 120;

        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 2;
          // Harmonic wave distortion
          const noise =
            Math.sin(angle * 3 + time + offset) * 18 +
            Math.cos(angle * 2 - time * 0.7) * 12 +
            Math.sin(angle * 5 + time * 1.2) * 6;

          // Subtle interaction with mouse
          const dx = centerX + Math.cos(angle) * (radius + noise) - mouse.x;
          const dy = centerY + Math.sin(angle) * (radius + noise) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseInfluence = Math.max(0, 1 - dist / (width * 0.45)) * 25;

          const r = radius + noise + Math.sin(time * 2 + angle * 4) * mouseInfluence;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        // Delicate monochrome stroke styling
        const alpha = 0.12 - i * 0.012;
        ctx.strokeStyle = `rgba(18, 18, 18, ${Math.max(0.02, alpha)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Subtle gradient wash on innermost loop
        if (i === 0) {
          ctx.fillStyle = "rgba(18, 18, 18, 0.015)";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GSAP Choreographed Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3 }
      )
        .fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.3,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.7"
        )
        .fromTo(
          subtextRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          canvasRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" },
          "-=1.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Interactive Kinetic Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-end">
        <canvas
          ref={canvasRef}
          className="w-full h-full md:w-[65%] md:h-[90%] opacity-0"
        />
      </div>

      {/* Top Eyebrow */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[rgba(18,18,18,0.08)] pb-6 mb-12 md:mb-16">
        <div ref={eyebrowRef} className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#5e5c57]">
          <span className="w-2 h-2 rounded-full bg-[#121212]" />
          <span>CREATIVE DEVELOPER / DIGITAL EXPERIENCES</span>
        </div>
        <div className="text-[11px] font-mono text-[#8c8982] uppercase tracking-wider hidden sm:block">
          ENGINEERING &bull; MOTION &bull; DIRECTION
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="relative z-10 my-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-medium tracking-[-0.04em] leading-[0.93] text-[#121212]">
          <div className="overflow-hidden py-1">
            <span ref={headlineLine1Ref} className="block">
              I BUILD DIGITAL
            </span>
          </div>
          <div className="overflow-hidden py-1 flex flex-wrap items-baseline gap-x-4">
            <span
              ref={headlineLine2Ref}
              className="block font-serif italic font-normal text-[#2a2926] tracking-[-0.02em]"
            >
              experiences
            </span>
            <span className="text-sm md:text-lg font-mono font-normal tracking-normal text-[#8c8982] border border-[rgba(18,18,18,0.12)] px-3 py-1 rounded-full align-middle hidden sm:inline-block">
              EST. 2026
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span ref={headlineLine3Ref} className="block text-[#121212]">
              THAT MOVE.
            </span>
          </div>
        </h1>
      </div>

      {/* Hero Bottom Narrative & CTAs */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-12 md:pt-16 border-t border-[rgba(18,18,18,0.08)]">
        <div className="md:col-span-6 lg:col-span-5">
          <p
            ref={subtextRef}
            className="text-base md:text-lg text-[#5e5c57] leading-relaxed font-normal"
          >
            Specialized in crafting tactile web architectures, fluid physics-based interactions, and editorial digital platforms where high-end design meets resilient engineering.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="md:col-span-6 lg:col-span-7 flex flex-wrap items-center md:justify-end gap-4"
        >
          <button
            onClick={scrollToWork}
            data-cursor-text="VIEW"
            className="group relative inline-flex items-center gap-3 bg-[#121212] text-[#f9f8f6] px-7 py-4 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:bg-[#2a2926] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>VIEW SELECTED WORK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f9f8f6] group-hover:scale-150 transition-transform duration-300" />
            <svg
              className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          <button
            onClick={scrollToContact}
            data-cursor-expand="true"
            className="group inline-flex items-center gap-2 border border-[rgba(18,18,18,0.18)] bg-transparent text-[#121212] px-6 py-4 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:border-[#121212] hover:bg-[#f2f0eb]"
          >
            <span>GET IN TOUCH</span>
            <svg
              className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
