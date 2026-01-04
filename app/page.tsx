'use client';
import React, { useState, useEffect } from 'react';
import './globals.css';

const WebSlinger = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute top-0 left-0 animate-spidey-path">
      <div className="relative w-40 h-40">
        <svg className="absolute overflow-visible" style={{ top: '0', left: '0', width: '3000px', height: '3000px' }}>
          <line x1="20" y1="120" x2="-2000" y2="-2000" stroke="white" strokeWidth="5" className="web-left" style={{ strokeLinecap: 'round' }} />
          <line x1="20" y1="120" x2="4000" y2="-2000" stroke="white" strokeWidth="5" className="web-right" style={{ strokeLinecap: 'round' }} />
        </svg>
        <img src="/spidey-swing.png" alt="Spidey" className="w-full h-auto drop-shadow-2xl" />
      </div>
    </div>
  </div>
);

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
        <div key={unit} className="bg-black/50 p-1 rounded min-w-[45px] border border-white/10">
          <div className="text-xl leading-none">{val}</div>
          <div className="text-[10px] uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
};

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

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) { setError(true); setTimeout(() => setError(false), 500); return; }
    setStep(2);
  };

  const handleHeadcount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adults || adults < 1) { alert("Every team needs at least 1 adult!"); return; }
    if (kids && Number(kids) > 0) {
      setKidNames(new Array(Number(kids)).fill(''));
      setStep(5);
    } else {
      setStep(4);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4 font-comic relative overflow-hidden bg-[#FFEB3B]">
      <WebSlinger />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[360px]">
        {/* HEADER */}
        <div className="w-full max-w-[320px] mb-8 transform -rotate-2">
          <svg viewBox="0 0 600 600" className="overflow-visible filter drop-shadow-[8px_8px_0px_black]">
            <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
            <text x="50%" y="30%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">You're Invited to</text>
            <text x="50%" y="50%" textAnchor="middle" fontSize="120" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase">Lucas'</text>
            <text x="50%" y="70%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="italic uppercase">5th Birthday Party</text>
          </svg>
        </div>

        {step === 1 && (
          <form onSubmit={handleStep1} className="flex flex-col items-center w-full space-y-4">
            <h2 className="text-3xl italic uppercase">Guest Check-In</h2>
            <input type="text" placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`} />
            <input type="text" placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className={`w-[280px] p-3 border-[6px] border-black text-center text-2xl font-bold bg-white shadow-[8px_8px_0px_black] uppercase outline-none ${error ? 'animate-shake-3d' : ''}`} />
            <button type="submit" className="mt-4 bg-[#E62429] text-white text-4xl py-2 px-12 border-[5px] border-black shadow-[6px_6px_0px_black] uppercase">RSVP</button>
          </form>
        )}

        {step === 2 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] text-center w-full">
            <h2 className="text-3xl mb-6 uppercase leading-tight">{firstName}, are you coming?</h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setStep(3)} className="bg-green-500 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">YES</button>
              <button onClick={() => setStep(0)} className="bg-red-600 text-white text-3xl py-2 px-8 border-4 border-black shadow-[4px_4px_0px_black]">NO</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleHeadcount} className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full">
            <h2 className="text-2xl mb-4 uppercase text-center font-bold italic underline">Guest Count</h2>
            <div className="space-y-4 font-bold text-xl uppercase">
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <span>Adults:</span>
                <input type="number" value={adults} onChange={(e) => setAdults(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black" placeholder="0" />
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-2 border-2 border-black">
                <span>Kids:</span>
                <input type="number" value={kids} onChange={(e) => setKids(e.target.value === '' ? '' : Number(e.target.value))} className="w-16 text-center border-2 border-black" placeholder="0" />
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-[#E62429] text-white text-3xl py-2 border-4 border-black shadow-[4px_4px_0px_black] uppercase italic">Let's Go!</button>
          </form>
        )}

        {step === 5 && (
          <div className="bg-white border-[6px] border-black p-6 shadow-[10px_10px_0px_black] w-full max-h-[400px] overflow-y-auto">
            <h2 className="text-xl mb-4 uppercase text-center font-bold italic">Spidey's Amazing Friends</h2>
            {kidNames.map((name, i) => (
              <input key={i} type="text" placeholder={`FRIEND #${i+1}`} value={name} onChange={(e) => {
                const n = [...kidNames]; n[i] = e.target.value; setKidNames(n);
              }} className="w-full p-2 border-2 border-black mb-2 uppercase" />
            ))}
            <button onClick={() => setStep(4)} className="w-full mt-4 bg-green-500 text-white text-2xl py-2 border-4 border-black uppercase italic">Let's Go!</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 w-full animate-in zoom-in">
            <div className="bg-[#03A9F4] border-[8px] border-black p-5 text-white shadow-[10px_10px_0px_black] text-center">
               <h3 className="text-2xl uppercase font-bold underline mb-2 leading-tight">Join us for Lucas' 5th Birthday!</h3>
               <div className="text-left text-lg space-y-2 mb-4">
                  <p><span className="text-yellow-300 font-black">DATE:</span> March 27 @ 2:00 PM</p>
                  <p><span className="text-yellow-300 font-black">LOCATION:</span> Spidey Secret HQ</p>
                  <p><span className="text-yellow-300 font-black">RSVP:</span> By March 15th</p>
                  <div className="bg-black/30 p-2 text-sm border-l-4 border-yellow-300">
                    <span className="font-bold uppercase">Gift Info:</span> No gifts, please. If you'd like, donate at: <br/>
                    <a href="https://www.charitywater.org" target="_blank" className="underline font-bold text-yellow-300">charitywater.org</a>
                  </div>
               </div>
               <div className="border-t-2 border-white/30 pt-2 flex flex-col items-center">
                 <p className="uppercase text-xs tracking-tighter mb-1 font-bold">Time until Party:</p>
                 <Countdown targetDate="2026-03-27T14:00:00" />
               </div>
            </div>

            {/* UPDATED TABLE: "GUEST" instead of "HERO" */}
            <table className="w-full bg-white border-4 border-black text-[10px] uppercase shadow-[6px_6px_0px_black] font-bold">
              <thead className="bg-gray-200 border-b-2 border-black">
                <tr><th className="p-1">Guest</th><th className="p-1">A</th><th className="p-1">K</th><th className="p-1">Friends</th></tr>
              </thead>
              <tbody>
                <tr className="text-center border-t-2 border-black">
                  <td className="border-r border-black p-1">{firstName} {lastName}</td>
                  <td className="border-r border-black">{adults}</td>
                  <td className="border-r border-black">{kids}</td>
                  <td className="p-1 break-words">{kidNames.join(', ') || 'N/A'}</td>
                </tr>
              </tbody>
            </table>

            {/* EMAIL NOTIFICATION ENTRY */}
            {!emailSubmitted ? (
              <form 
                onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }}
                className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_black] flex flex-col gap-2"
              >
                <label className="text-sm uppercase font-bold italic">Stay Alert! Enter email for updates:</label>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    required
                    placeholder="AVENGER@HQ.COM" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="flex-1 p-2 border-2 border-black uppercase text-sm font-bold"
                  />
                  <button type="submit" className="bg-[#E62429] text-white px-3 py-1 border-2 border-black font-bold uppercase text-xs">Join</button>
                </div>
              </form>
            ) : (
              <div className="bg-green-500 text-white border-4 border-black p-3 text-center uppercase font-bold italic shadow-[6px_6px_0px_black]">
                Communication Link Established!
              </div>
            )}
          </div>
        )}

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
