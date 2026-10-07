import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";
import Reveal from "../components/Reveal";
import Button from "../components/Button";

export default function Services() {
  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <PageHeader
        badge="Our Capabilities"
        title="Everything your"
        italicTitle="site needs"
        subtitle="Supply, site works and hauling, handled by one dependable team."
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal y={16}>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-deep">
                Phase 3 Placeholder Page
              </span>
              <p className="mt-2 text-sm text-muted">
                Showing all 6 core services sourced from `src/data/services.js`.
              </p>
            </div>
            <Button to="/request-a-quote" variant="primary">
              Request a Quote
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} y={24} duration={0.6} delay={0.08 * index}>
              <div className="flex justify-center">
                <ServiceCard service={service} index={index} />
              </div>
            </Reveal>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
