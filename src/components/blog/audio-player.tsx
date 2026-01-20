"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface AudioPlayerProps {
  title: string;
  authorName: string;
  blogContent: string; // Plain text content of the blog
}

export function AudioPlayer({
  title,
  authorName,
  blogContent,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Estimate duration based on average speaking rate (150 words per minute)
  useEffect(() => {
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }
    const wordCount = blogContent.split(/\s+/).length;
    const estimatedMinutes = wordCount / 150;
    setDuration(estimatedMinutes * 60);
  }, [blogContent]);

  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startSpeech = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(blogContent);
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : 1;
    utterance.lang = "en-US";

    // Try to get a natural-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes("Google") ||
        v.name.includes("Natural") ||
        v.name.includes("Samantha")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      stopSpeech();
      setCurrentTime(duration);
    };

    utterance.onerror = () => {
      stopSpeech();
    };

    utteranceRef.current = utterance;
    startTimeRef.current = Date.now();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);

    // Update current time
    intervalRef.current = setInterval(() => {
      const elapsed =
        elapsedTimeRef.current + (Date.now() - startTimeRef.current) / 1000;
      setCurrentTime(Math.min(elapsed * playbackRate, duration));
    }, 100);
  }, [blogContent, playbackRate, duration, stopSpeech, isMuted]);

  const togglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      // Pause
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.pause();
        elapsedTimeRef.current = currentTime / playbackRate;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      setIsPlaying(false);
    } else {
      // Resume or start
      if (typeof window !== "undefined" && window.speechSynthesis) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          startTimeRef.current = Date.now();
          intervalRef.current = setInterval(() => {
            const elapsed =
              elapsedTimeRef.current +
              (Date.now() - startTimeRef.current) / 1000;
            setCurrentTime(Math.min(elapsed * playbackRate, duration));
          }, 100);
          setIsPlaying(true);
        } else {
          startSpeech();
        }
      }
    }
  };

  const skipBackward = () => {
    // Restart from beginning
    stopSpeech();
    setCurrentTime(0);
    elapsedTimeRef.current = 0;
    setTimeout(() => startSpeech(), 100);
  };

  const skipForward = () => {
    // Skip to end
    stopSpeech();
    setCurrentTime(duration);
  };

  const cyclePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);

    // Update rate if currently playing
    if (utteranceRef.current && isPlaying) {
      stopSpeech();
      elapsedTimeRef.current = currentTime / playbackRate;
      setTimeout(() => startSpeech(), 100);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  // Load voices
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!isSupported) {
    return (
      <div className="bg-white py-4">
        <div className="text-center text-sm text-black/40">
          Audio playback not supported in this browser
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-4">
      <div className="flex items-center gap-6">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-14 h-14 rounded-full bg-black hover:bg-black/90 transition-colors flex items-center justify-center"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Author Row */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="font-medium text-black truncate">{title}</span>
            <span className="text-black/40">—</span>
            <span className="text-black/60">{authorName}</span>
          </div>

          {/* Progress Bar Row */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs text-black/50 w-10">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative h-0.5 bg-black/10 rounded-full">
              <div
                className="absolute left-0 top-0 h-full bg-black/40 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-black/50 w-10 text-right">
              {formatTime(duration)}
            </span>

            {/* Volume/Mute Button */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (utteranceRef.current) {
                  utteranceRef.current.volume = isMuted ? 1 : 0;
                }
              }}
              className="ml-2 text-black/40 hover:text-black transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-center gap-6">
            {/* Skip Backward */}
            <button
              onClick={skipBackward}
              className="text-black/40 hover:text-black transition-colors"
              aria-label="Restart"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>

            {/* Playback Speed */}
            <button
              onClick={cyclePlaybackRate}
              className="text-sm text-black/50 hover:text-black transition-colors min-w-[40px]"
              aria-label="Change playback speed"
            >
              {playbackRate}x
            </button>

            {/* Skip Forward */}
            <button
              onClick={skipForward}
              className="text-black/40 hover:text-black transition-colors"
              aria-label="Skip to end"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>

            {/* Kallix Branding */}
            <span className="text-sm text-violet-600 font-medium ml-4">
              Kallix
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
