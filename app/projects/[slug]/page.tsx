import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { asset, findProject, projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function CaseStudy({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const lowRes = project.image.width < 800;

  return (
    <article className="mx-auto max-w-page px-6 pt-12 md:pt-16">
      <Link href="/#work" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" />
        All work
      </Link>

      <header className="mt-10 max-w-[760px]">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}
        </div>
        <h1 className="mt-5 font-serif text-[2.25rem] leading-[1.15] text-neutral-900 md:text-[3.25rem]">{project.title}</h1>
        <p className="mt-5 text-[1.125rem] leading-[1.55] text-neutral-600">{project.summary}</p>
      </header>

      <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 md:grid-cols-4">
        <Meta label="Year" value={project.year} />
        <Meta label="Team" value={project.team === 1 ? "Solo" : `${project.team} people`} />
        <Meta label="Type" value={project.status} />
        <div>
          <dt className="label">Code</dt>
          <dd className="mt-2 text-[0.9375rem] text-neutral-900">
            {project.repo ? (
              <a href={project.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1">
                GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ) : (
              <span className="text-neutral-500">Private</span>
            )}
          </dd>
        </div>
      </dl>

      <div className={`mt-10 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 ${lowRes ? "mx-auto max-w-[520px]" : ""}`}>
        <img
          src={asset(project.image.src)}
          alt={project.title}
          width={project.image.width}
          height={project.image.height}
          className="h-auto w-full"
        />
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <section>
          <h2 className="label">Overview</h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-neutral-700">{project.overview}</p>
          <h2 className="label mt-12">What I built</h2>
          <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
            {project.highlights.map((h) => (
              <li key={h} className="py-3.5 text-[0.9375rem] leading-[1.5] text-neutral-700">{h}</li>
            ))}
          </ul>
        </section>
        <aside>
          <h2 className="label">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => <li key={s} className="pill">{s}</li>)}
          </ul>
        </aside>
      </div>

      <Link href={`/projects/${next.slug}/`} className="group mt-24 block border-t border-neutral-200 pt-8">
        <span className="label">Next project</span>
        <span className="mt-3 flex items-center gap-2 font-serif text-[1.8125rem] leading-[1.2] text-neutral-900">
          {next.title}
          <ArrowUpRight className="h-6 w-6 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
        </span>
      </Link>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-2 text-[0.9375rem] text-neutral-900">{value}</dd>
    </div>
  );
}
