"use client";

// Zigzag path for the "Le détail" section: draws on scroll (pinned) while
// a close tracking camera follows the drawing tip point by point, starting
// zoomed in on the path's own starting point.
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { DemoButton } from "@/components/demo-button";
import { Reveal } from "@/components/reveal";

const PER_ROW = 2;
const W = 1300;
const ROW_H = 380;
// the turn's radius spans the *entire* row gap, so the arc's own start/end
// tangents (horizontal, at its pole points) blend straight into the row
// lines with zero kink — no straight "stub" segments, no sharp corners
const TURN_R = ROW_H / 2;
const STROKE = 14;
// rows must stay inset from the viewBox edges by at least TURN_R (+ half
// the stroke), otherwise the U-turn arcs bulge past 0/W and get clipped
const LEFT_X = TURN_R + STROKE / 2 + 10;
const RIGHT_X = W - LEFT_X;
// plain top inset, symmetric with PAD_BOTTOM — row 0 is a normal row like
// every other, no special lead-in bridging it to anything above
const PAD_TOP = 40;
const ROW0_Y = PAD_TOP;
const PAD_BOTTOM = 40;
const DRAW_START = 0.005;
const DRAW_END = 0.92;
const CAMERA_ZOOM = 1.9;
// where the tracked point sits, as a fraction of the viewport height from
// the top — constant and dead center for every point on the path, row 0
// included. No time-varying anchor: any change of this value over the
// scroll, wherever it happens, biases whichever points are in that window
// off-center and/or adds a diagonal to what should be horizontal panning.
const CAMERA_Y_ANCHOR = 0.5;
// fraction of the viewport height (from the top) where point 0 sits, still
// well below center, at the moment filling begins — bigger than 0.5 means
// the trigger fires earlier in the scroll, while point 0 is lower on screen
const FILL_START_VIEWPORT_Y = 0.7;

type Stop = { x: number; y: number; frac: number };
type Segment =
  | {
      kind: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      start: number;
      len: number;
    }
  | {
      kind: "arc";
      cx: number;
      cy: number;
      r: number;
      dir: 1 | -1;
      start: number;
      len: number;
    };

function buildLayout(featureCount: number) {
  const rows = Math.ceil(featureCount / PER_ROW);
  const lineLen = RIGHT_X - LEFT_X;
  const arcLen = Math.PI * TURN_R;
  const H = ROW0_Y + Math.max(rows - 1, 0) * ROW_H + PAD_BOTTOM;

  let d = "";
  let cumulative = 0;
  let featureIndex = 0;
  const stops: Stop[] = [];
  const segments: Segment[] = [];

  for (let i = 0; i < rows; i++) {
    const y = ROW0_Y + i * ROW_H;
    const goingRight = i % 2 === 0;
    const x1 = goingRight ? LEFT_X : RIGHT_X;
    const x2 = goingRight ? RIGHT_X : LEFT_X;
    const rowLineLen = lineLen;

    d += i === 0 ? `M ${x1} ${y} L ${x2} ${y} ` : `L ${x2} ${y} `;
    segments.push({
      kind: "line",
      x1,
      y1: y,
      x2,
      y2: y,
      start: cumulative,
      len: rowLineLen,
    });

    const itemsThisRow = Math.min(PER_ROW, featureCount - featureIndex);
    for (let k = 0; k < itemsThisRow; k++) {
      const t = (k + 0.5) / itemsThisRow;
      const x = goingRight ? x1 + t * rowLineLen : x1 - t * rowLineLen;
      // frac holds the raw cumulative length for now; normalized below once totalLen is known
      stops.push({ x, y, frac: cumulative + t * rowLineLen });
      featureIndex++;
    }

    cumulative += rowLineLen;

    if (i < rows - 1) {
      const yNext = y + ROW_H;
      const sweep = goingRight ? 1 : 0;
      d += `A ${TURN_R} ${TURN_R} 0 0 ${sweep} ${x2} ${yNext} `;
      segments.push({
        kind: "arc",
        cx: x2,
        cy: y + TURN_R,
        r: TURN_R,
        dir: goingRight ? 1 : -1,
        start: cumulative,
        len: arcLen,
      });
      cumulative += arcLen;
    }
  }

  const totalLen = cumulative;
  for (const stop of stops) stop.frac = stop.frac / totalLen;

  function pointAtLength(len: number) {
    const target = Math.min(Math.max(len, 0), totalLen);
    const seg =
      segments.find((s) => target >= s.start && target <= s.start + s.len) ??
      segments[segments.length - 1];
    const f = seg.len === 0 ? 0 : (target - seg.start) / seg.len;

    if (seg.kind === "line") {
      return {
        x: seg.x1 + (seg.x2 - seg.x1) * f,
        y: seg.y1 + (seg.y2 - seg.y1) * f,
      };
    }
    const theta = -Math.PI / 2 + seg.dir * f * Math.PI;
    return {
      x: seg.cx + seg.r * Math.cos(theta),
      y: seg.cy + seg.r * Math.sin(theta),
    };
  }

  return {
    d,
    H,
    rows,
    stops,
    pointAt: (t: number) => pointAtLength(t * totalLen),
  };
}

