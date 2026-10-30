"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House } from "lucide-react";
import { asset, profile } from "@/lib/content";

const item =
  "whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.8125rem] transition-colors hover:text-neutral-900 sm:px-3";

export function Nav() {
  const path = usePathname();
  const active = (href: string) => path === href || path === `${href}/`;
  const on = (href: string) => (active(href) ? "bg-neutral-150 text-neutral-900" : "text-neutral-500");
  const current = (href: string) => (active(href) ? ("page" as const) : undefined);

  return (
    <header className="sticky top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className="flex max-w-full items-center gap-0.5 rounded-full border border-neutral-200 bg-white/80 p-1 backdrop-blur-md sm:gap-1"
      >
        <Link href="/" aria-label="Home" aria-current={current("/")} className={`${item} ${on("/")}`}>
          <House className="h-4 w-4" strokeWidth={1.75} />
        </Link>
        <Link href="/#work" className={`${item} text-neutral-500`}>
          Work
        </Link>
        <Link href="/about" aria-current={current("/about")} className={`${item} ${on("/about")}`}>
          About
        </Link>
        <a href={asset(profile.resume)} target="_blank" rel="noreferrer" className={`${item} text-neutral-500`}>
          Resume
        </a>
        {profile.openToWork && (
          <span className="ml-0.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-green-50 px-2.5 py-1.5 text-[0.75rem] text-green-700 sm:ml-1 sm:px-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Open to work
          </span>
        )}
      </nav>
    </header>
  );
}
