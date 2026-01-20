"use client";

export default function FlowingBorder() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1850 960"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Exact border gradient */}
        <linearGradient
          id="borderGrad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1850"
          y2="0"
          gradientTransform="rotate(89.91)"
        >
          <stop offset="0.06%" stopColor="rgba(133,71,246,0.2)" />
          <stop offset="24.52%" stopColor="rgba(255,255,255,0.866667)" />
          <stop offset="85.95%" stopColor="rgba(255,255,255,0.51)" />
          <stop offset="99.92%" stopColor="rgba(133,71,246,0.2)" />
        </linearGradient>

        {/* Stronger white mask */}
        <linearGradient
          id="whiteAlpha"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1850"
          y2="0"
          gradientTransform="rotate(89.91)"
        >
          <stop offset="0.06%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="24.52%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="85.95%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="99.92%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <mask id="whiteMask">
          <rect x="0" y="0" width="1850" height="960" fill="url(#whiteAlpha)" />
        </mask>
      </defs>

      {/* Static frame */}
      <path
        d="M 6,960 V 200 A 194 194 0 0 1 200 6 H 1014 A 194 194 0 0 1 1208 200 V 960"
        fill="none"
        stroke="url(#borderGrad)"
        strokeWidth="1.77"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* LEFT half */}
      <path
        d="M 607 6 H 200 A 194 194 0 0 0 6 200 V 960"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        mask="url(#whiteMask)"
        pathLength={1000}
        strokeDasharray="120 880"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1000"
          to="0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* RIGHT half */}
      <path
        d="M 607 6 H 1014 A 194 194 0 0 1 1208 200 V 960"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        mask="url(#whiteMask)"
        pathLength={1000}
        strokeDasharray="120 880"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1000"
          to="0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
