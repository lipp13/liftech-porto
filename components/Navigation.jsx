"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Dynamic Time Display
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(`${timeString} EST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation for header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  // Mobile menu toggle animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
        gsap.to(mobileMenuRef.current, {
          y: "0%",
          duration: 0.65,
          ease: "power4.inOut",
        });
        gsap.fromTo(
          ".mobile-nav-item",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            delay: 0.25,
            ease: "power3.out",
          }
        );
      } else {
        document.body.style.overflow = "";
        gsap.to(mobileMenuRef.current, {
          y: "-100%",
          duration: 0.55,
          ease: "power4.inOut",
        });
      }
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#f9f8f6]/85 backdrop-blur-md border-b border-[rgba(18,18,18,0.06)] py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <a
            href="#"
            className="group flex items-center gap-2 text-lg md:text-xl font-medium tracking-tight text-[#121212]"
            data-cursor-expand="true"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#121212] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-sans font-semibold tracking-[-0.03em]">LifTech</span>
            <span className="hidden sm:inline text-xs text-[#8c8982] font-mono ml-2 border border-[rgba(18,18,18,0.08)] px-2 py-0.5 rounded-full">
              STUDIO
            </span>
          </a>

          {/* Center Utility / Status */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-[#5e5c57] font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE FOR Q3 / Q4
            </span>
            <span className="text-[rgba(18,18,18,0.2)]">/</span>
            <span>{time || "NYC / 2026"}</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-[#121212] uppercase">
            {[
              { label: "WORK", href: "work" },
              { label: "CAPABILITIES", href: "capabilities" },
              { label: "ABOUT", href: "about" },
              { label: "CONTACT", href: "contact" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative py-1 group overflow-hidden transition-colors hover:text-[#000000]"
                data-cursor-expand="true"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#121212] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8 focus:outline-none z-50"
            aria-label="Toggle navigation menu"
          >
            <span
              className={`h-[1.5px] bg-[#121212] transition-all duration-300 ${
                mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
              }`}
            />
            <span
              className={`h-[1.5px] bg-[#121212] transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "w-4"
              }`}
            />
            <span
              className={`h-[1.5px] bg-[#121212] transition-all duration-300 ${
                mobileMenuOpen ? "w-6 -rotate-45 -translate-y-1.5" : "w-5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#f9f8f6] z-30 flex flex-col justify-between p-8 pt-28 md:hidden -translate-y-full"
      >
        <div className="flex flex-col gap-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c8982]">
            Navigation
          </span>
          <nav className="flex flex-col gap-5">
            {[
              { num: "01", label: "Selected Work", id: "work" },
              { num: "02", label: "Capabilities", id: "capabilities" },
              { num: "03", label: "About Studio", id: "about" },
              { num: "04", label: "Start Conversation", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="mobile-nav-item flex items-baseline gap-4 text-left group"
              >
                <span className="text-xs font-mono text-[#8c8982]">{item.num}</span>
                <span className="text-3xl font-medium tracking-tight text-[#121212] group-hover:translate-x-2 transition-transform duration-300">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-[rgba(18,18,18,0.08)] flex flex-col gap-3 text-xs font-mono text-[#5e5c57]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>AVAILABLE FOR SELECT PROJECTS</span>
          </div>
          <div>EST LOCAL TIME: {time || "2026"}</div>
          <div className="text-[11px] text-[#8c8982] mt-2">
            liftech.studio@alifalfathar.dev
          </div>
        </div>
      </div>
    </>
  );
}
