"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#f2f0eb] border-t border-[rgba(18,18,18,0.08)] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xl font-medium tracking-tight text-[#121212]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#121212]" />
              <span className="font-sans font-semibold tracking-[-0.03em]">LifTech</span>
            </div>
            <p className="text-sm text-[#5e5c57] leading-relaxed max-w-sm">
              Crafting premium editorial web experiences, motion architecture, and high-performance digital products for forward-thinking brands.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5e5c57] pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>AVAILABLE FOR SELECTED COMMISSIONS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3 text-xs font-mono tracking-widest text-[#121212] uppercase">
            <span className="text-[#8c8982] mb-1">Index</span>
            {[
              { label: "WORK", id: "work" },
              { label: "CAPABILITIES", id: "capabilities" },
              { label: "ABOUT", id: "about" },
              { label: "CONTACT", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left py-0.5 hover:text-black transition-colors w-fit"
                data-cursor-expand="true"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Connect / Network */}
          <div className="md:col-span-4 flex flex-col gap-3 text-xs font-mono tracking-widest text-[#121212] uppercase">
            <span className="text-[#8c8982] mb-1">Connect</span>
            {[
              { name: "GITHUB", href: "https://github.com" },
              { name: "TWITTER / X", href: "https://x.com" },
              { name: "LINKEDIN", href: "https://linkedin.com" },
              { name: "READ.CV", href: "https://read.cv" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-0.5 hover:text-black transition-colors flex items-center justify-between w-fit gap-2"
                data-cursor-expand="true"
              >
                <span>{social.name}</span>
                <span className="text-[10px] text-[#8c8982]">&nearr;</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[rgba(18,18,18,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8c8982]">
          <div>
            &copy; {currentYear} LIFTECH STUDIO. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            data-cursor-expand="true"
            className="flex items-center gap-2 text-[#121212] hover:text-black transition-colors group"
          >
            <span>BACK TO TOP</span>
            <span className="group-hover:-translate-y-1 transition-transform">
              &uarr;
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
