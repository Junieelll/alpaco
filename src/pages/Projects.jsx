import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";

export default function Projects() {
  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <PageHeader
        badge="Projects & Portfolio"
        title="Our"
        italicTitle="completed works"
        subtitle="Explore our proven track record across demolition, excavation, material supply, and construction projects throughout the Philippines."
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} y={24} duration={0.6} delay={0.08 * index}>
              <ProjectCard project={project} isFeatured={false} />
            </Reveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
