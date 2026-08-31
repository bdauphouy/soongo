import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { solutionHref, solutions } from "@/modules/solutions/lib/solutions";
import { Reveal } from "@/components/reveal";
import { SolutionName } from "@/components/solution-name";

export function SolutionsSection() {
  return (
    <section id="solutions" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase text-brand-600">
          Nos solutions
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          Cinq outils, une seule plateforme.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Chaque solution SoonGo répond à un besoin précis de votre gestion de
          flotte. Ensemble, ils forment un système complet et connecté.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((solution, i) => {
          const style = solution.cardStyle;
          const Icon = solution.icon;
          const isAssist = solution.slug === "go-assist";

          const content = (
            <article
              id={isAssist ? "go-assist" : undefined}
              className={`group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 ${isAssist ? "scroll-mt-28" : ""} ${style.wrap}`}
            >
              <span
                className={`flex size-11 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-6 ${style.icon}`}
              >
                <Icon weight="duotone" className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">
                <SolutionName
                  name={solution.name}
                  invert={style.wrap.includes("text-white")}
                />
              </h3>
              <p className={`mt-1 text-sm font-semibold ${style.tagline}`}>
                {solution.tagline}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${style.body}`}>
                {solution.description}
              </p>
              {!isAssist && (
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${style.link}`}
                >
                  Découvrir
                  <ArrowRight
                    weight="bold"
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </span>
              )}
            </article>
          );

          return (
            <Reveal key={solution.slug} delay={i * 0.06} className={style.span}>
              {isAssist ? (
                content
              ) : (
                <Link href={solutionHref(solution.slug)} className="block h-full">
                  {content}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
