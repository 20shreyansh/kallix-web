"use client";
import { TopBanner, useBannerVisibility } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { HeroSection } from "@/components/industry/home-services/hero-section";
import { KeyBenefitsSection } from "@/components/industry/home-services/key-benefits-section";
import { HowItWorksSection } from "@/components/industry/home-services/how-it-works-section";
import { AiAgentExperienceSection } from "@/components/industry/ai-agent-experience-section";
import { KallixAdvantageSection } from "@/components/industry/home-services/kallix-advantage-section";
import { FaqSection } from "@/components/industry/faq-section";
import UseCasesCarousel from "@/components/industry/home-services/use-cases-carousel";

export default function HomeServicesPage() {
  const isBannerVisible = useBannerVisibility();
  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      <main
        className={`${
          isBannerVisible ? "mt-12 sm:my-14" : "mt-0 sm:my-4"
        } sm:px-4 z-0`}
      >
        <HeroSection />
      </main>
      <KeyBenefitsSection />
      <UseCasesCarousel />
      <KallixAdvantageSection />
      <HowItWorksSection />
      <AiAgentExperienceSection />
      <FaqSection />
      <SiteFooter />
    </div>
  );
}
