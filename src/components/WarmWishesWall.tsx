import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, Quote, Pause, Play, Shuffle, MessageCircleHeart, Users, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { WishMessage } from '../types';
import { CURATED_WISHES } from '../data/curatedWishes';
import { triggerBirthdayConfetti } from './PetalAndConfettiCanvas';
import { romanticAudio } from '../utils/audio';

const STORAGE_KEY = 'suzana_wishes_v4';

const QUICK_NAMES = [
  { name: 'Father', tag: 'Father', emoji: '👑' },
  { name: 'Mother', tag: 'Mother', emoji: '🌸' },
  { name: 'Sister (Bushra)', tag: 'Sister', emoji: '🧁' },
  { name: 'A Secret Admirer', tag: 'Secret Admirer', emoji: '💌' },
  { name: 'Best Friend', tag: 'Friend', emoji: '🥳' },
];

export const WarmWishesWall: React.FC = () => {
  // Load full pool of wishes
  const [wishesPool, setWishesPool] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 1) {
          const existingIds = new Set(parsed.map((p) => p.id));
          const missingCurated = CURATED_WISHES.filter((cw) => !existingIds.has(cw.id));
          return [...parsed, ...missingCurated];
        }
      } catch (e) {
        // Fallback to curated
      }
    }
    return CURATED_WISHES;
  });

  // Exactly ONE slot active at a time
  const [currentWish, setCurrentWish] = useState<WishMessage>(() => wishesPool[0] || CURATED_WISHES[0]);
  const [history, setHistory] = useState<WishMessage[]>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showAllDrawer, setShowAllDrawer] = useState<boolean>(false);

  // Form states
  const [senderName, setSenderName] = useState('');
  const [relationTag, setRelationTag] = useState('');
  const [message, setMessage] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);

  const poolRef = useRef(wishesPool);
  poolRef.current = wishesPool;

  const currentWishRef = useRef(currentWish);
  currentWishRef.current = currentWish;

  // 4-second auto-update timer showing ONE slot at a time
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const pool = poolRef.current;
      const current = currentWishRef.current;
      const candidates = pool.filter((w) => w.id !== current?.id);
      if (candidates.length === 0) return;

      const randomIndex = Math.floor(Math.random() * candidates.length);
      const nextWish = candidates[randomIndex];

      if (current) {
        setHistory((prev) => [...prev.slice(-10), current]);
      }
      setCurrentWish(nextWish);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Manual next wish
  const handleNextWish = () => {
    const pool = poolRef.current;
    const candidates = pool.filter((w) => w.id !== currentWish?.id);
    if (candidates.length === 0) return;

    const nextWish = candidates[Math.floor(Math.random() * candidates.length)];
    if (currentWish) {
      setHistory((prev) => [...prev.slice(-10), currentWish]);
    }
    setCurrentWish(nextWish);
  };

  // Manual previous wish
  const handlePrevWish = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentWish(previous);
  };

  // Add new wish from user
  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const chosenName = senderName.trim() || 'A Secret Admirer';
    const tag = relationTag || (chosenName.includes('Father') ? 'Father' : chosenName.includes('Mother') ? 'Mother' : chosenName.includes('Bushra') ? 'Sister' : 'Secret Admirer');

    const newWish: WishMessage = {
      id: `custom-${Date.now()}`,
      senderName: chosenName,
      relationTag: tag,
      message: message.trim(),
      timestamp: 'Just now',
      avatarEmoji: chosenName.includes('Father') ? '👑' : chosenName.includes('Mother') ? '🌸' : chosenName.includes('Bushra') ? '🧁' : '💌',
    };

    const updatedPool = [newWish, ...wishesPool];
    setWishesPool(updatedPool);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPool));

    // Immediately show newly submitted wish in the single slot!
    if (currentWish) {
      setHistory((prev) => [...prev.slice(-10), currentWish]);
    }
    setCurrentWish(newWish);

    triggerBirthdayConfetti();
    romanticAudio.playChime();

    setMessage('');
    setSenderName('');
    setRelationTag('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3000);
  };

  const getTagBadgeStyle = (tag?: string, name?: string) => {
    const combined = `${tag || ''} ${name || ''}`.toLowerCase();
    if (combined.includes('father')) {
      return 'bg-amber-50 text-amber-800 border-amber-200/80';
    }
    if (combined.includes('mother')) {
      return 'bg-rose-50 text-rose-700 border-rose-200/80';
    }
    if (combined.includes('sister') || combined.includes('bushra')) {
      return 'bg-pink-50 text-pink-700 border-pink-200/80';
    }
    if (combined.includes('admirer')) {
      return 'bg-purple-50 text-purple-700 border-purple-200/80';
    }
    return 'bg-slate-50 text-slate-700 border-slate-200/80';
  };

  return (
    <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-5 sm:p-10 border border-rose-100 shadow-sm relative">
      {/* Header with Live Ticker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-rose-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100/90 text-rose-800 text-[11px] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 ${isPaused ? 'hidden' : ''}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPaused ? 'bg-amber-400' : 'bg-rose-500'}`} />
              </span>
              {isPaused ? 'Updates Paused' : 'Live Anonymous Stream'}
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Updating every 4 seconds
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-cormorant font-bold text-slate-800">
            Warm Wishes for Suzana
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Loving blessings & heartfelt notes appearing one at a time from Father, Mother, Sister (Bushra), Secret Admirer, and dear friends.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume 4-second auto updates' : 'Pause updates to read'}
            className="px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={handleNextWish}
            title="Next wish now"
            className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Next</span>
          </button>

          <button
            onClick={() => setShowAllDrawer(!showAllDrawer)}
            title="Browse all wishes in the pool"
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{wishesPool.length} Pool</span>
          </button>
        </div>
      </div>

      {/* SINGLE SLOT PRESENTATION (Updates every 4 seconds) */}
      <div className="max-w-2xl mx-auto w-full mb-8">
        <div className="relative rounded-3xl p-6 sm:p-8 border border-rose-200/90 bg-gradient-to-br from-white via-rose-50/40 to-pink-50/20 shadow-md shadow-rose-100/50 overflow-hidden">
          {/* Animated 4-Second Progress Bar */}
          {!isPaused && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-rose-100 overflow-hidden">
              <motion.div
                key={currentWish?.id}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
              />
            </div>
          )}

          {/* Navigation Controls Overlay */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold bg-white/90 px-3 py-1 rounded-full border border-rose-200/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Special Wish for Suzana</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevWish}
                disabled={history.length === 0}
                title="Previous wish"
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                  history.length === 0
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-rose-200 bg-white hover:bg-rose-50 text-rose-700 cursor-pointer shadow-xs'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextWish}
                title="Next random wish"
                className="w-7 h-7 rounded-full flex items-center justify-center border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 cursor-pointer shadow-xs transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated Single Slot Card Content */}
          <AnimatePresence mode="wait">
            {currentWish ? (
              <motion.div
                key={currentWish.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Wisher Header info */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-rose-200 flex items-center justify-center text-2xl shrink-0">
                      {currentWish.avatarEmoji || '💌'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-base sm:text-lg text-slate-800">
                          {currentWish.senderName}
                        </h4>
                        <span
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getTagBadgeStyle(
                            currentWish.relationTag,
                            currentWish.senderName
                          )}`}
                        >
                          {currentWish.relationTag || 'Blessing'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {currentWish.timestamp || 'Live blessing'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-rose-500 font-medium bg-rose-50/90 px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500/20 text-rose-500" />
                    25th September
                  </span>
                </div>

                {/* Message Body */}
                <div className="relative pl-5 pr-2 py-3 bg-white/70 backdrop-blur-xs rounded-2xl border border-rose-100/80 shadow-xs">
                  <Quote className="w-6 h-6 text-rose-300/40 absolute top-2 left-1.5 pointer-events-none" />
                  <p className="text-base sm:text-lg text-slate-700 font-serif-cormorant leading-relaxed italic">
                    "{currentWish.message}"
                  </p>
                </div>

                {/* Card Sub-Footer */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>To: Suzana Azad</span>
                  <span className="text-rose-500/80 font-medium">
                    {isPaused ? 'Paused' : 'Updates automatically in 4s'}
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Form to submit a new wish anonymously or as family */}
      <div className="bg-rose-50/60 rounded-2xl p-4 sm:p-6 border border-rose-200/70 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageCircleHeart className="w-4 h-4 text-rose-600" />
            <h4 className="text-sm font-semibold text-slate-800">
              Add Your Own Birthday Blessing
            </h4>
          </div>
          {justSubmitted && (
            <span className="text-xs text-rose-600 font-semibold flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full shadow-xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Showing in slot now!
            </span>
          )}
        </div>

        {/* Quick Identity Chips */}
        <div className="mb-3">
          <label className="block text-[11px] text-slate-500 mb-1.5">
            Quick identity (or type below):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_NAMES.map((q) => (
              <button
                key={q.name}
                type="button"
                onClick={() => {
                  setSenderName(q.name);
                  setRelationTag(q.tag);
                }}
                className={`px-2.5 py-1 rounded-full text-xs border transition-all cursor-pointer flex items-center gap-1 ${
                  senderName === q.name
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                    : 'bg-white hover:bg-rose-50 text-slate-600 border-rose-200/80'
                }`}
              >
                <span>{q.emoji}</span>
                <span>{q.name}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleAddWish} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              placeholder="Your Name (e.g. Father, Mother, Sister, Secret Admirer)..."
              value={senderName}
              onChange={(e) => {
                setSenderName(e.target.value);
                setRelationTag('');
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-slate-400"
            />
            <input
              type="text"
              placeholder="Relation / Tag (optional: Sister, Father, Admirer...)"
              value={relationTag}
              onChange={(e) => setRelationTag(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Write a sweet birthday wish for Suzana..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-rose-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-rose-200 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Wish</span>
            </button>
          </div>
        </form>
      </div>

      {/* Expandable All Wishes Pool Drawer */}
      {showAllDrawer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-rose-100 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-serif-cormorant font-bold text-slate-800">
              Full Pool of Blessings & Wishes ({wishesPool.length})
            </h4>
            <span className="text-[11px] text-slate-400">
              Cycling every 4 seconds into the spotlight
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {wishesPool.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => {
                  setCurrentWish(item);
                  setIsPaused(true);
                }}
                className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-all cursor-pointer ${
                  currentWish?.id === item.id
                    ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-200'
                    : 'bg-white hover:bg-rose-50/40 border-rose-100 text-slate-700'
                }`}
              >
                <span className="text-base shrink-0">{item.avatarEmoji || '💌'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-semibold text-slate-800 truncate">
                      {item.senderName}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full border ${getTagBadgeStyle(
                        item.relationTag,
                        item.senderName
                      )}`}
                    >
                      {item.relationTag || 'Blessing'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
