export type CompassAnswers = {
  goal?: "buy" | "refinance" | "retirement" | "help-family" | "unsure";
  ownsHome?: "yes" | "no";
  homeValue?: "under-150k" | "150k-300k" | "300k-500k" | "500k-plus" | "not-sure";
  firstHome?: "yes" | "no";
  ageRange?: "under-62" | "62-70" | "71-80" | "80-plus" | "prefer-not-to-say";
  stage?: "exploring" | "actively-looking" | "under-contract" | "ready-to-talk";
};

export type CompassOption<K extends keyof CompassAnswers> = {
  value: NonNullable<CompassAnswers[K]>;
  label: string;
};

export type CompassStep = {
  id: keyof CompassAnswers;
  question: string;
  helpText?: string;
  options: CompassOption<keyof CompassAnswers>[];
  /** Whether this step should be shown, given the answers collected so far. */
  shouldShow: (answers: CompassAnswers) => boolean;
};

export const compassSteps: CompassStep[] = [
  {
    id: "goal",
    question: "What are you trying to do?",
    shouldShow: () => true,
    options: [
      { value: "buy", label: "Buy a home" },
      { value: "refinance", label: "Refinance" },
      { value: "retirement", label: "Use my home for retirement" },
      { value: "help-family", label: "Help a family member" },
      { value: "unsure", label: "I'm not sure yet" },
    ],
  },
  {
    id: "ownsHome",
    question: "Do you currently own a home?",
    shouldShow: () => true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "homeValue",
    question: "What's the approximate value of the home involved?",
    helpText: "A rough range is fine — this is just to help point you in the right direction.",
    shouldShow: (a) => a.ownsHome === "yes",
    options: [
      { value: "under-150k", label: "Under $150,000" },
      { value: "150k-300k", label: "$150,000–$300,000" },
      { value: "300k-500k", label: "$300,000–$500,000" },
      { value: "500k-plus", label: "$500,000+" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "firstHome",
    question: "Would this be your first home?",
    shouldShow: (a) => a.goal === "buy",
    options: [
      { value: "yes", label: "Yes, first home" },
      { value: "no", label: "No, I've owned before" },
    ],
  },
  {
    id: "ageRange",
    question: "What's your approximate age range?",
    helpText: "We only ask because reverse mortgages have a minimum age requirement.",
    shouldShow: (a) => a.goal === "retirement" || a.goal === "help-family",
    options: [
      { value: "under-62", label: "Under 62" },
      { value: "62-70", label: "62–70" },
      { value: "71-80", label: "71–80" },
      { value: "80-plus", label: "80+" },
      { value: "prefer-not-to-say", label: "Prefer not to say" },
    ],
  },
  {
    id: "stage",
    question: "Where are you in the process?",
    shouldShow: () => true,
    options: [
      { value: "exploring", label: "Just exploring" },
      { value: "actively-looking", label: "Actively looking" },
      { value: "under-contract", label: "Under contract" },
      { value: "ready-to-talk", label: "Ready to talk with Dawn" },
    ],
  },
];
