import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Kallix",
  description:
    "Read Kallix's terms of use for our AI voice agent services. Understand your rights and responsibilities when using our custom AI voice solutions.",
  alternates: {
    canonical: "https://kallix.in/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
