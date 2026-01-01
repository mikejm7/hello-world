'use client';
import React, { useState, useEffect, useRef } from 'react';

// BEST PRACTICE: Unified SVG Component
// This locks the text and the jagged border together so they can't separate.
const ComicHeader = () => (
  <div className="w-full max-w-[500px] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      {/* The Jagged Path from your POW mockup */}
      <path 
        d="M250,20 L310,90 L390,40 L390,130 L480,100 L430,190 L500,250 L430,310 L480,400 L390,370 L390,460 L310,410 L250,470 L190,410 L110,460 L110,370 L20,400 L70,310 L0,250 L70,190 L20,100 L110,130 L110,40 L190,90 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="12"
      />
      {/* Locked Text inside the SVG */}
      <text x="50%" y="35%" textAnchor="middle" fontSize="38" fill="white" stroke="black" strokeWidth="6" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
      <text x="50%" y="55%" textAnchor="middle" fontSize="70" fill="black" fontFamily="Bangers">LUCAS'S 5TH</text>
      <text x="50%" y="75%" textAnchor="middle" fontSize="38" fill="white" stroke="black" strokeWidth="6" paintOrder="stroke" fontFamily="Bangers">BIRTHDAY PARTY!</text>
    </svg>
  </div>
);

export default function SpideyPage() {
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
    <main className="w-full max-w-md flex flex-col items-center py-10 px-4 space-y-8">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      {/* 1. Header Object */}
      <ComicHeader />

      {/* 2. Code Entry Section */}
      {!isUnlocked && (
        <div className="w-full flex flex-col items-center space-y-4">
          <h2 className="text-4xl text-black italic text-center uppercase">Enter Secret Code</h2>
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border-[6px] border-black text-center text-4xl font-bold bg-white shadow-[8px_8px_0px_black] outline-none"
              placeholder="_____"
            />
            <button type="submit" className="bg-[#E62429] text-white text-4xl py-3 px-10 border-4 border-black mt-6 shadow-[4px_4px_0px_black] active:translate-y-1 transition-all uppercase">
              GO TIME!
            </button>
          </form>
        </div>
      )}

      {/* 3. Reveal Section */}
      {isUnlocked && (
        <div ref={intelRef} className="w-full flex flex-col items-center space-y-8 animate-in zoom-in duration-500">
          {/* Mission Intel Panel */}
          <div className="w-full bg-[#03A9F4] border-8 border-black p-6 text-white text-center shadow-[10px_10px_0px_black] transform rotate-1">
            <p className="text-3xl uppercase">DATE: FRIDAY, MARCH 27 @ 2:00 PM</p>
            <p className="text-3xl uppercase mt-2">LOCATION: SPIDEY SECRET BASE HQ</p>
          </div>

          {!hasRSVPd ? (
            /* RSVP Section */
            <div className="w-full bg-[#E62429] border-8 border-black p-6 shadow-[10px_10px_0px_black] transform -rotate-1">
              <h3 className="text-4xl text-[#FFEB3B] text-center mb-6 underline uppercase">Mission Intel!</h3>
              <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" onSubmit={() => setHasRSVPd(true)} className="w-full space-y-4">
                <input type="text" name="hero" placeholder="HERO NAME" required className="w-full p-4 border-4 border-black font-bold text-center" />
                <input type="number" name="guests" placeholder="GUESTS" required className="w-full p-4 border-4 border-black font-bold text-center" />
                <button type="submit" className="w-full bg-yellow-400 text-black text-4xl py-4 border-4 border-black shadow-[6px_6px_0px_black] uppercase">
                  Send RSVP
                </button>
              </form>
            </div>
          ) : (
            /* Countdown Section */
            <div className="w-full bg-white border-8 border-black p-8 text-center shadow-[10px_10px_0px_black]">
              <h3 className="text-5xl text-[#E62429] mb-6 uppercase">Launching In:</h3>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(timeLeft).map(([label, val]) => (
                  <div key={label} className="flex flex-col items-center bg-yellow-400 border-4 border-black p-2">
                    <span className="text-3xl text-black">{val}</span>
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
              
