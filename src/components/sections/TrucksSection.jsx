import Button from "../Button";
import Reveal from "../Reveal";

export default function TrucksSection() {
  return (
    <section className="px-3 sm:px-4">
      {/* Container aligned with max-w-7xl, increased height for highway visibility */}
      <div className="relative isolate mx-auto flex min-h-[460px] max-w-7xl items-center overflow-hidden rounded-[1.75rem] bg-deep px-6 py-14 text-white sm:min-h-[500px] sm:rounded-[2rem] sm:px-10 sm:py-16 lg:min-h-[540px] lg:px-14">
        {/* Full-bleed background truck image pinned bottom-right so the highway and truck are prominently featured */}
        <img
          src="/images/dump-truck.png"
          alt="ALPACO dump truck hauling materials"
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[92%_bottom] sm:object-[95%_bottom] lg:object-[98%_bottom]"
        />

        {/* 
          Targeted dark green gradient overlay:
          Covers the left side (0% to ~35%) for crisp typography,
          fading completely to transparent by 55% so the truck front remains clear and bright
        */}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-deep via-deep/90 via-50% to-transparent sm:bg-gradient-to-r sm:from-deep sm:from-10% sm:via-deep/90 sm:via-35% sm:to-transparent sm:to-58%" />

        {/* Curving road accent SVG representing the logo road curve */}
        <svg
          className="pointer-events-none absolute -bottom-8 left-0 -z-10 w-[140%] max-w-none opacity-80 sm:w-full"
          viewBox="0 0 1200 240"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 230C250 90 700 20 1200 60"
            stroke="#EDAA1C"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M0 238C300 130 720 70 1200 100"
            stroke="#2E6B45"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* Text content strictly constrained to the left dark zone */}
        <div className="relative z-10 max-w-md lg:max-w-lg">
          <Reveal y={20} duration={0.65}>
            <p className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-gold">
              <span className="h-2 w-2 rounded-full bg-gold" />
              Hauling & trucking
            </p>
            <h2 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.65rem]">
              Our trucks move your materials{" "}
              <span className="it">where they are needed</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85 sm:max-w-md sm:text-base">
              Dump trucks for gravel, sand, embankment materials and debris.
              [CONTENT NEEDED: fleet details from the client]
            </p>
            <Button to="/request-a-quote" variant="primary" className="mt-6">
              Inquire for Hauling
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
