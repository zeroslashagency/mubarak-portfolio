import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-page flex-col items-center justify-center px-6 text-center">
      <p className="label">404</p>
      <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.2] text-neutral-900">This page wandered off.</h1>
      <Link href="/" className="mt-8 text-[0.875rem] text-neutral-600 underline underline-offset-4 hover:text-neutral-900">
        Back home
      </Link>
    </section>
  );
}
