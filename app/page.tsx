'use client';
import React, { useState, useEffect, useRef } from 'react';
import './globals.css';

const WebSlinger = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute top-0 left-0 animate-spidey-path">
      <div className="relative w-40 h-40">
        <svg className="absolute overflow-visible" style={{ top: '0', left: '0', width: '3000px', height: '3000px' }}>
          {/* Web 1: Land just right of the top left corner */}
          <line x1="45" y1="110" x2="-200" y2="-1200" stroke="white" strokeWidth="6" className="web-left" style={{ strokeLinecap: 'round' }} />
          
          {/* Web 2: Land just left of the top right corner */}
          <line x1="45" y1="110" x2="1500" y2="-1000" stroke="white" strokeWidth="6" className="web-right" style={{ strokeLinecap: 'round' }} />
        </svg>
        <img 
          src="/spidey-swing.png" 
          alt="Spidey" 
          className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" 
        />
      </div>
    </div>
  </div>
);

// Helper for Countdown
const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-center font-bold text-yellow-300 mt-2">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="bg-black/40 p-1 rounded min-w-[45px]">
          <div className="text-xl leading-none">{val}</div>
          <div className="text-[10px] uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
};

export default function SpideyInvite() {
  const [step, setStep] = useState(1); // 1: Name, 2: RSVP, 3: Count, 4: Confirmed, 0: Rejected
  const [userName, setUserName] = useState('');
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim().length < 2) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    setStep(2);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4 font-comic relative overflow-hidden bg-[#FFEB3B]">
      <audio ref={audioRef} src="https://www.myinstants.com/media/sounds/thwip.mp3" />
      <WebSlinger />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        {/* REFINED HEADER */}
        <div className="w-full max-w-[320px] mb-8 transform -rotate-2">
          <svg viewBox="0 0 600 600" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
            <text x="50%" y="30%" textAnchor="middle" fontSize="40" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">You're Invited to</text>
            <text x="50%" y="48%" textAnchor="middle" fontSize="120" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase">Lucas'</text>
            <text x="50%" y="65%" textAnchor="middle" fontSize="40" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">5th Birthday Party</text>
          </svg>
        </div>

        {/* STEP 1: NAME */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="flex flex-col items-center w-full">
            <h2 className="text-3xl mb-4 italic uppercase">Enter Name</h2>
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              className={`w-[280px] p-3 border-[6px] border-black text-center text-3xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`}
            />
            <button type="submit" className="mt-8 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none uppercase">RSVP</button>
          </form>
        )}

        {/* STEP 2: CHOICE */}
        {step === 2 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] text-center w-full animate-in zoom-in">
            <h2 className="text-3xl mb-6 uppercase leading-tight">{userName}, are you coming?</h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep(3)} className="bg-green-500 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">YES</button>
              <button onClick={() => setStep(0)} className="bg-red-600 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">NO</button>
            </div>
          </div>
        )}

        {/* STEP 3: HEADCOUNT */}
        {step === 3 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full animate-in slide-in-from-right">
            <h2 className="text-2xl mb-4 uppercase text-center font-bold underline italic">Hero Headcount</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <span className="text-xl uppercase">Adults:</span>
                <input type="number" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} className="w-16 text-center border-2 border-black font-bold" min="1" />
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <span className="text-xl uppercase">Kids:</span>
                <input type="number" value={kids} onChange={(e) => setKids(parseInt(e.target.value))} className="w-16 text-center border-2 border-black font-bold" min="0" />
              </div>
            </div>
            <button onClick={() => { if (audioRef.current) audioRef.current.play(); setStep(4); }} className="w-full mt-6 bg-[#E62429] text-white text-3xl py-2 border-4 border-black shadow-[4px_4px_0px_black] uppercase">Confirm</button>
          </div>
        )}

        {/* STEP 4: FINAL INTEL */}
        {step === 4 && (
          <div className="space-y-6 w-full animate-in zoom-in">
            <div className="bg-[#03A9F4] border-[8px] border-black p-5 text-white shadow-[10px_10px_0px_black] text-center">
               <h3 className="text-2xl uppercase font-bold underline mb-2">Lucas' 5th Birthday Mission</h3>
               <div className="text-left text-lg space-y-1 mb-4">
                  <p><span className="text-yellow-300">DATE:</span> March 27 @ 2:00 PM</p>
                  <p><span className="text-yellow-300">LOCATION:</span> Spidey Secret HQ</p>
                  <p><span className="text-yellow-300">GIFTS:</span> Donate at charitywater.org</p>
               </div>
               <div className="border-t-2 border-white/30 pt-2 flex flex-col items-center">
                 <p className="uppercase text-xs tracking-widest mb-1">Time until Mission:</p>
                 <Countdown targetDate="2026-03-27T14:00:00" />
               </div>
            </div>

            <table className="w-full bg-white border-4 border-black text-xs uppercase shadow-[6px_6px_0px_black]">
              <thead className="bg-gray-200 border-b-4 border-black">
                <tr>
                  <th className="p-1 border-r-2 border-black">Hero</th>
                  <th className="p-1 border-r-2 border-black">RSVP</th>
                  <th className="p-1">A/K</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1 border-r-2 border-black text-center">{userName}</td>
                  <td className="p-1 border-r-2 border-black text-center text-green-600 font-bold">YES</td>
                  <td className="p-1 text-center font-bold">{adults}/{kids}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* REJECTED */}
        {step === 0 && (
          <div className="bg-red-600 border-[8px] border-black p-10 text-white shadow-[10px_10px_0px_black] text-center rotate-3 scale-110">
            <h1 className="text-6xl mb-4 font-bold italic">THWIP!</h1>
            <p className="text-3xl uppercase font-black">FUCK RIGHT OFF.</p>
          </div>
        )}
      </div>
    </main>
  );
            }
          
