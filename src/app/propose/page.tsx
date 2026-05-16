'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProposeDate() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/';
    }, 1500);
  };

  return (
    <main className="min-h-screen p-6 relative overflow-hidden">
      
      {/* Background Orbs for modern feel */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none"></div>

      <header className="flex items-center gap-4 py-6 mb-10 relative z-10">
        <Link href="/" className="p-3 rounded-full bg-glass border border-glass-border backdrop-blur-md hover:bg-white/10 transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight">New Proposal</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto relative z-10">
        <div className="p-6 rounded-3xl bg-glass border border-glass-border backdrop-blur-xl shadow-lg space-y-8">
          
          <div className="space-y-3">
            <label className="text-xs font-bold text-white/50 tracking-widest uppercase">Invitee Phone Number</label>
            <input 
              type="tel" 
              required 
              placeholder="(555) 000-0000"
              className="w-full bg-transparent border-b border-white/10 pb-3 text-xl font-medium outline-none focus:border-neon-pink transition-colors placeholder-white/20"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-white/50 tracking-widest uppercase">Select Venue</label>
            <select 
              required 
              className="w-full bg-transparent border-b border-white/10 pb-3 text-xl font-medium outline-none focus:border-neon-pink transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-black text-white/50">Choose a location...</option>
              <option value="1" className="bg-black text-white">The Neon Bar</option>
              <option value="2" className="bg-black text-white">Cyberpunk Cafe</option>
              <option value="3" className="bg-black text-white">Midnight Roasters</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-white/50 tracking-widest uppercase">Date & Time</label>
            <input 
              type="datetime-local" 
              required 
              className="w-full bg-transparent border-b border-white/10 pb-3 text-xl font-medium outline-none focus:border-neon-pink transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-neon-pink to-purple-500 text-white font-extrabold text-lg shadow-[0_10px_30px_rgba(255,0,255,0.3)] hover:shadow-[0_10px_40px_rgba(255,0,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:scale-95"
          >
            {loading ? 'Sending...' : 'Send Proposal'}
          </button>
        </div>
      </form>
    </main>
  );
}
