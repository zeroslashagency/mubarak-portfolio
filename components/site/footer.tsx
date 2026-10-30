import { ArrowUpRight } from "lucide-react";
import { asset, profile } from "@/lib/content";
import { CopyEmail } from "./copy-email";

export function Footer() {
  return (
    <footer className="mt-24 overflow-hidden bg-neutral-100">
      <div className="mx-auto grid max-w-page gap-12 px-6 pt-16 md:grid-cols-[1fr_auto] md:pt-20">
        <div>
          <h2 className="font-serif text-[2rem] leading-[1.2] text-neutral-900 md:text-[2.5625rem]">
            Building something with data or AI?
            <br />
            Let&apos;s talk.
          </h2>
          <div className="mt-8">
            <CopyEmail email={profile.email} />
          </div>
        </div>

        <div className="md:w-56">
          <p className="label">Connect with me</p>
          <ul className="mt-5 space-y-1">
            {profile.links.map((link) => (
              <li key={link.label}>
                <a
                  href={asset(link.href)}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-md py-1.5 text-[0.9375rem] text-neutral-700 transition-colors hover:text-neutral-900"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-page px-6">
        <div className="mt-16 flex flex-wrap justify-between gap-2 border-t border-neutral-200 py-6 md:mt-20">
          <p className="label">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="label">{profile.location}</p>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.24em] max-w-full select-none whitespace-nowrap text-center font-sans text-[22vw] font-medium leading-none tracking-[-0.04em] text-neutral-150 md:text-[16rem]"
      >
        {profile.firstName}
      </p>
    </footer>
  );
}
