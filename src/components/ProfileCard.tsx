'use client';

import { useAppStore, User } from '@/store/useAppStore';

interface ProfileCardProps {
  user: User;
  distance: string;
}

export default function ProfileCard({ user, distance }: ProfileCardProps) {
  const setSelectedProfile = useAppStore((state) => state.setSelectedProfile);
  const setSchedulerModalOpen = useAppStore((state) => state.setSchedulerModalOpen);

  const handleProposeDate = () => {
    setSelectedProfile(user);
    setSchedulerModalOpen(true);
  };

  return (
    <div className="rounded-3xl bg-glass border border-glass-border backdrop-blur-xl overflow-hidden relative group shadow-lg hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] transition-all duration-300">
      {/* Photo area */}
      <div className="h-72 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${user.photoUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 z-10">
          <span className={`w-2 h-2 rounded-full ${user.reliabilityScore >= 90 ? 'bg-neon-green shadow-[0_0_10px_var(--color-neon-green)]' : 'bg-yellow-400'}`}></span>
          <span className="text-xs font-bold font-mono text-white/90">SCORE: {user.reliabilityScore}</span>
        </div>
      </div>

      <div className="p-6 relative -mt-16 z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-md">{user.name}</h2>
            <p className="text-sm text-white/60 font-mono mt-1">{distance}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {user.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white/80 tracking-wide">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button 
          onClick={handleProposeDate}
          className="w-full py-4 rounded-2xl bg-white text-black font-extrabold text-lg shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:bg-neon-green hover:shadow-[0_10px_40px_rgba(57,255,20,0.4)] transition-all duration-300 transform active:scale-95"
        >
          Propose Date
        </button>
      </div>
    </div>
  );
}
