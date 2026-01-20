"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Problem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const problems: Problem[] = [
  {
    id: 1,
    icon: "/industry/real-estate/time-consuming.png",
    title: "Time-consuming lead qualification",
    description:
      "Agents spend countless hours vetting inquiries - yet 70-80% of prospects are not immediately ready to buy or sell. This means a lot of wasted effort, since that time could be better spent on more promising opportunities.",
  },
  {
    id: 2,
    icon: "/industry/real-estate/slow-responsive.png",
    title: "Slow responses to inquiries",
    description:
      "The average lead waits hours for a reply - in fact, the typical response time is ~4 hours, and nearly 48% of buyer inquiries get no answer at all. With speed-to-lead being critical, these delays mean lost deals.",
  },
  {
    id: 3,
    icon: "/industry/real-estate/inconsistent.png",
    title: "Inconsistent follow-ups",
    description:
      "Inconsistent follow-ups cause many leads to go cold - even though 6-10 attempts can yield up to 300% more conversions than a single touchpoint. Without a systematic follow-up plan, valuable opportunities slip through the cracks.",
  },
  {
    id: 4,
    icon: "/industry/real-estate/repetitive.png",
    title: "Repetitive Q&A and admin tasks",
    description:
      "Teams get bogged down answering repetitive property or paperwork questions over and over, instead of focusing on closing deals. This busywork forces important tasks like client meetings and negotiations to take a back seat.",
  },
];

export function ProblemsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          cardsRef.current.indexOf(entry.target as HTMLDivElement);
        });
      },
      {
        threshold: 0.6,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content - Sticky */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
              <Image
                src="/icon/key_benifits.png"
                alt="Problems"
                width={20}
                height={20}
                className="w-4 h-4"
              />
              PROBLEMS
            </div>

            <h2 className="text-3xl md:text-5xl font-medium leading-tight text-neutral-900 mb-6">
              Even in a booming market, real estate teams face key challenges
              that limit growth
            </h2>
          </div>

          {/* Right Content - Stacking Cards */}
          <div className="relative">
            <div className="space-y-8">
              {problems.map((problem, index) => (
                <div
                  key={problem.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm transition-all duration-500 ease-out"
                  style={{
                    position: "sticky",
                    top: `${120 + index * 20}px`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center">
                      <Image
                        src={problem.icon}
                        alt={problem.title}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {problem.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
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
