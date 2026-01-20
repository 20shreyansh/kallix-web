"use client";

import Link from "next/link";

interface BoostStat {
  id: number;
  value: string;
  title: string;
  description: string;
  gradient: string;
}

const boostStats: BoostStat[] = [
  {
    id: 1,
    value: "50%",
    title: "Increase in lead conversion rates",
    description: "A notable rise in the percentage of leads successfully turning into customers.",
    gradient: "from-[#2B3E5F] via-[#3D3545] to-[#6B3E47]",
  },
  {
    id: 2,
    value: "5X",
    title: "Increase in property visits from prospects",
    description: "Higher engagement reflected in more property visits from potential buyers.",
    gradient: "from-[#2C4A4A] via-[#3F4A3A] to-[#5A5A2E]",
  },
  {
    id: 3,
    value: "60%",
    title: "Reduction in operational support costs",
    description: "Lower expenses achieved through streamlined support operations.",
    gradient: "from-[#4A3A4A] via-[#3A3A4A] to-[#2E3A5A]",
  },
];

export function BoostSection() {
  return (
    <section className="py-20 lg:pt-20 lg:pb-0 h-full lg:h-152 sm:-mx-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-medium leading-tight text-white mb-4">
            How AI Agents Boost Your Business
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Automate routine tasks, accelerate conversions, and deliver seamless customer experiences at every touchpoint
          </p>

          <Link
            href="/#strategy-form"
            className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-btn-gradient text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            Book A Demo
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 md:-mb-24">
          {boostStats.map((stat) => (
            <div
              key={stat.id}
              className="overflow-hidden shadow-sm hover:scale-105 transition-transform duration-300"
            >
              {/* Gradient Top Section */}
              <div className={`bg-gradient-to-r ${stat.gradient} p-12 flex items-center justify-center`}>
                <div className="text-6xl md:text-7xl font-bold text-white">
                  {stat.value}
                </div>
              </div>

              {/* White Bottom Section */}
              <div className="bg-white h-full p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {stat.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
