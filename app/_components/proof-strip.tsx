import Image from "next/image";
import { AnimatedNumber } from "@/components/animated-number";
import { Reveal } from "@/components/reveal";

const stats = [
  {
    value: 25,
    suffix: "%",
    label: "de temps administratif gagné",
    image: "https://images.unsplash.com/photo-1771758249853-415175dc29b9",
    alt: "Pile de documents administratifs",
  },
  {
    value: 17,
    suffix: "%",
    label: "de coût total de possession en moins",
    image: "https://images.unsplash.com/photo-1630165356623-266076eaceb6",
    alt: "Rangée de véhicules de flotte garés",
  },
  {
    value: 100,
    suffix: "%",
    label: "de vos mobilités pilotées vers la décarbonation",
    image: "https://images.unsplash.com/photo-1751553513025-424934387e75",
    alt: "Véhicule électrique en charge",
  },
];

export function ProofStrip() {
  return (
    <section className="border-y border-border bg-surface-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-3 sm:px-6 lg:px-8 lg:py-20">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className="group relative flex h-full min-h-70 flex-col justify-end overflow-hidden rounded-3xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5">
              <Image
                src={`${stat.image}?q=80&w=800&auto=format&fit=crop`}
                alt={stat.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />

              <div className="relative p-8">
                <p className="text-5xl font-bold text-white sm:text-6xl">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={i * 0.1}
                  />
                </p>
                <p className="mt-2 text-base text-white/80">{stat.label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
