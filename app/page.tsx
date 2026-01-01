'use client';
import React, { useState, useEffect } from 'react';

export default function LucasParty() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

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

  const verifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === SECRET_CODE) setIsUnlocked(true);
    else alert("THWIP! Try again!");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-10 px-4">
      
      {/* 1. TITLE BURST */}
      <div className="relative mb-12 animate-bounce">
        <div className="bg-[#03a9f4] comic-box p-8 px-12 transform -rotate-1" 
             style={{ clipPath: 'polygon(0% 20%, 10% 20%, 5% 0%, 25% 15%, 50% 0%, 75% 15%, 95% 0%, 90% 20%, 100% 20%, 95% 50%, 100% 80%, 90% 80%, 95% 100%, 75% 85%, 50% 100%, 25% 85%, 5% 100%, 10% 80%, 0% 80%, 5% 50%)' }}>
          <h1 className="font-comic text-4xl md:text-6xl text-white text-center leading-none text-glow">
            YOU'RE INVITED TO<br/>
            <span className="text-black">LUCAS'S 5TH</span><br/>
            BIRTHDAY PARTY!
          </h1>
        </div>
      </div>

      {/* 2. CODE ENTRY (Always Visible until Unlocked) */}
      {!isUnlocked && (
        <div className="w-full max-w-sm flex flex-col items-center space-y-4">
          <h2 className="font-comic text-3xl italic">ENTER SECRET CODE</h2>
          <form onSubmit={verifyCode} className="w-full flex flex-col items-center">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 comic-box text-center text-3xl font-bold uppercase mb-4"
              placeholder="_____"
            />
            <button type="submit" className="btn-action font-comic text-3xl py-2 px-8">GO TIME!</button>
          </form>
        </div>
      )}

      {/* 3. REVEALED CONTENT */}
      {isUnlocked && (
        <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* DATE & LOCATION BOX */}
          <div className="bg-[#03a9f4] comic-box p-6 text-white text-center">
            <p className="font-comic text-2xl md:text-3xl">DATE: FRIDAY, MARCH 27 @ 2:00 PM</p>
            <p className="font-comic text-2xl md:text-3xl">LOCATION: SPIDEY SECRET BASE HQ</p>
          </div>

          {/* RSVP FORM or COUNTDOWN */}
          {!hasRSVPd ? (
            <div className="bg-[#e62429] comic-box p-6">
              <h3 className="font-comic text-3xl text-yellow-400 text-center mb-4 italic underline">MISSION INTEL UNLOCKED!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="hero_name" placeholder="HERO NAME" required className="p-3 border-2 border-black font-bold uppercase" />
                  <input type="number" name="guest_count" placeholder="GUEST COUNT" required className="p-3 border-2 border-black font-bold uppercase" />
                </div>
                <select name="attending" className="w-full p-3 border-2 border-black font-bold uppercase">
                  <option value="yes">YES! COUNT ME IN!</option>
                  <option value="no">MISSION CONFLICT (NO)</option>
                </select>
                <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-3xl py-3 border-4 border-black active:scale-95">
                  SEND RSVP
                </button>
              </form>
            </div>
          ) : (
            /* THE FINAL COUNTDOWN */
            <div className="bg-white comic-box p-8 text-center animate-pulse">
              <h3 className="font-comic text-4xl text-[#e62429] mb-4">LAUNCHING IN:</h3>
              <div className="grid grid-cols-4 gap-2 font-comic text-[#001f5b]">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex flex-col bg-yellow-400 p-2 border-2 border-black">
                    <span className="text-3xl">{val}</span>
                    <span className="text-xs">{label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-comic text-xl text-[#001f5b] italic">GET YOUR SUIT READY, HERO!</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
                  }
