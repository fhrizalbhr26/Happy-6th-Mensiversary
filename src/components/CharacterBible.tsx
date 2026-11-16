import React, { useState } from 'react';
import { CoraCharacter, CoraExpression, CoraPose } from './characters/CoraCharacter';
import { IjalCharacter, IjalExpression, IjalPose } from './characters/IjalCharacter';

const CORA_MOODS: {
  id: string;
  label: string;
  expression: CoraExpression;
  pose: CoraPose;
  note: string;
}[] = [
  {
    id: 'happy',
    label: 'Ceria',
    expression: 'happy',
    pose: 'wave',
    note: 'Manis, ceria, dan selalu menyapa hangat dengan lambaian lembut.',
  },
  {
    id: 'shy',
    label: 'Malu-Malu',
    expression: 'blush',
    pose: 'receiveFlowers',
    note: 'Pipinya langsung merona setiap kali Ijal memberinya kejutan bunga.',
  },
  {
    id: 'laugh',
    label: 'Tertawa',
    expression: 'laugh',
    pose: 'photobooth',
    note: 'Tawa lepas penuh kebahagiaan saat berfoto di photobooth dan bercanda.',
  },
  {
    id: 'sulky',
    label: 'Merajuk Lucu',
    expression: 'sulky',
    pose: 'stand',
    note: 'Ekspresi merajuk menggemaskan yang tak pernah tahan lama di dekat Ijal.',
  },
];

const IJAL_MOODS: {
  id: string;
  label: string;
  expression: IjalExpression;
  pose: IjalPose;
  note: string;
}[] = [
  {
    id: 'warm',
    label: 'Senyum Hangat',
    expression: 'warm',
    pose: 'wave',
    note: 'Tenang, perhatian, dan selalu bahagia hanya dengan melihat senyum Cora.',
  },
  {
    id: 'glasses',
    label: 'Panggilan Video',
    expression: 'adoring',
    pose: 'adjustGlasses',
    note: 'Memperbaiki kacamatanya sambil tersenyum lembut lewat layar ponsel.',
  },
  {
    id: 'goofy',
    label: 'Pose Kocak',
    expression: 'goofy',
    pose: 'photobooth',
    note: 'Selalu siap memasang pose lucu hanya demi membuat Cora tertawa.',
  },
  {
    id: 'romantic',
    label: 'Janji Manis',
    expression: 'shy',
    pose: 'giveFlowers',
    note: 'Membawa buket bunga pastel dengan ketulusan dan rasa sayang.',
  },
];

export const CharacterBible: React.FC = () => {
  const [coraMoodIdx, setCoraMoodIdx] = useState(0);
  const [ijalMoodIdx, setIjalMoodIdx] = useState(0);

  const activeCora = CORA_MOODS[coraMoodIdx];
  const activeIjal = IJAL_MOODS[ijalMoodIdx];

  return (
    <section
      id="characters"
      className="py-16 sm:py-24 border-t border-[#34283D]/8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs sm:text-sm font-medium text-[#D95D78]">
            Panduan Desain Karakter · Konsisten di Seluruh Adegan
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#2D2338] tracking-tight text-balance">
            Kenali Cora &amp; Ijal
          </h2>
          <p className="mt-3 text-base text-[#635571] leading-relaxed">
            Setiap adegan menjaga ciri khas dan proporsi ilustrasi 2D mereka—Cora
            dengan hijab dan busana kasual pastel yang sopan, serta Ijal dengan
            rambut hitam rapi, kacamata, dan hoodie biru muda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CORA CARD */}
          <div className="rounded-2xl border border-[#34283D]/10 bg-[#FCF4F7] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold text-[#2D2338]">
                  Cora
                </h3>
                <span className="text-xs text-[#635571]">
                  Hijab · Kardigan Pink Pastel · Rok Lavender
                </span>
              </div>
              <p className="mt-2 text-sm text-[#635571]">
                Perhatian, penyayang, manis, sedikit malu-malu, dan sangat
                menggemaskan saat tertawa maupun merajuk lucu.
              </p>
            </div>

            <div className="my-6 rounded-xl bg-[#FFFDF9] border border-[#34283D]/8 py-6 px-4 flex flex-col items-center justify-center min-h-[270px]">
              <div className="w-40 sm:w-44">
                <CoraCharacter
                  expression={activeCora.expression}
                  pose={activeCora.pose}
                  holdingBouquet={activeCora.id === 'shy'}
                />
              </div>
              <p className="mt-3 text-xs text-center text-[#635571] max-w-xs">
                {activeCora.note}
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Uji ekspresi Cora"
            >
              {CORA_MOODS.map((mood, idx) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setCoraMoodIdx(idx)}
                  className={`h-10 px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78] ${
                    coraMoodIdx === idx
                      ? 'bg-[#D95D78] text-white'
                      : 'bg-[#FFFDF9] text-[#2D2338] border border-[#34283D]/10 hover:bg-[#F8E6EC]'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* IJAL CARD */}
          <div className="rounded-2xl border border-[#34283D]/10 bg-[#F2F7FC] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold text-[#2D2338]">
                  Ijal
                </h3>
                <span className="text-xs text-[#635571]">
                  Kacamata Khas · Rambut Hitam Rapi · Hoodie Biru Muda
                </span>
              </div>
              <p className="mt-2 text-sm text-[#635571]">
                Humoris, perhatian, romantis, dan selalu berusaha menemukan cara
                manis agar Cora tersenyum.
              </p>
            </div>

            <div className="my-6 rounded-xl bg-[#FFFDF9] border border-[#34283D]/8 py-6 px-4 flex flex-col items-center justify-center min-h-[270px]">
              <div className="w-40 sm:w-44">
                <IjalCharacter
                  expression={activeIjal.expression}
                  pose={activeIjal.pose}
                  holdingBouquet={activeIjal.id === 'romantic'}
                />
              </div>
              <p className="mt-3 text-xs text-center text-[#635571] max-w-xs">
                {activeIjal.note}
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Uji ekspresi Ijal"
            >
              {IJAL_MOODS.map((mood, idx) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setIjalMoodIdx(idx)}
                  className={`h-10 px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B9BD5] ${
                    ijalMoodIdx === idx
                      ? 'bg-[#467CB0] text-white'
                      : 'bg-[#FFFDF9] text-[#2D2338] border border-[#34283D]/10 hover:bg-[#E4F0FA]'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
