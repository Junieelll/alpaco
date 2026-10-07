import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import { services } from "../data/services";
import Reveal from "../components/Reveal";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    contactNumber: "",
    email: "",
    projectLocation: "",
    serviceNeeded: services[0]?.title || "",
    details: "",
    estimatedQuantity: "",
    description: "",
    preferredContactMethod: "Phone",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contactNumber) {
      setError("Please provide your full name and contact number.");
      return;
    }
    setError("");
    // Isolated submit handler for future API / email service connection
    console.log("Submitted Quote Request:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <PageHeader
        badge="Request a Quote"
        title="Tell us about"
        italicTitle="your project"
        subtitle="Tell us about your project and our team will review your requirements and get in touch with you."
      />

      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal y={20}>
          <div className="rounded-3xl bg-white p-8 shadow-md sm:p-12">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-mid" />
                <h2 className="mt-4 text-3xl font-bold text-ink">
                  Thank You, {formData.fullName}!
                </h2>
                <p className="mx-auto mt-2 max-w-md text-muted">
                  Your quote request has been received. Our team will review your
                  project requirements and reach out via{" "}
                  <strong className="text-forest">
                    {formData.preferredContactMethod}
                  </strong>
                  .
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full bg-forest px-8 py-3 text-sm font-bold text-white transition hover:bg-deep"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    Project & Quote Details
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Fill in your details below and we will get back to you promptly.
                  </p>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Juan dela Cruz"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleChange}
                      placeholder="e.g. 0917 123 4567"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      name="projectLocation"
                      required
                      value={formData.projectLocation}
                      onChange={handleChange}
                      placeholder="City or Municipality"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Service Needed *
                    </label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Material / Service Details
                    </label>
                    <input
                      type="text"
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="e.g. Gravel G1, Vibro Sand, 10-wheeler dump"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                      Estimated Quantity
                    </label>
                    <input
                      type="text"
                      name="estimatedQuantity"
                      value={formData.estimatedQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 cubic meters, 10 truckloads"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                    Project Description / Additional Notes
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about project timeline, access constraints, or specific requirements..."
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-paper/50 px-4 py-3 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest">
                    Preferred Contact Method
                  </label>
                  <div className="mt-2 flex gap-6 text-sm">
                    {["Phone", "Email", "SMS / Viber"].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContactMethod"
                          value={method}
                          checked={formData.preferredContactMethod === method}
                          onChange={handleChange}
                          className="accent-forest"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 font-bold text-deep shadow-sm transition hover:brightness-105 active:scale-95"
                  >
                    <span>Request a Quote</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-deep text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
