import React from 'react';
import { motion } from 'motion/react';

export type CoraExpression = 'shy' | 'happy' | 'laugh' | 'sulky' | 'blush';
export type CoraPose =
  | 'stand'
  | 'wave'
  | 'sit'
  | 'popcorn'
  | 'coffee'
  | 'photobooth'
  | 'videocall'
  | 'walk'
  | 'receiveFlowers';

interface CoraCharacterProps {
  expression?: CoraExpression;
  pose?: CoraPose;
  className?: string;
  flipHorizontal?: boolean;
  holdingBouquet?: boolean;
}

/**
 * CORA — Consistent 2D Hand-Drawn Storybook Character
 * Invariants:
 * - ALWAYS wears her simple, elegant soft dusty-rose hijab (#EFA5B8 / #F9D5DF) with tiny cream flower pin.
 * - ALWAYS wears her modest pastel outfit: cream blouse, pastel rose-pink cardigan, soft lavender-cream skirt.
 * - Warm ink outlines (#34283D), sweet expressive eyes, rosy cheeks.
 */
export const CoraCharacter: React.FC<CoraCharacterProps> = ({
  expression = 'happy',
  pose = 'stand',
  className = '',
  flipHorizontal = false,
  holdingBouquet = false,
}) => {
  const ink = '#34283D';
  const skin = '#FDE5D6';
  const skinShadow = '#F5CCB6';
  const hijabMain = '#EE9FB3';
  const hijabLight = '#FADAE3';
  const hijabFold = '#D98098';
  const cardigan = '#F6B8C8';
  const cardiganDark = '#E298AC';
  const blouse = '#FFF9F0';
  const skirt = '#E7DDF5';
  const skirtShade = '#D3C5E8';
  const blushColor = '#F48CA4';

  const isLaughing = expression === 'laugh';
  const isSulky = expression === 'sulky';
  const isShy = expression === 'shy' || expression === 'blush';
  const isWalking = pose === 'walk';

  return (
    <motion.svg
      viewBox="0 0 180 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: flipHorizontal ? 'scaleX(-1)' : undefined,
        overflow: 'visible',
      }}
      aria-label="Cora mengenakan hijab dan kardigan pastel"
    >
      {/* Soft ground shadow */}
      {pose !== 'videocall' && pose !== 'sit' && (
        <ellipse
          cx="90"
          cy="248"
          rx="34"
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
          duration: isWalking ? 1.1 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* === LEGS & SHOES === */}
        {pose !== 'videocall' && (
          <g>
            {/* Left Leg */}
            <motion.g
              animate={isWalking ? { rotate: [-8, 10, -8] } : {}}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '76px 210px' }}
            >
              <rect
                x="69"
                y="212"
                width="12"
                height="26"
                rx="6"
                fill="#FFF4EA"
                stroke={ink}
                strokeWidth="2.3"
              />
              {/* Pastel pink flat shoe */}
              <path
                d="M64 238 C64 233, 83 233, 84 240 C84 244, 64 245, 64 238 Z"
                fill="#E891A8"
                stroke={ink}
                strokeWidth="2.3"
              />
            </motion.g>

            {/* Right Leg */}
            <motion.g
              animate={isWalking ? { rotate: [10, -8, 10] } : {}}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '104px 210px' }}
            >
              <rect
                x="99"
                y="212"
                width="12"
                height="26"
                rx="6"
                fill="#FFF4EA"
                stroke={ink}
                strokeWidth="2.3"
              />
              <path
                d="M96 238 C96 233, 115 233, 116 240 C116 244, 96 245, 96 238 Z"
                fill="#E891A8"
                stroke={ink}
                strokeWidth="2.3"
              />
            </motion.g>
          </g>
        )}

        {/* === FLOWING PASTEL LAVENDER SKIRT === */}
        {pose !== 'videocall' && (
          <g>
            <path
              d="M65 162 L115 162 L128 220 C110 226, 70 226, 52 220 Z"
              fill={skirt}
              stroke={ink}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Gentle skirt pleat lines */}
            <path
              d="M78 172 L73 218 M92 174 L92 220 M105 172 L110 218"
              stroke={skirtShade}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* === TORSO: CREAM BLOUSE + PASTEL PINK CARDIGAN === */}
        <g>
          {/* Cardigan base */}
          <path
            d="M62 118 C58 134, 59 156, 62 167 L118 167 C121 156, 122 134, 118 118 C110 112, 70 112, 62 118 Z"
            fill={cardigan}
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Cream blouse center panel */}
          <path
            d="M81 116 L99 116 L98 166 L82 166 Z"
            fill={blouse}
            stroke={ink}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Tiny wooden cardigan buttons */}
          <circle cx="86" cy="133" r="2.2" fill={cardiganDark} />
          <circle cx="86" cy="145" r="2.2" fill={cardiganDark} />
          <circle cx="86" cy="157" r="2.2" fill={cardiganDark} />
        </g>

        {/* === LEFT ARM (Viewer's left) === */}
        {pose === 'photobooth' ? (
          /* Cute peace sign / cheek pose */
          <g>
            <path
              d="M62 122 C46 126, 40 114, 48 100"
              stroke={ink}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M62 122 C46 126, 40 114, 48 100"
              stroke={cardigan}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <circle cx="49" cy="98" r="6" fill={skin} stroke={ink} strokeWidth="2.2" />
            <path d="M46 93 L43 85 M51 92 L53 84" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ) : (
          <motion.g
            animate={
              isWalking
                ? { rotate: [10, -10, 10] }
                : expression === 'shy'
                  ? { rotate: [0, 3, 0] }
                  : {}
            }
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '62px 122px' }}
          >
            <path
              d="M62 123 C52 135, 51 152, 57 161"
              stroke={ink}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M62 123 C52 135, 51 152, 57 161"
              stroke={cardigan}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <circle cx="58" cy="162" r="5.5" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        )}

        {/* === RIGHT ARM (Viewer's right — waves, holds coffee, popcorn, phone, or flowers) === */}
        {pose === 'wave' || pose === 'videocall' ? (
          <motion.g
            animate={{ rotate: [-10, 16, -10] }}
            transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '118px 122px' }}
          >
            <path
              d="M118 122 C134 114, 142 98, 138 84"
              stroke={ink}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M118 122 C134 114, 142 98, 138 84"
              stroke={cardigan}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <circle cx="137" cy="81" r="6" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        ) : pose === 'receiveFlowers' || holdingBouquet ? (
          <g>
            <path
              d="M118 124 C128 136, 124 150, 112 152"
              stroke={ink}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M118 124 C128 136, 124 150, 112 152"
              stroke={cardigan}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <circle cx="110" cy="152" r="5.5" fill={skin} stroke={ink} strokeWidth="2.2" />
            {/* Cute Pastel Bouquet in Cora's hands */}
            <g transform="translate(106, 124) rotate(-14)">
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
              <circle cx="10" cy="18" r="2" fill="#FFE082" />
              <circle cx="24" cy="18" r="2" fill="#FFE082" />
              <path d="M6 24 C2 20, 4 14, 9 16" fill="#A8DFB5" stroke={ink} strokeWidth="1.6" />
              <path d="M29 24 C34 20, 32 14, 27 16" fill="#A8DFB5" stroke={ink} strokeWidth="1.6" />
            </g>
          </g>
        ) : pose === 'coffee' ? (
          <g>
            <path
              d="M118 123 C128 134, 124 148, 114 149"
              stroke={ink}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M118 123 C128 134, 124 148, 114 149"
              stroke={cardigan}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            {/* Warm pastel coffee cup */}
            <rect x="108" y="138" width="16" height="17" rx="4" fill="#FFFDF8" stroke={ink} strokeWidth="2.1" />
            <path d="M124 142 C128 142, 128 150, 124 150" stroke={ink} strokeWidth="2" />
            <path d="M113 133 Q115 127 113 123 M119 133 Q121 127 119 123" stroke="#D98098" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="111" cy="148" r="5" fill={skin} stroke={ink} strokeWidth="2" />
          </g>
        ) : (
          <motion.g
            animate={isWalking ? { rotate: [-10, 10, -10] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '118px 122px' }}
          >
            <path
              d="M118 123 C128 135, 129 152, 123 161"
              stroke={ink}
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M118 123 C128 135, 129 152, 123 161"
              stroke={cardigan}
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <circle cx="122" cy="162" r="5.5" fill={skin} stroke={ink} strokeWidth="2.2" />
          </motion.g>
        )}

        {/* === HEAD & SIGNATURE HIJAB === */}
        <g>
          {/* Back / Outer Hijab Silhouette */}
          <path
            d="M46 72 C46 38, 66 24, 90 24 C114 24, 134 38, 134 72 C136 96, 131 118, 120 128 C108 138, 72 138, 60 128 C49 118, 44 96, 46 72 Z"
            fill={hijabMain}
            stroke={ink}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Soft Hijab Highlight Crown */}
          <path
            d="M58 44 C70 30, 110 30, 122 44"
            stroke={hijabLight}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Hijab Front Chest Drape (Consistent elegant style) */}
          <path
            d="M55 98 C56 120, 72 134, 90 135 C108 134, 124 120, 125 98 C114 110, 102 114, 90 114 C78 114, 66 110, 55 98 Z"
            fill={hijabMain}
            stroke={ink}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Hijab Drape Fold Line */}
          <path
            d="M66 115 C78 124, 102 124, 114 115"
            stroke={hijabFold}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Inner Cream Hijab Underscarf Frame */}
          <path
            d="M57 73 C57 49, 72 39, 90 39 C108 39, 123 49, 123 73 C123 93, 109 109, 90 109 C71 109, 57 93, 57 73 Z"
            fill={hijabLight}
            stroke={ink}
            strokeWidth="2.2"
          />

          {/* Face Oval */}
          <path
            d="M62 74 C62 53, 74 44, 90 44 C106 44, 118 53, 118 74 C118 93, 105 104, 90 104 C75 104, 62 93, 62 74 Z"
            fill={skin}
            stroke={ink}
            strokeWidth="2.2"
          />

          {/* Soft chin shadow */}
          <path
            d="M78 100 Q90 104 102 100"
            stroke={skinShadow}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Cute Hijab Flower Pin on Cora's Left Side */}
          <g transform="translate(121, 56)">
            <circle cx="0" cy="-4" r="3.4" fill="#FFF9F0" stroke={ink} strokeWidth="1.5" />
            <circle cx="3.8" cy="0" r="3.4" fill="#FFF9F0" stroke={ink} strokeWidth="1.5" />
            <circle cx="0" cy="4" r="3.4" fill="#FFF9F0" stroke={ink} strokeWidth="1.5" />
            <circle cx="-3.8" cy="0" r="3.4" fill="#FFF9F0" stroke={ink} strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2.4" fill="#FFD166" />
          </g>

          {/* === FACIAL EXPRESSIONS === */}
          {/* Eyebrows */}
          {isSulky ? (
            <>
              <path d="M70 63 L81 66" stroke={ink} strokeWidth="2.1" strokeLinecap="round" />
              <path d="M110 63 L99 66" stroke={ink} strokeWidth="2.1" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M70 62 Q76 59 81 62" stroke={ink} strokeWidth="1.9" strokeLinecap="round" />
              <path d="M99 62 Q104 59 110 62" stroke={ink} strokeWidth="1.9" strokeLinecap="round" />
            </>
          )}

          {/* Eyes */}
          {isLaughing ? (
            /* Happy closed curved eyes */
            <>
              <path d="M70 73 Q76 66 82 73" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
              <path d="M98 73 Q104 66 110 73" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
            </>
          ) : (
            /* Sparkling expressive cartoon eyes with gentle blink */
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{
                duration: 4.2,
                times: [0, 0.92, 0.95, 0.98, 1],
                repeat: Infinity,
              }}
              style={{ transformOrigin: '90px 73px' }}
            >
              {/* Left eye */}
              <ellipse cx="76" cy="73" rx="4.4" ry="5.2" fill={ink} />
              <circle cx="74.5" cy="71" r="1.7" fill="#FFFFFF" />
              <circle cx="77.5" cy="75" r="0.9" fill="#FFFFFF" />
              <path d="M70 69 L72 71" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />

              {/* Right eye */}
              <ellipse cx="104" cy="73" rx="4.4" ry="5.2" fill={ink} />
              <circle cx="102.5" cy="71" r="1.7" fill="#FFFFFF" />
              <circle cx="105.5" cy="75" r="0.9" fill="#FFFFFF" />
              <path d="M110 69 L108 71" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
            </motion.g>
          )}

          {/* Rosy Cheeks (Stronger when shy/blushing) */}
          <ellipse
            cx="69"
            cy="83"
            rx="6"
            ry="3.4"
            fill={blushColor}
            opacity={isShy ? 0.72 : 0.45}
          />
          <ellipse
            cx="111"
            cy="83"
            rx="6"
            ry="3.4"
            fill={blushColor}
            opacity={isShy ? 0.72 : 0.45}
          />
          {isShy && (
            <>
              <path d="M67 82 L69 84 M71 82 L73 84" stroke="#E05C7A" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M108 82 L110 84 M112 82 L114 84" stroke="#E05C7A" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}

          {/* Tiny cute nose */}
          <path d="M89.5 78.5 Q90.5 80 89 81" stroke="#D9A089" strokeWidth="1.6" strokeLinecap="round" />

          {/* Mouth */}
          {isLaughing ? (
            <path
              d="M83 87 Q90 96 97 87 Z"
              fill="#E56E85"
              stroke={ink}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          ) : isSulky ? (
            /* Adorable pout ("merajuk lucu") */
            <path
              d="M85 90 Q90 86 95 90"
              stroke={ink}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ) : isShy ? (
            <path
              d="M85 88 Q90 92 95 88"
              stroke={ink}
              strokeWidth="2.1"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M83 87 Q90 94 97 87"
              stroke={ink}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}
        </g>
      </motion.g>
    </motion.svg>
  );
};
