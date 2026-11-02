import React from 'react';
import { Heart, Flower2, Sparkles, ArrowUp } from 'lucide-react';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-rose-200/60 bg-gradient-to-b from-rose-50/20 via-pink-50/50 to-rose-100/60 pt-16 pb-24 text-center px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-rose-200 flex items-center justify-center mx-auto text-rose-500">
          <Heart className="w-5 h-5 fill-rose-400 text-rose-500" />
        </div>

        <h3 className="font-script-vibes text-4xl sm:text-5xl text-rose-600">
          Happy Birthday, Suzana Azad
        </h3>

        <p className="font-serif-cormorant text-xl sm:text-2xl text-slate-700 italic max-w-xl mx-auto leading-relaxed">
          &ldquo;May the year ahead bring as much warmth, peace, and pure magic to your days as you bring to everyone lucky enough to know you.&rdquo;
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => triggerBirthdayConfetti()}
            className="px-5 py-2 rounded-full bg-rose-200/70 hover:bg-rose-300 text-rose-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>More Confetti</span>
          </button>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-white hover:bg-rose-50 text-slate-600 text-xs font-medium border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

        <div className="pt-8 border-t border-rose-200/40 text-[11px] text-slate-400">
          Dedicated with wholehearted affection for Suzana Azad • 25th September
        </div>
      </div>
    </footer>
  );
};
