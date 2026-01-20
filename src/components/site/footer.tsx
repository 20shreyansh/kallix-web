"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Linkedin, X } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#000000] text-white">
      {/* Newsletter Section */}
      <div className="px-8 py-12 md:px-16 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              <p className="text-lg text-[#FEFBF6] font-bold mb-2">
                SUBSCRIBE TO OUR
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold">
                NEWSLETTER
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:min-w-lg border border-white/30 rounded-sm p-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address ..."
                className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
              <button
                onClick={handleSubscribe}
                className="px-12 py-1.5 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors whitespace-nowrap cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20"></div>

      {/* Main Footer Content */}
      <div className="px-8 py-12 md:px-16 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Logo and Social */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl font-medium">Kallix AI</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="X"
                >
                  <X className="w-5 h-5" />
                </Link>
                <Link
                  href="https://wa.me/918604911124"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Whatsapp"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-xl">
                <li>
                  <Link
                    href="/"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#phone-mock"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Try Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#strategy-form"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Get Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Resources</h3>
              <ul className="space-y-4 text-xl">
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Knowledge Hub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Industry */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Industry</h3>
              <ul className="space-y-4 text-xl">
                <li>
                  <Link
                    href="/industry/real-estate"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Real Estate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industry/home-services"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Home Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Retail
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Insurance
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Health & Fitness
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Education
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Financial Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
              <div className="space-y-4 text-xl">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <Link
                    href="mailto:hello@kallix.in"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    hello@kallix.in
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <Link
                    href="tel:+918604911124"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    +91 8604911124
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20">
        <div className="px-8 py-6 md:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-md text-white/60">
              ©2025 Kallix AI. All rights reserved
            </p>
            <div className="flex items-center gap-6 text-md text-white/60">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span>|</span>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Condition
              </Link>
              <span>|</span>
              <Link
                href="/sitemap.xml"
                className="hover:text-white transition-colors"
              >
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
