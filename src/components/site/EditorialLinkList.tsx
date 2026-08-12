import Link from "next/link";

export type EditorialLinkItem = {
  href: string;
  title: string;
  description?: string;
  eyebrow?: string;
};

export function EditorialLinkList({ items }: { items: EditorialLinkItem[] }) {
  return (
    <ul className="divide-y divide-brass-400/20 border-y border-brass-400/20">
      {items.map((item, index) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-brass-100/20"
          >
            <div>
              {item.eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
                  {item.eyebrow}
                </p>
              )}
              <p className="mt-0.5 font-display text-xl font-semibold text-cypress-900 group-hover:text-brass-600 sm:text-2xl">
                {item.title}
              </p>
              {item.description && (
                <p className="mt-1 text-cypress-700">{item.description}</p>
              )}
            </div>
            <span className="shrink-0 font-display text-2xl text-brass-400/50 transition-colors group-hover:text-brass-500 sm:text-3xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
