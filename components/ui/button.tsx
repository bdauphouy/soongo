import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "invert";
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "bg-card text-ink border border-border hover:border-brand-400 hover:text-brand-600",
  ghost: "text-ink hover:text-brand-600",
  invert: "bg-white text-brand-700 hover:bg-brand-50",
};

export function Button({
  href,
  variant = "primary",
  withArrow = false,
  className = "",
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[15px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.06] active:scale-[0.94] ${variants[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowRight
          weight="bold"
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
