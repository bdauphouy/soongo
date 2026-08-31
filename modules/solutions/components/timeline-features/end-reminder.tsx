import { motion, useTransform, type MotionValue } from "motion/react";
import { DemoButton } from "@/modules/booking/components/demo-button";
import { DRAW_END } from "./layout";

type Props = {
  end: { x: number; y: number };
  W: number;
  H: number;
  scrollYProgress: MotionValue<number>;
};

export function EndReminder({ end, W, H, scrollYProgress }: Props) {
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
