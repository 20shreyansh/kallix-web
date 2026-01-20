import { Metadata } from "next";

export const metadata: Metadata = {
  title: "24/7 AI Voice Agent for Real Estate | Qualify Leads & Book Property Visits | Kallix AI",
  description:
    "Maximize your speed-to-lead. Kallix is the 24/7 AI Real Estate ISA that answers every call instantly, qualifies motivated buyers & sellers, and automates property viewing appointments directly to your CRM.",
  keywords:
    "AI agent real estate, real estate AI assistant, property lead qualification, automated property showings, real estate ISA, AI for realtors, real estate automation, buyer qualification AI, property viewing scheduler, real estate CRM integration, AI voice agent real estate",
  authors: [{ name: "Kallix" }],
  creator: "Kallix",
  publisher: "Kallix",
  metadataBase: new URL("https://kallix.in"),
  alternates: {
    canonical: "https://kallix.in/industry/real-estate",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kallix.in/industry/real-estate",
    title: "24/7 AI Voice Agent for Real Estate | Qualify Leads & Book Property Visits | Kallix AI",
    description:
      "Maximize your speed-to-lead. Kallix is the 24/7 AI Real Estate ISA that answers every call instantly, qualifies motivated buyers & sellers, and automates property viewing appointments directly to your CRM.",
    siteName: "Kallix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kallix - 24/7 AI Voice Agent for Real Estate | Qualify Leads & Book Property Visits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 AI Voice Agent for Real Estate | Qualify Leads & Book Property Visits | Kallix AI",
    description:
      "Maximize your speed-to-lead. Kallix is the 24/7 AI Real Estate ISA that answers every call instantly, qualifies motivated buyers & sellers, and automates property viewing appointments directly to your CRM.",
    images: ["/og-image.png"],
    creator: "@kallix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
