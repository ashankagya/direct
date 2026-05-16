'use client';

import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';

export default function ProfilePage() {
  const { currentUser } = useAppStore();

  if (!currentUser) return null;

  return (
    <main className="min-h-screen p-6 relative overflow-hidden flex flex-col bg-[#050505]">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl pointer-events-none"></div>

      <header className="flex justify-between items-center py-6 mb-8 relative z-10">
        <Link href="/" className="p-3 rounded-full bg-glass border border-glass-border backdrop-blur-md hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <h1 className="text-xl font-extrabold tracking-tight">Your Profile</h1>
        <div className="w-11"></div> {/* Spacer for center alignment */}
      </header>

      <div className="flex-1 flex flex-col items-center relative z-10">
        <div className="w-32 h-32 rounded-full border-2 border-glass-border overflow-hidden mb-6 relative shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <img src={currentUser.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          {currentUser.isElite && (
            <div className="absolute bottom-0 left-0 w-full bg-yellow-500 text-black text-[10px] font-black text-center py-0.5">
              ELITE
            </div>
          )}
        </div>

        <h2 className="text-3xl font-black mb-1">{currentUser.name}</h2>
        <p className="text-white/50 font-mono mb-8">{currentUser.phone}</p>

        <div className="w-full bg-glass border border-glass-border rounded-3xl p-6 backdrop-blur-md mb-8 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-neon-green"></div>
          <div>
            <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase mb-1">Reliability Score</p>
            <p className="text-4xl font-black text-neon-green">{currentUser.reliabilityScore}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green/30">
            <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        <div className="w-full text-left mb-4">
          <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase mb-4">Your Vibes</p>
          <div className="flex flex-wrap gap-2">
            {currentUser.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto w-full pt-8 pb-6">
          <Link href="/elite" className="w-full py-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-extrabold text-lg flex items-center justify-center gap-2 hover:bg-yellow-500/20 transition-all duration-300">
            <span>★ Upgrade to Elite</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
