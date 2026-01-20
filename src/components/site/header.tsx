"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useBannerVisibility } from "./top-banner";
import { SolutionsDropdown } from "../ui/solutions-dropdown";
import { NavDropdown } from "@/components/ui/nav-dropdown";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isBannerVisible = useBannerVisibility();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper function to get the correct navigation URL
  const getNavUrl = (section: string) => {
    // If we're on the home page, use hash navigation
    if (pathname === "/") {
      return `#${section}`;
    }
    // If we're on any other page, navigate to home page with the section
    return `/#${section}`;
  };

  // Resources dropdown items
  const resourcesItems = [
    { id: "blog", name: "Blog", href: "/blog" },
    { id: "docs", name: "Documentation", href: "/docs" },
    { id: "support", name: "Support", href: "/support" },
  ];

  return (
    <header
      className={`sm:px-4 fixed w-full z-40 ${
        isBannerVisible ? "top-10" : "top-0 sm:top-8"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <nav
          className={`${
            isBannerVisible ? "mt-4 sm:mt-9" : "mt-0 sm:mt-0"
          } transition-all duration-300 ease-in-out sm:rounded-2xl border border-black/10 bg-white/40 backdrop-blur-md`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 md:px-6">
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                href="/"
                className="text-2xl font-semibold tracking-tight text-black"
              >
                Kallix
              </Link>
              <span className="hidden h-6 w-px bg-black/10 md:block" />
              <ul className="hidden items-center gap-6 text-sm text-black/70 md:flex">
                <li>
                  <Link
                    href="/about"
                    className="relative hover:text-black transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <SolutionsDropdown />
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="relative hover:text-black transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="relative hover:text-black transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <NavDropdown label="Resources" items={resourcesItems} />
                </li>
              </ul>
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={getNavUrl("strategy-form")}
                className="inline-flex items-center justify-center h-8 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 rounded-xl border border-black/10 bg-white text-black shadow-sm transition-all duration-300 hover:bg-black/[.03] hover:scale-105 hover:shadow-md"
              >
                Contact Sales
              </a>
              <a
                href={getNavUrl("phone-mock")}
                className="inline-flex items-center justify-center h-8 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 rounded-xl bg-gradient-to-b from-neutral-700 to-neutral-900 text-white shadow transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg"
              >
                Try demo
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-black/10 px-3 sm:px-4 py-4 space-y-4">
              <ul className="space-y-3 text-black/70">
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-base hover:text-black transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li className="py-2">
                  <SolutionsDropdown />
                </li>
                <li>
                  <Link
                    href="/integrations"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-base hover:text-black transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-base hover:text-black transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="py-2">
                  <NavDropdown label="Resources" items={resourcesItems} />
                </li>
              </ul>

              {/* Mobile buttons */}
              <div className="flex flex-col sm:hidden gap-3 pt-4 border-t border-black/10">
                <a
                  href={getNavUrl("strategy-form")}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full h-10 rounded-xl border border-black/10 bg-white text-black shadow-sm transition-all duration-300 hover:bg-black/[.03] hover:scale-105 hover:shadow-md"
                >
                  Contact Sales
                </a>
                <a
                  href={getNavUrl("phone-mock")}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full h-10 rounded-xl bg-gradient-to-b from-neutral-700 to-neutral-900 text-white shadow transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg"
                >
                  Try demo
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
