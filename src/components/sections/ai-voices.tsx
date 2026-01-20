"use client";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import React from "react";

type Voice = {
  key: string;
  language: "Hindi" | "English";
  title: string;
  subtitle: string;
  audio: string; // empty string indicates no available audio
};

// Define which voices have audio assets available in /public/voices
const AVAILABLE_AUDIO = new Set<string>(["Mia"]);

const VOICES: Voice[] = (
  [
    { language: "Hindi" as const, title: "Vikram", subtitle: "Sales Pitch" },
    {
      language: "Hindi" as const,
      title: "Ananya",
      subtitle: "Help Desk Support",
    },
    {
      language: "English" as const,
      title: "James",
      subtitle: "Onboarding Instructions",
    },
    {
      language: "English" as const,
      title: "Isabella",
      subtitle: "Appointment Booking",
    },
    {
      language: "Hindi" as const,
      title: "Rohan",
      subtitle: "Cold Calling Outreach",
    },
    {
      language: "Hindi" as const,
      title: "Priya",
      subtitle: "Technical Support Guide",
    },
    {
      language: "English" as const,
      title: "Mia",
      subtitle: "Promotional Offer Call",
    },
    {
      language: "English" as const,
      title: "Ethan",
      subtitle: "Formal Announcement",
    },
  ] as const
).map(
  (voice): Voice => ({
    ...voice,
    key: voice.title.toLowerCase(),
    audio: AVAILABLE_AUDIO.has(voice.title) ? `/voices/${voice.title}.mp3` : "",
  })
);

export default function AIVoicesSection() {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  return (
    <section id="ai-voices" className="py-16 md:py-20">
      <div className="max-w-full">
        {/* Heading */}
        <div className="flex justify-center mx-4">
          <div className="rounded-full border border-black/10 bg-white px-4 py-1 text-sm font-medium text-black/70">
            AI Voices
          </div>
        </div>
        <h2 className="mt-6 mx-4 text-center text-4xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
          Choose from AI voice call agents that sound
          <br />
          and behave like
          <span className="ml-2 inline-block rounded-2xl bg-purple-100 px-2 py-1">
            real people
          </span>
        </h2>
        <p className="mx-4 sm:mx-auto mt-4 max-w-3xl text-center text-lg text-neutral-600">
          Natural conversations, effective results - powered by our lifelike AI.
        </p>

        {/* Carousel */}
        <div className="group mt-10 overflow-hidden">
          <div className="flex w-max gap-6 animate-marquee-x group-hover:[animation-play-state:paused]">
            {[...VOICES, ...VOICES].map((v, i) => (
              <AudioCard
                key={`${v.key}-${i}`}
                instanceKey={`${v.key}-${i}`}
                voice={v}
                activeKey={activeKey}
                setActiveKey={setActiveKey}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AudioCard({
  voice,
  instanceKey,
  activeKey,
  setActiveKey,
}: {
  voice: Voice;
  instanceKey: string;
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const hasAudio = !!voice.audio;

  const toggle = React.useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!hasAudio) return; // do nothing if audio asset is unavailable
    if (playing) {
      el.pause();
      el.currentTime = 0;
      // Clear src to stop any further network activity
      el.removeAttribute("src");
      el.load();
      setPlaying(false);
      setActiveKey((prev) => (prev === instanceKey ? null : prev));
      return;
    }

    // Assign src lazily to avoid 404s on initial page load
    if (!el.src) {
      el.src = voice.audio;
      el.load();
    }
    el.currentTime = 0;
    setActiveKey(instanceKey);
    const playPromise = el.play();
    if (playPromise) {
      playPromise
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          setPlaying(false);
          setActiveKey((prev) => (prev === instanceKey ? null : prev));
        });
    } else {
      setPlaying(true);
    }
  }, [instanceKey, playing, setActiveKey, voice.audio, hasAudio]);

  React.useEffect(() => {
    if (activeKey === instanceKey) return;
    if (!playing) return;
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    // Clear src when card is deactivated
    el.removeAttribute("src");
    el.load();
    setPlaying(false);
  }, [activeKey, instanceKey, playing]);

  return (
    <div className="relative h-[360px] w-[320px] shrink-0 overflow-hidden rounded-2xl bg-neutral-200 ring-1 ring-black/10">
      <Image
        src={`/voices/${voice.title}.png`}
        alt={`${voice.title} poster`}
        fill
        className="object-cover"
      />
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => {
          setPlaying(false);
          setActiveKey((prev) => (prev === instanceKey ? null : prev));
          // Clear src after playback ends
          const el = audioRef.current;
          if (el) {
            el.removeAttribute("src");
            el.load();
          }
        }}
      />
      {!hasAudio && <></>}
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${voice.title}` : `Play ${voice.title}`}
          disabled={!hasAudio}
          className={`grid size-12 place-items-center rounded-full shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 hover:ring-4 hover:ring-white/30 ${
            hasAudio
              ? "bg-white text-neutral-900"
              : "bg-white/60 text-neutral-500 cursor-not-allowed"
          }`}
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <div>
          <div className="text-xl font-semibold drop-shadow">{voice.title}</div>
          <div className="text-sm text-white/80 drop-shadow">
            {voice.language} • {voice.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}
