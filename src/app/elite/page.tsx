import Link from 'next/link';

export default function EliteSubscription() {
  return (
    <main className="min-h-screen p-6 relative overflow-hidden flex flex-col bg-black">
      {/* Golden glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="flex items-center gap-4 py-6 mb-8 relative z-10">
        <Link href="/" className="p-3 rounded-full bg-glass border border-glass-border backdrop-blur-md hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-sm mx-auto">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 mb-6 flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.3)]">
          <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tighter mb-2 text-center text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600">DIRECT ELITE</h1>
        <p className="text-white/60 text-center mb-10 font-medium">Protect your time. Elevate your status.</p>

        <div className="w-full bg-glass border border-yellow-500/30 rounded-3xl p-6 backdrop-blur-xl mb-10 shadow-[0_20px_50px_rgba(250,204,21,0.05)]">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Ghosting Insurance™
          </h2>
          <ul className="space-y-4 mb-6">
            <li className="flex gap-3 text-sm text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
              <p><strong>Score Protection:</strong> If your date fails to check in, your Reliability Score is untouched.</p>
            </li>
            <li className="flex gap-3 text-sm text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
              <p><strong>Priority Placement:</strong> Appear at the top of the queue for the next 48 hours.</p>
            </li>
            <li className="flex gap-3 text-sm text-white/80">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
              <p><strong>Free Drink Credit:</strong> We cover your first drink if left waiting.</p>
            </li>
          </ul>
        </div>

        <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-extrabold text-lg shadow-[0_10px_30px_rgba(250,204,21,0.3)] hover:shadow-[0_10px_40px_rgba(250,204,21,0.5)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
          Upgrade to Elite — $19/mo
        </button>
      </div>
    </main>
  );
}
