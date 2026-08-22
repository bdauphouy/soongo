import { solutions } from "@/lib/solutions";
import { SolutionName } from "@/components/solution-name";
import logo from "@/public/brand/logo.png";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Image
              src={logo}
              alt="SoonGo"
              height={22}
              className="h-5.5 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              La plateforme qui centralise, automatise et optimise la gestion de
              votre flotte automobile.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Solutions</p>
            <ul className="mt-4 flex flex-col gap-3">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={
                      solution.slug === "go-assist"
                        ? "/#go-assist"
                        : `/nos-solutions/${solution.slug}`
                    }
                    className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                  >
                    <SolutionName name={solution.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">Contact</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
              <li>
                <a
                  href="mailto:hello@soongo.co"
                  className="transition-colors hover:text-brand-600"
                >
                  hello@soongo.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-ink-soft">
            © 2026 SoonGo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
