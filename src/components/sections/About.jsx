import { motion } from "framer-motion";
import Button from "../Button";
import MediaImage from "../MediaImage";
import {
  group,
  fadeUp,
  imageReveal,
  wordsGroupFast,
  Words,
  useInViewProps,
} from "../MotionPresets";

export default function About() {
  const inView = useInViewProps(0.25);

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-20">
        {/* Left: label, then the photo wipes open */}
        <motion.div variants={group} {...inView}>
          <motion.p
            variants={fadeUp}
            className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest"
          >
            <span className="h-2 w-2 rounded-full bg-mid" />
            About ALPACO
          </motion.p>
          <motion.div
            variants={imageReveal}
            className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-2xl bg-forest lg:max-w-none shadow-sm group"
          >
            <MediaImage
              src="/images/hauling.webp"
              alt="Construction site operations"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Right: statement types in word by word, then the details follow */}
        <motion.div variants={group} {...inView}>
          <motion.p
            variants={wordsGroupFast}
            aria-label="ALPACO supplies the materials, prepares the site and moves the load. From gravel and sand to demolition, excavation and hauling, it all sits under one company, so your project is simpler to coordinate."
            className="text-2xl font-medium leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.25]"
          >
            <span aria-hidden="true">
              <Words text="ALPACO supplies the materials, prepares the site and moves the load. From gravel and sand to" />{" "}
              <Words text="demolition, excavation and hauling" className="it" />
              <Words text=", it all sits under one company, so your project is simpler to coordinate." />
            </span>
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-muted">
            ALPACO builds on years of experience in construction material supply, growing from a supplier of essential building materials into a business offering a wider range of construction-related solutions. From gravel and sand to lumber, hollow blocks, roofing supplies, hauling, and construction services, ALPACO aims to make project coordination simpler by bringing essential needs together under one roof.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-7">
            <motion.div variants={fadeUp}>
              <Button to="/request-a-quote" variant="forest">
                Work With Us
              </Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button to="/about" variant="text-forest">
                About Us
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}