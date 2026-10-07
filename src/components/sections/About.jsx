import Button from "../Button";
import MediaImage from "../MediaImage";
import Reveal from "../Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-[300px_1fr] lg:gap-20">
        <Reveal y={20} duration={0.6}>
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest">
              <span className="h-2 w-2 rounded-full bg-mid" />
              About ALPACO
            </p>
            <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-2xl bg-forest lg:max-w-none shadow-sm group">
              <MediaImage
                src="/images/about-construction.jpg"
                alt="Construction site operations"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>

        <Reveal y={20} duration={0.65} delay={0.1}>
          <div>
            <p className="text-2xl font-medium leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.25]">
              ALPACO supplies the materials, prepares the site and moves the
              load. From gravel and sand to{" "}
              <span className="it">demolition, excavation and hauling</span>, it
              all sits under one company, so your project is simpler to
              coordinate.
            </p>
            <p className="mt-5 max-w-xl text-muted">
              [CONTENT NEEDED: company background from the client]
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-7">
              <Button to="/request-a-quote" variant="forest">
                Work With Us
              </Button>
              <Button to="/about" variant="text-forest">
                About Us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
