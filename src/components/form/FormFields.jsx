import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const fieldShape =
  "w-full scroll-mt-32 rounded-2xl border-0 px-4 text-[15px] text-ink outline-none ring-1 ring-inset transition duration-300 placeholder:text-muted/60 focus:ring-2";
const fieldOk =
  "bg-paper/70 ring-forest/10 hover:ring-forest/25 focus:bg-white focus:ring-forest/50";
const fieldBad =
  "bg-red-50/50 ring-red-500/50 hover:ring-red-500/70 focus:bg-white focus:ring-red-500/70";

const chipBase =
  "relative rounded-full ring-1 ring-inset transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const chipIdle = (invalid) =>
  invalid
    ? "bg-paper/70 text-muted ring-red-500/40 hover:text-deep hover:ring-red-500/60"
    : "bg-paper/70 text-muted ring-forest/10 hover:text-deep hover:ring-forest/30";

/* ------------------------------------------------------------------ */
/* Error message                                                       */
/* ------------------------------------------------------------------ */

/** Slides in under a field when it has something to say. */
export function FieldError({ id, message }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key="error"
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
          className="overflow-hidden"
        >
          <span className="flex items-start gap-1.5 pt-1.5 text-[13px] font-medium text-red-600">
            <AlertCircle
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            {message}
          </span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

/**
 * Label + input (or textarea) + error message.
 * `id` is the DOM id. Any other props (name, value, onChange, onBlur,
 * type, placeholder, autoComplete, rows...) go straight to the input.
 */
export function TextField({
  id,
  label,
  required,
  error,
  counter,
  multiline = false,
  className = "",
  ...inputProps
}) {
  const Tag = multiline ? "textarea" : "input";
  const errorId = `${id}-error`;
  const over = counter && counter.count > counter.max;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-deep"
      >
        {label}
        {required && <span className="text-forest"> *</span>}
      </label>

      <Tag
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required || undefined}
        className={`${fieldShape} ${error ? fieldBad : fieldOk} ${
          multiline ? "resize-none py-3" : "h-12"
        }`}
        {...inputProps}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <FieldError id={errorId} message={error} />
        </div>
        {counter && (
          <span
            className={`shrink-0 pt-1.5 text-xs tabular-nums ${
              over ? "font-medium text-red-600" : "text-muted"
            }`}
          >
            {counter.count}/{counter.max}
          </span>
        )}
      </div>
    </div>
  );
}

/** Label + error wrapper for chip groups (which have no single input). */
export function FieldGroup({
  id,
  label,
  required,
  hint,
  error,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      <p className="mb-2 text-[13px] font-medium text-deep">
        {label}
        {required && <span className="text-forest"> *</span>}
        {hint && <span className="ml-2 font-normal text-muted">{hint}</span>}
      </p>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** Small heading that groups related fields. */
export function GroupTitle({ children }) {
  return (
    <h3 className="mb-4 mt-10 border-b border-forest/10 pb-3 text-sm font-semibold text-deep first:mt-0">
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/* Chips                                                               */
/* ------------------------------------------------------------------ */

/** Single-select chips. The selected fill glides between chips. */
export function ChipGroup({
  id,
  layoutId,
  label,
  options,
  value,
  onChange,
  invalid,
  describedBy,
}) {
  const reduce = useReducedMotion();
  return (
    <div
      id={id}
      role="radiogroup"
      aria-label={label}
      aria-describedby={describedBy}
      className="flex flex-wrap gap-2"
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`${chipBase} px-4 py-2 text-xs font-medium ${
              selected ? "text-white ring-forest" : chipIdle(invalid)
            }`}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-forest"
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 38 }
                }
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Multi-select chips. Each chip fills and gains a check when toggled on. */
export function MultiChipGroup({
  id,
  label,
  options,
  values,
  onToggle,
  invalid,
  describedBy,
}) {
  const reduce = useReducedMotion();
  return (
    <div
      id={id}
      role="group"
      aria-label={label}
      aria-describedby={describedBy}
      className="flex flex-wrap gap-2"
    >
      {options.map((o) => {
        const selected = values.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(o.value)}
            className={`${chipBase} inline-flex items-center px-4 py-2 text-[13px] font-medium ${
              selected ? "text-white ring-forest" : chipIdle(invalid)
            }`}
          >
            <AnimatePresence initial={false}>
              {selected && (
                <motion.span
                  key="fill"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
                  className="absolute inset-0 rounded-full bg-forest"
                />
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {selected && (
                <motion.span
                  key="check"
                  aria-hidden="true"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
                  className="relative mr-0 flex overflow-hidden"
                >
                  <Check className="mr-1.5 h-4 w-4 shrink-0" strokeWidth={2.75} />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success                                                             */
/* ------------------------------------------------------------------ */

/** Circle and tick draw themselves once the request is accepted. */
export function SuccessMark() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 64 64"
      className="mx-auto h-16 w-16 text-forest"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
      />
      <motion.path
        d="M20 33l8 8 16-17"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduce ? 0 : 0.45,
          ease: EASE,
          delay: reduce ? 0 : 0.55,
        }}
      />
    </svg>
  );
}