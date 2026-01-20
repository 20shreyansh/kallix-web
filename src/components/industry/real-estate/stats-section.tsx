"use client";

import Image from "next/image";

interface Stat {
  id: number;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    id: 1,
    value: "34%",
    label: "Increase in Scheduled Appointments",
  },
  {
    id: 2,
    value: "2",
    label: "Minutes Average Call Time",
  },
  {
    id: 3,
    value: "80%",
    label: "Average Cost Savings",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 px-4 sm:-mx-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#D6B2FF] to-[#ECCFE7]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/questions.png"
              alt="Stats"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            SECURED & EFFICIENT
          </div>

          <h2 className="text-3xl md:text-5xl font-medium leading-tight text-neutral-900 mb-4">
            Our Assistants for Real Estate in numbers
          </h2>

          <p className="text-lg text-gray-700 max-w-4xl mx-auto px-4">
            Streamline your real estate operations with AI, from property inquiries to client pre-qualification, while receiving real-time support to close deals faster and enhance client experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl md:text-6xl font-semibold text-neutral-900 mb-4">
                {stat.value}
              </div>
              <p className="text-gray-600 text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
