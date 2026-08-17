"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import DepthScene from "./DepthScene";

export default function PortraitExperience() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const bgGlowRef = useRef(null);
  const foregroundTextRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Desktop subtle 2.5D Mouse Parallax (3-8px displacement)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 16;
      targetY = (e.clientY / innerHeight - 0.5) * 16;
    };

    const updateLerp = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (imageWrapperRef.current) {
        // Portrait moves minimally (3-5px)
        imageWrapperRef.current.style.transform = `translate3d(${currentX * 0.3}px, ${currentY * 0.3}px, 0) scale(1.02)`;
      }

      if (bgGlowRef.current) {
        // Background moves inversely
        bgGlowRef.current.style.transform = `translate3d(${-currentX * 0.5}px, ${-currentY * 0.5}px, 0)`;
      }

      if (foregroundTextRef.current) {
        // Foreground typography moves slightly stronger (6-8px)
        foregroundTextRef.current.style.transform = `translate3d(${currentX * 0.6}px, ${currentY * 0.6}px, 0)`;
      }

      rafId = requestAnimationFrame(updateLerp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP Scroll Choreography: Masked reveal, scale 0.92 -> 1, pin and depth movement
  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      // Mask opening & scale expansion
      tl.fromTo(
        cardRef.current,
        {
          scale: 0.91,
          clipPath: "inset(8% 8% 8% 8% round 24px)",
          opacity: 0.7,
        },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          opacity: 1,
          ease: "none",
        }
      );

      // Surrounding typography fade-in
      gsap.fromTo(
        ".portrait-meta-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-screen py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center items-center overflow-hidden"
    >
      {/* 3D Architectural Geometric Environment */}
      <DepthScene />

      {/* Surrounding Ambient Section Eyebrow */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-[#88857d] mb-12">
        <div className="portrait-meta-item">03 / SIGNATURE PORTRAIT</div>
        <div className="portrait-meta-item hidden sm:block">
          2.5D SPATIAL PERSPECTIVE
        </div>
      </div>

      {/* Center 2.5D Portrait Art Object */}
      <div
        ref={cardRef}
        data-cursor-text="EXPLORE"
        className="relative z-10 w-full max-w-lg md:max-w-2xl aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#161614] shadow-2xl border border-[rgba(17,17,16,0.12)] select-none"
      >
        {/* Layer 0: Background Lighting Gradient */}
        <div
          ref={bgGlowRef}
          className="absolute inset-0 bg-radial from-[#383733]/40 via-transparent to-[#111110]/90 pointer-events-none transition-transform duration-300"
        />

        {/* Layer 1: Authentic High-Res Portrait */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-300"
        >
          <Image
            src="/alif.jpg"
            alt="Alif Alfathar — Creative Developer"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 680px"
            className="object-cover object-center grayscale-[20%] contrast-[1.08] brightness-[0.95] hover:grayscale-0 transition-all duration-700"
          />
          {/* Subtle natural vignette and film grain tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-[#111110]/30 opacity-70" />
        </div>

        {/* Layer 2: Foreground Floating Editorial Metadata */}
        <div
          ref={foregroundTextRef}
          className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none z-20 will-change-transform"
        >
          <div className="flex items-center justify-between text-xs font-mono text-white/60 tracking-widest uppercase">
            <span>ALIF ALFATHAR</span>
            <span>IDN &bull; EST. 2026</span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase block mb-1">
              CREATIVE DEVELOPER
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-none">
              DESIGN × CODE × MOTION
            </h3>
            <p className="text-xs font-mono text-white/60 mt-3 max-w-xs">
              Architecting tactile web experiences where frontend engineering meets editorial motion.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 w-full max-w-2xl mt-8 flex flex-col sm:flex-row items-baseline justify-between text-xs font-mono text-[#585650] gap-2">
        <div className="portrait-meta-item">ALIF ALFATHAR &bull; PORTRAIT ARCHIVE</div>
        <div className="portrait-meta-item text-[11px] text-[#88857d]">
          MOVE CURSOR TO INSPECT 3D DEPTH
        </div>
      </div>
    </section>
  );
}
