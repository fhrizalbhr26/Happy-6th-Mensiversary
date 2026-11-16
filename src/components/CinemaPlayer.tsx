import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Music,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Subtitles,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  STORY_SCENES,
  TOTAL_DURATION_SEC,
  getSceneAtTime,
} from '../data/storyboard';
import { SceneRenderer } from './scenes/SceneRenderer';
import { musicBox } from '../utils/musicBox';

interface CinemaPlayerProps {
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  showCaptions: boolean;
  setShowCaptions: React.Dispatch<React.SetStateAction<boolean>>;
}

function formatTime(sec: number): string {
  const whole = Math.floor(sec);
  const mins = Math.floor(whole / 60);
  const rem = whole % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export const CinemaPlayer: React.FC<CinemaPlayerProps> = ({
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
  showCaptions,
  setShowCaptions,
}) => {
  const lastFrameRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customAudioName, setCustomAudioName] = useState<string | null>(null);

  const activeScene = getSceneAtTime(currentTime);
  const prevSceneIdRef = useRef<number>(activeScene.id);

  useEffect(() => {
    return () => {
      if (customAudioUrl) {
        URL.revokeObjectURL(customAudioUrl);
      }
    };
  }, [customAudioUrl]);

  useEffect(() => {
    if (!isPlaying) {
      lastFrameRef.current = null;
      return;
    }

    let rafId: number;
    const tick = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const deltaSec = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + deltaSec;
        if (next >= TOTAL_DURATION_SEC) {
          setIsPlaying(false);
          return TOTAL_DURATION_SEC;
        }
        return next;
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, setCurrentTime, setIsPlaying]);

  useEffect(() => {
    if (prevSceneIdRef.current !== activeScene.id) {
      prevSceneIdRef.current = activeScene.id;
      if (!isMuted && !customAudioUrl) {
        musicBox.playSparkleChime();
      }
    }
  }, [activeScene.id, isMuted, customAudioUrl]);

  useEffect(() => {
    const audioEl = audioRef.current;

    if (customAudioUrl && audioEl) {
      musicBox.setMuted(true);
      audioEl.muted = isMuted;

      if (isPlaying && !isMuted) {
        if (Math.abs(audioEl.currentTime - currentTime) > 1.2) {
          audioEl.currentTime = currentTime;
        }
        audioEl.play().catch(() => {});
      } else {
        audioEl.pause();
      }
    } else {
      if (audioEl) {
        audioEl.pause();
      }
      musicBox.setMuted(isMuted || !isPlaying);
    }

    return () => {
      musicBox.stopLoop();
    };
  }, [isMuted, isPlaying, customAudioUrl]);

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }
    const url = URL.createObjectURL(file);
    setCustomAudioUrl(url);
    setCustomAudioName(file.name);
    setIsMuted(false);
    setIsPlaying(true);
  };

  const handleClearCustomAudio = () => {
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }
    setCustomAudioUrl(null);
    setCustomAudioName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sceneSpan = activeScene.endSec - activeScene.startSec;
  const sceneProgress = Math.max(
    0,
    Math.min(1, (currentTime - activeScene.startSec) / sceneSpan),
  );

  const syncSeekAudio = (sec: number) => {
    if (audioRef.current && customAudioUrl) {
      audioRef.current.currentTime = sec;
    }
  };

  const handleTogglePlay = () => {
    if (currentTime >= TOTAL_DURATION_SEC - 0.1) {
      setCurrentTime(0);
      syncSeekAudio(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    syncSeekAudio(0);
    setIsPlaying(true);
  };

  const handlePrevScene = () => {
    const idx = STORY_SCENES.findIndex((s) => s.id === activeScene.id);
    const target = STORY_SCENES[Math.max(0, idx - 1)];
    setCurrentTime(target.startSec);
    syncSeekAudio(target.startSec);
  };

  const handleNextScene = () => {
    const idx = STORY_SCENES.findIndex((s) => s.id === activeScene.id);
    const target = STORY_SCENES[Math.min(STORY_SCENES.length - 1, idx + 1)];
    setCurrentTime(target.startSec);
    syncSeekAudio(target.startSec);
  };

  const handleJumpToScene = (startSec: number) => {
    setCurrentTime(startSec);
    syncSeekAudio(startSec);
    setIsPlaying(true);
  };

  return (
    <div className="w-full">
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          preload="auto"
          loop
          className="hidden"
        />
      )}

      {/* Balanced Desktop Split: 9:16 Instagram Reels Stage + Controls & Script Companion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 9:16 Vertical Instagram Reels Stage */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[360px] sm:max-w-[390px] aspect-[9/16] rounded-[28px] border-4 border-[#34283D]/15 bg-[#FFFDF8] shadow-[0_22px_54px_rgba(52,40,61,0.12)] overflow-hidden">
            <SceneRenderer
              sceneId={activeScene.id}
              sceneProgress={sceneProgress}
              showCaptions={showCaptions}
            />
          </div>
        </div>

        {/* Right: Reels Playback Controls, Chapter Timeline, Script & Soundtrack */}
        <div className="lg:col-span-7 rounded-2xl border border-[#34283D]/10 bg-[#FFFDF9] p-5 sm:p-7 flex flex-col justify-between gap-6">
          {/* Active Chapter Details */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#635571]">
                <span className="font-semibold text-[#D95D78]">
                  {activeScene.subtitle}
                </span>
                <span aria-hidden="true">·</span>
                <span>Format Instagram Reels (9:16)</span>
              </div>

              <div className="font-mono tabular-nums text-xs sm:text-sm text-[#635571]">
                {formatTime(currentTime)} / {formatTime(TOTAL_DURATION_SEC)}
              </div>
            </div>

            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#2D2338] tracking-tight">
              {activeScene.title}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-[#635571] leading-relaxed">
              {activeScene.visualSummary}
            </p>

            <div className="mt-4 pt-4 border-t border-[#34283D]/8">
              <p className="text-xs font-medium text-[#837391] mb-1">
                Naskah Teks di Layar
              </p>
              {activeScene.onScreenLines.map((line, idx) => (
                <p
                  key={idx}
                  className="font-display italic text-base text-[#2D2338]"
                >
                  &ldquo;{line}&rdquo;
                </p>
              ))}
            </div>
          </div>

          {/* Interactive 7-Chapter Segmented Progress Scrubber */}
          <div>
            <div
              className="grid grid-cols-7 gap-1.5 mb-5"
              role="group"
              aria-label="Linimasa babak storyboard"
            >
              {STORY_SCENES.map((scene) => {
                const isCurrent = scene.id === activeScene.id;
                const isPast = currentTime >= scene.endSec;
                const fillPct = isPast
                  ? 100
                  : isCurrent
                    ? sceneProgress * 100
                    : 0;

                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleJumpToScene(scene.startSec)}
                    title={`${scene.title} (${scene.timeRangeLabel})`}
                    className="group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D78] rounded-md py-1 cursor-pointer"
                  >
                    <div className="h-2 w-full rounded-full bg-[#EFE9F5] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-[width] duration-100"
                        style={{
                          width: `${fillPct}%`,
                          backgroundColor: isCurrent ? '#D95D78' : '#8DBCE2',
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] leading-none">
                      <span
                        className={`truncate font-medium transition-colors ${
                          isCurrent
                            ? 'text-[#D95D78]'
                            : 'text-[#635571] group-hover:text-[#2D2338]'
                        }`}
                      >
                        0{scene.id}
                      </span>
                      <span className="hidden sm:inline font-mono tabular-nums text-[10px] text-[#837391]">
                        {scene.startSec}d
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Playback Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#D95D78] hover:bg-[#C64C67] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D78]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" aria-hidden="true" />
                      <span>Jeda Reels</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {currentTime >= TOTAL_DURATION_SEC - 0.1
                          ? 'Putar Ulang'
                          : 'Putar Reels'}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrevScene}
                  aria-label="Adegan sebelumnya"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#34283D]/12 bg-[#FFFBF4] hover:bg-[#F5EEF8] text-[#2D2338] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78]"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNextScene}
                  aria-label="Adegan berikutnya"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#34283D]/12 bg-[#FFFBF4] hover:bg-[#F5EEF8] text-[#2D2338] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78]"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  aria-label="Mulai ulang dari adegan 1"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#34283D]/12 bg-[#FFFBF4] hover:bg-[#F5EEF8] text-[#2D2338] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78]"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCaptions((prev) => !prev)}
                  className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78] ${
                    showCaptions
                      ? 'border-[#34283D]/15 bg-[#F5EFFA] text-[#2D2338]'
                      : 'border-[#34283D]/10 bg-transparent text-[#635571] hover:text-[#2D2338]'
                  }`}
                >
                  <Subtitles className="w-4 h-4" aria-hidden="true" />
                  <span>Teks Cerita</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D95D78] ${
                    !isMuted
                      ? 'border-[#5B9BD5]/40 bg-[#EBF5FD] text-[#2B5D8C]'
                      : 'border-[#34283D]/10 bg-transparent text-[#635571] hover:text-[#2D2338]'
                  }`}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4" aria-hidden="true" />
                      <span>Musik Mati</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {customAudioUrl ? 'Lagu MP3 Nyala' : 'Instrumen Nyala'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Soundtrack Bar: Sal Priadi - Kita Usahakan Rumah Itu */}
          <div className="pt-4 border-t border-[#34283D]/8 flex flex-col gap-3">
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#635571]">
              <Music
                className="w-4 h-4 text-[#D95D78] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-[#2D2338]">
                  Lagu Latar: &ldquo;Kita Usahakan Rumah Itu&rdquo; — Sal Priadi
                </p>
                <p className="text-xs text-[#635571] mt-0.5">
                  {customAudioName
                    ? `File terpasang: ${customAudioName}`
                    : 'Instrumen nada G Mayor bawaan (atau pilih file MP3 asli dari perangkat)'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                className="hidden"
                id="custom-song-upload"
              />
              <label
                htmlFor="custom-song-upload"
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#34283D]/14 bg-[#FFFBF4] hover:bg-[#F5EFFA] text-xs font-medium text-[#2D2338] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{customAudioUrl ? 'Ganti File MP3' : 'Pilih File MP3'}</span>
              </label>

              {customAudioUrl && (
                <button
                  type="button"
                  onClick={handleClearCustomAudio}
                  className="inline-flex items-center h-9 px-3 rounded-lg text-xs font-medium text-[#635571] hover:text-[#D95D78] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Pakai Instrumen
                </button>
              )}

              <a
                href="https://open.spotify.com/search/Sal%20Priadi%20Kita%20Usahakan%20Rumah%20Itu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-xs font-medium text-[#635571] hover:text-[#D95D78] transition-colors whitespace-nowrap"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>

              <a
                href="https://www.youtube.com/results?search_query=Sal+Priadi+Kita+Usahakan+Rumah+Itu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-xs font-medium text-[#635571] hover:text-[#D95D78] transition-colors whitespace-nowrap"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
