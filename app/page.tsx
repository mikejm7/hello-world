'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function SpideyParty() {
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const SECRET_CODE = "SPIDEY6"; // Change this to your preferred code

  // Countdown Logic to March 27, 2026
  useEffect(() => {
    const target = new Date("March 27, 2026 14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }

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
      setError('');
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    } else {
      setError('THWIP! Incorrect Code!');
    }
  };

  const handleRSVPForm = (e: React.FormEvent) => {
    // This allows the Formspree submission to happen while updating our UI
    setHasRSVPd(true);
  };

  return (
    <main className="min-h-screen bg-[#001f5b] p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} loop src="https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptoken=1040375" />

      {/* Web Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Banner */}
        <div className="text-center mb-8 animate-swing">
          <div className="inline-block bg-[#e62429] comic-border p-4 transform -rotate-2">
            <h1 className="text-4xl md:text-6xl font-comic text-white uppercase leading-tight">
              {isUnlocked ? "Lucas's Birthday!" : "Secret Invite!"}
            </h1>
          </div>
        </div>

        {!isUnlocked ? (
          /* SECTION 1: CODE ENTRY */
          <div className="bg-white comic-border p-8 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-comic text-3xl mb-4 text-[#001f5b]">Unlock the Mission</h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <input 
                type="text" 
                value={inviteCode} 
                onChange={(e) => setInviteCode(e.target.value)} 
                placeholder="ENTER CODE" 
                className="w-full p-4 border-4 border-black text-center font-bold text-2xl uppercase outline-none focus:bg-yellow-50" 
              />
              <button type="submit" className="w-full bg-[#e62429] text-white font-comic text-3xl py-4 comic-border active:scale-95 transition-transform">
                GO TIME!
              </button>
            </form>
            {error && <p className="mt-4 text-red-600 font-bold italic">{error}</p>}
          </div>
        ) : (
          /* SECTION 2: REVEALED CONTENT */
          <div className="space-y-6 animate-reveal">
            <div className="bg-white comic-border p-8 shadow-[10px_10px_0px_0px_rgba(230,36,41,1)]">
              <h2 className="bg-yellow-400 p-2 comic-border -mt-12 mb-4 text-center font-comic text-3xl">MISSION INTEL</h2>
              <div className="text-[#001f5b] space-y-4 font-comic text-2xl tracking-wide">
                <p>📅 Friday, March 27 @ 2:00 PM</p>
                <p>📍 Spidey Secret Base HQ</p>
                <p className="text-lg font-sans font-bold italic border-t-2 border-black pt-2">
                  "Suit up! We're celebrating Lucas with a day of hero training!"
                </p>
              </div>
            </div>

            {!hasRSVPd ? (
              /* SECTION 3: RSVP FORM */
              <div className="bg-[#e62429] comic-border p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-comic text-3xl text-white mb-4 text-center uppercase">Confirm Attendance</h3>
                <form 
                  action="https://formspree.io/f/YOUR_ID_HERE" 
                  method="POST" 
                  onSubmit={handleRSVPForm}
                  className="space-y-3"
                >
                  <input type="text" name="hero_name" placeholder="YOUR HERO NAME" required className="w-full p-3 border-4 border-black font-bold uppercase outline-none" />
                  <select name="attending" className="w-full p-3 border-4 border-black font-bold uppercase outline-none">
                    <option value="yes">YES! TEANING UP!</option>
                    <option value="no">MISSION CONFLICT (NO)</option>
                  </select>
                  <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-3xl py-3 border-4 border-black active:scale-95">
                    SEND RSVP
                  </button>
                </form>
              </div>
            ) : (
              /* SECTION 4: COUNTDOWN (POST-RSVP) */
              <div className="bg-white comic-border p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center animate-bounce">
                <h3 className="font-comic text-4xl text-[#e62429] mb-4">LAUNCHING IN:</h3>
                <div className="grid grid-cols-4 gap-2 font-comic text-[#001f5b]">
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.days}</span>
                    <span className="text-[10px]">DAYS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.hours}</span>
                    <span className="text-[10px]">HRS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.mins}</span>
                    <span className="text-[10px]">MINS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.secs}</span>
                    <span className="text-[10px]">SECS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <footer className="mt-8 text-white/30 font-comic text-xs uppercase tracking-widest">
        Lucas-Verse — 2026
      </footer>
    </main>
  );
}
