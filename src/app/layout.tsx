import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Geist_Mono } from "next/font/google";
import FloatingWhatsAppButton from "@/components/site/floating-whatsapp-button";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const value = "1234567890";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom AI Voice Agents for Sales & Support | Kallix",
  description:
    "Kallix provides custom-built, human-like AI voice agents. We design and deploy solutions to automate your sales, customer support, and booking calls 24/7. Request a custom demo!",
  keywords:
    "AI voice agents, automated calls, customer support, sales automation, voice AI, conversational AI, call automation",
  authors: [{ name: "Kallix" }],
  creator: "Kallix",
  publisher: "Kallix",
  metadataBase: new URL("https://kallix.in"),
  alternates: {
    canonical: "https://kallix.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kallix.in",
    title: "Custom AI Voice Agents for Sales & Support | Kallix",
    description:
      "Kallix provides custom-built, human-like AI voice agents. We design and deploy solutions to automate your sales, customer support, and booking calls 24/7.",
    siteName: "Kallix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kallix - Custom AI Voice Agents for Sales & Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom AI Voice Agents for Sales & Support | Kallix",
    description:
      "Kallix provides custom-built, human-like AI voice agents. We design and deploy solutions to automate your sales, customer support, and booking calls 24/7.",
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

const GA_MEASUREMENT_ID = "G-LX5FYK3KQ7";
const isProd = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {isProd && (
          <>
            <Script
              id="ga-measurement"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-inline" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}</Script>
          </>
        )}
      </head>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <FloatingWhatsAppButton />
        {children}
      </body>
    </html>
  );
}
