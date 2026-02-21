"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Page() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light") setDark(false);
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("light", !dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark, mounted]);

  return (
    <>
      <Navigation
        dark={dark}
        setDark={setDark}
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
        mounted={mounted}
      />
      <main>
        <Hero />
        <About recruiterMode={recruiterMode} />
        <Experience recruiterMode={recruiterMode} />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </>
  );
}
