import { ContactButtonRow } from "@/components/ui/ContactButtons";
import { FleurDeLis } from "./motifs/FleurDeLis";

export function PageCtaBand({
  title = "Have questions about your specific situation?",
  body = "This page is general education. Dawn can talk through your specific numbers and goals directly.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-brass-400/40 bg-ivory-deep p-8 text-center sm:p-10">
        <FleurDeLis className="mx-auto h-5 w-5 text-brass-500" />
        <h2 className="mt-3 font-display text-2xl font-semibold text-cypress-900">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-cypress-700">{body}</p>
        <div className="mt-6 flex justify-center">
          <ContactButtonRow />
        </div>
      </div>
    </section>
  );
}
