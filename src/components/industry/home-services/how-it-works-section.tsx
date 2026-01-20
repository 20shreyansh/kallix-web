"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const workflowSteps = [
  {
    id: 1,
    title: "Instant Customer Engagement",
    description:
      "When a customer reaches out via phone, text, or web chat, Kallix AI answers immediately, eliminating wait times and ensuring you never miss a potential job.",
    imageSrc: "/industry/home-services/customer.png",
  },
  {
    id: 2,
    title: "Intelligent Lead Qualification",
    description:
      "Our AI intelligently qualifies leads by asking the right questions, understanding customer needs, and determining project scope and urgency.",
    imageSrc: "/industry/home-services/lead.png",
  },
  {
    id: 3,
    title: "Seamless System Integration & Booking",
    description:
      "The AI seamlessly integrates with your existing scheduling system, checks availability, and books appointments in real-time while updating your calendar.",
    imageSrc: "/industry/home-services/seamless.png",
  },
  {
    id: 4,
    title: "Smart Human Handoff",
    description:
      "When complex situations arise or customers request human assistance, the AI smoothly transfers the conversation with full context to your team.",
    imageSrc: "/industry/home-services/smart.png",
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      const scrolledIntoSection = -sectionTop;
      const totalScrollableHeight = sectionHeight - viewportHeight;
      const progress = Math.max(
        0,
        Math.min(1, scrolledIntoSection / totalScrollableHeight)
      );

      // Determine which step should be active based on scroll progress
      let newStep = 1;
      if (progress > 0.2) newStep = 2; // 20% through = step 2
      if (progress > 0.45) newStep = 3; // 45% through = step 3
      if (progress > 0.7) newStep = 4; // 70% through = step 4

      // Update step if it changed
      if (newStep !== activeStep) {
        setActiveStep(newStep);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white mt-60 sm:mt-80 lg:mt-20 mb-32 sm:mb-20"
      style={{ height: "400vh" }} // 4x viewport height for scroll space
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
              <Image
                src="/icon/block.png"
                alt="badge"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              Discover How
            </div>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-neutral-900 mb-6">
              How Does It Work?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our intelligent AI system seamlessly integrates with your existing
              workflow to provide 24/7 customer service excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Steps */}
            <div className="space-y-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="transition-all duration-500 ease-in-out"
                  onClick={() => {
                    setActiveStep(step.id);
                  }}
                >
                  {/* Step Header */}
                  <div className="flex items-center gap-4 cursor-pointer py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-2xl font-bold ${
                          activeStep === step.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            : "text-gray-400"
                        }`}
                      >
                        {step.id}.
                      </span>
                      <h3
                        className={`text-xl font-semibold ${
                          activeStep === step.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            : "text-gray-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeStep === step.id
                        ? "max-h-96 opacity-100 pb-6"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-8">
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Image - Show below each step on mobile */}
                  <div
                    className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                      activeStep === step.id
                        ? "max-h-96 opacity-100 pb-6"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-8 mt-4">
                      <div className="relative min-h-[250px]">
                        <Image
                          src={step.imageSrc}
                          alt={`${step.title} - visual demonstration of AI workflow step`}
                          width={600}
                          height={400}
                          className="rounded-2xl shadow-lg object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div
                    className={`ml-8 h-px ${
                      activeStep === step.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Right side - Image (Desktop only) */}
            <div className="hidden lg:block lg:sticky lg:top-8">
              <div className="relative flex justify-end">
                <Image
                  src={
                    workflowSteps.find((step) => step.id === activeStep)
                      ?.imageSrc || workflowSteps[0].imageSrc
                  }
                  alt={`${workflowSteps.find((step) => step.id === activeStep)?.title || "AI workflow"} - visual demonstration of AI automation step`}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg object-cover w-fit h-[50vh]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
