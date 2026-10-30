import { asset, profile, tools } from "@/lib/content";

const corners = ["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];
const python = tools.find((t) => t.name === "Python");

export function Hero() {
  return (
    <section className="relative mx-auto max-w-page overflow-x-clip px-6 pt-12 md:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 aspect-square w-[min(1100px,140vw)] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-b from-neutral-100 to-transparent"
      />

      <div className="relative border border-neutral-200 bg-neutral-50/60">
        <div aria-hidden className="grid-faint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        {corners.map((pos) => (
          <span key={pos} aria-hidden className={`absolute h-2 w-2 border border-neutral-300 bg-white ${pos}`} />
        ))}

        <div className="relative px-5 py-14 text-center sm:px-10 md:py-20 lg:py-24">
          <p className="font-serif text-[1.0625rem] text-neutral-500 md:text-[1.25rem]">Hi, I&apos;m {profile.firstName}</p>
          <h1 className="mx-auto mt-4 max-w-[22ch] text-balance font-serif text-[2.125rem] leading-[1.15] text-neutral-900 sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem]">
            I build software that learns from data.
          </h1>
          <p className="mx-auto mt-6 max-w-[34ch] text-balance text-[1rem] leading-[1.6] text-neutral-600 sm:max-w-[56ch] md:text-[1.125rem]">
            {profile.role} working on {profile.focus[0]} and {profile.focus[1]} with{" "}
            <span className="whitespace-nowrap font-medium text-neutral-900">
              {python && (
                <img
                  src={asset(python.icon)}
                  alt=""
                  aria-hidden
                  className="mr-1 inline-block h-[1.05em] w-[1.05em] align-[-0.15em]"
                />
              )}
              Python
            </span>
            , based in {profile.location}.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:mt-14">
        <ul className="marquee flex w-max gap-10 md:gap-14">
          {[...tools, ...tools].map((tool, i) => (
            <li key={i} aria-hidden={i >= tools.length} className="flex items-center gap-2 whitespace-nowrap">
              <img src={asset(tool.icon)} alt="" className="h-5 w-5 opacity-70 grayscale" />
              <span className="text-[0.875rem] text-neutral-500">{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
