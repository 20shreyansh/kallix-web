"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function AiAgentExperienceSection() {
  const sampleQuestions = [
    "Can I book a plumber for tomorrow morning?",
    "My AC isn't cooling — can someone check it today?",
    "What's your service charge for electrical work?",
  ];

  // Animation state for grid blocks
  const [filledBlocks, setFilledBlocks] = useState<Set<number>>(new Set());

  // Calculate grid dimensions (more generous sizing for better coverage)
  const gridCols = 20; // Fixed number of columns for consistency
  const gridRows = 12; // Fixed number of rows for better vertical coverage
  const totalBlocks = gridCols * gridRows;
  const blocksToFill = Math.floor(totalBlocks * 0.25); // 25% of blocks

  useEffect(() => {
    const animateBlocks = () => {
      // Generate random block indices with better distribution
      const newFilledBlocks = new Set<number>();
      const attempts = blocksToFill * 3; // Allow more attempts to ensure good distribution
      let attemptCount = 0;

      while (newFilledBlocks.size < blocksToFill && attemptCount < attempts) {
        const randomIndex = Math.floor(Math.random() * totalBlocks);
        newFilledBlocks.add(randomIndex);
        attemptCount++;
      }

      setFilledBlocks(newFilledBlocks);
    };

    // Initial animation
    animateBlocks();

    // Set up interval for continuous animation
    const interval = setInterval(animateBlocks, 3000);

    return () => clearInterval(interval);
  }, [blocksToFill, totalBlocks]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/block.png"
              alt="badge"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            How It Works
          </div>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-neutral-900 mb-6">
            Experience Our AI Agent Firsthand
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talk to our AI-powered service coordinator right now to see how it
            works.
          </p>
        </div>

        {/* Voice Interface Card */}
        <div className="relative bg-white rounded-2xl border border-gray-200 py-20 overflow-hidden">
          {/* Square Grid Background with Animated Blocks */}
          <div className="absolute inset-0">
            {/* Base Grid Lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #d1d5db 1px, transparent 1px),
                  linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
                `,
                backgroundSize: `${100 / gridCols}% ${100 / gridRows}%`,
              }}
            />

            {/* Animated Filled Blocks */}
            <div className="absolute inset-0">
              {Array.from({ length: totalBlocks }).map((_, index) => {
                const row = Math.floor(index / gridCols);
                const col = index % gridCols;
                const isFilled = filledBlocks.has(index);

                // Calculate responsive block size based on container
                const blockWidth = `${100 / gridCols}%`;
                const blockHeight = `${100 / gridRows}%`;

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ease-in-out ${
                      isFilled ? "opacity-20" : "opacity-0"
                    }`}
                    style={{
                      left: `${(col / gridCols) * 100}%`,
                      top: `${(row / gridRows) * 100}%`,
                      width: blockWidth,
                      height: blockHeight,
                      background: isFilled
                        ? "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)"
                        : "transparent",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Gradient Overlay for Grid Fade Effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(255, 255, 255, 0.6) 15%, 
                rgba(255, 255, 255, 0.2) 35%, 
                rgba(255, 255, 255, 0) 50%, 
                rgba(255, 255, 255, 0.2) 65%, 
                rgba(255, 255, 255, 0.6) 85%, 
                rgba(255, 255, 255, 0.9) 100%
              )`,
            }}
          />

          {/* Content overlay */}
          <div className="relative z-10">
            {/* Voice Visualization */}
            <div className="relative mb-8">
              <div className="flex items-center justify-center h-40">
                {/* Voice wave image */}
                <div className="relative w-full w-full">
                  <Image
                    src="/icon/wave.png"
                    alt="Voice wave visualization showing AI agent speaking"
                    width={800}
                    height={160}
                    className="w-full h-auto"
                  />

                  {/* Agent Avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-52 h-52 rounded-full shadow-xl overflow-hidden bg-btn-gradient">
                      <Image
                        src="/industry/home-services/person.jpg"
                        alt="AI agent profile photo"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover p-1.5 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Button and Timer */}
            <div className="text-center my-20">
              <Button
                asChild
                className="inline-flex items-center justify-center rounded-lg bg-btn-gradient px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                style={{
                  boxShadow:
                    "inset 0 0 0 1.29px #B1D0F8, 0 0 43.81px rgba(80,133,255,0.20)",
                }}
              >
                <Link href="/#phone-mock">CONNECT</Link>
              </Button>
              <div className="mt-6">
                <span className="text-xl font-mono text-gray-900">00:00</span>
              </div>
            </div>

            {/* Try Speaking Section */}
            <div className="text-center">
              <h3 className="text-4xl font-semibold text-gray-900 mb-8">
                Try Speaking
              </h3>
              <div className="space-y-4">
                {sampleQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="text-gray-600 text-base leading-relaxed"
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
