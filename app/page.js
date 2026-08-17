import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import WhatIBuild from "@/components/WhatIBuild";
import SelectedWork from "@/components/SelectedWork";
import HorizontalShowcase from "@/components/HorizontalShowcase";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <PageTransition />
      <SmoothScroll>
        <CustomCursor />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <Intro />
          <WhatIBuild />
          <SelectedWork />
          <HorizontalShowcase />
          <Capabilities />
          <About />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
