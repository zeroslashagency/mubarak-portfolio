"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { asset, type Project } from "@/lib/content";

function Corners({ project }: { project: Project }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] md:p-5">
        <span>{project.year}</span>
        <span className="text-right">{project.status}</span>
      </div>
    </>
  );
}

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <section id="work" className="mx-auto max-w-page scroll-mt-24 px-6 pt-24 md:pt-32">
      <h2 className="text-center font-serif text-[2rem] leading-[1.2] text-neutral-900 md:text-[2.5625rem]">Featured work</h2>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start md:gap-12 lg:gap-16">
        <ol className="flex min-w-0 flex-col">
          {projects.map((project, i) => {
            const open = i === active;
            const panel = `work-panel-${project.slug}`;
            const head = `work-head-${project.slug}`;
            return (
              <li
                key={project.slug}
                className={`border-l-2 pl-5 transition-colors duration-300 motion-reduce:transition-none md:pl-6 ${
                  open ? "border-neutral-900" : "border-transparent"
                }`}
              >
                <h3 className={i > 0 ? "border-t border-neutral-200" : ""}>
                  <button
                    id={head}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={open}
                    aria-controls={panel}
                    className="block w-full py-5 text-left"
                  >
                    <span
                      className={`block font-serif text-[1.5rem] leading-[1.2] transition-colors motion-reduce:transition-none md:text-[1.75rem] ${
                        open ? "text-neutral-900" : "text-neutral-350 hover:text-neutral-600"
                      }`}
                    >
                      {project.title}
                    </span>
                  </button>
                </h3>

                <div
                  id={panel}
                  role="region"
                  aria-labelledby={head}
                  aria-hidden={!open}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-w-0 overflow-hidden">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-neutral-100 px-2 py-1 text-[0.75rem] leading-none text-neutral-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 max-w-[46ch] text-[1rem] leading-[1.6] text-neutral-600">{project.summary}</p>

                    <Link
                      href={`/projects/${project.slug}/`}
                      tabIndex={-1}
                      aria-hidden
                      className="relative mt-6 block aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 md:hidden"
                    >
                      <img
                        src={asset(project.image.src)}
                        alt=""
                        width={project.image.width}
                        height={project.image.height}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover object-top"
                      />
                      <Corners project={project} />
                    </Link>

                    <dl className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
                      <Stat label="Year" value={project.year} />
                      <Stat label="Team" value={project.team === 1 ? "Solo" : `${project.team} people`} />
                      <Stat label="Stack" value={`${project.stack.length} tools`} />
                    </dl>
                    <Link
                      href={`/projects/${project.slug}/`}
                      tabIndex={open ? 0 : -1}
                      className="group mb-6 mt-6 inline-flex items-center gap-1 text-[0.875rem] text-neutral-900"
                    >
                      Read case study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <Link
          href={`/projects/${current.slug}/`}
          aria-label={`Open ${current.title} case study`}
          className="relative hidden aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 md:sticky md:top-24 md:block"
        >
          {projects.map((project, i) => (
            <img
              key={project.slug}
              src={asset(project.image.src)}
              alt={i === active ? project.title : ""}
              width={project.image.width}
              height={project.image.height}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <Corners project={current} />
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="label">{label}</dt>
      <dd className="mt-2 truncate font-serif text-[1.125rem] text-neutral-900 sm:text-[1.375rem]">{value}</dd>
    </div>
  );
}
