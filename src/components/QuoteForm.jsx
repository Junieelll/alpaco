import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "../data/site";
import { services } from "../data/services";
import {
  EASE,
  ChipGroup,
  FieldError,
  FieldGroup,
  GroupTitle,
  MultiChipGroup,
  SuccessMark,
  TextField,
} from "./form/FormFields";
import {
  LIMITS,
  RELATED_FIELDS,
  STEP_FIELDS,
  cleanForm,
  validateField,
  validateStep,
} from "../utils/quoteValidation";

const INITIAL_FORM = {
  fullName: "",
  companyName: "",
  contactNumber: "",
  email: "",
  projectLocation: "",
  servicesNeeded: [],
  details: "",
  estimatedQuantity: "",
  description: "",
  preferredContactMethod: "Phone",
};

const CONTACT_METHODS = [
  { value: "Phone", label: "Phone" },
  { value: "Email", label: "Email" },
  { value: "SMS / Viber", label: "SMS / Viber" },
];

const SERVICE_OPTIONS = services.map((s) => ({
  value: s.title,
  label: s.title,
}));

const STEPS = [{ title: "Your details" }, { title: "The project" }];

/* Entrance choreography: header items stagger in, then each step's fields follow */
const headerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
// The step panel slides in from the direction you're travelling, then its fields cascade
const panelVariants = {
  hidden: (dir = 1) => ({ opacity: 0, x: dir * 24 }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE, staggerChildren: 0.07, delayChildren: 0.1 },
  },
};
const fieldIn = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// Prefixed so ids can't clash with other elements on the page.
const fid = (name) => `quote-${name}`;

