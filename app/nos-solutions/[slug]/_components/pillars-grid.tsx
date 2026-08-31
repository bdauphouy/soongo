import { Reveal } from "@/components/reveal";

type Props = {
  pillars: readonly { title: string; description: string }[];
};

export function PillarsGrid({ pillars }: Props) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase text-brand-600">
            La méthode
          </p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            Comment ça marche.
          </h2>
        </Reveal>
        <div
          className={`mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
            pillars.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100">
                <p className="text-sm font-bold text-brand-100 transition-colors duration-300 group-hover:text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-xl font-bold text-ink">
                  {pillar.title}
                </p>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
