import {
  Mountain,
  Grip,
  Hexagon,
  Layers,
  BrickWall,
  Route,
  Shapes,
  Home,
  Package,
} from "lucide-react";
import { siteConfig } from "../../data/site";
import Reveal from "../Reveal";

// One icon per material (falls back to Package for anything new)
const icons = {
  Gravel: Mountain,
  Sand: Grip,
  Boulders: Hexagon,
  Lastillas: Layers,
  Adobe: BrickWall,
  "Broken kalsada": Route,
  "Broken debris": Shapes,
  Roofing: Home,
};

function Group({ hidden }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`mq-group flex min-w-full shrink-0 items-center justify-around gap-12 pr-12 ${hidden ? "mq-clone" : ""}`}
    >
      {siteConfig.suppliedMaterials.map((material) => {
        const Icon = icons[material] || Package;
        return (
          <li
            key={material}
            className="flex cursor-default items-center gap-2.5 whitespace-nowrap text-forest/60 transition-colors hover:text-forest"
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} />
            <span className="text-sm font-semibold uppercase tracking-wider">{material}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function MaterialsStrip() {
  return (
    <section
      className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-9 sm:px-8 md:flex-row md:gap-8"
      aria-label="Materials we supply"
    >
      <style>{`
        @keyframes mq { to { transform: translateX(-100%); } }
        .mq-group { animation: mq 35s linear infinite; }
        .mq:hover .mq-group { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .mq-group { animation: none; flex-wrap: wrap; justify-content: center; row-gap: 1rem; }
          .mq-clone { display: none; }
        }
      `}</style>

      <Reveal y={12} duration={0.5}>
        <span className="whitespace-nowrap text-sm font-medium text-muted">We supply and haul</span>
      </Reveal>

      <div className="min-w-0 flex-1 self-stretch">
        <Reveal y={12} duration={0.5} delay={0.1}>
          <div className="mq flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Group />
            <Group hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}