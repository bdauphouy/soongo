"use client";

import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  motion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import {
  buildLayout,
  CAMERA_Y_ANCHOR,
  CAMERA_ZOOM,
  DRAW_END,
  DRAW_START,
  FILL_START_VIEWPORT_Y,
  STROKE,
  W,
} from "./layout";
import { DemoReminder } from "./demo-reminder";
import { EndReminder } from "./end-reminder";
import { MobileStop } from "./mobile-stop";
import { PathDot } from "./path-dot";
import { StopContent } from "./stop-content";
import { TitleText } from "./title-text";

type Props = {
  features: readonly string[];
  eyebrow: string;
  title: ReactNode;
};

export function TimelineFeatures({ features, eyebrow, title }: Props) {
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
    <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6">
      {features.map((feature, i) => (
        <MobileStop
          key={feature}
          index={i}
          feature={feature}
          isLast={i === features.length - 1}
        />
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

        <div className="lg:hidden">{fallback}</div>

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
