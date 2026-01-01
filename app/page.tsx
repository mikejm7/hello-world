'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function SpideyParty() {
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const SECRET_CODE = "SPIDEY6"; 

  useEffect(() => {
    const target = new Date("March 27, 2026 14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.toUpperCase() === SECRET_CODE) {
      setIsUnlocked(true);
      setShowModal(false);
      setError('');
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    } else {
      setError('THWIP! WRONG CODE!');
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start pt-20 pb-10 px-6 overflow-x-hidden">
      
      {/* IMPROVED BACKGROUND IMAGE LOGIC */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          // Using a more reliable Spidey & Friends action shot
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://wallpapers.com/images/featured/spiderman-across-the-spider-verse-99v86t2377b61sk6.jpg')`,
          backgroundColor: '#001f5b' // Fallback color is now Spidey Blue instead of Black
        }}
      />

      <audio ref={audioRef} loop src="https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptoken=1040375" />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        
        {/* HEADER TEXT */}
        <div className="mb-24 animate-swing">
          <div className="bg-[#e62429] comic-border p-6 transform -rotate-1">
            <h1 className="text-4xl md:text-5xl font-comic text-white leading-tight uppercase tracking-tighter text-glow">
              You're invited to <br/> Lucas's 5th birthday party!
            </h1>
          </div>
        </div>

        {!isUnlocked ? (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-black font-comic text-3xl py-4 px-10 comic-border hover:scale-105 active:scale-95 transition-all animate-bounce"
          >
            OPEN MISSION FILE
          </button>
        ) : (
          <div className="space-y-6 w-full animate-slide">
            <div className="bg-white/95 backdrop-blur-sm comic-border p-8">
              <h2 className="bg-yellow-400 p-2 comic-border -mt-12 mb-6 text-center font-comic text-3xl text-black">MISSION INTEL</h2>
              <div className="text-[#001f5b] space-y-4 font-comic text-2xl">
                <p>📅 Friday, March 27 @ 2:00 PM</p>
                <p>📍 Spidey Secret Base HQ</p>
              </div>
            </div>

            {!hasRSVPd ? (
              <div className="bg-[#e62429] comic-border p-8">
                <h3 className="font-comic text-3xl text-white mb-4 italic">TEAM UP?</h3>
                <form 
                  action="https://formspree.io/f/YOUR_ID_HERE" 
                  method="POST" 
                  onSubmit={() => setHasRSVPd(true)} 
                  className="space-y-3"
                >
                  <input type="text" name="name" placeholder="HERO NAME" required className="w-full p-3 border-4 border-black font-bold uppercase outline-none text-black" />
                  <select name="attending" className="w-full p-3 border-4 border-black font-bold uppercase text-black">
                    <option value="yes">YES! COUNT ME IN!</option>
                    <option value="no">NO, BUSY SAVING THE CITY</option>
                  </select>
                  <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-3xl py-3 border-4 border-black active:scale-95">SEND RSVP</button>
                </form>
              </div>
            ) : (
              <div className="bg-white comic-border p-8 text-center animate-reveal">
                <h3 className="font-comic text-4xl text-[#e62429] mb-4">LAUNCHING IN:</h3>
                <div className="grid grid-cols-4 gap-2 font-comic text-[#001f5b]">
                  <div className="flex flex-col bg-gray-100 p-1 border border-black"><span className="text-2xl">{timeLeft.days}</span><span className="text-[8px]">DAYS</span></div>
                  <div className="flex flex-col bg-gray-100 p-1 border border-black"><span className="text-2xl">{timeLeft.hours}</span><span className="text-[8px]">HRS</span></div>
                  <div className="flex flex-col bg-gray-100 p-1 border border-black"><span className="text-2xl">{timeLeft.mins}</span><span className="text-[8px]">MINS</span></div>
                  <div className="flex flex-col bg-gray-100 p-1 border border-black"><span className="text-2xl">{timeLeft.secs}</span><span className="text-[8px]">SECS</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white comic-border p-8 w-full max-w-sm animate-slide text-center">
            <h2 className="font-comic text-3xl text-[#001f5b] mb-4">IDENTIFICATION REQUIRED</h2>
            <p className="mb-6 font-bold text-gray-600">Enter the secret code from your invite:</p>
            <form onSubmit={handleVerify} className="space-y-4">
              <input 
                type="text" 
                value={inviteCode} 
                onChange={(e) => setInviteCode(e.target.value)} 
                placeholder="_____" 
                autoFocus
                className="w-full p-4 border-4 border-black text-center font-bold text-3xl uppercase outline-none focus:bg-yellow-50 text-black" 
              />
              <button type="submit" className="w-full bg-[#e62429] text-white font-comic text-3xl py-4 comic-border active:scale-95">
                ACCESS HQ
              </button>
            </form>
            {error && <p className="mt-4 text-red-600 font-bold animate-bounce">{error}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
