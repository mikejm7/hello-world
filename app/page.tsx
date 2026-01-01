'use client';
import React, { useState, useRef } from 'react';

const ComicHeader = () => (
  <div className="w-full max-w-[500px] drop-shadow-[15px_15px_0px_rgba(0,0,0,1)] mb-8">
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Halftone Dot Pattern like the POW image */}
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="black" opacity="0.2" />
        </pattern>
      </defs>

      {/* Outer Yellow Burst - Expanded points to prevent clipping */}
      <path 
        d="M300,30 L340,110 L410,50 L425,140 L510,100 L495,190 L585,170 L530,260 L595,330 L530,400 L585,490 L495,470 L510,560 L425,520 L410,610 L340,550 L300,630 L260,550 L190,610 L175,520 L90,560 L105,470 L15,490 L70,400 L5,330 L70,260 L15,170 L105,190 L90,100 L175,140 L190,50 L260,110 Z" 
        fill="#FFEB3B" stroke="black" strokeWidth="6"
      />
      
      {/* Inner Blue Burst with Dots */}
      <path 
        d="M300,100 L340,170 L400,130 L415,200 L490,170 L475,250 L550,230 L500,310 L560,390 L490,380 L480,460 L410,430 L300,500 L190,430 L120,460 L110,380 L40,390 L100,310 L50,230 L125,250 L110,170 L185,200 L200,130 L260,170 Z" 
        fill="#03A9F4" stroke="black" strokeWidth="12"
      />
      <path 
        d="M300,100 L340,170 L400,130 L415,200 L490,170 L475,250 L550,230 L500,310 L560,390 L490,380 L480,460 L410,430 L300,500 L190,430 L120,460 L110,380 L40,390 L100,310 L50,230 L125,250 L110,170 L185,200 L200,130 L260,170 Z" 
        fill="url(#dots)"
      />

      {/* Locked Text - Vertically Spaced */}
      <text x="50%" y="36%" textAnchor="middle" fontSize="38" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
      <text x="50%" y="54%" textAnchor="middle" fontSize="72" fill="#E62429" stroke="black" strokeWidth="3" fontFamily="Bangers">LUCAS'S 5TH</text>
      <text x="50%" y="72%" textAnchor="middle" fontSize="38" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">BIRTHDAY PARTY!</text>
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
    <main className="w-full max-w-md flex flex-col items-center px-6">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      <ComicHeader />

      {!isUnlocked && (
        <div className="w-full flex flex-col items-center space-y-6">
          <h2 className="text-4xl text-black text-center uppercase font-comic">Enter Secret Code</h2>
          
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center space-y-6">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full max-w-[280px] p-4 border-[8px] border-black text-center text-5xl font-bold bg-white shadow-[12px_12px_0px_black]"
              placeholder="" 
            />
            <button 
              type="submit" 
              className="bg-[#E62429] text-white text-5xl font-comic py-3 px-16 border-[6px] border-black shadow-[10px_10px_0px_black] hover:scale-105 active:translate-y-1 transition-all uppercase"
            >
              ENTER
            </button>
          </form>
        </div>
      )}

      {isUnlocked && (
        <div className="w-full animate-in zoom-in duration-500 text-center">
          <div className="bg-[#03A9F4] border-[10px] border-black p-8 text-white shadow-[15px_15px_0px_black] transform rotate-1">
             <h3 className="text-5xl uppercase">Mission Intel Unlocked!</h3>
             <p className="text-3xl mt-4">Date: March 27 @ 2:00 PM</p>
             <p className="text-3xl">Location: Secret Base HQ</p>
          </div>
        </div>
      )}
    </main>
  );
        }
