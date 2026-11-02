import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Flower2, Gift, Send, Cake, Stars } from 'lucide-react';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';

export const HeroSection: React.FC<{
  onOpenCard: () => void;
  onScrollToMemories: () => void;
  onScrollToNotes: () => void;
}> = ({ onOpenCard, onScrollToMemories, onScrollToNotes }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 overflow-hidden text-center">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-rose-200/40 via-pink-200/30 to-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 right-10 w-44 h-44 bg-amber-100/40 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-6 left-10 w-44 h-44 bg-rose-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating flower accent icons */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:block absolute top-20 left-12 text-rose-300 pointer-events-none opacity-60"
      >
        <Flower2 className="w-12 h-12" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden sm:block absolute top-32 right-16 text-pink-300 pointer-events-none opacity-60"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Soft tag badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-rose-100 backdrop-blur-sm"
        >
          <Flower2 className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '14s' }} />
          <span>A Special Birthday Celebration • 25th September</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </motion.div>

        {/* Script & Display Headings */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script-vibes text-4xl sm:text-6xl md:text-7xl text-rose-600 mb-2 filter drop-shadow-sm"
        >
          Happy Birthday
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-cormorant font-bold text-slate-800 tracking-tight leading-tight sm:leading-none mb-6"
        >
          Suzana Azad
        </motion.h1>

        {/* Heartfelt emotional dedication */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed mb-8"
        >
         
          May your year ahead be as radiant, gentle, and utterly breathtaking as your soul.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
        >
          <button
            onClick={() => {
              triggerBirthdayConfetti();
              onOpenCard();
            }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-medium shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-white" />
            <span>Open Personalized Digital Card</span>
          </button>

          <button
            onClick={onScrollToMemories}
            className="px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-slate-700 font-medium border border-rose-200/80 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
            <span>Cherished Memories</span>
          </button>

          <button
            onClick={onScrollToNotes}
            className="px-5 py-3.5 rounded-full bg-rose-50/80 hover:bg-rose-100 text-rose-700 font-medium border border-rose-200/70 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Stars className="w-4 h-4 text-rose-500" />
            <span>A Heartfelt Note</span>
          </button>
        </motion.div>

        {/* Delicate interactive quote ribbon */}
        <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-pink-200/50 via-rose-200/50 to-purple-200/50">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm text-slate-600 flex items-center gap-2">
            <span className="text-rose-500 font-serif-cormorant text-lg italic">&ldquo;</span>
            <span className="italic">Smile! Every Moments</span>
            <span className="text-rose-500 font-serif-cormorant text-lg italic">&rdquo;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
