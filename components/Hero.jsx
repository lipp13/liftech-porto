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

  // Signature Art-Directed Kinetic Visual: DESIGN × CODE × MOTION
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

    // Harmonic multi-strand orbit composition
    const strandCount = 6;

    const render = () => {
      time += 0.007;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.52;
      const centerY = height * 0.48;

      for (let s = 0; s < strandCount; s++) {
        const offset = s * 0.42;
        const baseRadius = Math.min(width, height) * (0.2 + s * 0.032);

        ctx.beginPath();
        const steps = 140;

        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;

          // Mathematical waveform modulation
          const wave1 = Math.sin(angle * 3 + time + offset) * 16;
          const wave2 = Math.cos(angle * 2 - time * 0.8) * 10;
          const wave3 = Math.sin(angle * 6 + time * 1.5) * 5;

          const px = centerX + Math.cos(angle) * (baseRadius + wave1 + wave2);
          const py = centerY + Math.sin(angle) * (baseRadius + wave1 + wave2);

          // Subtle cursor magnetic dispersion
          const dist = Math.hypot(px - mouse.x, py - mouse.y);
          const magnetic = Math.max(0, 1 - dist / (width * 0.4)) * 22;

          const radius = baseRadius + wave1 + wave2 + wave3 + Math.sin(time * 2 + angle * 3) * magnetic;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        const strokeAlpha = Math.max(0.03, 0.14 - s * 0.018);
        ctx.strokeStyle = `rgba(17, 17, 16, ${strokeAlpha})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        if (s === 0) {
          ctx.fillStyle = "rgba(17, 17, 16, 0.012)";
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

  // Exact GSAP Choreographed Timing
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 0.4s Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4 }
      )
        // 0.6s Headline lines reveal upward
        .fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current, headlineLine3Ref.current],
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.6
        )
        // 0.9s Supporting text
        .fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.9
        )
        // 1.1s CTA
        .fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          1.1
        )
        // 1.3s Hero visual subtle entrance
        .fromTo(
          canvasRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
          1.3
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Signature Background Canvas Visual */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-end">
        <canvas
          ref={canvasRef}
          className="w-full h-full md:w-[60%] md:h-[88%] opacity-0"
        />
      </div>

      {/* Eyebrow */}
      <div className="relative z-10">
        <div
          ref={eyebrowRef}
          className="opacity-0 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#585650]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#111110]" />
          <span>CREATIVE DEVELOPER / DIGITAL EXPERIENCES</span>
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="relative z-10 my-auto py-8">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-medium tracking-[-0.045em] leading-[0.92] text-[#111110]">
          <div className="overflow-hidden py-1">
            <span ref={headlineLine1Ref} className="block">
              I BUILD
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span
              ref={headlineLine2Ref}
              className="block font-serif italic font-normal text-[#2a2926] tracking-[-0.025em]"
            >
              digital
            </span>
          </div>
          <div className="overflow-hidden py-1">
            <span ref={headlineLine3Ref} className="block text-[#111110]">
              EXPERIENCES.
            </span>
          </div>
        </h1>
      </div>

      {/* Bottom Editorial Composition: Max 2 Lines Text + Refined CTA */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-10 border-t border-[rgba(17,17,16,0.08)]">
        <div className="md:col-span-6 lg:col-span-7">
          <p
            ref={subtextRef}
            className="opacity-0 text-base md:text-lg text-[#585650] leading-relaxed max-w-xl font-normal"
          >
            Crafting thoughtful digital products where editorial design, fluid motion, and frontend engineering meet.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="opacity-0 md:col-span-6 lg:col-span-5 flex md:justify-end"
        >
          <button
            onClick={scrollToWork}
            data-cursor-text="VIEW"
            className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.2em] uppercase text-[#111110] hover:opacity-70 transition-opacity"
          >
            <span>VIEW SELECTED WORK</span>
            <span className="text-base group-hover:translate-x-1.5 transition-transform duration-300">
              &rarr;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
