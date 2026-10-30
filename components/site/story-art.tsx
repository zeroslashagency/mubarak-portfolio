"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { asset, tools, type Art } from "@/lib/content";

// Animated scenes for the /me film. One green thread is the timeline: it sprouts, branches, turns into
// circuit traces, explodes into software, and is finally woven into a tree.

const G = "#4dff9a";
const INK = "#e7e5e4";
const DIM = "#78716c";
const PANEL = "#0c0a09";
const f = (n: number) => n.toFixed(1);
const ease = "easeInOut" as const;

// Seeded so the branches grow the same way on every visit.
function rng(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

type S = { still: boolean };

function Thread({ d, w = 3, delay = 0, dur = 1.4, o = 1, still }: S & { d: string; w?: number; delay?: number; dur?: number; o?: number }) {
  const draw = still ? {} : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: dur, delay, ease } };
  return (
    <g opacity={o} fill="none" stroke={G} strokeLinecap="round">
      <motion.path d={d} strokeWidth={w * 5} strokeOpacity={0.12} {...draw} />
      <motion.path d={d} strokeWidth={w} {...draw} />
    </g>
  );
}

function Show({ delay = 0, y = 0, still, children }: S & { delay?: number; y?: number; children: ReactNode }) {
  if (still) return <g>{children}</g>;
  return (
    <motion.g initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.g>
  );
}

// Limbs are 5-point polylines (hand, elbow, shoulder, elbow, hand) so poses morph into each other.
const LEGS = "M -22 0 L -12 -26 L 0 -52 L 12 -26 L 22 0";
const POSE = {
  stand: { arms: "M -30 -62 L -24 -88 L 0 -112 L 24 -88 L 30 -62", legs: LEGS },
  type: { arms: "M 34 -80 L 16 -94 L 0 -112 L 36 -98 L 68 -86", legs: LEGS },
  reach: { arms: "M -84 -168 L -46 -128 L 0 -112 L 46 -128 L 84 -168", legs: LEGS },
  sit: { arms: "M -48 -64 L -38 -90 L 0 -112 L 38 -90 L 48 -64", legs: "M -32 0 L -32 -40 L 0 -52 L 32 -40 L 32 0" },
};

function Figure({ x, y, s = 1, pose = "stand", still }: S & { x: number; y: number; s?: number; pose?: keyof typeof POSE }) {
  const t = { duration: still ? 0 : 0.8, ease };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g fill="none" stroke={INK} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
        <motion.path initial={false} animate={{ d: POSE[pose].legs }} transition={t} />
        <path d="M 0 -52 L 0 -124" />
        <motion.path initial={false} animate={{ d: POSE[pose].arms }} transition={t} />
      </g>
      <circle cy={-150} r={25} fill={INK} />
      <path d="M -25 -150 A 25 25 0 0 1 25 -150 Q 12 -162 -2 -157 Q -14 -154 -25 -150 Z" fill="#292524" />
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={still ? undefined : { scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4, times: [0, 0.92, 0.96, 1], repeat: Infinity }}
      >
        <circle cx={-8} cy={-146} r={3} fill="#1c1917" />
        <circle cx={8} cy={-146} r={3} fill="#1c1917" />
      </motion.g>
    </g>
  );
}

// SMIL rotation: exact pivot in user space, no CSS transform-origin guessing.
function Spin({ dir, dur, cx = 0, cy = 0 }: { dir: number; dur: number; cx?: number; cy?: number }) {
  return <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`${360 * dir} ${cx} ${cy}`} dur={`${dur}s`} repeatCount="indefinite" />;
}

function gear(cx: number, cy: number, r: number, n: number) {
  let d = "";
  for (let i = 0; i < n * 2; i++) {
    const rr = i % 2 ? r : r * 1.25;
    for (const k of [i, i + 1]) {
      const a = (k / (n * 2)) * Math.PI * 2;
      d += `${d ? "L" : "M"} ${f(cx + rr * Math.cos(a))} ${f(cy + rr * Math.sin(a))} `;
    }
  }
  return d + "Z";
}

function Gear({ cx, cy, r, n, dur, still }: S & { cx: number; cy: number; r: number; n: number; dur: number }) {
  return (
    <g fill="none" stroke={DIM} strokeWidth={3} strokeLinejoin="round">
      <path d={gear(cx, cy, r, n)}>
        {!still && <Spin dir={Math.sign(dur)} dur={Math.abs(dur)} cx={cx} cy={cy} />}
      </path>
      <circle cx={cx} cy={cy} r={r * 0.3} />
    </g>
  );
}

