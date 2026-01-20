"use client";

import { TopBanner, useBannerVisibility } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ComingSoon } from "@/components/site/coming-soon";

export default function FinancialServicesPage() {
  const isBannerVisible = useBannerVisibility();
  
  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      <main
        className={`${
          isBannerVisible ? "mt-12 sm:mt-14" : "mt-0 sm:mt-4"
        } px-0 z-0`}
      >
        <ComingSoon 
          title="Financial Services Automation"
          description="We are currently training our voice engine to master the specific nuances, vocabulary, and workflows of Financial Services. Seamless, human-like interaction for this sector is arriving soon."
          industry="Financial Services"
        />
      </main>
      <SiteFooter />
    </div>
  );
}