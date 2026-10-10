import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "../data/site";

const contacts = [
  { icon: MapPin, label: siteConfig.address },
  { icon: Phone, label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

const links = [
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/request-a-quote", label: "Request a Quote" },
];

export default function Footer() {
  return (
    <footer id="contact" className="overflow-hidden bg-ink pt-16 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[2fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-3">
            {/* White chip keeps the green/gold logo readable on the dark footer */}
            <span className="gridshrink-0 place-items-center p-1.5">
              <img src="/alpaco-horizontal-logo.png" alt="ALPACO logo" className="h-25 w-full object-contain" />
            </span>
            
          </div>
          <p className="mt-3 max-w-xs text-sm">
            Contractor, supplier and trucking company in the Philippines.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                {href ? (
                  <a href={href} className="min-w-0 break-words pt-1.5 transition hover:text-white">
                    {label}
                  </a>
                ) : (
                  <span className="min-w-0 break-words pt-1.5">{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant faint ALPACO wordmark */}
      <p
        className="select-none whitespace-nowrap px-2 pt-10 text-center text-[24vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.07]"
        aria-hidden="true"
      >
        ALPACO
      </p>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs sm:px-8">
        &copy; {new Date().getFullYear()} ALPACO Diversified Development OPC. Layout preview with placeholder photos.
      </div>
    </footer>
  );
}