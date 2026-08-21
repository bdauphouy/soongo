import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ProofStrip } from "@/components/proof-strip";
import { SolutionsSection } from "@/components/solutions-section";
import { ImageBanner } from "@/components/image-banner";
import { EcosystemMarquee } from "@/components/ecosystem-marquee";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ProofStrip />
        <SolutionsSection />
        <ImageBanner />
        <EcosystemMarquee />
        <HowItWorks />
        <Testimonials />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
