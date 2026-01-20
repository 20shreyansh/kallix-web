"use client";

import { useState } from "react";
import Image from "next/image";
import CoverageVisual from "./coverage-visual";

interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string;
}

const useCases: UseCase[] = [
  {
    id: "coverage",
    title: "Provide 24/7 Coverage Without Staffing Up",
    description:
      "Our AI-powered agents operate 24/7/365, providing intelligent, real-time responses to every inbound call and message. They are expertly trained for the home services industry to handle customer inquiries, provide quotes, book jobs, and gather essential information, ensuring flawless service delivery even when your team is off the clock.",
    image: "/industry/home-services/coverage.png",
  },
  {
    id: "scalability",
    title: "Effortlessly Manage High Call Volumes",
    description:
      "Our AI agents scale instantly to manage any volume across phone and messaging channels without needing to increase your staffing budget. They respond accurately and promptly, maintaining perfect service consistency under pressure. With multi-language capabilities, our agents can engage customers in over [Number] languages, guaranteeing high-quality support for your entire community.",
    image: "/industry/home-services/scabality.png",
  },
  {
    id: "scheduling",
    title: "Streamline Scheduling and Eliminate Errors",
    description:
      "Our platform integrates seamlessly with your existing CRM and calendar tools (e.g., ServiceTitan, Housecall Pro, Jobber). Kallix automatically schedules appointments based on technician availability, sends instant confirmations and reminders, and assigns jobs in real-time. This reduces administrative overhead and ensures total accuracy.",
    image: "/industry/home-services/scheduling.png",
  },
];

export default function UseCasesCarousel() {
  const [activeTab, setActiveTab] = useState("coverage");

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/block.png"
              alt="Use Cases"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Use Cases
          </div>

          <h2 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight text-neutral-900 mb-6">
            Capture Every Opportunity,
            <br />
            Around the Clock
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            From initial customer inquiries to proactive follow-ups, discover
            how Kallix AI conversational agents enhance every customer
            touchpoint across both voice and chat.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto sm:bg-white sm:rounded-full sm:p-1 sm:inline-flex sm:shadow-sm">
            {useCases.map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                className={`px-6 py-2 rounded-xl sm:rounded-full font-medium transition-all duration-300 ${
                  activeTab === useCase.id
                    ? "bg-btn-gradient text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 border border-gray-200 sm:border-0"
                }`}
              >
                {useCase.id === "coverage" && "Coverage"}
                {useCase.id === "scalability" && "Scalability"}
                {useCase.id === "scheduling" && "Scheduling"}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-t-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-b-0 border-gray-200 mt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[400px]">
            {/* Left Content */}
            <div className="space-y-6">
              {useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className={activeTab === useCase.id ? "block" : "hidden"}
                >
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Content - Images */}
            <div className="relative h-[400px] flex items-center justify-center sm:justify-end">
              {useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className={activeTab === useCase.id ? "block" : "hidden"}
                >
                  <div className="max-w-lg mx-auto">
                    {useCase.id === "coverage" ? (
                      <CoverageVisual />
                    ) : (
                      <Image
                        src={useCase.image}
                        alt={`${useCase.title} - visual representation of AI automation feature`}
                        width={600}
                        height={400}
                        className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
