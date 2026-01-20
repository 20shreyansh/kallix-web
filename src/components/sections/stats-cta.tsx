"use client";

import { useEffect, useRef, useState } from "react";

export default function StatsCTASection() {
  const stats = [
    { value: "10K+", label: ["Customer Conversations Automated"] },
    { value: "94%", label: ["Human-Level Conversation Accuracy"] },
    {
      value: "60%",
      label: ["Average Reduction in Missed Leads"],
    },
    {
      value: "24/7",
      label: ["Automated Voice Support for Bookings & Inquiries"],
    },
  ];

  return (
    <section id="stats" className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-8xl">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="text-center flex flex-col items-center justify-center">
              <div className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                <CountUp value={s.value} />
              </div>
              <div className="mt-3 leading-snug text-neutral-700 max-w-xs">
                {s.label.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="relative">
            <a
              href="#strategy-form"
              className="inline-flex items-center justify-center rounded-full bg-btn-gradient px-8 py-3 text-white shadow-lg transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-xl"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [{ current, suffix }, setState] = useState<{ current: number; suffix: string }>({ current: 0, suffix: "" });
  const started = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const m = value.match(/^(\d+)(.*)$/);
    const end = m ? parseInt(m[1], 10) : 0;
    const suf = m ? m[2] : value;

    setState({ current: 0, suffix: suf });

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.intersectionRatio >= 0.35 && !started.current) {
          started.current = true;
          const startAt = performance.now();

          const tick = (now: number) => {
            const t = Math.min(1, (now - startAt) / duration);
            // smoother ease-out (quint)
            const eased = 1 - Math.pow(1 - t, 5);
            const cur = Math.round(end * eased);
            setState((s) => ({ ...s, current: cur }));
            if (t < 1) {
              rafId.current = requestAnimationFrame(tick);
            } else {
              rafId.current = null;
            }
          };
          rafId.current = requestAnimationFrame(tick);
        }

        // when sufficiently out of view, reset so it replays next time
        if (entry.intersectionRatio <= 0.05 && started.current) {
          started.current = false;
          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = null;
          setState({ current: 0, suffix: suf });
        }
      },
      { threshold: [0, 0.05, 0.35, 1] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {current}
      <Suffix suffix={suffix} />
    </span>
  );
}

function Suffix({ suffix }: { suffix: string }) {
  if (!suffix) return null;
  const i = suffix.indexOf("+");
  if (i >= 0) {
    return (
      <>
        {suffix.slice(0, i)}
        <span className="text-indigo-500">+</span>
        {suffix.slice(i + 1)}
      </>
    );
  }
  return <>{suffix}</>;
}
