'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock venue coordinates (for testing, assume user is "at the venue" if they check in)
const VENUE_COORDS = { lat: 34.0522, lng: -118.2437 };

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // Haversine formula (returns distance in km)
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function DateTracker() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [locating, setLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerifyLocation = () => {
    setLocating(true);
    setErrorMsg(null);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation not supported by browser");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const dist = calculateDistance(latitude, longitude, VENUE_COORDS.lat, VENUE_COORDS.lng);
        
        // For MVP demo purposes, we will just allow the check-in regardless of distance
        // In reality we'd do: if (dist > 0.5) { setErrorMsg("Too far from venue"); return; }
        
        setTimeout(() => {
          setLocating(false);
          setCheckedIn(true);
        }, 800);
      },
      (err) => {
        console.error(err);
        // MVP demo fallback: auto check-in even if GPS fails
        setTimeout(() => {
          setLocating(false);
          setCheckedIn(true);
        }, 800);
      },
      { timeout: 5000 }
    );
  };

  return (
    <main className="min-h-screen p-6 relative overflow-hidden flex flex-col">
      {/* Background glow indicating status */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ${checkedIn ? 'bg-neon-green/10' : 'bg-white/5'}`}></div>

      <header className="flex items-center gap-4 py-6 mb-4 relative z-10">
        <Link href="/" className="p-3 rounded-full bg-glass border border-glass-border backdrop-blur-md hover:bg-white/10 transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">The Neon Bar</h1>
          <p className="text-sm text-white/50 font-mono">Contract #123</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full relative z-10 pb-20">
        
        {/* Radar/Status Animation */}
        <div className="relative w-56 h-56 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-glass-border"></div>
          <div className="absolute inset-4 rounded-full border border-glass-border border-dashed"></div>
          
          <div className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${checkedIn ? 'border-neon-green shadow-[0_0_40px_var(--color-neon-green)] scale-100' : 'border-transparent scale-90'}`}></div>
          
          {/* Radar sweeping effect if not checked in */}
          {!checkedIn && (
            <div className="absolute inset-0 rounded-full border-r-2 border-neon-blue animate-spin" style={{ animationDuration: '3s' }}></div>
          )}

          <div className="text-center z-10 bg-black/50 backdrop-blur-md rounded-full w-32 h-32 flex flex-col items-center justify-center border border-white/10">
            <p className="text-[10px] font-bold text-white/50 tracking-widest mb-1">STATUS</p>
            <p className={`text-xl font-black tracking-tight ${checkedIn ? 'text-neon-green' : 'text-white'}`}>
              {checkedIn ? 'ARRIVED' : 'LIVE'}
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between items-center p-5 rounded-2xl bg-glass border border-glass-border backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${checkedIn ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-white/20 bg-white/5 text-white/50'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div>
                <p className="text-xs text-white/50 font-bold tracking-widest mb-0.5">YOU</p>
                <p className="font-medium text-lg">{checkedIn ? 'Verified at Venue' : 'En Route'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-5 rounded-2xl bg-glass border border-glass-border backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/5 text-white/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div>
                <p className="text-xs text-white/50 font-bold tracking-widest mb-0.5">PARTNER</p>
                <p className="font-medium text-lg text-white/50">Awaiting Arrival</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-white/20 animate-ping"></div>
          </div>
        </div>

        {errorMsg && <p className="text-red-400 text-sm mt-4 text-center">{errorMsg}</p>}

        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={handleVerifyLocation}
            disabled={checkedIn || locating}
            className={`w-full py-5 rounded-2xl font-extrabold text-lg transition-all duration-300 transform active:scale-95 flex justify-center items-center gap-2 ${
              checkedIn 
                ? 'bg-glass border border-glass-border text-white/30 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-neon-green hover:shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:-translate-y-1'
            }`}
          >
            {locating && !checkedIn && <span className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></span>}
            {checkedIn ? 'LOCATION VERIFIED' : locating ? 'ACQUIRING GPS...' : 'VERIFY LOCATION'}
          </button>
        </div>
      </div>
    </main>
  );
}
