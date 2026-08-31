import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/reveal";
import type { BlogArticle } from "@/modules/blog/lib/blog";

type Props = {
  articles: readonly BlogArticle[];
};

export function RelatedArticles({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
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
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100"
              >
                <p className="text-lg font-bold text-ink">{article.title}</p>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                  {article.excerpt}
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
  );
}
