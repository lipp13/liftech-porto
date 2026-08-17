"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  // Mobile menu transition
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
        gsap.to(mobileMenuRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "power4.inOut",
        });
        gsap.fromTo(
          ".nav-mobile-link",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.45,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      } else {
        document.body.style.overflow = "";
        gsap.to(mobileMenuRef.current, {
          y: "-100%",
          duration: 0.45,
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
            ? "bg-[#f8f6f0]/90 backdrop-blur-md border-b border-[rgba(17,17,16,0.06)] py-4"
            : "bg-transparent py-7 md:py-9"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brandmark */}
          <a
            href="#"
            className="text-sm md:text-base font-medium tracking-tight text-[#111110] select-none"
            data-cursor-expand="true"
          >
            LIFTECH
          </a>

          {/* Minimal Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] font-mono tracking-[0.2em] text-[#111110] uppercase">
            {[
              { label: "WORK", href: "work" },
              { label: "ABOUT", href: "about" },
              { label: "CONTACT", href: "contact" },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative py-1 group overflow-hidden transition-opacity hover:opacity-100 opacity-75"
                data-cursor-expand="true"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#111110] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[11px] font-mono tracking-widest text-[#111110] uppercase py-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Fullscreen Editorial Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#f8f6f0] z-30 flex flex-col justify-between p-8 pt-32 md:hidden -translate-y-full"
      >
        <nav className="flex flex-col gap-8">
          {[
            { num: "01", label: "WORK", id: "work" },
            { num: "02", label: "ABOUT", id: "about" },
            { num: "03", label: "CONTACT", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-mobile-link flex items-baseline gap-4 text-left group"
            >
              <span className="text-xs font-mono text-[#88857d]">{item.num}</span>
              <span className="text-4xl font-medium tracking-tight text-[#111110] group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-[rgba(17,17,16,0.08)] flex flex-col gap-2 text-xs font-mono text-[#585650]">
          <div>ALIF ALFATHAR &bull; CREATIVE DEVELOPER</div>
          <div className="text-[11px] text-[#88857d]">AVAILABLE WORLDWIDE</div>
        </div>
      </div>
    </>
  );
}
