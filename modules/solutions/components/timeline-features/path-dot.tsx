import { motion, useTransform, type MotionValue } from "motion/react";
import { STROKE, type Stop } from "./layout";

type Props = {
  stop: Stop;
  pathLength: MotionValue<number>;
};

export function PathDot({ stop, pathLength }: Props) {
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
