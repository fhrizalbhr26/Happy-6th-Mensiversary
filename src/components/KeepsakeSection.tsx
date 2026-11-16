import React, { useState } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CoraCharacter } from './characters/CoraCharacter';
import { IjalCharacter } from './characters/IjalCharacter';

interface KeepsakeSectionProps {
  onReplayFilm: () => void;
}

export const KeepsakeSection: React.FC<KeepsakeSectionProps> = ({
  onReplayFilm,
}) => {
  const [heartsCount, setHeartsCount] = useState(6);
  const [burstId, setBurstId] = useState(0);
  const [recipientNote, setRecipientNote] = useState(
    'Happy 6th Mensiversary, Cora! Terima kasih untuk enam bulan yang penuh kehangatan, tawa, keseruan photobooth, dan rasa nyaman yang selalu ada.',
  );

  const handleSendHeart = () => {
    setHeartsCount((c) => c + 1);
    setBurstId((b) => b + 1);
  };

  return (
    <section
      id="keepsake"
      className="py-16 sm:py-24 border-t border-[#34283D]/8 bg-gradient-to-b from-[#FFFBF4] to-[#FCEEF3]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-[#34283D]/10 bg-[#FFFDF9] p-6 sm:p-10 md:p-12 shadow-[0_18px_45px_rgba(52,40,61,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Storybook Keepsake Illustration */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#FCE6EF] via-[#FFF6EE] to-[#E8F3FC] border border-[#34283D]/10 p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[290px]">
              <AnimatePresence>
                {burstId > 0 && (
                  <motion.div
                    key={burstId}
                    initial={{ y: 20, opacity: 1, scale: 0.8 }}
                    animate={{ y: -90, opacity: 0, scale: 1.35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                    className="absolute top-1/2 z-20 pointer-events-none"
                  >
                    <Heart className="w-10 h-10 fill-[#D95D78] text-[#34283D]" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-end justify-center gap-2 w-full max-w-[260px]">
                <div className="w-1/2">
                  <CoraCharacter
                    expression="blush"
                    pose="receiveFlowers"
                    holdingBouquet={true}
                  />
                </div>
                <div className="w-1/2">
                  <IjalCharacter expression="adoring" pose="stand" />
                </div>
              </div>

              <p className="mt-3 text-xs text-[#635571] text-center">
                17 Mei 2026 · 6 Bulan Bersama · Cora &amp; Ijal
              </p>
            </div>

            {/* Right Dedication & Interactive Keepsake Note */}
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-medium text-[#D95D78]">
                Kenang-Kenangan Kisah · Dedikasi Babak 07
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#2D2338] tracking-tight text-balance">
                Enam Bulan Kita, dan Selamanya untuk Ditulis Bersama
              </h2>

              <div className="mt-5">
                <label
                  htmlFor="keepsake-note"
                  className="block text-xs font-medium text-[#635571] mb-2"
                >
                  Sesuaikan Pesan Ucapan Happy Mensiversary
                </label>
                <textarea
                  id="keepsake-note"
                  rows={3}
                  value={recipientNote}
                  onChange={(e) => setRecipientNote(e.target.value)}
                  className="w-full rounded-xl border border-[#34283D]/15 bg-[#FFFBF4] px-4 py-3 text-sm sm:text-base text-[#2D2338] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#D95D78]/40"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSendHeart}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#D95D78] hover:bg-[#C64C67] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D78]"
                >
                  <Heart className="w-4 h-4 fill-white" aria-hidden="true" />
                  <span>Kirim Hati</span>
                  <span className="font-mono tabular-nums opacity-90">
                    ({heartsCount})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onReplayFilm}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-[#34283D]/15 bg-[#FFFBF4] hover:bg-[#F5EFFA] text-[#2D2338] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78]"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Tonton dari Adegan 1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
