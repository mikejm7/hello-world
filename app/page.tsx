'use client';
import React, { useState, useEffect, useRef } from 'react';
import './globals.css';

const WebSlinger = () => {
  const handRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (handRef.current) {
        const rect = handRef.current.getBoundingClientRect();
        setCoords({ x: rect.left + 5, y: rect.top + 5 });
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* WEB LAYER */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        {/* Entry Web: Top-Left to Hand */}
        <line 
          x1="0" y1="0" 
          x2={coords.x} y2={coords.y} 
          stroke="white" strokeWidth="2.5" 
          className="web-line" 
          style={{ animation: 'web-entry-delayed 10s linear infinite' }}
        />
        {/* Exit Web: Top-Right to Hand */}
        <line 
          x1="100%" y1="0" 
          x2={coords.x} y2={coords.y} 
          stroke="white" strokeWidth="2.5" 
          className="web-line" 
          style={{ animation: 'web-exit-delayed 10s linear infinite' }}
        />
      </svg>

      {/* SPIDEY */}
      <div className="absolute top-0 left-0 animate-spidey">
        <div className="relative w-40 h-40">
          <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-2xl" />
          {/* Hand Pin (adjust top/left % to hit his fingers exactly) */}
          <div ref={handRef} className="absolute" style={{ top: '65%', left: '15%', width: '1px', height: '1px' }} />
        </div>
      </div>
    </div>
  );
};

const BackgroundCity = () => (
  <div className="fixed bottom-0 left-0 w-[200%] h-64 pointer-events-none z-0 opacity-20 animate-city">
    <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full fill-black">
      <rect x="0" y="100" width="50" height="100" />
      <rect x="60" y="40" width="80" height="160" />
      <rect x="150" y="120" width="40" height="80" />
      <rect x="200" y="20" width="60" height="180" />
      <rect x="270" y="80" width="70" height="120" />
      <rect x="350" y="110" width="50" height="90" />
      <rect x="420" y="50" width="90" height="150" />
      {/* Pattern repeats... */}
      <rect x="550" y="100" width="50" height="100" />
      <rect x="610" y="40" width="80" height="160" />
      <rect x="700" y="20" width="60" height="180" />
      <rect x="800" y="80" width="70" height="120" />
    </svg>
  </div>
);

export default function SpideyInvite() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // ... (Keep existing state and form handlers from previous steps) ...

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4 font-comic relative overflow-hidden bg-[#FFEB3B]">
      <BackgroundCity />
      <WebSlinger />
      
      {/* RSVP CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        {/* LOGO */}
        <div className="w-full max-w-[320px] mb-8 transform -rotate-2">
          <svg viewBox="0 0 600 600" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
            <text x="50%" y="30%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase font-bold text-6xl">You're Invited to</text>
            <text x="50%" y="50%" textAnchor="middle" fontSize="120" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase font-bold text-6xl">Lucas'</text>
            <text x="50%" y="70%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase font-bold text-6xl">5th Birthday Party</text>
          </svg>
        </div>

        {/* STEP 1 FORM (Example) */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); if(firstName) setStep(2); }} className="flex flex-col items-center w-full space-y-4">
            <h2 className="text-3xl italic uppercase font-bold">Guest Check-In</h2>
            <input type="text" placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none" />
            <button type="submit" className="mt-4 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] uppercase italic font-bold">RSVP</button>
          </form>
        )}

        {/* ... Rest of the form steps (2, 3, 4, 5, 0) logic from previous turns ... */}
      </div>
    </main>
  );
}
