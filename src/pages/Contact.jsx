import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { siteConfig } from "../data/site";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  const contactItems = [
    {
      icon: MapPin,
      label: "Business Address",
      val: siteConfig.address,
    },
    {
      icon: Phone,
      label: "Phone / Mobile",
      val: siteConfig.phone,
    },
    {
      icon: Mail,
      label: "Email Address",
      val: siteConfig.email,
    },
    {
      icon: MessageSquare,
      label: "Facebook Page",
      val: siteConfig.facebook,
    },
    {
      icon: Clock,
      label: "Business Hours",
      val: "[CONTENT NEEDED: business hours]",
    },
  ];

  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <PageHeader
        badge="Get in Touch"
        title="Contact our"
        italicTitle="operations team"
        subtitle="Inquire about construction supplies, excavation, hauling and demolition."
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal y={20}>
            <div>
              <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-deep">
                Phase 3 Placeholder Page
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Ready to coordinate your{" "}
                <span className="it">project requirements</span>?
              </h2>
              <p className="mt-3 text-muted">
                Contact details will be officially updated once confirmed by the
                client.
              </p>

              <div className="mt-8 space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 rounded-2xl border border-dashed border-forest/20 bg-white p-5 shadow-xs"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage text-forest">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block font-semibold text-forest">
                          {item.val}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.15}>
            <div className="rounded-3xl bg-forest p-8 text-white shadow-xl lg:p-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                Quick Action
              </span>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Need pricing or material supply estimate?
              </h3>
              <p className="mt-3 text-sm text-white/80">
                You can use our quote request form directly to submit service
                type, volume requirements, and project location.
              </p>
              <div className="mt-8">
                <Button to="/request-a-quote" variant="primary">
                  Get Project Estimate
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
