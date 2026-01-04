'use client';
import React, { useState, useEffect } from 'react';
import './globals.css';

const WebSlinger = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute top-0 left-0 animate-spidey-path">
      <div className="relative w-40 h-40">
        <svg className="absolute overflow-visible" style={{ top: '0', left: '0', width: '2000px', height: '2000px' }}>
          {/* Web 1: Anchor point 50% past top-left corner */}
          <line 
            x1="20" y1="120" 
            x2="-600" y2="-600" 
            stroke="white" strokeWidth="6" 
            className="web-left" 
            style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))' }} 
          />
          {/* Web 2: Anchor point 50% past top-right corner */}
          <line 
            x1="20" y1="120" 
            x2="1500" y2="-600" 
            stroke="white" strokeWidth="6" 
            className="web-right" 
            style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.4))' }} 
          />
        </svg>
        <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-2xl" />
      </div>
    </div>
  </div>
);

// [Countdown Component & State Logic same as previous version]

export default function SpideyInvite() {
  const [step, setStep] = useState(1); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adults, setAdults] = useState<number | ''>('');
  const [kids, setKids] = useState<number | ''>('');
  const [kidNames, setKidNames] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // [Handlers same as previous version]

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4 font-comic relative overflow-hidden bg-[#FFEB3B]">
      <WebSlinger />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        {/* HEADER SECTION */}
        <div className="w-full max-w-[320px] mb-8 transform -rotate-2">
          <svg viewBox="0 0 600 600" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
            <text x="50%" y="30%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">You're Invited to</text>
            <text x="50%" y="50%" textAnchor="middle" fontSize="120" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase">Lucas'</text>
            <text x="50%" y="70%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">5th Birthday Party</text>
          </svg>
        </div>

        {/* STEP 1: IDENTITY */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); if(firstName && lastName) setStep(2); else setError(true); }} className="flex flex-col items-center w-full space-y-4">
            <h2 className="text-3xl italic uppercase">Guest Check-In</h2>
            <input type="text" placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`} />
            <input type="text" placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`} />
            <button type="submit" className="mt-4 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] uppercase italic">RSVP</button>
          </form>
        )}

        {/* STEP 2: COMING? */}
        {step === 2 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] text-center w-full">
            <h2 className="text-3xl mb-6 uppercase leading-tight italic">{firstName}, are you coming?</h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep(3)} className="bg-green-500 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">YES</button>
              <button onClick={() => setStep(0)} className="bg-red-600 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">NO</button>
            </div>
          </div>
        )}

        {/* STEP 3 & 5: GUEST DETAILS Preserved with "Spidey's Amazing Friends" */}
        {/* [Skipping for brevity, logic remains identical to previous version] */}

        {/* FINAL PAGE (STEP 4) */}
        {step === 4 && (
          <div className="space-y-6 w-full animate-in zoom-in">
            <div className="bg-[#03A9F4] border-[8px] border-black p-5 text-white shadow-[10px_10px_0px_black] text-center">
               <h3 className="text-2xl uppercase font-bold underline mb-2 leading-tight italic">Join us for Lucas' 5th Birthday!</h3>
               <div className="text-left text-lg space-y-2 mb-4 italic font-bold">
                  <p><span className="text-yellow-300">DATE:</span> March 27 @ 2:00 PM</p>
                  <p><span className="text-yellow-300">LOCATION:</span> Spidey Secret HQ</p>
                  <p><span className="text-yellow-300">RSVP:</span> By March 15th</p>
               </div>
               {/* Countdown preserved */}
            </div>

            <table className="w-full bg-white border-4 border-black text-[10px] uppercase shadow-[6px_6px_0px_black] font-bold">
              <thead className="bg-gray-200 border-b-2 border-black">
                <tr><th className="p-1">Guest</th><th className="p-1">A</th><th className="p-1">K</th><th className="p-1">Friends</th></tr>
              </thead>
              <tbody>
                <tr className="text-center border-t-2 border-black italic">
                  <td className="border-r border-black p-1">{firstName} {lastName}</td>
                  <td className="border-r border-black">{adults}</td>
                  <td className="border-r border-black">{kids}</td>
                  <td className="p-1 break-words">{kidNames.join(', ') || 'N/A'}</td>
                </tr>
              </tbody>
            </table>

            {/* Email field preserved */}
          </div>
        )}

        {/* REJECTED SCREEN */}
        {step === 0 && (
          <div className="bg-red-600 border-[8px] border-black p-10 text-white text-center rotate-3 scale-110">
            <h1 className="text-6xl font-bold italic underline">THWIP!</h1>
            <p className="text-3xl uppercase font-black">FUCK RIGHT OFF.</p>
          </div>
        )}
      </div>
    </main>
  );
    }
              
