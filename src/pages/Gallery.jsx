import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";
import Reveal from "../components/Reveal";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <PageHeader
        badge="Field Media"
        title="Field documentation &"
        italicTitle="operations gallery"
        subtitle="Real machinery, hauling trucks, and site operations."
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal y={16}>
          <div className="mb-8 rounded-2xl border border-dashed border-forest/30 bg-sage/40 p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-forest">
              Media Notice
            </span>
            <p className="mt-1 text-sm text-muted">
              [CONTENT NEEDED: Client original landscape video and high-resolution photo assets.]
            </p>
          </div>
        </Reveal>

        <Reveal y={24} duration={0.65}>
          <GalleryGrid />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
