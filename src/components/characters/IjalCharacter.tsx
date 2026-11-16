import React from 'react';
import { motion } from 'motion/react';

export type IjalExpression = 'warm' | 'shy' | 'laugh' | 'goofy' | 'adoring';
export type IjalPose =
  | 'stand'
  | 'wave'
  | 'sit'
  | 'popcorn'
  | 'coffee'
  | 'photobooth'
  | 'adjustGlasses'
  | 'walk'
  | 'giveFlowers';

interface IjalCharacterProps {
  expression?: IjalExpression;
  pose?: IjalPose;
  className?: string;
  flipHorizontal?: boolean;
  holdingBouquet?: boolean;
}

/**
 * IJAL — Consistent 2D Hand-Drawn Storybook Character
 * Invariants:
 * - ALWAYS wears his signature dark-ink glasses (#2D2338) with subtle lens highlight.
 * - ALWAYS has neat dark charcoal-black hair (#262030).
 * - ALWAYS wears his casual pastel baby-blue sweater/hoodie (#9ECAE8) & slate trousers (#45506D).
 * - Warm smile, playful & attentive expressions.
 */
export const IjalCharacter: React.FC<IjalCharacterProps> = ({
  expression = 'warm',
  pose = 'stand',
  className = '',
  flipHorizontal = false,
  holdingBouquet = false,
}) => {
  const ink = '#34283D';
  const skin = '#F8DEC9';
  const skinShadow = '#ECC2A6';
  const hair = '#262030';
  const hoodie = '#9BC8E8';
  const hoodieLight = '#BCE0F7';
  const hoodieShade = '#7DAED2';
  const pants = '#45506D';
  const pantsShade = '#353F57';
  const blushColor = '#F29C96';

  const isLaughing = expression === 'laugh';
  const isGoofy = expression === 'goofy';
  const isShy = expression === 'shy' || expression === 'adoring';
  const isWalking = pose === 'walk';

  return (
    <motion.svg
      viewBox="0 0 180 265"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: flipHorizontal ? 'scaleX(-1)' : undefined,
        overflow: 'visible',
      }}
      aria-label="Ijal mengenakan kacamata, rambut hitam rapi, dan hoodie biru muda"
    >
      {/* Soft ground shadow */}
      {pose !== 'sit' && (
        <ellipse
          cx="90"
          cy="252"
          rx="36"
          ry="7"
          fill="#34283D"
          fillOpacity="0.1"
        />
      )}

      {/* Subtle breathing / walking bob */}
      <motion.g
        animate={
          isWalking
            ? { y: [0, -4, 0, -4, 0] }
            : { y: [0, -2, 0] }
        }
        transition={{
          duration: isWalking ? 1.1 : 3.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* === LEGS & SNEAKERS === */}
        <g>
          {/* Left Leg */}
          <motion.g
            animate={isWalking ? { rotate: [-9, 10, -9] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '75px 175px' }}
          >
            <path
              d="M65 170 L86 170 L84 236 L67 236 Z"
              fill={pants}
              stroke={ink}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M68 232 L83 232" stroke={pantsShade} strokeWidth="2" />
            {/* Cream sneaker */}
            <path
              d="M61 241 C61 234, 86 234, 86 243 C86 247, 61 247, 61 241 Z"
              fill="#FFFDF8"
              stroke={ink}
              strokeWidth="2.3"
            />
            <path d="M63 244 L84 244" stroke="#9BC8E8" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>

          {/* Right Leg */}
          <motion.g
            animate={isWalking ? { rotate: [10, -9, 10] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '105px 175px' }}
          >
            <path
              d="M94 170 L115 170 L113 236 L96 236 Z"
              fill={pants}
              stroke={ink}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M94 241 C94 234, 119 234, 119 243 C119 247, 94 247, 94 241 Z"
              fill="#FFFDF8"
              stroke={ink}
              strokeWidth="2.3"
            />
            <path d="M96 244 L117 244" stroke="#9BC8E8" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
        </g>

        {/* === PASTEL BABY-BLUE HOODIE / SWEATER === */}
        <g>
          {/* Hood collar behind neck */}
          <path
            d="M62 112 C68 102, 112 102, 118 112 C114 124, 66 124, 62 112 Z"
            fill={hoodieLight}
            stroke={ink}
            strokeWidth="2.4"
          />
          {/* Hoodie torso */}
          <path
            d="M57 115 C53 134, 54 160, 58 175 L122 175 C126 160, 127 134, 123 115 C112 108, 68 108, 57 115 Z"
            fill={hoodie}
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Hoodie pocket */}
          <path
            d="M71 151 L109 151 L113 171 L67 171 Z"
            fill={hoodieLight}
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Cream hoodie drawstrings */}
          <path d="M83 117 L83 136" stroke="#FFF9F0" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M97 117 L97 134" stroke="#FFF9F0" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="83" cy="137" r="2" fill="#FFF9F0" stroke={ink} strokeWidth="1.2" />
          <circle cx="97" cy="135" r="2" fill="#FFF9F0" stroke={ink} strokeWidth="1.2" />
          {/* Soft sweater hem */}
          <path d="M59 171 L121 171" stroke={hoodieShade} strokeWidth="2.5" />
        </g>

        {/* === LEFT ARM (Viewer's left — waves, adjusts glasses, or holds flowers) === */}
        {pose === 'wave' ? (
          <motion.g
            animate={{ rotate: [-12, 14, -12] }}
            transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '57px 120px' }}
          >
            <path
              d="M57 120 C42 110, 34 94, 39 78"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M57 120 C42 110, 34 94, 39 78"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <circle cx="40" cy="75" r="6.2" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        ) : pose === 'giveFlowers' || holdingBouquet ? (
          <g>
            <path
              d="M57 121 C44 134, 48 148, 63 149"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M57 121 C44 134, 48 148, 63 149"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <circle cx="65" cy="149" r="6" fill={skin} stroke={ink} strokeWidth="2.2" />
            {/* Small pastel bouquet held out */}
            <g transform="translate(32, 114) rotate(16)">
              <path
                d="M10 26 L26 26 L20 50 L14 50 Z"
                fill="#F7E3C6"
                stroke={ink}
                strokeWidth="2.1"
                strokeLinejoin="round"
              />
              <path d="M12 34 L24 34" stroke="#E88CA5" strokeWidth="3" strokeLinecap="round" />
              <circle cx="10" cy="18" r="7" fill="#FADADD" stroke={ink} strokeWidth="2" />
              <circle cx="24" cy="18" r="7" fill="#BEE3F8" stroke={ink} strokeWidth="2" />
              <circle cx="17" cy="11" r="7.5" fill="#F9B8C9" stroke={ink} strokeWidth="2" />
              <circle cx="17" cy="11" r="2.3" fill="#FFE082" />
            </g>
          </g>
        ) : (
          <motion.g
            animate={isWalking ? { rotate: [10, -10, 10] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '57px 120px' }}
          >
            <path
              d="M57 121 C47 134, 47 152, 53 161"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M57 121 C47 134, 47 152, 53 161"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <circle cx="54" cy="162" r="5.8" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        )}

        {/* === RIGHT ARM (Viewer's right — adjusts glasses, photobooth goofy pose, coffee) === */}
        {pose === 'adjustGlasses' ? (
          <motion.g
            animate={{ y: [0, -2.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M123 120 C138 112, 138 88, 122 72"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M123 120 C138 112, 138 88, 122 72"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            {/* Hand gently touching side of his glasses */}
            <circle cx="120" cy="70" r="6" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        ) : pose === 'photobooth' ? (
          <g>
            <path
              d="M123 120 C138 112, 142 94, 135 80"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M123 120 C138 112, 142 94, 135 80"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <circle cx="134" cy="77" r="6" fill={skin} stroke={ink} strokeWidth="2.2" />
            <path d="M132 71 L129 63 M136 71 L139 63" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ) : pose === 'coffee' ? (
          <g>
            <path
              d="M123 121 C132 134, 128 146, 118 148"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M123 121 C132 134, 128 146, 118 148"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <rect x="112" y="138" width="16" height="17" rx="4" fill="#E8F4FD" stroke={ink} strokeWidth="2.1" />
            <circle cx="116" cy="148" r="5" fill={skin} stroke={ink} strokeWidth="2" />
          </g>
        ) : (
          <motion.g
            animate={isWalking ? { rotate: [-10, 10, -10] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '123px 120px' }}
          >
            <path
              d="M123 121 C133 134, 133 152, 127 161"
              stroke={ink}
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M123 121 C133 134, 133 152, 127 161"
              stroke={hoodie}
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <circle cx="126" cy="162" r="5.8" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        )}

        {/* === HEAD, NEAT BLACK HAIR & SIGNATURE GLASSES === */}
        <g>
          {/* Ears */}
          <circle cx="57" cy="73" r="6.5" fill={skin} stroke={ink} strokeWidth="2.2" />
          <circle cx="123" cy="73" r="6.5" fill={skin} stroke={ink} strokeWidth="2.2" />

          {/* Neck */}
          <rect
            x="81"
            y="96"
            width="18"
            height="16"
            rx="6"
            fill={skin}
            stroke={ink}
            strokeWidth="2.2"
          />

          {/* Face Oval */}
          <path
            d="M59 71 C59 46, 72 37, 90 37 C108 37, 121 46, 121 71 C121 91, 107 104, 90 104 C73 104, 59 91, 59 71 Z"
            fill={skin}
            stroke={ink}
            strokeWidth="2.4"
          />

          {/* Subtle chin shadow */}
          <path
            d="M78 99 Q90 103 102 99"
            stroke={skinShadow}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Neat Black Hair (ALWAYS consistent) */}
          <path
            d="M55 68 C53 42, 69 24, 90 24 C112 24, 127 42, 125 68 C122 57, 116 49, 108 46 C100 54, 88 55, 78 49 C70 55, 62 59, 55 68 Z"
            fill={hair}
            stroke={ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Neat side hair sweep */}
          <path
            d="M74 34 C86 30, 102 32, 110 38"
            stroke="#463D54"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* === FACIAL EXPRESSIONS === */}
          {/* Eyebrows */}
          {isGoofy ? (
            <>
              <path d="M68 57 Q75 53 81 57" stroke={ink} strokeWidth="2" strokeLinecap="round" />
              <path d="M99 59 Q105 56 112 58" stroke={ink} strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M68 58 Q75 55 82 58" stroke={ink} strokeWidth="2" strokeLinecap="round" />
              <path d="M98 58 Q105 55 112 58" stroke={ink} strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Eyes behind glasses */}
          {isLaughing ? (
            <>
              <path d="M70 71 Q76 65 81 71" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
              <path d="M99 71 Q105 65 110 71" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
            </>
          ) : isGoofy ? (
            <>
              <path d="M70 71 Q76 66 81 71" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="105" cy="70" rx="4" ry="4.6" fill={ink} />
              <circle cx="103.5" cy="68.5" r="1.5" fill="#FFFFFF" />
            </>
          ) : (
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{
                duration: 4.6,
                times: [0, 0.91, 0.94, 0.97, 1],
                repeat: Infinity,
              }}
              style={{ transformOrigin: '90px 70px' }}
            >
              <ellipse cx="75" cy="70" rx="4" ry="4.6" fill={ink} />
              <circle cx="73.5" cy="68.5" r="1.5" fill="#FFFFFF" />
              <ellipse cx="105" cy="70" rx="4" ry="4.6" fill={ink} />
              <circle cx="103.5" cy="68.5" r="1.5" fill="#FFFFFF" />
            </motion.g>
          )}

          {/* === SIGNATURE GLASSES (ALWAYS PRESENT) === */}
          <g>
            {/* Left lens frame */}
            <rect
              x="63"
              y="62"
              width="23"
              height="16"
              rx="6"
              fill="#FFFFFF"
              fillOpacity="0.24"
              stroke={ink}
              strokeWidth="2.5"
            />
            {/* Right lens frame */}
            <rect
              x="94"
              y="62"
              width="23"
              height="16"
              rx="6"
              fill="#FFFFFF"
              fillOpacity="0.24"
              stroke={ink}
              strokeWidth="2.5"
            />
            {/* Bridge & temples */}
            <path d="M86 69 Q90 67 94 69" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M59 69 L63 69 M117 69 L121 69" stroke={ink} strokeWidth="2.3" strokeLinecap="round" />
            {/* Subtle lens shimmer */}
            <path d="M67 66 L71 74" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
            <path d="M98 66 L102 74" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* Soft warm blush */}
          <ellipse
            cx="68"
            cy="82"
            rx="5.5"
            ry="3"
            fill={blushColor}
            opacity={isShy ? 0.65 : 0.35}
          />
          <ellipse
            cx="112"
            cy="82"
            rx="5.5"
            ry="3"
            fill={blushColor}
            opacity={isShy ? 0.65 : 0.35}
          />

          {/* Nose */}
          <path d="M89.5 76 Q91 78.5 89 80" stroke="#D29A7E" strokeWidth="1.7" strokeLinecap="round" />

          {/* Mouth */}
          {isLaughing ? (
            <path
              d="M81 86 Q90 96 99 86 Z"
              fill="#E57388"
              stroke={ink}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          ) : isGoofy ? (
            <g>
              <path
                d="M82 86 Q90 94 98 86"
                stroke={ink}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path d="M91 90 C91 95, 96 95, 96 89 Z" fill="#F27D93" stroke={ink} strokeWidth="1.5" />
            </g>
          ) : (
            <path
              d="M82 86 Q90 93 98 86"
              stroke={ink}
              strokeWidth="2.3"
              strokeLinecap="round"
            />
          )}
        </g>
      </motion.g>
    </motion.svg>
  );
};
