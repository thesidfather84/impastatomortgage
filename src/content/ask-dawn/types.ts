export type KnowledgeItem = {
  id: string;
  /** Different phrasings a user might type for this question. */
  questionVariants: string[];
  /** The approved, plain-English answer. Never generated on the fly. */
  approvedAnswer: string;
  topic: string;
  sourceUrl?: string;
  sourceOrganization?: string;
  /** ISO date this answer was last reviewed for accuracy, or null if pending. */
  reviewDate: string | null;
  /** Must be true for the matcher to ever surface this item. */
  approved: boolean;
  complianceNotes?: string;
  /**
   * True when the honest answer depends on the person's specific situation.
   * The UI still shows the general educational answer, but pairs it with a
   * stronger nudge toward Dawn rather than presenting it as sufficient on
   * its own.
   */
  escalationRequired: boolean;
  relatedLinks?: { label: string; href: string }[];
};
