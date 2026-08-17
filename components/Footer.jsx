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
    <footer className="relative bg-[#f0eee6] border-t border-[rgba(17,17,16,0.08)] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-between gap-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6 flex flex-col gap-3">
            <span className="text-base font-medium tracking-tight text-[#111110]">
              LIFTECH
            </span>
            <p className="text-xs font-mono text-[#585650] max-w-sm leading-relaxed">
              CREATIVE DEVELOPER &bull; ALIF ALFATHAR &bull; INDONESIA
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2 text-xs font-mono tracking-[0.15em] text-[#111110] uppercase">
            <span className="text-[#88857d] mb-1">Index</span>
            {[
              { label: "WORK", id: "work" },
              { label: "ABOUT", id: "about" },
              { label: "CONTACT", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left py-0.5 hover:opacity-60 transition-opacity w-fit"
                data-cursor-expand="true"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-3 flex flex-col gap-2 text-xs font-mono tracking-[0.15em] text-[#111110] uppercase">
            <span className="text-[#88857d] mb-1">Network</span>
            {[
              { name: "GITHUB", href: "https://github.com/lipp13" },
              { name: "TWITTER / X", href: "https://x.com" },
              { name: "LINKEDIN", href: "https://linkedin.com" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-0.5 hover:opacity-60 transition-opacity flex items-center justify-between w-fit gap-2"
                data-cursor-expand="true"
              >
                <span>{social.name}</span>
                <span className="text-[10px] text-[#88857d]">&nearr;</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(17,17,16,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#88857d]">
          <div>&copy; {currentYear} LIFTECH &bull; ALL RIGHTS RESERVED</div>
          <button
            onClick={scrollToTop}
            data-cursor-expand="true"
            className="text-[#111110] hover:opacity-60 transition-opacity"
          >
            BACK TO TOP &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
