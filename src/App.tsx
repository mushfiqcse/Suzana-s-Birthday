import React, { useState } from 'react';
import { NavigationAndShareBar } from './components/NavigationAndShareBar';
import { PetalAndConfettiCanvas, triggerBirthdayConfetti } from './components/PetalAndConfettiCanvas';
import { DrizzlingLoveStream } from './components/DrizzlingLoveStream';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { DigitalBirthdayCard } from './components/DigitalBirthdayCard';
import { CherishedMemoriesGallery } from './components/CherishedMemoriesGallery';
import { HeartfeltNoteSection } from './components/HeartfeltNoteSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [drizzleActive, setDrizzleActive] = useState(true);
  const [petalsActive, setPetalsActive] = useState(true);
  const [openCardDirectly, setOpenCardDirectly] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    triggerBirthdayConfetti();
  };

  const handleOpenCardFromHero = () => {
    setOpenCardDirectly(true);
    const el = document.getElementById('birthday-card-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffafb] via-[#fff5f6] to-[#fdf2f4] text-slate-800 relative selection:bg-rose-200 selection:text-rose-900 font-sans">
      {/* Background Interactive Ambient Effects */}
      <PetalAndConfettiCanvas enabled={petalsActive} />
      <DrizzlingLoveStream active={drizzleActive} />

      {/* Landing Song & Audio Engine */}
      <AudioPlayer hasEntered={hasEntered} onEnter={handleEnter} />

      {/* Sticky Header & Social Share Bar */}
      <NavigationAndShareBar
        drizzleActive={drizzleActive}
        onToggleDrizzle={() => setDrizzleActive(!drizzleActive)}
        petalsActive={petalsActive}
        onTogglePetals={() => setPetalsActive(!petalsActive)}
      />

      {/* Main Content Sections */}
      <main className="relative z-20 space-y-8 sm:space-y-12">
        {/* Dreamy Hero Section */}
        <HeroSection
          onOpenCard={handleOpenCardFromHero}
          onScrollToMemories={() => handleScrollTo('memories-section')}
          onScrollToNotes={() => handleScrollTo('heartfelt-section')}
        />

        {/* Countdown Timer to September 25th */}
        <CountdownTimer />

        {/* Personalized Digital Birthday Card */}
        <DigitalBirthdayCard isOpenDirectly={openCardDirectly} />

        {/* Cherished Memories Scrolling Photo Gallery */}
        <CherishedMemoriesGallery />

        {/* Heartfelt Note, Reasons Why She is Incomparable & Blow the Candles Cake */}
        <HeartfeltNoteSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
