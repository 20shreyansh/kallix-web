"use client";
import Image from "next/image";
import type { CSSProperties } from "react";

const CUSTOMIZE_BARS = Array.from({ length: 12 }, (_, idx) => {
  const min = 18 + ((idx * 11) % 26);
  const spread = 42 + ((idx * 7) % 18);
  const max = Math.min(92, min + spread);
  const mid = Math.round(min + (max - min) * 0.6);
  return {
    min,
    mid,
    max,
    duration: 2400 + (idx % 4) * 320,
    delay: idx * 110,
  };
});

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="md:px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden md:rounded-[28px] border border-white/10 bg-[#151517] p-6 text-white md:p-10 lg:p-12">
          {/* background glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-violet-700/30 blur-3xl" />
            <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex justify-center">
              <span className="relative text-2xl font-normal tracking-tight text-[#7CA4FF] md:text-3xl">
                Why Choose Us?
              </span>
            </div>

            <h2 className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4">
              A Bespoke AI Solution Built Around
              <br className="hidden sm:block" /> Your Goals.
            </h2>

            <div className="mt-12 md:mt-16 grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 mx-4 sm:mx-8 md:mx-12 lg:mx-24">
              <CustomizeCard className="lg:col-span-5" />
              <VoicesCard className="lg:col-span-7 !p-0 !py-4 md:!py-6" />
              <EasyCard className="lg:col-span-7" />
              <IntegrationsCard className="lg:col-span-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 ${className}`}
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.05) 100%)",
        borderImage:
          "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.2)) 1",
      }}
    >
      {children}
    </div>
  );
}

function CustomizeCard({ className }: { className?: string }) {
  return (
    <CardShell className={className}>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
        Bespoke Voice & Personality
      </h3>
      <p className="mt-2 max-w-xl text-sm md:text-base text-white/80">
        Our experts fine-tune the voice, tone, and emotion to craft a unique AI
        personality for your brand.
      </p>
      <div className="mt-6 md:mt-8 grid grid-cols-12 items-end gap-2 sm:gap-3">
        {CUSTOMIZE_BARS.map((bar, idx) => (
          <div
            key={idx}
            className="relative h-32 sm:h-36 md:h-40 w-1.5 sm:w-2 overflow-hidden rounded-full bg-white/15"
            style={
              {
                "--bar-min": `${bar.min}%`,
                "--bar-mid": `${bar.mid}%`,
                "--bar-max": `${bar.max}%`,
              } as CSSProperties
            }
          >
            <div
              className="absolute bottom-0 left-1/2 w-[5px] sm:w-[6px] -translate-x-1/2 origin-bottom rounded-full bg-gradient-to-t from-[#8B5CF6] to-[#60A5FA]"
              style={
                {
                  height: "var(--bar-min)",
                  animationName: "customize-bar-fill",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDuration: `${bar.duration}ms`,
                  animationDelay: `${bar.delay}ms`,
                  willChange: "height",
                } as CSSProperties
              }
            />
            <span
              className="absolute left-1/2 block size-2 -mb-1 -translate-x-1/2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.85)]"
              style={
                {
                  bottom: "var(--bar-min)",
                  animationName: "customize-knob-move",
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDuration: `${bar.duration}ms`,
                  animationDelay: `${bar.delay}ms`,
                  willChange: "bottom",
                } as CSSProperties
              }
            />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function VoicesCard({ className }: { className?: string }) {
  const rows = [
    [
      { label: "English", sub: "Adult female", flag: "/flag/england.webp" },
      { label: "Hindi", sub: "Adult male", flag: "/flag/india.webp" },
      { label: "Marathi", sub: "Young female", flag: "/flag/india.webp" },
      { label: "Kannada", sub: "Friendly female", flag: "/flag/india.webp" },
      { label: "Spanish", sub: "Warm female", flag: "/flag/england.webp" },
    ],
    [
      { label: "German", sub: "Kids female", flag: "/flag/germany.webp" },
      { label: "Telugu", sub: "Adult female", flag: "/flag/india.webp" },
      { label: "Tamil", sub: "Young male", flag: "/flag/india.webp" },
      { label: "Punjabi", sub: "Conversational", flag: "/flag/india.webp" },
      { label: "French", sub: "Luxury tone", flag: "/flag/england.webp" },
    ],
  ];
  return (
    <CardShell className={className}>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold px-4 sm:px-6">
        Wide Variety of Voices & Languages
      </h3>
      <p className="mt-2 px-4 sm:px-6 max-w-2xl text-sm md:text-base text-white/80">
        With diverse library of male, female, and character voices in multiple
        languages and accents to suit any project.
      </p>
      <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="relative overflow-hidden">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#151517] to-transparent" /> */}
            {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#151517] to-transparent" /> */}
            <div
              className={`flex w-max gap-3 md:gap-4 ${
                rowIdx === 0
                  ? "animate-voices-row-forward"
                  : "animate-voices-row-reverse"
              }`}
            >
              {[...row, ...row].map((chip, idx) => (
                <div
                  key={`${chip.label}-${idx}`}
                  className="flex min-w-[160px] sm:min-w-[180px] md:min-w-[190px] items-center gap-2 sm:gap-3 rounded-xl md:rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 px-3 sm:px-4 md:px-5 py-3 md:py-4 shadow-lg"
                >
                  <div className="grid size-10 sm:size-14 place-items-center overflow-hidden rounded-full">
                    <Image
                      src={chip.flag}
                      alt={`${chip.label} flag`}
                      width={40}
                      height={40}
                      className="object-contain w-10 sm:w-14 h-10 sm:h-14 rounded-full"
                    />
                  </div>
                  <div className="leading-tight">
                    <div className="text-base sm:text-lg font-semibold text-white">
                      {chip.label}
                    </div>
                    <div className="text-xs sm:text-sm text-white/70">{chip.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function EasyCard({ className }: { className?: string }) {
  const pills = [
    { label: "Config", icon: "/icon/config.png" },
    { label: "Customize", icon: "/icon/customize.png" },
    { label: "Embed", icon: "/icon/embed.png" },
  ];
  const waveHeights = [28, 34, 48, 68, 54, 76, 82, 64, 48, 36, 54, 72, 86, 74, 58, 46, 30, 38, 52, 66, 58, 72, 84, 70, 56, 44, 32];
  return (
    <CardShell className={className}>
      <h3 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-semibold leading-tight text-white">
        Completely Managed, Zero Hassle
      </h3>
      <p className="mt-3 md:mt-4 max-w-2xl text-sm sm:text-base md:text-[17px] lg:text-lg leading-6 md:leading-7 text-white/80">
        There&apos;s no complex interface to learn or software to manage. From the
        initial build to ongoing updates and maintenance, we handle all the
        technical work so you can focus on results.
      </p>
      <div className="relative flex flex-col items-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
          <div className="relative h-52 w-[100%] max-w-3xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5F7BFF]/22 via-[#885CFF]/12 to-[#BA57FF]/14 blur-2xl" />
            <div className="relative mx-auto flex h-full w-full items-end justify-between px-8">
              {waveHeights.map((h, idx) => (
                <span
                  key={idx}
                  className="w-[6px] rounded-full bg-white/14"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative z-10 flex w-full max-w-3xl items-center justify-around gap-4 sm:gap-6 md:gap-12 lg:gap-16 mt-12 md:mt-16">
          {pills.map((p, index) => {
            const isCenter = index === 1; // Middle pill (Customize)
            return (
              <div key={p.label} className="flex flex-col items-center text-center text-white">
                <div className={`relative overflow-hidden rounded-full bg-gradient-to-br from-[#6091FB] to-[#CC9EF3] shadow-xl ${
                  isCenter ? 'h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28' : 'h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20'
                }`}>
                  <Image
                    src={p.icon}
                    alt={`${p.label} - AI automation step icon`}
                    width={isCenter ? 56 : 36}
                    height={isCenter ? 56 : 36}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_22px_rgba(26,36,95,0.35)] ${
                      isCenter ? 'h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16' : 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10'
                    }`}
                  />
                </div>
                <div className={`mt-3 sm:mt-4 md:mt-5 font-semibold tracking-wide ${
                  isCenter ? 'text-base sm:text-lg md:text-xl lg:text-2xl' : 'text-sm sm:text-base md:text-lg lg:text-xl'
                }`}>
                  {p.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CardShell>
  );
}

function IntegrationsCard({ className }: { className?: string }) {
  const tools = [
    { name: "HubSpot", logo: "/tools/hubspot.svg", url: "https://www.hubspot.com" },
    { name: "Google Calendar", logo: "/tools/google_calender.svg", url: "https://calendar.google.com" },
    { name: "Google Sheets", logo: "/tools/google_sheets.svg", url: "https://sheets.google.com" },
    { name: "WhatsApp", logo: "/tools/whatsapp.svg", url: "https://www.whatsapp.com" },
    { name: "Zoho", logo: "/tools/zoho.svg", url: "https://www.zoho.com" },
  ];

  return (
    <CardShell className={className}>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
      Seamless Workflow Integration
      </h3>
      <p className="mt-2 max-w-2xl text-sm md:text-base text-white/80">
      Our team integrates your new AI agent directly into your existing CRM, sales, and support tools. We handle the connections to ensure a smooth and powerful automated workflow.
      </p>
      <div className="mt-6 md:mt-8 relative h-32 md:h-40">
        {tools.map((tool, index) => {
          // Different sizes and positions to match the reference image exactly
          const configs = [
            { 
              size: 'w-9 h-9 md:w-10 md:h-10', 
              logoSize: 'w-5 h-5 md:w-6 md:h-6',
              position: 'absolute top-2 left-8 md:left-12' // Top left (smaller)
            },
            { 
              size: 'w-10 h-10 md:w-12 md:h-12', 
              logoSize: 'w-5 h-5 md:w-7 md:h-7',
              position: 'absolute top-0 right-8 md:right-12' // Top right (medium)
            },
            { 
              size: 'w-14 h-14 md:w-16 md:h-16', 
              logoSize: 'w-6 h-6 md:w-8 md:h-8',
              position: 'absolute bottom-4 left-1/2 transform -translate-x-1/2' // Center bottom (largest)
            },
            { 
              size: 'w-10 h-10 md:w-11 md:h-11', 
              logoSize: 'w-7 h-7 md:w-8 md:h-8',
              position: 'absolute bottom-0 left-4 md:left-8' // Bottom left (medium-small)
            },
            { 
              size: 'w-12 h-12 md:w-13 md:h-13', 
              logoSize: 'w-7 h-7 md:w-8 md:h-8',
              position: 'absolute bottom-2 right-4 md:right-8' // Bottom right (medium)
            },
          ];

          return (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${configs[index].position} ${configs[index].size} grid place-items-center cursor-pointer rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-gray-50 group`}
              title={`Visit ${tool.name}`}
            >
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={32}
                height={32}
                className={`${configs[index].logoSize} object-contain transition-transform duration-300 group-hover:scale-105`}
              />
            </a>
          );
        })}
      </div>
    </CardShell>
  );
}
