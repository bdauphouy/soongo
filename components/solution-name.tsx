import Image from "next/image";
import prefix from "@/public/brand/prefix.png";

export function SolutionName({
  name,
  invert = false,
  className = "",
}: {
  name: string;
  invert?: boolean;
  className?: string;
}) {
  const suffix = name.replace(/^Go\s*/, "");

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Image
        src={prefix}
        alt="Go"
        className={`h-[0.85em] w-auto ${invert ? "brightness-0 invert" : ""}`}
      />
      {suffix}
    </span>
  );
}
