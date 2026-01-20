"use client";
import Image from "next/image";

const BRANDS = [
  {
    name: "AWS",
    logo: "/brands/aws.svg",
    width: 60,
    height: 36,
    url: "https://aws.amazon.com",
  },
  {
    name: "ElevenLabs",
    logo: "/brands/elevenlabs.png",
    width: 140,
    height: 32,
    url: "https://elevenlabs.io",
  },
  {
    name: "Google Sheets",
    logo: "/brands/google_sheets.svg",
    width: 120,
    height: 32,
    url: "https://sheets.google.com",
  },
  {
    name: "HubSpot",
    logo: "/brands/hubspot.svg",
    width: 120,
    height: 32,
    url: "https://hubspot.com",
  },
  {
    name: "Salesforce",
    logo: "/brands/salesforce.svg",
    width: 140,
    height: 32,
    url: "https://salesforce.com",
  },
  {
    name: "Zapier",
    logo: "/brands/zapier.svg",
    width: 100,
    height: 32,
    url: "https://zapier.com",
  },
  {
    name: "Zoho",
    logo: "/brands/zoho.svg",
    width: 80,
    height: 32,
    url: "https://zoho.com",
  },
];

export default function BrandsSection() {
  return (
    <section id="brands" className="pt-16 md:pt-20">
      <div className="mx-auto max-w-8xl">
        {/* Carousel */}
        <div className="group overflow-hidden">
          <div className="flex w-max gap-12 md:gap-16 animate-marquee-x group-hover:[animation-play-state:paused]">
            {/* First set */}
            {BRANDS.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-16 transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className="object-contain"
                />
              </a>
            ))}
            {/* Duplicate set for seamless loop */}
            {BRANDS.map((brand) => (
              <a
                key={`${brand.name}-duplicate`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-16 transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}