function PathDot({
  stop,
  pathLength,
}: {
  stop: Stop;
  pathLength: MotionValue<number>;
}) {
  const scale = useTransform(
    pathLength,
    [Math.max(stop.frac - 0.02, 0), Math.min(stop.frac + 0.02, 1)],
    [0, 1],
  );

  return (
    <motion.circle
      cx={stop.x}
      cy={stop.y}
      r={STROKE * 1.15}
      fill="var(--color-brand-600)"
      style={{ scale }}
    />
  );
}

function StopContent({
  stop,
  n,
  feature,
  scrollYProgress,
}: {
  stop: Stop;
  n: number;
  feature: string;
  scrollYProgress: MotionValue<number>;
}) {
  const at = DRAW_START + stop.frac * (DRAW_END - DRAW_START);
  // the reveal finishes right as the line arrives at the point, having
  // started a little earlier — clamped to 0: native scroll-driven WAAPI
  // animations reject the negative keyframe offset that `at - 0.05`
  // produces for any stop early enough on the path (at < 0.05)
  const fadeStart = Math.max(at - 0.05, 0);
  const opacity = useTransform(scrollYProgress, [fadeStart, at], [0, 1]);
  // slides in from the right, moving left into place — matching the
  // camera's own rightward pan, so the reveal reads as the camera
  // arriving over static content rather than the content sliding around
  // on its own
  const x = useTransform(scrollYProgress, [fadeStart, at], [24, 0]);
  const scale = useTransform(scrollYProgress, [fadeStart, at], [0.85, 1]);

  // the number sits above the line, the description below — with enough
  // clearance that neither overlaps the drawn stroke/dot at the stop point
  const CLEARANCE = STROKE * 1.15 + 12;
  const left = `${(stop.x / W) * 100}%`;
  const top = `${stop.y}%`;

  return (
    <>
      <motion.div
        className="absolute w-64 text-center"
        style={{
          left,
          top,
          transform: `translate(-50%, calc(-100% - ${CLEARANCE}px))`,
        }}
      >
        <motion.div style={{ opacity, x, scale }}>
          <span className="text-2xl font-extrabold text-brand-600">{n}</span>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute w-64 text-center"
        style={{ left, top, transform: `translate(-50%, ${CLEARANCE}px)` }}
      >
        <motion.div style={{ opacity, x, scale }}>
          <p className="text-base font-semibold leading-snug text-ink">
            {feature}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

function DemoReminder() {
  return (
    <Reveal className="mt-16 flex justify-center px-4 sm:px-6 lg:px-8">
      <DemoButton withArrow>Demander une démo</DemoButton>
    </Reveal>
  );
}

function EndReminder({
  end,
  W,
  H,
  scrollYProgress,
}: {
  end: { x: number; y: number };
  W: number;
  H: number;
  scrollYProgress: MotionValue<number>;
}) {
  const fadeStart = Math.max(DRAW_END - 0.05, 0);
  const opacity = useTransform(scrollYProgress, [fadeStart, DRAW_END], [0, 1]);
  const scale = useTransform(scrollYProgress, [fadeStart, DRAW_END], [0.85, 1]);
  const left = `${(end.x / W) * 100}%`;
  const top = `${(end.y / H) * 100}%`;

  return (
    <div
      className="absolute"
      style={{ left, top, transform: "translate(-50%, -50%)" }}
    >
      <motion.div style={{ opacity, scale }}>
        <DemoButton withArrow>Demander une démo</DemoButton>
      </motion.div>
    </div>
  );
}

function TitleText({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-semibold uppercase text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export function TimelineFeatures({
  features,
  eyebrow,
  title,
}: {
  features: readonly string[];
  eyebrow: string;
  title: ReactNode;
}) {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const { d, H, rows, stops, pointAt } = buildLayout(features.length);

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: pinRef,
    // starts counting well before the section locks at the top — right
    // when point 0 (sitting at CAMERA_Y_ANCHOR of the sticky box, which
    // tracks the viewport 1:1 before it locks) crosses FILL_START_VIEWPORT_Y
    // — instead of waiting for "start start" (full lock). "vh" is a plain
    // CSS length like px (unlike "%"/"center" container edges, which
    // trigger far too early in this Motion version for window-level scroll
    // tracking, for reasons that didn't fully resolve), so it behaves
    // exactly as documented while staying correct across viewport heights.
    offset: [
      `start ${(FILL_START_VIEWPORT_Y - CAMERA_Y_ANCHOR) * 100}vh`,
      "end end",
    ],
  });
  // trails the raw scroll position instead of tracking it 1:1, so the
  // whole drawing eases to a stop instead of snapping the instant the
  // wheel/trackpad does. Kept stiff (critically damped, fast settle):
  // the sticky positioning itself is NOT springed — it snaps to raw
  // scroll instantly — so too much lag here makes the springed camera
  // visibly fight the instant-following sticky box, especially during
  // the short, tightly-tuned origin-to-stop-1 opening stretch
  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });
  // the camera's position along the path, 0 (origin) to 1 (last stop), in
  // lockstep with the line drawing — pathLength and cameraT are the same
  // motion value, drawing and tracking both move at a uniform rate
  const cameraT = useTransform(scrollYProgress, [DRAW_START, DRAW_END], [0, 1]);
  const pathLength = cameraT;
  // the camera tracks the drawing tip continuously from t=0 — pointAt(0) is
  // exactly (LEFT_X, ROW0_Y), the path's own start, so motion is naturally
  // gradual right from the opening (early t covers very little distance
  // along the path)
  const rawCameraX = useTransform(cameraT, (t) => pointAt(t).x);
  const rawCameraY = useTransform(cameraT, (t) => pointAt(t).y);
  const cameraX = useSpring(rawCameraX, { stiffness: 260, damping: 32 });
  const cameraY = useSpring(rawCameraY, { stiffness: 260, damping: 32 });
  const cameraTransform = useTransform(
    [cameraX, cameraY],
    ([x, y]: number[]) => {
      const tx = (0.5 - (CAMERA_ZOOM * x) / W) * 100;
      const ty = (CAMERA_Y_ANCHOR - (CAMERA_ZOOM * y) / H) * 100;
      return `translate(${tx}%, ${ty}%) scale(${CAMERA_ZOOM})`;
    },
  );

  const fallback = (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
      {features.map((feature, i) => (
        <div key={feature}>
          <span className="text-2xl font-extrabold text-brand-600 lg:text-3xl">
            {i + 1}
          </span>
          <p className="mt-3 text-base font-semibold leading-snug text-ink lg:text-lg">
            {feature}
          </p>
        </div>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <div className="pb-16 lg:pb-24">
        <Reveal className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8 lg:pt-24">
          <TitleText eyebrow={eyebrow} title={title} />
        </Reveal>
        {fallback}
        <DemoReminder />
      </div>
    );
  }

  return (
    <div className="pb-16 lg:pb-24">
      <div className="relative">
        <Reveal className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:px-8 lg:pt-24">
          <TitleText eyebrow={eyebrow} title={title} />
        </Reveal>

        <div className="lg:hidden">
          {fallback}
          <DemoReminder />
        </div>

        <div
          ref={pinRef}
          className="relative hidden lg:block"
          style={{ height: `${55 + rows * 75}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            <motion.div
              className="relative w-full"
              style={{
                aspectRatio: `${W} / ${H}`,
                transform: cameraTransform,
                transformOrigin: "0 0",
              }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 h-full w-full"
                fill="none"
              >
                <path
                  d={d}
                  stroke="var(--color-brand-100)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                />
                <motion.path
                  d={d}
                  stroke="var(--color-brand-600)"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  style={{ pathLength }}
                />
                {stops.map((stop) => (
                  <PathDot
                    key={`${stop.x}-${stop.y}`}
                    stop={stop}
                    pathLength={pathLength}
                  />
                ))}
              </svg>

              {stops.map((stop, i) => (
                <StopContent
                  key={features[i]}
                  stop={{ ...stop, y: (stop.y / H) * 100 }}
                  n={i + 1}
                  feature={features[i]}
                  scrollYProgress={scrollYProgress}
                />
              ))}

              <EndReminder
                end={pointAt(1)}
                W={W}
                H={H}
                scrollYProgress={scrollYProgress}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
