import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "invert";
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variants = {
  primary:
    "btn-grain bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-3px_5px_0_rgba(87,18,58,0.35),0_10px_20px_-10px_rgba(255,31,120,0.55)] after:content-[''] after:absolute after:inset-0 after:z-[-1] after:rounded-[inherit] after:bg-brand-900/25 after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100 active:shadow-[inset_0_2px_4px_0_rgba(87,18,58,0.45),inset_0_-1px_0_0_rgba(255,255,255,0.15)]",
  secondary:
    "btn-grain bg-gradient-to-b from-card to-surface-soft text-ink border border-border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-2px_4px_0_rgba(28,18,24,0.06),0_2px_8px_-4px_rgba(28,18,24,0.12)] after:content-[''] after:absolute after:inset-0 after:z-[-1] after:rounded-[inherit] after:bg-ink/5 after:opacity-0 after:transition-opacity after:duration-500 hover:border-ink/20 hover:after:opacity-100 active:shadow-[inset_0_2px_3px_0_rgba(28,18,24,0.1)]",
  ghost: "text-ink hover:text-brand-600",
  invert:
    "btn-grain bg-white text-brand-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-2px_4px_0_rgba(87,18,58,0.12),0_10px_20px_-10px_rgba(0,0,0,0.35)] after:content-[''] after:absolute after:inset-0 after:z-[-1] after:rounded-[inherit] after:bg-brand-100/70 after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100 active:shadow-[inset_0_2px_4px_0_rgba(87,18,58,0.18)]",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  withArrow = false,
  className = "",
  children,
}: ButtonProps) {
  const classes = `group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[15px] font-semibold transition-[background,border-color,box-shadow,transform,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.94] ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          weight="bold"
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (!href) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
