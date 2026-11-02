import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flame, Cake, Send, Star, Quote, Award, Flower } from 'lucide-react';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';
import { romanticAudio } from '../utils/audio';
import { WarmWishesWall } from './WarmWishesWall';

const REASONS = [
  {
    id: '1',
    title: 'Your Radiant Smile',
    desc: 'The effortless way your smile illuminates every corner of my life. It is the purest happiness I have ever known.',
    icon: '✨',
  },
  {
    id: '2',
    title: 'Boundless Kindness',
    desc: 'Your genuine compassion and gentle soul. You treat the world with such tender care and thoughtful grace.',
    icon: '🌸',
  },
  {
    id: '3',
    title: 'My Safe Haven',
    desc: 'Beside you, every anxious thought melts away. You make everywhere feel like home, peaceful and secure.',
    icon: '🤍',
  },
  {
    id: '4',
    title: 'Laughter & Joy',
    desc: 'The shared inside jokes, the sudden bursts of giggles, and how we can talk for hours without ever running out of things to say.',
    icon: '💖',
  },
  {
    id: '5',
    title: 'Grace & Strength',
    desc: 'The quiet resilience and poise you possess. Watching you navigate life with grace inspires me more than words can express.',
    icon: '🌷',
  },
  {
    id: '6',
    title: 'Simply Being You',
    desc: 'Out of all the billions of people on Earth, there is only one Suzana Azad. You are utterly irreplaceable.',
    icon: '🌹',
  },
];

export const HeartfeltNoteSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setWishMade(true);
    triggerBirthdayConfetti();
    romanticAudio.playChime();
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section id="heartfelt-section" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto space-y-20">
      {/* Intimate Letter Header */}
      <div className="bg-gradient-to-b from-white/90 via-rose-50/40 to-pink-50/60 rounded-3xl p-6 sm:p-12 border border-rose-200/80 shadow-lg shadow-rose-100/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            A Heartfelt Confession
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-slate-800 mb-3">
            To Suzana, The Most Incredible Person
          </h2>
          <p className="text-xs sm:text-sm text-rose-600 font-medium">
            Every word penned with sincerity, gratitude, and unending admiration
          </p>
        </div>

        {/* Elegant Letter Body */}
        <div className="relative font-serif-cormorant text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed max-w-3xl mx-auto space-y-5 px-2 sm:px-6">
          <Quote className="w-10 h-10 text-rose-300 -mb-4 opacity-50" />
          <p>
            If there is one truth I want you to carry in your heart today and every day after, it is this: <span className="font-semibold text-rose-900 underline decoration-rose-200 decoration-2">you are the most remarkable human being I have ever known.</span>
          </p>
          <p>
            The world can be loud and fast, but whenever you are near, everything softens into peace. Your smile has carried me through quiet shadows, and your kindness continues to remind me how beautiful this journey of life can be.
          </p>
          <p>
            On your birthday this 25th of September, I wish for you unmeasured joy, endless laughter, and a path paved with gentle wonders. Thank you for simply existing as Suzana Azad.
          </p>
          <div className="pt-4 text-right">
            <p className="font-script-vibes text-3xl sm:text-4xl text-rose-700">
              Forever your biggest supporter & friend ❤️
            </p>
          </div>
        </div>
      </div>

      {/* 6 Reasons Why Suzana is Incomparable */}
      <div>
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold block mb-1">
            Endless Gratitude
          </span>
          <h3 className="text-2xl sm:text-4xl font-serif-cormorant font-bold text-slate-800 mb-2">
            Why You Are Incomparable
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Just a few of the infinite reasons you hold the most precious place in my world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, idx) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="bg-white/85 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-rose-50 flex items-center justify-center text-xl mb-4 border border-rose-200/50">
                  {reason.icon}
                </div>
                <h4 className="font-serif-cormorant font-bold text-xl text-slate-800 mb-2">
                  {reason.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Birthday Cake & Make a Wish */}
      <div className="bg-gradient-to-tr from-rose-100/90 via-pink-100/60 to-purple-100/80 rounded-3xl p-6 sm:p-12 border border-rose-200 text-center shadow-lg relative overflow-hidden">
        <div className="max-w-md mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-rose-700 text-xs font-semibold mb-3">
            <Cake className="w-3.5 h-3.5 text-rose-500" />
            Make a Birthday Wish
          </span>

          <h3 className="text-2xl sm:text-4xl font-serif-cormorant font-bold text-slate-800 mb-2">
            Blow the Candles for Suzana!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-8 font-light">
            Close your eyes, hold a secret wish in your heart, and tap the cake to blow out the candles.
          </p>

          {/* Illustrated Interactive Cake */}
          <div className="relative inline-block my-4 select-none">
            {/* Candles with animated flames */}
            <div className="flex justify-center gap-5 sm:gap-7 mb-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Flame */}
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.15, 0.9, 1] }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ repeat: Infinity, duration: 1.2 + i * 0.2 }}
                        className="w-3.5 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[0.5px] shadow-sm shadow-amber-300 cursor-pointer"
                        title="Click to blow candle"
                        onClick={handleBlowCandles}
                      />
                    ) : (
                      /* Smoke puff */
                      <motion.div
                        initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -20, scale: 1.5 }}
                        transition={{ duration: 1.5 }}
                        className="w-2 h-4 text-[10px] text-slate-400 italic"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle Wick & Body */}
                  <div className="w-0.5 h-1.5 bg-slate-700" />
                  <div className="w-3 h-9 bg-gradient-to-b from-rose-200 to-pink-300 rounded-t-sm border border-rose-300 shadow-sm" />
                </div>
              ))}
            </div>

            {/* Top Tier */}
            <div className="w-36 sm:w-44 h-12 mx-auto bg-gradient-to-b from-white via-rose-50 to-pink-100 rounded-2xl border border-rose-200 shadow-md relative flex items-center justify-center">
              <span className="text-[10px] tracking-wider text-rose-400 font-semibold uppercase">
                Happy 25th Sep
              </span>
              <div className="absolute -bottom-1 left-2 right-2 h-2 bg-pink-300/40 rounded-full blur-xs" />
            </div>

            {/* Bottom Tier */}
            <div className="w-48 sm:w-60 h-16 mx-auto bg-gradient-to-b from-pink-100 via-rose-100 to-rose-200 rounded-3xl border border-rose-300 shadow-lg relative flex items-center justify-center -mt-1">
              <span className="font-script-vibes text-xl sm:text-2xl text-rose-700">
                Suzana Azad
              </span>
            </div>

            {/* Plate Stand */}
            <div className="w-56 sm:w-72 h-3 bg-amber-100/90 rounded-full mx-auto shadow-md border border-amber-200 -mt-0.5" />
          </div>

          <div className="mt-6">
            {candlesLit ? (
              <button
                onClick={handleBlowCandles}
                className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-md shadow-rose-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-200" />
                <span>Make a Wish & Blow Out Candles</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <p className="text-base sm:text-lg font-serif-cormorant font-bold text-rose-800">
                  ✨ The candles are blown! May your deepest wishes come true, Suzana! ✨
                </p>
                <button
                  onClick={handleRelight}
                  className="px-4 py-1.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold transition-colors"
                >
                  Relight Candles & Wish Again
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Warm Wishes & Messages Wall */}
      <WarmWishesWall />
    </section>
  );
};
