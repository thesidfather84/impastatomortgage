/**
 * Single source of truth for all contact CTAs.
 * Every "Call Dawn" / "Text Dawn" / "Email Dawn" control in the app must import
 * from here rather than hardcoding a phone number or href.
 */

export const PHONE_DISPLAY = "985-502-6600";
export const PHONE_E164 = "+19855026600";

export const EMAIL_ADDRESS = "dawn@impastatomortgage.com";

export const contact = {
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_E164}`,
  smsHref: `sms:${PHONE_E164}`,
  emailAddress: EMAIL_ADDRESS,
  emailHref: `mailto:${EMAIL_ADDRESS}`,
} as const;

/**
 * Features that are not yet wired to a real backend/provider.
 * Keep this list honest — anything true here MUST render as clearly
 * "not yet configured" rather than a fake working form/button.
 */
export const unconfiguredFeatures = {
  onlineScheduling: {
    configured: false,
    label: "Schedule a Conversation",
    disabledMessage:
      "Online scheduling isn't set up yet. Please call or text Dawn directly to set up a time to talk.",
  },
  contactForm: {
    configured: false,
    label: "Send a Message",
    disabledMessage:
      "This form isn't connected yet. Please call, text, or email Dawn directly.",
  },
} as const;
