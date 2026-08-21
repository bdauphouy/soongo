import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { blogArticles, getArticle, getCategory } from "@/lib/blog";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} | Blog SoonGo`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage(
  props: PageProps<"/blog/[slug]">
) {
  const { slug } = await props.params;
  const article = getArticle(slug);

  if (!article) notFound();

  const category = getCategory(article.category);
  const Icon = category?.icon;
  const related = blogArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-14 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
        <Reveal>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft
              weight="bold"
              className="size-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            />
            Retour au blog
          </Link>
        </Reveal>

        {category && (
          <Reveal delay={0.05}>
            <div className="mt-8 flex items-center gap-3">
              {Icon && (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon weight="duotone" className="size-5" />
                </span>
              )}
              <p className="text-xs font-semibold uppercase text-brand-600">
                {category.name}
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-xl leading-relaxed text-ink-soft">
            {article.excerpt}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col gap-5 border-t border-border pt-10">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface-soft">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <Reveal className="max-w-2xl">
              <p className="text-xs font-semibold uppercase text-brand-600">
                À lire aussi
              </p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                Sur le même sujet.
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other, i) => (
                <Reveal key={other.slug} delay={i * 0.06}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100"
                  >
                    <p className="text-lg font-bold text-ink">{other.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                      {other.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                      Lire la suite
                      <ArrowRight
                        weight="bold"
                        className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
