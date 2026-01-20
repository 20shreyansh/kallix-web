import Image from "next/image";

const keyBenefits = [
  {
    title: "Missed Calls Cost Revenue",
    description:
      "Never miss a customer again — AI handles calls, bookings, and follow-ups even after hours.",
    iconSrc: "/icon/clock_square.png",
  },
  {
    title: "High Call Volume Management",
    description:
      "Automate your customer interactions with AI that manages calls, schedules, and bookings seamlessly.",
    iconSrc: "/icon/solar_graph.png",
  },
  {
    title: "Scheduling Inefficiencies",
    description:
      "Smart AI for home services that delivers faster responses, fewer missed leads, and higher customer satisfaction.",
    iconSrc: "/icon/user_group.png",
  },
  {
    title: "24/7 Availability",
    description:
      "AI agents that answer every call, book jobs instantly, and keep your business running 24/7.",
    iconSrc: "/icon/solar_infinity_broken.png",
  },
];

export function KeyBenefitsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/key_benifits.png"
              alt="Key Benefits"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Key Benefits
          </div>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-neutral-900 mb-6">
            Real Results from
            <br />
            Real Businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how home service companies are transforming their operations and
            boosting revenue with AI-powered customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyBenefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-purple-200 hover:bg-gradient-to-br hover:from-purple-50 hover:to-white"
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-purple-200">
                  <Image
                    src={benefit.iconSrc}
                    alt={benefit.title}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-purple-900">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
