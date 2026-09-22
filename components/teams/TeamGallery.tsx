"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Upload, Lock } from "lucide-react";

const galleryFilters = ["All", "Events", "Teams", "Workshops", "Celebrations", "Hackathons"];

const initialGalleryData = [
  { id: 1, category: "Events", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", alt: "Tech Fest 2023" },
  { id: 2, category: "Teams", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800", alt: "Web Dev Team meeting" },
  { id: 3, category: "Workshops", src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", alt: "UI/UX Design Workshop" },
  { id: 4, category: "Hackathons", src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800", alt: "Hackathon coding session" },
  { id: 5, category: "Celebrations", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", alt: "Annual Day Celebration" },
  { id: 6, category: "Teams", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", alt: "Management Team Discussion" },
];

export default function TeamGallery() {
  const [images, setImages] = useState(initialGalleryData);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  
  // Upload states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("Events");
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredImages = images.filter(img => activeFilter === "All" || img.category === activeFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Listen for Alt + A
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowAdminAuth(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "IST-admin-2k26") {
      setIsAdmin(true);
      setShowAdminAuth(false);
      setPasswordInput("");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now(),
        category: uploadCategory,
        src: reader.result as string,
        alt: uploadAlt || "Uploaded image",
      };
      setImages([newImage, ...images]);
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadAlt("");
      setUploadCategory("Events");
    };
    reader.readAsDataURL(uploadFile);
  };

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 px-[5vw] bg-[#071120] relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center relative">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-white mb-4">
            Team <span className="text-[#6BE6FF]">Gallery</span>
          </h2>
          <p className="text-[#B8C7D9] max-w-2xl mx-auto">
            Glimpses of our events, workshops, and behind-the-scenes moments.
          </p>

          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowUploadModal(true)}
              className="mt-6 md:absolute md:right-0 md:top-0 px-6 py-2 bg-[#6BE6FF] text-[#071120] font-bold rounded-full text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(107,230,255,0.4)] transition-all flex items-center gap-2 mx-auto md:mx-0"
            >
              <Upload size={16} /> Add Photo
            </motion.button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {galleryFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${activeFilter === filter
                  ? "bg-[#6BE6FF] text-[#071120] border-[#6BE6FF] shadow-[0_0_15px_rgba(107,230,255,0.4)]"
                  : "bg-transparent text-[#B8C7D9] border-[rgba(255,255,255,0.1)] hover:border-[#6BE6FF]/50 hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group rounded-[20px] overflow-hidden aspect-[4/3] bg-[#0F1F35] border border-[rgba(255,255,255,0.05)] cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071120]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#6BE6FF] mb-1 block">
                        {img.category}
                      </span>
                      <h3 className="text-white font-medium text-sm">
                        {img.alt}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full px-4 md:px-24 h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
              />
              <div className="absolute bottom-4 text-center bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
                <p className="text-white font-medium">{filteredImages[lightboxIndex].alt}</p>
                <p className="text-gray-400 font-mono text-xs mt-1 uppercase tracking-widest">{filteredImages[lightboxIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Auth Modal */}
      <AnimatePresence>
        {showAdminAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F1F35] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setShowAdminAuth(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-[#6BE6FF]/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="text-[#6BE6FF]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Admin Unlock</h3>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  Enter the password to access gallery management.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full bg-[#071120] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6BE6FF] transition-colors"
                    autoFocus
                  />
                  {authError && (
                    <p className="text-red-400 text-xs mt-2">Incorrect password. Please try again.</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#6BE6FF] text-[#071120] font-bold py-3 rounded-lg uppercase tracking-wider hover:shadow-[0_0_15px_rgba(107,230,255,0.4)] transition-all"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F1F35] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-6">Upload Photo</h3>

              <form onSubmit={handleUploadSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full bg-[#071120] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors appearance-none"
                  >
                    {galleryFilters.filter(f => f !== "All").map(filter => (
                      <option key={filter} value={filter}>{filter}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Image File</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-8 text-center cursor-pointer hover:border-[#6BE6FF] transition-colors"
                  >
                    {uploadFile ? (
                      <span className="text-[#6BE6FF] text-sm break-all">{uploadFile.name}</span>
                    ) : (
                      <span className="text-gray-500 text-sm">Click to select an image</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Description / Alt Text</label>
                  <input
                    type="text"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    placeholder="e.g. Annual Tech Fest Day 1"
                    className="w-full bg-[#071120] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6BE6FF] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!uploadFile}
                  className="w-full bg-[#6BE6FF] text-[#071120] font-bold py-3 rounded-lg uppercase tracking-wider hover:shadow-[0_0_15px_rgba(107,230,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                >
                  Add to Gallery
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


