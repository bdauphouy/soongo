import { motion, useTransform, type MotionValue } from "motion/react";
import { DRAW_END, DRAW_START, STROKE, W, type Stop } from "./layout";

type Props = {
  stop: Stop;
  n: number;
  feature: string;
  scrollYProgress: MotionValue<number>;
};

export function StopContent({ stop, n, feature, scrollYProgress }: Props) {
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
