import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Plus, Heart, Calendar, Sparkles, X, ChevronLeft, ChevronRight, Upload, RotateCcw, Trash2 } from 'lucide-react';
import { MemoryPhoto } from '../types';

import photo1 from '../assets/images/1.jpeg';
import photo2 from '../assets/images/2.jpeg';
import photo3 from '../assets/images/3.jpeg';
import photo4 from '../assets/images/4.jpeg';
import photo5 from '../assets/images/5.jpeg';
import photo6 from '../assets/images/6.jpeg';

// Curated 6 beautiful moments for Suzana with automatically generated titles and occasions
const INITIAL_MEMORIES: MemoryPhoto[] = [
  {
    id: '1',
    title: 'Sunlit Reverie',
    caption: 'A quiet golden hour afternoon where your warmth and gentle smile made everything else fade into the background.',
    imageUrl: photo1,
    date: 'Golden Hour Cafe',
    tag: 'Her Radiant Smile',
  },
  {
    id: '2',
    title: 'Blossoms in Bloom',
    caption: 'Surrounded by delicate spring blossoms—your grace and sweet laughter brought every flower to life.',
    imageUrl: photo2,
    date: 'Spring Garden Stroll',
    tag: 'Sweet Moments',
  },
  {
    id: '3',
    title: 'Cozy Winter Haven',
    caption: 'Wrapped in a warm knit sweater, sharing cocoa and laughter that made the coldest day feel cozy.',
    imageUrl: photo3,
    date: 'Cozy Greenhouse Afternoon',
    tag: 'Special Days',
  },
  {
    id: '4',
    title: 'Ocean Breeze & Sunset Serenade',
    caption: 'Along the tranquil shore as sunset painted the sky in shades of gold, hair carried by the evening sea breeze.',
    imageUrl: photo4,
    date: 'Golden Hour by the Sea',
    tag: 'Her Radiant Smile',
  },
  {
    id: '5',
    title: 'Twinkling Celebration Sparklers',
    caption: 'Under glowing terrace fairy lights, holding a sparkling light to welcome your birthday season with pure joy.',
    imageUrl: photo5,
    date: 'Terrace Birthday Sparklers',
    tag: 'Special Days',
  },
  {
    id: '6',
    title: 'Blush Roses for Suzana',
    caption: 'Holding a fresh bouquet of blush roses, celebrating the most extraordinary and treasured person in my life.',
    imageUrl: photo6,
    date: 'Birthday Eve Celebration',
    tag: 'Sweet Moments',
  },
];

