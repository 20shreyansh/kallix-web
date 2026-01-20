"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

// Create a global state for banner visibility
let bannerVisibilityListeners: ((visible: boolean) => void)[] = [];

export const useBannerVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    bannerVisibilityListeners.push(setIsVisible);
    return () => {
      bannerVisibilityListeners = bannerVisibilityListeners.filter(
        (listener) => listener !== setIsVisible
      );
    };
  }, []);

  return isVisible;
};

const notifyBannerVisibility = (visible: boolean) => {
  bannerVisibilityListeners.forEach((listener) => listener(visible));
};

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show banner when at top (scrollY < 50), hide when scrolling down
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldShow = !dismissed && isVisible;

  useEffect(() => {
    notifyBannerVisibility(shouldShow);
  }, [shouldShow]);

  return (
    <div
      className={`px-4 fixed w-full z-40 transition-all duration-300 ease-in-out ${
        shouldShow ? "top-2 opacity-100" : "-top-16 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-8xl">
        <div className="relative flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-gray-200 shadow-md ring-1 ring-white/10">
          <p className="text-center text-sm md:text-[15px] hidden lg:flex">
            Transform your workflow for higher ROI. Our AI agent captures,
            qualifies, and converts your leads around the clock.
            <Link
              href="https://calendly.com/kallix/kallix-ai"
              target="_blank"
              className="ml-3 inline-flex underline items-center gap-1 text-white font-medium hover:text-white/90"
            >
              Schedule a 30-Minute Demo <ArrowRight className="size-4" />
            </Link>
          </p>
          <p className="text-center text-sm md:text-[15px] lg:hidden flex">
            Capture leads 24/7 with AI.
            <Link
              href="https://calendly.com/kallix/kallix-ai"
              target="_blank"
              className="ml-3 inline-flex underline items-center gap-1 text-white font-medium hover:text-white/90"
            >
              Book Demo <ArrowRight className="size-4" />
            </Link>
          </p>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setDismissed(true)}
            className="absolute right-2 grid size-7 place-items-center rounded-md text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
