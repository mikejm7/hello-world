'use client';
import React, { useState, useEffect, useRef } from 'react';
import './globals.css';

// Comic themed 8-segment display style
const Segment = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center mx-1">
    <div className="bg-black border-2 border-gray-600 p-2 rounded shadow-[2px_2px_0px_rgba(0,0,0,0.5)] min-w-[40px] flex justify-center">
      <span className="font-mono text-xl text-[#E62429] font-bold tracking-widest leading-none">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] font-bold mt-1 uppercase text-black bg-white px-1 border border-black">{label}</span>
  </div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);

  useEffect(() => {
    const targetDate = new Date('2026-03-27T14:00:00');

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="bg-[#03A9F4] border-4 border-black p-2 mb-4 shadow-[6px_6px_0px_black] text-center w-auto inline-block rotate-[-2deg] z-20">
        <h4 className="text-white text-lg font-black uppercase italic mb-2 tracking-wider drop-shadow-[2px_2px_0px_black] text-stroke-black">Mission Countdown</h4>
        <div className="flex justify-center items-center bg-white border-4 border-black p-2 gap-1">
            <Segment value={timeLeft.days} label="Days" />
            <span className="text-2xl font-black mb-4">:</span>
            <Segment value={timeLeft.hours} label="Hrs" />
            <span className="text-2xl font-black mb-4">:</span>
            <Segment value={timeLeft.minutes} label="Min" />
            <span className="text-2xl font-black mb-4">:</span>
            <Segment value={timeLeft.seconds} label="Sec" />
        </div>
    </div>
  );
};

