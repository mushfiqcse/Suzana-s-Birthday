import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles, Heart, PartyPopper } from 'lucide-react';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // September is month index 8 (0-indexed: Jan=0, ..., Sep=8)
      let targetDate = new Date(currentYear, 8, 25, 0, 0, 0);

      // Check if today is September 25th
      if (now.getMonth() === 8 && now.getDate() === 25) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }

      // If target date in current year has passed, count to next year
      if (now.getTime() > targetDate.getTime()) {
        targetDate = new Date(currentYear + 1, 8, 25, 0, 0, 0);
      }

      const diff = targetDate.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="countdown-section" className="w-full max-w-3xl mx-auto px-4">
      {timeLeft.isToday ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 border border-rose-200/80 rounded-3xl p-6 sm:p-8 text-center shadow-lg shadow-rose-100/50 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-300/20 rounded-full blur-xl" />
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-pink-300/20 rounded-full blur-xl" />

          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 text-rose-700 text-xs sm:text-sm font-semibold mb-3 border border-rose-300/30">
            <PartyPopper className="w-4 h-4 text-rose-600" />
            THE SPECIAL DAY IS HERE
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif-cormorant font-bold text-rose-950 mb-2">
            ✨ It&apos;s September 25th — Happy Birthday Suzana! ✨
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base font-light mb-5">
            Today the stars shine a little brighter. May this year shower you with all the infinite happiness, love, and wonder you deserve.
          </p>
          <button
            onClick={() => triggerBirthdayConfetti()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-md shadow-rose-300/50 hover:shadow-lg hover:shadow-rose-400/50 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate with Confetti Blast</span>
          </button>
        </motion.div>
      ) : (
        <div className="bg-white/70 backdrop-blur-md border border-rose-100/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-100/60">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-rose-600 text-xs font-semibold tracking-wider uppercase mb-1">
                <Calendar className="w-4 h-4" />
                <span>Mark Your Calendar</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-cormorant font-bold text-slate-800">
                Countdown to September 25th
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Counting every precious second until Suzana&apos;s special day
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200/50">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Birthday of Suzana</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-gradient-to-b from-rose-50/70 to-pink-50/30 rounded-2xl p-3 sm:p-5 border border-rose-100/70 shadow-inner flex flex-col items-center justify-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-serif-cormorant font-bold text-rose-900 tracking-tight mb-0.5 sm:mb-1">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-600 font-semibold">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => {
                triggerBirthdayConfetti();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Tap to shower early birthday love & confetti</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
