"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryBySlug } from "@/lib/category-metadata";
import { 
  getGalleryPhotos, 
  saveGalleryPhoto, 
  deleteGalleryPhoto, 
  updateGalleryPhoto, 
  GalleryPhoto 
} from "@/lib/gallery-storage";
import { 
  ArrowLeft, Search, Calendar, Filter, Upload, Trash2, Edit, X, 
  ChevronLeft, ChevronRight, Download, Share2, Camera, Lock
} from "lucide-react";

export default function CategoryGalleryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug) || { 
    slug, 
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
    description: "Event highlights and moments.",
    icon: "Image",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200"
  };

  // State
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "featured" | "recent">("all");

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<GalleryPhoto | null>(null);
  const [uploadData, setUploadData] = useState({ title: "", base64: "", featured: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch photos
  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getGalleryPhotos(slug);
      setPhotos(data);
    } catch (e) {
      console.error("Failed to load photos", e);
    }
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  // Admin Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        if (!isAdmin) setShowAdminLogin(true);
        else setIsAdmin(false); // Toggle off if already admin
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "IST-admin-2k26") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  // File Upload Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadData(prev => ({ ...prev, base64: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.base64) return alert("Please select an image");
    
    const newPhoto: GalleryPhoto = {
      id: Date.now().toString(),
      category: slug,
      title: uploadData.title || "Untitled",
      imageUrl: uploadData.base64,
      featured: uploadData.featured,
      timestamp: Date.now()
    };

    await saveGalleryPhoto(newPhoto);
    setShowUploadModal(false);
    setUploadData({ title: "", base64: "", featured: false });
    loadPhotos();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showEditModal) {
      await updateGalleryPhoto(showEditModal.id, { 
        title: showEditModal.title, 
        featured: showEditModal.featured 
      });
      setShowEditModal(null);
      loadPhotos();
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this photo?")) {
      await deleteGalleryPhoto(id);
      loadPhotos();
    }
  };

  // Filtering
  const filteredPhotos = photos.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === "featured") return p.featured;
    return true;
  });

  const displayedPhotos = filterMode === "recent" 
    ? [...filteredPhotos].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10)
    : filteredPhotos;

  return (
    <div className="min-h-screen bg-[#071120] text-white">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={category.image} alt={category.title} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-[#071120]/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft size={20} /> Back to Galleries
          </button>
          
          <h1 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 uppercase tracking-tight">
            {category.title}
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg mb-8">
            {category.description}
          </p>

          {/* Analytics Header */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex flex-col backdrop-blur-md">
              <span className="text-3xl font-bold text-[#6BE6FF]">{photos.length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Photos</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex flex-col backdrop-blur-md">
              <span className="text-3xl font-bold text-purple-400">{photos.filter(p=>p.featured).length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Featured</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex flex-col backdrop-blur-md">
              <span className="text-3xl font-bold text-emerald-400">2026</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Latest Activity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="container mx-auto px-4 py-8 sticky top-0 z-40 bg-[#071120]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search photos..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#0F1F35] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#6BE6FF] transition-colors"
              />
            </div>
            <div className="flex bg-[#0F1F35] border border-white/10 rounded-full p-1">
              {(["all", "featured", "recent"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${filterMode === mode ? "bg-[#6BE6FF] text-black" : "text-gray-400 hover:text-white"}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {isAdmin && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all uppercase tracking-wider text-sm cursor-pointer w-full md:w-auto justify-center"
            >
              <Upload size={16} /> Add Photo
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-t-2 border-[#6BE6FF] border-solid rounded-full animate-spin"></div>
          </div>
        ) : displayedPhotos.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {displayedPhotos.map((photo, index) => (
              <motion.div 
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden bg-[#0F1F35] border border-white/5"
                onClick={() => setLightboxIndex(index)}
              >
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold truncate">{photo.title}</h3>
                  <p className="text-xs text-gray-400">{new Date(photo.timestamp).toLocaleDateString()}</p>
                </div>

                {/* Admin Actions */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowEditModal(photo); }}
                      className="bg-blue-500/80 p-2 rounded-lg hover:bg-blue-500 text-white"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(photo.id, e)}
                      className="bg-red-500/80 p-2 rounded-lg hover:bg-red-500 text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                
                {photo.featured && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold px-2 py-1 rounded shadow-lg text-white">
                    FEATURED
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Camera size={64} className="text-gray-700 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No photos found</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              {searchQuery ? "Try adjusting your search or filters." : "This gallery is currently empty. Check back later for updates from our events."}
            </p>
            {isAdmin && (
              <button 
                onClick={() => setShowUploadModal(true)}
                className="text-[#6BE6FF] border border-[#6BE6FF]/30 px-6 py-2 rounded-full hover:bg-[#6BE6FF]/10 transition-colors"
              >
                Upload First Photo
              </button>
            )}
          </div>
        )}
      </div>

      {/* --- MODALS --- */}

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="w-full max-w-sm bg-[#0F1F35] border border-white/10 rounded-2xl p-6 relative">
              <button onClick={() => setShowAdminLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={20}/></button>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Lock className="text-purple-400"/> Admin Unlock</h2>
              
              {/* Security Warning Comment */}
              <div className="text-xs text-yellow-500/80 bg-yellow-500/10 p-2 rounded mb-6 font-mono">
                // Frontend-only mock admin system.<br/>
                // Replace with backend authentication before production deployment.
              </div>

              <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                <input 
                  type="password" 
                  autoFocus
                  placeholder="Enter Password" 
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  className="bg-[#071120] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                />
                <button type="submit" className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-lg cursor-pointer">
                  Unlock Access
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && isAdmin && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-[#0F1F35] border border-white/10 rounded-2xl p-6 relative">
              <button onClick={() => {setShowUploadModal(false); setUploadData({title:"", base64:"", featured:false})}} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={20}/></button>
              <h2 className="text-2xl font-bold mb-6 text-[#6BE6FF]">Upload Photo</h2>
              <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
                
                <div 
                  className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative ${uploadData.base64 ? 'border-transparent' : 'border-gray-600 hover:border-[#6BE6FF]'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadData.base64 ? (
                    <img src={uploadData.base64} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload size={32} className="text-gray-500 mb-2" />
                      <span className="text-gray-400">Click to browse (Max 5MB)</span>
                    </>
                  )}
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                </div>

                <input 
                  type="text" 
                  placeholder="Photo Title / Description" 
                  value={uploadData.title}
                  onChange={e => setUploadData({...uploadData, title: e.target.value})}
                  className="bg-[#071120] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6BE6FF] focus:outline-none"
                  required
                />
                
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={uploadData.featured} onChange={e => setUploadData({...uploadData, featured: e.target.checked})} className="w-4 h-4 accent-[#6BE6FF]" />
                  Mark as Featured Highlight
                </label>

                <button type="submit" className="bg-[#6BE6FF] text-[#071120] hover:bg-white font-bold py-3 rounded-lg cursor-pointer mt-2">
                  Save to Gallery
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && isAdmin && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="w-full max-w-sm bg-[#0F1F35] border border-white/10 rounded-2xl p-6 relative">
              <button onClick={() => setShowEditModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={20}/></button>
              <h2 className="text-2xl font-bold mb-6 text-white">Edit Photo Info</h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={showEditModal.title}
                  onChange={e => setShowEditModal({...showEditModal, title: e.target.value})}
                  className="bg-[#071120] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  required
                />
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input type="checkbox" checked={showEditModal.featured} onChange={e => setShowEditModal({...showEditModal, featured: e.target.checked})} className="w-4 h-4 accent-blue-400" />
                  Featured
                </label>
                <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 rounded-lg cursor-pointer mt-2">
                  Update Settings
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Preview */}
      <AnimatePresence>
        {lightboxIndex !== null && displayedPhotos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col backdrop-blur-lg"
          >
            <div className="flex justify-between items-center p-4 md:p-6 text-white absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
              <div className="text-sm font-mono text-gray-400">
                {lightboxIndex + 1} / {displayedPhotos.length}
              </div>
              <div className="flex items-center gap-4">
                <button className="hover:text-[#6BE6FF] transition-colors"><Download size={20}/></button>
                <button className="hover:text-[#6BE6FF] transition-colors"><Share2 size={20}/></button>
                <button onClick={() => setLightboxIndex(null)} className="hover:text-red-400 transition-colors ml-4"><X size={28}/></button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative px-12 md:px-24">
              <button 
                onClick={() => setLightboxIndex(prev => prev! > 0 ? prev! - 1 : displayedPhotos.length - 1)}
                className="absolute left-4 md:left-8 text-white/50 hover:text-white hover:scale-110 transition-all p-2"
              >
                <ChevronLeft size={40} />
              </button>

              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={displayedPhotos[lightboxIndex].imageUrl} 
                alt={displayedPhotos[lightboxIndex].title} 
                className="max-w-full max-h-[80vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-md"
              />

              <button 
                onClick={() => setLightboxIndex(prev => prev! < displayedPhotos.length - 1 ? prev! + 1 : 0)}
                className="absolute right-4 md:right-8 text-white/50 hover:text-white hover:scale-110 transition-all p-2"
              >
                <ChevronRight size={40} />
              </button>
            </div>

            <div className="p-6 md:p-8 text-center absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">{displayedPhotos[lightboxIndex].title}</h3>
              <p className="text-gray-400 text-sm">{new Date(displayedPhotos[lightboxIndex].timestamp).toLocaleDateString()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
