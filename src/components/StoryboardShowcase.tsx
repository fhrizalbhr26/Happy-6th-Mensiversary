import React from 'react';
import { Play } from 'lucide-react';
import { STORY_SCENES } from '../data/storyboard';
import { SceneRenderer } from './scenes/SceneRenderer';

interface StoryboardShowcaseProps {
  activeSceneId: number;
  onSelectScene: (startSec: number) => void;
}

export const StoryboardShowcase: React.FC<StoryboardShowcaseProps> = ({
  activeSceneId,
  onSelectScene,
}) => {
  return (
    <section
      id="storyboard"
      className="py-16 sm:py-24 border-t border-[#34283D]/8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#D95D78]">
              Rancangan Video Reels 9:16 · Total 01:30 Menit (90 Detik)
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#2D2338] tracking-tight text-balance">
              Tujuh Babak Papan Cerita Kita
            </h2>
            <p className="mt-3 text-base text-[#635571] leading-relaxed">
              Setiap bingkai kini dirancang dalam rasio vertikal Instagram Reels
              (9:16) dari pembuka buku cerita hingga impian rumah kecil bersama
              di menit 01:30.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {STORY_SCENES.map((scene) => {
            const isCurrent = scene.id === activeSceneId;
            const isFinale = scene.id === 7;

            return (
              <article
                key={scene.id}
                className={`rounded-2xl border bg-[#FFFDF9] p-5 flex flex-col sm:flex-row gap-5 items-stretch transition-shadow ${
                  isFinale ? 'lg:col-span-2' : ''
                } ${
                  isCurrent
                    ? 'border-[#D95D78] shadow-[0_12px_30px_rgba(217,93,120,0.12)]'
                    : 'border-[#34283D]/10 hover:shadow-[0_10px_24px_rgba(52,40,61,0.06)]'
                }`}
              >
                {/* 9:16 Vertical Reels Thumbnail Preview */}
                <div className="w-36 sm:w-40 mx-auto sm:mx-0 shrink-0">
                  <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden border border-[#34283D]/12 pointer-events-none">
                    <SceneRenderer
                      sceneId={scene.id}
                      sceneProgress={0.55}
                      showCaptions={false}
                      compact={true}
                    />
                  </div>
                </div>

                {/* Storyboard Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-[#635571]">
                      <span className="font-semibold text-[#D95D78]">
                        {scene.subtitle}
                      </span>
                      <span className="font-mono tabular-nums">
                        {scene.timeRangeLabel}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-display text-xl font-semibold text-[#2D2338]">
                      {scene.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#635571] leading-relaxed">
                      {scene.visualSummary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#34283D]/8">
                      <p className="text-xs font-medium text-[#837391] mb-1">
                        Teks di Layar
                      </p>
                      {scene.onScreenLines.map((line, idx) => (
                        <p
                          key={idx}
                          className="font-display italic text-sm text-[#2D2338]"
                        >
                          &ldquo;{line}&rdquo;
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#34283D]/8 flex items-center justify-between gap-3">
                    <span className="text-xs text-[#635571] truncate">
                      {scene.cameraDirection}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectScene(scene.startSec)}
                      className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-lg bg-[#F5EFFA] hover:bg-[#D95D78] text-[#2D2338] hover:text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78]"
                    >
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Putar Adegan</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
