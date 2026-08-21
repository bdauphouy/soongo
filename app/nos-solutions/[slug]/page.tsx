import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { AnimatedStat } from "@/components/animated-stat";
import { TimelineFeatures } from "@/components/timeline-features";
import { Button } from "@/components/ui/button";
import { pageSolutions, solutions } from "@/lib/solutions";
import type { Metadata } from "next";

export function generateStaticParams() {
  return pageSolutions.map((solution) => ({ slug: solution.slug }));
}

function getSolution(slug: string) {
  return pageSolutions.find((solution) => solution.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/nos-solutions/[slug]">
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
  props: PageProps<"/nos-solutions/[slug]">
) {
  const { slug } = await props.params;
  const solution = getSolution(slug);

  if (!solution) notFound();

  const others = solutions.filter(
    (s) => s.slug !== solution.slug && s.slug !== "go-assist"
  );
  const pillars = "pillars" in solution ? solution.pillars : undefined;
  const stats = "stats" in solution ? solution.stats : undefined;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-24 right-[-10%] size-[28rem] rounded-full bg-brand-100 opacity-50 blur-3xl"
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
                {solution.name}
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
                <Button href="mailto:demo@soongo.co" withArrow>
                  Demander une démo
                </Button>
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
                      <p className="bg-gradient-to-br from-brand-600 to-brand-400 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
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

        {pillars && (
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
                    <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100">
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
        )}

        <section className="border-t border-border bg-surface-soft">
          <TimelineFeatures
            features={solution.features}
            eyebrow="Le détail"
            title={`Ce que ${solution.name} change pour vous.`}
          />
        </section>

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
            {others.map((other, i) => {
              const OtherIcon = other.icon;
              return (
                <Reveal key={other.slug} delay={i * 0.06}>
                  <Link
                    href={`/nos-solutions/${other.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
                      <OtherIcon weight="duotone" className="size-6" />
                    </span>
                    <p className="mt-5 text-lg font-bold text-ink">
                      {other.name}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {other.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Découvrir
                      <ArrowRight
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

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
