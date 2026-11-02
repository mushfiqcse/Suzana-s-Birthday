import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flower2, Gift, Stars } from 'lucide-react';

interface DrizzleItem {
  id: number;
  text?: string;
  emoji?: string;
  left: number; // percentage 5% - 90%
  duration: number; // seconds
  delay: number;
  size: 'sm' | 'md' | 'lg';
  type: 'message' | 'emoji';
  color: string;
}

const MESSAGES = [
  'Happy Birthday Suzana! 💖',
  'The most incredible person in my life ✨',
  'September 25th 🌸',
  'You are pure magic 💫',
  'My favorite person in the entire world 💌',
  'Radiant, kind & irreplaceable 🌷',
  'Forever grateful for your warmth 🌹',
  'Wishing you endless joy & blessings 🎂',
  'To the girl who has my whole heart 💕',
  'May every dream of yours bloom ✨',
  'Your smile lights up every room 🌸',
  'Always & forever, Suzana 💖',
];

const EMOJIS = ['💖', '🌸', '✨', '🎂', '💌', '🌹', '💕', '🌷', '💫', '🤍', '🎉', '🦋', '🧸'];

const COLORS = [
  'bg-rose-100/80 text-rose-800 border-rose-200/80 shadow-rose-200/50',
  'bg-pink-100/80 text-pink-800 border-pink-200/80 shadow-pink-200/50',
  'bg-purple-100/80 text-purple-800 border-purple-200/80 shadow-purple-200/50',
  'bg-amber-100/80 text-amber-800 border-amber-200/80 shadow-amber-200/50',
  'bg-emerald-50/80 text-emerald-800 border-emerald-200/80 shadow-emerald-200/50',
];

export const DrizzlingLoveStream: React.FC<{
  active?: boolean;
}> = ({ active = true }) => {
  const [items, setItems] = useState<DrizzleItem[]>([]);

  useEffect(() => {
    if (!active) {
      setItems([]);
      return;
    }

    // Generate stream of drizzle items
    const generated: DrizzleItem[] = [];
    const count = window.innerWidth < 768 ? 14 : 26;

    for (let i = 0; i < count; i++) {
      const isMessage = i % 3 === 0;
      const text = isMessage ? MESSAGES[Math.floor(Math.random() * MESSAGES.length)] : undefined;
      const emoji = !isMessage ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : undefined;

      generated.push({
        id: i,
        text,
        emoji,
        left: Math.floor(Math.random() * 86) + 4, // 4% to 90%
        duration: Math.random() * 10 + 12, // 12s - 22s smooth gentle drift
        delay: Math.random() * 15,
        size: isMessage ? 'md' : Math.random() > 0.5 ? 'lg' : 'md',
        type: isMessage ? 'message' : 'emoji',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    setItems(generated);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            y: -100,
            x: 0,
            opacity: 0,
            rotate: -8,
          }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, (item.id % 2 === 0 ? 30 : -30), (item.id % 2 === 0 ? -15 : 15), 0],
            opacity: [0, 0.9, 0.9, 0],
            rotate: [item.id % 2 === 0 ? -6 : 6, item.id % 2 === 0 ? 8 : -8],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{ left: `${item.left}%` }}
          className="absolute top-0 select-none cursor-default"
        >
          {item.type === 'message' ? (
            <div
              className={`px-3.5 py-1.5 rounded-full border backdrop-blur-sm text-xs md:text-sm font-medium shadow-sm whitespace-nowrap flex items-center gap-1.5 ${item.color}`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400 shrink-0" />
              <span>{item.text}</span>
            </div>
          ) : (
            <div
              className={`text-xl md:text-2xl filter drop-shadow-sm opacity-80 select-none ${
                item.size === 'lg' ? 'scale-125' : 'scale-100'
              }`}
            >
              {item.emoji}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
