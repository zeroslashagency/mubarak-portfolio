import { ArrowUpRight } from "lucide-react";
import { asset, type Entry } from "@/lib/content";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-16">
      <h2 className="label">{title}</h2>
      <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">{children}</ul>
    </section>
  );
}

export function Row({ entry }: { entry: Entry }) {
  const initials = entry.name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <li className="flex items-center gap-4 py-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white font-mono text-[0.75rem] text-neutral-600">
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 text-[0.9375rem] font-medium text-neutral-900">
          {entry.href ? (
            <a href={asset(entry.href)} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1">
              {entry.name}
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-900" />
            </a>
          ) : (
            entry.name
          )}
        </p>
        <p className="mt-0.5 text-[0.875rem] text-neutral-500">
          {entry.detail} · {entry.place}
        </p>
      </div>
      <span className="label shrink-0 text-right">{entry.period}</span>
    </li>
  );
}
