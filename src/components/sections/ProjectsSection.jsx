import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../ProjectCard";
import { projects } from "../../data/projects";
import {
  group,
  fadeUp,
  cardIn,
  wordsGroup,
  Words,
  useInViewProps,
} from "../motionPresets";

export default function ProjectsSection() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const secondaryProjects = projects.filter((p) => p !== featuredProject);
  const headerInView = useInViewProps(0.3);
  const cardInView = useInViewProps(0.2);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      {/* Header */}
      <motion.div
        className="flex flex-wrap items-end justify-between gap-6"
        variants={group}
        {...headerInView}
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest"
          >
            <span className="h-2 w-2 rounded-full bg-mid" />
            Projects
          </motion.p>
          <motion.h2
            variants={wordsGroup}
            aria-label="Selected projects"
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span aria-hidden="true">
              <Words text="Selected" /> <Words text="projects" className="it" />
            </span>
          </motion.h2>
        </div>
        <motion.div variants={fadeUp}>
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
        </motion.div>
      </motion.div>

      {/* Grid — featured card first, then the others cascade in behind it */}
      <div className="mt-10 grid gap-5 lg:grid-cols-[7fr_5fr]">
        <motion.div variants={cardIn} custom={0} {...cardInView}>
          <ProjectCard project={featuredProject} isFeatured={true} />
        </motion.div>

        <div className="flex flex-col gap-5">
          {secondaryProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardIn}
              custom={index + 1}
              {...cardInView}
            >
              <ProjectCard project={project} isFeatured={false} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}