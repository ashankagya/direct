'use client';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/navigation';

export default function AgreementPage() {
  const setAgreedToRules = useAppStore(state => state.setAgreedToRules);
  const router = useRouter();

  const handleAgree = () => {
    setAgreedToRules(true);
    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen p-6 relative overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-sm">
        <h1 className="text-4xl font-extrabold tracking-tighter mb-8 text-center uppercase">The Rules</h1>
        
        <div className="space-y-6 mb-12">
          <div className="p-6 rounded-3xl bg-glass border border-glass-border backdrop-blur-md">
            <h2 className="font-bold text-xl text-white mb-2">1. No Chatting</h2>
            <p className="text-white/60 text-sm leading-relaxed">Stop wasting time on endless texting. Propose a date, meet in person. That is the only way to communicate.</p>
          </div>
          
          <div className="p-6 rounded-3xl bg-glass border border-glass-border backdrop-blur-md">
            <h2 className="font-bold text-xl text-white mb-2">2. GPS Verification</h2>
            <p className="text-white/60 text-sm leading-relaxed">You must physically arrive at the venue and verify your location. Fake check-ins will result in a ban.</p>
          </div>
          
          <div className="p-6 rounded-3xl bg-red-900/20 border border-red-500/30 backdrop-blur-md">
            <h2 className="font-bold text-xl text-red-400 mb-2">3. Zero Ghosting</h2>
            <p className="text-red-200/60 text-sm leading-relaxed">If you fail to check-in or cancel last minute, your Reliability Score drops severely. Fall below 60 and you are removed.</p>
          </div>
        </div>

        <button 
          onClick={handleAgree}
          className="w-full py-5 rounded-2xl bg-white text-black font-extrabold text-lg shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)] transition-all duration-300 transform active:scale-95"
        >
          I Accept The Rules
        </button>
      </div>
    </main>
  );
}
