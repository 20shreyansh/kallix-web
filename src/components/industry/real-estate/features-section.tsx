"use client";

import Image from "next/image";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: "/industry/real-estate/lead.png",
    title: "Never Miss a Lead",
    description: "24/7 call answering, never miss a call.",
  },
  {
    id: 2,
    icon: "/industry/real-estate/book-meeting.png",
    title: "Book Meetings Automatically",
    description: "Book meetings with leads even when you're not available.",
  },
  {
    id: 3,
    icon: "/industry/real-estate/calendar.png",
    title: "Fill Your Calendar Faster",
    description: "More appointments scheduled with high-potential leads.",
  },
  {
    id: 4,
    icon: "/industry/real-estate/hold.png",
    title: "No More Hold Music",
    description: "Picks up calls in parallel, no waiting lines.",
  },
  {
    id: 5,
    icon: "/industry/real-estate/talk.png",
    title: "Talk Only to Serious Buyers",
    description: "Only transfer the call to you if it's a potential deal.",
  },
  {
    id: 6,
    icon: "/industry/real-estate/boost.png",
    title: "Boost ROI with AI",
    description: "Cut costs and boost revenue by improving lead capture & conversion.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white mt-40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/questions.png"
              alt="Features"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            FEATURES
          </div>

          <h2 className="text-3xl md:text-5xl font-medium leading-tight text-neutral-900 mb-4">
            Why use AI Voice Assistants in
            <br />
            Real Estate?
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take your healthcare practice to the next level with our expert AI solutions and client engagement tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full border border-gray-200 shadow-sm flex items-center justify-center mb-6">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
