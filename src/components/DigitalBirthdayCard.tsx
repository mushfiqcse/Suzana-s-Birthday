import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, RotateCcw, Edit3, Check, Gift } from 'lucide-react';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';
import { romanticAudio } from '../utils/audio';

const DEFAULT_CARD_MESSAGE = `Dearest Suzana,

On this beautiful 25th of September, the universe gifted this world the most extraordinary soul.

You are the most incredible. Every smile of yours has the power to enlight. Thank You for Everything...

May this new year of your life bring you all the laughter, peace, dreams fulfilled, and gentle miracles your pure heart deserves.

Forever celebrating you,`;

export const DigitalBirthdayCard: React.FC<{
  isOpenDirectly?: boolean;
}> = ({ isOpenDirectly = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cardMessage, setCardMessage] = useState(DEFAULT_CARD_MESSAGE);
  const [signature, setSignature] = useState('With all my love & devotion ❤️');

  useEffect(() => {
    const savedMsg = localStorage.getItem('suzana_card_message');
    const savedSig = localStorage.getItem('suzana_card_signature');
    if (savedMsg) setCardMessage(savedMsg);
    if (savedSig) setSignature(savedSig);
  }, []);

  useEffect(() => {
    if (isOpenDirectly && !isOpen) {
      setIsOpen(true);
    }
  }, [isOpenDirectly]);

  const handleOpenCard = () => {
    setIsOpen(true);
    triggerBirthdayConfetti();
    romanticAudio.playChime();
  };

  const handleSaveEdit = () => {
    localStorage.setItem('suzana_card_message', cardMessage);
    localStorage.setItem('suzana_card_signature', signature);
    setIsEditing(false);
  };

  return (
    <section id="birthday-card-section" className="py-16 sm:py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/70 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Gift className="w-3.5 h-3.5 text-pink-500" />
          Intimate Keepsake
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-slate-800 mb-2">
         Birthday Card
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto font-light">
          envelope made just for Suzana. Tap to open and reveal
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px]">
        {/* Closed Envelope State */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpenCard}
            className="w-full max-w-md bg-gradient-to-tr from-rose-100 via-pink-50 to-amber-50 p-8 sm:p-12 rounded-3xl border border-rose-200/90 shadow-xl shadow-rose-200/40 cursor-pointer text-center relative overflow-hidden group transition-all"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Faux Envelope Flap Lines */}
            <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-rose-200/50 bg-rose-50/40" />

            {/* Wax Seal */}
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 shadow-lg shadow-rose-400/60 flex items-center justify-center text-white border-2 border-amber-200/80 group-hover:rotate-6 transition-transform">
              <span className="font-serif-cormorant text-2xl sm:text-3xl font-bold tracking-tighter">
                S
              </span>
              <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200 absolute -bottom-1 right-3" />
            </div>

            <h3 className="relative z-10 text-xl sm:text-2xl font-serif-cormorant font-bold text-slate-800 mb-1">
              For Suzana Azad
            </h3>
            <p className="relative z-10 text-xs sm:text-sm text-rose-600 font-medium mb-4">
              September 25th Edition • Sealed with Love
            </p>

            <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-rose-700 text-xs font-semibold shadow-sm border border-rose-200 group-hover:bg-rose-500 group-hover:text-white transition-all">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tap to Break Seal & Open Card</span>
            </div>
          </motion.div>
        ) : (
          /* Opened Birthday Card State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl bg-gradient-to-b from-[#fffefc] to-[#fff8f9] rounded-3xl p-6 sm:p-12 border-2 border-rose-200/80 shadow-2xl relative overflow-hidden"
          >
            {/* Elegant Floral Corner Borders */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-rose-300 rounded-tl-xl pointer-events-none opacity-60" />
            <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-rose-300 rounded-tr-xl pointer-events-none opacity-60" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-rose-300 rounded-bl-xl pointer-events-none opacity-60" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-rose-300 rounded-br-xl pointer-events-none opacity-60" />

            <div className="flex items-center justify-between mb-6 pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold">
                   Birthday Card
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1.5 text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1"
                  title="Personalize Card Text"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isEditing ? 'Cancel Edit' : 'Edit Note'}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-xs text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Close and Re-seal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Card Letter to Suzana:
                  </label>
                  <textarea
                    rows={8}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full p-4 rounded-xl border border-rose-200 bg-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-rose-300 leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Signature / Closing:
                  </label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full p-3 rounded-xl border border-rose-200 bg-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
                <button
                  onClick={handleSaveEdit}
                  className="px-5 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-semibold hover:bg-rose-600 transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Personalization</span>
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-script-vibes text-4xl sm:text-5xl text-rose-600 text-center mb-6">
                  Happy Birthday Suzana
                </h3>

                <div className="font-serif-cormorant text-lg sm:text-xl text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-normal max-w-xl mx-auto px-2 sm:px-4 text-center sm:text-left">
                  {cardMessage}
                </div>

                <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-rose-500 text-xs">
                    <Heart className="w-4 h-4 fill-rose-400" />
                    <span>September 25th • With Endless Warmth</span>
                  </div>

                  <div className="font-script-vibes text-2xl sm:text-3xl text-rose-700">
                    {signature}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
