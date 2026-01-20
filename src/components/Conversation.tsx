"use client"

import { useConversation } from "@elevenlabs/react"
import { useCallback, useState, useEffect } from "react"
import { Volume2, VolumeX, PhoneOff, Zap } from "lucide-react"
import Orb from "./Orb"

// Get agent IDs from env
const AGENT_OPTIONS = [
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

export function Conversation({ onMessage }: { onMessage?: (msg: Message) => void }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isSilent, setIsSilent] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [agentId, setAgentId] = useState("")
  const [mounted, setMounted] = useState(false)

  // Set agentId on client after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    if (AGENT_OPTIONS.length > 0) {
      setAgentId(AGENT_OPTIONS[0].id ?? "")
    }
  }, [])

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
    <div className="flex flex-col items-center justify-center h-full shadow-md opacity-100 space-y-8 mx-0 w-full rounded-md">
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

      {/* Agent Selection - Dark Theme Dropdown */}
      <div className="w-full max-w-lg">
        <label className="block text-lg font-medium text-gray-300 mb-3">Select Agent Type:</label>
        <div className="relative">
          <select
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full px-6 py-4 text-lg rounded-2xl bg-gray-800 backdrop-blur-sm border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 appearance-none cursor-pointer"
            disabled={isConnected}
          >
            {AGENT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-gray-800 text-gray-200 hover:bg-gray-700">
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
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

      {/* Control Panel - Dark Theme */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => setIsMuted((v) => !v)}
          className={`p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            isMuted
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25"
              : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 shadow-md"
          }`}
          title="Toggle Mute"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>

        <button
          onClick={() => setIsSilent((v) => !v)}
          className={`p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            isSilent
              ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/25"
              : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 shadow-md"
          }`}
          title="Toggle Silent Mode"
        >
          <Zap className="w-6 h-6" />
        </button>

        {isConnected && (
          <button
            onClick={stopConversation}
            className="p-4 rounded-full bg-red-600 border border-red-600 text-white hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/25"
            title="Disconnect"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        )}
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