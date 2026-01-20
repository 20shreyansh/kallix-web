"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface NavItem {
  id: string;
  name: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  className?: string;
}

export function NavDropdown({
  label,
  items,
  className = "",
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-base md:text-sm text-black/70 hover:text-black transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-6 left-0 w-48 bg-[#ffffff] border border-black/10 rounded-xl shadow-xl backdrop-blur-md z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="p-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm text-black/70 rounded-lg hover:bg-black/5 hover:text-black transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
