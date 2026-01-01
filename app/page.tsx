'use client';
import React, { useState, useEffect, useRef } from 'react';

// Reusable Comic Burst Component
const ComicBurst = ({ children, color = "#03A9F4" }) => (
  <div className="burst-wrapper relative flex items-center justify-center">
    <svg viewBox="0 0 500 300" className="w-full h-auto">
      <path 
        d="M250,10 L290,50 L350,20 L360,70 L430,40 L410,100 L490,110 L430,160 L480,220 L400,210 L380,280 L310,230 L250,290 L190,230 L120,280 L100,210 L20,220 L70,160 L10,110 L90,100 L70,40 L140,70 L150,20 L210,50 Z" 
        fill={color} 
        stroke="black" 
        strokeWidth="8"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center p-8">
      {children}
    </div>
  </div>
);

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
      setTimeout(() => {
        intelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isUnlocked]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === SECRET_CODE) {
      if (thwipAudio.current) thwipAudio.current.play();
      setIsUnlocked(true);
    } else {
      alert("THWIP! Try again!");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 space-y-10">
      <audio ref={thwipAudio} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      {/* HEADER */}
      <ComicBurst>
        <h1 className="font-comic text-3xl md:text-5xl text-white text-center leading-none uppercase">
          <span className="text-stroke block">YOU'RE INVITED TO</span>
          <span className="text-black text-4xl md:text-6xl block mt-1">LUCAS'S 5TH</span>
          <span className="text-stroke block mt-1">BIRTHDAY PARTY!</span>
        </h1>
      </ComicBurst>

      {/* CODE ENTRY */}
      {!isUnlocked && (
        <div className="w-full max-w-sm flex flex-col items-center">
          <h2 className="font-comic text-4xl text-black mb-4 italic">ENTER SECRET CODE</h2>
          <form onSubmit={handleVerify} className="w-full relative flex flex-col items-center">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border-8 border-black text-center text-4xl font-bold uppercase bg-white shadow-[10px_10px_0px_black] outline-none"
              placeholder="_____"
            />
            <button 
              type="submit" 
              className="bg-[#E62429] text-white font-comic text-3xl py-2 px-8 border-4 border-black mt-6 shadow-[4px_4px_0px_black] hover:scale-105 active:translate-y-1 transition-all"
            >
              GO TIME!
            </button>
          </form>
        </div>
      )}

      {/* REVEALED CONTENT */}
      {isUnlocked && (
        <div ref={intelRef} className="w-full max-w-md space-y-10 animate-in zoom-in duration-500">
          <div className="bg-[#03A9F4] border-8 border-black p-6 text-white text-center shadow-[10px_10px_0px_black] transform rotate-1">
            <p className="font-comic text-3xl uppercase">DATE: FRIDAY, MARCH 27 @ 2:00 PM</p>
            <p className="font-comic text-3xl uppercase mt-4">LOCATION: SPIDEY SECRET BASE HQ</p>
          </div>

          {!hasRSVPd ? (
            <div className="bg-[#E62429] border-8 border-black p-6 shadow-[10px_10px_0px_black] transform -rotate-1">
              <h3 className="font-comic text-4xl text-[#FFEB3B] text-center mb-6 underline">MISSION INTEL!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="space-y-4">
                <input type="text" name="hero" placeholder="HERO NAME" required className="w-full p-4 border-4 border-black font-bold uppercase text-center" />
                <input type="number" name="guests" placeholder="GUESTS" required className="w-full p-4 border-4 border-black font-bold uppercase text-center" />
                <button type="submit" className="w-full bg-[#FFEB3B] text-black font-comic text-4xl py-4 border-4 border-black shadow-[6px_6px_0px_black]">
                  SEND RSVP
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white border-8 border-black p-8 text-center shadow-[10px_10px_0px_black]">
              <h3 className="font-comic text-5xl text-[#E62429] mb-6">LAUNCHING IN:</h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex flex-col bg-yellow-400 border-4 border-black p-2">
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
