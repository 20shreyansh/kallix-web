"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ComingSoonProps {
  title?: string;
  description?: string;
  industry?: string;
}

export function ComingSoon({ 
  title = "Healthcare Automation",
  description = "We are currently training our voice engine to master the specific nuances, vocabulary, and workflows of Healthcare. Seamless, human-like interaction for this sector is arriving soon.",
  industry = "Healthcare"
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle email submission here
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute top-40 -left-4 w-28 h-28 bg-linear-to-br from-[#FFD8F9] to-[#D093C674] rounded-full shadow-md">
        <div className="flex items-center justify-center w-full h-full p-8">
          <Image src={"/icon/mic.png"} width={100} height={100} alt="" className="" />
        </div>
      </div>
      
      <div className="absolute top-1/2 right-32 w-12 h-12 bg-linear-to-tl from-[#2C31A7] to-[#B1E3FF04] rounded-full animate-bounce">
        <div className="flex items-center justify-center w-full h-full p-3">
          <Image src={"/icon/mic.png"} width={100} height={100} alt="" className="" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-12">
            {title}
          </h1>

          {/* Description */}
          <p className="text-md text-gray-600 leading-relaxed max-w-xl mx-auto">
            {description}
          </p>

          {/* Email Form */}
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="flex max-w-md mx-auto bg-white/80 border border-gray-200 rounded-lg shadow-2xl">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-base border-none"
                required
              />
              <Button
                type="submit"
                className="px-8 h-12 bg-btn-gradient text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Notify Me
              </Button>
            </form>
            
            {isSubmitted && (
              <p className="mt-4 text-green-600 font-medium">
                Thanks! We&apos;ll notify you when the {industry} model is live.
              </p>
            )}
            
            <p className="mt-12 text-sm text-gray-500">
              Notify me when the {industry} model is live
            </p>
          </div>
          {/* Bottom Orb */}
          <div className="flex items-center justify-center mt-12">
          <div className="w-24 h-24 bg-linear-to-tl from-[#C524ED] to-[#FFE9F8] rounded-full">
            <div className="flex items-center justify-center w-full h-full p-6">
              <Image src={"/icon/mic.png"} width={100} height={100} alt="" className="" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
