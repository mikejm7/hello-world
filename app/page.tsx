'use client';
import React, { useState, useRef } from 'react';

// --- BACKGROUND ANIMATION COMPONENT ---
const WebSlinger = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-80">
    <div className="absolute top-1/4 left-[-200px] w-[200px] animate-swing">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* The Web Line */}
        <line x1="180" y1="0" x2="100" y2="100" stroke="black" strokeWidth="2" />
        {/* Spidey Silhouette */}
        <g transform="translate(60, 80) rotate(-20)">
           {/* Body */}
           <path d="M40,30 Q60,10 80,30 T100,60 L90,90 L50,90 L40,60 Z" fill="#E62429" stroke="black" strokeWidth="2"/>
           {/* Head */}
           <circle cx="70" cy="20" r="15" fill="#E62429" stroke="black" strokeWidth="2" />
           {/* Eyes */}
           <path d="M63,18 Q70,10 77,18" fill="white" stroke="black" strokeWidth="2" />
           {/* Legs */}
           <path d="M50,90 L30,120 M90,90 L110,110" stroke="#03A9F4" strokeWidth="8" strokeLinecap="round" />
           {/* Arms holding web */}
           <path d="M40,40 L20,10 M100,40 L120,20" stroke="#03A9F4" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  </div>
);

// --- HEADER COMPONENT ---
const ComicHeader = () => (
  <div className="w-full max-w-[380px] mb-8 transform -rotate-2 relative z-10">
    <svg 
      viewBox="0 0 600 500" 
      xmlns="http://www.w3.org/2000/svg" 
      className="overflow-visible filter drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]"
    >
      {/* THE BURST: Scaled down slightly visually by reducing stroke width relative to container */}
      <path 
        d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="14" 
        strokeLinejoin="miter" 
      />
      
      {/* TEXT */}
      <text x="50%" y="35%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
      <text x="50%" y="54%" textAnchor="middle" fontSize="82" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">LUCAS'S 5TH</text>
      <text x="50%" y="73%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">BIRTHDAY PARTY!</text>
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

      {/* Background Animation */}
      <WebSlinger />

      {/* Main Content Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[400px]">
        
        <ComicHeader />

        {!isUnlocked ? (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl text-black text-center uppercase mb-4 italic tracking-wide">Enter Secret Code</h2>
            
            <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-6">
              {/* Reduced input size */}
              <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                className="w-[260px] p-3 border-[6px] border-black text-center text-4xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase focus:outline-none"
                autoFocus
              />
              {/* Reduced button size */}
              <button 
                type="submit" 
                className="bg-[#E62429] text-white text-4xl py-2 px-12 border-[4px] border-black shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none transition-all uppercase"
              >
                ENTER
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-6 animate-in zoom-in duration-500">
            <div className="w-full bg-[#03A9F4] border-[8px] border-black p-6 text-white shadow-[10px_10px_0px_black] transform rotate-1 text-center">
               <h3 className="text-4xl uppercase mb-3">Mission Intel Unlocked!</h3>
               <p className="text-2xl uppercase">Friday, March 27 @ 2:00 PM</p>
               <p className="text-2xl uppercase">Spidey Secret HQ</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
