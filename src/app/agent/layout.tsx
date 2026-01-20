import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Voice Agents Demo | Kallix",
  description:
    "Try our AI voice agents for real estate, insurance, ecommerce, and hotel booking. Experience next-generation AI conversation with real-time voice interaction.",
  alternates: {
    canonical: "https://kallix.in/agent",
  },
};

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
