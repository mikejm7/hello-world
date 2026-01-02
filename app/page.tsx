'use client';
import React, { useState, useRef } from 'react';
import './globals.css';

const WebSlinger = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {/* Spidey Container */}
    <div className="absolute top-0 left-0 animate-spidey-path">
      <div className="relative">
        
        {/* The Web: 
            Originates from 'right hand' (approx x:40, y:120 in the image frame)
            Targets the left edge of the screen (negative viewport width) */}
        <svg 
          className="absolute overflow-visible" 
          style={{ top: '0', left: '0' }}
        >
          <line 
            x1="-120vw"  /* Reaches out to the left edge of the screen */
            y1="20vh"    /* Anchor height on the left */
            x2="60"      /* Matches Spidey's hand position in the 160px wide image */
            y2="120" 
            stroke="white" 
            strokeWidth="5" 
            className="web-line"
            style={{ 
              filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.2))',
              strokeLinecap: 'round'
            }}
          />
        </svg>
        
        <img 
          src="/spidey-swing.png" 
          alt="Spidey" 
          className="w-40 h-auto drop-shadow-2xl"
          /* Image is now un-flipped (original orientation) */
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
    </div>
  </div>
);

const ComicHeader = () => (
  <div className="w-full max-w-[320px] mb-20 transform -rotate-2 relative z-10">
    <svg 
      viewBox="0 0 600 500" 
      className="overflow-visible filter drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
    >
      <path 
        d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="14" 
      />
      <text x="50%" y="35%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="font-comic">YOU'RE INVITED TO</text>
      <text x="50%" y="54%" textAnchor="middle" fontSize="82" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="font-comic">LUCAS'S 5TH</text>
      <text x="50%" y="73%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="font-comic">BIRTHDAY PARTY!</text>
    </svg>
  </div>
);

export default function SpideyInvite() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === "SPIDEY6") {
      if (audioRef.current) audioRef.current.play();
      setIsUnlocked(true);
    } else {
      alert("THWIP! WRONG CODE!");
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#FFEB3B] flex flex-col items-center justify-center px-4 font-comic relative overflow-hidden">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      <WebSlinger />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        <ComicHeader />

        {!isUnlocked ? (
          <div className="w-full flex flex-col items-center mt-8">
            <h2 className="text-3xl text-black text-center uppercase mb-6 italic tracking-wide">Enter Secret Code</h2>
            <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-6">
              <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                className="w-[260px] p-3 border-[6px] border-black text-center text-3xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none transition-all uppercase"
              >
                ENTER
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center mt-8 space-y-6 animate-in zoom-in duration-500">
            <div className="w-full bg-[#03A9F4] border-[8px] border-black p-6 text-white shadow-[10px_10px_0px_black] transform rotate-1 text-center">
               <h3 className="text-4xl uppercase mb-2">Mission Intel Unlocked!</h3>
               <p className="text-2xl uppercase font-bold">Friday, March 27 @ 2:00 PM</p>
               <p className="text-2xl uppercase">Spidey Secret HQ</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
