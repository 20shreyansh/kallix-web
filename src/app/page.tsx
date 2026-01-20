"use client";
import { TopBanner, useBannerVisibility } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import TestimonialsSection from "@/components/sections/testimonials";
import FeaturesHero from "@/components/sections/features-hero";
import FAQSection from "@/components/sections/faq";
import GetStartedSection from "@/components/sections/get-started";
import AIVoicesSection from "@/components/sections/ai-voices";
import WhyChooseUsSection from "@/components/sections/why-choose-us";
import StatsCTASection from "@/components/sections/stats-cta";
import AIPlatformFeatures from "@/components/sections/ai-platform-features";
import HeroBackground from "@/components/sections/hero-background";
import BrandsSection from "@/components/sections/brands";
import Image from "next/image";
import { Caveat } from "next/font/google";
import PhoneMock from "@/components/sections/phone-mock";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const isBannerVisible = useBannerVisibility();

  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      <main
        className={`${
          isBannerVisible ? "mt-14 sm:my-14" : "mt-0 sm:my-4"
        } sm:px-4 z-0`}
      >
        <section
          id="hero"
          className="relative isolate w-full md:max-w-8xl pb-24 pt-26 md:pt-40 overflow-visible sm:rounded-[28px] rounded-b-none bg-gradient-to-tr from-indigo-50 to-purple-50 p-8 ring-1 ring-black/5"
        >
          <HeroBackground />
          <h1 className="text-balance text-center text-4xl font-normal leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
            Automate Calls With AI Phone
            <br className="hidden md:block" /> Agents That{" "}
            <span className="text-[#5124AC] font-semibold">
              Convert Prospects
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-neutral-600">
            Get a custom AI voice agent, built for you. We turn your phone calls
            into qualified leads and exceptional customer experiences, 24/7.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="relative">
              <a
                href="#phone-mock"
                aria-label="Try a conversation"
                className="inline-flex items-center justify-center rounded-full bg-btn-gradient px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{
                  boxShadow:
                    "inset 0 0 0 1.29px #B1D0F8, 0 0 43.81px rgba(80,133,255,0.20)",
                }}
              >
                Try a Live Demo
              </a>
            </div>
          </div>
          {/* Voices pill + stats */}
          <div className="my-12 sm:my-16 md:my-20 flex justify-center px-4">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-20 sm:h-22 md:h-24 rounded-full bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-4 sm:py-4 md:py-5 shadow-lg transition-all duration-300">
              {/* Avatars left */}
              <div className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 flex -space-x-2 sm:-space-x-3">
                {[
                  "/home/sample_agent_1.jpg",
                  "/home/sample_agent_2.jpg",
                  "/home/sample_agent_3.jpg",
                ].map((src, i) => (
                  <span
                    key={i}
                    className="relative inline-block animate-bounce transition-transform"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`AI voice agent ${i + 1} profile photo`}
                      width={44}
                      height={44}
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                  </span>
                ))}
              </div>

              {/* Mic concentric glow center */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                <style jsx>{`
                  @keyframes popup {
                    0% {
                      transform: scale(0.8);
                      opacity: 0;
                    }
                    50% {
                      transform: scale(1.1);
                      opacity: 1;
                    }
                    100% {
                      transform: scale(1);
                      opacity: 0.8;
                    }
                  }
                `}</style>
                <div className="relative grid size-20 sm:size-24 md:size-26 lg:size-28 place-items-center">
                  <span className="absolute size-18 sm:size-22 md:size-24 lg:size-26 rounded-full bg-gradient-to-br from-[#3D8DFE] to-[#CC9EF3]" />
                  <span
                    className="absolute size-18 sm:size-22 md:size-24 lg:size-26 rounded-full ring-8 sm:ring-12 md:ring-14 lg:ring-[16px] ring-[#468EFD]/12"
                    style={{
                      animation: "popup 2s ease-out infinite",
                    }}
                  />
                  <span
                    className="absolute size-24 sm:size-28 md:size-32 lg:size-34 rounded-full ring-8 sm:ring-12 md:ring-14 lg:ring-[16px] ring-[#E8E0FF]/50"
                    style={{
                      animation: "popup 2.5s ease-out infinite",
                      animationDelay: "0.4s",
                    }}
                  />

                  {/* Stable mic container */}
                  <span className="relative z-10 grid size-16 sm:size-20 md:size-22 lg:size-24 place-items-center rounded-full">
                    <Image
                      src="/icon/mic.png"
                      alt="Microphone icon representing AI voice agent"
                      width={44}
                      height={44}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 transition-transform hover:scale-110"
                    />
                  </span>
                </div>
              </div>

              {/* Right stats */}
              <div className="absolute w-4 sm:w-full right-16 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 text-right">
                <div className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-900">
                  15K+
                </div>
                <div className="text-xs sm:text-sm text-neutral-500">
                  Conversation Handled
                </div>
              </div>
            </div>
          </div>

          <div id="phone-mock" className="relative mx-auto pt-8 max-w-3xl">
            <PhoneMock />
            {/* right scribble */}
            <div className="absolute right-10 -top-4 hidden md:block">
              <div
                className={`${caveat.className} text-xl text-neutral-800/80`}
              >
                Talk to our AI
                <br />
                Right Now!
              </div>
              <Image
                src={"/icon/arrow.png"}
                alt="Decorative arrow pointing to demo"
                width={100}
                height={100}
                className="right-5 absolute"
              />
            </div>

            {/* badges */}
            <div className="absolute !left-0 lg:!left-12 -top-1 sm:top-[40%] z-10 space-y-3">
              <div className="hidden sm:flex flex-col gap-y-4 items-end">
                <div className="flex items-center gap-2 w-fit rounded-lg bg-[#FEFBEF] px-6 py-3 text-xs lg:text-md text-neutral-800 shadow-lg">
                  <Image
                    src={"/icon/australia_flag.png"}
                    alt="Australia flag"
                    width={20}
                    height={20}
                  />
                  <Image
                    src={"/icon/india_flag.png"}
                    alt="India flag"
                    width={20}
                    height={20}
                  />
                  <span>Multilingual</span>
                </div>
                <div className="rounded-lg text-center bg-[#FEFBEF] px-6 py-3 text-xs lg:text-md text-neutral-800 shadow-lg">
                  Custom-Trained On Your
                  <br /> Business
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BrandsSection />
      <AIVoicesSection />
      <GetStartedSection />
      <WhyChooseUsSection />
      <StatsCTASection />
      <AIPlatformFeatures />
      <TestimonialsSection />
      <FAQSection />
      <FeaturesHero />

      <SiteFooter />
    </div>
  );
}
