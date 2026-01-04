'use client';
import React, { useState, useEffect, useRef } from 'react';
import './globals.css';

const WebSlinger = ({ trigger }: { trigger: number }) => {
  const handRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const timeout = setTimeout(() => setActive(true), 50);
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
        <line x1="-200" y1="-200" x2={coords.x} y2={coords.y} stroke="white" strokeWidth="2.5" className="web-line web-entry-trigger" />
        <line x1="120%" y1="-200" x2={coords.x} y2={coords.y} stroke="white" strokeWidth="2.5" className="web-line web-exit-trigger" />
      </svg>
      <div className="fixed top-0 left-0 spidey-trigger">
        <div className="relative w-40 h-40">
          <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-2xl" />
          <div ref={handRef} className="absolute" style={{ top: '65%', left: '15%', width: '1px', height: '1px' }} />
        </div>
      </div>
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

  useEffect(() => {
    if (step === 1 || step === 4 || step === 0) setSwingTrigger(v => v + 1);
  }, [step]);

  const handleQtySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(adults) >= 1) {
      if (Number(kids) > 0) {
        setKidNames(new Array(Number(kids)).fill(''));
        setStep(5);
      } else setStep(4);
    } else alert("At least 1 Adult is required!");
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-16 pb-20 px-4 font-comic relative bg-[#FFEB3B]">
      <WebSlinger trigger={swingTrigger} />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-[380px]">
        {/* HEADER LOGO - Updates based on Step */}
        <div className="w-full max-w-[320px] mb-8 transform -rotate-1 animate-fade-in">
          <svg viewBox="0 0 600 550" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#E62429" stroke="black" strokeWidth="14" />
            <text x="50%" y="38%" textAnchor="middle" fontSize="48" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase font-bold">You're Invited</text>
            <text x="50%" y="54%" textAnchor="middle" fontSize="52" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase font-bold">to a Party!</text>
          </svg>
        </div>

        <div className="w-full">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); if(firstName && lastName) setStep(2); }} className="flex flex-col items-center space-y-4">
              <input type="text" name="given-name" autoComplete="given-name" id="firstName" placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none" />
              <input type="text" name="family-name" autoComplete="family-name" id="lastName" placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none" />
              <button type="submit" className="mt-4 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] uppercase italic font-bold">RSVP</button>
            </form>
          )}

          {/* TRANSITION STEP (2): Are you coming? with New Header and Details Faded in */}
          {step === 2 && (
            <div className="flex flex-col items-center space-y-6">
               {/* New Header */}
               <h1 className="text-4xl text-center uppercase font-bold italic animate-fade-in">Lucas is turning 5!</h1>
               
               {/* Details Preview */}
               <div className="bg-[#03A9F4] border-[6px] border-black p-4 text-white shadow-[8px_8px_0px_black] w-full animate-fade-in [animation-delay:0.3s] opacity-0 text-center italic font-bold">
                 <p className="text-xl uppercase underline mb-2">The Mission Details:</p>
                 <p>MARCH 27 @ 2:00 PM</p>
                 <p>123 SPIDEY LANE, WEBB CITY</p>
               </div>

               {/* Prompt */}
               <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] text-center w-full animate-fade-in [animation-delay:0.6s] opacity-0">
                <h2 className="text-2xl mb-6 uppercase leading-tight italic font-bold">{firstName}, are you coming?</h2>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setStep(3)} className="bg-green-500 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black] font-bold">YES</button>
                  <button onClick={() => setStep(0)} className="bg-red-600 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black] font-bold">NO</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleQtySubmit} className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full">
              <h2 className="text-2xl mb-4 uppercase text-center font-bold italic underline leading-none">Guest Count</h2>
              <div className="space-y-4 font-bold text-xl uppercase">
                <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                  <span>Adults:</span>
                  <input type="number" required value={adults} onChange={(e) => setAdults(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black font-bold" />
                </div>
                <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                  <span>Kids:</span>
                  <input type="number" value={kids} onChange={(e) => setKids(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black font-bold" />
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
            <div className="space-y-6 w-full animate-fade-in">
              {/* FINAL RECEIPT STYLE */}
              <div className="comic-receipt p-8 text-black font-mono shadow-2xl relative border-t-4 border-black">
                <h4 className="font-bold border-b-4 border-black pb-2 text-center uppercase mb-6 text-2xl tracking-tighter">THE DAILY BUGLE: RSVP</h4>
                <div className="text-sm space-y-3 uppercase font-bold">
                  <div className="flex justify-between border-b border-black border-dotted"><span>GUEST ID:</span><span>{firstName} {lastName}</span></div>
                  <div className="flex justify-between border-b border-black border-dotted"><span>SQUAD SIZE:</span><span>{adults}A / {kids}K</span></div>
                  {kidNames.filter(n => n).length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] underline mb-1">REGISTERED SIDEKICKS:</p>
                      <p className="text-[11px] leading-tight italic">{kidNames.filter(n => n).join(', ')}</p>
                    </div>
                  )}
                </div>
                <div className="mt-8 pt-4 border-t-4 border-black text-center">
                  <p className="text-3xl font-black">ACCEPTED</p>
                  <p className="text-[10px] mt-1">SEE YOU AT THE SECRET HQ</p>
                </div>
              </div>

              {/* SUBSCRIBE BOX (FLOATING) */}
              <div className="mt-10 flex flex-col items-center gap-3 w-full">
                <h3 className="text-2xl uppercase font-bold italic">Subscribe for Updates</h3>
                {!emailSubmitted ? (
                  <form onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }} className="flex flex-col gap-3 w-full">
                    <input type="email" name="email" autoComplete="email" required placeholder="GUEST@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border-[6px] border-black text-center text-xl font-bold bg-white uppercase outline-none shadow-[6px_6px_0px_black]" />
                    <button type="submit" className="bg-[#E62429] text-white py-2 px-8 border-[5px] border-black shadow-[6px_6px_0px_black] uppercase italic font-bold text-2xl">Subscribe</button>
                  </form>
                ) : (
                  <div className="text-green-600 text-2xl uppercase font-bold italic animate-bounce">Subscribed!</div>
                )}
              </div>
            </div>
          )}

          {step === 0 && (
            <div className="bg-red-600 border-[8px] border-black p-10 text-white text-center rotate-3 scale-110">
              <h1 className="text-6xl font-bold italic underline leading-none">THWIP!</h1>
              <p className="text-3xl uppercase font-black">STAY HOME VILLAINS.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
          }
                  
