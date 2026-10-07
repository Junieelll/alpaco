
import Hero from "../components/sections/Hero";
import MaterialsStrip from "../components/sections/MaterialsStrip";
import About from "../components/sections/About";
import ServicesCarousel from "../components/sections/ServicesCarousel";
import TrucksSection from "../components/sections/TrucksSection";
import ProcessBento from "../components/sections/ProcessBento";
import ProjectsSection from "../components/sections/ProjectsSection";
import GallerySection from "../components/sections/GallerySection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white/60 font-sans text-[16px] leading-relaxed text-ink antialiased">
      <Hero />
      <main>
        <MaterialsStrip />
        <About />
        <ServicesCarousel />
        <TrucksSection />
        <ProcessBento />
        <ProjectsSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
