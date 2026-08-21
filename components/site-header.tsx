"use client";

import { Button } from "@/components/ui/button";
import { solutionCardStyles, solutionHref, solutions } from "@/lib/solutions";
import logo from "@/public/brand/logo-soongo.png";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const links = [
  { href: "/#ecosysteme", label: "Écosystème" },
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openSolutions() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setSolutionsOpen(true);
  }

  function scheduleCloseSolutions() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setSolutionsOpen(false), 200);
  }

  return (
    <header className="sticky z-50 px-4 sm:px-6 lg:px-0 top-4">
      <div className="relative mx-auto max-w-7xl lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-[2rem] border border-border/70 bg-card/90 pl-5 pr-2.5 shadow-[0_4px_16px_-8px_rgba(87,18,58,0.18)] backdrop-blur-md sm:pr-3 lg:h-[4.25rem] lg:pl-6">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="SoonGo, accueil"
          >
            <Image
              src={logo}
              alt="SoonGo"
              height={22}
              priority
              className="h-5 w-auto sm:h-5.5"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <div
              className="relative"
              onMouseEnter={openSolutions}
              onMouseLeave={scheduleCloseSolutions}
              onFocus={openSolutions}
              onBlur={scheduleCloseSolutions}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                aria-haspopup="true"
                aria-expanded={solutionsOpen}
              >
                Solutions
                <CaretDown
                  weight="bold"
                  className={`size-3 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${solutionsOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/#demo" withArrow>
              Demander une démo
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full text-ink transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <List className="size-6" />}
          </button>
        </div>

        {/* Solutions mega menu — pops out of the island like a bubble */}
        <div className="pointer-events-none absolute inset-x-0 top-full z-40 mt-3 hidden justify-center px-2 lg:flex">
          <div
            onMouseEnter={openSolutions}
            onMouseLeave={scheduleCloseSolutions}
            className={`w-full max-w-4xl origin-top rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-ink/10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              solutionsOpen
                ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-3 scale-90 opacity-0"
            }`}
          >
            <div className="grid grid-cols-4 gap-3">
              {solutions.map((solution, i) => {
                const style = solutionCardStyles[i];
                const Icon = solution.icon;
                const isAssist = solution.slug === "go-assist";

                return (
                  <Link
                    key={solution.slug}
                    href={solutionHref(solution.slug)}
                    className={`group/tile flex flex-col rounded-2xl p-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:scale-[1.02] ${style.wrap} ${style.span}`}
                  >
                    <span
                      className={`flex size-9 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/tile:scale-110 group-hover/tile:-rotate-6 ${style.icon}`}
                    >
                      <Icon weight="duotone" className="size-4.5" />
                    </span>
                    <p className="mt-3 text-sm font-bold">{solution.name}</p>
                    <p
                      className={`mt-0.5 text-xs font-semibold ${style.tagline}`}
                    >
                      {solution.tagline}
                    </p>
                    <p
                      className={`mt-2 line-clamp-2 text-xs leading-relaxed ${style.body}`}
                    >
                      {solution.description}
                    </p>
                    {!isAssist && (
                      <span
                        className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${style.link}`}
                      >
                        Découvrir
                        <ArrowRight
                          weight="bold"
                          className="size-3.5 transition-transform duration-300 ease-out group-hover/tile:translate-x-1"
                        />
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile menu — pops out of the island like a bubble */}
        {open && (
          <div className="absolute inset-x-0 top-full z-40 mt-3 lg:hidden">
            <div className="animate-bounce-in origin-top rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-ink/10">
              <nav className="flex flex-col gap-1">
                <details className="group/details">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-3 py-3 text-base font-medium text-ink-soft hover:bg-surface-soft hover:text-ink">
                    Solutions
                    <CaretDown
                      weight="bold"
                      className="size-3.5 transition-transform duration-300 group-open/details:rotate-180"
                    />
                  </summary>
                  <div className="flex flex-col gap-1 pb-2 pl-3">
                    {solutions.map((solution) => (
                      <a
                        key={solution.slug}
                        href={solutionHref(solution.slug)}
                        onClick={() => setOpen(false)}
                        className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface-soft hover:text-ink"
                      >
                        {solution.name}
                      </a>
                    ))}
                  </div>
                </details>

                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-3 py-3 text-base font-medium text-ink-soft hover:bg-surface-soft hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Button href="/#demo" withArrow className="mt-4 w-full">
                Demander une démo
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
