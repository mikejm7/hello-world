'use client';
import React, { useState, useEffect, useRef } from 'react';
import './globals.css';

const WebSlinger = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute top-0 left-0 animate-spidey-path">
      <div className="relative w-40 h-40">
        <svg className="absolute overflow-visible" style={{ top: '0', left: '0', width: '3000px', height: '3000px' }}>
          <line x1="45" y1="110" x2="-200" y2="-1200" stroke="white" strokeWidth="6" className="web-left" />
          <line x1="45" y1="110" x2="1500" y2="-1000" stroke="white" strokeWidth="6" className="web-right" />
        </svg>
        <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-2xl" />
      </div>
    </div>
  </div>
);

export default function SpideyInvite() {
  const [step, setStep] = useState(1); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [adults, setAdults] = useState<number | ''>('');
  const [kids, setKids] = useState<number | ''>('');
  const [kidNames, setKidNames] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) { setError(true); setTimeout(() => setError(false), 500); return; }
    setStep(2);
  };

  const handleHeadcount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adults || adults < 1) { alert("At least 1 adult is required!"); return; }
    if (kids && kids > 0) {
      setKidNames(new Array(Number(kids)).fill(''));
      setStep(5); // Go to Kid Names step
    } else {
      setStep(4); // Go to Confirmation
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4 font-comic relative overflow-hidden bg-[#FFEB3B]">
      <WebSlinger />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        {/* HEADER - TEXT LINES BROUGHT CLOSER TOGETHER */}
        <div className="w-full max-w-[320px] mb-8 transform -rotate-2">
          <svg viewBox="0 0 600 600" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
            <text x="50%" y="38%" textAnchor="middle" fontSize="40" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">You're Invited to</text>
            <text x="50%" y="50%" textAnchor="middle" fontSize="120" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase">Lucas'</text>
            <text x="50%" y="62%" textAnchor="middle" fontSize="40" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">5th Birthday Party</text>
          </svg>
        </div>

        {/* STEP 1: FIRST & LAST NAME */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="flex flex-col items-center w-full space-y-4">
            <h2 className="text-3xl italic uppercase">Identity Check</h2>
            <input type="text" placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`} />
            <input type="text" placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`} />
            <button type="submit" className="mt-4 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none uppercase">RSVP</button>
          </form>
        )}

        {/* STEP 2: CHOICE */}
        {step === 2 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] text-center w-full">
            <h2 className="text-3xl mb-6 uppercase leading-tight">{firstName}, are you coming?</h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep(3)} className="bg-green-500 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">YES</button>
              <button onClick={() => setStep(0)} className="bg-red-600 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">NO</button>
            </div>
          </div>
        )}

        {/* STEP 3: HEADCOUNT (REQUIRING 1 ADULT) */}
        {step === 3 && (
          <form onSubmit={handleHeadcount} className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full">
            <h2 className="text-2xl mb-4 uppercase text-center font-bold italic">Headcount</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <span className="text-xl uppercase">Adults:</span>
                <input type="number" value={adults} onChange={(e) => setAdults(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black font-bold" placeholder="0" />
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <span className="text-xl uppercase">Kids:</span>
                <input type="number" value={kids} onChange={(e) => setKids(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black font-bold" placeholder="0" />
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-[#E62429] text-white text-3xl py-2 border-4 border-black shadow-[4px_4px_0px_black] uppercase">Next</button>
          </form>
        )}

        {/* STEP 5: KIDS NAMES */}
        {step === 5 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full max-h-[400px] overflow-y-auto">
            <h2 className="text-xl mb-4 uppercase text-center font-bold italic">Sidekick Names</h2>
            {kidNames.map((name, i) => (
              <input 
                key={i} 
                type="text" 
                placeholder={`KID #${i+1} NAME`} 
                value={name} 
                onChange={(e) => {
                  const newNames = [...kidNames];
                  newNames[i] = e.target.value;
                  setKidNames(newNames);
                }}
                className="w-full p-2 border-2 border-black mb-2 uppercase"
              />
            ))}
            <button onClick={() => setStep(4)} className="w-full mt-4 bg-green-500 text-white text-2xl py-2 border-4 border-black uppercase">Finalize</button>
          </div>
        )}

        {/* STEP 4: FINAL INTEL TABLE */}
        {step === 4 && (
          <div className="space-y-6 w-full">
            <div className="bg-[#03A9F4] border-[8px] border-black p-4 text-white shadow-[10px_10px_0px_black] text-center">
               <h3 className="text-xl uppercase font-bold underline">Mission Details Unlocked</h3>
               <p className="text-sm mt-2">MARCH 27 @ 2:00 PM | SPIDEY SECRET HQ</p>
            </div>
            <table className="w-full bg-white border-4 border-black text-[10px] uppercase">
              <thead className="bg-gray-200 border-b-2 border-black">
                <tr><th>Guest</th><th>Adults</th><th>Kids</th><th>Names</th></tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border-r border-black">{firstName} {lastName}</td>
                  <td className="border-r border-black">{adults}</td>
                  <td className="border-r border-black">{kids}</td>
                  <td className="break-words max-w-[80px]">{kidNames.join(', ') || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {step === 0 && (
          <div className="bg-red-600 border-[8px] border-black p-10 text-white text-center rotate-3">
            <p className="text-3xl uppercase font-black tracking-tighter">FUCK RIGHT OFF.</p>
          </div>
        )}
      </div>
    </main>
  );
}
