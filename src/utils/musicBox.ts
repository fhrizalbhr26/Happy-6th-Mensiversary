// Web Audio API romantic acoustic piano & music-box accompaniment
// Arranged in G Major (G - C - Am7 - D) at ~94 BPM, inspired by "Kita Usahakan Rumah Itu" — Sal Priadi.
// Zero external audio dependencies; respects mute state cleanly.

interface ChordStep {
  bassHz: number;
  notesHz: number[];
}

class MusicBoxAudio {
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private isMuted = true;
  private step = 0;

  // 4-bar G Major progression: G -> C -> Am7 -> D (~94 BPM, 8th-note steps ~319ms)
  private readonly sequence: ChordStep[] = [
    // Bar 1: G Major (G2 bass + G4, B4, D5, G5)
    { bassHz: 98.0, notesHz: [392.0] },
    { bassHz: 0, notesHz: [493.88] },
    { bassHz: 0, notesHz: [587.33] },
    { bassHz: 0, notesHz: [783.99] },
    { bassHz: 196.0, notesHz: [587.33] },
    { bassHz: 0, notesHz: [493.88] },
    { bassHz: 0, notesHz: [659.25] },
    { bassHz: 0, notesHz: [587.33] },

    // Bar 2: C Major (C3 bass + C4, E4, G4, E5)
    { bassHz: 130.81, notesHz: [392.0] },
    { bassHz: 0, notesHz: [523.25] },
    { bassHz: 0, notesHz: [659.25] },
    { bassHz: 0, notesHz: [783.99] },
    { bassHz: 196.0, notesHz: [659.25] },
    { bassHz: 0, notesHz: [523.25] },
    { bassHz: 0, notesHz: [587.33] },
    { bassHz: 0, notesHz: [523.25] },

    // Bar 3: Am7 (A2 bass + E4, G4, C5, E5)
    { bassHz: 110.0, notesHz: [392.0] },
    { bassHz: 0, notesHz: [440.0] },
    { bassHz: 0, notesHz: [523.25] },
    { bassHz: 0, notesHz: [659.25] },
    { bassHz: 164.81, notesHz: [587.33] },
    { bassHz: 0, notesHz: [523.25] },
    { bassHz: 0, notesHz: [493.88] },
    { bassHz: 0, notesHz: [440.0] },

    // Bar 4: D Major (D3 bass + F#4, A4, D5, A4)
    { bassHz: 146.83, notesHz: [369.99] },
    { bassHz: 0, notesHz: [440.0] },
    { bassHz: 0, notesHz: [587.33] },
    { bassHz: 0, notesHz: [659.25] },
    { bassHz: 220.0, notesHz: [587.33] },
    { bassHz: 0, notesHz: [493.88] },
    { bassHz: 0, notesHz: [440.0] },
    { bassHz: 0, notesHz: [392.0] },
  ];

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private playTone(
    freq: number,
    duration: number,
    gainLevel: number,
    warmth = false,
  ) {
    if (!this.ctx || this.isMuted || freq <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    osc.type = warmth ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);
    overtoneGain.gain.setValueAtTime(warmth ? 0.08 : 0.14, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration + 0.05);
    overtone.stop(now + duration + 0.05);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.ensureContext();
      this.startLoop();
    } else {
      this.stopLoop();
    }
  }

  public startLoop() {
    if (this.isMuted || this.intervalId !== null) return;
    this.ensureContext();
    this.triggerCurrentStep();

    // ~94 BPM eighth-note pulse (~319ms)
    this.intervalId = window.setInterval(() => {
      if (this.isMuted) return;
      this.triggerCurrentStep();
    }, 319);
  }

  private triggerCurrentStep() {
    const current = this.sequence[this.step % this.sequence.length];
    if (current.bassHz > 0) {
      this.playTone(current.bassHz, 1.35, 0.032, true);
    }
    current.notesHz.forEach((n) => this.playTone(n, 0.85, 0.038, false));
    this.step++;
  }

  public stopLoop() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public playSparkleChime() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playTone(587.33, 0.45, 0.028, false);
    window.setTimeout(() => this.playTone(783.99, 0.6, 0.026, false), 110);
  }
}

export const musicBox = new MusicBoxAudio();
