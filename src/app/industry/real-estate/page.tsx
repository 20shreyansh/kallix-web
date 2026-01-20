"use client";
import { TopBanner, useBannerVisibility } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { HeroSection } from "@/components/industry/real-estate/hero-section";
import { ProblemsSection } from "@/components/industry/real-estate/problems-section";
import { FeaturesSection } from "@/components/industry/real-estate/features-section";
import { StatsSection } from "@/components/industry/real-estate/stats-section";
import { BoostSection } from "@/components/industry/real-estate/boost-section";
import { AiAgentExperienceSection } from "@/components/industry/ai-agent-experience-section";
import { FaqSection } from "@/components/industry/faq-section";
import BenefitsSection from "@/components/industry/real-estate/benefits";

export default function RealEstatePage() {
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
        <ProblemsSection />
        <BoostSection />
        <FeaturesSection />
        <StatsSection />
        <BenefitsSection />
        <AiAgentExperienceSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
