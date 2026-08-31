import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { pageSolutions, solutionHref } from "@/modules/solutions/lib/solutions";
import { SolutionName } from "@/components/solution-name";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function SolutionsMegaMenu({ open, onOpen, onClose }: Props) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-full z-40 mt-3 hidden justify-center px-2 lg:flex">
      <div
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        className={`w-full max-w-4xl origin-top rounded-4xl border border-border bg-card p-4 shadow-2xl shadow-ink/10 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          open
            ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-3 scale-90 opacity-0"
        }`}
      >
        <div className="grid grid-cols-4 gap-3">
          {pageSolutions.map((solution) => {
            const style = solution.cardStyle;
            const Icon = solution.icon;

            return (
              <Link
                key={solution.slug}
                href={solutionHref(solution.slug)}
                className={`group/tile flex flex-col rounded-2xl p-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 ${style.wrap}`}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/tile:scale-110 group-hover/tile:-rotate-6 ${style.icon}`}
                >
                  <Icon weight="duotone" className="size-4.5" />
                </span>
                <p className="mt-3 text-sm font-bold">
                  <SolutionName
                    name={solution.name}
                    invert={style.wrap.includes("text-white")}
                  />
                </p>
                <p className={`mt-0.5 text-xs font-semibold ${style.tagline}`}>
                  {solution.tagline}
                </p>
                <p
                  className={`mt-2 line-clamp-2 text-xs leading-relaxed ${style.body}`}
                >
                  {solution.description}
                </p>
                <span
                  className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${style.link}`}
                >
                  Découvrir
                  <ArrowRight
                    weight="bold"
                    className="size-3.5 transition-transform duration-300 ease-out group-hover/tile:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
