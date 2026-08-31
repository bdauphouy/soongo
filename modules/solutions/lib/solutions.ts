import {
  Broadcast,
  ChartLineUp,
  Robot,
  Sparkle,
  SteeringWheel,
} from "@phosphor-icons/react/ssr";

export const solutions = [
  {
    slug: "go-pilot",
    name: "Go Pilot",
    tagline: "Le pilotage automatique du quotidien",
    description:
      "Commandes, entretien, sinistres, amendes : Go Pilot automatise les tâches opérationnelles qui ralentissent vos gestionnaires de flotte.",
    icon: SteeringWheel,
    kind: "stats-only",
    cardStyle: {
      wrap: "bg-ink text-white",
      icon: "bg-brand-600 text-white",
      tagline: "text-brand-400",
      body: "text-white/70",
      link: "text-white",
      span: "sm:col-span-2 lg:col-span-2",
    },
    stats: [
      { value: "25%", label: "de gain de temps garanti" },
      { value: "30+", label: "contrôles et alertes automatiques" },
    ],
    features: [
      "Automatisation des commandes, retours, immobilisations et gestion des cartes carburant et bornes de recharge",
      "Désignation automatique des PV et forfaits post-stationnement via une connexion ANTAI",
      "Déclaration de sinistres, transmission à l'assurance et suivi de statut de bout en bout",
      "Relances automatiques des conducteurs pour la prise de rendez-vous d'entretien",
      "Attribution et repositionnement des véhicules selon les règles kilométriques",
      "Contrôles automatiques : dérive kilométrique, consommation, éco-conduite, facturation",
      "Compatible véhicules électriques, hybrides, thermiques, utilitaires et particuliers",
    ],
  },
  {
    slug: "go-data",
    name: "Go Data",
    tagline: "Toutes vos données, un seul endroit",
    description:
      "Centralisez les données de votre parc et suivez votre coût total de possession en temps réel, grâce à des tableaux de bord clairs.",
    icon: ChartLineUp,
    kind: "stats-only",
    cardStyle: {
      wrap: "bg-card text-ink border border-border",
      icon: "bg-brand-50 text-brand-600",
      tagline: "text-brand-600",
      body: "text-ink-soft",
      link: "text-brand-600",
      span: "sm:col-span-1 lg:col-span-1",
    },
    stats: [
      { value: "150+", label: "KPIs à votre disposition" },
      { value: "100%", label: "des données centralisées automatiquement" },
    ],
    features: [
      "Collecte automatique des données de tous vos partenaires : constructeurs, loueurs, entretien, télématique, carburant, bornes, péages, parking, notes de frais, assurance, RH",
      "Architecture unique combinant connecteurs et IA de vision par ordinateur",
      "Plus de 150 KPIs disponibles, avec options de segmentation et de comparaison",
      "Bilan carbone calculé en 3 clics, conforme aux méthodologies BEGES et GES",
      "Tableaux de bord personnalisables par chaque utilisateur",
      "Suivi du coût total de possession (TCO) et du score d'éco-conduite",
      "Utilisateurs et rapports illimités, exportables pour vos équipes finance",
    ],
  },
  {
    slug: "go-optimize",
    name: "Go Optimize",
    tagline: "Les bons leviers, au bon moment",
    description:
      "Go Optimize identifie et active les leviers qui réduisent vos coûts et vos émissions de CO2, sans effort de votre part.",
    icon: Sparkle,
    kind: "pillars",
    cardStyle: {
      wrap: "bg-brand-50 text-ink",
      icon: "bg-white text-brand-600",
      tagline: "text-brand-700",
      body: "text-ink-soft",
      link: "text-brand-700",
      span: "sm:col-span-1 lg:col-span-1",
    },
    stats: [
      { value: "50", label: "leviers d'optimisation identifiés" },
      { value: "100%", label: "des catégories de TCO couvertes" },
    ],
    pillars: [
      {
        title: "Simuler",
        description:
          "Identifiez les leviers les plus efficaces parmi 50 options : achats, rationalisation du parc, électrification, car policy, éco-conduite, fiscalité, trajets professionnels et domicile-travail.",
      },
      {
        title: "Projeter",
        description:
          "Construisez vos budgets et trajectoires CO2 directement dans SoonGo, avec des projections précises par collaborateur et par véhicule.",
      },
      {
        title: "Activer",
        description:
          "Passez du budget validé à l'action grâce à des feuilles de route claires, planifiées et suivies par un système de monitoring intelligent.",
      },
    ],
    features: [
      "Détection automatique des économies possibles sur l'ensemble du TCO",
      "Recommandations priorisées par impact et facilité de mise en œuvre",
      "Optimisation des avantages en nature et de la participation conducteur, avec simulation de scénarios et gestion du risque URSSAF",
      "Récupération de TVA sur les véhicules de société sur 3 ans, avec documentation automatisée",
      "Calcul et optimisation de l'amortissement non déductible (AND)",
      "Calcul automatique des taxes annuelles CO2 et polluants atmosphériques (TAECO2, TAEPA)",
      "Suivi de la trajectoire de décarbonation du parc directement depuis la plateforme",
    ],
  },
  {
    slug: "go-telematics",
    name: "Go Telematics",
    tagline: "La télématique sans boîtier",
    description:
      "Collectez les données de vos véhicules en temps réel, sans installation ni matériel supplémentaire à gérer.",
    icon: Broadcast,
    kind: "pillars",
    cardStyle: {
      wrap: "bg-card text-ink border border-border",
      icon: "bg-brand-50 text-brand-600",
      tagline: "text-brand-600",
      body: "text-ink-soft",
      link: "text-brand-600",
      span: "sm:col-span-2 lg:col-span-2",
    },
    stats: [
      { value: "95%", label: "des cas sans boîtier physique" },
      { value: "15%", label: "d'économies sur la consommation" },
    ],
    pillars: [
      {
        title: "Simple",
        description:
          "Dans 95% des cas, pas de boîtier : activez vos véhicules en 3 clics grâce à la donnée constructeur.",
      },
      {
        title: "Efficace",
        description:
          "Données constructeur disponibles pour toutes les marques, sans matériel additionnel à installer ou entretenir.",
      },
      {
        title: "Économique",
        description:
          "Moins coûteux qu'une télématique matérielle classique, avec un retour sur investissement rapide.",
      },
      {
        title: "Responsable",
        description:
          "Sécurité des conducteurs et réduction des émissions de CO2 grâce au suivi de l'éco-conduite.",
      },
    ],
    features: [
      "Kilométrage fiable et automatisé, sans déclaration conducteur",
      "Suivi fin de la consommation d'énergie, du niveau de batterie et des émissions de CO2",
      "Alertes de pression des pneus, d'entretien et de codes diagnostic en temps réel",
      "Données d'éco-conduite : vitesse, freinage, accélération",
      "Géolocalisation en temps réel, analyse de trajets et identification du véhicule le plus proche",
      "Jusqu'à -10% de sinistres et -5% de coûts de maintenance",
      "Conforme RGPD : collecte sélective, anonymisation et communication transparente aux conducteurs",
    ],
  },
  {
    slug: "go-assist",
    name: "Go Assist",
    tagline: "Un assistant disponible 24h/24",
    description:
      "Oslo, l'agent IA de Go Assist, répond aux questions de vos conducteurs à toute heure, sans mobiliser vos équipes.",
    icon: Robot,
    kind: "stats-only",
    cardStyle: {
      wrap: "bg-brand-600 text-white",
      icon: "bg-white text-brand-600",
      tagline: "text-white/85",
      body: "text-white/75",
      link: "text-white",
      span: "sm:col-span-2 lg:col-span-2",
    },
    stats: [
      { value: "24/7", label: "assistance téléphonique, 365 jours par an" },
      { value: "0", label: "installation requise pour vos conducteurs" },
    ],
    features: [
      "Réponses téléphoniques instantanées aux conducteurs, jour et nuit, 365 jours par an",
      "Traitement de la quasi-totalité des questions courantes des conducteurs",
      "Escalade automatique vers vos équipes si besoin",
      "Historique des échanges centralisé avec le reste de la flotte",
      "Aucune installation, disponible dès la connexion des conducteurs",
      "Libère du temps pour vous concentrer sur Go Data et Go Optimize",
    ],
  },
] as const;

export type Solution = (typeof solutions)[number];

export const pageSolutions = solutions.filter((s) => s.slug !== "go-assist");

export function solutionHref(slug: Solution["slug"]) {
  return slug === "go-assist" ? "/#go-assist" : `/nos-solutions/${slug}`;
}
