"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { submitHeroFormToHubSpot } from "@/lib/hubspot";
import { CheckCircle, AlertCircle } from "lucide-react";

function useClock() {
  const [now, setNow] = React.useState<string>("");
  React.useEffect(() => {
    const fmt = () => {
      try {
        const locale = navigator.language || "en-US";
        const s = new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date());
        setNow(s);
      } catch {
        setNow(
          new Date().toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function PhoneMock() {
  const time = useClock();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Additional checks
    if (email.length > 254) {
      return "Email address is too long";
    }

    const [localPart, domain] = email.split("@");

    if (localPart.length > 64) {
      return "Email local part is too long";
    }

    if (domain.length < 3) {
      return "Invalid domain name";
    }

    // Check for consecutive dots
    if (email.includes("..")) {
      return "Email cannot contain consecutive dots";
    }

    // Check if domain has at least one dot
    if (!domain.includes(".")) {
      return "Invalid domain format";
    }

    return null;
  };

  // Validation function
  const validate = (data = formData) => {
    const e: Record<string, string> = {};

    if (!data.name.trim()) {
      e.name = "Name is required";
    } else if (data.name.trim().length < 2) {
      e.name = "Enter at least 2 characters";
    } else if (data.name.length > 50) {
      e.name = "Max 50 characters";
    }

    if (!data.email.trim()) {
      e.email = "Email is required";
    } else {
      const emailError = validateEmail(data.email.trim());
      if (emailError) {
        e.email = emailError;
      }
    }

    return e;
  };

  // Check if form is valid
  const isFormValid = () => {
    const allFieldsFilled =
      formData.name.trim() !== "" && formData.email.trim() !== "";
    const noErrors = Object.keys(validate()).length === 0;
    return allFieldsFilled && noErrors;
  };

  // Handle field changes
  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    // Validate if field has been touched
    if (touched[field]) {
      setErrors(validate(newData));
    }
  };

  // Handle input focus (user starts typing)
  const handleInputFocus = () => {
    setIsTyping(true);
  };

  // Handle input blur (user stops typing)
  const handleInputBlur = (field: keyof typeof formData) => {
    setIsTyping(false);
    handleFieldBlur(field);
  };

  // Handle field blur
  const handleFieldBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  // Sanitize email input
  const sanitizeEmail = (input: string) => {
    // Remove leading/trailing whitespace and convert to lowercase
    return input.trim().toLowerCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true });

    // Validate form
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors above");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      await submitHeroFormToHubSpot({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      setSubmitStatus("success");
      setSubmitMessage("Redirecting to your AI agent...");

      // Reset form
      setFormData({ name: "", email: "" });
      setTouched({});
      setErrors({});

      // Redirect to /app/agent after a short delay
      setTimeout(() => {
        router.push("/agent");
      }, 1500);
    } catch (error) {
      console.error("Hero form submission error:", error);
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className="relative mx-auto w-[280px] sm:w-[320px] md:w-[360px] rounded-t-[32px] sm:rounded-t-[36px] md:rounded-t-[40px] border-4 sm:border-5 md:border-[6px] !border-b-0 border-neutral-900 bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        animation:
          !isTyping && isHovering
            ? "vibrate 0.5s ease-in-out infinite"
            : "none",
      }}
    >
      <style jsx>{`
        @keyframes vibrate {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          10% {
            transform: translateX(-1px) rotate(-0.5deg);
          }
          20% {
            transform: translateX(1px) rotate(0.5deg);
          }
          30% {
            transform: translateX(-1px) rotate(-0.5deg);
          }
          40% {
            transform: translateX(1px) rotate(0.5deg);
          }
          50% {
            transform: translateX(-1px) rotate(-0.5deg);
          }
          60% {
            transform: translateX(1px) rotate(0.5deg);
          }
          70% {
            transform: translateX(-1px) rotate(-0.5deg);
          }
          80% {
            transform: translateX(1px) rotate(0.5deg);
          }
          90% {
            transform: translateX(-1px) rotate(-0.5deg);
          }
        }
      `}</style>
      {/* status bar */}
      <div className="relative h-8 sm:h-9 md:h-10">
        {/* curved corners thickness */}
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 sm:top-3 md:top-3.5 h-1.5 sm:h-1.5 md:h-2 w-12 sm:w-14 md:w-16 -translate-x-1/2 rounded-full bg-neutral-900/95" />
        <div className="absolute left-4 sm:left-5 md:left-6 top-1.5 sm:top-1.5 md:top-2 text-xs sm:text-xs md:text-[13px] font-medium text-neutral-900">
          {time || "00:00"}
        </div>
        <div className="absolute right-4 sm:right-5 md:right-6 top-2 sm:top-2.5 md:top-3 flex items-center gap-1 text-neutral-900">
          {/* signal */}
          <svg
            className="w-4 sm:w-4 md:w-[18px] h-3 sm:h-3 md:h-3"
            viewBox="0 0 18 12"
            fill="none"
          >
            <rect
              x="1"
              y="7"
              width="2"
              height="4"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="5"
              y="5"
              width="2"
              height="6"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="9"
              y="3"
              width="2"
              height="8"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="13"
              y="1"
              width="2"
              height="10"
              rx="0.5"
              fill="currentColor"
            />
          </svg>
          {/* wifi */}
          <svg
            className="w-4 sm:w-4 md:w-[18px] h-3 sm:h-3 md:h-3"
            viewBox="0 0 16 12"
            fill="none"
          >
            <path
              d="M2 4c3.5-3 8.5-3 12 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M4 6.5c2.5-2 5.5-2 8 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M6.75 9a3 3 0 0 1 2.5 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="8" cy="10.3" r="1" fill="currentColor" />
          </svg>
          {/* battery */}
          <svg
            className="w-5 sm:w-6 md:w-[26px] h-3 sm:h-3 md:h-3"
            viewBox="0 0 22 12"
            fill="none"
          >
            <rect
              x="1"
              y="2"
              width="18"
              height="8"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <rect
              x="3"
              y="4"
              width="12"
              height="4"
              rx="1"
              fill="currentColor"
            />
            <rect
              x="19.5"
              y="4"
              width="2"
              height="4"
              rx="0.8"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* inner app area */}
      <div className="mx-2 sm:mx-2.5 md:mx-3 mb-3 sm:mb-3.5 md:mb-4 rounded-t-[20px] sm:rounded-t-[24px] md:rounded-t-[28px] bg-[#EDEFFE] px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 md:pt-14 pb-3 sm:pb-3.5 md:pb-4">
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
          <Image
            src="/home/nick.png"
            alt="Nick from Kallix AI agent profile photo"
            width={52}
            height={52}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px] rounded-md object-cover"
          />
          <div>
            <div className="text-base sm:text-lg md:text-xl text-neutral-900">
              Nick from Kallix
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#67A916]">
              Available
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-3 sm:mt-4 md:mt-5 space-y-2 sm:space-y-2.5 md:space-y-3"
        >
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              onFocus={handleInputFocus}
              onBlur={() => handleInputBlur("name")}
              className={`w-full rounded-xl sm:rounded-xl md:rounded-2xl border bg-white px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                errors.name && touched.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#C9C8EE] focus:border-[#B0AFF0]"
              }`}
              placeholder="Name *"
              required
              disabled={isSubmitting}
              maxLength={50}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleFieldChange("email", sanitizeEmail(e.target.value))
              }
              onFocus={handleInputFocus}
              onBlur={() => handleInputBlur("email")}
              className={`w-full rounded-xl sm:rounded-xl md:rounded-2xl border bg-white px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                errors.email && touched.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#C9C8EE] focus:border-[#B0AFF0]"
              }`}
              placeholder="Email (e.g., you@example.com) *"
              required
              disabled={isSubmitting}
              maxLength={254}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-green-50 p-2 sm:p-2.5 md:p-3 text-green-800">
              <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <p className="text-xs sm:text-xs md:text-sm font-medium">
                {submitMessage}
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-red-50 p-2 sm:p-2.5 md:p-3 text-red-800">
              <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <p className="text-xs sm:text-xs md:text-sm font-medium">
                {submitMessage}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid()}
            className="mt-1.5 sm:mt-2 flex w-full items-center justify-center gap-2 sm:gap-2.5 md:gap-3 rounded-xl sm:rounded-xl md:rounded-2xl bg-[#472ED1] px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-sm md:text-base font-semibold text-white shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3d25b8] transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="text-xs sm:text-sm md:text-base">
                  Submitting...
                </span>
              </>
            ) : (
              <>
                <Image
                  src="/icon/mic.png"
                  alt="Microphone icon"
                  width={16}
                  height={16}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                />
                <span className="text-xs sm:text-sm md:text-base">
                  Talk with Kallix
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
