/**
 * ASK DAWN — DAWNISMS ENGINE
 * ===========================
 * Pure personality/tone layer. Nothing in this file ever supplies a
 * mortgage fact, number, rate, or eligibility claim — it only decides
 * *how* Dawn sounds around the approved facts, which always live
 * separately in `knowledge-base.ts` and are never touched here.
 *
 * Balance target: ~70% warm/professional, ~20% noticeable personality,
 * ~10% surprising. These pools are intentionally short — repetition
 * across a real conversation is fine, an overstuffed joke pool isn't.
 */

export type PersonalityPool =
  | "greeting"
  | "transition"
  | "goodQuestion"
  | "confusingJargon"
  | "unknown"
  | "seriousModeIntro"
  | "repeatQuestion"
  | "reverseMortgageIntro"
  | "triviaIntro"
  | "triviaMore"
  | "triviaMiss";

const pools: Record<PersonalityPool, string[]> = {
  greeting: [
    "Well, come on in. What are we figuring out?",
    "Pull up a chair. What's on your mind?",
    "Alright, let's talk houses.",
    "Okay, what've you got for me?",
    "Andiamo. Let's figure this thing out.",
    "Don't be shy. Ask me.",
    "Mortgage question? You've come to the right Italian.",
  ],
  transition: [
    "Alright, let's make this simple.",
    "Here's the part that actually matters.",
    "Let me translate that into normal-people English.",
    "Okay. Forget the mortgage mumbo jumbo for a minute.",
    "Here's what that really means.",
    "Va bene. Here's the plain-English version.",
    "Good question. This one's easier than it sounds.",
    "Let's take the alphabet soup out of it.",
  ],
  goodQuestion: [
    "Good question — I like this one.",
    "Now we're talking.",
    "Perfetto. This one's straightforward.",
  ],
  confusingJargon: [
    "APR, PMI, FHA... mamma mia. Mortgage people really do love their initials.",
    "Another three-letter mortgage word. Of course.",
    "Mortgage alphabet soup. Let me translate.",
    "Don't worry — there's no quiz at the end.",
  ],
  unknown: [
    "Fuggedaboutit — I'm not guessing when your home is involved. Let's get the real Dawn.",
    "Nope. I'm good, but I'm not making that one up. Let's get the real Dawn.",
    "That's above my pay grade. Let's get the real Dawn.",
    "I could make something up, but then Dawn would yell at me. Let's get the real Dawn.",
    "That's one for the woman herself. Let's get the real Dawn.",
    "Hold it right there — that needs a real conversation. Let's get the real Dawn.",
    "Better to ask Dawn than get cute with somebody's mortgage. Let's get the real Dawn.",
  ],
  seriousModeIntro: [
    "I'm glad you asked. Let's handle this carefully.",
    "This is important, so I'm going to keep this straightforward.",
  ],
  repeatQuestion: [
    "Didn't we just talk about this? Alright, one more time.",
    "Okay, okay. Let's go over it again.",
    "You testing me? I respect it. Here it is again.",
    "I've got time. Here it is again.",
  ],
  reverseMortgageIntro: [
    "There's a lot to think about here. Let me walk you through the basics.",
    "This one deserves a careful answer, not a sales pitch.",
    "Let's slow down and go through this one clearly.",
  ],
  triviaIntro: [
    "Alright, here's a little lagniappe.",
    "Now THIS I can talk about.",
    "Pull up a chair — Louisiana has stories.",
    "You came for a mortgage and now you're getting a history lesson. You're welcome.",
    "Okay, this one's pretty good.",
    "See? I know things besides mortgages.",
    "Careful — get me started on Louisiana and we'll be here all afternoon.",
  ],
  triviaMore: [
    "Want another?",
    "Got room for one more?",
    "I've got plenty more where that came from.",
  ],
  triviaMiss: [
    "I don't have that one in my back pocket yet — but here's some lagniappe anyway.",
    "Can't help you with that specific one, but I've got something else good.",
  ],
};

export function pick(pool: PersonalityPool): string {
  const options = pools[pool];
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Fixed, deliberately non-random hand-off for sensitive topics
 * (foreclosure, bereavement, hardship, etc.) — see `lib/ask-dawn/sensitive.ts`.
 * These never draw from the `unknown` pool or any other joke-adjacent
 * copy; the tone here is calm and controlled, no exceptions.
 */
export const sensitiveTopicEscalation =
  "This isn't something I'll guess about, and it deserves a real conversation, not a chatbot. Let's get you straight to Dawn.";

export function poolOptions(pool: PersonalityPool): string[] {
  return pools[pool];
}

/**
 * Chooses between the common "transition" line and the rarer
 * "goodQuestion" flourish — keeps the surprise line genuinely occasional.
 */
export function pickAnswerIntro(): string {
  return Math.random() < 0.2 ? pick("goodQuestion") : pick("transition");
}

// --- Logo-tap easter egg ----------------------------------------------
// Separate, older feature: repeatedly clicking the site logo. Unrelated
// to the typed-question Easter eggs in `easter-eggs.ts` — both coexist.
export const logoEasterEggLines = [
  "Okay, okay — I saw you the first time.",
  "Alright already, I'm here.",
  "Madonna, you really like that logo.",
  "Okay, you found the secret. Now ask me about a mortgage.",
  "Fuggedaboutit — I'm not giving you the family sauce recipe.",
];

export function pickLogoEasterEggLine(): string {
  return logoEasterEggLines[Math.floor(Math.random() * logoEasterEggLines.length)];
}