/* ------------------------------------------------------------------ */
/* Placeholder: single hand-off point for the API / email service      */
/* ------------------------------------------------------------------ */
async function submitQuote(payload) {
  // TODO: replace with your API or email service call.
  // Throw an error when the request fails and the form shows its error message.
  console.log("Submitted quote request:", payload);
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const primaryBtn =
  "group inline-flex w-full items-center justify-between gap-3 rounded-full bg-forest py-2 pl-7 pr-2 text-[13px] font-medium text-white shadow-sm transition-all duration-300 hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:justify-start";
const secondaryBtn =
  "inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full px-6 text-[13px] font-medium text-deep ring-1 ring-inset ring-forest/15 transition duration-300 hover:ring-forest/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto";
const btnIcon =
  "grid h-7.5 w-7.5 place-items-center rounded-full bg-[#CDF077] text-deep transition-transform duration-300";

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

function Stepper({ current, onSelect }) {
  const reduce = useReducedMotion();
  return (
    <ol className="grid grid-cols-2 gap-3" aria-label="Form progress">
      {STEPS.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
        return (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={state === "current" ? "step" : undefined}
              className="group block w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-forest/10">
                <motion.span
                  className="block h-full origin-left rounded-full bg-forest"
                  initial={false}
                  animate={{ scaleX: i <= current ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                />
              </span>
              <span className="mt-3 flex items-center gap-2.5">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors duration-300 ${
                    state === "upcoming"
                      ? "bg-paper text-muted ring-1 ring-inset ring-forest/15"
                      : "bg-forest text-white"
                  }`}
                >
                  <motion.span
                    key={state === "done" ? "done" : "num"}
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="grid place-items-center"
                  >
                    {state === "done" ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      i + 1
                    )}
                  </motion.span>
                </span>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    state === "upcoming"
                      ? "text-muted group-hover:text-deep"
                      : "text-deep"
                  }`}
                >
                  {s.title}
                  {state === "done" && (
                    <span className="sr-only"> (completed)</span>
                  )}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export default function QuoteForm() {
  const reduce = useReducedMotion();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [submitError, setSubmitError] = useState("");

  const topRef = useRef(null);
  const panelRef = useRef(null);
  const successRef = useRef(null);
  const prevStep = useRef(step);
  const pendingFocus = useRef(null);

  // Entrance plays once when the form scrolls into view (steps after that animate immediately)
  const entered = useInView(topRef, { once: true, amount: 0.1 });
  const show = reduce || entered;

  const sending = status === "sending";

  /* ---------- focus + scroll ---------- */

  const focusField = (name) => {
    const el = document.getElementById(fid(name));
    const target = el?.matches("input, textarea")
      ? el
      : el?.querySelector('[aria-checked="true"]') ?? el?.querySelector("button");
    target?.focus();
  };

  const scrollToTop = () => {
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 80) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  // After the step changes: jump to the first error if there is one,
  // otherwise move focus to the new step so keyboard users land in it.
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;

    if (pendingFocus.current) {
      focusField(pendingFocus.current);
      pendingFocus.current = null;
    } else {
      panelRef.current?.focus({ preventScroll: true });
      scrollToTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  useEffect(() => {
    if (status !== "sent") return;
    successRef.current?.focus({ preventScroll: true });
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  /* ---------- field state ---------- */

  const setFieldError = (name, message) =>
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });

  // Typing never creates a new error (that waits for blur or Continue),
  // but it clears or updates an error that is already showing.
  const update = (name, value) => {
    const next = { ...form, [name]: value };
    setForm(next);
    setSubmitError("");
    setErrors((prev) => {
      const out = { ...prev };
      for (const n of [name, ...(RELATED_FIELDS[name] ?? [])]) {
        if (!prev[n]) continue;
        const message = validateField(n, next);
        if (message) out[n] = message;
        else delete out[n];
      }
      return out;
    });
  };

  const handleBlur = (name) => () => setFieldError(name, validateField(name, form));

  const toggleService = (title) =>
    update(
      "servicesNeeded",
      form.servicesNeeded.includes(title)
        ? form.servicesNeeded.filter((s) => s !== title)
        : [...form.servicesNeeded, title]
    );

  // Props shared by every text field.
  const bind = (name) => ({
    id: fid(name),
    name,
    value: form[name],
    onChange: (e) => update(name, e.target.value),
    onBlur: handleBlur(name),
    error: errors[name],
  });

  /* ---------- navigation ---------- */

  const goTo = (target) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const focusFirstError = (stepIndex, stepErrors) => {
    const first = STEP_FIELDS[stepIndex].find((n) => stepErrors[n]);
    if (stepIndex === step) {
      focusField(first);
    } else {
      pendingFocus.current = first;
      goTo(stepIndex);
    }
  };

  const goNext = () => {
    const stepErrors = validateStep(0, form);
    setErrors((prev) => {
      const next = { ...prev };
      STEP_FIELDS[0].forEach((n) => delete next[n]);
      return { ...next, ...stepErrors };
    });
    if (Object.keys(stepErrors).length) focusFirstError(0, stepErrors);
    else goTo(1);
  };

  const handleStepClick = (i) => {
    if (i === step) return;
    if (i < step) goTo(i);
    else goNext();
  };

  /* ---------- submit ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    // Enter on step 1 means "Continue".
    if (step === 0) return goNext();

    const e0 = validateStep(0, form);
    const e1 = validateStep(1, form);
    const has0 = Object.keys(e0).length > 0;
    const has1 = Object.keys(e1).length > 0;
    if (has0 || has1) {
      setErrors({ ...e0, ...e1 });
      focusFirstError(has0 ? 0 : 1, has0 ? e0 : e1);
      return;
    }

    setStatus("sending");
    setSubmitError("");
    try {
      await submitQuote(cleanForm(form));
      setStatus("sent");
    } catch {
      setStatus("idle");
      setSubmitError(
        `We couldn't send your request. Try again, or call ${siteConfig.phone}.`
      );
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitError("");
    setDirection(1);
    setStep(0);
    setStatus("idle");
  };

  /* ---------- render ---------- */

  return (
    <MotionConfig reducedMotion="user">
    <div ref={topRef} className="scroll-mt-28">
      {status === "sent" ? (
        <motion.div
          ref={successRef}
          tabIndex={-1}
          role="status"
          variants={headerGroup}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="py-14 text-center outline-none sm:py-20"
        >
          <motion.div variants={popIn}>
            <SuccessMark />
          </motion.div>
          <motion.h2
            variants={rise}
            className="mt-6 text-3xl font-semibold tracking-tight text-ink"
          >
            Quote request received
          </motion.h2>
          <motion.p variants={rise} className="mx-auto mt-3 max-w-md text-muted">
            Thank you,{" "}
            <span className="font-medium text-deep">
              {form.fullName.trim()}
            </span>
            . Our team will review your project and reach out by{" "}
            <span className="font-medium text-forest">
              {form.preferredContactMethod}
            </span>
            .
          </motion.p>
          <motion.button
            variants={rise}
            type="button"
            onClick={handleReset}
            className="mt-8 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition hover:bg-deep"
          >
            Submit another request
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          variants={headerGroup}
          initial={reduce ? "show" : "hidden"}
          animate={show ? "show" : "hidden"}
        >
          <motion.h2
            variants={rise}
            className="text-2xl font-semibold tracking-tight text-ink sm:text-2xl"
          >
            Request a quote
          </motion.h2>
          <motion.p variants={rise} className="mt-1.5 text-sm text-muted">
            Two quick steps. Fields marked with * are required.
          </motion.p>

          <motion.div variants={rise} className="mt-8">
            <Stepper current={step} onSelect={handleStepClick} />
          </motion.div>

          <form
            noValidate
            onSubmit={handleSubmit}
            aria-label="Request a quote"
            className="mt-8"
          >
            <motion.div
              key={step}
              ref={panelRef}
              tabIndex={-1}
              role="group"
              aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}
              variants={panelVariants}
              custom={direction}
              initial={reduce ? "show" : "hidden"}
              animate={show ? "show" : "hidden"}
              className="outline-none"
            >
              {step === 0 ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <motion.div variants={fieldIn}>
                      <TextField
                        {...bind("fullName")}
                        label="Full name"
                        required
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Juan dela Cruz"
                      />
                    </motion.div>
                    <motion.div variants={fieldIn}>
                      <TextField
                        {...bind("companyName")}
                        label="Company name"
                        type="text"
                        autoComplete="organization"
                        placeholder="Optional"
                      />
                    </motion.div>
                    <motion.div variants={fieldIn}>
                      <TextField
                        {...bind("contactNumber")}
                        label="Contact number"
                        required
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="e.g. 0917 123 4567"
                      />
                    </motion.div>
                    <motion.div variants={fieldIn}>
                      <TextField
                        {...bind("email")}
                        label="Email address"
                        required={form.preferredContactMethod === "Email"}
                        type="email"
                        autoComplete="email"
                        placeholder="e.g. name@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={fieldIn}>
                    <GroupTitle>How should we reach you?</GroupTitle>
                    <ChipGroup
                      id={fid("preferredContactMethod")}
                      layoutId="method-chip"
                      label="Preferred contact method"
                      options={CONTACT_METHODS}
                      value={form.preferredContactMethod}
                      onChange={(v) => update("preferredContactMethod", v)}
                      invalid={!!errors.preferredContactMethod}
                      describedBy={
                        errors.preferredContactMethod
                          ? `${fid("preferredContactMethod")}-error`
                          : undefined
                      }
                    />
                    <FieldError
                      id={`${fid("preferredContactMethod")}-error`}
                      message={errors.preferredContactMethod}
                    />
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={fieldIn}>
                    <TextField
                      {...bind("projectLocation")}
                      label="Project location"
                      required
                      type="text"
                      placeholder="City or municipality"
                    />
                  </motion.div>

                  <motion.div variants={fieldIn} className="mt-5">
                    <FieldGroup
                      id={fid("servicesNeeded")}
                      label="Service needed"
                      required
                      hint="Select all that apply"
                      error={errors.servicesNeeded}
                    >
                      <MultiChipGroup
                        id={fid("servicesNeeded")}
                        label="Service needed"
                        options={SERVICE_OPTIONS}
                        values={form.servicesNeeded}
                        onToggle={toggleService}
                        invalid={!!errors.servicesNeeded}
                        describedBy={
                          errors.servicesNeeded
                            ? `${fid("servicesNeeded")}-error`
                            : undefined
                        }
                      />
                    </FieldGroup>
                  </motion.div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <motion.div variants={fieldIn}>
                      <TextField
                        {...bind("details")}
                        label="Material or service details"
                        type="text"
                        placeholder="e.g. Gravel G1, vibro sand, 10-wheeler dump"
                      />
                    </motion.div>
                    <motion.div variants={fieldIn}>
                      <TextField
                        {...bind("estimatedQuantity")}
                        label="Estimated quantity"
                        type="text"
                        placeholder="e.g. 50 cubic meters, 10 truckloads"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={fieldIn} className="mt-5">
                    <TextField
                      {...bind("description")}
                      label="Project description or notes"
                      multiline
                      rows={4}
                      counter={{
                        count: form.description.length,
                        max: LIMITS.description,
                      }}
                      placeholder="Timeline, site access constraints, or specific requirements"
                    />
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.div variants={rise} className="mt-10">
              {submitError && step === 1 && (
                <div
                  role="alert"
                  className="mb-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700"
                >
                  {submitError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                {step === 1 && (
                  <button
                    type="button"
                    onClick={() => goTo(0)}
                    disabled={sending}
                    className={secondaryBtn}
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                    Back
                  </button>
                )}

                {step === 0 ? (
                  <button key="next" type="submit" className={primaryBtn}>
                    <span>Continue</span>
                    <span className={`${btnIcon} group-hover:translate-x-0.5`}>
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                ) : (
                  <button
                    key="submit"
                    type="submit"
                    disabled={sending}
                    className={primaryBtn}
                  >
                    <span>{sending ? "Sending..." : "Request a quote"}</span>
                    <span className={`${btnIcon} group-hover:rotate-45`}>
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </form>
        </motion.div>
      )}
    </div>
    </MotionConfig>
  );
}