// 01: the kid, gears turning over his head, the first thread sprouting.
function Kid({ still }: S) {
  return (
    <>
      <Show delay={0.2} still={still}>
        <Gear cx={420} cy={530} r={34} n={10} dur={8} still={still} />
        <Gear cx={476} cy={490} r={22} n={7} dur={-5.2} still={still} />
      </Show>
      <Thread d="M 560 800 C 560 690, 520 610, 570 520 S 620 400, 580 330" delay={0.4} dur={2.2} still={still} />
      <Show delay={2.4} still={still}>
        <path d="M 580 330 C 545 305, 525 312, 512 290 C 545 280, 570 300, 580 330 Z" fill={G} opacity={0.85} />
        <path d="M 580 330 C 608 292, 638 296, 652 280 C 640 316, 612 330, 580 330 Z" fill={G} opacity={0.85} />
      </Show>
      <Figure x={440} y={800} s={0.72} still={still} />
    </>
  );
}

// 02: the first program on a CRT, the thread splits in two.
const CODE = ["#include <iostream>", "int main() {", '  std::cout << "hi";', "}"];

function Code({ still }: S) {
  return (
    <>
      <Thread d="M 405 650 C 380 570, 350 500, 330 420" delay={1.8} dur={1.2} still={still} />
      <Thread d="M 330 420 C 310 350, 250 320, 215 230" delay={2.9} still={still} />
      <Thread d="M 330 420 C 360 340, 420 320, 440 220" delay={2.9} still={still} />
      <Show delay={0.1} still={still}>
        <rect x={480} y={470} width={290} height={190} rx={22} fill={PANEL} stroke={INK} strokeWidth={4} />
        <rect x={500} y={488} width={250} height={154} rx={10} fill="#052e16" fillOpacity={0.5} />
        <path d="M 600 660 L 590 700 H 660 L 650 660" fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <rect x={470} y={716} width={210} height={16} rx={5} fill="none" stroke={DIM} strokeWidth={3} />
        {CODE.map((line, i) => (
          <motion.text
            key={i}
            x={516}
            y={524 + i * 30}
            fontSize={18}
            fill={G}
            className="font-mono"
            xmlSpace="preserve"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.4 }}
          >
            {line}
          </motion.text>
        ))}
        <motion.rect
          x={530}
          y={600}
          width={10}
          height={20}
          fill={G}
          animate={still ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </Show>
      <Figure x={420} y={800} s={0.85} pose="type" still={still} />
    </>
  );
}

// 03: the branches become circuit traces, pulses run along them, the iron sparks.
const TRACES = [
  "M 440 380 H 320 V 260 H 150 H -400",
  "M 440 410 H 250 V 470 H 40 H -400",
  "M 470 360 V 240 H 380 V 90",
  "M 530 360 V 180 H 640 V 40",
  "M 560 380 H 700 V 280 H 880 H 1400",
  "M 560 420 H 760 V 520 H 960 H 1400",
  "M 500 360 V 120",
  "M 470 440 V 600 H 425",
  "M 530 440 V 560 H 680 V 700",
];
const PADS = [[150, 260], [40, 470], [380, 90], [640, 40], [880, 280], [960, 520], [500, 120], [425, 600], [680, 700]];
const SPARKS = [[-30, -40], [20, -50], [40, -16], [-44, -6], [8, -60], [-14, -30]];

