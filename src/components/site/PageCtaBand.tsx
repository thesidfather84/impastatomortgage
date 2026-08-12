import { ContactButtonRow } from "@/components/ui/ContactButtons";

export function PageCtaBand({
  title = "Have questions about your specific situation?",
  body = "This page is general education. Dawn can talk through your specific numbers and goals directly.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-cypress-100 bg-ivory-deep p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-cypress-900">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-cypress-700">{body}</p>
        <div className="mt-6 flex justify-center">
          <ContactButtonRow />
        </div>
      </div>
    </section>
  );
}
