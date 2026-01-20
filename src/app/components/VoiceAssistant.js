"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, MessageCircle, Bot, User, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { downloadTranscript } from "@/utils/transcript"

export default function VoiceAssistant() {
  // Removed unused state variables that were causing linting warnings
  // const [conversation, setConversation] = useState(null) - not used
  // const [messages, setMessages] = useState([]) - not used
  // const [isSpeaking, setIsSpeaking] = useState(false) - not used
  const [isActive, setIsActive] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("disconnected")
  const [agentId, setAgentId] = useState(process.env.NEXT_INDIAN_PUBLIC_AGENT_ID) // Default to Indian agent
  const scrollAreaRef = useRef(null)

  // Agent options from .env
  const agentOptions = [
    {
      id: process.env.NEXT_INDIAN_PUBLIC_AGENT_ID,
      label: "Indian Real Estate Agent",
    },
    {
      id: process.env.NEXT_INTERNATIONAL_PUBLIC_AGENT_ID,
      label: "International Real Estate Agent",
    },
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, []) // Empty dependency array since we're not using messages state anymore

  const startConversation = async () => {
    try {
      setConnectionStatus("connecting")
      // Use agentId in your conversation/session logic
      // Example: pass agentId to your backend or API call
      // await Conversation.startSession({ agentId, apiKey: process.env.NEXT_PUBLIC_XI_API_KEY })
      setIsActive(true)
      setConnectionStatus("connected")
    } catch (error) {
      console.error("Failed to start conversation:", error)
      setConnectionStatus("disconnected")
    }
  }

  const endConversation = async () => {
    setIsActive(false)
    setConnectionStatus("disconnected")
    // if (conversation) {
    //   // await conversation.endSession() //Commented out to avoid confusion with the other Conversation component
    //   setConversation(null)
    //   setIsSpeaking(false)
    //   setIsActive(false)
    //   setConnectionStatus('disconnected')
    // }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#252422] p-4">
      <div className="w-full max-w-xs">
        {/* Agent Selection Dropdown */}
        <div className="mb-4">
          <label htmlFor="agent-select" className="block text-sm font-medium text-white mb-1">
            Select Agent
          </label>
          <select
            id="agent-select"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#403d39] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isActive}
          >
            {agentOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Assistant Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 mx-auto mb-8 pt-2"
        >
          {/* Status Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
            <Badge
              variant="outline"
              className={`
                ${
                  connectionStatus === "connected"
                    ? "bg-green-500/20 text-green-500 border-green-500/50"
                    : connectionStatus === "connecting"
                      ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
                      : "bg-red-500/20 text-red-500 border-red-500/50"
                }
                font-medium capitalize
              `}
            >
              {connectionStatus}
            </Badge>
          </div>

          {/* Base Circle */}
          <div className="relative w-full h-full">
            <div
              className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                isActive ? "bg-[#eb5e28]" : "bg-[#403d39]"
              }`}
            />
            <div className="absolute inset-[10%] rounded-full bg-[#252422]" />
            {/* Pulse Effects */}
            {isSpeaking && (
              <div className="absolute inset-[15%]">
                <div className="absolute inset-0 rounded-full bg-[#eb5e28] opacity-20 animate-pulse-fast" />
                <div className="absolute inset-0 rounded-full bg-[#eb5e28] opacity-15 animate-pulse-medium" />
                <div className="absolute inset-0 rounded-full bg-[#eb5e28] opacity-10 animate-pulse-slow" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Control Buttons */}
        <div className="space-y-4">
          {/* Microphone button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isActive ? endConversation : startConversation}
            className={`voice-gradient-btn h-12 px-6 rounded-full flex items-center justify-center mx-auto font-bold shadow-glow transition-all duration-200 ${
              isActive ? "opacity-100" : "opacity-90"
            }`}
          >
            {isActive ? (
              <>
                <span className="mr-2">End</span>
                <MicOff className="w-6 h-6" />
              </>
            ) : (
              <>
                <Mic className="w-6 h-6" />
                <span className="ml-2">Start</span>
              </>
            )}
          </motion.button>

          {/* Show/Hide chat button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChat(!showChat)}
            className="voice-gradient-btn px-4 py-2 rounded-full text-sm font-bold flex items-center justify-center space-x-2 mx-auto shadow-glow transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{showChat ? "Hide Chat" : "Show Chat"}</span>
          </motion.button>
        </div>

        {/* Chat area */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-[#403d39] rounded-xl overflow-hidden"
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => downloadTranscript(messages)}
                  className="text-[#ccc5b9] hover:text-[#eb5e28] transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
              <div
                ref={scrollAreaRef}
                className="h-64 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#ccc5b9] scrollbar-track-[#252422]"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-2 ${
                      message.source === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.source === "user" ? (
                        <User className="w-6 h-6 text-[#eb5e28]" />
                      ) : (
                        <Bot className="w-6 h-6 text-[#ccc5b9]" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        message.source === "user" ? "bg-[#eb5e28] text-[#fffcf2]" : "bg-[#ccc5b9] text-[#252422]"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
