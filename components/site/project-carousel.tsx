import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { asset, type Project } from "@/lib/content";

export function ProjectCarousel({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <section className="mx-auto max-w-page pt-24 md:pt-32">
      <h2 className="px-6 font-serif text-[1.8125rem] leading-[1.2] text-neutral-900 md:text-[2.25rem]">{title}</h2>

      <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-2 md:mt-10">
        {projects.map((project) => (
          <li key={project.slug} className="w-[84vw] max-w-[420px] shrink-0 snap-start sm:w-[420px] lg:w-[calc((100%-48px)/3)] lg:max-w-none">
            <Link href={`/projects/${project.slug}/`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                <img
                  src={asset(project.image.src)}
                  alt={project.title}
                  width={project.image.width}
                  height={project.image.height}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="pill">{tag}</span>
                ))}
              </div>
              <h3 className="mt-3 font-serif text-[1.25rem] leading-[1.25] text-neutral-900">{project.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-[1.5] text-neutral-600">{project.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[0.8125rem] text-neutral-900">
                  View case study
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="label">{project.year}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