function Circuit({ still }: S) {
  return (
    <>
      {TRACES.map((d, i) => (
        <g key={i}>
          <Thread d={d} w={2.5} delay={0.4 + i * 0.15} dur={1.6} still={still} />
          {!still && (
            <motion.path
              d={d}
              pathLength={100}
              fill="none"
              stroke="#ecfdf5"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray="2 98"
              initial={{ strokeDashoffset: 100, opacity: 0 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 2 + i * 0.3 }}
            />
          )}
        </g>
      ))}
      {PADS.map(([cx, cy], i) => (
        <Show key={i} delay={1.6 + i * 0.15} still={still}>
          <circle cx={cx} cy={cy} r={9} fill={PANEL} stroke={G} strokeWidth={3} />
        </Show>
      ))}
      <g stroke={INK} strokeWidth={3}>
        <rect x={440} y={360} width={120} height={80} rx={8} fill={PANEL} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M ${456 + i * 22} 352 v -10 M ${456 + i * 22} 448 v 10`} />
        ))}
      </g>
      <line x1={337} y1={744} x2={418} y2={606} stroke={DIM} strokeWidth={7} strokeLinecap="round" />
      {!still &&
        SPARKS.map(([dx, dy], i) => (
          <motion.circle
            key={i}
            r={3}
            fill="#fef08a"
            initial={{ cx: 425, cy: 600, opacity: 0 }}
            animate={{ cx: [425, 425 + dx], cy: [600, 600 + dy], opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5, delay: 2.4 + i * 0.1 }}
          />
        ))}
      <Figure x={310} y={800} s={0.9} still={still} />
    </>
  );
}

// 04: engineering. The tree gets big, one branch per subject; the data branch glows.
const TOPICS = ["Circuits", "Signals", "Embedded", "Sensors", "IoT", "Data"];

function curve(x: number, y: number, a: number, len: number, r: () => number) {
  const x2 = x + Math.cos(a) * len;
  const y2 = y + Math.sin(a) * len;
  const b = (r() - 0.5) * len * 0.5;
  const cx = (x + x2) / 2 - Math.sin(a) * b;
  const cy = (y + y2) / 2 + Math.cos(a) * b;
  const at = (t: number) => [(1 - t) ** 2 * x + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) ** 2 * y + 2 * (1 - t) * t * cy + t * t * y2];
  return { d: `M ${f(x)} ${f(y)} Q ${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`, x: x2, y: y2, at };
}

const ENG = (() => {
  const r = rng(7);
  const segs = [{ d: "M 500 640 C 490 600, 510 560, 500 520", delay: 0.3, w: 4 }];
  const tips = TOPICS.map((label, i) => {
    const a = ((-160 + i * 28) * Math.PI) / 180;
    const main = curve(500, 520, a, 215 + r() * 25, r);
    segs.push({ d: main.d, delay: 1.1 + i * 0.08, w: 3 });
    const [bx, by] = main.at(0.5);
    for (const s of [-1, 1]) {
      const child = curve(bx, by, a + s * 0.65, 80 + r() * 20, r);
      segs.push({ d: child.d, delay: 2 + r() * 0.4, w: 2 });
      for (const t of [-1, 1]) segs.push({ d: curve(child.x, child.y, a + s * 0.65 + t * 0.45, 40 + r() * 15, r).d, delay: 2.6 + r() * 0.4, w: 1.3 });
    }
    return { x: main.x, y: main.y, c: Math.cos(a), s: Math.sin(a), label };
  });
  return { segs, tips };
})();

function Engineering({ still }: S) {
  return (
    <>
      {ENG.segs.map((s, i) => (
        <Thread key={i} d={s.d} w={s.w} delay={s.delay} dur={1.1} still={still} />
      ))}
      {ENG.tips.map((t, i) => {
        const data = t.label === "Data";
        return (
          <Show key={t.label} delay={2.2 + i * 0.12} still={still}>
            {data && !still && (
              <motion.circle cx={t.x} cy={t.y} fill={G} animate={{ r: [10, 40], opacity: [0.5, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
            )}
            <circle cx={t.x} cy={t.y} r={data ? 10 : 7} fill={data ? G : PANEL} stroke={G} strokeWidth={3} />
            <text
              x={t.x + t.c * 24}
              y={t.y + t.s * 24}
              textAnchor={t.c < -0.3 ? "end" : t.c > 0.3 ? "start" : "middle"}
              dominantBaseline="middle"
              fontSize={22}
              fill={data ? G : INK}
              stroke="#000"
              strokeWidth={6}
              paintOrder="stroke"
              className="font-mono"
            >
              {t.label}
            </text>
            {t.label === "IoT" && (
              <motion.path
                d={`M ${f(t.x + 20)} ${f(t.y + 34)} h 16 l 6 -18 l 8 34 l 6 -16 h 18`}
                fill="none"
                stroke={G}
                strokeWidth={2.5}
                strokeLinejoin="round"
                initial={still ? false : { pathLength: 0 }}
                animate={still ? undefined : { pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 3 }}
              />
            )}
          </Show>
        );
      })}
      <Figure x={500} y={800} s={0.9} still={still} />
    </>
  );
}

// 05: after college. Threads everywhere, code windows, a network firing, the tools in orbit.
const BG = (() => {
  const r = rng(11);
  return Array.from({ length: 22 }, () => {
    const sx = 500 + (r() - 0.5) * 80;
    const ex = -400 + r() * 1800;
    const ey = -60 + r() * 300;
    return {
      d: `M ${f(sx)} 640 C ${f(sx + (r() - 0.5) * 300)} 420, ${f(ex + (r() - 0.5) * 300)} ${f(ey + 220)}, ${f(ex)} ${f(ey)}`,
      delay: r() * 1.6,
    };
  });
})();

const WINDOWS = [
  { x: 40, y: 80, w: 300, title: "train.py", lines: ["import pandas as pd", "df = pd.read_csv(path)", "model.fit(X, y)"] },
  { x: 660, y: 80, w: 300, title: "zsh", lines: ["$ pip install torch", "$ docker compose up", "$ npm run build"] },
  { x: 20, y: 350, w: 240, title: "App.tsx", lines: ["<Upload />", "<Predict />", "<Chart data={y} />"] },
];

const NET = [[160, 210, 260], [135, 185, 235, 285], [185, 235]].map((ys, l) => ys.map((y) => [430 + l * 70, y]));

function Software({ still }: S) {
  const float = (i: number) => (still ? undefined : { y: [0, -8, 0], transition: { duration: 5 + i, repeat: Infinity, ease } });
  return (
    <>
      {BG.map((t, i) => (
        <Thread key={i} d={t.d} w={1.5} o={0.4} delay={t.delay} dur={1.8} still={still} />
      ))}

      <Show delay={0.5} still={still}>
        {NET.slice(1).map((layer, l) =>
          layer.map(([x2, y2], j) =>
            NET[l].map(([x1, y1], k) => (
              <motion.line
                key={`${l}${j}${k}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={G}
                strokeWidth={1.5}
                initial={{ opacity: 0.25 }}
                animate={still ? undefined : { opacity: [0.08, 0.8, 0.08] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: l * 0.4 + (j + k) * 0.05 }}
              />
            )),
          ),
        )}
        {NET.flat().map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={9} fill={PANEL} stroke={G} strokeWidth={2.5} />
        ))}
      </Show>

      {WINDOWS.map((w, i) => (
        <Show key={w.title} delay={0.3 + i * 0.35} y={24} still={still}>
          <motion.g animate={float(i)}>
            <rect x={w.x} y={w.y} width={w.w} height={56 + w.lines.length * 30} rx={12} fill={PANEL} stroke="#44403c" strokeWidth={2} />
            {[0, 1, 2].map((d) => (
              <circle key={d} cx={w.x + 20 + d * 16} cy={w.y + 20} r={5} fill="#44403c" />
            ))}
            <text x={w.x + w.w - 16} y={w.y + 25} textAnchor="end" fontSize={15} fill={DIM} className="font-mono">
              {w.title}
            </text>
            {w.lines.map((line, j) => (
              <motion.text
                key={j}
                x={w.x + 20}
                y={w.y + 66 + j * 30}
                fontSize={18}
                fill={j === w.lines.length - 1 ? G : INK}
                className="font-mono"
                initial={still ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.35 + j * 0.4 }}
              >
                {line}
              </motion.text>
            ))}
          </motion.g>
        </Show>
      ))}

      <Show delay={1.4} y={24} still={still}>
        <motion.g animate={float(3)}>
          <rect x={760} y={350} width={220} height={210} rx={12} fill={PANEL} stroke="#44403c" strokeWidth={2} />
          <text x={964} y={375} textAnchor="end" fontSize={15} fill={DIM} className="font-mono">
            git log
          </text>
          <Thread d="M 800 540 V 395" w={3} delay={1.8} still={still} />
          <Thread d="M 800 515 C 850 500, 850 470, 850 450 C 850 430, 820 425, 800 410" w={3} delay={2.4} still={still} />
          <Thread d="M 800 490 C 900 480, 900 440, 900 420" w={3} delay={2.8} still={still} />
          {[540, 515, 470, 410, 395].map((cy, i) => (
            <circle key={i} cx={800} cy={cy} r={7} fill={PANEL} stroke={G} strokeWidth={3} />
          ))}
          <circle cx={850} cy={455} r={7} fill={PANEL} stroke={G} strokeWidth={3} />
          <circle cx={900} cy={420} r={7} fill={G} />
        </motion.g>
      </Show>

      <Show delay={1} still={still}>
        <g transform="translate(500 620) scale(1 0.34)">
          <g>
            {!still && <Spin dir={1} dur={40} />}
            {tools.map((t, i) => {
              const a = (i / tools.length) * Math.PI * 2;
              return (
                <g key={t.name} transform={`translate(${f(Math.cos(a) * 330)} ${f(Math.sin(a) * 330)})`}>
                  <g>
                    {!still && <Spin dir={-1} dur={40} />}
                    <g transform="scale(1 2.94)">
                      <image href={asset(t.icon)} x={-20} y={-20} width={40} height={40} style={{ filter: "brightness(1.9)" }} />
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        </g>
      </Show>

      <Figure x={500} y={800} s={0.95} still={still} />
    </>
  );
}

// 06: the first jobs. Threads from everywhere tie into two knots.
const KNOTS = [
  { x: 290, y: 330, side: -1, name: "Shiash Info Solutions", role: "Data science intern, Nov 2023" },
  { x: 710, y: 330, side: 1, name: "Kshitiksha Foundation", role: "Web design intern, Apr 2024" },
];

function Work({ still }: S) {
  return (
    <>
      {KNOTS.map((k) => (
        <g key={k.name}>
          {[0, 1, 2, 3, 4, 5].map((j) => {
            const sx = 500 + k.side * 1000;
            const sy = 40 + j * 110;
            return (
              <Thread
                key={j}
                d={`M ${sx} ${sy} C ${f(sx - k.side * 400)} ${sy}, ${f(k.x + k.side * 220)} ${f(k.y + (sy - k.y) * 0.4)}, ${k.x} ${k.y}`}
                w={2}
                o={0.55}
                delay={0.2 + j * 0.12}
                dur={1.6}
                still={still}
              />
            );
          })}
          <Thread d={`M 500 640 C 500 500, ${k.x} 520, ${k.x} ${k.y + 14}`} w={3} delay={1.3} dur={1.2} still={still} />
          <Show delay={2.1} still={still}>
            {!still && (
              <motion.circle cx={k.x} cy={k.y} fill="none" stroke={G} strokeWidth={2} animate={{ r: [16, 80], opacity: [0.7, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />
            )}
            <circle cx={k.x} cy={k.y} r={42} fill={G} opacity={0.12} />
            <circle cx={k.x} cy={k.y} r={16} fill={G} />
            <text x={k.x} y={k.y - 92} textAnchor="middle" fontSize={26} fill={INK} stroke="#000" strokeWidth={8} paintOrder="stroke">
              {k.name}
            </text>
            <text x={k.x} y={k.y - 62} textAnchor="middle" fontSize={18} fill={DIM} stroke="#000" strokeWidth={6} paintOrder="stroke" className="font-mono">
              {k.role}
            </text>
          </Show>
        </g>
      ))}
      <Figure x={500} y={800} s={0.95} still={still} />
    </>
  );
}

// 07: the finale. Loose, flickering timelines; he walks in, grabs them, weaves them into a tree and takes the seat.
const N = 26;
const HAND = { y: 604, l: 412, r: 588 };

const STRANDS = (() => {
  const r = rng(23);
  return Array.from({ length: N }, (_, i) => {
    const x = -600 + (i * 2200) / (N - 1);
    const wob = (r() - 0.5) * 160;
    const left = i < N / 2;
    const hx = left ? HAND.l : HAND.r;
    const a = Math.PI + ((i + 0.5) / N) * Math.PI;
    const tx = 500 + Math.cos(a) * 540;
    const ty = 340 + Math.sin(a) * 300;
    const off = (i - (N - 1) / 2) * 1.6;
    return {
      loose: `M ${f(x)} -140 C ${f(x + wob)} 200, ${f(x - wob)} 620, ${f(x + wob / 2)} 1200`,
      grab: `M ${f(x)} -140 C ${f(x)} 180, ${f(hx + (left ? -140 : 140))} ${HAND.y - 280}, ${hx} ${HAND.y}`,
      tree: `M ${f(tx)} ${f(ty)} C ${f(tx + (500 - tx) * 0.25)} ${f(ty + 160)}, ${f(500 + off * 4)} 430, ${f(500 + off)} 600`,
      flick: 0.8 + r() * 1.6,
    };
  });
})();

const MOTES = (() => {
  const r = rng(5);
  return Array.from({ length: 16 }, () => ({ x: 150 + r() * 700, y: 300 + r() * 320, r: 1.5 + r() * 2.5, d: 3 + r() * 3, delay: r() * 3 }));
})();

function Weave({ still }: S) {
  // 0 loose, 1 walking in, 2 grab, 3 tree, 4 seated
  const [phase, setPhase] = useState(still ? 4 : 0);

  useEffect(() => {
    if (still) return setPhase(4);
    const ts = [1200, 3300, 5000, 6900].map((ms, i) => setTimeout(() => setPhase(i + 1), ms));
    return () => ts.forEach(clearTimeout);
  }, [still]);

  const loose = phase < 2;
  return (
    <>
      <defs>
        <radialGradient id="weave-glow">
          <stop offset="0" stopColor={G} stopOpacity={0.35} />
          <stop offset="1" stopColor={G} stopOpacity={0} />
        </radialGradient>
      </defs>
      <motion.ellipse
        cx={500}
        cy={330}
        rx={620}
        ry={380}
        fill="url(#weave-glow)"
        initial={false}
        animate={{ opacity: phase >= 4 ? (still ? 0.8 : [0.6, 1, 0.6]) : 0 }}
        transition={phase >= 4 && !still ? { duration: 4, repeat: Infinity } : { duration: 1 }}
      />

      {STRANDS.map((s, i) => {
        const d = loose ? s.loose : phase === 2 ? s.grab : s.tree;
        const morph = { d: { duration: phase === 3 ? 2 : 1.4, ease }, pathLength: { duration: 1.4, delay: i * 0.03 } };
        return (
          <motion.g
            key={i}
            fill="none"
            stroke={G}
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: loose && !still ? [0.25, 1, 0.45, 0.9] : 1 }}
            transition={loose && !still ? { duration: s.flick, repeat: Infinity, repeatType: "mirror" } : { duration: 0.6 }}
          >
            <motion.path strokeWidth={14} strokeOpacity={0.1} initial={still ? false : { d: s.loose, pathLength: 0 }} animate={{ d, pathLength: 1 }} transition={morph} />
            <motion.path strokeWidth={2.5} initial={still ? false : { d: s.loose, pathLength: 0 }} animate={{ d, pathLength: 1 }} transition={morph} />
          </motion.g>
        );
      })}

      <motion.g initial={false} animate={{ opacity: phase >= 4 ? 1 : 0 }} transition={{ duration: 1 }}>
        <path
          d="M 420 790 V 640 L 440 560 L 470 610 L 500 540 L 530 610 L 560 560 L 580 640 V 790"
          fill={PANEL}
          stroke={G}
          strokeOpacity={0.6}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <rect x={405} y={722} width={190} height={22} rx={6} fill="#1c1917" stroke={G} strokeOpacity={0.6} strokeWidth={3} />
      </motion.g>

      {phase >= 4 &&
        !still &&
        MOTES.map((m, i) => (
          <motion.circle
            key={i}
            cx={m.x}
            r={m.r}
            fill={G}
            initial={{ cy: m.y, opacity: 0 }}
            animate={{ cy: [m.y, m.y - 260], opacity: [0, 0.9, 0] }}
            transition={{ duration: m.d, repeat: Infinity, delay: m.delay }}
          />
        ))}

      <motion.g initial={still ? false : { x: -760 }} animate={{ x: phase >= 1 ? 0 : -760 }} transition={{ duration: 2, ease: "easeOut" }}>
        <motion.g animate={{ y: phase === 1 && !still ? [0, -10, 0] : 0 }} transition={phase === 1 ? { duration: 0.4, repeat: Infinity } : { duration: 0.3 }}>
          <Figure x={500} y={780} s={1.05} pose={phase >= 4 ? "sit" : phase >= 2 ? "reach" : "stand"} still={still} />
        </motion.g>
      </motion.g>
    </>
  );
}

const SCENES: Record<Art, (p: S) => ReactNode> = {
  kid: Kid,
  code: Code,
  circuit: Circuit,
  engineering: Engineering,
  software: Software,
  work: Work,
  weave: Weave,
};

export function StoryArt({ art, still }: S & { art: Art }) {
  const Scene = SCENES[art];
  return (
    <svg viewBox="0 0 1000 1150" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <Scene still={still} />
    </svg>
  );
}

// Cold open: a single thread crossing the dark.
export function OpenThread({ still }: S) {
  return (
    <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2" aria-hidden>
      <g fill="none" stroke={G} strokeLinecap="round">
        {[10, 2].map((w) => (
          <motion.path
            key={w}
            d="M -20 50 C 200 15, 300 85, 500 50 S 800 15, 1020 50"
            strokeWidth={w}
            strokeOpacity={w > 2 ? 0.12 : 0.8}
            vectorEffect="non-scaling-stroke"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease }}
          />
        ))}
      </g>
    </svg>
  );
}
