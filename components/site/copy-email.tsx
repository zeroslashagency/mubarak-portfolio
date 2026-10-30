"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 text-[1rem] text-neutral-900 underline-offset-4 hover:underline"
      >
        <Mail aria-hidden className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-150 hover:text-neutral-900 active:scale-95 motion-reduce:active:scale-100"
      >
        {state === "copied" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <span aria-live="polite" className={`label ${state === "failed" ? "text-neutral-700" : ""}`}>
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed, select the address instead" : ""}
      </span>
    </div>
  );
}
