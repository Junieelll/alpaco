import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import MediaImage from "./MediaImage";

// One easing curve for the whole card so every motion feels related.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function ServiceCard({ service, ariaHidden = false, index = 0 }) {
  const { title, description, tag, image, alt, icon: Icon } = service;

  const ref = useRef(null);
  // Cloned (aria-hidden) cards skip the entrance so a looping carousel doesn't replay it.
  const [seen, setSeen] = useState(ariaHidden);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  // Cards that arrive together get a tiny offset so they don't move in lockstep.
  const base = (index % 3) * 90;
  const delay = (ms) => ({ transitionDelay: `${base + ms}ms` });

  const fadeUp = `transition-[opacity,transform] duration-700 ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
    seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`;

  const words = title.split(" ");

  return (
    <a
      ref={ref}
      href="#quote"
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      className="group relative h-[27rem] w-[17rem] shrink-0 snap-start overflow-hidden rounded-3xl bg-forest shadow-md transition-[box-shadow,transform] duration-300 hover:shadow-xl active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-80"
    >
      {/* Image: settles from slightly zoomed-in on entrance (wrapper),
          then zooms gently on hover (img) so the two transforms never fight. */}
      <div
        style={delay(0)}
        className={`absolute inset-0 transition-transform duration-[1400ms] ${EASE} motion-reduce:transition-none motion-reduce:scale-100 ${
          seen ? "scale-100" : "scale-[1.12]"
        }`}
      >
        <MediaImage
          src={image}
          alt={alt || `Photo for ${title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Subtle black gradient overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Top category chip & icon badge */}
      <span
        style={delay(150)}
        className={`absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs transition-opacity duration-700 motion-reduce:transition-none motion-reduce:opacity-100 ${
          seen ? "opacity-100" : "opacity-0"
        }`}
      >
        {tag}
      </span>
      <span
        style={delay(150)}
        className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-forest shadow-sm transition-[opacity,transform] duration-700 ${EASE} motion-reduce:transition-none motion-reduce:scale-100 motion-reduce:opacity-100 ${
          seen ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />}
      </span>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        {/* Title: each word rises out of its own mask, one after another */}
        <h3 className="text-xl font-bold leading-tight transition-colors duration-200 group-hover:text-gold">
          {words.map((word, i) => (
            <span
              key={i}
              className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top"
            >
              <span
                style={delay(250 + i * 60)}
                className={`inline-block transition-transform duration-700 ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 ${
                  seen ? "translate-y-0" : "translate-y-[110%]"
                }`}
              >
                {word}
              </span>
              {i < words.length - 1 && "\u00A0"}
            </span>
          ))}
        </h3>

        <p
          style={delay(250 + words.length * 60 + 80)}
          className={`mt-1.5 line-clamp-2 text-sm text-white/80 ${fadeUp}`}
        >
          {description}
        </p>

        {/* CTA wrapper handles the entrance; the pill itself handles hover */}
        <div
          style={delay(250 + words.length * 60 + 200)}
          className={`mt-4 ${fadeUp}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-1.5 text-[12.5px] font-bold text-deep transition-colors duration-200 group-hover:bg-sage">
            Inquire Service
            {/* Arrow exits top-right while a second one slides in from bottom-left */}
            <span className="relative grid h-6.5 w-6.5 place-items-center overflow-hidden rounded-full bg-deep text-white">
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300 ease-out group-hover:-translate-y-4 group-hover:translate-x-4"
                strokeWidth={2.5}
              />
              <ArrowUpRight
                className="absolute h-3 w-3 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
                strokeWidth={2.5}
              />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}