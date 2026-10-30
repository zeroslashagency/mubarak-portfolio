"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { asset, profile } from "@/lib/content";

// Photos start as one tilted pile and spread out. Coordinates are px on a fixed canvas
// (desktop 1440x706, mobile 390x706). Add `src` to a placeholder to drop a real photo in.
type Pt = { x: number; y: number };
type Desk = { w: number; h: number; stack: Pt; spread: Pt; r: number; src?: string };
type Mob = { w: [number, number]; h: [number, number]; stack: Pt; spread: Pt; r: [number, number]; src?: string };

const photo = asset(profile.photo);

const desk: Desk[] = [
  { w: 220, h: 300, stack: { x: 610, y: 203 }, spread: { x: 1097, y: -133 }, r: 12 },
  { w: 220, h: 300, stack: { x: 610, y: 203 }, spread: { x: 1196, y: 378 }, r: -7 },
  { w: 220, h: 300, stack: { x: 609, y: 203 }, spread: { x: 123, y: -131 }, r: -8 },
  { w: 180, h: 240, stack: { x: 630, y: 233 }, spread: { x: 6, y: 34 }, r: 14 },
  { w: 220, h: 300, stack: { x: 610, y: 203 }, spread: { x: 30, y: 410 }, r: -6 },
  { w: 180, h: 240, stack: { x: 630, y: 233 }, spread: { x: 236, y: 503 }, r: 14 },
  { w: 220, h: 280, stack: { x: 610, y: 213 }, spread: { x: 653, y: 556 }, r: -15 },
  { w: 180, h: 240, stack: { x: 630, y: 233 }, spread: { x: 1070, y: 514 }, r: 8 },
  { w: 180, h: 240, stack: { x: 630, y: 233 }, spread: { x: 1247, y: -10 }, r: -24 },
  { w: 229, h: 292, stack: { x: 605, y: 207 }, spread: { x: 630, y: -130 }, r: 0, src: photo },
];

const mob: Mob[] = [
  { w: [108, 108], h: [152, 152], stack: { x: 141, y: 277 }, spread: { x: -25, y: -51 }, r: [-12, 12] },
  { w: [108, 108], h: [152, 152], stack: { x: 141, y: 277 }, spread: { x: -23, y: 515 }, r: [12, -12] },
  { w: [92, 92], h: [132, 132], stack: { x: 149, y: 287 }, spread: { x: -30, y: 41 }, r: [12, -12] },
  { w: [92, 92], h: [132, 132], stack: { x: 149, y: 287 }, spread: { x: -33, y: 607 }, r: [-12, 12] },
  { w: [146, 108], h: [206, 152], stack: { x: 122, y: 250 }, spread: { x: 307, y: -51 }, r: [12, -12] },
  { w: [146, 108], h: [206, 152], stack: { x: 122, y: 250 }, spread: { x: 305, y: 511 }, r: [-12, 12] },
  { w: [136, 92], h: [195, 132], stack: { x: 127, y: 256 }, spread: { x: 327, y: 41 }, r: [-12, 12] },
  { w: [144, 92], h: [207, 132], stack: { x: 123, y: 250 }, spread: { x: 330, y: 603 }, r: [5, -12] },
  { w: [155, 132], h: [209, 178], stack: { x: 118, y: 249 }, spread: { x: 130, y: 572 }, r: [4, 7] },
  { w: [160, 160], h: [204, 204], stack: { x: 115, y: 251 }, spread: { x: 115, y: -61 }, r: [0, 0], src: photo },
];

const card = "absolute left-0 top-0 overflow-hidden border border-neutral-300 bg-neutral-200 shadow-[0_3px_8px_rgba(0,0,0,0.25)] will-change-transform";

// Temporary looping art for cards without a photo. SMIL keeps it off the JS thread.
const ink = "#a3a3a3";
const dot = "#16a34a";

