"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Message {
  id: number;
  type: "Customer" | "Kallix";
  text: string;
}

const messages: Message[] = [
  { id: 1, type: "Customer", text: "I want to check a 2BHK in Noida Sector 62." },
  { id: 2, type: "Kallix", text: "Sure! I found 2 units available. Should I send details?" },
  { id: 3, type: "Customer", text: "Yes" },
  { id: 4, type: "Kallix", text: "Great! Unit 1: 1200 sq ft, 2BHK, ₹45L. Unit 2: 1350 sq ft, 2BHK, ₹52L." },
  { id: 5, type: "Customer", text: "What about the amenities?" },
  { id: 6, type: "Kallix", text: "Kallixh units include parking, gym, pool, and 24/7 security." },
  { id: 7, type: "Customer", text: "Can I schedule a visit?" },
  { id: 8, type: "Kallix", text: "Absolutely! When would you like to visit? I have slots available tomorrow." },
  { id: 9, type: "Customer", text: "Tomorrow at 3 PM works" },
  { id: 10, type: "Kallix", text: "Perfect! I've scheduled your visit for tomorrow at 3 PM. You'll receive a confirmation shortly." },
];

export function ChatBlock() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset and start animation
    setVisibleMessages([]);
    
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message.id]);
      }, index * 2000); // 2 seconds delay between each message
    });

    // Loop the animation
    const totalDuration = messages.length * 2000 + 4000; // Add 4s pause before restart
    const interval = setInterval(() => {
      setVisibleMessages([]);
      messages.forEach((message, index) => {
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message.id]);
        }, index * 2000);
      });
    }, totalDuration);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new message appears
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleMessages]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Scheduling Header */}
      <div className="bg-[#F0F0F0] rounded-full px-3 py-1 flex items-center justify-between mb-2">
        <span></span>
        <span className="text-sm font-medium text-gray-800">Scheduling</span>
        <button className="text-gray-600">
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Chat Window */}
      <div className="bg-white border-2 border-[#E3E3E3] rounded-2xl shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-black px-5 py-2 flex items-center justify-between">
          <span className="text-lg text-white">Live support chat</span>
          <button className="text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="p-4 space-y-3 bg-[#ffffff] h-[300px] overflow-y-auto scrollbar-hide scroll-smooth"
        >
          {messages
            .filter((message) => visibleMessages.includes(message.id))
            .map((message) => (
              <div
                key={message.id}
                className={`flex items-center gap-2 animate-fade-in ${
                  message.type === "Customer" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "Kallix" && (
                  <div className="w-8 h-8 rounded-full bg-[#BF9CF4] shrink-0 flex items-center justify-center p-2">
                    <Image src={"/icon/bot.png"} alt="" width={40} height={40} className="" />
                  </div>
                )}

                <div
                  className={`flex flex-col gap-1 max-w-[75%] ${
                    message.type === "Customer" ? "items-end" : "items-start"
                  }`}
                >
                  <p className="text-xs text-neutral-900">
                    {message.type === "Customer" ? "Customer" : "Kallix"}
                  </p>
                  <div
                    className={`px-3 py-2 rounded-full ${
                      message.type === "Customer"
                        ? "bg-[#F4EEFF] rounded-tr-none"
                        : "bg-[#FCFCFC] rounded-tl-none border-[#F7F7F7] border"
                    }`}
                  >
                    <p className="text-neutral-900 text-xs">{message.text}</p>
                  </div>
                </div>

                {message.type === "Customer" && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0 overflow-hidden">
                    <Image
                      src="/home/nick.png"
                      alt="Customer"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white border-t border-gray-200">
          <input
            type="text"
            placeholder="Type here...."
            className="w-full px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
