'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function SpideyInvite() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  const intelRef = useRef<HTMLDivElement>(null);
  const thwipAudio = useRef<HTMLAudioElement>(null);
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
      intelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isUnlocked]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === SECRET_CODE) {
      if (thwipAudio.current) thwipAudio.current.play();
      setIsUnlocked(true);
    } else {
      alert("THWIP! WRONG CODE!");
    }
  };

  return (
    <main className="w-full max-w-md flex-center py-10 px-4 space-y-12">
      <audio ref={thwipAudio} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      {/* HEADER BURST: Using an SVG Background to avoid text clipping */}
      <div className="relative w-full flex-center p-8 min-h-[250px] justify-center">
        {/* Jagged SVG Background */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="w-full h-full drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <path 
              d="M250,20 L310,80 L390,30 L400,120 L480,90 L440,180 L500,250 L440,320 L480,410 L400,380 L390,470 L310,420 L250,480 L190,420 L110,470 L100,380 L20,410 L60,320 L0,250 L60,180 L20,90 L100,120 L110,30 L190,80 Z" 
              fill="#03A9F4" 
              stroke="black" 
              strokeWidth="10"
            />
          </svg>
        </div>
        
        {/* Header Text: Positioned relatively to stack properly */}
        <div className="relative z-10 flex-center space-y-2">
          <h1 className="font-comic text-3xl md:text-4xl text-white text-stroke uppercase">
            YOU'RE INVITED TO
          </h1>
          <h1 className="font-comic text-5xl md:text-6xl text-black uppercase">
            LUCAS'S 5TH
          </h1>
          <h1 className="font-comic text-3xl md:text-4xl text-white text-stroke uppercase">
            BIRTHDAY PARTY!
          </h1>
        </div>
      </div>

      {/* CODE ENTRY SECTION */}
      {!isUnlocked && (
        <div className="w-full flex-center space-y-6">
          <h2 className="font-comic text-4xl text-black italic">ENTER SECRET CODE</h2>
          <form onSubmit={handleVerify} className="w-full flex-center space-y-4">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full max-w-[280px] p-4 border-8 border-black text-center text-4xl font-bold uppercase bg-white shadow-[8px_8px_0px_black] outline-none"
              placeholder="_____"
            />
            <button 
              type="submit" 
              className="bg-[#E62429] text-white font-comic text-4xl py-2 px-10 border-4 border-black shadow-[4px_4px_0px_black] active:translate-y-1 transition-all"
            >
              GO TIME!
            </button>
          </form>
        </div>
      )}

      {/* REVEALED CONTENT */}
      {isUnlocked && (
        <div ref={intelRef} className="w-full flex-center space-y-10 animate-in zoom-in duration-500">
          
          {/* Mission Intel Panel */}
          <div className="w-full bg-[#03A9F4] border-8 border-black p-6 text-white shadow-[10px_10px_0px_black] transform rotate-1">
            <p className="font-comic text-3xl uppercase leading-tight">DATE: FRIDAY, MARCH 27 @ 2:00 PM</p>
            <p className="font-comic text-3xl uppercase leading-tight mt-4">LOCATION: SPIDEY SECRET BASE HQ</p>
          </div>

          {!hasRSVPd ? (
            /* RSVP Section */
            <div className="w-full bg-[#E62429] border-8 border-black p-6 shadow-[10px_10px_0px_black] transform -rotate-1">
              <h3 className="font-comic text-4xl text-[#FFEB3B] mb-6 underline">MISSION INTEL!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="w-full space-y-4">
                <input type="text" name="hero" placeholder="HERO NAME" required className="w-full p-4 border-4 border-black font-bold uppercase text-center text-black" />
                <input type="number" name="guests" placeholder="GUESTS" required className="w-full p-4 border-4 border-black font-bold uppercase text-center text-black" />
                <button type="submit" className="w-full bg-[#FFEB3B] text-black font-comic text-4xl py-4 border-4 border-black shadow-[6px_6px_0px_black]">
                  SEND RSVP
                </button>
              </form>
            </div>
          ) : (
            /* Countdown Section */
            <div className="w-full bg-white border-8 border-black p-8 shadow-[10px_10px_0px_black]">
              <h3 className="font-comic text-5xl text-[#E62429] mb-6">LAUNCHING IN:</h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex-center bg-[#FFEB3B] border-4 border-black p-2">
                    <span className="font-comic text-3xl text-black">{val}</span>
                    <span className="text-[10px] font-black uppercase text-black">{label}</span>
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
