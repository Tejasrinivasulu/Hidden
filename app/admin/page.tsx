"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import Link from "next/link";
import {
  Pencil,
  Plus,
  Upload,
  Save,
  LogOut,
  Users,
  CalendarDays,
  Images,
  UserCircle2,
  MessageSquareQuote,
  Trophy,
  Trash2,
  LayoutDashboard,
  ExternalLink,
  Menu,
  Search,
  Mail,
  ChevronDown,
  ChevronRight,
  BarChart3,
  LineChart,
  UsersRound,
  FolderOpen,
  CalendarClock,
  Briefcase,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import RoundPhotoAdjuster from "@/components/admin/RoundPhotoAdjuster";

const ACHIEVEMENT_CATEGORIES = [
  "Award",
  "Hackathon",
  "Competition",
  "Research",
  "Project",
  "Certification",
  "Workshop",
  "Leadership",
] as const;

const TABS_TOP = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "members", label: "Members", icon: Users },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: Images },
] as const;

const TEAM_ITEMS = [
  { id: "team-documentation", label: "Documentation", icon: FolderOpen },
  { id: "team-scheduling", label: "Scheduling", icon: CalendarClock },
  { id: "team-management", label: "Management", icon: Briefcase },
] as const;

const TABS_BOTTOM = [
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "profile", label: "Profile", icon: UserCircle2 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
] as const;

/** Kept out of sidebar; opened from topbar Messages */
const EXTRA_TABS = [
  { id: "messages", label: "Messages", icon: Mail },
] as const;

