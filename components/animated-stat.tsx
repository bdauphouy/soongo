import { AnimatedNumber } from "@/components/animated-number";

export function AnimatedStat({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) return <>{value}</>;

  const [, digits, suffix] = match;
  return <AnimatedNumber value={Number(digits)} suffix={suffix} delay={delay} />;
}
