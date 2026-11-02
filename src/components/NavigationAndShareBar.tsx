import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Share2, Sparkles, Flower2, Check, Copy, Music, Gift, Stars } from 'lucide-react';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';

export const NavigationAndShareBar: React.FC<{
  drizzleActive: boolean;
  onToggleDrizzle: () => void;
  petalsActive: boolean;
  onTogglePetals: () => void;
}> = ({ drizzleActive, onToggleDrizzle, petalsActive, onTogglePetals }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    triggerBirthdayConfetti();
    const shareData = {
      title: 'Happy Birthday Suzana Azad 💖',
      text: 'A heartfelt tribute celebrating the most incredible person, Suzana Azad, on September 25th! 🌸✨',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to copy if cancelled or unsupported
      }
    }

    // Fallback: Copy link
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/75 border-b border-rose-100/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          {/* Logo / Monogram */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center font-serif-cormorant font-bold text-lg shadow-sm group-hover:rotate-12 transition-transform">
              SA
            </div>
            <div>
              <span className="font-serif-cormorant font-bold text-slate-800 text-lg leading-tight block">
                Suzana Azad
              </span>
              <span className="text-[10px] text-rose-500 font-medium block">
                September 25th
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => scrollTo('countdown-section')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Countdown
            </button>
            <button
              onClick={() => scrollTo('birthday-card-section')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Digital Card
            </button>
            <button
              onClick={() => scrollTo('memories-section')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Cherished Memories
            </button>
            <button
              onClick={() => scrollTo('heartfelt-section')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Heartfelt Note
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Drizzle Toggle button */}
            <button
              onClick={onToggleDrizzle}
              className={`p-2 rounded-full border text-xs transition-colors hidden sm:flex items-center gap-1 cursor-pointer ${
                drizzleActive
                  ? 'bg-rose-100/70 border-rose-300 text-rose-700'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
              title="Toggle floating messages & emojis"
            >
              <Heart className={`w-3.5 h-3.5 ${drizzleActive ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="text-[11px] hidden lg:inline">Drizzle</span>
            </button>

            {/* Petals Toggle */}
            <button
              onClick={onTogglePetals}
              className={`p-2 rounded-full border text-xs transition-colors hidden sm:flex items-center gap-1 cursor-pointer ${
                petalsActive
                  ? 'bg-pink-100/70 border-pink-300 text-pink-700'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
              title="Toggle falling flower petals"
            >
              <Flower2 className={`w-3.5 h-3.5 ${petalsActive ? 'text-pink-500' : ''}`} />
              <span className="text-[11px] hidden lg:inline">Petals</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold shadow-sm shadow-rose-200 hover:shadow-md hover:from-rose-600 hover:to-pink-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Floating toast notification when link copied */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Birthday link copied to clipboard! Send it to Suzana 💖</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
