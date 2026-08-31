"use client";

import { DemoButton } from "@/modules/booking/components/demo-button";
import { useDismissableOverlay } from "@/lib/use-dismissable-overlay";
import logo from "@/public/brand/logo.png";
import { CaretDown, List, X } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { SolutionsMegaMenu } from "./solutions-mega-menu";

const links = [
  { href: "/#ecosysteme", label: "Écosystème" },
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const {
    open,
    mounted: menuRendered,
    hide: closeMenu,
    toggle: toggleMenu,
    onAnimationEnd: onMenuAnimationEnd,
  } = useDismissableOverlay();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeMenu]);

  function handleToggleMenu() {
    if (!open) setMobileSolutionsOpen(false);
    toggleMenu();
  }

  function openSolutions() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setSolutionsOpen(true);
  }

  function scheduleCloseSolutions() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => setSolutionsOpen(false), 200);
  }

  return (
    <header ref={headerRef} className="sticky z-50 px-4 sm:px-6 lg:px-0 top-4">
      <div className="relative mx-auto max-w-7xl lg:px-8">
        <div className="flex h-16 items-center justify-between rounded-4xl border border-border/70 bg-card/90 pl-5 pr-2.5 shadow-[0_4px_16px_-8px_rgba(87,18,58,0.18)] backdrop-blur-md sm:pr-3 lg:h-17 lg:pl-6">
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
            <DemoButton withArrow>Demander une démo</DemoButton>
          </div>

          <button
            type="button"
            onClick={handleToggleMenu}
            className="flex size-11 items-center justify-center rounded-full text-ink transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90 lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <List className="size-6" />}
          </button>
        </div>

        <SolutionsMegaMenu
          open={solutionsOpen}
          onOpen={openSolutions}
          onClose={scheduleCloseSolutions}
        />

        <MobileMenu
          rendered={menuRendered}
          open={open}
          onAnimationEnd={onMenuAnimationEnd}
          onClose={closeMenu}
          links={links}
          solutionsOpen={mobileSolutionsOpen}
          onToggleSolutions={() => setMobileSolutionsOpen((v) => !v)}
        />
      </div>
    </header>
  );
}
