import { Button } from "@/components/ui/button";
import { DemoButton } from "@/modules/booking/components/demo-button";
import { HeroVisual } from "./hero-visual";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:pt-20 lg:pb-28">
      <Reveal className="lg:col-span-6">
        <h1 className="text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
          Votre flotte, enfin sous contrôle.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
          SoonGo automatise vos tâches, centralise vos données et réduit vos
          coûts de mobilité, pour que votre flotte roule sans friction.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <DemoButton withArrow>Demander une démo</DemoButton>
          <Button href="#solutions" variant="secondary">
            Découvrir les solutions
          </Button>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-16 lg:col-span-6 lg:mt-0">
        <HeroVisual />
      </Reveal>
    </section>
  );
}
