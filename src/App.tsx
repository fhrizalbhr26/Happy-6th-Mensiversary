import { useState } from 'react';
import { Play } from 'lucide-react';
import { TOTAL_DURATION_SEC, getSceneAtTime } from './data/storyboard';
import { CinemaPlayer } from './components/CinemaPlayer';
import { StoryboardShowcase } from './components/StoryboardShowcase';
import { CharacterBible } from './components/CharacterBible';
import { KeepsakeSection } from './components/KeepsakeSection';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  const activeScene = getSceneAtTime(currentTime);

  const scrollToStageAndPlay = (startSec?: number) => {
    if (typeof startSec === 'number') {
      setCurrentTime(startSec);
    } else if (currentTime >= TOTAL_DURATION_SEC - 0.1) {
      setCurrentTime(0);
    }
    setIsPlaying(true);
    const el = document.getElementById('stage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF4] text-[#2D2338] flex flex-col">
      {/* Three-Zone Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFBF4]/92 backdrop-blur-md border-b border-[#34283D]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#stage"
            className="font-display text-xl font-semibold tracking-tight text-[#2D2338] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D95D78] rounded"
          >
            Cora &amp; Ijal
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#635571]"
          >
            <a
              href="#stage"
              className="hover:text-[#D95D78] transition-colors whitespace-nowrap shrink-0"
            >
              Panggung Film
            </a>
            <a
              href="#storyboard"
              className="hover:text-[#D95D78] transition-colors whitespace-nowrap shrink-0"
            >
              Papan Cerita
            </a>
            <a
              href="#characters"
              className="hover:text-[#D95D78] transition-colors whitespace-nowrap shrink-0"
            >
              Karakter
            </a>
            <a
              href="#keepsake"
              className="hover:text-[#D95D78] transition-colors whitespace-nowrap shrink-0"
            >
              Kenangan
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToStageAndPlay(0)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#D95D78] hover:bg-[#C64C67] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D78]"
            >
              <Play className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
              <span>Tonton Kisah</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Opening Hero & 16:9 Interactive Storybook Stage */}
        <section id="stage" className="pt-8 sm:pt-12 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#635571]">
                <span className="font-medium text-[#D95D78]">
                  Video Animasi Reels 9:16 Perayaan 6 Bulan
                </span>
                <span aria-hidden="true">·</span>
                <span>17 Mei 2026</span>
                <span aria-hidden="true">·</span>
                <span>7 Babak (01:30 Menit)</span>
              </div>

              <h1 className="mt-2 font-display text-[clamp(2rem,4.2vw,3.35rem)] font-semibold leading-[1.12] tracking-tight text-[#2D2338] text-balance">
                Happy 6th Mensiversary — Cora &amp; Ijal
              </h1>

              <p className="mt-3 text-base sm:text-lg text-[#635571] leading-relaxed max-w-2xl">
                Animasi buku cerita 2D bergaya gambar tangan dalam format
                vertikal Instagram Reels (9:16) yang merangkum enam bulan penuh
                kenangan manis, photobooth kocak, panggilan video jarak jauh,
                hingga impian rumah kecil bersama.
              </p>
            </div>

            <CinemaPlayer
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              showCaptions={showCaptions}
              setShowCaptions={setShowCaptions}
            />
          </div>
        </section>

        {/* 6-Scene Storyboard Explorer */}
        <StoryboardShowcase
          activeSceneId={activeScene.id}
          onSelectScene={(startSec) => scrollToStageAndPlay(startSec)}
        />

        {/* Character Design Sheet (Cora & Ijal Consistency Showcase) */}
        <CharacterBible />

        {/* Closing Mensiversary Keepsake */}
        <KeepsakeSection onReplayFilm={() => scrollToStageAndPlay(0)} />
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-[#34283D]/8 bg-[#FFFBF4] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#635571]">
          <p className="font-display font-medium text-[#2D2338]">
            Happy 6th Mensiversary · Cora &amp; Ijal
          </p>
          <p>
            Dua Hati, Satu Kisah yang Indah · Sejak 17 Mei 2026 · Lagu:
            &ldquo;Kita Usahakan Rumah Itu&rdquo; — Sal Priadi
          </p>
        </div>
      </footer>
    </div>
  );
}
