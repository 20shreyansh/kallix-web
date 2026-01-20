"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const communicationIcons = [
  { src: "/icon/phone.png", alt: "Phone", },
  { src: "/icon/whatsapp.png", alt: "WhatsApp", },
  { src: "/icon/gmail.png", alt: "Gmail", },
  { src: "/icon/message.png", alt: "Message", },
];

const actionCards = [
  {
    id: 1,
    icon: (
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    text: "Verify Profile",
    highlighted: false,
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    text: "Verify System Age",
    highlighted: true,
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
    text: "Prioritize High Value Lead",
    highlighted: false,
  },
];

export default function CoverageVisual() {
  const [cards, setCards] = useState(actionCards);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCards((prevCards) => {
          const newCards = [...prevCards];
          // Rotate cards: move first to last (reverse animation)
          const firstCard = newCards.shift();
          if (firstCard) {
            newCards.push(firstCard);
          }
          return newCards;
        });
        setIsAnimating(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Main Card */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-xl border border-gray-200">
        {/* Communication Icons Row */}
        <div className="flex items-center justify-center">
          {communicationIcons.map((icon, index) => (
            <>
              <div key={icon.alt} className="relative">
                <Image
                  src={icon.src}
                  alt={`${icon.alt} communication channel icon`}
                  width={40}
                  height={40}
                  className={`w-10 h-10 object-contain`}
                />
              </div>
              {index < communicationIcons.length - 1 && (
                <div key={`line-${index}`} className="w-10 border-t border-dashed border-gray-200"></div>
              )}
            </>
          ))}
        </div>

        {/* Vertical Dashed Line */}
        <div className="flex justify-center mt-[-20px]">
          <div className="h-32 border-l border-dashed border-gray-200"></div>
        </div>

        {/* Kallix Branding */}
        <div className="text-center -mt-20 h-20">
          <h3 className="text-4xl font-bold text-gray-900">Kallix</h3>
        </div>

        {/* Action Cards with Animation */}
        <div className="relative h-[160px] flex flex-col items-center gap-y-4 overflow-hidden">
          <style jsx>{`
            @keyframes slideUp {
              0% {
                transform: translateY(0) scale(1);
              }
              100% {
                transform: translateY(-55px) scale(1);
              }
            }
          `}</style>
          {cards.map((card, index) => {
            const isMiddle = index === 1;
            const isVisible = index < 3;

            return (
              <div
                key={card.id}
                className="absolute w-[86%]"
                style={{
                  transform: `translateY(${index * 52}px) scale(${
                    isMiddle ? 1.02 : 0.96
                  })`,
                  opacity: isVisible ? (isMiddle ? 1 : 0.5) : 0,
                  zIndex: 3 - index,
                  transition: isAnimating
                    ? "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className={`rounded-md p-2 flex items-center gap-3 bg-white border border-gray-200`}
                  style={{
                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-white border border-gray-200`}
                    style={{
                      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <svg
                      className={`w-4 h-4 text-gray-700`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {card.icon.props.children}
                    </svg>
                  </div>
                  <span
                    className={`text-sm font-medium text-black`}
                    style={{
                      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {card.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
