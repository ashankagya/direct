'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProfileCard from '@/components/ProfileCard';
import SchedulerModal from '@/components/SchedulerModal';
import { useAppStore } from '@/store/useAppStore';

const ALL_USERS = [
  {
    id: 'u2',
    name: 'Sarah',
    phone: '(555) 987-6543',
    reliabilityScore: 98,
    isElite: true,
    tags: ['Art', 'Techno', 'Travel'],
    photoUrl: 'https://i.pravatar.cc/400?u=a04258114e29026702d'
  },
  {
    id: 'u3',
    name: 'David',
    phone: '(555) 123-9999',
    reliabilityScore: 92,
    isElite: false,
    tags: ['Coffee', 'Tech', 'MorningPerson'],
    photoUrl: 'https://i.pravatar.cc/400?u=a04258114e29026703d'
  },
  {
    id: 'u4',
    name: 'Elena',
    phone: '(555) 444-5555',
    reliabilityScore: 100,
    isElite: true,
    tags: ['Fitness', 'Coffee', 'Outdoors'],
    photoUrl: 'https://i.pravatar.cc/400?u=a04258114e29026704d'
  }
];

const AVAILABLE_TAGS = ['All', 'Coffee', 'Techno', 'Tech', 'MorningPerson', 'Fitness'];

export default function Home() {
  const { currentUser } = useAppStore();
  const [activeTag, setActiveTag] = useState('All');

  const filteredUsers = activeTag === 'All' 
    ? ALL_USERS 
    : ALL_USERS.filter(u => u.tags.includes(activeTag));

  return (
    <main className="min-h-screen p-6 pb-24 selection:bg-neon-pink selection:text-white relative overflow-hidden flex flex-col">
      
      {/* Top Header */}
      <header className="flex justify-between items-center py-6 mb-2 relative z-10">
        <Link href="/profile" className="w-10 h-10 rounded-full bg-glass border border-glass-border overflow-hidden shadow-md hover:border-white/40 transition-colors">
          {currentUser?.photoUrl ? (
            <img src={currentUser.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/10"></div>
          )}
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tighter">DIRECT</h1>
        <Link href="/elite" className="h-10 px-4 rounded-full bg-glass backdrop-blur-xl flex items-center justify-center text-xs font-bold border border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:bg-white/10 transition-colors">
          ★ ELITE
        </Link>
      </header>

      {/* Vibe / Tag Search */}
      <section className="mb-6 relative z-10">
        <div className="flex overflow-x-auto pb-2 gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6">
          {AVAILABLE_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                activeTag === tag 
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-glass border-glass-border text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tag === 'All' ? 'All Vibes' : `#${tag}`}
            </button>
          ))}
        </div>
      </section>

      {/* Discovery Section (Profile Cards) */}
      <section className="mb-14 relative z-10 flex-1">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white/50 uppercase text-sm">
            {activeTag === 'All' ? 'Suggested' : `Matches for #${activeTag}`}
          </h2>
          <span className="text-xs font-mono text-white/30">{filteredUsers.length} FOUND</span>
        </div>
        
        <div className="flex flex-col gap-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <ProfileCard key={user.id} user={user} distance="1.2 miles away" />
            ))
          ) : (
            <div className="p-8 text-center bg-glass border border-glass-border rounded-3xl backdrop-blur-md shadow-inner">
              <p className="text-white/50 font-medium">No one is matching this vibe right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* Active Contracts Section */}
      <section className="relative z-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white/50 uppercase text-sm">Active Dates</h2>
          <span className="flex items-center gap-2 text-[10px] font-mono text-neon-green bg-neon-green/10 px-2 py-1 rounded-full border border-neon-green/20">
            <span className="w-1 h-1 rounded-full bg-neon-green animate-pulse"></span>
            LIVE
          </span>
        </div>
        
        <div className="space-y-4">
          <Link href="/date/example-123" className="block p-6 rounded-3xl bg-glass border border-glass-border backdrop-blur-md hover:bg-white/5 transition-all duration-300 relative overflow-hidden group shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-green to-transparent opacity-80"></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl mb-1">The Neon Bar</h3>
                <p className="text-sm text-white/50 font-mono">Today • 9:00 PM</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-neon-green shadow-[0_0_10px_var(--color-neon-green)] rounded-full"></div>
              </div>
              <p className="text-[10px] text-white/40 font-mono shrink-0">WAITING</p>
            </div>
          </Link>
        </div>
      </section>

      <SchedulerModal />
    </main>
  );
}
