import { Reveal } from "@/components/reveal";
import { DemoButton } from "@/modules/booking/components/demo-button";

export function DemoReminder() {
  return (
    <Reveal className="mt-16 flex justify-center px-4 sm:px-6 lg:px-8">
      <DemoButton withArrow>Demander une démo</DemoButton>
    </Reveal>
  );
}
