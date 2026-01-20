"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// Icons for Use Cases
const UseCaseIcons = {
  sales: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  ),
  support: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  ),
  appointment: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  ),
  receptionist: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  ),
};

// Icons for Case Studies
const CaseStudyIcons = {
  freshworks: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  ),
  customerSupport: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </svg>
  ),
  dataCollection: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  ),
  inboundCalls: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
      />
    </svg>
  ),
  leadReactivation: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  ),
  salesQualification: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  voiceAI: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
  ),
  bpo: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
  ivr: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
      />
    </svg>
  ),
};

// Industry icons
const IndustryIcons = {
  realEstate: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
      />
    </svg>
  ),
  homeServices: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  retail: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
      />
    </svg>
  ),
  insurance: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  ),
  healthFitness: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  ),
  education: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
      />
    </svg>
  ),
  financialServices: () => (
    <svg
      className="w-5 h-5 text-violet-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
      />
    </svg>
  ),
};

// Data for the mega menu
const useCases = [
  {
    id: "ai-sales-agent",
    name: "AI Sales Agent",
    description: "Automate outreach & qualify leads",
    icon: UseCaseIcons.sales,
    href: "/use-cases/ai-sales-agent",
  },
  {
    id: "customer-support",
    name: "Customer Support",
    description: "Resolve queries instantly, 24/7",
    icon: UseCaseIcons.support,
    href: "/use-cases/customer-support",
  },
  {
    id: "appointment-setter",
    name: "Appointment Setter",
    description: "Fill your calendar on autopilot",
    icon: UseCaseIcons.appointment,
    href: "/use-cases/appointment-setter",
  },
  {
    id: "ai-receptionist",
    name: "AI Receptionist",
    description: "Never miss an inbound call",
    icon: UseCaseIcons.receptionist,
    href: "/use-cases/ai-receptionist",
  },
];

const caseStudies = [
  {
    id: "freshworks",
    name: "Freshworks Integration",
    description: "Boosting CX with Voice AI",
    icon: CaseStudyIcons.freshworks,
    href: "/case-studies/freshworks",
  },
  {
    id: "customer-support",
    name: "Customer Support",
    description: "AI-driven helpdesk",
    icon: CaseStudyIcons.customerSupport,
    href: "/case-studies/customer-support",
  },
  {
    id: "data-collection",
    name: "Data Collection",
    description: "Automated info capture",
    icon: CaseStudyIcons.dataCollection,
    href: "/case-studies/data-collection",
  },
  {
    id: "inbound-calls",
    name: "Inbound Calls",
    description: "Smart call handling",
    icon: CaseStudyIcons.inboundCalls,
    href: "/case-studies/inbound-calls",
  },
  {
    id: "lead-reactivation",
    name: "Lead Reactivation",
    description: "Revive dormant leads",
    icon: CaseStudyIcons.leadReactivation,
    href: "/case-studies/lead-reactivation",
  },
  {
    id: "sales-qualification",
    name: "Sales Qualification",
    description: "Filter high-value leads",
    icon: CaseStudyIcons.salesQualification,
    href: "/case-studies/sales-qualification",
  },
  {
    id: "voice-ai-crm",
    name: "Voice AI for CRM",
    description: "Integrate AI calling",
    icon: CaseStudyIcons.voiceAI,
    href: "/case-studies/voice-ai-crm",
  },
  {
    id: "bpo-call-center",
    name: "BPO & Call Center",
    description: "Scale call operations",
    icon: CaseStudyIcons.bpo,
    href: "/case-studies/bpo-call-center",
  },
  {
    id: "ivr-optimization",
    name: "IVR Optimization",
    description: "Human-level accuracy",
    icon: CaseStudyIcons.ivr,
    href: "/case-studies/ivr-optimization",
  },
];

const industries = [
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Boosting CX with Voice AI",
    icon: IndustryIcons.realEstate,
    href: "/industry/real-estate",
  },
  {
    id: "home-services",
    name: "Home Services",
    description: "AI-driven helpdesk",
    icon: IndustryIcons.homeServices,
    href: "/industry/home-services",
  },
  {
    id: "retail",
    name: "Retail",
    description: "Automated info capture",
    icon: IndustryIcons.retail,
    href: "/industry/retail",
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Smart call handling",
    icon: IndustryIcons.insurance,
    href: "/industry/insurance",
  },
  {
    id: "health-fitness",
    name: "Health & Fitness",
    description: "Revive dormant leads",
    icon: IndustryIcons.healthFitness,
    href: "/industry/health-fitness",
  },
  {
    id: "education",
    name: "Education",
    description: "Filter high-value leads",
    icon: IndustryIcons.education,
    href: "/industry/education",
  },
  {
    id: "financial-services",
    name: "Financial Services",
    description: "Integrate AI calling",
    icon: IndustryIcons.financialServices,
    href: "/industry/financial-services",
  },
];

export function SolutionsDropdown() {
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
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-base md:text-sm text-black/70 hover:text-black transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Solutions</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed top-18 left-0 w-full bg-white border-y border-black/10 rounded-2xl shadow-xl z-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto flex">
            {/* Use Cases Column */}
            <div className="flex-1 p-6 border-r border-black/5">
              <h3 className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-4">
                Use Cases
              </h3>
              <div className="space-y-1">
                {useCases.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-black/5 transition-colors group"
                  >
                    <div className="mt-0.5">
                      <item.icon />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black group-hover:text-violet-600 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-black/50">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Case Studies Column */}
            <div className="flex-1 p-6 border-r border-black/5">
              <h3 className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-4">
                Case Studies
              </h3>
              <div className="space-y-1">
                {caseStudies.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-black/5 transition-colors group"
                  >
                    <div className="mt-0.5">
                      <item.icon />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black group-hover:text-violet-600 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-black/50">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Industry Column */}
            <div className="flex-1 p-6 border-r border-black/5">
              <h3 className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-4">
                Industry
              </h3>
              <div className="space-y-1">
                {industries.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-black/5 transition-colors group"
                  >
                    <div className="mt-0.5">
                      <item.icon />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black group-hover:text-violet-600 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-black/50">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Promotional Section */}
            <div className="w-sm p-6">
              <div className="border border-[#D0D0FF] p-6 rounded-lg bg-[#FCFCFC]">
                <h3 className="text-lg font-semibold text-black mb-2">
                  Smarter Appointment Booking
                </h3>
                <p className="text-xs text-black/60 mb-8">
                  Voice & web scheduling that fills calendar automatically
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-4xl font-bold text-violet-500">
                      +58%
                    </div>
                    <div className="text-[10px] text-black/50 pt-2">
                      Appointment Confirmed
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-violet-500">
                      70%
                    </div>
                    <div className="text-[10px] text-black/50 pt-2">
                      Slot Utilization
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-violet-500">
                      -32%
                    </div>
                    <div className="text-[10px] text-black/50 pt-2">
                      Fewer No-Shows
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-violet-500">
                      +27%
                    </div>
                    <div className="text-[10px] text-black/50 pt-2">
                      Increase booking rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
