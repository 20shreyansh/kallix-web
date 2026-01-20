import Image from "next/image";

const stats = [
  { value: "70%", label: "Reduction in Call & Wait Times" },
  { value: "93%", label: "Average Booking Rate" },
  { value: "$350k+", label: "in Opportunities Captured" },
  { value: "10%", label: "Average Increase in Annual Revenue" },
  { value: "24/7", label: "Live Call Handling" },
  { value: "9/10", label: "Businesses Recommend Kallix AI" },
  { value: "80%", label: "Automation of Routine Interactions" },
  { value: "10%", label: "Increase in Customer Satisfaction (CSAT)" },
];

export function KallixAdvantageSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-0">
      <div className="max-w-full">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/block.png"
              alt="badge"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Impact
          </div>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-neutral-900 mb-6">
            The Kallix Advantage: Real
            <br />
            Results for Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 lg:mb-32">
            Leverage our advanced AI to transform your operational workflows and
            customer experience.
          </p>

          {/* Mobile: Static Single Column */}
          <div className="block lg:hidden">
            <div className="flex flex-col gap-12 max-w-sm mx-auto px-4">
              <div className="text-center">
                <div className="text-5xl font-semibold text-gray-900 mb-3">
                  93%
                </div>
                <div className="text-base text-gray-600">
                  Average Booking Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold text-gray-900 mb-3">
                  300K
                </div>
                <div className="text-base text-gray-600">
                  in Opportunities Captured
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold text-gray-900 mb-3">
                  70%
                </div>
                <div className="text-base text-gray-600">
                  Faster Service
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-semibold text-gray-900 mb-3">
                  10%
                </div>
                <div className="text-base text-gray-600">
                  Revenue Growth
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Continuous Carousel */}
          <div className="hidden lg:block relative overflow-hidden">
            <div className="flex animate-stats-scroll">
              {/* First set of stats */}
              {stats.map((stat, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 text-center mx-8 md:mx-12"
                >
                  <div className="text-4xl md:text-6xl text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {stats.map((stat, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 text-center mx-8 md:mx-12"
                >
                  <div className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 whitespace-nowrap">
                    {stat.label}
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
