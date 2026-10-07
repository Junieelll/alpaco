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
        title="Selected"
        italicTitle="projects & works"
        subtitle="Demolition, site excavation, and materials supply in the Philippines."
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal y={16}>
          <div className="mb-8 rounded-2xl border border-dashed border-forest/30 bg-sage/40 p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Placeholder Notice
            </span>
            <p className="mt-1 text-sm text-muted">
              [CONTENT NEEDED: Real project names, locations, and descriptions will be populated once supplied by client.]
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
