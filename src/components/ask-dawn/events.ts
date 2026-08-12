/** Fired by the logo easter egg; AskDawnWidget listens and responds. */
export const ASK_DAWN_EASTER_EGG_EVENT = "ask-dawn:easter-egg";

/** Fired to programmatically open Ask Dawn with an optional prefilled question. */
export const ASK_DAWN_OPEN_EVENT = "ask-dawn:open";

export type AskDawnOpenDetail = {
  question?: string;
};
