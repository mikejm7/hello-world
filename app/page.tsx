'use client';
import React, { useState, useRef } from 'react';

const ComicHeader = () => (
  <div className="w-full max-w-[500px] mb-12 transform -rotate-2">
    {/* The drop-shadow-solid filter creates that 3D comic block effect */}
    <svg 
      viewBox="0 0 600 500" 
      xmlns="http://www.w3.org/2000/svg" 
      className="overflow-visible filter drop-shadow-[12px_12px_0px_rgba(0,0,0,1)]"
    >
      {/* THE BURST: One single path, thick border, Spidey Blue */}
      <path 
        d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="14" 
        strokeLinejoin="miter" 
      />

      {/* THE TEXT: Locked inside SVG, centered, white with black outlines */}
      <text x="50%" y="35%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
      <text x="50%" y="54%" textAnchor="middle" fontSize="82" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" fontFamily="Bangers">LUCAS'S 5TH</text>
      <text x="50%" y="73%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" fontFamily="Bangers">BIRTHDAY PARTY!</text>
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
    <main className="w-full min-h-screen bg-[#FFEB3B] flex flex-col items-center justify-center px-6 font-comic">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      {/* 1. Header Section */}
      <ComicHeader />

      {/* 2. Interaction Section */}
      {!isUnlocked ? (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-4xl text-black text-center uppercase mb-6 italic tracking-wide">Enter Secret Code</h2>
          
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-8">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value)}
              className="w-full max-w-[280px] p-5 border-[8px] border-black text-center text-5xl font-bold bg-white shadow-[12px_12px_0px_black] uppercase focus:outline-none"
              autoFocus
            />
            <button 
              type="submit" 
              className="bg-[#E62429] text-white text-5xl py-4 px-20 border-[6px] border-black shadow-[8px_8px_0px_black] active:translate-y-1 active:shadow-none transition-all uppercase"
            >
              ENTER
            </button>
          </form>
        </div>
      ) : (
        /* 3. Revealed Section */
        <div className="w-full flex flex-col items-center space-y-8 animate-in zoom-in duration-500">
          <div className="w-full bg-[#03A9F4] border-[10px] border-black p-8 text-white shadow-[15px_15px_0px_black] transform rotate-1 text-center">
             <h3 className="text-5xl uppercase mb-4">Mission Intel Unlocked!</h3>
             <p className="text-3xl uppercase">Friday, March 27 @ 2:00 PM</p>
             <p className="text-3xl uppercase">Spidey Secret HQ</p>
          </div>
        </div>
      )}
    </main>
  );
}
