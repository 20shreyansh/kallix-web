"use client";

export default function FlowingVerticalLine() {
  return (
    <svg
      width="20"         // slim width
      height="200vh"     // twice the viewport height
      viewBox="0 0 20 2000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for static faint line */}
        <linearGradient
          id="borderGrad"
          x1="0"
          y1="0"
          x2="0"
          y2="2000"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(133,71,246, 1)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.87)" />
          <stop offset="85%" stopColor="rgba(255,255,255,0.51)" />
          <stop offset="100%" stopColor="rgba(133,71,246,1)" />
        </linearGradient>

        {/* White alpha mask for flowing stroke */}
        <linearGradient
          id="whiteAlpha"
          x1="0"
          y1="0"
          x2="0"
          y2="2000"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <mask id="whiteMask">
          <rect x="0" y="0" width="20" height="2000" fill="url(#whiteAlpha)" />
        </mask>
      </defs>

      {/* Static faint vertical line */}
      <line
        x1="10"
        y1="0"
        x2="10"
        y2="2000"
        stroke="url(#borderGrad)"
        strokeWidth="1.77"
        strokeLinecap="round"
      />

      {/* Animated flowing stroke */}
      <line
        x1="10"
        y1="0"
        x2="10"
        y2="2000"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        mask="url(#whiteMask)"
        pathLength={2000}
        strokeDasharray="240 1760"  // scaled to keep proportion
      >
        <animate
          attributeName="stroke-dashoffset"
          from="2000"
          to="0"
          dur="8s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}
