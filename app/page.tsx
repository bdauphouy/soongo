import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { SolutionsSection } from "@/components/solutions-section";
import { ImageBanner } from "@/components/image-banner";
import { EcosystemMarquee } from "@/components/ecosystem-marquee";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <SolutionsSection />
      <ImageBanner />
      <EcosystemMarquee />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
