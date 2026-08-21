import { ChatCircleDots, Robot, TrendDown } from "@phosphor-icons/react/dist/ssr";

const bars = [38, 52, 44, 61, 55, 72, 64];

const vehicles = [
  { plate: "AB-421-CD", status: "OK", tone: "neutral" },
  { plate: "GH-093-JK", status: "Entretien prévu", tone: "brand" },
  { plate: "LM-772-NP", status: "OK", tone: "neutral" },
];

export function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[480px] pointer-events-none"
      style={{ perspective: 1000 }}
    >
      <div
        className="[transform-style:preserve-3d]"
        style={{ transform: "rotateX(8deg) rotateY(-14deg) rotateZ(-1deg)" }}
      >
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 bg-brand-100"
          style={{ borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" }}
        />

        <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">Vue flotte</p>
            <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-medium text-ink-soft">
              324 véhicules
            </span>
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium text-ink-soft">
              Coût total du mois
            </p>
            <div className="mt-1 flex items-end gap-2">
              <p className="text-3xl font-bold text-ink">
                48 210&nbsp;€
              </p>
              <span className="mb-1 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                <TrendDown weight="bold" className="size-4" />
                12%
              </span>
            </div>
          </div>

          <div className="mt-5 flex h-20 items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`animate-grow-bar flex-1 rounded-full transition-colors duration-300 ${
                  i === bars.length - 1
                    ? "bg-brand-600"
                    : "bg-brand-100 hover:bg-brand-400"
                }`}
                style={{ height: `${h}%`, animationDelay: `${300 + i * 70}ms` }}
              />
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
            {vehicles.map((v) => (
              <div key={v.plate} className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-soft">
                  {v.plate}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    v.tone === "brand"
                      ? "bg-brand-50 text-brand-700"
                      : "bg-surface-soft text-ink-soft"
                  }`}
                >
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-7 -left-6 w-60 sm:-left-10">
          <div className="animate-bounce-in relative flex items-start gap-3 rounded-[1.4rem] rounded-bl-md border border-border bg-card p-4">
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <Robot weight="fill" className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-2.5 items-center justify-center rounded-full bg-card">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              </span>
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">Oslo · Go Assist</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
                <ChatCircleDots weight="fill" className="size-3.5 shrink-0 text-brand-500" />
                3 conducteurs en attente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
