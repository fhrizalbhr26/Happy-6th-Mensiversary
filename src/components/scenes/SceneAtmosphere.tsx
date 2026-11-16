import React from 'react';
import { motion } from 'motion/react';

export const PastelClouds: React.FC<{ opacity?: number }> = ({ opacity = 0.88 }) => (
  <svg
    viewBox="0 0 1280 720"
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
    style={{ opacity }}
  >
    <g className="animate-drift-cloud">
      {/* Left soft cloud */}
      <path
        d="M90 155 C90 128, 122 115, 146 125 C160 100, 206 100, 222 126 C248 122, 274 140, 270 164 C270 176, 90 176, 90 155 Z"
        fill="#FFFFFF"
        fillOpacity="0.86"
      />
      {/* Right upper cloud */}
      <path
        d="M930 128 C930 102, 962 90, 988 102 C1004 78, 1052 78, 1068 105 C1095 100, 1122 118, 1118 142 C1118 153, 930 153, 930 128 Z"
        fill="#FFFFFF"
        fillOpacity="0.82"
      />
      {/* Mid distant cloud */}
      <path
        d="M520 96 C520 79, 544 71, 562 79 C576 62, 608 64, 619 82 C638 80, 656 93, 652 108 C652 116, 520 116, 520 96 Z"
        fill="#FFFFFF"
        fillOpacity="0.7"
      />
    </g>
  </svg>
);

const STAR_COORDS = [
  { x: 110, y: 74, s: 12, d: 0 },
  { x: 265, y: 58, s: 9, d: 0.6 },
  { x: 420, y: 95, s: 11, d: 1.1 },
  { x: 640, y: 48, s: 14, d: 0.3 },
  { x: 830, y: 82, s: 10, d: 1.5 },
  { x: 1010, y: 56, s: 13, d: 0.9 },
  { x: 1165, y: 92, s: 11, d: 1.8 },
  { x: 175, y: 220, s: 8, d: 1.2 },
  { x: 1100, y: 215, s: 9, d: 0.4 },
];

export const TwinklingStars: React.FC<{ color?: string }> = ({ color = '#FFF5B8' }) => (
  <svg
    viewBox="0 0 1280 720"
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="xMidYMid slice"
  >
    {STAR_COORDS.map((star, idx) => (
      <g
        key={idx}
        transform={`translate(${star.x}, ${star.y})`}
        className="animate-twinkle"
        style={{ animationDelay: `${star.d}s` }}
      >
        <path
          d={`M0 ${-star.s} Q0 0 ${star.s} 0 Q0 0 0 ${star.s} Q0 0 ${-star.s} 0 Q0 0 0 ${-star.s} Z`}
          fill={color}
          stroke="#F4C95D"
          strokeWidth="1"
        />
      </g>
    ))}
  </svg>
);

export const FloatingHeartsField: React.FC<{
  count?: number;
  color?: string;
}> = ({ count = 8, color = '#F28AA3' }) => {
  const positions = [12, 24, 38, 49, 58, 70, 81, 90];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {positions.slice(0, count).map((leftPct, i) => (
        <motion.div
          key={i}
          className="absolute bottom-8"
          style={{ left: `${leftPct}%` }}
          initial={{ y: 20, opacity: 0, scale: 0.6 }}
          animate={{
            y: [-10, -180 - (i % 3) * 45],
            x: [0, i % 2 === 0 ? 14 : -14, 0],
            opacity: [0, 0.85, 0],
            scale: [0.6, 1.05, 0.8],
          }}
          transition={{
            duration: 4.2 + (i % 3) * 0.9,
            delay: i * 0.45,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg width="20" height="18" viewBox="0 0 24 22" fill="none">
            <path
              d="M12 20.5C12 20.5 2 14.2 2 7.5C2 4.2 4.6 1.8 7.6 1.8C9.6 1.8 11.2 2.9 12 4.4C12.8 2.9 14.4 1.8 16.4 1.8C19.4 1.8 22 4.2 22 7.5C22 14.2 12 20.5 12 20.5Z"
              fill={i % 2 === 0 ? color : '#A8D8EA'}
              stroke="#34283D"
              strokeWidth="1.4"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export const FallingPetalsAndConfetti: React.FC<{ active?: boolean }> = ({
  active = true,
}) => {
  if (!active) return null;
  const items = Array.from({ length: 18 }, (_, i) => ({
    left: `${4 + (i * 5.4) % 92}%`,
    delay: (i * 0.38) % 4,
    duration: 4.8 + (i % 4) * 0.9,
    type: i % 3, // 0 petal, 1 star, 2 confetti ribbon
    color: ['#F6A5B8', '#A8D8EA', '#D8C7F6', '#FFE099'][i % 4],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="absolute -top-6"
          style={{
            left: item.left,
            animation: `petalFall ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {item.type === 0 ? (
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1C13 4 16 9 9 16C2 9 5 4 9 1Z"
                fill={item.color}
                stroke="#34283D"
                strokeWidth="1.1"
              />
            </svg>
          ) : item.type === 1 ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L9.8 5.8L15 6.4L11 9.8L12.2 15L8 12.2L3.8 15L5 9.8L1 6.4L6.2 5.8L8 1Z"
                fill={item.color}
                stroke="#34283D"
                strokeWidth="1"
              />
            </svg>
          ) : (
            <div
              className="w-2.5 h-4 rounded-sm border border-[#34283D]/50"
              style={{ backgroundColor: item.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
