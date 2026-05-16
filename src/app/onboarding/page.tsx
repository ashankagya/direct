'use client';

import { useState } from 'react';
import { useAppStore, User } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';

const AVAILABLE_TAGS = ['Coffee', 'Techno', 'Tech', 'MorningPerson', 'Fitness', 'Art', 'Travel', 'NightOwl', 'Foodie'];

export default function OnboardingPage() {
  const { setCurrentUser, setOnboarded } = useAppStore();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags(prev => [...prev, tag]);
      }
    }
  };

  const handleFinish = () => {
    const newUser: User = {
      id: 'u-me',
      name: name || 'Anonymous',
      phone: phone || '(000) 000-0000',
      reliabilityScore: 100,
      isElite: false,
      tags: selectedTags,
      photoUrl: `https://i.pravatar.cc/400?u=${encodeURIComponent(name || 'anon')}`
    };
    setCurrentUser(newUser);
    setOnboarded(true);
    router.push('/');
  };

  return (
    <main className="min-h-screen p-6 relative overflow-hidden flex flex-col items-center justify-center bg-[#050505]">
      <div className="absolute top-20 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 w-full max-w-sm">
        <div className="mb-8 flex gap-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-neon-blue' : 'bg-white/10'}`}></div>
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-neon-blue' : 'bg-white/10'}`}></div>
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-3xl font-extrabold tracking-tighter mb-8">Who are you?</h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">First Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-2xl font-bold outline-none focus:border-neon-blue transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-2xl font-bold outline-none focus:border-neon-blue transition-colors"
                />
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!name || !phone}
              className="w-full mt-12 py-5 rounded-2xl bg-white text-black font-extrabold text-lg shadow-[0_10px_30px_rgba(255,255,255,0.2)] disabled:opacity-30 disabled:shadow-none transition-all duration-300"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-3xl font-extrabold tracking-tighter mb-2">Select your vibe</h1>
            <p className="text-white/50 mb-8 font-medium">Choose up to 3 tags so others can find you by intent.</p>

            <div className="flex flex-wrap gap-3 mb-12">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                      isSelected 
                        ? 'bg-neon-blue/20 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,255,255,0.2)]' 
                        : 'bg-glass border-glass-border text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    #{tag}
                  </button>
                )
              })}
            </div>

            <button 
              onClick={handleFinish}
              disabled={selectedTags.length === 0}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-neon-blue to-purple-500 text-white font-extrabold text-lg shadow-[0_10px_30px_rgba(0,255,255,0.3)] hover:shadow-[0_10px_40px_rgba(0,255,255,0.5)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed transform active:scale-95"
            >
              Complete Setup
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
