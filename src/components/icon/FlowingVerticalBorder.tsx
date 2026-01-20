"use client";

export default function FlowingVerticalBorder() {
  return (
    <svg
      width="20"         // just enough width for the line
      height="80vh"      // covers 80% of viewport height
      viewBox="0 0 20 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for the faint static line */}
        <linearGradient
          id="borderGrad"
          x1="0"
          y1="0"
          x2="0"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(133,71,246,0.2)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.87)" />
          <stop offset="85%" stopColor="rgba(255,255,255,0.51)" />
          <stop offset="100%" stopColor="rgba(133,71,246,0.2)" />
        </linearGradient>

        {/* White alpha mask for moving line */}
        <linearGradient
          id="whiteAlpha"
          x1="0"
          y1="0"
          x2="0"
          y2="800"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <mask id="whiteMask">
          <rect x="0" y="0" width="20" height="800" fill="url(#whiteAlpha)" />
        </mask>
      </defs>

      {/* Static faint vertical line */}
      <line
        x1="10"
        y1="0"
        x2="10"
        y2="800"
        stroke="url(#borderGrad)"
        strokeWidth="1.77"
        strokeLinecap="round"
      />

      {/* Animated flowing stroke */}
      <line
        x1="10"
        y1="0"
        x2="10"
        y2="800"
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
      </line>
    </svg>
  );
}
