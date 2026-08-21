import {
  BookOpen,
  Car,
  Leaf,
  Lightning,
  Receipt,
  Scales,
  TrendUp,
  UsersThree,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

export type BlogCategory = {
  slug: string;
  name: string;
  icon: Icon;
};

export const blogCategories: readonly BlogCategory[] = [
  { slug: "electrification", name: "Électrification", icon: Lightning },
  { slug: "aen", name: "AEN", icon: Wallet },
  { slug: "rse", name: "RSE", icon: Leaf },
  { slug: "reglementation", name: "Réglementation", icon: Scales },
  { slug: "fiscalite", name: "Fiscalité", icon: Receipt },
  { slug: "rh", name: "RH", icon: UsersThree },
  { slug: "marche", name: "Marché", icon: TrendUp },
  { slug: "gestion-de-flotte", name: "Gestion de flotte", icon: Car },
  { slug: "mode-demploi", name: "Mode d'emploi", icon: BookOpen },
] as const;

export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: readonly string[];
};

export const blogArticles: readonly BlogArticle[] = [
  {
    slug: "faut-il-arreter-de-donner-des-voitures-de-fonction",
    title: "Faut-il arrêter de donner des voitures de fonction ?",
    category: "rh",
    excerpt:
      "Entre coûts croissants, attentes des collaborateurs et alternatives de mobilité, la voiture de fonction n'est plus une évidence. On fait le point.",
    content: [
      "La voiture de fonction reste un avantage très recherché, mais son coût total ne cesse d'augmenter : fiscalité, entretien, assurance et dépréciation pèsent de plus en plus lourd dans les budgets RH.",
      "Dans le même temps, une partie des collaborateurs, notamment en zone urbaine, préfère des alternatives plus flexibles : forfait mobilité durable, budget mobilité ou véhicule partagé.",
      "Plutôt que de trancher entre \"tout voiture\" ou \"zéro voiture\", les flottes les plus matures segmentent leur politique par profil de poste et de trajet, et pilotent l'ensemble depuis une seule plateforme.",
    ],
  },
  {
    slug: "pression-des-pneus-un-cout-cache",
    title: "Pression des pneus : un coût caché",
    category: "gestion-de-flotte",
    excerpt:
      "Un pneu sous-gonflé de 20% consomme plus, s'use plus vite et augmente le risque d'incident. Un sujet discret qui pèse pourtant lourd sur le TCO.",
    content: [
      "La pression des pneus est l'un des points d'entretien les plus négligés d'une flotte, alors qu'elle influence directement la consommation de carburant, l'usure et la sécurité des conducteurs.",
      "Un suivi automatisé, alimenté par les données constructeur ou la télématique, permet de détecter les dérives avant qu'elles ne se traduisent en surcoût ou en sinistre.",
      "À l'échelle d'un parc de plusieurs centaines de véhicules, ce type de contrôle automatique peut représenter plusieurs points de pourcentage d'économies sur le budget carburant.",
    ],
  },
  {
    slug: "quelle-est-la-vraie-autonomie-des-voitures-electriques",
    title: "Quelle est la vraie autonomie des voitures électriques ?",
    category: "electrification",
    excerpt:
      "Entre l'autonomie annoncée par les constructeurs et celle constatée sur le terrain, l'écart peut être important. De quoi dépend-il vraiment ?",
    content: [
      "Les autonomies homologuées (cycle WLTP) sont mesurées dans des conditions standardisées qui ne reflètent pas toujours l'usage réel : température, style de conduite, charge du véhicule ou usage de la climatisation font varier l'autonomie de 15 à 30%.",
      "Pour une flotte, la question n'est pas tant l'autonomie théorique que l'autonomie utile sur les trajets réellement parcourus par les conducteurs.",
      "Croiser les données de trajets existants avec les caractéristiques des modèles électriques permet de sécuriser une transition vers l'électrique sans mauvaise surprise.",
    ],
  },
  {
    slug: "comment-verdir-sa-flotte-auto-intelligemment",
    title: "Comment verdir sa flotte auto intelligemment ?",
    category: "rse",
    excerpt:
      "Électrification, rationalisation, éco-conduite : verdir une flotte ne se résume pas à changer de motorisation. Voici les leviers qui comptent vraiment.",
    content: [
      "La décarbonation d'une flotte automobile passe par plusieurs leviers complémentaires : réduction du nombre de véhicules, électrification progressive, éco-conduite, et arbitrage des trajets professionnels.",
      "Prioriser ces leviers nécessite une vision claire du TCO et des émissions par véhicule, ce qui suppose des données fiables et centralisées.",
      "Les flottes qui avancent le plus vite sont celles qui pilotent leur trajectoire de décarbonation directement depuis leur outil de gestion de flotte, avec des objectifs suivis dans le temps.",
    ],
  },
  {
    slug: "recuperation-de-tva-sur-les-vehicules-de-fonction",
    title: "Récupération de TVA sur les véhicules de fonction",
    category: "fiscalite",
    excerpt:
      "Un dispositif fiscal souvent sous-exploité, qui peut représenter des économies significatives sur trois ans pour un parc de véhicules de société.",
    content: [
      "Sous certaines conditions, la TVA sur les véhicules de société peut être récupérée progressivement sur une période de trois ans, à condition de documenter correctement chaque véhicule éligible.",
      "En pratique, ce suivi est chronophage et sujet à erreur lorsqu'il est réalisé manuellement, ce qui conduit de nombreuses entreprises à ne pas exploiter pleinement ce dispositif.",
      "Automatiser le calcul et la documentation permet de sécuriser la récupération sans mobiliser d'heures supplémentaires côté finance.",
    ],
  },
  {
    slug: "credit-mobilite-une-alternative-au-vehicule-de-fonction",
    title: "Crédit mobilité : une alternative au véhicule de fonction ?",
    category: "mode-demploi",
    excerpt:
      "Transports en commun, vélo, autopartage : le crédit mobilité permet aux collaborateurs d'arbitrer eux-mêmes leurs déplacements. Comment le mettre en place ?",
    content: [
      "Le crédit mobilité consiste à convertir tout ou partie de l'avantage \"voiture de fonction\" en un budget que le collaborateur peut allouer à différents modes de transport.",
      "Sa mise en place suppose de définir des règles claires : montant du crédit, modes de transport éligibles, et articulation avec la fiscalité applicable à chaque usage.",
      "Bien cadré, ce dispositif peut réduire le coût global de la mobilité tout en répondant aux attentes des collaborateurs qui n'ont pas besoin d'une voiture au quotidien.",
    ],
  },
  {
    slug: "avantage-en-nature-vehicule-ce-qui-change",
    title: "Avantage en nature véhicule : ce qui change",
    category: "aen",
    excerpt:
      "Le calcul de l'avantage en nature évolue régulièrement, avec des règles spécifiques pour les véhicules électriques. Un point de vigilance pour la paie comme pour les conducteurs.",
    content: [
      "L'avantage en nature lié à la mise à disposition d'un véhicule de fonction fait l'objet de règles de calcul précises, qui varient selon le mode de financement, l'ancienneté du véhicule et sa motorisation.",
      "Les véhicules électriques bénéficient de dispositifs d'abattement spécifiques, ce qui rend le calcul encore plus sensible aux erreurs si le suivi n'est pas automatisé.",
      "Un calcul fiabilisé et à jour évite les régularisations en fin d'année, aussi bien pour l'entreprise que pour les conducteurs concernés.",
    ],
  },
  {
    slug: "malus-ecologique-ce-qui-attend-les-flottes",
    title: "Malus écologique : ce qui attend les flottes en 2026",
    category: "reglementation",
    excerpt:
      "Les seuils du malus CO2 et du malus au poids continuent de se durcir. Comment anticiper leur impact sur le coût d'acquisition de vos véhicules ?",
    content: [
      "Le barème du malus écologique est révisé chaque année, avec des seuils d'émissions de plus en plus bas et un malus au poids qui concerne un nombre croissant de modèles.",
      "Pour une flotte, l'enjeu est d'anticiper ces évolutions dans les arbitrages de renouvellement, plutôt que de les subir au moment de la commande.",
      "Intégrer ces paramètres réglementaires directement dans les simulations d'achat permet de sécuriser le budget flotte d'une année sur l'autre.",
    ],
  },
  {
    slug: "penurie-de-vehicules-neufs-ou-en-est-le-marche",
    title: "Pénurie de véhicules neufs : où en est le marché ?",
    category: "marche",
    excerpt:
      "Après plusieurs années de tension sur les délais de livraison, la situation évolue. Panorama du marché automobile pour les flottes d'entreprise.",
    content: [
      "Les délais de livraison des véhicules neufs, particulièrement tendus depuis la crise des semi-conducteurs, se normalisent progressivement selon les segments et les motorisations.",
      "Cette évolution redonne des marges de manœuvre aux gestionnaires de flotte dans leurs stratégies d'achat et de renouvellement.",
      "Suivre ces tendances de marché en temps réel permet d'ajuster ses commandes et d'éviter les périodes les plus tendues.",
    ],
  },
] as const;

export function getArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}
