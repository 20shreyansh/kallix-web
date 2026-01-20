"use client";

import { useState } from "react";
import Image from "next/image";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Email validation regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setError("Email address is required");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please include '@' in the email address");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    setError("");
  };

  return (
    <section className="relative pt-40 px-4 overflow-hidden">
      {/* Background gradient ellipses */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Ellipse 111 - Largest outer glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: "1310px",
            height: "1310px",
            top: "120px",
            background:
              "linear-gradient(180deg, rgba(122, 56, 252, 0.16) 0%, rgba(122, 56, 252, 0.19) 33.38%)",
            filter: "blur(30px)",
            borderRadius: "50%",
          }}
        />
        {/* Ellipse 110 - Middle warm glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: "1129px",
            height: "1129px",
            top: "223px",
            background:
              "linear-gradient(180deg, rgba(255, 216, 212, 0.128) 0%, rgba(255, 156, 148, 0.152) 33.38%)",
            filter: "blur(20px)",
            borderRadius: "50%",
          }}
        />
        {/* Ellipse 109 - Inner purple glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: "900px",
            height: "900px",
            top: "310px",
            background:
              "radial-gradient(40.13% 25% at 50% 25%, rgba(122, 56, 252, 0.1846) 0%, rgba(122, 56, 252, 0.355) 100%)",
            filter: "blur(35px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 max-w-xl mt-16">
            <h2 className="text-5xl md:text-6xl font-medium text-black mb-6 leading-tight">
              Stay Ahead of AI Innovation
            </h2>
            <p className="text-black/60 mb-8 leading-relaxed">
              Join thousands of AI enthusiasts and professionals who receive our
              weekly insights on the latest developments in artificial
              intelligence.
            </p>

            {isSubmitted ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thank you for subscribing!
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={`flex items-center rounded-full border bg-white focus-within:ring-2 overflow-hidden ${
                    error
                      ? "border-red-400 focus-within:ring-red-500/50"
                      : "border-black/10 focus-within:ring-violet-500/50"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-transparent text-black placeholder-black/40 text-sm focus:outline-none"
                    required
                    autoComplete="email"
                    inputMode="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-full bg-btn-gradient text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
                  >
                    {isSubmitting ? "..." : "SUBSCRIBE"}
                  </button>
                </form>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </>
            )}
          </div>

          {/* Right Illustration */}
          <div className="flex-shrink-0">
            <Image
              src="/icon/newsletter.png"
              alt="Newsletter"
              width={400}
              height={300}
              className="h-64 md:h-80 lg:h-120 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
