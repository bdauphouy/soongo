"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

export function AnimatedNumber({
  value,
  suffix = "",
  duration = 1.4,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return controls.stop;
  }, [inView, value, duration, delay, reduce, motionValue]);

  return (
    <span ref={ref}>
      {reduce ? value : display}
      {suffix}
    </span>
  );
}
