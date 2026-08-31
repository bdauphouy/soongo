import { CaretDown } from "@phosphor-icons/react/ssr";
import { DemoButton } from "@/modules/booking/components/demo-button";
import { pageSolutions, solutionHref } from "@/modules/solutions/lib/solutions";
import { SolutionName } from "@/components/solution-name";

type NavLink = { href: string; label: string };

type Props = {
  rendered: boolean;
  open: boolean;
  onAnimationEnd: () => void;
  onClose: () => void;
  links: readonly NavLink[];
  solutionsOpen: boolean;
  onToggleSolutions: () => void;
};

export function MobileMenu({
  rendered,
  open,
  onAnimationEnd,
  onClose,
  links,
  solutionsOpen,
  onToggleSolutions,
}: Props) {
  if (!rendered) return null;

  return (
    <div className="absolute inset-x-0 top-full z-40 mt-3 lg:hidden">
      <div
        onAnimationEnd={onAnimationEnd}
        className={`${open ? "animate-bounce-in" : "animate-bounce-out"} origin-top rounded-4xl border border-border bg-card p-4 shadow-2xl shadow-ink/10`}
      >
        <nav className="flex flex-col gap-1">
          <div>
            <button
              type="button"
              onClick={onToggleSolutions}
              aria-expanded={solutionsOpen}
              className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-3 py-3 text-base font-medium text-ink-soft hover:bg-surface-soft hover:text-ink"
            >
              Solutions
              <CaretDown
                weight="bold"
                className={`size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  solutionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ gridTemplateRows: solutionsOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 pb-2 pl-3">
                  {pageSolutions.map((solution) => {
                    const Icon = solution.icon;

                    return (
                      <a
                        key={solution.slug}
                        href={solutionHref(solution.slug)}
                        onClick={onClose}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface-soft hover:text-ink"
                      >
                        <Icon
                          weight="duotone"
                          className="size-4 shrink-0 text-brand-600"
                        />
                        <SolutionName name={solution.name} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-2xl px-3 py-3 text-base font-medium text-ink-soft hover:bg-surface-soft hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <DemoButton withArrow className="mt-4 w-full" onClick={onClose}>
          Demander une démo
        </DemoButton>
      </div>
    </div>
  );
}
