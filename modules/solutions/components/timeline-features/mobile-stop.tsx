import { motion, useReducedMotion } from "motion/react";

type Props = {
  index: number;
  feature: string;
  isLast: boolean;
};

export function MobileStop({ index, feature, isLast }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex gap-4"
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <motion.span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white"
          variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {index + 1}
        </motion.span>
        {!isLast && (
          <motion.span
            className="w-px flex-1 origin-top bg-border"
            aria-hidden
            variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          />
        )}
      </div>
      <motion.p
        className={`text-base font-semibold leading-snug text-ink ${isLast ? "" : "pb-8"}`}
        variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {feature}
      </motion.p>
    </motion.div>
  );
}
