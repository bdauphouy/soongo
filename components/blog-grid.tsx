"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { blogCategories, type BlogArticle } from "@/lib/blog";

export function BlogGrid({ articles }: { articles: readonly BlogArticle[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((article) => article.category === activeCategory)
    : articles;

  return (
    <>
      <Reveal delay={0.05} className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeCategory === null
              ? "bg-brand-600 text-white"
              : "border border-border bg-card text-ink-soft hover:text-ink"
          }`}
        >
          Tout
        </button>
        {blogCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === category.slug
                ? "bg-brand-600 text-white"
                : "border border-border bg-card text-ink-soft hover:text-ink"
            }`}
          >
            {category.name}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => {
          const category = blogCategories.find((c) => c.slug === article.category);
          const Icon = category?.icon;
          return (
            <Reveal key={article.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-100"
              >
                <div className="flex h-36 items-center justify-center bg-brand-50">
                  {Icon && (
                    <Icon
                      weight="duotone"
                      className="size-12 text-brand-600 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {category && (
                    <p className="text-xs font-semibold uppercase text-brand-600">
                      {category.name}
                    </p>
                  )}
                  <p className="mt-2 text-lg font-bold text-ink">{article.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                    Lire la suite
                    <ArrowRight
                      weight="bold"
                      className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}

        {filtered.length === 0 && (
          <p className="col-span-full text-base text-ink-soft">
            Aucun article dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </>
  );
}
