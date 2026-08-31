import { Reveal } from "@/components/reveal";
import { BlogGrid } from "@/modules/blog/components/blog-grid";
import { blogArticles } from "@/modules/blog/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — SoonGo",
  description:
    "Fiscalité, électrification, RH, réglementation : nos experts décryptent les sujets qui font bouger la gestion de flotte.",
};

export default function BlogPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8 lg:pt-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase text-brand-600">
            Le blog SoonGo
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            Actualités et conseils pour piloter votre flotte.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Fiscalité, électrification, RH, réglementation : nos experts
            décryptent les sujets qui font bouger la gestion de flotte.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <BlogGrid articles={blogArticles} />
      </section>
    </>
  );
}
