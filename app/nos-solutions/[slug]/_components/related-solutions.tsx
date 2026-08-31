import { Reveal } from "@/components/reveal";
import { SolutionName } from "@/components/solution-name";
import type { Solution } from "@/modules/solutions/lib/solutions";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

type Props = {
  solutions: readonly Solution[];
};

export function RelatedSolutions({ solutions }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase text-brand-600">
          Découvrez aussi
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
          Les autres solutions SoonGo.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, i) => {
          const Icon = solution.icon;
          return (
            <Reveal key={solution.slug} delay={i * 0.06}>
              <Link
                href={`/nos-solutions/${solution.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
                  <Icon weight="duotone" className="size-6" />
                </span>
                <p className="mt-5 text-lg font-bold text-ink">
                  <SolutionName name={solution.name} />
                </p>
                <p className="mt-1 text-sm text-ink-soft">{solution.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  Découvrir
                  <ArrowRightIcon
                    weight="bold"
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
