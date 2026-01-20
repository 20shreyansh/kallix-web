"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type QA = { q: string; a: string };

const QA_ITEMS: QA[] = [
  {
    q: "How does the onboarding process work?",
    a: "We start with a discovery call to understand your needs. Then, our team handles the entire setup, from building the AI to training and integration, ensuring a seamless launch.",
  },
  {
    q: "How is the AI customized for my business?",
    a: "Our experts tailor everything. We select the perfect voice, train the AI on your specific products, and design a conversational workflow that perfectly matches your brand and business goals.",
  },
  {
    q: "What business systems can Kallix integrate with?",
    a: "Our team can integrate Kallix with most modern CRMs, booking platforms, and support tools. We handle all the technical work to ensure a smooth, automated data flow for you.",
  },
  {
    q: "What happens if the AI can't answer a question?",
    a: "Our system is designed for smart escalation. If the AI encounters a query it can't handle, it seamlessly transfers the call or creates a task for a human agent.",
  },
  {
    q: "How long does it take to get my agent live?",
    a: "Timelines can vary based on complexity, but most clients are live within a few weeks. We provide a clear project timeline right after our initial discovery call.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* Left copy */}
          <div>
            <div className="inline-flex rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 shadow-xs">
              FAQ
            </div>
            <h2 className="mt-6 text-4xl font-semibold md:leading-[4rem] tracking-tight text-neutral-900 md:text-5xl">
              Frequently
              <br />
              Asked
              <span className="ml-3 inline-flex rounded-2xl bg-purple-100/70 px-2 pb-3 text-neutral-900">
                Questions
              </span>
            </h2>
            <p className="mt-2 max-w-md text-lg text-neutral-600">
              Have another question? Please contact our team!
            </p>
            <div className="mt-8">
              <a
                href="#strategy-form"
                className="inline-flex items-center justify-center rounded-full bg-btn-gradient px-6 py-2 text-base font-semibold text-white shadow-md transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg"
              >
                Contact Our Team
              </a>
            </div>
          </div>

          {/* Right accordion */}
          <div className="space-y-4">
            {QA_ITEMS.map((item, idx) => (
              <AccordionItem
                key={idx}
                open={open === idx}
                onToggle={() => setOpen(open === idx ? -1 : idx)}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: QA & { open: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(open ? contentHeight : 0);
    }
  }, [open]);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-black/10 shadow-sm transition-all duration-500 ease-out hover:shadow-md ${
        open 
          ? "bg-[#FAFAFA] border-black/20 shadow-md" 
          : "bg-white hover:bg-gray-50/50"
      }`}
    >
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left transition-all duration-200 hover:bg-black/[0.02]"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-xl font-semibold text-neutral-900 transition-colors duration-200">
          {q}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-black/50 transition-all duration-500 ease-out ${
            open ? "rotate-180 text-black/70" : "hover:text-black/70"
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-500 ease-out"
      >
        <div className={`px-6 pb-6 text-neutral-600 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}>
          {a}
        </div>
      </div>
    </div>
  );
}
