import { Hero } from "./_components/hero";
import { ProofStrip } from "./_components/proof-strip";
import { SolutionsSection } from "@/modules/solutions/components/solutions-section";
import { ImageBanner } from "./_components/image-banner";
import { EcosystemMarquee } from "./_components/ecosystem-marquee";
import { HowItWorks } from "./_components/how-it-works";
import { Testimonials } from "./_components/testimonials";

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
