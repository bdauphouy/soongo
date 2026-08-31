import { AnimatedStat } from "@/components/animated-stat";
import { Reveal } from "@/components/reveal";
import { SolutionName } from "@/components/solution-name";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/modules/booking/components/demo-button";
import { TimelineFeatures } from "@/modules/solutions/components/timeline-features";
import { pageSolutions, solutions } from "@/modules/solutions/lib/solutions";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PillarsGrid } from "./_components/pillars-grid";
import { RelatedSolutions } from "./_components/related-solutions";

export function generateStaticParams() {
  return pageSolutions.map((solution) => ({ slug: solution.slug }));
}

function getSolution(slug: string) {
  return pageSolutions.find((solution) => solution.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/nos-solutions/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const solution = getSolution(slug);

  if (!solution) return {};

  return {
    title: `${solution.name} — ${solution.tagline} | SoonGo`,
    description: solution.description,
  };
}

export default async function SolutionPage(
  props: PageProps<"/nos-solutions/[slug]">,
) {
  const { slug } = await props.params;
  const solution = getSolution(slug);

  if (!solution) notFound();

  const others = solutions.filter(
    (s) => s.slug !== solution.slug && s.slug !== "go-assist",
  );
  const pillars = solution.kind === "pillars" ? solution.pillars : undefined;
  const stats = solution.stats;

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-[-10%] size-112 rounded-full bg-brand-100 opacity-50 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
          <Reveal>
            <Link
              href="/#solutions"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft
                weight="bold"
                className="size-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
              />
              Retour aux solutions
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              <SolutionName name={solution.name} />
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-2xl font-semibold text-brand-600 sm:text-3xl">
              {solution.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {solution.description}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <DemoButton withArrow>Demander une démo</DemoButton>
              <Button href="/#solutions" variant="secondary">
                Voir toutes les solutions
              </Button>
            </div>
          </Reveal>

          {stats && (
            <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                  <div>
                    <p className="bg-linear-to-br from-brand-600 to-brand-400 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
                      <AnimatedStat value={stat.value} delay={0.1 + i * 0.08} />
                    </p>
                    <p className="mt-2 max-w-xs text-base text-ink-soft">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {pillars && <PillarsGrid pillars={pillars} />}

      <section className="border-t border-border bg-surface-soft">
        <TimelineFeatures
          features={solution.features}
          eyebrow="Le détail"
          title={
            <>
              Ce que <SolutionName name={solution.name} /> change pour vous.
            </>
          }
        />
      </section>

      <RelatedSolutions solutions={others} />
    </>
  );
}
