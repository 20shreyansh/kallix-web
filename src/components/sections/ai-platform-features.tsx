"use client";

import { Lightbulb } from "lucide-react";
import Image from "next/image";
import FlowingBorder from "../icon/FlowingBorder";
import FlowingVerticalLine from "../icon/FlowingVerticalLine";
import FlowingVerticalBorder from "../icon/FlowingVerticalBorder";

const features = [
  {
    id: "appointment-booking",
    title: "Automate Scheduling 24/7",
    description:
      "AI agent can book, reschedule, and confirm appointments around the clock, filling your calendar and freeing up your staff.",
    category: "Appointment Booking",
    position: "top-left",
  },
  {
    id: "smart-escalation",
    title: "Smart Call Escalation",
    description:
      "When a conversation requires a human touch, your agent intelligently escalates the call or creates a task for the right team member.",
    category: "Intelligent Automation",
    position: "center",
  },
  {
    id: "lead-qualification",
    title: "Qualify Leads Instantly",
    description:
      "Your agent calls new leads in seconds to ask qualifying questions and routes high-intent prospects directly to your sales team.",
    category: "Sales & Real Estate",
    position: "top-right",
  },
  {
    id: "order-inquiries",
    title: "Resolve Order Inquiries",
    description:
      'Automate answers to "Where is my order?" and handle COD confirmations, reducing returns and freeing up your support team.',
    category: "E-commerce Support",
    position: "bottom-left",
  },
  {
    id: "inbound-calls",
    title: "Answer Every Inbound Call",
    description:
      "Provide instant, accurate answers to questions about your services, pricing, and availability, ensuring you never miss a lead.",
    category: "Customer & Service Enquiry",
    position: "bottom-right",
  },
];

