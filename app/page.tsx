'use client';
import React, { useState, useEffect } from 'react';
import './globals.css';

export default function SpideyInvite() {
  const [step, setStep] = useState(1); // 1: Name, 2: Info, 3: Qty, 4: Kids, 5: Final
  const [isSwinging, setIsSwinging] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adults, setAdults] = useState('');
  const [kids, setKids] = useState('');
  const [kidNames, setKidNames] = useState<string[]>([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Transition helper
  const triggerTransition = (nextStep: number) => {
    setIsSwinging(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsSwinging(false);
    }, 2000); // Clears screen during the swing
  };

  const handleInitialRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName) triggerTransition(2);
  };

  const handleQtySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(adults) >= 1) {
      if (parseInt(kids) > 0) {
        setKidNames(new Array(parseInt(kids)).fill(''));
        setStep(4);
      } else {
        triggerTransition(5);
      }
    } else alert("At least 1 adult is required!");
  };

  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-[#FFEB3B]">
      
      {/* SPIDEY ANIMATION LAYER */}
      {isSwinging && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <img src="/spidey-swing.png" alt="Spidey" className="w-64 spidey-active" />
        </div>
      )}

      {/* STEP 1: WELCOME SCREEN */}
      {!isSwinging && step === 1 && (
        <div className="flex flex-col items-center w-full h-full justify-center">
          <div className="animate-pop transform -translate-y-[10%] mb-12">
            <svg viewBox="0 0 600 550" className="w-72 overflow-visible filter drop-shadow-[6px_6px_0px_black]">
              <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
              <text x="50%" y="42%" textAnchor="middle" fontSize="60" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="uppercase font-bold italic">You're Invited</text>
              <text x="50%" y="58%" textAnchor="middle" fontSize="65" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="uppercase font-bold italic">to a Party!</text>
            </svg>
          </div>
          <form onSubmit={handleInitialRSVP} className="flex flex-col items-center gap-4 w-64 transform translate-y-[10%] animate-pop delay-150">
            <input name="given-name" autoComplete="given-name" required placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border-4 border-black text-center text-lg font-bold bg-white shadow-[4px_4px_0px_black] uppercase outline-none" />
            <input name="family-name" autoComplete="family-name" required placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border-4 border-black text-center text-lg font-bold bg-white shadow-[4px_4px_0px_black] uppercase outline-none" />
            <button type="submit" className="mt-2 bg-[#E62429] text-white text-3xl py-1 px-10 border-4 border-black shadow-[4px_4px_0px_black] uppercase italic font-bold">RSVP</button>
          </form>
        </div>
      )}

      {/* STEP 2: MISSION DETAILS & CHOICE */}
      {!isSwinging && step === 2 && (
        <div className="flex flex-col items-center w-full h-full justify-center px-4">
          <div className="animate-pop mb-4">
            <svg viewBox="0 0 600 350" className="w-64 overflow-visible filter drop-shadow-[6px_6px_0px_black]">
              <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#E62429" stroke="black" strokeWidth="14" />
              <text x="50%" y="45%" textAnchor="middle" fontSize="80" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase font-bold">Lucas is</text>
              <text x="50%" y="65%" textAnchor="middle" fontSize="80" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase font-bold">Turning 5!</text>
            </svg>
          </div>
          <p className="animate-pop delay-100 text-2xl uppercase font-bold italic bg-white border-4 border-black px-6 py-1 shadow-[4px_4px_0px_black] transform rotate-1 mb-6">Join us to celebrate!</p>
          
          <div className="comic-panel animate-pop delay-200 p-4 w-full max-w-[320px] text-center mb-6">
            <p className="text-xl underline mb-2 italic">THE MISSION:</p>
            <p className="text-lg">MARCH 27 @ 2:00 PM</p>
            <p className="text-lg">123 SPIDEY LANE, WEBB CITY</p>
            <p className="text-sm mt-2">RSVP BY MARCH 15</p>
            <a href="#" className="text-sm underline text-blue-600 block mt-1 uppercase">Donate to Charity</a>
          </div>

          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_black] text-center w-full max-w-[300px] animate-pop delay-300">
            <h2 className="text-xl mb-4 italic font-bold">ARE YOU COMING?</h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep(3)} className="bg-green-500 text-white text-2xl py-1 px-8 border-4 border-black font-bold">YES</button>
              <button onClick={() => setStep(0)} className="bg-red-600 text-white text-2xl py-1 px-8 border-4 border-black font-bold">NO</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: GUEST COUNT */}
      {!isSwinging && step === 3 && (
        <form onSubmit={handleQtySubmit} className="flex flex-col items-center justify-center h-full w-full px-6 animate-pop">
          <div className="comic-panel p-6 w-full max-w-[320px]">
            <h2 className="text-3xl text-center italic underline mb-6 uppercase">Guest Count</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-2xl">ADULTS:</label>
                <input type="text" inputMode="numeric" required value={adults} onChange={(e) => setAdults(e.target.value)} className="w-16 h-12 text-center border-4 border-black text-2xl font-bold" />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-2xl">KIDS:</label>
                <input type="text" inputMode="numeric" value={kids} onChange={(e) => setKids(e.target.value)} className="w-16 h-12 text-center border-4 border-black text-2xl font-bold" />
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-[#E62429] text-white text-3xl py-2 border-4 border-black shadow-[4px_4px_0px_black] uppercase italic font-bold">NEXT</button>
          </div>
        </form>
      )}

      {/* STEP 4: KID NAMES */}
      {!isSwinging && step === 4 && (
        <form onSubmit={(e) => { e.preventDefault(); triggerTransition(5); }} className="flex flex-col items-center justify-center h-full w-full px-6 animate-pop">
          <div className="comic-panel p-6 w-full max-w-[320px]">
            <h2 className="text-xl text-center italic leading-tight mb-4 uppercase">
              Spidey's Amazing Friends<br/><span className="text-xs normal-case">(your kiddos names)</span>
            </h2>
            <div className="max-h-[200px] overflow-y-auto space-y-2 mb-4">
              {kidNames.map((_, i) => (
                <input key={i} required placeholder={`FRIEND #${i+1}`} onChange={(e) => { const n = [...kidNames]; n[i] = e.target.value; setKidNames(n); }} className="w-full p-2 border-2 border-black uppercase font-bold text-lg outline-none" />
              ))}
            </div>
            <button type="submit" className="w-full bg-green-500 text-white text-3xl py-2 border-4 border-black uppercase italic font-bold">CONFIRM</button>
          </div>
        </form>
      )}

      {/* STEP 5: RECEIPT & SUBSCRIBE */}
      {!isSwinging && step === 5 && (
        <div className="flex flex-col items-center w-full h-full pt-[50vh]">
          {/* THE BLACK LINE SLIT */}
          <div className="w-full h-2 bg-black fixed top-[50%] left-0 z-20" />
          
          <div className="animate-receipt overflow-hidden flex flex-col items-center z-10">
            <div className="bg-white w-[300px] p-6 receipt-font text-black border-x-2 border-black flex flex-col uppercase font-bold text-sm">
              <p className="text-center border-b-2 border-black mb-2 text-xl font-black">Daily Bugle RSVP</p>
              <div className="flex justify-between"><span>DATE:</span><span>MAR 27, 2026</span></div>
              <div className="flex justify-between"><span>TIME:</span><span>2:00 PM</span></div>
              <div className="flex justify-between border-t border-black mt-2 pt-2"><span>ADULTS:</span><span>{adults}</span></div>
              <div className="flex justify-between"><span>KIDS:</span><span>{kids}</span></div>
              {kidNames.length > 0 && (
                <div className="mt-2 text-[10px]">
                  <span>SIDEKICKS: {kidNames.join(', ')}</span>
                </div>
              )}
              <p className="text-center border-t-2 border-black mt-4 pt-2 italic">Thank you for joining the team!</p>
              <div className="text-center text-[8px] mt-2">--- END OF TICKET ---</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 animate-pop delay-1000">
             <h3 className="text-xl uppercase italic font-bold">Stay Updated!</h3>
             {!emailSubmitted ? (
               <form onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }} className="flex flex-col items-center gap-2">
                 <input type="email" name="email" autoComplete="email" required placeholder="GUEST@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="w-64 p-2 border-4 border-black text-center font-bold bg-white uppercase outline-none" />
                 <button type="submit" className="bg-[#E62429] text-white py-1 px-6 border-4 border-black shadow-[3px_3px_0px_black] uppercase italic font-bold">SUBSCRIBE</button>
               </form>
             ) : (
               <p className="text-green-600 text-2xl uppercase italic animate-bounce">SUBSCRIBED!</p>
             )}
          </div>
        </div>
      )}

      {/* NO STEP */}
      {step === 0 && (
        <div className="flex flex-col items-center justify-center h-full animate-pop">
           <div className="bg-red-600 border-[8px] border-black p-8 text-white text-center rotate-3">
              <h1 className="text-6xl font-black italic underline leading-none">THWIP!</h1>
              <p className="text-3xl uppercase font-black">FUCK RIGHT OFF.</p>
           </div>
        </div>
      )}

    </main>
  );
              }
        
