"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Industry {
  id: string;
  name: string;
  iconPath: string;
  href?: string;
}

const industries: Industry[] = [
  {
    id: "estate",
    name: "Real Estate",
    href: "/industry/real-estate",
    iconPath: "/industry/icon/estate.png",
  },
  {
    id: "home-services",
    name: "Home Services",
    href: "/industry/home-services",
    iconPath: "/industry/icon/home-services.png",
  },
  {
    id: "retail",
    name: "Retail",
    href: "/industry/retail",
    iconPath: "/industry/icon/retail.png",
  },
  {
    id: "insurance",
    name: "Insurance",
    href: "/industry/insurance",
    iconPath: "/industry/icon/insurance.png",
  },
  {
    id: "health-fitness",
    name: "Health & Fitness",
    href: "/industry/health-fitness",
    iconPath: "/industry/icon/health.png",
  },
  {
    id: "education",
    name: "Education",
    href: "/industry/education",
    iconPath: "/industry/icon/education.png",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    href: "/industry/financial-services",
    iconPath: "/industry/icon/financial.png",
  },
];

interface IndustryDropdownProps {
  className?: string;
}

export function IndustryDropdown({ className = "" }: IndustryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, []);

  const handleIndustrySelect = (industry: Industry) => {
    setIsOpen(false);
    if (industry.href) {
      router.push(industry.href);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-2 text-base md:text-sm text-black/70 hover:text-black transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Industry</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-6 left-0 w-56 bg-[#ffffff] border border-black/10 rounded-xl shadow-xl backdrop-blur-md z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-black/60 uppercase tracking-wider mb-1">
              Industries
            </div>
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleIndustrySelect(industry)}
                className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer text-left rounded-lg hover:bg-black/5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center w-4 h-4">
                  <Image
                    src={industry.iconPath}
                    alt={industry.name}
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span className="text-sm text-black group-hover:text-black">
                  {industry.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
