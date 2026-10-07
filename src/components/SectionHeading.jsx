
export default function SectionHeading({
  label,
  title,
  italicWords,
  description,
  theme = "light", // 'light' or 'dark'
  align = "left",
  className = "",
}) {
  const isDark = theme === "dark";

  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {label && (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold ${
            isDark ? "text-gold" : "text-forest"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isDark ? "bg-gold" : "bg-mid"
            }`}
          />
          {label}
        </p>
      )}

      {title && (
        <h2
          className={`text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          {title} {italicWords && <span className="it">{italicWords}</span>}
        </h2>
      )}

      {description && (
        <p
          className={`mt-4 text-base ${
            isDark ? "text-white/80" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
