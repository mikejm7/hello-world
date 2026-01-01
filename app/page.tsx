'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function SpideyParty() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });
  const [isThwipping, setIsThwipping] = useState(false);

  const intelRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const SECRET_CODE = "SPIDEY6";

  // Countdown Logic
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

  // Auto-scroll logic
  useEffect(() => {
    if (isUnlocked && intelRef.current) {
      intelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isUnlocked]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === SECRET_CODE) {
      setIsThwipping(true);
      if (audioRef.current) audioRef.current.play();
      setTimeout(() => {
        setIsUnlocked(true);
        setIsThwipping(false);
      }, 300);
    } else {
      alert("THWIP! WRONG CODE!");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-10 px-4 space-y-12">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />
      
      {/* HEADER BURST */}
      <div className="w-full max-w-xl burst-container flex flex-col items-center justify-center">
        <h1 className="font-comic text-4xl md:text-6xl text-white text-center leading-none uppercase text-stroke">
          YOU'RE INVITED TO<br/>
          <span className="text-black text-5xl md:text-7xl">LUCAS'S 5TH</span><br/>
          BIRTHDAY PARTY!
        </h1>
      </div>

      {/* CODE ENTRY SECTION */}
      <div className={`w-full max-w-md flex flex-col items-center relative ${isThwipping ? 'thwip-effect' : ''}`}>
        <div className="bg-white border-4 border-black p-2 px-6 transform rotate-[-2deg] mb-[-15px] z-20 flex items-center shadow-[4px_4px_0px_black]">
           <h2 className="font-comic text-2xl text-black">ENTER SECRET CODE</h2>
        </div>
        
        <form onSubmit={handleVerify} className="w-full flex flex-col items-center relative">
          <input 
            type="text" 
            value={code} 
            disabled={isUnlocked}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 border-[6px] border-black text-center text-3xl font-bold uppercase bg-white outline-none z-10"
            placeholder="_____"
          />
          <button 
            type="submit" 
            className="bg-[#E62429] text-white font-comic text-2xl py-2 px-6 border-4 border-black absolute -bottom-6 right-4 z-30 hover:scale-105 active:scale-95 transition-transform"
          >
            GO TIME!
          </button>
        </form>
      </div>

      {/* HIDDEN CONTENT REVEALED */}
      {isUnlocked && (
        <div ref={intelRef} className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          
          {/* DATE & LOCATION PANEL */}
          <div className="bg-[#03A9F4] tilted-panel p-6 text-white text-center">
            <p className="font-comic text-2xl md:text-3xl uppercase leading-tight">
              DATE: FRIDAY, MARCH 27 @ 2:00 PM
            </p>
            <p className="font-comic text-2xl md:text-3xl uppercase leading-tight mt-2">
              LOCATION: SPIDEY SECRET BASE HQ
            </p>
          </div>

          {!hasRSVPd ? (
            <div className="bg-[#E62429] tilted-panel p-6 transform rotate-[1.5deg]">
              <h3 className="font-comic text-3xl text-[#FFEB3B] text-center mb-6 italic underline uppercase">MISSION INTEL UNLOCKED!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="space-y-4">
                <input type="text" name="hero" placeholder="HERO NAME" required className="w-full p-3 border-4 border-black font-bold uppercase" />
                <input type="number" name="guests" placeholder="GUEST COUNT" required className="w-full p-3 border-4 border-black font-bold uppercase" />
                <button type="submit" className="w-full bg-[#FFEB3B] text-black font-comic text-4xl py-3 border-4 border-black shadow-[6px_6px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                  SEND RSVP
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white tilted-panel p-8 text-center border-black">
              <h3 className="font-comic text-4xl text-[#E62429] mb-6 uppercase">MISSION STARTS IN:</h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex flex-col bg-[#FFEB3B] border-4 border-black p-2">
                    <span className="font-comic text-3xl">{val}</span>
                    <span className="text-[10px] font-black uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
    }
      
