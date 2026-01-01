'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function SpideyInvite() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  const intelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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
      if (audioRef.current) audioRef.current.play();
      setIsUnlocked(true);
    } else {
      alert("THWIP! WRONG CODE!");
    }
  };

  return (
    <main className="w-full max-w-md flex flex-col items-center py-10 px-4 space-y-12">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      {/* HEADER: Background Burst Layered Behind Text */}
      <div className="relative w-full flex flex-col items-center justify-center p-12 min-h-[300px]">
        {/* The Burst SVG Background */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="w-full h-full drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
            <path 
              d="M250,10 L290,90 L370,40 L370,120 L470,90 L420,180 L490,250 L420,320 L470,410 L370,380 L370,460 L290,410 L250,490 L210,410 L130,460 L130,380 L30,410 L80,320 L10,250 L80,180 L30,90 L130,120 L130,40 L210,90 Z" 
              fill="#03A9F4" 
              stroke="black" 
              strokeWidth="12"
            />
          </svg>
        </div>

        {/* The Text Layer */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <h1 className="font-comic text-3xl text-readable uppercase">YOU'RE INVITED TO</h1>
          <h1 className="font-comic text-5xl text-black uppercase tracking-tighter">LUCAS'S 5TH</h1>
          <h1 className="font-comic text-3xl text-readable uppercase">BIRTHDAY PARTY!</h1>
        </div>
      </div>

      {/* CODE ENTRY */}
      {!isUnlocked && (
        <div className="w-full flex flex-col items-center space-y-4">
          <h2 className="font-comic text-4xl text-black italic text-center">ENTER SECRET CODE</h2>
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center space-y-4">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full max-w-[300px] p-4 border-8 border-black text-center text-4xl font-bold uppercase bg-white shadow-[8px_8px_0px_black] outline-none"
              placeholder="_____"
            />
            <button 
              type="submit" 
              className="bg-[#E62429] text-white font-comic text-4xl py-3 px-12 border-4 border-black shadow-[4px_4px_0px_black] active:translate-y-1 transition-all"
            >
              GO TIME!
            </button>
          </form>
        </div>
      )}

      {/* REVEALED CONTENT */}
      {isUnlocked && (
        <div ref={intelRef} className="w-full flex flex-col items-center space-y-10">
          <div className="w-full bg-[#03A9F4] comic-border p-6 text-white text-center transform rotate-1">
            <p className="font-comic text-3xl uppercase leading-tight">DATE: FRIDAY, MARCH 27 @ 2:00 PM</p>
            <p className="font-comic text-3xl uppercase leading-tight mt-4">LOCATION: SPIDEY SECRET BASE HQ</p>
          </div>

          {!hasRSVPd ? (
            <div className="w-full bg-[#E62429] comic-border p-6 transform -rotate-1">
              <h3 className="font-comic text-4xl text-yellow-300 text-center mb-6 underline">MISSION INTEL!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="w-full space-y-4 flex flex-col items-center">
                <input type="text" name="hero" placeholder="HERO NAME" required className="w-full p-4 border-4 border-black font-bold uppercase text-center" />
                <input type="number" name="guests" placeholder="GUESTS" required className="w-full p-4 border-4 border-black font-bold uppercase text-center" />
                <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-4xl py-4 border-4 border-black shadow-[6px_6px_0px_black]">
                  SEND RSVP
                </button>
              </form>
            </div>
          ) : (
            <div className="w-full bg-white comic-border p-8 text-center">
              <h3 className="font-comic text-5xl text-[#E62429] mb-6">LAUNCHING IN:</h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex flex-col items-center bg-yellow-400 border-4 border-black p-2">
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
