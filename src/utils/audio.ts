/**
 * Dreamy Web Audio synthesizer for Suzana's birthday background melody
 * Generates warm, crystalline music-box / harp notes with soft reverb and gentle arpeggios.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentStep: number = 0;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomAudio: boolean = false;

  private notes = [
    // Gentle lullaby romantic progression in D major / B minor:
    // "Happy Birthday" meets romantic dreamy arpeggio
    293.66, 329.63, 369.99, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99,
  ];

  private melodySequence = [
    // Step notes (frequencies in Hz)
    // Dreamy music box arpeggio melody
    { note: 293.66, dur: 0.6, delay: 0 },
    { note: 369.99, dur: 0.6, delay: 0.4 },
    { note: 440.00, dur: 0.8, delay: 0.8 },
    { note: 587.33, dur: 1.2, delay: 1.2 },

    { note: 329.63, dur: 0.6, delay: 2.0 },
    { note: 369.99, dur: 0.6, delay: 2.4 },
    { note: 493.88, dur: 0.8, delay: 2.8 },
    { note: 554.37, dur: 1.4, delay: 3.2 },

    { note: 293.66, dur: 0.5, delay: 4.2 },
    { note: 440.00, dur: 0.6, delay: 4.6 },
    { note: 587.33, dur: 0.9, delay: 5.0 },
    { note: 739.99, dur: 1.6, delay: 5.4 },

    { note: 493.88, dur: 0.6, delay: 6.4 },
    { note: 440.00, dur: 0.6, delay: 6.9 },
    { note: 369.99, dur: 0.7, delay: 7.4 },
    { note: 293.66, dur: 2.0, delay: 8.0 },
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.isCustomAudio = true;
      if (this.isPlaying) {
        this.stopSynth();
        this.customAudio.play().catch(() => {});
      }
    } else {
      this.isCustomAudio = false;
    }
  }

  public play() {
    this.init();
    this.isPlaying = true;

    if (this.isCustomAudio && this.customAudio) {
      this.customAudio.play().catch(() => {
        // fallback to synth
        this.playSynth();
      });
      return;
    }

    this.playSynth();
  }

  private playTone(freq: number, duration: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator for rich, warm bell/harp harmonic
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    // Warm envelope
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.28, time + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);

    osc1.stop(time + duration + 0.1);
    osc2.stop(time + duration + 0.1);
  }

  private playSynth() {
    if (!this.isPlaying || !this.ctx) return;

    const loopLength = 9.5;
    const now = this.ctx.currentTime;

    // Schedule current loop sequence
    this.melodySequence.forEach((item) => {
      this.playTone(item.note, item.dur, now + item.delay);
    });

    // Schedule next loop
    this.timerId = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playSynth();
      }
    }, loopLength * 1000);
  }

  private stopSynth() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynth();
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = Math.max(0, Math.min(1, vol));
    }
  }

  public playChime() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - high C
    chimeNotes.forEach((freq, idx) => {
      this.playTone(freq, 1.2, now + idx * 0.12);
    });
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
