"use client";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/918604911124?text=Hi%20Kallix,%20I'm%20interested%20in%20your%20AI%20voice%20agent.%20What%20are%20the%20next%20steps%20to%20get%20started?";

export function FloatingWhatsAppButton() {
  return (
    <div className="group fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-8 lg:right-8">
      <span className="pointer-events-none select-none rounded-full bg-neutral-900/80 px-4 py-2 text-xs font-medium text-white shadow-2xl opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:text-sm">
        Chat with us on WhatsApp
      </span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kallix on WhatsApp"
        className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#25D366] shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_18px_40px_rgba(37,211,102,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[#5CFF9D] via-[#25D366] to-[#128C7E] opacity-80 blur-lg transition duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute inset-0 rounded-full border border-white/30 mix-blend-luminosity" />
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-70" style={{ animation: "pulse-ring 2.5s ease-in-out infinite" }} />
        <span className="sr-only">Open WhatsApp chat</span>
        <Image
          src="/tools/whatsapp.svg"
          alt="WhatsApp icon"
          width={32}
          height={32}
          className="relative z-10 transition-transform duration-300 group-hover:scale-110"
        />
      </a>
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.35);
          }
          70% {
            transform: scale(1.35);
            box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default FloatingWhatsAppButton;
