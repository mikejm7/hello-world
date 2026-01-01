'use client';
import React, { useState, useRef } from 'react';

// --- BACKGROUND ANIMATION COMPONENT ---
const WebSlinger = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-[300px] animate-swing origin-top-left">
      {/* NOTE: For this to work perfectly, find a transparent PNG of Spidey swinging 
         and save it as 'spidey-swing.png' in your 'public' folder. 
      */}
      <div className="relative">
        {/* The Web Line (Draws a line from top-left off screen to Spidey's hand) */}
        <svg className="absolute -top-[200px] left-[50px] w-full h-[300px] overflow-visible">
           <line x1="-100" y1="-200" x2="100" y2="220" stroke="white" strokeWidth="4" />
        </svg>
        
        {/* The Character Image */}
        {/* Replace src below with your specific 'Spidey and his Amazing Friends' PNG */}
        <img 
          src="/spidey-swing.png" 
          alt="Spidey Swinging" 
          className="w-48 h-auto drop-shadow-lg transform rotate-12"
          onError={(e) => {
            // Fallback if user hasn't added the image yet
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Fallback SVG if no image is found (A simple spider icon) */}
        <div className="w-48 h-48 flex items-center justify-center absolute top-0 left-0 -z-10">
           <span className="text-9xl">🕷️</span>
        </div>
      </div>
    </div>
  </div>
);

// --- HEADER COMPONENT (Scaled Down) ---
const ComicHeader = () => (
  <div className="w-full max-w-[320px] mb-6 transform -rotate-2 relative z-10">
    <svg 
      viewBox="0 0 600 500" 
      xmlns="http://www.w3.org/2000/svg" 
      className="overflow-visible filter drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
    >
      {/* THE BURST: Spidey Blue with Thick Black Border */}
      <path 
        d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="14" 
        strokeLinejoin="miter" 
      />
      
      {/* TEXT: Adjusted size for smaller container */}
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

      {/* The Swinging Hero Background */}
      <WebSlinger />

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        
        <ComicHeader />

        {!isUnlocked ? (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl text-black text-center uppercase mb-4 italic tracking-wide">Enter Secret Code</h2>
            
            <form onSubmit={handleVerify} className="w-full flex flex-col items-center gap-5">
              {/* Reduced Input Size */}
              <input 
                type="text" 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                className="w-[240px] p-3 border-[6px] border-black text-center text-3xl font-bold bg-white shadow-[6px_6px_0px_black] uppercase focus:outline-none"
                autoFocus
              />
              {/* Reduced Button Size */}
              <button 
                type="submit" 
                className="bg-[#E62429] text-white text-3xl py-2 px-10 border-[4px] border-black shadow-[5px_5px_0px_black] active:translate-y-1 active:shadow-none transition-all uppercase"
              >
                ENTER
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-6 animate-in zoom-in duration-500">
            <div className="w-full bg-[#03A9F4] border-[8px] border-black p-6 text-white shadow-[10px_10px_0px_black] transform rotate-1 text-center">
               <h3 className="text-3xl uppercase mb-2">Mission Intel Unlocked!</h3>
               <p className="text-xl uppercase">Friday, March 27 @ 2:00 PM</p>
               <p className="text-xl uppercase">Spidey Secret HQ</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
  }
