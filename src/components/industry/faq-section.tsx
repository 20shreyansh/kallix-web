"use client";

import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What types of home service businesses does Kallix support?",
    answer:
      "Kallix supports HVAC, plumbing, electrical, pest control, roofing, and cleaning services. It is perfect for any appointment-driven home service business seeking automation.",
  },
  {
    question: "Do I have to change my existing business phone number?",
    answer:
      "No, you keep your current phone number. Kallix integrates seamlessly with your existing business line, so there is no disruption for your customers.",
  },
  {
    question: "Is the AI available 24/7, including on holidays?",
    answer:
      "Yes, Kallix operates 24/7/365, including nights, weekends, and holidays. This ensures your business is always open and never misses a potential lead.",
  },
  {
    question: "Can the AI handle both phone calls and text messages?",
    answer:
      "Yes. Kallix is an omnichannel platform that expertly manages customer interactions across phone calls, SMS texts, and even web chat for complete coverage.",
  },
  {
    question: "What happens when a customer needs to speak to a person?",
    answer:
      "Kallix detects complex queries or direct requests and seamlessly transfers the call to your team, providing the full context for a smooth handoff.",
  },
  {
    question:
      "How does Kallix handle appointment rescheduling or cancellations?",
    answer:
      "Customers can call or text to reschedule or cancel. Kallix understands these requests, automatically updates your scheduling system, and then notifies your team.",
  },
  {
    question: "What software does Kallix integrate with?",
    answer:
      "Kallix integrates with leading CRMs like Salesforce, HubSpot, and Zoho. It also connects seamlessly with everyday tools like WhatsApp, Google Meet, and Google Sheets, allowing you to automate your workflows effortlessly.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/questions.png"
              alt="badge"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FAQs address common inquiries and provide essential information,
            helping users find solutions quickly.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 transition-colors rounded-lg ${
                openIndex === index ? "bg-gray-50" : ""
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors"
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
