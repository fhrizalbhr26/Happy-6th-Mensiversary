import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CoraCharacter } from '../characters/CoraCharacter';
import { IjalCharacter } from '../characters/IjalCharacter';
import {
  FallingPetalsAndConfetti,
  FloatingHeartsField,
  PastelClouds,
  TwinklingStars,
} from './SceneAtmosphere';

interface SceneRendererProps {
  sceneId: number;
  sceneProgress: number; // 0 to 1 within current scene
  showCaptions?: boolean;
  compact?: boolean;
}

const SCRAPBOOK_CARDS = [
  {
    id: 'cinema',
    title: 'Nonton Bioskop',
    caption: 'Popcorn & tawa pelan berdua',
    rotate: '-3deg',
    tapeColor: '#FADADD',
    bg: '#2A233A',
  },
  {
    id: 'coffee',
    title: 'Ngopi Bareng',
    caption: 'Kopi hangat & cerita panjang',
    rotate: '2.5deg',
    tapeColor: '#BEE3F8',
    bg: '#FFF3E4',
  },
  {
    id: 'meal',
    title: 'Makan Bersama',
    caption: 'Santap bahagia berdampingan',
    rotate: '-2deg',
    tapeColor: '#E6DDF5',
    bg: '#FCECF2',
  },
  {
    id: 'photobooth',
    title: 'Photobooth Seru',
    caption: 'Pose kocak & kilatan kamera',
    rotate: '3deg',
    tapeColor: '#FFE5B4',
    bg: '#E8F4FD',
  },
  {
    id: 'teasing',
    title: 'Saling Menggoda',
    caption: 'Merajuk lucu & tawa ceria',
    rotate: '-1.5deg',
    tapeColor: '#FADADD',
    bg: '#F3ECF9',
  },
];

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  sceneId,
  sceneProgress,
  showCaptions = true,
  compact = false,
}) => {
  const [manualMoment, setManualMoment] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full overflow-hidden select-none rounded-2xl bg-[#FFFBF4]">
      <AnimatePresence mode="wait">
        {sceneId === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 bg-gradient-to-b from-[#BDE3FA] via-[#E3F2FD] to-[#FFF8EE]"
          >
            <div className="absolute inset-0 animate-camera-breath">
              <PastelClouds opacity={0.95} />
              <TwinklingStars color="#FFF6B3" />

              {/* Soft rolling pastel hills for 9:16 */}
              <svg
                viewBox="0 0 720 320"
                className="absolute bottom-0 inset-x-0 w-full h-[28%] pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 110 Q190 35 380 95 T720 85 L720 320 L0 320 Z"
                  fill="#F8E9F0"
                />
                <path
                  d="M0 175 Q240 115 490 165 T720 145 L720 320 L0 320 Z"
                  fill="#FFF2E6"
                />
              </svg>

              {/* Center-Upper Open Storybook (9:16 Reels framing) */}
              <motion.div
                initial={{ scale: 0.88, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute inset-x-0 flex flex-col items-center justify-center ${
                  compact ? 'top-[14%] px-2' : 'top-[15%] px-4'
                }`}
              >
                <div className="relative w-full max-w-[340px] aspect-[16/10] flex items-center justify-center">
                  <svg
                    viewBox="0 0 520 280"
                    className="w-full h-full drop-shadow-[0_12px_20px_rgba(61,44,82,0.12)]"
                    fill="none"
                  >
                    <rect
                      x="22"
                      y="32"
                      width="476"
                      height="220"
                      rx="18"
                      fill="#EFA5B8"
                      stroke="#34283D"
                      strokeWidth="3"
                    />
                    <path
                      d="M36 42 C110 34, 210 36, 260 54 L260 236 C210 222, 110 222, 36 232 Z"
                      fill="#FFFDF7"
                      stroke="#34283D"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M484 42 C410 34, 310 36, 260 54 L260 236 C310 222, 410 222, 484 232 Z"
                      fill="#FFF9EE"
                      stroke="#34283D"
                      strokeWidth="2.5"
                    />
                    <line
                      x1="260"
                      y1="54"
                      x2="260"
                      y2="236"
                      stroke="#D4C7DF"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M254 226 L266 226 L266 266 L260 258 L254 266 Z"
                      fill="#9BC8E8"
                      stroke="#34283D"
                      strokeWidth="2"
                    />
                    <circle cx="72" cy="76" r="3" fill="#FADADD" />
                    <circle cx="448" cy="76" r="3" fill="#BEE3F8" />
                  </svg>

                  {/* Animated Storybook Text */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
                      compact ? 'px-3 pb-1' : 'px-8 pb-2'
                    }`}
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 }}
                      className={`font-display italic text-[#D95D78] font-semibold tracking-tight ${
                        compact ? 'text-[10px]' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      Pada Suatu Hari...
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className={`mt-1 text-[#34283D] font-medium ${
                        compact ? 'text-[7px] leading-tight' : 'text-xs sm:text-sm'
                      }`}
                    >
                      Dua Hati, Satu Kisah yang Indah.
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* Cora (Left) & Ijal (Right) waving shyly */}
              <motion.div
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.45 }}
                className="absolute bottom-[7%] left-[8%] w-[37%]"
              >
                <CoraCharacter expression="shy" pose="wave" />
              </motion.div>

              <motion.div
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.55 }}
                className="absolute bottom-[7%] right-[8%] w-[37%]"
              >
                <IjalCharacter expression="shy" pose="wave" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {sceneId === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 bg-gradient-to-b from-[#FCE6EF] via-[#FFF4F6] to-[#FFFBF2]"
          >
            <PastelClouds opacity={0.75} />
            <FallingPetalsAndConfetti active={true} />

            {/* Soft blossom park backdrop for 9:16 */}
            <svg
              viewBox="0 0 720 1280"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              <circle cx="80" cy="80" r="145" fill="#FADADD" fillOpacity="0.68" />
              <circle cx="195" cy="30" r="105" fill="#FCE4EC" fillOpacity="0.8" />
              <circle cx="640" cy="95" r="150" fill="#FADADD" fillOpacity="0.68" />
              <circle cx="525" cy="35" r="105" fill="#E6DDF5" fillOpacity="0.55" />

              <path
                d="M0 950 Q360 885 720 950 L720 1280 L0 1280 Z"
                fill="#E3F2E5"
                stroke="#34283D"
                strokeOpacity="0.15"
                strokeWidth="2"
              />
              {[110, 210, 520, 610].map((cx, idx) => (
                <g key={idx} transform={`translate(${cx}, ${1060 + (idx % 2) * 55})`}>
                  <circle cx="0" cy="-7" r="6" fill="#FFFDF7" />
                  <circle cx="7" cy="0" r="6" fill="#FFFDF7" />
                  <circle cx="0" cy="7" r="6" fill="#FFFDF7" />
                  <circle cx="-7" cy="0" r="6" fill="#FFFDF7" />
                  <circle cx="0" cy="0" r="4" fill="#FFD166" />
                </g>
              ))}
            </svg>

            {/* Date Title Header */}
            <div
              className={`relative z-10 text-center ${
                compact ? 'pt-3 px-2' : 'pt-12 px-5'
              }`}
            >
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`font-display font-semibold text-[#D95D78] tracking-tight ${
                  compact ? 'text-xs' : 'text-3xl'
                }`}
              >
                17 Mei 2026
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className={`mt-1 text-[#544662] font-medium ${
                  compact ? 'text-[8px]' : 'text-sm sm:text-base'
                }`}
              >
                Hari ketika kisah kita dimulai.
              </motion.p>
            </div>

            {/* Cora & Ijal Meeting & Looking Shyly at Each Other */}
            <div className="absolute inset-x-0 bottom-[8%] flex items-end justify-center gap-2 px-3">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: sceneProgress > 0.25 ? 6 : 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-[39%]"
              >
                <CoraCharacter expression="blush" pose="stand" />
              </motion.div>

              {/* Floating hearts rising right between them */}
              <div className="relative w-8 h-36 flex items-center justify-center mb-10">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                      y: [16, -54 - i * 20],
                      x: [0, i % 2 === 0 ? 7 : -7, 0],
                      opacity: [0, 1, 0],
                      scale: [0.7, 1.1, 0.85],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.75,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  >
                    <svg
                      width={compact ? '12' : '22'}
                      height={compact ? '11' : '20'}
                      viewBox="0 0 24 22"
                      fill="none"
                    >
                      <path
                        d="M12 20.5C12 20.5 2 14.2 2 7.5C2 4.2 4.6 1.8 7.6 1.8C9.6 1.8 11.2 2.9 12 4.4C12.8 2.9 14.4 1.8 16.4 1.8C19.4 1.8 22 4.2 22 7.5C22 14.2 12 20.5 12 20.5Z"
                        fill="#F48CA4"
                        stroke="#34283D"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: sceneProgress > 0.25 ? -6 : 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-[39%]"
              >
                <IjalCharacter expression="shy" pose="stand" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {sceneId === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className={`absolute inset-0 bg-gradient-to-br from-[#F4ECFA] via-[#FFF9F2] to-[#FCEBF1] flex flex-col justify-between ${
              compact ? 'p-2' : 'p-4 sm:p-5'
            }`}
          >
            {/* Subtle dotted scrapbook paper pattern */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#C7B7D9 1.2px, transparent 1.2px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* Header */}
            <div className={`relative z-10 text-center ${compact ? 'pt-0.5' : 'pt-2'}`}>
              <p
                className={`font-display font-semibold text-[#34283D] tracking-tight ${
                  compact ? 'text-[10px]' : 'text-xl sm:text-2xl'
                }`}
              >
                Momen Kecil, Bahagia Besar
              </p>
              <p
                className={`text-[#635571] ${
                  compact ? 'text-[7px]' : 'text-xs sm:text-sm mt-0.5'
                }`}
              >
                Setiap momen kecil menjadi kenangan yang indah.
              </p>
            </div>

            {/* 5 Living Scrapbook Polaroids arranged in 9:16 Vertical 2+2+1 Collage */}
            {(() => {
              const autoActiveIdx = Math.min(
                4,
                Math.floor(sceneProgress * SCRAPBOOK_CARDS.length),
              );
              const activeIdx =
                manualMoment !== null ? manualMoment : autoActiveIdx;

              return (
                <div
                  className={`relative z-10 grid grid-cols-2 items-center my-auto ${
                    compact ? 'gap-1.5 px-0.5' : 'gap-2.5 px-1'
                  }`}
                >
                  {SCRAPBOOK_CARDS.map((card, idx) => {
                    const isActive = idx === activeIdx;
                    const isLastCentered = idx === 4;
                    return (
                      <motion.button
                        key={card.id}
                        type="button"
                        onClick={() =>
                          setManualMoment(manualMoment === idx ? null : idx)
                        }
                        animate={{
                          scale: isActive ? 1.04 : 0.96,
                          y: isActive ? -3 : 1,
                          rotate: isActive ? '0deg' : card.rotate,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative text-left bg-[#FFFDF9] rounded-lg border transition-shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78] ${
                          isLastCentered ? 'col-span-2 w-[54%] mx-auto' : 'w-full'
                        } ${compact ? 'p-1' : 'p-2'} ${
                          isActive
                            ? 'border-[#D95D78] shadow-[0_10px_20px_rgba(52,40,61,0.16)] z-20'
                            : 'border-[#34283D]/15 shadow-sm opacity-92 hover:opacity-100'
                        }`}
                      >
                        {/* Pastel masking tape on top */}
                        <div
                          className={`mx-auto rounded-xs opacity-85 border border-[#34283D]/15 ${
                            compact
                              ? 'w-5 h-1.5 -mt-1.5 mb-0.5'
                              : 'w-10 h-2.5 -mt-3 mb-1.5'
                          }`}
                          style={{ backgroundColor: card.tapeColor }}
                        />

                        {/* Mini Animated Scene Window */}
                        <div
                          className="relative w-full aspect-[4/3] rounded overflow-hidden flex items-end justify-center border border-[#34283D]/10"
                          style={{ backgroundColor: card.bg }}
                        >
                          {card.id === 'cinema' && (
                            <>
                              <div className="absolute top-1 inset-x-2 h-2 rounded-xs bg-[#BEE3F8]/70 animate-pulse" />
                              <div className="w-[48%] -mr-2">
                                <CoraCharacter expression="happy" pose="stand" />
                              </div>
                              <svg
                                viewBox="0 0 24 28"
                                className="relative z-10 mb-1 w-3.5 h-4 shrink-0"
                                fill="none"
                              >
                                <circle cx="8" cy="7" r="3.2" fill="#FFF6C9" stroke="#34283D" strokeWidth="1.4" />
                                <circle cx="15" cy="7" r="3.2" fill="#FFFDF7" stroke="#34283D" strokeWidth="1.4" />
                                <circle cx="12" cy="5" r="3.4" fill="#FFFDF7" stroke="#34283D" strokeWidth="1.4" />
                                <path d="M5 10 L19 10 L17 25 L7 25 Z" fill="#F6A5B8" stroke="#34283D" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M9.5 11 L10 24 M14.5 11 L14 24" stroke="#FFFDF7" strokeWidth="1.6" />
                              </svg>
                              <div className="w-[48%] -ml-2">
                                <IjalCharacter expression="warm" pose="stand" />
                              </div>
                            </>
                          )}

                          {card.id === 'coffee' && (
                            <>
                              <div className="w-[46%]">
                                <CoraCharacter expression="happy" pose="coffee" />
                              </div>
                              <div className="w-[46%]">
                                <IjalCharacter expression="adoring" pose="coffee" />
                              </div>
                            </>
                          )}

                          {card.id === 'meal' && (
                            <>
                              <div className="absolute bottom-0 inset-x-1 h-2.5 bg-[#FFFDF8] border-t border-[#34283D]/30 rounded-t" />
                              <div className="w-[46%]">
                                <CoraCharacter expression="laugh" pose="stand" />
                              </div>
                              <div className="w-[46%]">
                                <IjalCharacter expression="laugh" pose="stand" />
                              </div>
                            </>
                          )}

                          {card.id === 'photobooth' && (
                            <>
                              {isActive && (
                                <motion.div
                                  animate={{ opacity: [0, 0.7, 0] }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 1.2,
                                  }}
                                  className="absolute inset-0 bg-white z-20 pointer-events-none"
                                />
                              )}
                              <div className="w-[47%]">
                                <CoraCharacter expression="laugh" pose="photobooth" />
                              </div>
                              <div className="w-[47%]">
                                <IjalCharacter expression="goofy" pose="photobooth" />
                              </div>
                            </>
                          )}

                          {card.id === 'teasing' && (
                            <>
                              <div className="w-[47%]">
                                <CoraCharacter expression="sulky" pose="stand" />
                              </div>
                              <div className="w-[47%]">
                                <IjalCharacter expression="laugh" pose="stand" />
                              </div>
                            </>
                          )}
                        </div>

                        <p
                          className={`mt-1 font-display font-semibold text-[#34283D] truncate ${
                            compact ? 'text-[7px]' : 'text-xs'
                          }`}
                        >
                          {card.title}
                        </p>
                        {!compact && (
                          <p className="text-[10px] text-[#635571] leading-tight mt-0.5 truncate">
                            {card.caption}
                          </p>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              );
            })()}

            {!compact && (
              <div className="relative z-10 text-center pb-1">
                <span className="text-[11px] text-[#635571]">
                  Petunjuk: Klik kartu foto mana saja untuk menyorot kenangan
                </span>
              </div>
            )}
          </motion.div>
        )}

        {sceneId === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 flex flex-col"
          >
            {/* 9:16 Vertical Split: Top Cora's Pastel Pink Room · Bottom Ijal's Baby Blue Evening Room */}
            <div className="absolute inset-0 grid grid-rows-2">
              <div className="relative bg-gradient-to-b from-[#FCE6EF] to-[#FFF4F7] border-b border-dashed border-[#34283D]/25">
                {/* Fairy lights */}
                <svg viewBox="0 0 360 60" className="w-full h-10 opacity-80">
                  <path
                    d="M0 10 Q90 38 180 14 T360 18"
                    fill="none"
                    stroke="#34283D"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                  />
                  {[45, 115, 185, 255, 320].map((cx, i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={i % 2 === 0 ? 24 : 18}
                      r="4"
                      fill="#FFE599"
                    />
                  ))}
                </svg>
              </div>
              <div className="relative bg-gradient-to-b from-[#D7EBFA] to-[#EDF6FD]">
                {/* Crescent Moon & evening stars */}
                <svg viewBox="0 0 360 80" className="w-full h-14 opacity-85">
                  <path
                    d="M295 18 A14 14 0 1 0 315 38 A11 11 0 1 1 295 18 Z"
                    fill="#FFF4B8"
                    stroke="#34283D"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                  />
                  <circle cx="245" cy="24" r="2.2" fill="#FFFDF7" />
                  <circle cx="85" cy="34" r="2" fill="#FFFDF7" />
                </svg>
              </div>
            </div>

            {/* Two Smartphones Stacked Vertically for 9:16 Video Call */}
            <div
              className={`relative z-10 flex-1 flex flex-col items-center justify-center ${
                compact ? 'gap-1.5 py-2 px-2' : 'gap-3 py-6 px-6 pb-14'
              }`}
            >
              {/* Cora's Smartphone (Top) */}
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className={`relative aspect-[4/3] bg-[#34283D] shadow-[0_12px_26px_rgba(52,40,61,0.16)] ${
                  compact
                    ? 'w-[78%] rounded-xl p-1'
                    : 'w-[74%] max-w-[260px] rounded-[20px] p-2'
                }`}
              >
                <div className="w-full h-full rounded-[13px] bg-gradient-to-b from-[#FFF2F6] to-[#FADADD]/60 overflow-hidden flex flex-col items-center justify-end relative">
                  <span
                    className={`absolute top-2 left-3 font-medium text-[#D95D78] ${
                      compact ? 'text-[7px]' : 'text-xs'
                    }`}
                  >
                    Cora
                  </span>
                  <div className="w-[56%] -mb-5">
                    <CoraCharacter expression="happy" pose="videocall" />
                  </div>
                </div>
              </motion.div>

              {/* Flying Hearts Bridging Top & Bottom Vertically */}
              <div
                className={`relative flex items-center justify-center ${
                  compact ? 'h-4 w-12' : 'h-10 w-24'
                }`}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                      y: i % 2 === 0 ? [-14, 14] : [14, -14],
                      x: [0, i === 1 ? 12 : -12, 0],
                      opacity: [0, 1, 0],
                      scale: [0.7, 1.12, 0.7],
                    }}
                    transition={{
                      duration: 2.2,
                      delay: i * 0.7,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <svg
                      width={compact ? '12' : '22'}
                      height={compact ? '11' : '20'}
                      viewBox="0 0 24 22"
                      fill="none"
                    >
                      <path
                        d="M12 20.5C12 20.5 2 14.2 2 7.5C2 4.2 4.6 1.8 7.6 1.8C9.6 1.8 11.2 2.9 12 4.4C12.8 2.9 14.4 1.8 16.4 1.8C19.4 1.8 22 4.2 22 7.5C22 14.2 12 20.5 12 20.5Z"
                        fill={i % 2 === 0 ? '#F28AA3' : '#9BC8E8'}
                        stroke="#34283D"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Ijal's Smartphone (Bottom) */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className={`relative aspect-[4/3] bg-[#34283D] shadow-[0_12px_26px_rgba(52,40,61,0.16)] ${
                  compact
                    ? 'w-[78%] rounded-xl p-1'
                    : 'w-[74%] max-w-[260px] rounded-[20px] p-2'
                }`}
              >
                <div className="w-full h-full rounded-[13px] bg-gradient-to-b from-[#EDF6FD] to-[#BEE3F8]/65 overflow-hidden flex flex-col items-center justify-end relative">
                  <span
                    className={`absolute top-2 left-3 font-medium text-[#467CB0] ${
                      compact ? 'text-[7px]' : 'text-xs'
                    }`}
                  >
                    Ijal
                  </span>
                  <div className="w-[56%] -mb-8">
                    <IjalCharacter expression="adoring" pose="adjustGlasses" />
                  </div>
                </div>
              </motion.div>
            </div>

            {showCaptions && !compact && (
              <div className="absolute bottom-3 inset-x-3 text-center z-20">
                <div className="inline-block bg-[#FFFBF4]/92 backdrop-blur-sm border border-[#34283D]/10 px-3.5 py-1.5 rounded-xl shadow-sm">
                  <p className="font-display text-xs sm:text-sm text-[#34283D]">
                    Meski terpisah jarak, kamu selalu dekat di hatiku.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {sceneId === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 bg-gradient-to-b from-[#DFD3F6] via-[#FADADD] to-[#FFE8D1]"
          >
            <TwinklingStars color="#FFF8CC" />
            <FallingPetalsAndConfetti active={true} />

            {/* Sunset horizon hills for 9:16 */}
            <svg
              viewBox="0 0 720 420"
              className="absolute bottom-0 inset-x-0 w-full h-[34%] pointer-events-none"
              preserveAspectRatio="none"
            >
              <circle cx="360" cy="180" r="120" fill="#FFF3C4" fillOpacity="0.65" />
              <path
                d="M0 160 Q180 95 360 150 T720 140 L720 420 L0 420 Z"
                fill="#F5C7D8"
              />
              <path
                d="M0 245 Q230 195 470 245 T720 225 L720 420 L0 420 Z"
                fill="#E8D8F5"
              />
            </svg>

            {/* Six Floating Hearts Morphing into Big "6" + Celebration Typography */}
            <div
              className={`relative z-10 flex flex-col items-center text-center ${
                compact ? 'pt-3 px-2' : 'pt-10 px-4'
              }`}
            >
              <div
                className={`relative flex items-center justify-center ${
                  compact ? 'h-8 mb-0.5' : 'h-20 mb-2'
                }`}
              >
                {sceneProgress < 0.38 ? (
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((h) => (
                      <motion.div
                        key={h}
                        initial={{ y: 18, opacity: 0, scale: 0.5 }}
                        animate={{
                          y: [0, -7, 0],
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          duration: 1.4,
                          delay: h * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        <svg
                          width={compact ? '11' : '22'}
                          height={compact ? '10' : '20'}
                          viewBox="0 0 24 22"
                          fill="none"
                        >
                          <path
                            d="M12 20.5C12 20.5 2 14.2 2 7.5C2 4.2 4.6 1.8 7.6 1.8C9.6 1.8 11.2 2.9 12 4.4C12.8 2.9 14.4 1.8 16.4 1.8C19.4 1.8 22 4.2 22 7.5C22 14.2 12 20.5 12 20.5Z"
                            fill={h % 2 === 0 ? '#F28AA3' : '#9BC8E8'}
                            stroke="#34283D"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                    className="relative flex items-center justify-center"
                  >
                    <span
                      className={`font-display font-bold text-[#D95D78] drop-shadow-[0_4px_0_rgba(255,255,255,0.85)] ${
                        compact ? 'text-2xl' : 'text-6xl'
                      }`}
                    >
                      6
                    </span>
                  </motion.div>
                )}
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className={`font-display font-bold text-[#34283D] tracking-tight ${
                  compact ? 'text-[10px] leading-tight' : 'text-2xl sm:text-3xl'
                }`}
              >
                HAPPY 6TH MENSIVERSARY!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className={`mt-1 font-medium text-[#544662] ${
                  compact ? 'text-[7px]' : 'text-xs sm:text-sm'
                }`}
              >
                6 Bulan Penuh Cinta, Tawa &amp; Kenangan.
              </motion.p>
            </div>

            {/* Cora & Ijal Walking Side by Side */}
            <motion.div
              animate={{ x: [-14, 14] }}
              transition={{
                duration: 14,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="absolute inset-x-0 bottom-[7%] flex items-end justify-center gap-2 px-4"
            >
              <div className="w-[36%]">
                <CoraCharacter expression="happy" pose="walk" />
              </div>
              <div className="w-[36%]">
                <IjalCharacter expression="warm" pose="walk" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {sceneId === 6 && (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            className="absolute inset-0 bg-gradient-to-b from-[#FAD8E2] via-[#FFE2CC] to-[#FFF6E5]"
          >
            <FloatingHeartsField count={6} color="#F28AA3" />

            {/* Warm Sunset Horizon for 9:16 */}
            <svg
              viewBox="0 0 720 1280"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              <circle cx="360" cy="690" r="185" fill="#FFE6A7" fillOpacity="0.72" />
              <circle cx="360" cy="690" r="115" fill="#FFF7D6" fillOpacity="0.9" />
              <path
                d="M0 840 Q180 770 360 820 T720 805 L720 1280 L0 1280 Z"
                fill="#F7C7D4"
              />
              <path
                d="M0 955 Q240 895 490 955 T720 930 L720 1280 L0 1280 Z"
                fill="#F4E3C9"
              />
            </svg>

            {/* Scene 6 Narrative Beat */}
            <div
              className={`relative z-10 text-center ${
                compact ? 'pt-3 px-2' : 'pt-12 px-5'
              }`}
            >
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`font-display italic font-semibold text-[#34283D] text-balance ${
                  compact ? 'text-[10px] leading-tight' : 'text-2xl'
                }`}
              >
                {sceneProgress < 0.5
                  ? 'Sebuket bunga kecil, dan sebuah janji yang hangat...'
                  : 'Melangkah menuju setiap hari esok, bersama-sama.'}
              </motion.p>
              <p
                className={`mt-1.5 text-[#635571] font-medium ${
                  compact ? 'text-[7px]' : 'text-xs sm:text-sm'
                }`}
              >
                Happy 6th Mensiversary, Cora &amp; Ijal
              </p>
            </div>

            {sceneProgress < 0.5 ? (
              <div className="absolute inset-x-0 bottom-[8%] flex items-end justify-center gap-2 px-4">
                <motion.div
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-[38%]"
                >
                  <CoraCharacter
                    expression="blush"
                    pose={sceneProgress > 0.25 ? 'receiveFlowers' : 'stand'}
                    holdingBouquet={sceneProgress > 0.25}
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-[38%]"
                >
                  <IjalCharacter
                    expression="adoring"
                    pose={sceneProgress > 0.25 ? 'stand' : 'giveFlowers'}
                    holdingBouquet={sceneProgress <= 0.25}
                  />
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 1, y: 0 }}
                animate={{ scale: 0.72, y: -42 }}
                transition={{ duration: 6.5, ease: 'easeInOut' }}
                className="absolute inset-x-0 bottom-[10%] flex items-end justify-center gap-2 px-4"
              >
                <div className="w-[36%]">
                  <CoraCharacter
                    expression="happy"
                    pose="walk"
                    holdingBouquet={true}
                  />
                </div>
                <div className="w-[36%]">
                  <IjalCharacter expression="warm" pose="walk" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {sceneId === 7 && (
          <motion.div
            key="scene-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-gradient-to-b from-[#DDD4F6] via-[#FCE7EE] to-[#FFF6EA]"
          >
            <TwinklingStars color="#FFF6B3" />
            <FloatingHeartsField count={7} color="#F28AA3" />

            {/* Cozy Pastel Home & Lush Garden centered cleanly for 9:16 */}
            <svg
              viewBox="0 0 720 1280"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Crescent Moon */}
              <path
                d="M115 165 A24 24 0 1 0 147 197 A20 20 0 1 1 115 165 Z"
                fill="#FFF5BA"
                stroke="#34283D"
                strokeOpacity="0.35"
                strokeWidth="2"
              />

              {/* Rolling pastel garden hills */}
              <path
                d="M0 780 Q190 700 380 755 T720 740 L720 1280 L0 1280 Z"
                fill="#DDF0E2"
              />
              <path
                d="M0 910 Q250 845 500 905 T720 885 L720 1280 L0 1280 Z"
                fill="#E8F5E9"
              />

              {/* Cozy Simple Pastel House centered behind them */}
              <g transform="translate(185, 475)">
                <rect
                  x="220"
                  y="10"
                  width="34"
                  height="64"
                  rx="4"
                  fill="#F5C4D0"
                  stroke="#34283D"
                  strokeWidth="3"
                />
                <rect
                  x="40"
                  y="110"
                  width="270"
                  height="165"
                  rx="10"
                  fill="#FFFDF7"
                  stroke="#34283D"
                  strokeWidth="3"
                />
                <path
                  d="M15 118 L175 18 L335 118 Z"
                  fill="#EFA5B8"
                  stroke="#34283D"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M145 275 L145 205 C145 185, 205 185, 205 205 L205 275 Z"
                  fill="#D6A88C"
                  stroke="#34283D"
                  strokeWidth="2.8"
                />
                <circle cx="193" cy="236" r="3.2" fill="#FFE599" />
                <rect
                  x="70"
                  y="165"
                  width="48"
                  height="46"
                  rx="8"
                  fill="#FFE9A3"
                  stroke="#34283D"
                  strokeWidth="2.6"
                />
                <line x1="94" y1="165" x2="94" y2="211" stroke="#34283D" strokeWidth="2" />
                <line x1="70" y1="188" x2="118" y2="188" stroke="#34283D" strokeWidth="2" />
                <rect
                  x="232"
                  y="165"
                  width="48"
                  height="46"
                  rx="8"
                  fill="#FFE9A3"
                  stroke="#34283D"
                  strokeWidth="2.6"
                />
                <line x1="256" y1="165" x2="256" y2="211" stroke="#34283D" strokeWidth="2" />
                <line x1="232" y1="188" x2="280" y2="188" stroke="#34283D" strokeWidth="2" />
              </g>

              {/* Garden flowers */}
              {[95, 175, 535, 625].map((fx, i) => (
                <g key={i} transform={`translate(${fx}, ${1060 + (i % 2) * 45})`}>
                  <line x1="0" y1="0" x2="0" y2="20" stroke="#74B485" strokeWidth="2.6" />
                  <circle cx="0" cy="-6" r="7" fill={i % 2 === 0 ? '#FADADD' : '#BEE3F8'} />
                  <circle cx="6" cy="0" r="7" fill={i % 2 === 0 ? '#FADADD' : '#BEE3F8'} />
                  <circle cx="-6" cy="0" r="7" fill={i % 2 === 0 ? '#FADADD' : '#BEE3F8'} />
                  <circle cx="0" cy="0" r="4" fill="#FFE082" />
                </g>
              ))}
            </svg>

            {/* Closing Narrative Title */}
            <div
              className={`relative z-10 text-center ${
                compact ? 'pt-3 px-2' : 'pt-11 px-5'
              }`}
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`font-display italic font-semibold text-[#34283D] text-balance ${
                  compact ? 'text-[10px] leading-tight' : 'text-2xl'
                }`}
              >
                Kita usahakan rumah itu, bersama-sama.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className={`mt-1.5 font-medium text-[#D95D78] ${
                  compact ? 'text-[7px]' : 'text-xs sm:text-sm'
                }`}
              >
                Happy 6th Mensiversary, Cora &amp; Ijal
              </motion.p>
            </div>

            {/* Cora & Ijal Standing Together in the Garden */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="absolute inset-x-0 bottom-[7%] flex items-end justify-center gap-2 px-5"
            >
              <div className="w-[37%]">
                <CoraCharacter
                  expression="happy"
                  pose="receiveFlowers"
                  holdingBouquet={true}
                />
              </div>
              <div className="w-[37%]">
                <IjalCharacter expression="adoring" pose="wave" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft Reels Caption Badge */}
      {showCaptions && !compact && sceneId !== 4 && sceneId !== 3 && (
        <div className="absolute bottom-3 left-3 pointer-events-none z-20">
          <span className="text-[11px] font-medium text-[#34283D]/75 bg-[#FFFBF4]/85 px-2.5 py-1 rounded-md border border-[#34283D]/10">
            Adegan 0{sceneId} · Reels 9:16
          </span>
        </div>
      )}
    </div>
  );
};
