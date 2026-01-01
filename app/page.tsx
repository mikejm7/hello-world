'use client';
import React, { useState, useEffect, useRef } from 'react';

const ComicHeader = () => (
  <div className="w-full max-w-[500px] drop-shadow-[12px_12px_0px_rgba(0,0,0,1)] mb-10">
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Yellow Burst - High Jagged Count */}
      <path 
        d="M250,10 L285,75 L340,30 L355,100 L425,65 L415,135 L485,120 L440,195 L495,250 L440,305 L485,380 L415,365 L425,435 L355,400 L340,470 L285,425 L250,490 L215,425 L160,470 L145,400 L75,435 L85,365 L15,380 L60,305 L5,250 L60,195 L15,120 L85,135 L75,65 L145,100 L160,30 L215,75 Z" 
        fill="#FFEB3B" stroke="black" strokeWidth="4"
      />
      {/* Inner Blue Burst */}
      <path 
        d="M250,50 L285,105 L330,70 L340,130 L400,105 L385,165 L450,185 L405,230 L445,300 L380,290 L370,350 L315,325 L250,370 L185,325 L130,350 L120,290 L55,300 L95,230 L50,185 L115,165 L100,105 L160,130 L170,70 L215,105 Z" 
        fill="#03A9F4" stroke="black" strokeWidth="8"
      />
      {/* Text perfectly centered within the SVG units */}
      <text x="50%" y="38%" textAnchor="middle" fontSize="32" fill="white" stroke="black" strokeWidth="6" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
      <text x="50%" y="56%" textAnchor="middle" fontSize="62" fill="#E62429" stroke="black" strokeWidth="2" fontFamily="Bangers">LUCAS'S 5TH</text>
      <text x="50%" y="74%" textAnchor="middle" fontSize="32" fill="white" stroke="black" strokeWidth="6" paintOrder="stroke" fontFamily="Bangers">BIRTHDAY PARTY!</text>
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
          {/* Centered Label */}
          <h2 className="text-4xl text-black text-center uppercase font-comic">Enter Secret Code</h2>
          
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center space-y-8">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full max-w-[280px] p-4 border-[8px] border-black text-center text-4xl font-bold bg-white shadow-[10px_10px_0px_black]"
              placeholder="" 
            />
            {/* Centered 'ENTER' Button */}
            <button 
              type="submit" 
              className="bg-[#E62429] text-white text-5xl font-comic py-3 px-16 border-[6px] border-black shadow-[8px_8px_0px_black] hover:scale-105 active:translate-y-1 transition-all uppercase"
            >
              ENTER
            </button>
          </form>
        </div>
      )}

      {isUnlocked && (
        <div className="w-full animate-in zoom-in duration-500 text-center">
          <div className="bg-[#03A9F4] border-[8px] border-black p-6 text-white shadow-[10px_10px_0px_black] transform rotate-1">
             <h3 className="text-4xl uppercase">Mission Intel Unlocked!</h3>
             <p className="text-2xl mt-4">Date: March 27 @ 2:00 PM</p>
             <p className="text-2xl">Location: Secret Base HQ</p>
          </div>
        </div>
      )}
    </main>
  );
               }
