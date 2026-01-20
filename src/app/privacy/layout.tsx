import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kallix",
  description:
    "Learn how Kallix collects, uses, and protects your personal information. Our comprehensive privacy policy covers data handling for AI voice agent services.",
  alternates: {
    canonical: "https://kallix.in/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