function Loop({ v, still }: { v: number; still: boolean }) {
  const a = (el: ReactNode) => (still ? null : el);
  const art = [
    <g key="orbit">
      <circle cx="50" cy="65" r="26" fill="none" stroke={ink} strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="50" cy="65" r="6" fill={ink} />
      <circle cx="76" cy="65" r="4" fill={dot}>
        {a(<animateTransform attributeName="transform" type="rotate" from="0 50 65" to="360 50 65" dur="6s" repeatCount="indefinite" />)}
      </circle>
    </g>,
    <g key="wave" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round">
      {[50, 65, 80].map((y, i) => (
        <path key={y} d={`M10 ${y} q10 -12 20 0 t20 0 t20 0 t20 0`} strokeDasharray="8 6" opacity={1 - i * 0.25}>
          {a(<animate attributeName="stroke-dashoffset" from="0" to="-28" dur={`${1.6 + i * 0.6}s`} repeatCount="indefinite" />)}
        </path>
      ))}
    </g>,
    <g key="nodes">
      <path d="M25 40 L75 55 L35 95 Z M75 55 L70 100" fill="none" stroke={ink} strokeWidth="1.5" />
      {[[25, 40], [75, 55], [35, 95], [70, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={i === 1 ? dot : ink}>
          {a(<animate attributeName="r" values="3;6;3" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />)}
        </circle>
      ))}
    </g>,
    <g key="code">
      {[[18, 40, 46], [26, 52, 40], [26, 64, 30], [18, 76, 36]].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height="5" rx="2.5" fill={ink} />
      ))}
      <rect x="58" y="74" width="3" height="9" fill={dot}>
        {a(<animate attributeName="opacity" values="1;1;0;0" dur="1s" repeatCount="indefinite" />)}
      </rect>
    </g>,
    <g key="bars">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={20 + i * 13} y="45" width="8" height="40" rx="3" fill={i === 2 ? dot : ink}>
          {a(<animate attributeName="height" values="12;40;20;34;12" dur="1.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />)}
          {a(<animate attributeName="y" values="73;45;65;51;73" dur="1.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />)}
        </rect>
      ))}
    </g>,
    <g key="gear" fill="none" stroke={ink} strokeWidth="6">
      <circle cx="50" cy="65" r="18" strokeDasharray="7 5">
        {a(<animateTransform attributeName="transform" type="rotate" from="0 50 65" to="360 50 65" dur="8s" repeatCount="indefinite" />)}
      </circle>
      <circle cx="50" cy="65" r="5" fill={dot} stroke="none" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
      {art[v % art.length]}
    </svg>
  );
}

function Fill({ src, v, still }: { src?: string; v: number; still: boolean }) {
  return src ? (
    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-[60%_center]" />
  ) : (
    <Loop v={v} still={still} />
  );
}

function DeskCard({ c, z, p, still }: { c: Desk; z: number; p: MotionValue<number>; still: boolean }) {
  const x = useTransform(p, [0, 1], [c.stack.x, c.spread.x]);
  const y = useTransform(p, [0, 1], [c.stack.y, c.spread.y]);
  return (
    <motion.div aria-hidden className={`${card} rounded-xl`} style={{ width: c.w, height: c.h, x, y, rotate: c.r, zIndex: z }}>
      <Fill src={c.src} v={z} still={still} />
    </motion.div>
  );
}

function MobCard({ c, z, p, still }: { c: Mob; z: number; p: MotionValue<number>; still: boolean }) {
  const x = useTransform(p, [0, 1], [c.stack.x, c.spread.x]);
  const y = useTransform(p, [0, 1], [c.stack.y, c.spread.y]);
  const width = useTransform(p, [0, 1], c.w);
  const height = useTransform(p, [0, 1], c.h);
  const rotate = useTransform(p, [0, 1], c.r);
  return (
    <motion.div aria-hidden className={`${card} rounded-lg`} style={{ width, height, x, y, rotate, zIndex: z }}>
      <Fill src={c.src} v={z} still={still} />
    </motion.div>
  );
}

