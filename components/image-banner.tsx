import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function ImageBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative h-[380px] overflow-hidden rounded-3xl sm:h-[440px]">
          <Image
            src="https://picsum.photos/seed/soongo-fleet-yard/1800/1000"
            alt="Parc de véhicules professionnels garés côte à côte"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
            <p className="max-w-md text-2xl font-bold text-white sm:text-3xl">
              Une flotte plus sereine, au quotidien.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
