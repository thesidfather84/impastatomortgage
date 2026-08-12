import { describe, expect, it } from "vitest";
import { contact, PHONE_E164 } from "@/config/contact";

describe("contact config", () => {
  it("produces a valid tel: URL for Call Dawn", () => {
    expect(contact.phoneHref).toBe(`tel:${PHONE_E164}`);
    expect(contact.phoneHref).toBe("tel:+19855026600");
  });

  it("produces a valid sms: URL for Text Dawn", () => {
    expect(contact.smsHref).toBe(`sms:${PHONE_E164}`);
    expect(contact.smsHref).toBe("sms:+19855026600");
  });

  it("produces a valid mailto: URL for Email Dawn", () => {
    expect(contact.emailHref).toBe("mailto:dawn@impastatomortgage.com");
  });
});