function Copy({ small }: { small?: boolean }) {
  return (
    <>
      <p className={`font-serif leading-[1.2] text-neutral-900 ${small ? "text-[1.5rem]" : "text-[2.5rem]"}`}>
        Based in Chennai, looking for <br className={small ? "hidden" : ""} />
        the answer hiding in the data.
      </p>
      <p className={`mt-4 leading-[1.4] text-neutral-600 ${small ? "text-[1rem]" : "mx-auto max-w-[62ch] text-[1.125rem]"}`}>
        I studied electronics and communication, then moved into machine learning through internships in data science
        and web design. Now I build models for vision, recommendations and prediction, and the apps around them.
      </p>
      <div className={`flex justify-center gap-3 ${small ? "mt-8 text-[0.875rem]" : "mt-10 text-[1rem]"}`}>
        <Link
          href="/about"
          className={`inline-flex rounded-lg bg-neutral-900 px-4 text-neutral-50 transition-colors hover:bg-neutral-750 ${small ? "py-2" : "py-2.5"}`}
        >
          Know more
        </Link>
        <Link
          href="/me"
          className={`inline-flex rounded-lg border border-neutral-300 px-4 text-neutral-900 transition-colors hover:border-neutral-500 ${small ? "py-2" : "py-2.5"}`}
        >
          Watch my story
        </Link>
      </div>
    </>
  );
}

// Desktop: the stage pins for 200vh of scroll. Entering the pin snaps the pile open, leaving it upward snaps it shut.
function Desktop({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useMotionValue(still ? 1 : 0);
  const p = useSpring(target, { stiffness: 100, damping: 22, mass: 0.75 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => !still && target.set(v > 0.04 ? 1 : 0));
  const opacity = useTransform(p, [0.4, 0.6], [0, 1]);
  const pointerEvents = useTransform(p, (v) => (v < 0.4 ? "none" : "auto"));
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (still) {
      target.set(1);
      p.jump(1);
    }
  }, [still, target, p]);

  // The spread layout spans ~1440x980px; shrink the canvas so no card is cut off on smaller screens.
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 32) / 1440, (window.innerHeight - 24) / 980));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div ref={ref} className="relative hidden h-[300vh] md:block">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-neutral-100">
        <div className="relative h-[706px] w-[1440px] shrink-0" style={{ scale }}>
          <motion.div className="absolute left-[283px] top-[230px] w-[874px] text-center" style={{ opacity, pointerEvents }}>
            <Copy />
          </motion.div>
          {desk.map((c, i) => (
            <DeskCard key={i} c={c} z={i + 1} p={p} still={still} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile: progress follows scroll position directly, smoothed by a spring.
function Mobile({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useMotionValue(still ? 1 : 0);
  const p = useSpring(target, { stiffness: 120, damping: 20, mass: 0.6 });
  const opacity = useTransform(p, [0.4, 0.6], [0, 1]);
  const pointerEvents = useTransform(p, (v) => (v < 0.4 ? "none" : "auto"));

  useEffect(() => {
    if (still) {
      target.set(1);
      p.jump(1);
      return;
    }
    const update = () => {
      if (!ref.current) return;
      const { top } = ref.current.getBoundingClientRect();
      target.set(Math.max(0, Math.min(1, (window.innerHeight - 282 - top) / 424)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [still, target, p]);

  return (
    <div className="mb-24 mt-20 overflow-x-clip md:hidden">
      <div ref={ref} className="relative mx-auto h-[706px] w-[390px] bg-neutral-100">
        <motion.div className="absolute left-3 top-[222px] z-[5] w-[366px] text-center" style={{ opacity, pointerEvents }}>
          <Copy small />
        </motion.div>
        {mob.map((c, i) => (
          <MobCard key={i} c={c} z={i + 1} p={p} still={still} />
        ))}
      </div>
    </div>
  );
}

export function AboutTeaser() {
  const still = useReducedMotion() ?? false;
  return (
    <section aria-label="About">
      <Desktop still={still} />
      <Mobile still={still} />
    </section>
  );
}
