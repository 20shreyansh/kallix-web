import React from "react";

/**
 * Layered background for the homepage hero.
 * - Soft top-right purple/blue radial glow
 * - Subtle bottom white lift
 * - Gentle horizontal guide lines
 * - Decorative hanging lines with tiny nodes
 *
 * Pure CSS (no assets), tuned to look good in both light/dark.
 */
export default function HeroBackground() {
  const anchors = [8, 22, 36, 50, 64, 78, 92];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      {/* Top-right radial glow with breathing animation */}
      <div
        className="absolute -top-40 right-[-15%] h-[140%] w-[140%] blur-2xl animate-pulse"
        style={{
          background:
            "radial-gradient(700px 520px at 85% 8%, rgba(186, 170, 255, 0.65), rgba(150, 196, 255, 0.6) 35%, rgba(222, 212, 255, 0.4) 55%, transparent 70%)",
          maskImage:
            "radial-gradient(800px 600px at 85% 8%, black, black 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(800px 600px at 85% 8%, black, black 40%, transparent 70%)",
          animationDuration: '4s',
        }}
      />

      {/* Bottom soft white lift with gentle movement */}
      <div
        className="absolute -bottom-24 left-1/2 h-[55%] w-[140%] -translate-x-1/2 blur-2xl animate-pulse"
        style={{
          background:
            "radial-gradient(600px 260px at 50% 100%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 40%, transparent 70%)",
          animationDuration: '5s',
        }}
      />

      {/* Subtle horizontal guide lines */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0.06) 1px, transparent 1px, transparent 120px)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Hanging lines with tiny nodes - animated */}
      <div className="absolute inset-x-0 top-[22%]">
        {anchors.map((left, i) => (
          <div
            key={i}
            className="absolute h-[88px] w-px animate-pulse"
            style={{ 
              left: `${left}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s'
            }}
          >
            <div className="relative h-full w-px bg-gradient-to-b from-transparent via-white/60 to-transparent">
              <span 
                className="absolute -bottom-1 left-1/2 block size-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_1px_rgba(255,255,255,0.7)] animate-ping" 
                style={{ 
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
