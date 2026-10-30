import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Row, Section } from "@/components/site/list";
import { asset, certifications, education, experience, profile, tools } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <div className="mx-auto max-w-[760px] px-6 pt-16 md:pt-24">
      <img
        src={asset(profile.photo)}
        alt={profile.name}
        width={800}
        height={800}
        className="jiggle h-24 w-24 rounded-xl border border-neutral-200 object-cover"
      />
      <h1 className="mt-8 font-serif text-[2.25rem] leading-[1.15] text-neutral-900 md:text-[2.875rem]">
        I&apos;m {profile.firstName}, a {profile.role.toLowerCase()} in Chennai.
      </h1>
      <div className="mt-6 space-y-4 text-[1rem] leading-[1.65] text-neutral-600">
        <p>
          My background is electronics and communication engineering, which is where I first wired sensors to code
          and got hooked on what the data could tell me. Since then I have worked as a data science intern and a web
          design intern, and built projects in computer vision, recommendation and price prediction.
        </p>
        <p>
          I care about the whole path from a messy dataset to something a person can use: the model, the API around
          it, and the interface on top. Right now I am focused on machine learning, generative AI, computer vision and NLP.
        </p>
      </div>

      <Section title="Experience">
        {experience.map((entry) => <Row key={entry.name} entry={entry} />)}
      </Section>

      <Section title="Education">
        {education.map((entry) => <Row key={entry.name} entry={entry} />)}
      </Section>

      <Section title="Toolkit">
        <li className="flex flex-wrap gap-3 py-6">
          {tools.map((tool) => (
            <span
              key={tool.name}
              title={tool.name}
              className="jiggle flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-white"
            >
              <img src={asset(tool.icon)} alt={tool.name} className="h-6 w-6" />
            </span>
          ))}
        </li>
      </Section>

      <Section title="Certifications">
        {certifications.items.map((c) => (
          <li key={c.name} className="flex items-baseline justify-between gap-4 py-4">
            <span className="text-[0.9375rem] text-neutral-900">{c.name}</span>
            <span className="label shrink-0">{c.issuer}</span>
          </li>
        ))}
      </Section>
      <a
        href={certifications.href}
        target="_blank"
        rel="noreferrer"
        className="group mt-5 inline-flex items-center gap-1 text-[0.875rem] text-neutral-900"
      >
        All certifications on LinkedIn
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
