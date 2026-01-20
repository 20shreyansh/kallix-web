"use client";

import { useState } from "react";
import { Zap, ShoppingBag, Upload, FileText, Mic } from "lucide-react";
import { Conversation, AGENT_OPTIONS } from "@/app/components/conversation";

export default function Dashboard() {
  const [isListening] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [agentId, setAgentId] = useState<string>(AGENT_OPTIONS[0]?.id ?? "");

  const agents = [
    {
      title: "Real Estate Agent",
      topIcon: Upload,
      gradient: "bg-gradient-to-tl from-[#2B3354] to-black",
      active: true,
    },
    {
      title: "Insurance Agent",
      topIcon: FileText,
      gradient: "bg-gradient-to-tl from-[#4C4335] to-black",
      active: false,
    },
    {
      title: "Ecommerce Agent",
      topIcon: ShoppingBag,
      gradient: "bg-gradient-to-tl from-[#5A2B5E] to-black",
      active: false,
    },
    {
      title: "Hotel Booking Agent",
      topIcon: Mic,
      gradient: "bg-gradient-to-tl from-[#2D594E] to-black",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        {/* Lightning Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 md:mb-8 mx-auto">
          <Zap className="w-6 h-6 md:w-6 md:h-6 text-white" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
          Kallix AI Assistant
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto text-balance">
          Experience next-generation AI conversation with real-time voice
          interaction
        </p>
      </div>

      {/* Central Audio Visualizer */}
      <div className="mb-8 md:mb-4">
        <div className="relative">
          {/* Main Circle */}
          {/* <button
            onClick={() => setIsListening(!isListening)}
            className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-2 transition-all duration-300 ${
              isListening
                ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25"
                : "border-gray-600 hover:border-purple-400"
            }`}
          >
            <div
              className={`w-full h-full rounded-full transition-all duration-300 ${
                isListening
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                  : ""
              }`}
            />
          </button> */}
          <Conversation agentId={agentId} />
          {/* Pulse Animation when listening */}
          {isListening && (
            <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-75" />
          )}
        </div>

        {/* Tap to start text
        <p className="text-center mt-6 md:mt-8 text-gray-300 text-lg md:text-xl">
          Tap to start
          <br />
          conversation
        </p> */}
      </div>

      {/* Control Bar */}
      {/* <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 mb-8 md:mb-12 border border-white/10 outline-none">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            className="text-gray-400 hover:text-white bg-transparent"
            onClick={() => setIsMuted((m) => !m)}
            aria-label={isMuted ? "Unmute" : "Mute"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-10 h-10" />
            ) : (
              <Volume2 className="w-10 h-10" />
            )}
          </Button>

          <Button className="text-gray-400 hover:text-white bg-transparent">
            <Zap className="w-10 h-10" />
          </Button>

          {isListening && (
            <Button
              className="text-red-500 hover:text-red-400 bg-transparent"
              onClick={() => setIsListening(false)}
              aria-label="End conversation"
              title="End conversation"
            >
              <PhoneOff className="w-10 h-10" />
            </Button>
          )}

          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="w-26 md:w-32 bg-white/5 border-white/10 text-gray-200">
              <SelectValue placeholder="Select Voice" />
            </SelectTrigger>
            <SelectContent className="bg-black/80 text-white border-white/20 backdrop-blur-md shadow-lg">
              {voices.map((v) => (
                <SelectItem
                  key={v.value}
                  className="text-white/90 focus:bg-white/10 focus:text-white"
                  value={v.value}
                >
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div> */}

      {/* Agent Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
        {agents.map((agent, index) => {
          const TopIcon = agent.topIcon;
          const isActive = activeAgentIndex === index;
          return (
            <div
              key={index}
              className={`relative rounded-[28px] border border-white/10 ${agent.gradient} p-5 min-h-36 md:min-h-52 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transform-gpu will-change-transform transition-transform duration-300 md:duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-y-[-6px]`}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveAgentIndex(index);
                const normalize = (s: string) =>
                  s.toLowerCase().replace(/[^a-z0-9]/g, "");
                const optByLabel = AGENT_OPTIONS.find(
                  (o) => normalize(o.label) === normalize(agent.title)
                );
                const opt = optByLabel ?? AGENT_OPTIONS[index];
                if (opt?.id) setAgentId(opt.id);
                console.log("Selected agent:", opt);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveAgentIndex(index);
                  const normalize = (s: string) =>
                    s.toLowerCase().replace(/[^a-z0-9]/g, "");
                  const optByLabel = AGENT_OPTIONS.find(
                    (o) => normalize(o.label) === normalize(agent.title)
                  );
                  const opt = optByLabel ?? AGENT_OPTIONS[index];
                  if (opt?.id) setAgentId(opt.id);
                  console.log("Selected agent:", opt);
                }
              }}
              aria-pressed={isActive}
            >
              {/* Top-left circular icon */}
              <div className="absolute top-4 left-4 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <TopIcon className="w-5 h-5 text-white/90" />
              </div>

              {/* Title bottom-left */}
              <div className="absolute left-5 right-16 bottom-5">
                <h3 className="text-white font-semibold text-xl md:text-2xl leading-tight">
                  {agent.title}
                </h3>
              </div>

              {/* Status dot bottom-right */}
              <div className="absolute right-4 bottom-4 w-7 h-7 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isActive
                      ? "bg-green-500 shadow-[0_0_10px_2px_rgba(34,197,94,0.55)]"
                      : "bg-white/30"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
