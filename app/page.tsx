'use client';
import React, { useState, useEffect, useRef } from 'react';
import './globals.css';

const WebSlinger = ({ trigger }: { trigger: number }) => {
  const handRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  // Trigger animation when the "trigger" prop changes
  useEffect(() => {
    setActive(false);
    const timeout = setTimeout(() => setActive(true), 50); // Small delay to reset CSS
    return () => clearTimeout(timeout);
  }, [trigger]);

  useEffect(() => {
    let frame: number;
    const update = () => {
      if (handRef.current) {
        const rect = handRef.current.getBoundingClientRect();
        setCoords({ x: rect.left + 5, y: rect.top + window.scrollY + 5 });
      }
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        {/* Entry Anchor: Way off-screen Top Left */}
        <line 
          x1="-200" y1="-200" 
          x2={coords.x} y2={coords.y} 
          stroke="white" strokeWidth="2.5" 
          className="web-line web-entry-trigger" 
        />
        {/* Exit Anchor: Way off-screen Top Right */}
        <line 
          x1="120%" y1="-200" 
          x2={coords.x} y2={coords.y} 
          stroke="white" strokeWidth="2.5" 
          className="web-line web-exit-trigger" 
        />
      </svg>
      <div className="fixed top-0 left-0 spidey-trigger">
        <div className="relative w-40 h-40">
          <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-2xl" />
          <div ref={handRef} className="absolute" style={{ top: '60%', left: '15%', width: '1px', height: '1px' }} />
        </div>
      </div>
    </div>
  );
};

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          mins: Math.floor((diff / 60000) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-center font-bold text-yellow-300 mt-2">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="bg-black/50 p-1 rounded min-w-[45px] border border-white/10 shadow-lg">
          <div className="text-xl leading-none font-bold">{val}</div>
          <div className="text-[10px] uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
};

export default function SpideyInvite() {
  const [step, setStep] = useState(1);
  const [swingTrigger, setSwingTrigger] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adults, setAdults] = useState<number | ''>('');
  const [kids, setKids] = useState<number | ''>('');
  const [kidNames, setKidNames] = useState<string[]>([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Trigger swing on specific steps
  useEffect(() => {
    if (step === 1 || step === 4 || step === 0) {
      setSwingTrigger(prev => prev + 1);
    }
  }, [step]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-20 pb-20 px-4 font-comic relative bg-[#FFEB3B]">
      <WebSlinger trigger={swingTrigger} />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-[380px]">
        {/* HEADER LOGO */}
        <div className="w-full max-w-[320px] mb-4 transform -rotate-2">
          <svg viewBox="0 0 600 550" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
            <text x="50%" y="32%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase font-bold">You're Invited to</text>
            <text x="50%" y="52%" textAnchor="middle" fontSize="120" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase font-bold">Lucas'</text>
            <text x="50%" y="65%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase font-bold">5th Birthday Party</text>
          </svg>
        </div>

        <div className="mt-4 w-full flex flex-col items-center">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); if(firstName && lastName) setStep(2); }} className="flex flex-col items-center w-full space-y-4">
              <h2 className="text-3xl italic uppercase font-bold">Guest Check-In</h2>
              <input type="text" placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none" />
              <input type="text" placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none" />
              <button type="submit" className="mt-4 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] uppercase italic font-bold">RSVP</button>
            </form>
          )}

          {step === 2 && (
            <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] text-center w-full">
              <h2 className="text-3xl mb-6 uppercase leading-tight italic font-bold">{firstName}, are you coming?</h2>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setStep(3)} className="bg-green-500 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black] font-bold">YES</button>
                <button onClick={() => setStep(0)} className="bg-red-600 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black] font-bold">NO</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={(e) => { e.preventDefault(); if(Number(adults) >= 1) { if(Number(kids) > 0) { setKidNames(new Array(Number(kids)).fill('')); setStep(5); } else setStep(4); } else alert("1 Adult required!"); }} className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full">
              <h2 className="text-2xl mb-4 uppercase text-center font-bold italic underline leading-none">Guest Count</h2>
              <div className="space-y-4 font-bold text-xl uppercase">
                <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                  <span>Adults:</span>
                  <input type="number" required value={adults} onChange={(e) => setAdults(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black font-bold" placeholder="0" />
                </div>
                <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                  <span>Kids:</span>
                  <input type="number" value={kids} onChange={(e) => setKids(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black font-bold" placeholder="0" />
                </div>
              </div>
              <button type="submit" className="w-full mt-6 bg-[#E62429] text-white text-3xl py-2 border-4 border-black shadow-[4px_4px_0px_black] uppercase italic font-bold">Next</button>
            </form>
          )}

          {step === 5 && (
            <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full max-h-[400px] overflow-y-auto">
              <h2 className="text-xl mb-4 uppercase text-center font-bold italic">Spidey's Amazing Friends</h2>
              {kidNames.map((name, i) => (
                <input key={i} type="text" placeholder={`FRIEND #${i+1}`} value={name} onChange={(e) => {
                  const n = [...kidNames]; n[i] = e.target.value; setKidNames(n);
                }} className="w-full p-2 border-2 border-black mb-2 uppercase font-bold outline-none" />
              ))}
              <button onClick={() => setStep(4)} className="w-full mt-4 bg-green-500 text-white text-2xl py-2 border-4 border-black uppercase italic font-bold">Confirm</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 w-full">
              <div className="bg-[#03A9F4] border-[8px] border-black p-5 text-white shadow-[10px_10px_0px_black] text-center">
                 <h3 className="text-2xl uppercase font-bold underline mb-2 italic">Party Mission</h3>
                 <div className="text-left text-lg space-y-2 mb-4 italic font-bold">
                    <p><span className="text-yellow-300 font-bold">DATE:</span> March 27 @ 2:00 PM</p>
                    <p><span className="text-yellow-300 font-bold">HQ:</span> The Secret Webb Base</p>
                 </div>
                 <div className="border-t-2 border-white/30 pt-2 flex flex-col items-center">
                   <p className="uppercase text-[10px] mb-1 font-bold">Countdown to Launch:</p>
                   <Countdown targetDate="2026-03-27T14:00:00" />
                 </div>
              </div>

              <div className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0px_black] space-y-4">
                <div>
                  <h4 className="font-bold underline uppercase text-red-600">Spidey's Orders:</h4>
                  <p className="text-sm font-bold italic uppercase leading-tight mt-1">
                    Suit up for action! Snacks, training, and cake. No villains allowed!
                  </p>
                </div>
                <div className="border-t-2 border-black/10 pt-2">
                  <h4 className="font-bold underline uppercase text-blue-600">Hero's Loot:</h4>
                  <p className="text-sm font-bold italic uppercase leading-tight mt-1">
                    Your presence is the best gift! Lucas loves Lego, Dinosaurs, and Spiderman.
                  </p>
                </div>
              </div>

              <div className="bg-black text-white border-4 border-black p-4 shadow-[6px_6px_0px_black]">
                <h4 className="font-bold underline uppercase text-yellow-300 mb-1 italic">Identity Confirmed:</h4>
                <div className="text-xs font-bold uppercase space-y-1">
                  <p>{firstName} {lastName}</p>
                  <p>Squad: {adults} Adult(s) & {kids} Kid(s)</p>
                  {kidNames.filter(n => n).length > 0 && <p className="text-[10px] text-gray-400 italic">Sidekicks: {kidNames.filter(n => n).join(', ')}</p>}
                </div>
              </div>

              {!emailSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }} className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_black] flex flex-col gap-2">
                  <label className="text-sm uppercase font-bold italic">Secure Updates Channel:</label>
                  <div className="flex gap-2">
                    <input type="email" required placeholder="GUEST@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 p-2 border-2 border-black uppercase text-xs font-bold outline-none" />
                    <button type="submit" className="bg-[#E62429] text-white px-3 py-1 border-2 border-black font-bold uppercase text-[10px]">Join</button>
                  </div>
                </form>
              ) : (
                <div className="bg-green-500 text-white border-4 border-black p-3 text-center uppercase font-bold italic shadow-[6px_6px_0px_black]">Link Established!</div>
              )}
            </div>
          )}

          {step === 0 && (
            <div className="bg-red-600 border-[8px] border-black p-10 text-white text-center rotate-3 scale-110">
              <h1 className="text-6xl font-bold italic underline leading-none">THWIP!</h1>
              <p className="text-3xl uppercase font-black">FUCK RIGHT OFF.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
        }
      
