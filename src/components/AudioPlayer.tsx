import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles, Heart, Upload, Link2, Disc } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

export const AudioPlayer: React.FC<{
  hasEntered: boolean;
  onEnter: () => void;
}> = ({ hasEntered, onEnter }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [customTrackName, setCustomTrackName] = useState<string>("Suzana's Birthday Melody (Acoustic Chime)");
  const [customUrlInput, setCustomUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    romanticAudio.setVolume(volume);
  }, [volume]);

  const handleToggle = () => {
    const nextState = romanticAudio.toggle();
    setIsPlaying(nextState);
  };

  const handleEnterExperience = () => {
    onEnter();
    romanticAudio.play();
    setIsPlaying(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      romanticAudio.setCustomAudioUrl(objectUrl);
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
      romanticAudio.play();
      setIsPlaying(true);
      setShowSettings(false);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      romanticAudio.setCustomAudioUrl(customUrlInput.trim());
      setCustomTrackName("Suzana's Favorite Song (Custom)");
      romanticAudio.play();
      setIsPlaying(true);
      setShowSettings(false);
      setCustomUrlInput('');
    }
  };

  const handleResetToDefaultSynth = () => {
    romanticAudio.setCustomAudioUrl('');
    setCustomTrackName("Suzana's Birthday Melody (Acoustic Chime)");
    romanticAudio.play();
    setIsPlaying(true);
    setShowSettings(false);
  };

  return (
    <>
      {/* Intimate Welcome Curtain / Tap-to-Enter for Autoplay compliance */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/35 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-gradient-to-b from-white via-rose-50/90 to-pink-50/90 border border-rose-200/90 rounded-3xl p-6 sm:p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />

              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-rose-200 to-pink-100 flex items-center justify-center text-rose-600 shadow-inner border border-rose-300/40 animate-pulse-soft">
                <Music className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
              </div>

              <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold mb-2 block">
                A Special Dedication
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif-cormorant font-bold text-slate-800 mb-2">
                For Suzana Azad
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-light mb-6 leading-relaxed">
                Step into a world crafted with cherished memories, soft blossoms, and deep affection for the most incredible person.
              </p>

              <button
                onClick={handleEnterExperience}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium shadow-lg shadow-rose-300/60 hover:shadow-rose-400/70 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform" />
                <span>Enter & Play Favorite Song</span>
              </button>

              <p className="text-[11px] text-slate-400 mt-3 font-light">
                Tap anywhere to unlock ambient music & confetti
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Dock */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <div className="bg-white/85 backdrop-blur-md border border-rose-200/80 shadow-lg shadow-rose-200/40 rounded-full pl-2 pr-3.5 py-1.5 flex items-center gap-2 text-slate-700 transition-all hover:shadow-xl">
          <button
            onClick={handleToggle}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          <div
            className="cursor-pointer select-none max-w-[130px] sm:max-w-[200px]"
            onClick={() => setShowSettings(!showSettings)}
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {customTrackName}
              </p>
            </div>
            <p className="text-[10px] text-rose-500 flex items-center gap-1">
              <Disc className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlaying ? 'Now Playing' : 'Paused • Tap to configure'}</span>
            </p>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
            title="Music Settings"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Music Settings Dropdown Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-14 right-0 w-72 sm:w-80 bg-white/95 backdrop-blur-lg border border-rose-200/90 rounded-2xl p-4 shadow-xl text-xs space-y-3.5 z-50"
            >
              <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-rose-500" />
                  Suzana&apos;s Song Player
                </span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Volume Slider */}
              <div>
                <div className="flex justify-between text-slate-500 mb-1">
                  <span>Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-rose-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Upload or Custom Song */}
              <div className="pt-1 border-t border-rose-100/60 space-y-2">
                <p className="text-slate-600 font-medium">Set Her Exact Favorite Song:</p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/70 rounded-xl transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Audio</span>
                  </button>
                  <button
                    onClick={handleResetToDefaultSynth}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>Lofi Chime</span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <form onSubmit={handleApplyCustomUrl} className="flex gap-1.5 pt-1">
                  <input
                    type="url"
                    placeholder="Or paste direct MP3 link..."
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50/40 text-[11px] focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 bg-rose-500 text-white rounded-xl text-[11px] font-medium hover:bg-rose-600"
                  >
                    Apply
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
