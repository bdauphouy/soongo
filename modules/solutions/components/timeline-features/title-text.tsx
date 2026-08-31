import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
};

export function TitleText({ eyebrow, title }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-semibold uppercase text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}
