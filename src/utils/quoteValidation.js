/**
 * Validation rules for the quote request form.
 * Pure functions only, so they can be reused or unit-tested without React.
 * Every rule returns an error message, or "" when the value is fine.
 */

export const LIMITS = {
  fullName: 80,
  companyName: 80,
  email: 120,
  projectLocation: 120,
  details: 150,
  estimatedQuantity: 80,
  description: 1000,
};

/** Which fields belong to which step (also defines the focus/error order). */
export const STEP_FIELDS = [
  ["fullName", "companyName", "contactNumber", "email", "preferredContactMethod"],
  ["projectLocation", "servicesNeeded", "details", "estimatedQuantity", "description"],
];

/** When a field changes, these fields may need re-checking too. */
export const RELATED_FIELDS = {
  contactNumber: ["preferredContactMethod"],
  preferredContactMethod: ["email", "contactNumber"],
};

/* ------------------------------------------------------------------ */
/* Patterns                                                            */
/* ------------------------------------------------------------------ */

// Letters (any language, incl. ñ and accents), spaces, . ' ’ -
const NAME_RE = /^[\p{L}][\p{L}\p{M}\s.'’-]*$/u;

// name@domain.tld, no spaces, no empty or doubled dots, TLD of 2+ characters
const EMAIL_RE =
  /^[^\s@.]+(?:\.[^\s@.]+)*@[^\s@.]+(?:\.[^\s@.]+)*\.[^\s@.]{2,}$/;

// Philippine numbers, after spaces/dashes/brackets are removed:
// mobile   0917 123 4567 | +63 917 123 4567 | 63917...
// landline 02 8123 4567  | (049) 123 4567    | +63 2 8123 4567
const MOBILE_RE = /^(?:\+?63|0)9\d{9}$/;
const LANDLINE_RE = /^(?:\+?63|0)[2-8]\d{8}$/;

const stripPhone = (v) => v.replace(/[\s\-().]/g, "");
const isMobile = (v) => MOBILE_RE.test(stripPhone(v));
const isPhone = (v) => isMobile(v) || LANDLINE_RE.test(stripPhone(v));

const tooLong = (v, key, label) =>
  v.length > LIMITS[key]
    ? `${label} must be ${LIMITS[key]} characters or fewer.`
    : "";

/* ------------------------------------------------------------------ */
/* Rules                                                               */
/* ------------------------------------------------------------------ */

const rules = {
  fullName(form) {
    const v = form.fullName.trim();
    if (!v) return "Enter your full name.";
    if (v.length < 2) return "That name is too short. Enter your full name.";
    if (!NAME_RE.test(v))
      return "Use letters only. Spaces, periods, hyphens and apostrophes are fine.";
    return tooLong(v, "fullName", "Name");
  },

  companyName(form) {
    return tooLong(form.companyName.trim(), "companyName", "Company name");
  },

  contactNumber(form) {
    const v = form.contactNumber.trim();
    if (!v) return "Enter a number we can reach you on.";
    if (!isPhone(v))
      return "Enter a valid Philippine number, like 0917 123 4567 or 02 8123 4567.";
    return "";
  },

  email(form) {
    const v = form.email.trim();
    if (!v) {
      // Optional, unless they asked to be contacted by email.
      return form.preferredContactMethod === "Email"
        ? "Enter your email address, since you chose email as your contact method."
        : "";
    }
    if (!EMAIL_RE.test(v))
      return "Enter a valid email address, like name@example.com.";
    return tooLong(v, "email", "Email");
  },

  preferredContactMethod(form) {
    const number = form.contactNumber.trim();
    // Only flag it once the number itself is a valid landline, so we don't
    // pile a second error on top of an already invalid number.
    if (
      form.preferredContactMethod === "SMS / Viber" &&
      number &&
      isPhone(number) &&
      !isMobile(number)
    ) {
      return "SMS and Viber need a mobile number. Update your number or choose another method.";
    }
    return "";
  },

  projectLocation(form) {
    const v = form.projectLocation.trim();
    if (!v) return "Enter the city or municipality where the work is.";
    if (v.length < 2)
      return "That location is too short. Enter a city or municipality.";
    return tooLong(v, "projectLocation", "Location");
  },

  servicesNeeded(form) {
    return form.servicesNeeded.length ? "" : "Select at least one service.";
  },

  details(form) {
    return tooLong(form.details.trim(), "details", "Details");
  },

  estimatedQuantity(form) {
    return tooLong(form.estimatedQuantity.trim(), "estimatedQuantity", "Quantity");
  },

  description(form) {
    return tooLong(form.description.trim(), "description", "Notes");
  },
};

/* ------------------------------------------------------------------ */
/* Public helpers                                                      */
/* ------------------------------------------------------------------ */

/** Error message for one field, or "". */
export const validateField = (name, form) => rules[name]?.(form) || "";

/** { fieldName: message } for the given fields. Valid fields are left out. */
export function validateFields(names, form) {
  const errors = {};
  for (const name of names) {
    const message = validateField(name, form);
    if (message) errors[name] = message;
  }
  return errors;
}

export const validateStep = (step, form) =>
  validateFields(STEP_FIELDS[step], form);

/** Trim every text value before the form is sent anywhere. */
export function cleanForm(form) {
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
}