const ALL_TABS = [
  ...TABS_TOP,
  ...TEAM_ITEMS,
  ...TABS_BOTTOM,
  ...EXTRA_TABS,
] as const;
type TabId = (typeof ALL_TABS)[number]["id"];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const {
    isAuthenticated,
    login,
    logout,
    events,
    addEvent,
    removeEvent,
    members,
    addMember,
    updateMember,
    removeMember,
    batches,
    addBatch,
    removeBatch,
    memberStats,
    eventGallery,
    addEventPhoto,
    celebrationGallery,
    addCelebrationPhoto,
    testimonials,
    addTestimonial,
    removeTestimonial,
    achievements,
    addAchievement,
    removeAchievement,
    profile,
    updateProfile,
    contactMessages,
    removeContactMessage,
    markContactMessageRead,
  } = useAdmin();

  const router = useRouter();

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamOpen, setTeamOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    step: number;
    maxSteps: number;
    action: () => void;
  } | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [newBatchName, setNewBatchName] = useState("");
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [memberBatchFilter, setMemberBatchFilter] = useState("all");
  const [memberDeptFilter, setMemberDeptFilter] = useState("all");

  // Members
  const [memberName, setMemberName] = useState("");
  const [memberRollNo, setMemberRollNo] = useState("");
  const [memberDept, setMemberDept] = useState("");
  const [memberYear, setMemberYear] = useState("");
  const [memberMobile, setMemberMobile] = useState("");
  const [memberPhoto, setMemberPhoto] = useState("");
  const [memberPhotoDraft, setMemberPhotoDraft] = useState("");
  const [memberLinkedin, setMemberLinkedin] = useState("");
  const [memberGithub, setMemberGithub] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPosition, setMemberPosition] = useState("");
  const [memberTeamType, setMemberTeamType] = useState<"core" | "coordinator">(
    "core",
  );
  const [memberBatch, setMemberBatch] = useState("2025");
  const memberPhotoRef = useRef<HTMLInputElement>(null);

  // Event
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventPoster, setEventPoster] = useState("");
  const [eventFormLink, setEventFormLink] = useState("");
  const [eventType, setEventType] = useState<"upcoming" | "completed">(
    "upcoming",
  );
  const [eventTags, setEventTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [eventHighlights, setEventHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState("");
  const eventImageRef = useRef<HTMLInputElement>(null);

  // Gallery
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("events");
  const [galleryImageCount, setGalleryImageCount] = useState(1);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  // Profile
  const [profileForm, setProfileForm] = useState(profile);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onDoc = () => setUserMenuOpen(false);
    const t = window.setTimeout(() => {
      document.addEventListener("click", onDoc);
    }, 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("click", onDoc);
    };
  }, [userMenuOpen]);

  // Testimonials
  const [tName, setTName] = useState("");
  const [tDesc, setTDesc] = useState("");
  const [tYear, setTYear] = useState("");
  const [tBranch, setTBranch] = useState("");

  // Achievements
  const [achTitle, setAchTitle] = useState("");
  const [achCategory, setAchCategory] = useState<string>("Award");
  const [achDate, setAchDate] = useState("");
  const [achYear, setAchYear] = useState("2025");
  const [achDesc, setAchDesc] = useState("");
  const [achTeamName, setAchTeamName] = useState("");
  const [achMembers, setAchMembers] = useState("");
  const [achImage, setAchImage] = useState("");
  const [achFeatured, setAchFeatured] = useState(false);
  const achImageRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (login(pin)) setError("");
    else setError("Invalid PIN");
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setEventHighlights([...eventHighlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setEventTags([...eventTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleEventImage = async (file: File | null) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    setEventPoster(url);
  };

  const handleEventSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!eventPoster) {
      showToast("Upload an event image");
      return;
    }
    addEvent({
      name: eventTitle,
      description: eventDesc,
      date: eventDate,
      time: eventTime,
      location: eventVenue,
      poster: eventPoster,
      formLink: eventFormLink,
      type: eventType,
      tags: eventTags,
      highlights: eventHighlights,
    });
    showToast(
      eventType === "completed"
        ? "Event saved to recent events"
        : "Upcoming event posted",
    );
    setEventTitle("");
    setEventDesc("");
    setEventDate("");
    setEventTime("");
    setEventVenue("");
    setEventPoster("");
    setEventFormLink("");
    setEventTags([]);
    setEventHighlights([]);
    setEventType("upcoming");
    if (eventImageRef.current) eventImageRef.current.value = "";
    setShowEventForm(false);
  };

  const resetMemberForm = () => {
    setMemberName("");
    setMemberRollNo("");
    setMemberDept("");
    setMemberYear("");
    setMemberMobile("");
    setMemberPhoto("");
    setMemberPhotoDraft("");
    setMemberLinkedin("");
    setMemberGithub("");
    setMemberEmail("");
    setMemberPosition("");
    setMemberTeamType("core");
    setEditingMemberId(null);
    if (memberPhotoRef.current) memberPhotoRef.current.value = "";
  };

  const openAddMember = (batch: string) => {
    resetMemberForm();
    setMemberBatch(batch);
    setEditingMemberId(null);
    setShowMemberForm(true);
  };

  const openEditMember = (m: (typeof members)[number]) => {
    setEditingMemberId(m.id);
    setMemberName(m.name || "");
    setMemberRollNo(m.rollNo || "");
    setMemberDept(m.department || m.branch || "");
    setMemberYear(m.year || "");
    setMemberMobile(m.mobile || "");
    setMemberPhoto(m.photo || "");
    setMemberPhotoDraft("");
    setMemberLinkedin(m.linkedin || "");
    setMemberGithub(m.github || "");
    setMemberEmail(m.email || "");
    setMemberPosition(m.role || "");
    setMemberTeamType(m.teamType === "coordinator" ? "coordinator" : "core");
    setMemberBatch(m.batch || batches[0] || "2025");
    setShowMemberForm(true);
    if (memberPhotoRef.current) memberPhotoRef.current.value = "";
  };

  const closeMemberForm = () => {
    setShowMemberForm(false);
    resetMemberForm();
  };

  const handleMemberPhoto = async (file: File | null) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setMemberPhotoDraft(dataUrl);
  };

  const handleMemberSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: memberName,
      rollNo: memberRollNo,
      department: memberDept,
      branch: memberDept,
      year: memberYear,
      mobile: memberMobile,
      email: memberEmail,
      photo: memberPhoto,
      linkedin: memberLinkedin,
      github: memberGithub,
      batch: memberBatch,
      role: memberPosition,
      teamType: memberTeamType,
    };
    if (editingMemberId != null) {
      updateMember(editingMemberId, payload);
      showToast("Member updated");
    } else {
      addMember(payload);
      showToast("Member added");
    }
    closeMemberForm();
  };

  const handleAddBatch = () => {
    if (!newBatchName.trim()) {
      showToast("Enter a batch year");
      return;
    }
    if (addBatch(newBatchName)) {
      showToast(`Batch ${newBatchName.trim()} added`);
      setMemberBatch(newBatchName.trim());
      setNewBatchName("");
      setShowAddBatch(false);
    } else {
      showToast("Batch already exists");
    }
  };

  const handleGalleryCountChange = (raw: string) => {
    const n = Math.max(1, Math.min(20, Number(raw) || 1));
    setGalleryImageCount(n);
    setGalleryPreviews((prev) => prev.slice(0, n));
  };

  const handleGalleryFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selected = Array.from(files).slice(0, galleryImageCount);
    const urls = await Promise.all(selected.map((f) => fileToDataUrl(f)));
    setGalleryPreviews(urls);
  };

  const handleGallerySubmit = (e: FormEvent) => {
    e.preventDefault();
    const images = galleryPreviews.filter(Boolean);
    if (!galleryTitle.trim()) {
      showToast("Enter an event / gallery title");
      return;
    }
    if (images.length === 0) {
      showToast("Choose file first");
      return;
    }
    const title = galleryTitle.trim();
    images.forEach((imageUrl) => {
      const payload = {
        title,
        imageUrl,
        category: galleryCategory,
      };
      if (galleryCategory === "celebrations") addCelebrationPhoto(payload);
      else addEventPhoto(payload);
    });
    showToast(
      images.length === 1
        ? "Uploaded"
        : `${images.length} images uploaded`,
    );
    setGalleryTitle("");
    setGalleryImageCount(1);
    setGalleryPreviews([]);
    if (galleryFileRef.current) galleryFileRef.current.value = "";
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast("Profile saved");
  };

  const handleTestimonialSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTestimonial({
      name: tName,
      description: tDesc,
      year: tYear,
      branch: tBranch,
    });
    showToast("Uploaded to What They Say");
    setTName("");
    setTDesc("");
    setTYear("");
    setTBranch("");
  };

  const handleAchImage = async (file: File | null) => {
    if (!file) return;
    setAchImage(await fileToDataUrl(file));
  };

  const handleAchievementSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!achImage) {
      showToast("Upload an achievement image");
      return;
    }
    addAchievement({
      title: achTitle,
      category: achCategory,
      date: achDate,
      year: achYear,
      description: achDesc,
      teamName: achTeamName || "ISTE Team",
      teamMembers: achMembers
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      image: achImage,
      featured: achFeatured,
    });
    showToast("Achievement published");
    setAchTitle("");
    setAchCategory("Award");
    setAchDate("");
    setAchYear("2025");
    setAchDesc("");
    setAchTeamName("");
    setAchMembers("");
    setAchImage("");
    setAchFeatured(false);
    if (achImageRef.current) achImageRef.current.value = "";
  };

  const activeLabel =
    ALL_TABS.find((t) => t.id === activeTab)?.label ?? "Dashboard";

  const adminName = profile.chapterName?.split("—")[0]?.trim() || "ISTE Admin";
  const adminInitials = adminName
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("") || "IS";

  const q = searchQuery.trim().toLowerCase();
  const matchTab = (label: string) => !q || label.toLowerCase().includes(q);
  const showTop = TABS_TOP.filter((t) => matchTab(t.label));
  const showTeam = TEAM_ITEMS.filter((t) => matchTab(t.label) || matchTab("team"));
  const showBottom = TABS_BOTTOM.filter((t) => matchTab(t.label));
  const teamActive = activeTab.startsWith("team-");

  const upcomingEvents = events
    .filter((e) => e.type === "upcoming")
    .slice()
    .sort((a, b) => b.id - a.id);

  const unreadMessages = contactMessages.filter((m) => !m.read).length;

  const memberDepartments = Array.from(
    new Set(
      members
        .map((m) => m.department || m.branch || "")
        .filter(Boolean),
    ),
  ).sort();

  const filteredMembers = members.filter((m) => {
    const q = memberSearch.trim().toLowerCase();
    const hay = [
      m.name,
      m.rollNo,
      m.department || m.branch,
      m.year,
      m.mobile,
      m.batch,
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !q || hay.includes(q);
    const matchesBatch =
      memberBatchFilter === "all" || m.batch === memberBatchFilter;
    const dept = m.department || m.branch || "";
    const matchesDept =
      memberDeptFilter === "all" || dept === memberDeptFilter;
    return matchesSearch && matchesBatch && matchesDept;
  });

  const toggleMenu = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 900) {
      setSidebarOpen((v) => !v);
    } else {
      setSidebarCollapsed((v) => !v);
    }
  };

  const openLogoutModal = () => {
    setUserMenuOpen(false);
    setLogoutOpen(true);
  };

  const handleLogoutYes = () => {
    setLogoutOpen(false);
    logout();
    router.push("/");
  };

  const askConfirm = (
    title: string,
    message: string,
    action: () => void,
    maxSteps = 1,
  ) => {
    setConfirmDialog({
      title,
      message,
      step: 1,
      maxSteps,
      action,
    });
  };

  const handleConfirmYes = () => {
    if (!confirmDialog) return;
    if (confirmDialog.step < confirmDialog.maxSteps) {
      setConfirmDialog({
        ...confirmDialog,
        step: confirmDialog.step + 1,
        title: "Are you sure?",
        message:
          confirmDialog.maxSteps === 2
            ? "Please confirm again to permanently delete."
            : confirmDialog.message,
      });
      return;
    }
    const action = confirmDialog.action;
    setConfirmDialog(null);
    action();
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-dash admin-login">
        <div className="admin-card w-full max-w-md p-8 text-center mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/iste-logo-official.png"
            alt="ISTE"
            className="admin-login-logo"
          />
          <h1 className="mb-2 text-2xl font-bold text-[var(--admin-text)]">
            Admin Access
          </h1>
          <p className="admin-muted mb-6 text-sm">
            Sign in to the ISTE command center
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="admin-input text-center text-xl tracking-widest"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="admin-btn admin-btn-primary w-full py-3">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const shellClass = [
    "admin-dash admin-shell",
    sidebarOpen ? "admin-sidebar-open" : "",
    sidebarCollapsed ? "admin-sidebar-collapsed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClass}>
      {toast && <div className="admin-toast">{toast}</div>}
      {logoutOpen && (
        <div className="admin-confirm-overlay" role="dialog" aria-modal="true">
          <div className="admin-confirm-card">
            <h3>Are you sure?</h3>
            <p className="admin-muted">
              You will be logged out and returned to the home page.
            </p>
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-btn"
                onClick={() => setLogoutOpen(false)}
              >
                No
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleLogoutYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmDialog && (
        <div className="admin-confirm-overlay" role="dialog" aria-modal="true">
          <div className="admin-confirm-card">
            <h3>{confirmDialog.title}</h3>
            <p className="admin-muted">{confirmDialog.message}</p>
            {confirmDialog.maxSteps > 1 && (
              <p className="admin-muted text-xs mb-3">
                Confirmation {confirmDialog.step} of {confirmDialog.maxSteps}
              </p>
            )}
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-btn"
                onClick={() => setConfirmDialog(null)}
              >
                No
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={handleConfirmYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {photoPreview && (
        <button
          type="button"
          className="admin-confirm-overlay"
          aria-label="Close photo"
          onClick={() => setPhotoPreview(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoPreview}
            alt="Profile"
            className="admin-photo-modal-img"
            onClick={(e) => e.stopPropagation()}
          />
        </button>
      )}
      {sidebarOpen && (
        <button
          type="button"
          className="admin-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className="admin-sidebar">
        <div className="admin-profile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/iste-logo-official.png"
            alt="ISTE"
            className="admin-logo"
          />
          <div className="admin-profile-name">ISTE Student Chapter</div>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          {showTop.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={
                activeTab === id ? "admin-tab admin-tab-active" : "admin-tab"
              }
            >
              <span className="admin-tab-ico">
                <Icon size={14} />
              </span>
              {label}
            </button>
          ))}

          {(showTeam.length > 0 || !q) && (
            <>
              <button
                type="button"
                onClick={() => {
                  setTeamOpen((v) => !v);
                  if (!teamOpen && showTeam[0]) {
                    setActiveTab(showTeam[0].id);
                  }
                }}
                className={teamActive ? "admin-tab admin-tab-active" : "admin-tab"}
              >
                <span className="admin-tab-ico">
                  <UsersRound size={14} />
                </span>
                Team
                <span className="admin-tab-drop">
                  {teamOpen || teamActive ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </span>
              </button>
              {(teamOpen || teamActive) && (
                <div className="admin-subnav">
                  {showTeam.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setActiveTab(id);
                        setTeamOpen(true);
                        setSidebarOpen(false);
                      }}
                      className={
                        activeTab === id
                          ? "admin-subtab admin-subtab-active"
                          : "admin-subtab"
                      }
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {showBottom.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
                if (id === "profile") setProfileForm(profile);
              }}
              className={
                activeTab === id ? "admin-tab admin-tab-active" : "admin-tab"
              }
            >
              <span className="admin-tab-ico">
                <Icon size={14} />
              </span>
              {label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <button type="button" onClick={openLogoutModal} className="admin-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-icon-btn"
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <Menu size={20} />
            </button>
            <label className="admin-search">
              <Search size={16} />
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="admin-topbar-right">
            <button
              type="button"
              className="admin-top-link"
              onClick={() => {
                setActiveTab("messages");
                setUserMenuOpen(false);
              }}
            >
              <Mail size={16} />
              <span>Messages{unreadMessages > 0 ? ` (${unreadMessages})` : ""}</span>
            </button>
            <div className="admin-user-menu">
              <button
                type="button"
                className="admin-user-trigger"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
              >
                <span className="admin-top-user-fallback">{adminInitials}</span>
                <span className="hidden sm:inline text-sm font-medium">
                  ISTE Student Chapter
                </span>
                <ChevronDown size={14} className="opacity-80" />
              </button>
              {userMenuOpen && (
                <div className="admin-user-dropdown">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("profile");
                      setProfileForm(profile);
                      setUserMenuOpen(false);
                    }}
                  >
                    <UserCircle2 size={15} /> Profile
                  </button>
                  <button
                    type="button"
                    onClick={openLogoutModal}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="admin-main">
          {activeTab === "dashboard" && (
            <>
              <div className="admin-stat-grid-3">
                <div className="admin-card admin-stat-card">
                  <div className="admin-stat-ico">
                    <Users size={22} />
                  </div>
                  <div>
                    <div className="admin-stat-label">Total Members</div>
                    <div className="admin-stat-value">{memberStats.total}</div>
                  </div>
                </div>
                <div className="admin-card admin-stat-card">
                  <div className="admin-stat-ico">
                    <BarChart3 size={22} />
                  </div>
                  <div>
                    <div className="admin-stat-label">Total Events</div>
                    <div className="admin-stat-value">{events.length}</div>
                  </div>
                </div>
                <div className="admin-card admin-stat-card">
                  <div className="admin-stat-ico">
                    <LineChart size={22} />
                  </div>
                  <div>
                    <div className="admin-stat-label">Total Achievements</div>
                    <div className="admin-stat-value">{achievements.length}</div>
                  </div>
                </div>
              </div>

              <div className="admin-card admin-panel">
                <div className="admin-section-head">
                  <h2>Recent Activity</h2>
                  <button
                    type="button"
                    className="admin-link"
                    onClick={() => setActiveTab("events")}
                  >
                    Show All
                  </button>
                </div>
                {upcomingEvents.length === 0 ? (
                  <p className="admin-muted text-sm">
                    No upcoming events yet. Post an event to see it here.
                  </p>
                ) : (
                  <div className="admin-event-cards">
                    {upcomingEvents.map((ev) => (
                      <div key={ev.id} className="admin-card admin-event-card">
                        {ev.poster ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={ev.poster}
                            alt=""
                            className="h-28 w-full rounded-lg object-cover"
                          />
                        ) : null}
                        <h3>{ev.name}</h3>
                        <p className="admin-muted text-xs">
                          {ev.date}
                          {ev.time ? ` · ${ev.time}` : ""}
                          {ev.location ? ` · ${ev.location}` : ""}
                        </p>
                        <p className="line-clamp-2 text-sm text-[var(--admin-text)]">
                          {ev.description}
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <span className="admin-badge">Upcoming</span>
                          <button
                            type="button"
                            className="admin-detail-btn"
                            onClick={() => setActiveTab("events")}
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab !== "dashboard" && (
            <div className="admin-card admin-panel">
              <div className="admin-section-head">
                <h2>{activeLabel}</h2>
              </div>

          {/* MEMBERS */}
          {activeTab === "members" && (
            <div className="relative z-10 space-y-5">
              {showMemberForm ? (
                <form
                  onSubmit={handleMemberSubmit}
                  className="space-y-5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-elevated)] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--admin-text)]">
                        {editingMemberId != null ? "Edit Member" : "Add Member"}
                      </h3>
                      <p className="admin-muted text-sm">
                        {editingMemberId != null
                          ? "Update member details and save changes."
                          : `Add a new member to batch ${memberBatch}.`}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={closeMemberForm}
                    >
                      Back to list
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="admin-label">Name</label>
                      <input
                        className="admin-input"
                        required
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="admin-label">Roll No</label>
                      <input
                        className="admin-input"
                        required
                        value={memberRollNo}
                        onChange={(e) => setMemberRollNo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="admin-label">Branch / Department</label>
                      <input
                        className="admin-input"
                        required
                        value={memberDept}
                        onChange={(e) => setMemberDept(e.target.value)}
                        placeholder="e.g. CSE"
                      />
                    </div>
                    <div>
                      <label className="admin-label">Year</label>
                      <input
                        className="admin-input"
                        required
                        value={memberYear}
                        onChange={(e) => setMemberYear(e.target.value)}
                        placeholder="e.g. 2nd Year"
                      />
                    </div>
                    <div>
                      <label className="admin-label">Mobile No</label>
                      <input
                        className="admin-input"
                        required
                        value={memberMobile}
                        onChange={(e) => setMemberMobile(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="admin-label">Batch</label>
                      <select
                        className="admin-input"
                        value={memberBatch}
                        onChange={(e) => setMemberBatch(e.target.value)}
                      >
                        {batches.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="admin-label">Email</label>
                      <input
                        className="admin-input"
                        type="email"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        placeholder="name@iste.mbu"
                      />
                    </div>
                    <div>
                      <label className="admin-label">LinkedIn</label>
                      <input
                        className="admin-input"
                        value={memberLinkedin}
                        onChange={(e) => setMemberLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div>
                      <label className="admin-label">GitHub</label>
                      <input
                        className="admin-input"
                        value={memberGithub}
                        onChange={(e) => setMemberGithub(e.target.value)}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="admin-label">Team Type</label>
                      <select
                        className="admin-input"
                        value={memberTeamType}
                        onChange={(e) =>
                          setMemberTeamType(
                            e.target.value as "core" | "coordinator",
                          )
                        }
                      >
                        <option value="core">Core Team</option>
                        <option value="coordinator">Coordinator</option>
                      </select>
                    </div>
                    <div>
                      <label className="admin-label">Position</label>
                      <input
                        className="admin-input"
                        value={memberPosition}
                        onChange={(e) => setMemberPosition(e.target.value)}
                        placeholder="e.g. Chairperson, Technical Coordinator"
                      />
                    </div>
                    <div>
                      <label className="admin-label">Profile Photo</label>
                      <input
                        ref={memberPhotoRef}
                        type="file"
                        accept="image/*"
                        className="admin-file admin-muted block w-full text-sm"
                        onChange={(e) =>
                          handleMemberPhoto(e.target.files?.[0] ?? null)
                        }
                      />
                    </div>
                  </div>

                  {memberPhotoDraft ? (
                    <RoundPhotoAdjuster
                      src={memberPhotoDraft}
                      onApply={(cropped) => {
                        setMemberPhoto(cropped);
                        setMemberPhotoDraft("");
                        if (memberPhotoRef.current) memberPhotoRef.current.value = "";
                      }}
                      onCancel={() => {
                        setMemberPhotoDraft("");
                        if (memberPhotoRef.current) memberPhotoRef.current.value = "";
                      }}
                    />
                  ) : memberPhoto ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={memberPhoto}
                          alt=""
                          className="admin-edit-photo admin-photo-preview"
                          onClick={() => setPhotoPreview(memberPhoto)}
                        />
                      </div>
                      <button
                        type="button"
                        className="admin-btn"
                        onClick={() => setMemberPhotoDraft(memberPhoto)}
                      >
                        Adjust photo
                      </button>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    <button type="submit" className="admin-btn admin-btn-primary">
                      <Save size={16} />{" "}
                      {editingMemberId != null ? "Save Changes" : "Save Member"}
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={closeMemberForm}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="admin-batch-row">
                    <div className="admin-card admin-batch-card admin-batch-card-total">
                      <p className="admin-muted text-[0.7rem] uppercase tracking-wider">
                        Total Members
                      </p>
                      <p className="admin-stat-value">{memberStats.total}</p>
                    </div>
                    {batches.map((batch) => (
                      <div key={batch} className="admin-card admin-batch-card">
                        <p className="admin-muted text-[0.65rem] uppercase tracking-wider">
                          Batch {batch}
                        </p>
                        <p className="admin-stat-value">
                          {memberStats.byBatch[batch] ?? 0}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="admin-btn admin-btn-primary admin-btn-icon"
                            onClick={() => openAddMember(batch)}
                            aria-label={`Add member to batch ${batch}`}
                            title="Add member"
                          >
                            <span className="admin-batch-plus" aria-hidden>
                              +
                            </span>
                          </button>
                          <button
                            type="button"
                            className="admin-btn admin-btn-danger admin-btn-icon"
                            onClick={() =>
                              askConfirm(
                                "Are you sure?",
                                `Delete batch ${batch} and all its members?`,
                                () => {
                                  removeBatch(batch);
                                  showToast(`Batch ${batch} deleted`);
                                },
                                2,
                              )
                            }
                            aria-label={`Delete batch ${batch}`}
                            title="Delete batch"
                          >
                            <Trash2 size={16} strokeWidth={2.4} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="admin-add-batch">
                      {!showAddBatch ? (
                        <button
                          type="button"
                          className="admin-btn admin-btn-primary"
                          onClick={() => setShowAddBatch(true)}
                        >
                          <Plus size={16} /> Add Batch
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            className="admin-input w-28"
                            placeholder="Year"
                            value={newBatchName}
                            onChange={(e) => setNewBatchName(e.target.value)}
                          />
                          <button
                            type="button"
                            className="admin-btn admin-btn-primary"
                            onClick={handleAddBatch}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="admin-members-toolbar">
                    <label className="admin-search">
                      <Search size={16} />
                      <input
                        type="search"
                        placeholder="Search members..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                      />
                    </label>
                    <select
                      className="admin-input"
                      value={memberBatchFilter}
                      onChange={(e) => setMemberBatchFilter(e.target.value)}
                    >
                      <option value="all">All Batches</option>
                      {batches.map((b) => (
                        <option key={b} value={b}>
                          Batch {b}
                        </option>
                      ))}
                    </select>
                    <select
                      className="admin-input"
                      value={memberDeptFilter}
                      onChange={(e) => setMemberDeptFilter(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {memberDepartments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="mb-3 text-base font-semibold text-[var(--admin-text)]">
                      All Members
                    </h3>
                    <p className="admin-muted mb-3 text-sm">
                      Click a member row or Edit to open the member edit page.
                    </p>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Type</th>
                            <th>Department</th>
                            <th>Email</th>
                            <th>LinkedIn</th>
                            <th>GitHub</th>
                            <th>Batch</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMembers.length === 0 && (
                            <tr>
                              <td colSpan={10} className="admin-muted">
                                No members match your search or filters.
                              </td>
                            </tr>
                          )}
                          {filteredMembers.map((m) => (
                            <tr
                              key={m.id}
                              className="admin-member-row"
                              onClick={() => openEditMember(m)}
                            >
                              <td>
                                {m.photo ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={m.photo}
                                    alt=""
                                    className="admin-member-photo admin-photo-preview"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPhotoPreview(m.photo);
                                    }}
                                  />
                                ) : (
                                  <div className="admin-member-photo grid place-items-center text-[0.65rem] font-bold text-[var(--admin-blue)]">
                                    {(m.name || "?").charAt(0)}
                                  </div>
                                )}
                              </td>
                              <td>{m.name}</td>
                              <td>{m.role || "—"}</td>
                              <td>
                                {m.teamType === "coordinator"
                                  ? "Coordinator"
                                  : "Core Team"}
                              </td>
                              <td>{m.department || m.branch || "—"}</td>
                              <td onClick={(e) => e.stopPropagation()}>
                                {m.email ? (
                                  <a
                                    href={`mailto:${m.email}`}
                                    className="admin-link"
                                  >
                                    {m.email}
                                  </a>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td onClick={(e) => e.stopPropagation()}>
                                {m.linkedin ? (
                                  <a
                                    href={m.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="admin-link inline-flex items-center gap-1"
                                  >
                                    <FaLinkedin size={14} /> Link
                                  </a>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td onClick={(e) => e.stopPropagation()}>
                                {m.github ? (
                                  <a
                                    href={m.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="admin-link inline-flex items-center gap-1"
                                  >
                                    <FaGithub size={14} /> Link
                                  </a>
                                ) : (
                                  "—"
                                )}
                              </td>
                              <td>{m.batch}</td>
                              <td onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    className="admin-btn admin-btn-icon"
                                    onClick={() => openEditMember(m)}
                                    aria-label={`Edit ${m.name}`}
                                    title="Edit member"
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-btn admin-btn-danger admin-btn-icon"
                                    onClick={() =>
                                      askConfirm(
                                        "Are you sure?",
                                        `Delete member ${m.name}?`,
                                        () => {
                                          removeMember(m.id);
                                          showToast("Member deleted");
                                        },
                                      )
                                    }
                                    aria-label={`Delete ${m.name}`}
                                    title="Delete member"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TEAM SUBPAGES */}
          {teamActive && (
            <div className="relative z-10 space-y-4">
              <p className="admin-muted text-sm">
                Manage the {activeLabel} team content for the public Teams page.
              </p>
              <div className="admin-card admin-list-item flex-col !items-start gap-3">
                <p className="font-semibold text-[var(--admin-text)]">{activeLabel} Team</p>
                <p className="admin-muted text-sm">
                  Use this workspace to keep notes, leads, and updates for {activeLabel.toLowerCase()}.
                </p>
                <Link href="/teams" className="admin-link inline-flex items-center gap-1 text-sm">
                  Open Teams page <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* EVENTS */}
          {activeTab === "events" && (
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="admin-muted text-sm">
                  Browse posted events. Click Add Event to create a new one.
                </p>
                {!showEventForm ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn-primary"
                    onClick={() => setShowEventForm(true)}
                  >
                    <Plus size={16} /> Add Event
                  </button>
                ) : (
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => setShowEventForm(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {!showEventForm && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[var(--admin-text)]">
                    All Events
                  </h3>
                  {events.length === 0 && (
                    <p className="admin-muted text-sm">
                      No events yet. Click Add Event to post one.
                    </p>
                  )}
                  {events
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((ev) => (
                      <div key={ev.id} className="admin-list-item items-center">
                        {ev.poster ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={ev.poster}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-lg object-cover border border-[var(--admin-border)]"
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[var(--admin-text)]">
                            {ev.name}
                          </p>
                          <p className="admin-muted text-xs">
                            {ev.type} · {ev.date}
                            {ev.time ? ` · ${ev.time}` : ""} · {ev.location}
                          </p>
                        </div>
                        <span
                          className={
                            ev.type === "upcoming"
                              ? "admin-badge"
                              : "admin-badge admin-badge-ok"
                          }
                        >
                          {ev.type}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            askConfirm(
                              "Are you sure?",
                              `Delete event "${ev.name}"?`,
                              () => {
                                removeEvent(ev.id);
                                showToast("Event deleted");
                              },
                            )
                          }
                          className="admin-muted shrink-0 hover:text-red-500"
                          aria-label="Delete event"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {showEventForm && (
              <form onSubmit={handleEventSubmit} className="space-y-5">
                <div>
                  <label className="admin-label">Title</label>
                  <input
                    className="admin-input"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="admin-label">Description</label>
                  <textarea
                    className="admin-input resize-none"
                    rows={4}
                    required
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="admin-label">Date</label>
                    <input
                      type="date"
                      className="admin-input"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Time</label>
                    <input
                      type="time"
                      className="admin-input"
                      required
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Venue</label>
                    <input
                      className="admin-input"
                      required
                      value={eventVenue}
                      onChange={(e) => setEventVenue(e.target.value)}
                      placeholder="e.g. Main Auditorium"
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Upload Image</label>
                  <input
                    ref={eventImageRef}
                    type="file"
                    accept="image/*"
                    className="admin-file admin-muted block w-full text-sm"
                    onChange={(e) =>
                      handleEventImage(e.target.files?.[0] ?? null)
                    }
                  />
                  {eventPoster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={eventPoster}
                      alt="Event preview"
                      className="mt-4 h-40 w-auto rounded-lg border border-[var(--admin-border-strong)] object-cover"
                    />
                  )}
                </div>
                <div>
                  <label className="admin-label">Register Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={eventFormLink}
                    onChange={(e) => setEventFormLink(e.target.value)}
                    placeholder="https://forms.gle/..."
                  />
                </div>
                <div>
                  <label className="admin-label">Tags</label>
                  <div className="mb-2 flex gap-2">
                    <input
                      className="admin-input"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddTag())
                      }
                      placeholder="e.g. Hackathon"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="admin-btn"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {eventTags.map((tag, i) => (
                      <span key={i} className="admin-chip">
                        {tag}{" "}
                        <button
                          type="button"
                          onClick={() =>
                            setEventTags(eventTags.filter((_, idx) => idx !== i))
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="admin-label">Highlights</label>
                  <div className="mb-2 flex gap-2">
                    <input
                      className="admin-input"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddHighlight())
                      }
                      placeholder="Add highlight"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="admin-btn"
                    >
                      <Plus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {eventHighlights.map((hl, i) => (
                      <span key={i} className="admin-chip">
                        {hl}{" "}
                        <button
                          type="button"
                          onClick={() =>
                            setEventHighlights(
                              eventHighlights.filter((_, idx) => idx !== i),
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-6 text-[var(--admin-text)]">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="eventStatus"
                      checked={eventType === "upcoming"}
                      onChange={() => setEventType("upcoming")}
                    />
                    Upcoming Event
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="eventStatus"
                      checked={eventType === "completed"}
                      onChange={() => setEventType("completed")}
                    />
                    Completed Event
                  </label>
                </div>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary w-full py-4 text-lg"
                >
                  <Save size={20} /> Post Event
                </button>
              </form>
              )}
            </div>
          )}

          {/* GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-8 relative z-10">
              <div>
                <p className="admin-muted text-sm">
                  Set how many images to upload for one event title, then upload
                  them together.
                </p>
              </div>
              <form onSubmit={handleGallerySubmit} className="space-y-5">
                <div>
                  <label className="admin-label">Event / Gallery Title</label>
                  <input
                    className="admin-input"
                    required
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    placeholder="e.g. Hackathon Day 1"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-input"
                      value={galleryCategory}
                      onChange={(e) => setGalleryCategory(e.target.value)}
                    >
                      <option value="events">Events</option>
                      <option value="celebrations">Celebrations</option>
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">How many images?</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      className="admin-input"
                      value={galleryImageCount}
                      onChange={(e) => handleGalleryCountChange(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Image</label>
                  <input
                    ref={galleryFileRef}
                    type="file"
                    accept="image/*"
                    multiple={galleryImageCount > 1}
                    className="admin-file admin-muted block w-full text-sm"
                    onChange={(e) => handleGalleryFiles(e.target.files)}
                  />
                  {galleryPreviews.length > 0 && (
                    <div className="admin-gallery-slots mt-3">
                      {galleryPreviews.map((src, i) => (
                        <div key={i} className="admin-gallery-slot relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`Preview ${i + 1}`} />
                          <button
                            type="button"
                            className="admin-gallery-remove"
                            aria-label={`Remove image ${i + 1}`}
                            title="Remove image"
                            onClick={() => {
                              setGalleryPreviews((prev) => {
                                const next = prev.filter((_, idx) => idx !== i);
                                setGalleryImageCount(Math.max(1, next.length || 1));
                                return next;
                              });
                              if (galleryFileRef.current) {
                                galleryFileRef.current.value = "";
                              }
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Upload size={18} /> Upload
                </button>
              </form>
              <p className="admin-muted text-sm">
                Events: {eventGallery.length} · Celebrations:{" "}
                {celebrationGallery.length}
              </p>
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === "messages" && (
            <div className="relative z-10 space-y-4">
              <p className="admin-muted text-sm">
                Messages submitted from the public Contact form.
              </p>
              {contactMessages.length === 0 && (
                <p className="admin-muted text-sm">
                  No messages yet. When someone contacts ISTE, they appear here.
                </p>
              )}
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="admin-list-item flex-col !items-stretch gap-2"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[var(--admin-text)]">
                          {msg.name}
                          {!msg.read ? (
                            <span className="admin-badge ml-2">New</span>
                          ) : null}
                        </p>
                        <p className="admin-muted text-xs">{msg.email}</p>
                      </div>
                      <p className="admin-muted text-xs">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--admin-text)] whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <div className="flex gap-2">
                      {!msg.read && (
                        <button
                          type="button"
                          className="admin-btn"
                          onClick={() => markContactMessageRead(msg.id)}
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        type="button"
                        className="admin-muted hover:text-red-500"
                        onClick={() =>
                          askConfirm(
                            "Are you sure?",
                            `Delete message from ${msg.name}?`,
                            () => {
                              removeContactMessage(msg.id);
                              showToast("Message deleted");
                            },
                          )
                        }
                        aria-label="Delete message"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {activeTab === "achievements" && (
            <div className="relative z-10 space-y-8">
              <div>
                <p className="admin-muted text-sm">
                  Publish awards and milestones to the Achievements page.
                </p>
              </div>
              <form onSubmit={handleAchievementSubmit} className="space-y-5">
                <div>
                  <label className="admin-label">Title</label>
                  <input
                    className="admin-input"
                    required
                    value={achTitle}
                    onChange={(e) => setAchTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="admin-label">Category</label>
                    <select
                      className="admin-input"
                      value={achCategory}
                      onChange={(e) => setAchCategory(e.target.value)}
                    >
                      {ACHIEVEMENT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">Date</label>
                    <input
                      className="admin-input"
                      required
                      value={achDate}
                      onChange={(e) => setAchDate(e.target.value)}
                      placeholder="e.g. March 2025"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Year</label>
                    <select
                      className="admin-input"
                      value={achYear}
                      onChange={(e) => setAchYear(e.target.value)}
                    >
                      {["2026", "2025", "2024", "2023"].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Description</label>
                  <textarea
                    className="admin-input resize-none"
                    rows={4}
                    required
                    value={achDesc}
                    onChange={(e) => setAchDesc(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="admin-label">Team Name</label>
                    <input
                      className="admin-input"
                      value={achTeamName}
                      onChange={(e) => setAchTeamName(e.target.value)}
                      placeholder="e.g. Team Innovators"
                    />
                  </div>
                  <div>
                    <label className="admin-label">
                      Team Members (comma separated)
                    </label>
                    <input
                      className="admin-input"
                      value={achMembers}
                      onChange={(e) => setAchMembers(e.target.value)}
                      placeholder="Name 1, Name 2"
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Upload Image</label>
                  <input
                    ref={achImageRef}
                    type="file"
                    accept="image/*"
                    className="admin-file admin-muted block w-full text-sm"
                    onChange={(e) =>
                      handleAchImage(e.target.files?.[0] ?? null)
                    }
                  />
                  {achImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={achImage}
                      alt="Achievement preview"
                      className="mt-4 h-40 w-auto rounded-lg border border-[var(--admin-border-strong)] object-cover"
                    />
                  )}
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-[var(--admin-text)]">
                  <input
                    type="checkbox"
                    checked={achFeatured}
                    onChange={(e) => setAchFeatured(e.target.checked)}
                  />
                  Feature on Achievements page
                </label>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary w-full py-4 text-lg"
                >
                  <Trophy size={20} /> Publish Achievement
                </button>
              </form>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[var(--admin-text)]">
                    Published achievements
                  </h3>
                  <Link
                    href="/achievements"
                    className="admin-muted inline-flex items-center gap-1 text-xs hover:text-[var(--admin-blue)]"
                  >
                    Open page <ExternalLink size={12} />
                  </Link>
                </div>
                {achievements.length === 0 && (
                  <p className="admin-muted text-sm">No achievements yet.</p>
                )}
                {achievements.map((a) => (
                  <div key={a.id} className="admin-list-item items-center">
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.image}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded-lg object-cover border border-[var(--admin-border)] admin-photo-preview"
                        onClick={() => setPhotoPreview(a.image)}
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[var(--admin-text)]">
                        {a.title}
                        {a.featured ? " · Featured" : ""}
                      </p>
                      <p className="admin-muted text-xs">
                        {a.category} · {a.year} · {a.teamName}
                      </p>
                    </div>
                    <Link
                      href={`/achievements/${a.slug}`}
                      className="admin-muted shrink-0 hover:text-[var(--admin-blue)]"
                      aria-label="View achievement"
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        askConfirm(
                          "Are you sure?",
                          `Delete achievement "${a.title}"?`,
                          () => {
                            removeAchievement(a.id);
                            showToast("Achievement deleted");
                          },
                        );
                      }}
                      className="admin-muted shrink-0 hover:text-red-500"
                      aria-label="Delete achievement"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-8 relative z-10">
              <div>
                <p className="admin-muted text-sm">
                  Chapter identity and WhatsApp community link.
                </p>
              </div>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="admin-label">Chapter Name</label>
                  <input
                    className="admin-input"
                    value={profileForm.chapterName}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        chapterName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Tagline</label>
                  <input
                    className="admin-input"
                    value={profileForm.tagline}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        tagline: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">WhatsApp Community Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    required
                    value={profileForm.whatsappCommunityLink}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        whatsappCommunityLink: e.target.value,
                      })
                    }
                    placeholder="https://chat.whatsapp.com/..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Instagram</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={profileForm.instagram}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          instagram: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="admin-label">LinkedIn</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={profileForm.linkedin}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          linkedin: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                >
                  <Save size={18} /> Save Profile
                </button>
              </form>
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-8 relative z-10">
              <div>
                <p className="admin-muted text-sm">
                  Upload name, description, year & branch — it appears on the
                  homepage section.
                </p>
              </div>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Name</label>
                    <input
                      className="admin-input"
                      required
                      value={tName}
                      onChange={(e) => setTName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Year</label>
                    <input
                      className="admin-input"
                      required
                      value={tYear}
                      onChange={(e) => setTYear(e.target.value)}
                      placeholder="e.g. 3rd Year"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Branch</label>
                    <input
                      className="admin-input"
                      required
                      value={tBranch}
                      onChange={(e) => setTBranch(e.target.value)}
                      placeholder="e.g. CSE"
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-label">Description / Quote</label>
                  <textarea
                    className="admin-input resize-none"
                    rows={4}
                    required
                    value={tDesc}
                    onChange={(e) => setTDesc(e.target.value)}
                    placeholder="What they say about ISTE..."
                  />
                </div>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                >
                  <Upload size={18} /> Upload
                </button>
              </form>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {testimonials.length === 0 && (
                  <p className="admin-muted text-sm">
                    No custom testimonials yet — homepage shows defaults.
                  </p>
                )}
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="admin-list-item"
                  >
                    <div>
                      <p className="font-semibold text-[var(--admin-text)]">{t.name}</p>
                      <p className="admin-muted mb-1 text-xs">
                        {t.branch} — {t.year}
                      </p>
                      <p className="line-clamp-2 text-sm text-[var(--admin-text)] opacity-85">
                        {t.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        askConfirm(
                          "Are you sure?",
                          `Delete testimonial from ${t.name}?`,
                          () => {
                            removeTestimonial(t.id);
                            showToast("Testimonial deleted");
                          },
                        )
                      }
                      className="admin-muted shrink-0 hover:text-red-500"
                      aria-label="Remove testimonial"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
            </div>
          )}
        </div>

        <footer className="admin-footer">
          © {new Date().getFullYear()} ISTE Student Chapter — MBU. All Rights
          Reserved.
        </footer>
      </div>
    </div>
  );
}