export const CherishedMemoriesGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(INITIAL_MEMORIES);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTag, setNewTag] = useState('Sweet Moments');
  const [newImageUrl, setNewImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load from localStorage, defaulting to the 6 curated photos
  useEffect(() => {
    const saved = localStorage.getItem('suzana_memories_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const updated = parsed.map((item: MemoryPhoto) => {
            const initialMatch = INITIAL_MEMORIES.find((im) => im.id === item.id);
            if (initialMatch && item.imageUrl?.includes('suzana_moment_')) {
              return { ...item, imageUrl: initialMatch.imageUrl };
            }
            return item;
          });
          setMemories(updated);
          return;
        }
      } catch (e) {
        console.error('Failed to parse memories', e);
      }
    }
    setMemories(INITIAL_MEMORIES);
    localStorage.setItem('suzana_memories_v3', JSON.stringify(INITIAL_MEMORIES));
  }, []);

  const saveMemories = (newMemories: MemoryPhoto[]) => {
    setMemories(newMemories);
    localStorage.setItem('suzana_memories_v3', JSON.stringify(newMemories));
  };

  const resetToOriginalGallery = () => {
    if (window.confirm('Reset gallery to the original curated photos?')) {
      setMemories(INITIAL_MEMORIES);
      localStorage.setItem('suzana_memories_v3', JSON.stringify(INITIAL_MEMORIES));
    }
  };

  const handleDeletePhoto = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = memories.filter((m) => m.id !== photoId);
    saveMemories(updated);
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;

    const newItem: MemoryPhoto = {
      id: Date.now().toString(),
      title: newTitle || 'A Beautiful Moment',
      caption: newCaption || 'A memory with Suzana that brings a smile every time.',
      imageUrl: newImageUrl,
      date: newDate || 'Cherished Time',
      tag: newTag,
    };

    saveMemories([newItem, ...memories]);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewCaption('');
    setNewDate('');
    setNewImageUrl('');
  };

  const filteredMemories =
    activeFilter === 'All'
      ? memories
      : memories.filter((m) => m.tag === activeFilter);

  const currentIndex = selectedPhoto
    ? filteredMemories.findIndex((m) => m.id === selectedPhoto.id)
    : -1;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filteredMemories.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredMemories.length) % filteredMemories.length;
    setSelectedPhoto(filteredMemories[prevIdx]);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filteredMemories.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredMemories.length;
    setSelectedPhoto(filteredMemories[nextIdx]);
  };

  const filters = ['All', 'Her Radiant Smile', 'Sweet Moments', 'Special Days'];

  return (
    <section id="memories-section" className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Cherished Memories
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-cormorant font-bold text-slate-800 mb-2">
            A Gallery of Beautiful Moments
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl font-light">
            Every snapshot tells a chapter of your radiant smile, gentle soul, and the happiness you bring into my life.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200'
                  : 'bg-white/80 hover:bg-rose-50 text-slate-600 border border-rose-200/60'
              }`}
            >
              {f}
            </button>
          ))}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="ml-auto md:ml-2 px-4 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photos of Suzana</span>
          </button>

          {memories.length > INITIAL_MEMORIES.length && (
            <button
              onClick={resetToOriginalGallery}
              title="Reset to original curated photos"
              className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrolling / Masonry Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedPhoto(photo)}
            className="bg-white rounded-3xl p-3.5 pb-5 border border-rose-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/60 transition-all cursor-pointer group flex flex-col"
          >
            {/* Polaroid Frame Image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-rose-50/70 mb-3.5 flex items-center justify-center">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                  Tap to view original photo
                </span>
              </div>

              {/* Delete button for user-added photos */}
              {!['1', '2', '3', '4', '5', '6'].includes(photo.id) && (
                <button
                  onClick={(e) => handleDeletePhoto(photo.id, e)}
                  title="Remove uploaded photo"
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-rose-600 text-slate-500 hover:text-white shadow-sm border border-slate-200 transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}

              {photo.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-semibold text-rose-700 shadow-sm border border-rose-100">
                  {photo.tag}
                </span>
              )}
            </div>

            <div className="px-1 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 text-rose-500 text-xs mb-1">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    {photo.date}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-100 group-hover:fill-rose-500 transition-colors" />
                </div>
                <h3 className="font-serif-cormorant font-bold text-xl text-slate-800 line-clamp-1 mb-1 group-hover:text-rose-600 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                  {photo.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Photo Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-rose-200 shadow-2xl relative"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-serif-cormorant font-bold text-slate-800 mb-1">
                Add a Photo of Suzana
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Upload a cherished picture or paste an image URL to immortalize the memory. Your photo will remain completely unedited in its original quality.
              </p>

              <form onSubmit={handleAddMemory} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Upload Picture or Photo File:
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/50 rounded-2xl p-4 text-center cursor-pointer transition-colors"
                  >
                    {newImageUrl ? (
                      <div className="relative h-28 w-full">
                        <img
                          src={newImageUrl}
                          alt="Preview"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover rounded-xl"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                          Change photo
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-slate-500 py-2">
                        <Upload className="w-6 h-6 text-rose-400" />
                        <span className="font-medium text-rose-600">Click to select photo</span>
                        <span className="text-[10px] text-slate-400">JPG, PNG, WEBP from your device</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Or Paste Image Link (URL):
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl.startsWith('data:') ? '' : newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Title of Memory:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., That Sunset Smile"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Warm Note / Caption:</label>
                  <textarea
                    rows={3}
                    placeholder="What made this moment with Suzana so unforgettable?"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Date / Occasion:</label>
                    <input
                      type="text"
                      placeholder="e.g. September 2025"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Tag / Category:</label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-400 text-xs"
                    >
                      <option value="Her Radiant Smile">Her Radiant Smile</option>
                      <option value="Sweet Moments">Sweet Moments</option>
                      <option value="Special Days">Special Days</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!newImageUrl}
                  className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-xl font-semibold shadow-md shadow-rose-200 transition-colors cursor-pointer mt-2"
                >
                  Save Photo Memory
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-rose-200/50 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden group">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-full object-contain"
                />

                {/* Left / Right navigation buttons */}
                {filteredMemories.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      aria-label="Previous memory"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      aria-label="Next memory"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Photo counter chip */}
                {currentIndex >= 0 && (
                  <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                    Moment {currentIndex + 1} of {filteredMemories.length}
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 bg-white">
                <div className="flex items-center justify-between text-xs text-rose-500 mb-1">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPhoto.date}
                  </span>
                  <div className="flex items-center gap-2">
                    {!['1', '2', '3', '4', '5', '6'].includes(selectedPhoto.id) && (
                      <button
                        onClick={(e) => handleDeletePhoto(selectedPhoto.id, e)}
                        className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Remove</span>
                      </button>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium">
                      {selectedPhoto.tag}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif-cormorant font-bold text-slate-800 mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
