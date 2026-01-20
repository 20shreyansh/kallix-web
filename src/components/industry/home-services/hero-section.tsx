"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProcessStep {
  id: string;
  title: string;
  icon: string;
  bgColor: string;
  borderColor: string;
}

const processSteps: ProcessStep[] = [
  {
    id: "inbound-call",
    title: "Inbound Call",
    icon: "/icon/inbound_call.png",
    bgColor: "bg-white",
    borderColor: "border-gray-200",
  },
  {
    id: "lead-qualified",
    title: "Lead Qualified",
    icon: "/icon/lead_qualified.png",
    bgColor: "bg-white",
    borderColor: "border-gray-200",
  },
  {
    id: "appointment-booked",
    title: "Appointment Booked",
    icon: "/icon/appointment_booked.png",
    bgColor: "bg-white",
    borderColor: "border-gray-200",
  },
  {
    id: "appointment-confirmation",
    title: "Appointment Confirmation",
    icon: "/icon/appointment_confirmation.png",
    bgColor: "bg-white",
    borderColor: "border-gray-200",
  },
  {
    id: "service-done",
    title: "Service Done",
    icon: "/icon/service_done.png",
    bgColor: "bg-white",
    borderColor: "border-gray-200",
  },
];

export function HeroSection() {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= processSteps.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 800); // Change step every 800ms

    return () => clearInterval(interval);
  }, []);

  const getStepStyles = (index: number) => {
    const isActive = index <= activeStep;
    const step = processSteps[index];

    if (isActive) {
      return {
        card: "bg-purple-100 border-purple-200 shadow-lg",
        text: "text-gray-900",
      };
    }

    return {
      card: `${step.bgColor} ${step.borderColor} shadow-sm`,
      text: "text-gray-900",
    };
  };

  const getArrowStyles = (index: number) => {
    const isActive = index <= activeStep;

    if (isActive) {
      return {
        line: "bg-purple-300",
        arrow: "text-purple-400",
      };
    }

    return {
      line: "bg-gray-200",
      arrow: "text-gray-300",
    };
  };
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-purple-200 bg-white px-4 py-2 text-md font-medium mb-8 shadow-sm mx-auto lg:mx-0">
              <Image
                src="/industry/icon/home-services.png"
                alt="Star"
                width={24}
                height={24}
                className="w-4 h-4"
              />
              <span className="bg-gradient-to-r from-[#CC9EF3] to-[#6191FB] bg-clip-text text-transparent font-semibold">
                HOME SERVICES
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-normal leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl mb-6">
              Intelligent AI Agents
              <br />
              for Home Services
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Kallix is your dedicated AI Service Coordinator, working 24/7 to
              answer every call, qualify every lead, and book jobs directly into
              your scheduling system. Stop losing revenue to missed calls and
              busy lines.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/#strategy-form"
                className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-btn-gradient text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                Book A Demo
              </Link>
              <Link
                href="/#phone-mock"
                className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                TRY NOW
              </Link>
            </div>
          </div>

          {/* Right Content - Process Flow */}
          <div className="relative max-w-sm mx-auto">
            <div className="space-y-0">
              {processSteps.map((step, index) => (
                <div key={step.id}>
                  {/* Step Card */}
                  <div
                    className={`flex w-xs items-center gap-3 rounded-2xl p-6 border transition-all duration-500 ease-in-out ${
                      getStepStyles(index).card
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={step.icon}
                        alt={`${step.title} icon`}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <span
                      className={`text-base font-medium transition-colors duration-500 ${
                        getStepStyles(index).text
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {/* Arrow with Line (don't show after last step) */}
                  {index < processSteps.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-px h-8 transition-colors duration-500 ${
                          getArrowStyles(index).line
                        }`}
                      ></div>
                      <svg
                        className={`w-4 h-4 -mt-1 transition-colors duration-500 ${
                          getArrowStyles(index).arrow
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
