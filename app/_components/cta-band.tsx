import { DemoButton } from "@/modules/booking/components/demo-button";
import { Reveal } from "@/components/reveal";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="absolute -right-16 -top-24 size-72 bg-white/10"
            style={{ borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-10 size-64 bg-white/10"
            style={{ borderRadius: "58% 42% 37% 63% / 44% 41% 59% 56%" }}
          />
          <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
            Prêt à simplifier la gestion de votre flotte ?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-lg text-white/85">
            Échangez avec notre équipe et découvrez SoonGo appliqué à votre
            parc, en moins de trente minutes.
          </p>
          <div className="relative mt-8 flex justify-center">
            <DemoButton variant="invert" withArrow>
              Demander une démo
            </DemoButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