const WebSlinger = ({ trigger }: { trigger: number }) => {
  const handRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger <= 0) return;
    setActive(false);
    const timeout = setTimeout(() => setActive(true), 50);
    return () => clearTimeout(timeout);
  }, [trigger]);

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

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <line x1="-200" y1="-200" x2={coords.x} y2={coords.y} stroke="white" strokeWidth="4" className="web-line web-entry-trigger" />
        <line x1="120%" y1="-200" x2={coords.x} y2={coords.y} stroke="white" strokeWidth="4" className="web-line web-exit-trigger" />
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
  const [isSwinging, setIsSwinging] = useState(false);
  const [swingTrigger, setSwingTrigger] = useState(0);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adults, setAdults] = useState('');
  const [kids, setKids] = useState('');
  const [kidNames, setKidNames] = useState<string[]>([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const triggerTransition = (nextStep: number) => {
    setIsSwinging(true);
    setSwingTrigger(prev => prev + 1);
    setTimeout(() => {
      setStep(nextStep);
      setIsSwinging(false);
    }, 2000);
  };

  const handleQtySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(adults) >= 1) {
      if (parseInt(kids) > 0) {
        setKidNames(new Array(parseInt(kids)).fill(''));
        setStep(4);
      } else triggerTransition(5);
    } else alert("At least 1 adult is required!");
  };

  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-[#FFEB3B]">
      <WebSlinger trigger={swingTrigger} />

      {/* STEP 1: WELCOME */}
      {!isSwinging && step === 1 && (
        <div className="flex flex-col items-center justify-evenly h-full w-full py-10">
          <div className="animate-pop">
            <svg viewBox="-50 0 700 600" className="w-72 overflow-visible filter drop-shadow-[6px_6px_0px_black]">
              <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#03A9F4" stroke="black" strokeWidth="14" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="50" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" className="uppercase font-bold italic">
                <tspan x="50%" dy="-1.2em">Thwip,</tspan>
                <tspan x="50%" dy="1.2em">Spidey needs</tspan>
                <tspan x="50%" dy="1.2em">your help!</tspan>
              </text>
            </svg>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if(firstName && lastName) triggerTransition(2); }} 
                className="flex flex-col items-center gap-3 w-64 animate-pop delay-100 -translate-y-[10%]">
            <input type="text" name="given-name" id="given-name" autoComplete="given-name" required placeholder="FIRST NAME" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border-4 border-black text-center text-lg font-bold bg-white shadow-[4px_4px_0px_black] uppercase outline-none" />
            <input type="text" name="family-name" id="family-name" autoComplete="family-name" required placeholder="LAST NAME" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border-4 border-black text-center text-lg font-bold bg-white shadow-[4px_4px_0px_black] uppercase outline-none" />
            <button type="submit" className="mt-2 bg-[#E62429] text-white text-3xl py-1 px-10 border-4 border-black shadow-[4px_4px_0px_black] uppercase italic font-bold">RSVP</button>
          </form>
        </div>
      )}

      {/* STEP 2: DETAILS (Sequenced 750ms delays) */}
      {!isSwinging && step === 2 && (
        <div className="flex flex-col items-center justify-center h-full w-full px-4">
          
          {/* 1. Header (Immediate) - FIXED VIEWBOX for spacing */}
          <div className="animate-pop mb-1">
            <svg viewBox="0 0 600 600" className="w-64 overflow-visible filter drop-shadow-[6px_6px_0px_black]">
              <path d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" fill="#E62429" stroke="black" strokeWidth="14" />
              <text x="50%" y="45%" textAnchor="middle" fontSize="80" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase font-bold">Lucas is</text>
              <text x="50%" y="60%" textAnchor="middle" fontSize="80" fill="white" stroke="black" strokeWidth="10" paintOrder="stroke" className="italic uppercase font-bold">Turning 5!</text>
            </svg>
          </div>

          {/* 2. Banner (750ms delay) */}
          <div className="animate-pop delay-[750ms] opacity-0 mb-6" style={{ animationFillMode: 'forwards' }}>
             <p className="text-2xl uppercase font-bold italic bg-white border-4 border-black px-6 py-1 shadow-[4px_4px_0px_black] transform rotate-1">Join us to celebrate!</p>
          </div>

          {/* 3. Details (1500ms delay) */}
          <div className="comic-panel p-4 w-full max-w-[320px] text-center mb-6 animate-pop delay-[1500ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            <p className="text-xl underline mb-2 italic">THE MISSION:</p>
            <p className="text-lg">MARCH 27 @ 2:00 PM</p>
            <p className="text-lg">123 SPIDEY LANE, WEBB CITY</p>
            <p className="text-sm mt-2 font-bold">RSVP BY MARCH 15</p>
            <a href="#" className="text-sm underline text-blue-600 block mt-1 uppercase">Donate to Charity</a>
          </div>

          {/* 4. Buttons (2250ms delay) */}
          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_black] text-center w-64 animate-pop delay-[2250ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
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
        <form onSubmit={handleQtySubmit} className="flex flex-col items-center justify-center h-full w-full animate-pop">
          <div className="comic-panel p-6 w-full max-w-[320px]">
            <h2 className="text-3xl text-center italic underline mb-6 uppercase">Guest Count</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label className="text-2xl">ADULTS:</label><input type="number" min="1" required value={adults} onChange={(e) => setAdults(e.target.value)} className="w-16 h-12 text-center border-4 border-black text-2xl font-bold" /></div>
              <div className="flex justify-between items-center"><label className="text-2xl">KIDS:</label><input type="number" min="0" value={kids} onChange={(e) => setKids(e.target.value)} className="w-16 h-12 text-center border-4 border-black text-2xl font-bold" /></div>
            </div>
            <button type="submit" className="w-full mt-6 bg-[#E62429] text-white text-3xl py-2 border-4 border-black shadow-[4px_4px_0px_black] uppercase italic font-bold">NEXT</button>
          </div>
        </form>
      )}

      {/* STEP 4: KID NAMES */}
      {!isSwinging && step === 4 && (
        <form onSubmit={(e) => { e.preventDefault(); triggerTransition(5); }} className="flex flex-col items-center justify-center h-full w-full animate-pop">
          <div className="comic-panel p-6 w-full max-w-[320px]">
            <h2 className="text-xl text-center italic leading-tight mb-4 uppercase">Spidey's Amazing Friends<br/><span className="text-xs normal-case">(your kiddos names)</span></h2>
            <div className="max-h-[150px] overflow-y-auto space-y-2 mb-4">
              {kidNames.map((name, i) => (
                <input key={i} name={`kid-${i}`} autoComplete="off" required placeholder={`FRIEND #${i+1}`} value={name} onChange={(e) => { const n = [...kidNames]; n[i] = e.target.value; setKidNames(n); }} className="w-full p-2 border-2 border-black uppercase font-bold text-lg outline-none" />
              ))}
            </div>
            <button type="submit" className="w-full bg-green-500 text-white text-3xl py-2 border-4 border-black uppercase italic font-bold">CONFIRM</button>
          </div>
        </form>
      )}

      {/* STEP 5: FINAL RECEIPT & SUBSCRIBE */}
      {!isSwinging && step === 5 && (
        <div className="flex flex-col items-center w-full h-full justify-center relative">
          
          <div className="absolute top-[10%] z-20">
             <Countdown />
          </div>

          {/* Receipt - Narrower (w-[240px]) */}
          <div className="animate-receipt-up overflow-hidden absolute bottom-[50%] flex flex-col justify-end z-10 w-[240px]">
             {/* Countdown moved out */}
             <div className="bg-white p-4 receipt-font text-black border-x-4 border-t-4 border-black uppercase font-bold text-xs">
              <div className="flex justify-between"><span>DATE:</span><span>MAR 27, 2026</span></div>
              <div className="flex justify-between"><span>TIME:</span><span>2:00 PM</span></div>
              <div className="flex justify-between border-t border-black mt-2 pt-2"><span>ADULTS:</span><span>{adults}</span></div>
              <div className="flex justify-between"><span>GUEST:</span><span>{firstName} {lastName}</span></div>
              <div className="flex justify-between"><span>KIDS:</span><span>{kids}</span></div>
              {kidNames.length > 0 && <div className="mt-2 text-[10px]"><span>NAMES: {kidNames.join(', ')}</span></div>}
              <p className="text-center border-t-2 border-black mt-4 pt-2 italic text-sm">Thank You!</p>
              <div className="text-center text-[8px] mt-2">--- CONFIRMED ---</div>
            </div>
          </div>

          {/* Printer Line - 80% width (10% from each end) */}
          <div className="w-[80%] h-2 bg-black absolute top-[50%] z-20 animate-shake-limited" />

          {/* Subscribe - Moved Lower (top-[70%]) */}
          <div className="absolute top-[70%] flex flex-col items-center gap-2 animate-pop delay-[2000ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
             <h3 className="text-xl uppercase italic font-bold">Send me a calendar invite</h3>
             {!emailSubmitted ? (
               <form onSubmit={(e) => { e.preventDefault(); setEmailSubmitted(true); }} className="flex flex-col items-center gap-2">
                 <input type="email" name="email" id="email" autoComplete="email" required placeholder="GUEST@EMAIL.COM" value={email} onChange={(e) => setEmail(e.target.value)} className="w-64 p-2 border-4 border-black text-center font-bold bg-white uppercase outline-none" />
                 <button type="submit" className="bg-[#E62429] text-white py-1 px-6 border-4 border-black shadow-[3px_3px_0px_black] uppercase italic font-bold">SEND</button>
               </form>
             ) : (
               <p className="text-green-600 text-2xl uppercase italic animate-bounce">SENT!</p>
             )}
          </div>

        </div>
      )}

      {step === 0 && (
        <div className="flex flex-col items-center justify-center h-full animate-pop">
           <div className="bg-red-600 border-[8px] border-black p-8 text-white text-center rotate-3">
              <h1 className="text-6xl font-black italic underline leading-none">THWIP!</h1>
              <p className="text-3xl uppercase font-black">See you another time!</p>
           </div>
        </div>
      )}
    </main>
  );
}
