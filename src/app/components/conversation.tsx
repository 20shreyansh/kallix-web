"use client"

import { useConversation } from "@elevenlabs/react"
import { useCallback, useState, useEffect } from "react"
// Removed unused icon imports as the control panel is commented out
// import { Volume2, VolumeX, PhoneOff, Zap } from "lucide-react"
import Orb from "./Orb"

// Get agent IDs from env
export const AGENT_OPTIONS = [
  {
    id: process.env.NEXT_PUBLIC_INDIAN_AGENT_ID?.trim(),
    label: "Real Estate Agent",
  },
  {
    id: process.env.NEXT_PUBLIC_INSURANCE_AGENT_ID?.trim(),
    label: "Insurance Agent",
  },
  {
    id: process.env.NEXT_PUBLIC_ECOMMERCE_AGENT_ID?.trim(),
    label: "E-Commerce Agent",
  },
  {
    id: process.env.NEXT_PUBLIC_CONSULTANT_AGENT_ID?.trim(),
    label: "Hotel Booking Agent",
  },
  
].filter((opt) => !!opt.id)

// Type definitions for conversation messages
type Message = {
  id?: string
  text?: string
  source?: 'user' | 'ai'
}

type ConversationMessage = {
  id?: string
  text?: string
  source?: 'user' | 'ai'
}

export function Conversation({ onMessage, agentId: externalAgentId }: { onMessage?: (msg: Message) => void; agentId?: string }) {
  // Removed unused states related to mute/silent controls
  // const [isMuted, setIsMuted] = useState(false)
  // const [isSilent, setIsSilent] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [agentId, setAgentId] = useState("")
  const [mounted, setMounted] = useState(false)

  // Set agentId on client after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    if (externalAgentId) {
      setAgentId(externalAgentId)
    } else if (AGENT_OPTIONS.length > 0) {
      setAgentId(AGENT_OPTIONS[0].id ?? "")
    }
  }, [externalAgentId])

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onMessage: (m: ConversationMessage) => {
      setMessages((prev) => [...prev, m])
      onMessage?.(m)
    },
    onDisconnect: () => console.log("Disconnected"),
    onError: (message: string) => console.error("Error:", message),
  })

  const startConversation = useCallback(async () => {
    if (!agentId) return
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      console.error("Microphone access denied:", err)
      return
    }
    try {
      setMessages([])
      await conversation.startSession({ agentId, connectionType: 'websocket' })
    } catch (err) {
      console.error("Failed to start session:", err)
    }
  }, [conversation, agentId])

  const stopConversation = useCallback(() => {
    conversation.endSession()
  }, [conversation])

  const isConnected = conversation.status === "connected"
  const isSpeaking = messages.length > 0 && messages[messages.length - 1]?.source === "ai"

  // Only check agent options on client to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-pulse text-gray-400">Initializing...</div>
      </div>
    )
  }

  if (AGENT_OPTIONS.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-red-400/80 text-center">No agents available</div>
        <div className="text-gray-500 text-sm mt-2">Check environment variables</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full shadow-md opacity-100 space-y-7 mx-0 w-full rounded-md">
      {/* Status Indicator - Dark Theme */}
      <div className="flex items-center space-x-4">
        <div
          className={`w-4 h-4 rounded-full transition-all duration-300 ${
            isConnected ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-600"
          }`}
        />
        <span
          className={`text-lg font-medium transition-colors duration-300 ${
            isConnected ? "text-green-400" : "text-gray-400"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Main Orb */}
      <div className="relative flex items-center justify-center w-80 h-80">
        <div onClick={isConnected ? stopConversation : startConversation} className="w-full h-full">
          <Orb
            hue={isConnected ? 270 : 220} // Purple when connected, blue when disconnected (dark theme)
            hoverIntensity={0.6}
            rotateOnHover={true}
            forceHoverState={isSpeaking}
          />
        </div>

        {/* Pulse rings when active */}
        {isConnected && (
          <>
            <div
              className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping pointer-events-none"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute inset-6 rounded-full border-2 border-purple-400/20 animate-ping pointer-events-none"
              style={{ animationDuration: "3s", animationDelay: "0.5s" }}
            />
          </>
        )}
      </div>

      {/* Action Text - Dark Theme */}
      <div className="text-center">
        <p className="text-gray-300 font-medium text-2xl">
          {isConnected ? "Tap to disconnect" : "Tap to start conversation"}
        </p>
        <p className="text-gray-500 mt-2 text-lg">{isConnected ? "AI is listening..." : "Ready to connect"}</p>
      </div>

      {/* Hidden messages for transcription */}
      <div className="hidden">
        {messages.map((m, i) => (
          <span key={m.id || m.text || i}>{m.text}</span>
        ))}
      </div>
    </div>
  )
}
