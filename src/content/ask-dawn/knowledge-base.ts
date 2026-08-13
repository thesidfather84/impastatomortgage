import type { KnowledgeItem } from "./types";
import { ARGENT_APPLICATION_URL } from "@/config/application";

/**
 * PHASE 1 APPROVED KNOWLEDGE BASE
 * ================================
 * These are general, widely-established educational definitions (the kind
 * published by HUD/CFPB), not Dawn-specific claims, rates, or eligibility
 * decisions. They are safe to publish as general education, but this file
 * has NOT yet been through a formal compliance sign-off — `reviewDate` is
 * intentionally null until Dawn/compliance reviews and dates each entry.
 *
 * Do not add an item here with a made-up rate, qualification claim, or
 * anything presented as individualized advice. If in doubt, set
 * `escalationRequired: true` so the UI leans toward "talk to Dawn."
 */
export const knowledgeBase: KnowledgeItem[] = [
  {
    id: "what-is-reverse-mortgage",
    questionVariants: [
      "what is a reverse mortgage",
      "reverse mortgage",
      "how does a reverse mortgage work",
      "explain reverse mortgage",
    ],
    approvedAnswer:
      "A reverse mortgage is a loan for homeowners — typically 62 or older — that lets you borrow against your home's equity without making monthly mortgage payments. The loan is repaid when you sell the home, permanently move out, or pass away. You remain responsible for property taxes, homeowners insurance, and upkeep. The most common type, a HECM, is insured by the FHA and requires HUD-approved counseling before closing.",
    topic: "Reverse Mortgage",
    sourceOrganization: "U.S. Department of Housing and Urban Development (HUD)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
    relatedLinks: [
      { label: "Reverse Mortgage overview", href: "/reverse-mortgage" },
      { label: "Helping Mom or Dad", href: "/family/helping-mom-or-dad" },
    ],
  },
  {
    id: "what-is-hecm",
    questionVariants: [
      "what is a hecm",
      "hecm",
      "home equity conversion mortgage",
    ],
    approvedAnswer:
      "HECM stands for Home Equity Conversion Mortgage — the most common type of reverse mortgage, insured by the FHA. It has specific rules, including a minimum age of 62 and a requirement to complete HUD-approved counseling before closing.",
    topic: "Reverse Mortgage",
    sourceOrganization: "U.S. Department of Housing and Urban Development (HUD)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
    relatedLinks: [{ label: "Reverse Mortgage overview", href: "/reverse-mortgage" }],
  },
  {
    id: "what-is-fha",
    questionVariants: ["what is fha", "fha loan", "what's fha", "fha"],
    approvedAnswer:
      "FHA stands for the Federal Housing Administration. An FHA loan is a mortgage insured by the FHA, which allows many lenders to offer more flexible down payment and credit requirements than a conventional loan. FHA loans are popular with first-time buyers, but they aren't the only option — Dawn can help you compare what fits your situation.",
    topic: "Loan Types",
    sourceOrganization: "U.S. Department of Housing and Urban Development (HUD)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
    relatedLinks: [{ label: "Buying a home", href: "/buy-a-home" }],
  },
  {
    id: "how-much-house-can-i-afford",
    questionVariants: [
      "how much house can i afford",
      "what can i afford",
      "affordability",
      "how much home can i afford",
    ],
    approvedAnswer:
      "In general, affordability depends on your income, your existing debts, your down payment, your credit history, and other monthly obligations — plus your own comfort level with a payment. There's no single number that applies to everyone. Dawn's Mortgage Compass can help point you in the right direction, but only Dawn, working from your real numbers, can tell you what you specifically qualify for.",
    topic: "Affordability",
    reviewDate: null,
    approved: true,
    complianceNotes: "General education only — no qualification or number should ever be stated here.",
    escalationRequired: true,
    relatedLinks: [{ label: "Try Dawn's Mortgage Compass", href: "/mortgage-compass" }],
  },
  {
    id: "what-is-closing-cost",
    questionVariants: [
      "what is closing cost",
      "closing costs",
      "what are closing costs",
    ],
    approvedAnswer:
      "Closing costs are the fees and expenses — beyond your down payment — that are due when you finalize a home purchase or refinance. They can include things like appraisal fees, title insurance, recording fees, and lender fees, and they vary by transaction. Dawn can walk you through an estimate for your specific loan.",
    topic: "Costs",
    sourceOrganization: "Consumer Financial Protection Bureau (CFPB)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
    relatedLinks: [{ label: "Ask Dawn directly", href: "/ask-dawn" }],
  },
  {
    id: "what-is-apr",
    questionVariants: [
      "what is apr",
      "i don't understand apr",
      "i dont understand apr",
      "apr",
      "explain apr",
    ],
    approvedAnswer:
      "APR stands for Annual Percentage Rate. It's meant to represent the yearly cost of a loan — including certain fees — expressed as a percentage, so it's usually a bit higher than the interest rate alone. It's a useful tool for comparing loan offers, but it isn't the only thing that matters. Dawn can help you understand how APR applies to your specific loan options.",
    topic: "Loan Terms",
    sourceOrganization: "Consumer Financial Protection Bureau (CFPB)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
  },
  {
    id: "what-is-dti",
    questionVariants: ["what is dti", "debt to income ratio", "dti"],
    approvedAnswer:
      "DTI stands for debt-to-income ratio — a comparison of your monthly debt payments to your monthly income. Lenders use it as one of several factors to understand how much additional debt you may be able to manage. It's one piece of the picture, not the whole picture.",
    topic: "Loan Terms",
    sourceOrganization: "Consumer Financial Protection Bureau (CFPB)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
  },
  {
    id: "what-is-ltv",
    questionVariants: ["what is ltv", "loan to value ratio", "ltv"],
    approvedAnswer:
      "LTV stands for loan-to-value ratio — the loan amount compared to the home's appraised value, shown as a percentage. It's one of the factors that can affect loan terms and whether mortgage insurance is required.",
    topic: "Loan Terms",
    sourceOrganization: "Consumer Financial Protection Bureau (CFPB)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
  },
  {
    id: "what-is-arm",
    questionVariants: [
      "what is arm",
      "adjustable rate mortgage",
      "arm loan",
    ],
    approvedAnswer:
      "ARM stands for Adjustable-Rate Mortgage — a loan where the interest rate can change over time, usually after an initial fixed period, based on market conditions. This is different from a fixed-rate mortgage, where the rate never changes.",
    topic: "Loan Types",
    sourceOrganization: "Consumer Financial Protection Bureau (CFPB)",
    reviewDate: null,
    approved: true,
    complianceNotes: "General public definition; pending formal Dawn/compliance sign-off.",
    escalationRequired: false,
  },
  {
    id: "helping-my-parents",
    questionVariants: [
      "i'm helping my parents",
      "im helping my parents",
      "helping my parents",
      "helping mom or dad",
      "parents home",
      "my parents home",
    ],
    approvedAnswer:
      "If you're helping a parent think through their home and finances, you're not alone — this comes up often. Dawn has a dedicated page that walks through common family questions in plain language, including what happens to the home, what heirs can expect, and what to ask before making a decision.",
    topic: "Family",
    reviewDate: null,
    approved: true,
    escalationRequired: false,
    relatedLinks: [{ label: "Helping Mom or Dad", href: "/family/helping-mom-or-dad" }],
  },
  {
    id: "can-i-refinance",
    questionVariants: ["can i refinance", "refinance", "should i refinance"],
    approvedAnswer:
      "People typically refinance to lower their monthly payment, change their loan term, or access home equity. Whether refinancing makes sense depends on your current loan, your goals, and today's terms — it's genuinely different for every homeowner. Dawn can walk through your specific situation with you.",
    topic: "Refinance",
    reviewDate: null,
    approved: true,
    complianceNotes: "General education only — no rate or savings claim should ever be stated here.",
    escalationRequired: true,
    relatedLinks: [{ label: "Refinance overview", href: "/refinance" }],
  },
  {
    id: "senior-paid-off-home-options",
    questionVariants: [
      "i'm 72 and my home is paid off what are my options",
      "im 72 and my home is paid off",
      "paid off home options",
      "retired home paid off",
      "home paid off options retirement",
    ],
    approvedAnswer:
      "Homeowners in this situation often explore a few different paths: staying put and simply enjoying a paid-off home, a reverse mortgage to access equity without monthly payments, a home equity loan or line of credit, or selling and moving to something that fits better. What makes sense depends entirely on your goals and circumstances — this is exactly the kind of question worth a real conversation with Dawn.",
    topic: "Reverse Mortgage",
    reviewDate: null,
    approved: true,
    complianceNotes: "General education only — must not imply eligibility or recommend a specific path.",
    escalationRequired: true,
    relatedLinks: [
      { label: "Reverse Mortgage overview", href: "/reverse-mortgage" },
      { label: "Home Equity / Options", href: "/home-equity" },
    ],
  },
  {
    id: "how-to-apply",
    questionVariants: [
      "i want to apply",
      "start application",
      "ready to apply",
      "how do i apply",
      "loan application",
      "apply for a mortgage",
      "how do i start my application",
    ],
    approvedAnswer:
      "When you're ready, applications are completed through Dawn's secure Argent Lending application portal — never on this website. It's the safe, official way to start, and Dawn can walk you through it directly if you have questions along the way.",
    topic: "Application",
    reviewDate: null,
    approved: true,
    complianceNotes:
      "Points to the verified Argent Lending application portal only — this site never collects application data (SSN, bank information, income documents, credit information) itself.",
    escalationRequired: false,
    relatedLinks: [{ label: "Start Your Secure Application", href: ARGENT_APPLICATION_URL }],
  },
];
