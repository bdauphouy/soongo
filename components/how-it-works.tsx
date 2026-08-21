import { ArrowRight, ChartLineUp, Plug, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: Plug,
    title: "Connectez",
    description:
      "Reliez vos flotteurs, cartes carburant et outils télématiques en quelques clics, sans matériel à installer.",
    wrap: "bg-ink text-white",
    icon_wrap: "bg-brand-600 text-white",
  },
  {
    icon: Sparkle,
    title: "Laissez l'IA analyser",
    description:
      "SoonGo détecte automatiquement les leviers d'économies et de décarbonation adaptés à votre parc.",
    wrap: "bg-brand-50 text-ink",
    icon_wrap: "bg-white text-brand-600",
  },
  {
    icon: ChartLineUp,
    title: "Gagnez du temps et de l'argent",
    description:
      "Vos équipes se concentrent sur l'essentiel pendant que SoonGo pilote le reste, en continu.",
    wrap: "bg-brand-600 text-white",
    icon_wrap: "bg-white text-brand-600",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal className="max-w-2xl">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          Comment ça marche.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Trois étapes suffisent pour que SoonGo prenne en charge la gestion
          quotidienne de votre flotte.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {steps.map((step, i) => (
          <div key={step.title} className="contents">
            <Reveal delay={i * 0.1} className="h-full">
              <div className={`flex h-full flex-col rounded-3xl p-7 ${step.wrap}`}>
                <span
                  className={`flex size-11 items-center justify-center rounded-full ${step.icon_wrap}`}
                >
                  <step.icon weight="bold" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  {step.description}
                </p>
              </div>
            </Reveal>
            {i < steps.length - 1 && (
              <ArrowRight
                weight="bold"
                className="mx-auto hidden size-5 text-ink-soft/40 lg:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
