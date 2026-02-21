"use client";

import { useRecruiterMode } from "@/components/Providers";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  const recruiterMode = useRecruiterMode();

  return (
    <main>
      <Hero />
      <About recruiterMode={recruiterMode} />
      <Experience recruiterMode={recruiterMode} />
      <Projects />
      <Skills />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}
