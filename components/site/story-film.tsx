"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, story } from "@/lib/content";
import { OpenThread, StoryArt } from "./story-art";

// Scene -1 is the cold open, story.length is the credits. Each chapter plays a title card, then the scene.
type Beat = "title" | "scene";

const TYPE_MS = 35;
const TITLE_MS = 1500;

function Typed({ lines, count }: { lines: string[]; count: number }) {
  let left = count;
  return (
    <>
      {lines.map((line, i) => {
        const shown = line.slice(0, Math.max(0, left));
        left -= line.length;
        return (
          <p key={i} className={shown ? "" : "invisible"}>
            {shown || line}
            {left < 0 && shown && <span className="ml-0.5 inline-block w-[0.5ch] animate-pulse bg-neutral-50/80">&nbsp;</span>}
          </p>
        );
      })}
    </>
  );
}

export function StoryFilm() {
  const still = useReducedMotion() ?? false;
  const router = useRouter();
  const [scene, setScene] = useState(-1);
  const [beat, setBeat] = useState<Beat>("title");
  const [count, setCount] = useState(0);
  const touchX = useRef<number | null>(null);

  const chapter = scene >= 0 && scene < story.length ? story[scene] : null;
  const total = chapter ? chapter.lines.join("").length : 0;
  const typing = beat === "scene" && count < total;

  const go = useCallback((to: number) => {
    setScene(Math.max(-1, Math.min(story.length, to)));
    setBeat("title");
    setCount(0);
  }, []);

  const next = useCallback(() => {
    if (!chapter) return scene < story.length && go(scene + 1);
    if (beat === "title") return setBeat("scene");
    if (typing) return setCount(total);
    go(scene + 1);
  }, [chapter, scene, beat, typing, total, go]);

  const prev = useCallback(() => go(scene - 1), [scene, go]);

  // Title card holds, then cuts to the scene on its own.
  useEffect(() => {
    if (!chapter || beat !== "title") return;
    const t = setTimeout(() => setBeat("scene"), still ? 600 : TITLE_MS);
    return () => clearTimeout(t);
  }, [chapter, beat, still]);

  useEffect(() => {
    if (beat !== "scene" || !chapter) return;
    if (still) return setCount(total);
    if (count >= total) return;
    const t = setTimeout(() => setCount((c) => c + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [beat, chapter, count, total, still]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        if ((e.target as HTMLElement).closest("a")) return;
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, router]);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: still ? 0.2 : 0.6 } };
  const key = chapter ? `${scene}-${beat}` : String(scene);

  return (
    <div
      role="region"
      aria-label="My story"
      className="fixed inset-0 z-50 flex cursor-pointer select-none flex-col bg-black text-neutral-50"
      onClick={(e) => !(e.target as HTMLElement).closest("a, button") && next()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current !== null && e.changedTouches[0].clientX - touchX.current > 60) {
          e.preventDefault();
          prev();
        }
        touchX.current = null;
      }}
    >
      <div className="h-[8vh] shrink-0 bg-black" />

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={key} {...fade} className="absolute inset-0">
            {scene === -1 && (
              <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                <OpenThread still={still} />
                <p className="relative font-mono text-[0.75rem] uppercase tracking-[0.4em] text-neutral-400">A film by {profile.name}</p>
                <h1 className="relative font-serif text-[2rem] leading-[1.15] md:text-[3.5rem]">The answer hiding in the data</h1>
                <p className="relative mt-6 text-[0.875rem] text-neutral-500">Click anywhere to begin</p>
              </div>
            )}

            {chapter && beat === "title" && (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.4em] text-neutral-500">{chapter.label}</p>
                <h2 className="font-serif text-[2rem] leading-[1.15] md:text-[3rem]">{chapter.title}</h2>
              </div>
            )}

            {chapter && beat === "scene" && (
              <>
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={{ scale: still ? 1 : 1.04 }}
                  transition={{ duration: 12, ease: "linear" }}
                >
                  <StoryArt art={chapter.art} still={still} />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-8 pt-20">
                  <div
                    aria-live="polite"
                    className="mx-auto max-w-[44ch] space-y-1 text-center text-[1.125rem] leading-[1.45] md:text-[1.375rem]"
                  >
                    <Typed lines={chapter.lines} count={count} />
                  </div>
                </div>
              </>
            )}

            {scene === story.length && (
              <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.4em] text-neutral-500">To be continued</p>
                <h2 className="max-w-[20ch] font-serif text-[1.75rem] leading-[1.2] md:text-[2.75rem]">
                  Building something with data or AI? Let&apos;s talk.
                </h2>
                <div className="mt-2 flex flex-wrap justify-center gap-3 text-[0.9375rem]">
                  <a href={`mailto:${profile.email}`} className="rounded-lg bg-neutral-50 px-4 py-2.5 text-neutral-900">
                    Say hello
                  </a>
                  <Link href="/" className="rounded-lg border border-neutral-700 px-4 py-2.5 hover:border-neutral-500">
                    See the work
                  </Link>
                  <button onClick={() => go(-1)} className="rounded-lg border border-neutral-700 px-4 py-2.5 hover:border-neutral-500">
                    Watch again
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex h-[8vh] shrink-0 items-center gap-4 px-5 font-mono text-[0.75rem] text-neutral-500 md:px-8">
        <Link href="/" className="hover:text-neutral-300">
          Esc to leave
        </Link>
        <div className="flex-1" />
        {chapter && (
          <span>
            {String(scene + 1).padStart(2, "0")} / {String(story.length).padStart(2, "0")}
          </span>
        )}
        {scene < story.length && <span className="hidden sm:inline">{scene === -1 ? "Click to start" : "Click for next"}</span>}
      </div>
    </div>
  );
}
