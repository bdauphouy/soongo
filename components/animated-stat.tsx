import { AnimatedNumber } from "@/components/animated-number";

type Props = {
  value: string;
  delay?: number;
};

export function AnimatedStat({ value, delay = 0 }: Props) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) return <>{value}</>;

  const [, digits, suffix] = match;
  return <AnimatedNumber value={Number(digits)} suffix={suffix} delay={delay} />;
}
