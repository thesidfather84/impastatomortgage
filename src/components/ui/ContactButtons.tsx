import { contact } from "@/config/contact";
import { CtaButton } from "./CtaButton";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

type ContactButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function CallDawnButton({ variant = "primary", size, className }: ContactButtonProps) {
  return (
    <CtaButton href={contact.phoneHref} variant={variant} size={size} className={className}>
      Call Dawn
    </CtaButton>
  );
}

export function TextDawnButton({ variant = "secondary", size, className }: ContactButtonProps) {
  return (
    <CtaButton href={contact.smsHref} variant={variant} size={size} className={className}>
      Text Dawn
    </CtaButton>
  );
}

export function EmailDawnButton({ variant = "ghost", size, className }: ContactButtonProps) {
  return (
    <CtaButton href={contact.emailHref} variant={variant} size={size} className={className}>
      Email Dawn
    </CtaButton>
  );
}

export function ContactButtonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <CallDawnButton />
      <TextDawnButton />
      <EmailDawnButton />
    </div>
  );
}
