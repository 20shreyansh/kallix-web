"use client";

import { TopBanner, useBannerVisibility } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ComingSoon } from "@/components/site/coming-soon";

export default function RetailPage() {
  const isBannerVisible = useBannerVisibility();
  
  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      <main
        className={`${
          isBannerVisible ? "mt-12 sm:mt-14" : "mt-0 sm:mt-4"
        } z-0`}
      >
        <ComingSoon 
          title="Retail Automation"
          description="We are currently training our voice engine to master the specific nuances, vocabulary, and workflows of Retail. Seamless, human-like interaction for this sector is arriving soon."
          industry="Retail"
        />
      </main>
      <SiteFooter />
    </div>
  );
}