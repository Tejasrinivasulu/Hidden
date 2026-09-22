"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

export default function JoinTeamModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("General");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    year: "1st Year",
    interestedTeam: "General",
    skills: "",
    reason: ""
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSelectedTeam(customEvent.detail?.team || "General");
      setFormData(prev => ({ ...prev, interestedTeam: customEvent.detail?.team || "General" }));
      setIsOpen(true);
      setIsSubmitted(false);
      document.body.style.overflow = "hidden";
    };

    window.addEventListener("openJoinModal", handleOpen);
    return () => window.removeEventListener("openJoinModal", handleOpen);
  }, []);

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
    // Reset form after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        rollNumber: "",
        department: "",
        year: "1st Year",
        interestedTeam: "General",
        skills: "",
        reason: ""
      });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage as requested for future backend integration
    const existing = JSON.parse(localStorage.getItem("iste_team_applications") || "[]");
    localStorage.setItem("iste_team_applications", JSON.stringify([...existing, { ...formData, timestamp: new Date().toISOString() }]));

    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={close}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl max-h-[90vh] bg-[#0B172A] border border-[rgba(255,255,255,0.1)] rounded-[24px] shadow-2xl flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 md:p-8 border-b border-[rgba(255,255,255,0.05)] relative shrink-0">
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
              Join <span className="text-[#6BE6FF]">ISTE MBU</span>
            </h2>
            <p className="text-[#B8C7D9] mt-2">
              Apply to join the {selectedTeam !== "General" ? selectedTeam : "ISTE Student Chapter"}.
            </p>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[#071120]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-[#4ADE80]" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-4">Application Received!</h3>
                <p className="text-[#B8C7D9] max-w-md mx-auto mb-8">
                  Thank you for applying to the {formData.interestedTeam}. Our recruitment team will review your application and contact you soon.
                </p>
                <button
                  onClick={close}
                  className="px-8 py-3 bg-[#0F1F35] border border-[rgba(255,255,255,0.1)] text-white font-mono uppercase tracking-widest text-sm rounded-full hover:border-[#6BE6FF] transition-all"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#B8C7D9] font-medium">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#B8C7D9] font-medium">Roll Number</label>
                    <input
                      required
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors"
                      placeholder="e.g. 20001A0501"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#B8C7D9] font-medium">Department</label>
                    <select
                      required
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors appearance-none"
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics</option>
                      <option value="IT">Information Tech</option>
                      <option value="MECH">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-[#B8C7D9] font-medium">Year of Study</label>
                    <select
                      required
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors appearance-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[#B8C7D9] font-medium">Interested Team</label>
                  <select
                    required
                    name="interestedTeam"
                    value={formData.interestedTeam}
                    onChange={handleChange}
                    className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors appearance-none"
                  >
                    <option value="General">General Member</option>
                    <option value="Web Development Team">Web Development Team</option>
                    <option value="Poster Team">Poster Team</option>
                    <option value="Social Media Team">Social Media Team</option>
                    <option value="Management Team">Management Team</option>
                    <option value="Drafting Team">Drafting Team</option>
                    <option value="Documentation Team">Documentation Team</option>
                    <option value="Scheduling Team">Scheduling Team</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[#B8C7D9] font-medium">Relevant Skills</label>
                  <input
                    required
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors"
                    placeholder="e.g. React, Photoshop, Public Speaking"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[#B8C7D9] font-medium">Why do you want to join this team?</label>
                  <textarea
                    required
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={4}
                    className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors resize-none"
                    placeholder="Tell us about your passion and what you hope to achieve..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full py-4 bg-[#6BE6FF] text-[#071120] font-bold uppercase tracking-widest text-sm rounded-lg shadow-[0_0_15px_rgba(107,230,255,0.3)] hover:shadow-[0_0_25px_rgba(107,230,255,0.5)] transition-all"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
