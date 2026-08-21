import Image from "next/image";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

// Témoignages provisoires, à remplacer par de vrais retours clients.
const testimonials = [
  {
    quote:
      "Depuis SoonGo, on ne court plus après les amendes et les échéances d'entretien. Tout est centralisé, notre équipe a retrouvé du temps.",
    name: "Camille Vasseur",
    role: "Responsable flotte, Groupe Ferrand Logistique",
    avatarSeed: "camille-vasseur-soongo",
  },
  {
    quote:
      "Le TCO de notre parc a enfin un vrai suivi. On sait où on perd de l'argent, et surtout comment agir dessus.",
    name: "Nassim Cherif",
    role: "Directeur des opérations, Delmas Environnement",
    avatarSeed: "nassim-cherif-soongo",
  },
  {
    quote:
      "Go Assist a désengorgé notre standard : les conducteurs ont une réponse à toute heure, sans qu'on ait à mobiliser quelqu'un le soir ou le week-end.",
    name: "Elise Rambert",
    role: "RH & mobilité, Groupe Vasco Transport",
    avatarSeed: "elise-rambert-soongo",
  },
  {
    quote:
      "Aucun boîtier à installer, aucune maintenance : on a la géolocalisation et le suivi d'éco-conduite de tout le parc dès la première semaine.",
    name: "Karim Belaïd",
    role: "Responsable exploitation, Fret Occitan",
    avatarSeed: "karim-belaid-soongo",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase text-brand-600">
          Ils en parlent
        </p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          Des flottes plus simples à piloter, au quotidien.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col rounded-2xl border border-border border-b-4 border-b-brand-600 bg-card p-5">
              <Quotes weight="fill" className="size-5 text-brand-200" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5">
                <Image
                  src={`https://i.pravatar.cc/80?u=${t.avatarSeed}`}
                  alt={t.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
