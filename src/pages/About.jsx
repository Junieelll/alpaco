import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import Button from "../components/Button";
import MediaImage from "../components/MediaImage";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <PageHeader
        badge="About ALPACO"
        title="Who we are and"
        italicTitle="what we build"
        subtitle="Philippine contractor, materials supplier and trucking operations."
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal y={20}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-forest shadow-md">
              <MediaImage
                src="/images/about-construction.jpg"
                alt="Construction operations"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal y={20} delay={0.1}>
            <div>
              <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-deep">
                Phase 3 Placeholder Page
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Materials, site works and hauling,{" "}
                <span className="it">under one roof</span>
              </h2>
              <p className="mt-4 text-lg text-ink/90">
                ALPACO supplies the materials, prepares the site and moves the
                load. From gravel and sand to demolition, excavation and
                hauling, it all sits under one company, so your project is
                simpler to coordinate.
              </p>

              {/* Styled visible placeholder */}
              <div className="mt-6 rounded-2xl border border-dashed border-forest/30 bg-sage/50 p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-forest">
                  Client Content Placeholder
                </span>
                <p className="mt-2 text-sm text-muted">
                  [CONTENT NEEDED: Full company history, mission, vision, and operational background from the client.]
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/request-a-quote" variant="primary">
                  Request a Quote
                </Button>
                <Button to="/" variant="text-forest">
                  Back to Home
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
