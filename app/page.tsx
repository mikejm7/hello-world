'use client';
import React, { useState, useRef } from 'react';
import './globals.css';

const WebSlinger = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute top-0 left-0 animate-spidey-path">
      <div className="relative w-40 h-40">
        <svg className="absolute overflow-visible" style={{ top: '0', left: '0', width: '2000px', height: '2000px' }}>
          <line x1="45" y1="110" x2="-1000" y2="-1200" stroke="white" strokeWidth="5" className="web-line" style={{ strokeLinecap: 'round' }} />
        </svg>
        <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]" />
      </div>
    </div>
  </div>
);

const ComicHeader = () => (
  <div className="w-full max-w-[320px] mb-12 transform -rotate-2 relative z-10">
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="overflow-visible filter drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
      <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
      <text x="50%" y="32%" textAnchor="middle" fontSize="48" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="font-comic italic uppercase">You're Invited to</text>
      <text x="50%" y="52%" textAnchor="middle" fontSize="90" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="font-comic italic uppercase tracking-tighter">Lucas' 5th</text>
      <text x="50%" y="70%" textAnchor="middle" fontSize="48" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="font-comic italic uppercase">Birthday Party</text>
    </svg>
  </div>
);

export default function SpideyInvite() {
  const [userName, setUserName] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    // For this prompt, any name over 2 chars unlocks, otherwise triggers shake
    if (userName.trim().length > 2) {
      if (audioRef.current) audioRef.current.play();
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12 px-4 font-comic relative overflow-hidden bg-[#FFEB3B]">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />

      <WebSlinger />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        <ComicHeader />

        {!isUnlocked ? (
          <div className="w-full flex flex-col items-center mt-4">
            <h2 className="text-3xl text-black text-center uppercase mb-6 italic tracking-wide">Enter Your Name</h2>
            <form onSubmit={handleEntry} className="w-full flex flex-col items-center gap-6">
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)}
                className={`w-[280px] p-3 border-[6px] border-black text-center text-3xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase focus:outline-none transition-transform ${error ? 'animate-shake-3d' : ''}`}
                placeholder="HERO NAME"
              />
              <button type="submit" className="bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none transition-all uppercase">
                JOIN MISSION
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center mt-4 space-y-4 animate-in zoom-in duration-500">
            <div className="w-full bg-[#03A9F4] border-[8px] border-black p-6 text-white shadow-[10px_10px_0px_black] transform rotate-1 text-center">
               <h3 className="text-3xl uppercase mb-4 leading-tight">Welcome Hero, {userName}! <br/>Join us to celebrate Lucas' 5th birthday</h3>
               
               <div className="text-left space-y-4 border-t-4 border-black/20 pt-4">
                  <p className="text-xl"><span className="text-yellow-300">WHEN:</span> Friday, March 27 @ 2:00 PM</p>
                  <p className="text-xl"><span className="text-yellow-300">WHERE:</span> Spidey Secret HQ, 123 Hero Lane</p>
                  <p className="text-xl"><span className="text-yellow-300">RSVP:</span> By March 15th</p>
                  
                  <div className="bg-white/10 p-3 border-2 border-dashed border-white/50 rounded-lg mt-4">
                    <p className="text-lg leading-snug">
                      <span className="font-bold text-[#FFEB3B]">GIFT INFO:</span> No gifts, please! Your presence is the best present. If you'd like to honor Lucas, please donate to:
                    </p>
                    <a href="https://www.charitywater.org" target="_blank" className="text-yellow-300 underline block mt-2 break-all">charitywater.org/donate</a>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
