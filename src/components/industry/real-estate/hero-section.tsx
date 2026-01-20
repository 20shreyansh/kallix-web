"use client";

import Image from "next/image";
import Link from "next/link";
import { ChatBlock } from "./chat-block";

export function HeroSection() {

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-purple-200 bg-white px-4 py-2 text-md font-medium mb-8 shadow-sm mx-auto lg:mx-0">
              <Image
                src="/industry/icon/estate.png"
                alt="Star"
                width={24}
                height={24}
                className="w-4 h-4"
              />
              <span className="bg-gradient-to-r from-[#CC9EF3] to-[#6191FB] bg-clip-text text-transparent font-semibold">
                Real Estate
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-normal leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl mb-6">
              Intelligent AI Agents
              <br />
              for <span className="bg-gradient-to-r from-[#CC9EF3] to-[#6191FB] bg-clip-text text-transparent font-semibold">Real Estate</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Kallix is your dedicated AI Service Coordinator, working 24/7 to answer every call, qualify every lead, and book jobs directly into your scheduling system. Stop losing revenue to missed calls and busy lines.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/#strategy-form"
                className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-btn-gradient text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                Book A Demo
              </Link>
              <Link
                href="/#phone-mock"
                className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white text-black font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                TRY NOW
              </Link>
            </div>
          </div>

          {/* Right Content - Map with Chat Block */}
          <div className="relative w-full h-[500px] lg:h-[600px]">
            {/* Map Background with Rounded Opacity Gradient */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/industry/real-estate/map.png"
                  alt="Interactive real estate map showing property locations and service areas"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Radial Gradient Overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.9) 100%)'
                  }}
                ></div>
              </div>
            </div>

            {/* Chat Block in Center */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <ChatBlock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
