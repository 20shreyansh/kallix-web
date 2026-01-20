import { Metadata } from "next";

export const metadata: Metadata = {
  title: "24/7 AI Agent for Home Services | Automate Bookings | Kallix",
  description:
    "Stop losing revenue to missed calls. Kallix is the 24/7 AI agent for home services that answers every call, qualifies leads, and automatically books appointments.",
  keywords:
    "AI agent home services, automated booking, home services AI, contractor AI, plumber AI, HVAC AI, landscaping AI, cleaning services AI, home repair automation, service scheduling AI",
  authors: [{ name: "Kallix" }],
  creator: "Kallix",
  publisher: "Kallix",
  metadataBase: new URL("https://kallix.in"),
  alternates: {
    canonical: "https://kallix.in/industry/home-services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kallix.in/industry/home-services",
    title: "24/7 AI Agent for Home Services | Automate Bookings | Kallix",
    description:
      "Stop losing revenue to missed calls. Kallix is the 24/7 AI agent for home services that answers every call, qualifies leads, and automatically books appointments.",
    siteName: "Kallix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kallix - 24/7 AI Agent for Home Services | Automate Bookings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 AI Agent for Home Services | Automate Bookings | Kallix",
    description:
      "Stop losing revenue to missed calls. Kallix is the 24/7 AI agent for home services that answers every call, qualifies leads, and automatically books appointments.",
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

export default function HomeServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
