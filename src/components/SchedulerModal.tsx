'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

const CURATED_OPTIONS = [
  { id: 'v1', venue: 'The Neon Bar', time: 'Tonight, 9:00 PM', address: '123 Cyber Ave' },
  { id: 'v2', venue: 'Midnight Roasters', time: 'Tomorrow, 10:00 AM', address: '45 Synth St' },
  { id: 'v3', venue: 'Cyberpunk Cafe', time: 'Tomorrow, 2:00 PM', address: '88 Grid Blvd' },
];

export default function SchedulerModal() {
  const { isSchedulerModalOpen, setSchedulerModalOpen, selectedProfileForDate } = useAppStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isSchedulerModalOpen || !selectedProfileForDate) return null;

  const handleSubmit = () => {
    if (!selectedOption) return;
    setLoading(true);
    // Simulate API call to /api/date/propose
    setTimeout(() => {
      setLoading(false);
      setSchedulerModalOpen(false);
      window.location.href = '/date/example-123'; // redirect to the tracker
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm bg-[#050505] rounded-3xl border border-glass-border shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-purple-500"></div>
        
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-extrabold tracking-tight">Meet {selectedProfileForDate.name}</h2>
          <button 
            onClick={() => setSchedulerModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-white/50 mb-4 tracking-widest font-bold uppercase">Curated Options</p>
          
          <div className="space-y-3">
            {CURATED_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  selectedOption === opt.id 
                    ? 'bg-neon-pink/10 border-neon-pink shadow-[0_0_20px_rgba(255,0,255,0.15)]' 
                    : 'bg-glass border-glass-border hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{opt.venue}</h3>
                    <p className="text-xs text-white/50 font-mono mt-1">{opt.time}</p>
                  </div>
                  {selectedOption === opt.id && (
                    <div className="w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center shadow-[0_0_10px_var(--color-neon-pink)]">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 pt-2">
          <button 
            onClick={handleSubmit}
            disabled={!selectedOption || loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-neon-pink to-purple-500 text-white font-extrabold text-lg shadow-[0_10px_30px_rgba(255,0,255,0.3)] hover:shadow-[0_10px_40px_rgba(255,0,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">Locking it in...</span>
            ) : (
              <span>Send Contract</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
