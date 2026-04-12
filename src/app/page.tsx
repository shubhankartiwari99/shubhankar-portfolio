import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import Overview from "@/components/Overview";
import Journey from "@/components/Journey";
import Engineering from "@/components/Engineering";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <FeaturedProject />
      <Overview />
      <Journey />
      <Engineering />
      <Projects />
      <Skills />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}
