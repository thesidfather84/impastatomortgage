/**
 * ASK DAWN — CONVERSATIONAL EASTER EGGS
 * =======================================
 * Fun, off-topic Q&A pairs a visitor can stumble onto by typing something
 * besides a mortgage question. These are hand-written, fixed responses —
 * never generated — and the matcher (`lib/ask-dawn/easter-eggs.ts`)
 * requires every trigger word to be present, so these can never
 * accidentally fire on a real mortgage question.
 *
 * Unrelated to the logo-tap easter egg in `personality.ts` — both exist
 * side by side.
 */
export type EasterEgg = {
  id: string;
  /** Each trigger phrase must have ALL of its words present in the query. */
  triggers: string[];
  answer: string;
};

export const easterEggs: EasterEgg[] = [
  {
    id: "family-sauce-recipe",
    triggers: ["family sauce recipe", "sauce recipe", "gravy recipe"],
    answer:
      "Fuggedaboutit — the family sauce recipe stays in the family. Ask me about mortgages instead; I'm much more forthcoming there.",
  },
  {
    id: "whats-for-dinner",
    triggers: ["what's for dinner", "whats for dinner"],
    answer:
      "Something with garlic in it, probably. Now — what can I help you figure out about your home?",
  },
  {
    id: "are-you-italian",
    triggers: ["are you italian"],
    answer:
      "Through and through. Louisiana roots, Italian heritage — it's the whole reason mortgages sound like alphabet soup to everyone but me.",
  },
  {
    id: "godfather-offer",
    triggers: ["offer i can't refuse", "offer i cant refuse", "make me an offer i can't refuse"],
    answer:
      "The only offer I'm making is a plain-English answer to your mortgage question. No horse heads involved.",
  },
  {
    id: "godfather-knowledge",
    triggers: ["keep your friends close"],
    answer:
      "Keep your friends close, and keep your mortgage documents closer. That one I stand by.",
  },
  {
    id: "whos-the-boss",
    triggers: ["who's the boss", "whos the boss", "who is the boss"],
    answer:
      "Dawn's the boss. I just answer the phone — well, the chat window.",
  },
  {
    id: "who-is-the-real-dawn",
    triggers: ["who is the real dawn", "who's the real dawn", "whos the real dawn"],
    answer:
      "Dawn Impastato — a real Louisiana mortgage professional with decades of real-estate experience, currently originating loans through Argent Lending LLC. I'm just the first stop before you talk to her.",
  },
  {
    id: "do-you-sleep",
    triggers: ["do you sleep", "do you ever sleep"],
    answer:
      "Never. Which is convenient for you and slightly concerning for me.",
  },
  {
    id: "million-dollars",
    triggers: ["million dollars"],
    answer:
      "If I had a million dollars I'd still tell you to talk to Dawn before making a mortgage decision with it.",
  },
  {
    id: "can-you-cook",
    triggers: ["can you cook"],
    answer:
      "I know my way around a mortgage a lot better than I know my way around a stove. Dawn's family, though — they can cook.",
  },
  {
    id: "tell-me-a-secret",
    triggers: ["tell me a secret"],
    answer:
      "Here's one: most people overthink the mortgage part and underthink the budget part. Now you know.",
  },
  {
    id: "do-you-like-new-orleans",
    triggers: ["do you like new orleans"],
    answer:
      "I love it — French Quarter balconies, the streetcars, the whole thing. It's hard not to when it's home.",
  },
  {
    id: "northshore-southshore-food",
    triggers: ["northshore or southshore food", "northshore vs southshore food", "northshore southshore food"],
    answer:
      "I'm not touching that debate. Both sides of the lake eat well, and I intend to stay on good terms with everybody.",
  },
  {
    id: "geaux-tigers",
    triggers: ["geaux tigers"],
    answer:
      "Geaux Tigers. Now — got a mortgage question for me, or just checking my school spirit?",
  },
];
