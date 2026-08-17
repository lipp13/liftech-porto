"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import DepthScene from "./DepthScene";

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const portraitWrapperRef = useRef(null);
  const portraitImageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subtextRef = useRef(null);

  // Desktop subtle mouse tilt for 2.5D depth
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
      targetX = (e.clientX / innerWidth - 0.5) * 14;
      targetY = (e.clientY / innerHeight - 0.5) * 14;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (portraitImageRef.current) {
        portraitImageRef.current.style.transform = `translate3d(${currentX * 0.4}px, ${currentY * 0.4}px, 0) scale(1.03)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP Choreographed Scroll Transformation
  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      // Entrance Timeline
      const enterTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      enterTl
        .fromTo(
          eyebrowRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
        )
        .fromTo(
          ".hero-line",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
          },
          0.5
        )
        .fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.8
        )
        .fromTo(
          portraitWrapperRef.current,
          { scale: 0.92, opacity: 0, clipPath: "inset(6% 6% 6% 6% round 24px)" },
          {
            scale: 1,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            duration: 1.4,
            ease: "power3.out",
          },
          0.6
        );

      // Scroll-Driven Transformation: Typography moves up, Portrait expands into depth
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      scrollTl
        .to(headlineRef.current, {
          y: -120,
          opacity: 0.2,
          ease: "none",
        })
        .to(
          portraitWrapperRef.current,
          {
            scale: 1.06,
            y: 40,
            ease: "none",
          },
          0
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
      className="relative min-h-[105vh] flex flex-col justify-between pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 3D Architectural Scene */}
      <DepthScene />

      {/* Top Label */}
      <div className="relative z-10">
        <div
          ref={eyebrowRef}
          className="opacity-0 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#585650]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#111110]" />
          <span>CREATIVE DEVELOPER</span>
        </div>
      </div>

      {/* Main Massive Editorial Typography & 60-70% Dominant Visual Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto py-6">
        {/* Left Column: Huge Typography */}
        <div ref={headlineRef} className="lg:col-span-6 flex flex-col justify-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-medium tracking-[-0.045em] leading-[0.92] text-[#111110]">
            <div className="overflow-hidden py-1">
              <span className="hero-line block">I BUILD</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="hero-line block font-serif italic font-normal text-[#2a2926] tracking-[-0.025em]">
                digital
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="hero-line block text-[#111110]">
                EXPERIENCES.
              </span>
            </div>
          </h1>

          <p
            ref={subtextRef}
            className="opacity-0 text-base md:text-lg text-[#585650] leading-relaxed max-w-md mt-8 font-normal"
          >
            Crafting digital products where editorial design, fluid motion, and frontend engineering meet.
          </p>

          <div className="mt-8">
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

        {/* Right Column: Dominant 2.5D Portrait Art Installation (60-70% Viewport Area) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            ref={portraitWrapperRef}
            data-cursor-text="EXPLORE"
            className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-[#161614] shadow-2xl border border-[rgba(17,17,16,0.12)] select-none will-change-transform"
          >
            {/* Background Ambient Radial Shadow */}
            <div className="absolute inset-0 bg-radial from-[#383733]/30 via-transparent to-[#111110]/90 pointer-events-none z-10" />

            {/* Authentic Photographic Portrait */}
            <div
              ref={portraitImageRef}
              className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-300"
            >
              <Image
                src="/images/alif-portrait.jpg"
                alt="Alif Alfathar — Creative Developer"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-center grayscale-[20%] contrast-[1.08] brightness-[0.95] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-[#111110]/30 opacity-70" />
            </div>

            {/* Overlay Metadata */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-20">
              <div className="flex items-center justify-between text-xs font-mono text-white/60 tracking-widest uppercase">
                <span>ALIF ALFATHAR</span>
                <span>INDONESIA</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase block mb-1">
                  PORTFOLIO ARCHIVE
                </span>
                <span className="text-xl sm:text-2xl font-medium tracking-tight text-white block">
                  DESIGN × CODE × MOTION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
