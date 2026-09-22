"use client";

import { useState } from "react";
import BorderGlow from "@/components/ui/BorderGlow";
import { Send, Bug, Lightbulb, MessageSquare } from "lucide-react";

export default function TechnicalSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "bug",
    description: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", type: "bug", description: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-blue)] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--accent-pink)] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-4xl px-[5vw] relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-5xl font-display font-black uppercase tracking-tight mb-6">
            System<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]">Diagnostics</span>
          </h1>
          <p className="text-gray-400 mb-8 font-mono leading-relaxed">
            Encountered an anomaly in the matrix? Need to request a feature upgrade? Submit a ticket to the engineering core. We monitor all frequencies.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--accent-pink)]/10 p-3 rounded-lg text-[var(--accent-pink)]">
                <Bug size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-1">Bug Reports</h3>
                <p className="text-xs text-gray-500 font-mono">Report visual glitches, broken links, or system failures.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[var(--accent-blue)]/10 p-3 rounded-lg text-[var(--accent-blue)]">
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-1">Feature Requests</h3>
                <p className="text-xs text-gray-500 font-mono">Suggest new modules for the ISTE portal.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[var(--accent-purple)]/10 p-3 rounded-lg text-[var(--accent-purple)]">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-1">General Inquiry</h3>
                <p className="text-xs text-gray-500 font-mono">Questions about technical events or membership.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <BorderGlow 
            glowColor="192 100 60" 
            animated={true} 
            edgeSensitivity={50} 
            className="w-full"
            colors={['#00d4ff', '#7c3aed', '#f472b6']}
          >
            <div className="p-8">
              {isSubmitted ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400">
                    <Send size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">Transmission Received</h3>
                  <p className="text-gray-400 font-mono text-sm">Your ticket has been logged in the system. Our engineers will review it shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">Operative Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#151522] border border-gray-700/50 rounded-lg p-3 text-white focus:border-[var(--accent-blue)] outline-none font-mono text-sm transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">Comms Channel (Email)</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#151522] border border-gray-700/50 rounded-lg p-3 text-white focus:border-[var(--accent-blue)] outline-none font-mono text-sm transition-colors" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">Ticket Classification</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-[#151522] border border-gray-700/50 rounded-lg p-3 text-white focus:border-[var(--accent-blue)] outline-none font-mono text-sm transition-colors appearance-none"
                    >
                      <option value="bug">System Bug / Glitch</option>
                      <option value="feature">Feature Request</option>
                      <option value="inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">Log Details</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      rows={5} 
                      className="w-full bg-[#151522] border border-gray-700/50 rounded-lg p-3 text-white focus:border-[var(--accent-blue)] outline-none font-mono text-sm transition-colors resize-none" 
                      placeholder="Describe the anomaly in detail..." 
                    />
                  </div>

                  <button type="submit" className="w-full group bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-white font-bold py-4 rounded-lg hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">Initiate Transfer <Send size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                  </button>
                </form>
              )}
            </div>
          </BorderGlow>
        </div>

      </div>
    </div>
  );
}
