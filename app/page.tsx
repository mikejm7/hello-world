'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function SpideyInvite() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  const intelRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const SECRET_CODE = "SPIDEY6";

  useEffect(() => {
    const target = new Date("March 27, 2026 14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      if (dist < 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(dist / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((dist % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isUnlocked && intelRef.current) {
      intelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (hasRSVPd && countdownRef.current) {
      countdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [hasRSVPd]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === SECRET_CODE) setIsUnlocked(true);
    else alert("THWIP! WRONG CODE!");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-12 px-4 space-y-12">
      
      {/* HEADER BURST */}
      <div className="w-full max-w-xl burst-border flex flex-col items-center justify-center shadow-2xl">
        <h1 className="font-comic text-4xl md:text-6xl text-white text-center leading-none uppercase text-glow">
          YOU'RE INVITED TO<br/>
          <span className="text-black text-5xl md:text-7xl">LUCAS'S 5TH</span><br/>
          BIRTHDAY PARTY!
        </h1>
      </div>

      {/* CODE ENTRY BOX */}
      {!isUnlocked && (
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="code-burst w-full flex flex-col items-center mb-[-20px] relative z-10">
             <h2 className="font-comic text-3xl text-black">ENTER SECRET CODE</h2>
          </div>
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border-8 border-black text-center text-4xl font-bold uppercase bg-white outline-none"
              placeholder="_____"
            />
            <button type="submit" className="bg-[#e62429] text-white font-comic text-4xl py-3 px-12 border-4 border-black mt-4 hover:scale-105 transition-transform active:scale-95 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              GO TIME!
            </button>
          </form>
        </div>
      )}

      {/* REVEALED CONTENT */}
      {isUnlocked && (
        <div ref={intelRef} className="w-full max-w-lg space-y-10">
          
          {/* INFO PANEL */}
          <div className="bg-[#03a9f4] comic-panel p-6 text-white text-center transform rotate-1">
            <p className="font-comic text-2xl md:text-4xl uppercase tracking-tighter">
              DATE: FRIDAY, MARCH 27 @ 2:00 PM
            </p>
            <p className="font-comic text-2xl md:text-4xl uppercase tracking-tighter mt-2">
              LOCATION: SPIDEY SECRET BASE HQ
            </p>
          </div>

          {!hasRSVPd ? (
            /* RSVP FORM */
            <div className="bg-[#e62429] comic-panel p-6 transform -rotate-1">
              <h3 className="font-comic text-4xl text-yellow-400 text-center mb-6 italic underline uppercase">MISSION INTEL UNLOCKED!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="space-y-4">
                <input type="text" name="hero" placeholder="HERO NAME" required className="w-full p-4 border-4 border-black font-bold uppercase text-center" />
                <input type="number" name="guests" placeholder="GUEST COUNT" required className="w-full p-4 border-4 border-black font-bold uppercase text-center" />
                <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-4xl py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                  SEND RSVP
                </button>
              </form>
            </div>
          ) : (
            /* COUNTDOWN */
            <div ref={countdownRef} className="bg-white comic-panel p-8 text-center border-black">
              <h3 className="font-comic text-5xl text-[#e62429] mb-6 uppercase">LAUNCHING IN:</h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex flex-col bg-yellow-400 border-4 border-black p-2">
                    <span className="font-comic text-4xl">{val}</span>
                    <span className="text-xs font-black uppercase">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-comic text-3xl text-[#001f5b] uppercase italic">SUIT UP, HERO!</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
