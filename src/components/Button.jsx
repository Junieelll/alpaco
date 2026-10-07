import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Button({
  children,
  to,
  href = "/request-a-quote",
  variant = "primary",
  className = "",
  showArrow = true,
  onClick,
  ...props
}) {
  const target = to || href;
  const isRouterLink = target && target.startsWith("/");

  const baseClasses =
    "inline-flex items-center text-[12.5px] font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

  const renderContent = () => {
    if (variant === "primary") {
      return (
        <>
          <span>{children}</span>
          {showArrow && (
            <span className="grid h-7.5 w-7.5 place-items-center rounded-full bg-deep text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          )}
        </>
      );
    }

    if (variant === "forest") {
      return (
        <>
          <span>{children}</span>
          {showArrow && (
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#CDF077] text-deep transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </span>
          )}
        </>
      );
    }

    if (variant === "white") {
      return (
        <>
          <span>{children}</span>
          {showArrow && (
            <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-forest text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </span>
          )}
        </>
      );
    }

    if (variant === "text-white" || variant === "text-forest") {
      return (
        <span className="inline-flex items-center gap-1">
          <span>{children}</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.2}
          />
        </span>
      );
    }

    return <>{children}</>;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `${baseClasses} group gap-2.5 rounded-full bg-gold py-2 pl-4.5 pr-2 text-deep shadow-sm hover:brightness-105 active:scale-[0.98]`;
      case "forest":
        return `${baseClasses} group gap-2 rounded-full bg-forest py-1.5 pl-4 pr-1.5 text-white shadow-sm hover:bg-deep active:scale-[0.98]`;
      case "white":
        return `${baseClasses} group gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-1.5 font-semibold text-forest shadow-sm transition-all duration-300 hover:bg-sage active:scale-[0.98]`;
      case "text-white":
        return `group border-b border-white/70 pb-0.5 text-[12.5px] font-semibold text-white transition-colors duration-200 hover:border-gold hover:text-gold`;
      case "text-forest":
        return `group border-b border-forest pb-0.5 text-[12.5px] font-semibold text-forest transition-colors duration-200 hover:text-mid hover:border-mid`;
      default:
        return `${baseClasses} rounded-full px-5 py-2`;
    }
  };

  const combinedClasses = `${getVariantClasses()} ${className}`;

  if (isRouterLink) {
    return (
      <Link to={target} onClick={onClick} className={combinedClasses} {...props}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <a href={target} onClick={onClick} className={combinedClasses} {...props}>
      {renderContent()}
    </a>
  );
}
