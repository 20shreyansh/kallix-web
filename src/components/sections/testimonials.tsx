"use client";


import { Star } from "lucide-react";

type Testimonial = {
  rating: number;
  quote: string;
  name: string;
  role: string;
  color?: "pink" | "purple" | "blue" | "none";
};

const ITEMS: Testimonial[] = [
  // India
  {
    rating: 4.8,
    quote:
      "Implementing Kallix for our appointment booking has been a game-changer. Our missed calls are down by 30%, and clients love the instant confirmations. The AI sounds so natural, it's seamless!",
    name: "Rohan Sharma",
    role: "Clinic Manager (Bengaluru)",
    color: "purple",
  },
  {
    rating: 4.7,
    quote:
      "As a real estate agency, speed-to-lead is everything. Kallix contacts new inquiries faster than any human ever could, pre-qualifying them for our agents. We're closing deals much quicker now.",
    name: "Priya Singh",
    role: "Head of Sales (Mumbai)",
    color: "none",
  },
  {
    rating: 4.9,
    quote:
      "The COD confirmation calls from Kallix have drastically cut down our RTO rates. For our e-commerce business, this is a massive saving. The voice sounds so professional and clear.",
    name: "Anil Kumar",
    role: "Operations Director (Delhi)",
    color: "blue",
  },
  {
    rating: 4.6,
    quote:
      "Our hotel reception used to be swamped with basic inquiries. Kallix now handles all our room availability and general FAQs, leaving our staff free to focus on guest experience. It's truly 24/7.",
    name: "Deepak Rao",
    role: "General Manager (Jaipur)",
    color: "none",
  },
  {
    rating: 4.8,
    quote:
      "Customer support was a bottleneck. Kallix AI now handles the first layer of inbound queries, giving instant answers and only escalating complex issues. Our response times have plummeted.",
    name: "Sneha Reddy",
    role: "Customer Service Lead (Hyderabad)",
    color: "pink",
  },
  {
    rating: 4.5,
    quote:
      "Getting service inquiries qualified used to take so much time. Kallix automates that initial screening perfectly, sending us only high-intent leads for our home repair services. Super efficient!",
    name: "Vikas Gupta",
    role: "Founder (Pune)",
    color: "none",
  },
  {
    rating: 4.9,
    quote:
      "We needed a custom solution for student enrollment follow-ups. Kallix built an agent that sounds empathetic and guides potential students through the application process effortlessly. Impressive!",
    name: "Meera Devi",
    role: "Admissions Officer (Chennai)",
    color: "blue",
  },
  {
    rating: 4.7,
    quote:
      "Kallix helped us streamline our outbound campaigns for event RSVPs. The AI calls guests, confirms attendance, and handles questions, making our event planning so much smoother.",
    name: "Aditya Khanna",
    role: "Events Coordinator (Gurugram)",
    color: "none",
  },

  // Foreign clients
  {
    rating: 4.6,
    quote:
      "Our dental practice saw an immediate reduction in missed appointments thanks to Kallix's reminder calls. It integrates seamlessly with our booking system, and patients find the voice very pleasant.",
    name: "Sarah Jenkins",
    role: "Practice Manager (Sydney, Australia)",
    color: "purple",
  },
  {
    rating: 4.8,
    quote:
      "The ability of Kallix to instantly follow up with online insurance quote requests has significantly boosted our conversion rates. The AI sounds incredibly natural, a real asset to our sales funnel.",
    name: "Michael O'Connell",
    role: "Agency Owner (Dublin, Ireland)",
    color: "none",
  },
  {
    rating: 4.7,
    quote:
      "We needed an AI that could handle basic queries for our boutique hotel after hours. Kallix came through, managing everything from checking availability to answering questions about local attractions. Our guests love it.",
    name: "Elara Dubois",
    role: "Hotel Manager (Nice, France)",
    color: "pink",
  },
  {
    rating: 4.9,
    quote:
      "Implementing Kallix for initial candidate screening has saved our recruitment team countless hours. The AI asks key qualifying questions and pre-screens applicants efficiently. It's made our hiring process much faster.",
    name: "Chris Miller",
    role: "Head of HR (London, UK)",
    color: "none",
  },
];

export default function TestimonialsSection() {

  return (
    <section id="testimonials" className="py-16 md:py-20">
      <div className="mx-auto max-w-8xl">
        {/* heading */}
        <div className="flex justify-center">
          <div className="rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70">
            Testimonials
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="relative inline-block">
            <h2 className="text-center text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
              <span className="block">Hear from Our</span>
              <span className="ml-3 inline-block rounded-2xl bg-purple-100/70 px-3 py-1 pb-3 text-neutral-900">
                Satisfied Users
              </span>
            </h2>
          </div>
        </div>

        {/* Carousel for all screen sizes */}
        <div className="mt-16">
          <div className="group overflow-hidden">
            <div className="flex w-max gap-6 animate-marquee-x group-hover:[animation-play-state:paused]">
              {[...ITEMS, ...ITEMS].map((t, i) => (
                <div key={i} className="w-80 shrink-0">
                  <Card {...t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ rating, quote, name, role, color = "none" }: Testimonial) {
  const gradient =
    color === "pink"
      ? "bg-gradient-to-b from-[#FFD6E2] to-white"
      : color === "purple"
      ? "bg-gradient-to-b from-[#EAD9FF] to-white"
      : color === "blue"
      ? "bg-gradient-to-b from-[#DDE7FF] to-white"
      : "bg-gray-50/50";

  return (
    <div
      className={`relative h-full min-h-[400px] overflow-hidden rounded-[32px] border border-black/10 p-6 md:p-8 shadow-sm ${gradient} flex flex-col`}
    >
      {/* Rating pill */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-base font-semibold text-white">
        <Star className="size-4 fill-white" />
        {rating.toFixed(1)}
      </div>

      {/* Quote */}
      <p className="mt-8 flex-1 text-lg leading-7 text-neutral-900">
        {quote}
      </p>

      {/* Author */}
      <div className="mt-auto pt-8">
        <div className="text-lg font-semibold text-neutral-900">
          {name}
        </div>
        <div className="text-md text-neutral-500">
          {role}
        </div>
      </div>
    </div>
  );
}