export default function AIPlatformFeatures() {
  return (
    <section className="relative py-20 px-0 nd:px-6 lg:px-8 overflow-hidden">
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto bg-[#202020] rounded-[24px] py-16 px-4 md:px-0">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-5xl mx-auto">
            We&apos;ve Built A Scalable AI Voice Platform That Powers Thousands
            Of Conversations For{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sales, Bookings, And Customer Support —
            </span>
            <span className="text-gray-300">
              Fast, Smart, And Always Available.
            </span>
          </h2>
        </div>

        {/* Mic concentric glow center */}
        <div
          className="pointer-events-none relative flex items-center w-full justify-center py-12 sm:py-0"
          aria-hidden
        >
          <span className="absolute top-8 w-full left-[17.2%] z-0 opacity-25 hidden sm:flex">
            <FlowingBorder />
          </span>
          <span className="absolute top-8 w-full left-[49.2%] z-0 opacity-25 hidden sm:flex">
            <FlowingVerticalBorder />
          </span>
          <span className="absolute left-[47%] top-28 w-full z-0 opacity-30 sm:hidden flex">
            <FlowingVerticalLine />
          </span>
          <div className="relative grid size-16 sm:size-20 place-items-center">
            <span className="bg-[#468EFD1F] absolute w-28 h-28 rounded-full border border-[#FFFFFF1A]" />
            <span className="bg-[#CE9EF224] absolute w-36 h-36 rounded-full border border-[#FFFFFF1A]" />
            {/* Stable mic container */}
            <span className="relative z-10 grid size-16 sm:size-20 place-items-center rounded-full bg-btn-gradient">
              <Image
                src="/icon/mic.png"
                alt="Microphone icon representing AI voice platform"
                width={44}
                height={44}
                className="w-8 h-8 transition-transform hover:scale-110"
              />
            </span>
          </div>
        </div>

        {/* Features layout - responsive grid */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop layout (lg and above) */}
          <div className="hidden lg:block relative h-[800px] mt-24">
            {/* Desktop positioned cards */}
            <div className="absolute top-0 left-0 w-80 z-10">
              <FeatureCard
                feature={features.find((f) => f.position === "top-left")!}
              />
            </div>
            <div className="absolute top-0 right-0 w-80 z-10">
              <FeatureCard
                feature={features.find((f) => f.position === "top-right")!}
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 z-10">
              <FeatureCard
                feature={features.find((f) => f.position === "center")!}
                isCenter={true}
              />
            </div>
            <div className="absolute bottom-0 left-0 w-80 z-10">
              <FeatureCard
                feature={features.find((f) => f.position === "bottom-left")!}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-80 z-10">
              <FeatureCard
                feature={features.find((f) => f.position === "bottom-right")!}
              />
            </div>
          </div>

          {/* Tablet layout (md to lg) */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <FeatureCard
                feature={features.find((f) => f.position === "top-left")!}
              />
              <FeatureCard
                feature={features.find((f) => f.position === "top-right")!}
              />
            </div>
            <div className="flex justify-center mb-8">
              <div className="w-80">
                <FeatureCard
                  feature={features.find((f) => f.position === "center")!}
                  isCenter={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <FeatureCard
                feature={features.find((f) => f.position === "bottom-left")!}
              />
              <FeatureCard
                feature={features.find((f) => f.position === "bottom-right")!}
              />
            </div>
          </div>

          {/* Mobile layout (below md) */}
          <div className="block md:hidden space-y-8">
            <FeatureCard
              feature={features.find((f) => f.position === "center")!}
              isCenter={true}
            />
            <FeatureCard
              feature={features.find((f) => f.position === "top-left")!}
            />
            <FeatureCard
              feature={features.find((f) => f.position === "top-right")!}
            />
            <FeatureCard
              feature={features.find((f) => f.position === "bottom-left")!}
            />
            <FeatureCard
              feature={features.find((f) => f.position === "bottom-right")!}
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 lg:mt-0">
          <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-btn-gradient rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 cursor-pointer">
            Request a Custom Demo
          </button>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: (typeof features)[0];
  isCenter?: boolean;
}

function FeatureCard({ feature, isCenter = false }: FeatureCardProps) {
  return (
    <div className="pt-12 w-full max-w-xs lg:max-w-sm mx-auto">
      {/* Icon positioned in center of the card border */}
      <div className="flex relative w-full justify-center -mb-6 z-40">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: "linear-gradient(135deg, #8547F6 0%, #BC98FF 100%)",
          }}
        >
          <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
        </div>
      </div>

      {/* Main card with exact gradient and border from screenshot */}
      <div
        className={`relative rounded-2xl sm:rounded-3xl shadow-2xl transition-transform duration-300 z-30 ${
          isCenter ? "lg:scale-105" : ""
        }`}
        style={{
          background: "linear-gradient(180deg, #000000 0%, #999999 100%)",
          padding: "0.89px",
        }}
      >
        <div
          className="relative p-6 sm:p-8 pt-10 sm:pt-12 rounded-2xl sm:rounded-3xl z-40"
          style={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1)), conic-gradient(from 180.25deg at 48.19% 34.47%, rgba(147, 121, 220, 0.74) 0deg, rgba(106, 80, 179, 0.690189) 43.98deg, rgba(54, 19, 81, 0.41) 192.12deg, #9379DC 281.25deg, rgba(147, 121, 220, 0.74) 360deg)",
          }}
        >
          {/* Decorative four-pointed stars in corners */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-white/60">
            <svg
              width="10"
              height="10"
              className="sm:w-3 sm:h-3"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5L6 0z" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60">
            <svg
              width="10"
              height="10"
              className="sm:w-3 sm:h-3"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5L6 0z" />
            </svg>
          </div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white/60">
            <svg
              width="10"
              height="10"
              className="sm:w-3 sm:h-3"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5L6 0z" />
            </svg>
          </div>
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-white/60">
            <svg
              width="10"
              height="10"
              className="sm:w-3 sm:h-3"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5L6 0z" />
            </svg>
          </div>

          {/* Category badge */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block text-white px-2 py-1 text-[9px] sm:text-[10px] font-medium rounded-full bg-[#913CF391] border border-white/40">
              {feature.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-3 sm:mb-4 leading-tight px-2"
            style={{ color: "#FFFFFF" }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm sm:text-md text-center leading-relaxed px-1"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}
