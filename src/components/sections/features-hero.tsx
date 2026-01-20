import Image from "next/image";

export default function FeaturesHero() {
  return (
    <section className="px-0 sm:px-12 pb-4" id="features">
      <div className="mx-auto max-w-8xl">
        <div className="relative overflow-hidden md:rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] bg-[#0c0c0f] px-4 py-8 sm:px-6 sm:py-12 md:px-12 md:py-16 lg:py-20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* background glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-12 sm:-top-24 -left-5 sm:-left-10 h-48 w-48 sm:h-96 sm:w-96 rounded-full bg-amber-900/35 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[210px] w-[210px] sm:h-[420px] sm:w-[420px] translate-x-1/4 sm:translate-x-1/3 translate-y-1/4 sm:translate-y-1/3 rounded-full bg-indigo-700/40 blur-3xl" />
          </div>

          {/* label */}
          <div className="relative flex justify-center">
            <div className="rounded-full bg-white/20 px-3 py-1.5 sm:px-5 sm:py-2 text-xs tracking-[0.25em] text-white/90 backdrop-blur">
              || THE FEATURES
            </div>
          </div>

          {/* heading */}
          <h2 className="relative mt-6 sm:mt-8 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-tight sm:leading-none tracking-tight">
            Smarter Conversations,
            <br className="hidden sm:block" /> Better Results
          </h2>

          {/* subtext */}
          <p className="relative mx-auto mt-4 sm:mt-6 max-w-xs sm:max-w-2xl lg:max-w-4xl text-center text-sm sm:text-base lg:text-lg text-white/80 px-2 sm:px-0">
            Power your team with AI voice agents that automate bookings, calls,
            and customer queries in real-time.
          </p>

          {/* CTA */}
          <div className="relative mt-6 sm:mt-8 flex justify-center">
            <a
              href="#phone-mock"
              className="inline-flex items-center justify-center rounded-full bg-btn-gradient px-4 py-3 sm:px-6 sm:py-4 md:px-8 text-sm sm:text-base md:text-lg font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-xl"
            >
              Get Started with Voice
            </a>
          </div>

          {/* floating demo cards - hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block">
            <LeftAudioCard />
            <RightAudioCard />
          </div>

          {/* mobile demo cards - stacked below content on mobile */}
          <div className="lg:hidden my-14 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <div className="absolute left-0">
              <Image
                src={"/home/ai_voice_sales_gent.png"}
                width={200}
                height={200}
                alt="AI voice sales agent interface showing conversation flow and customer interaction"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
              />
            </div>
            <div className="absolute right-0">
              <Image
                src={"/home/ai_voice_result.png"}
                width={180}
                height={180}
                alt="AI voice agent results dashboard displaying call analytics and performance metrics"
                className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeftAudioCard() {
  return (
    <div className="pointer-events-none absolute left-0 top-8 xl:top-10 2xl:top-12" aria-hidden>
      <Image
        src={"/home/ai_voice_sales_gent.png"}
        width={260}
        height={260}
        alt="AI voice sales agent interface showing conversation flow and customer interaction"
        className="w-48 xl:w-56 2xl:w-64 h-48 xl:h-56 2xl:h-64 object-contain"
      />
    </div>
  );
}

function RightAudioCard() {
  return (
    <div className="pointer-events-none absolute bottom-12 xl:bottom-14 2xl:bottom-16 right-0" aria-hidden>
      <Image
        src={"/home/ai_voice_result.png"}
        width={230}
        height={230}
        alt="AI voice agent results dashboard displaying call analytics and performance metrics"
        className="w-44 xl:w-52 2xl:w-56 h-44 xl:h-52 2xl:h-56 object-contain"
      />
    </div>
  );
}
