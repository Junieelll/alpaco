import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../ProjectCard";
import { projects } from "../../data/projects";
import Reveal from "../Reveal";

export default function ProjectsSection() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const secondaryProjects = projects.filter((p) => p !== featuredProject);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal y={20}>
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest">
              <span className="h-2 w-2 rounded-full bg-mid" />
              Projects
            </p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Selected <span className="it">projects</span>
            </h2>
          </div>
        </Reveal>
        <Reveal y={20} delay={0.1}>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-1 border-b border-forest pb-0.5 text-sm font-semibold text-forest transition-colors hover:border-mid hover:text-mid"
          >
            <span>View all projects</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-5 lg:grid-cols-[7fr_5fr]">
        <Reveal y={24} duration={0.65}>
          <ProjectCard project={featuredProject} isFeatured={true} />
        </Reveal>

        <div className="flex flex-col gap-5">
          {secondaryProjects.map((project, index) => (
            <Reveal key={project.id} y={24} duration={0.65} delay={0.1 * (index + 1)}>
              <ProjectCard project={project} isFeatured={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
