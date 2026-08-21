import {
  Broadcast,
  Certificate,
  CreditCard,
  Plug,
  ShieldCheck,
  Truck,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

const integrations = [
  { label: "Télématique", icon: Broadcast },
  { label: "Location longue durée", icon: Truck },
  { label: "Bornes de recharge", icon: Plug },
  { label: "Cartes carburant", icon: CreditCard },
  { label: "Maintenance", icon: Wrench },
  { label: "Assurance", icon: ShieldCheck },
  { label: "ANTAI & SIV", icon: Certificate },
];

function Pill({ label, icon: Icon }: (typeof integrations)[number]) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3">
      <Icon weight="duotone" className="size-5 text-brand-600" />
      <span className="text-sm font-medium text-ink whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function EcosystemMarquee() {
  return (
    <section id="ecosysteme" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Connecté à tout votre écosystème mobilité.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            SoonGo se branche sur les outils que vous utilisez déjà :
            télématique, location, recharge, carburant, maintenance,
            assurance et démarches administratives.
          </p>
        </Reveal>
      </div>

      <Reveal
        delay={0.1}
        className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max gap-4 animate-marquee">
          {[...integrations, ...integrations].map((item, i) => (
            <Pill key={`${item.label}-${i}`} {...item} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
