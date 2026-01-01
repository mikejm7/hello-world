'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function SpideyParty() {
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const SECRET_CODE = "SPIDEY6"; 

  useEffect(() => {
    const target = new Date("March 27, 2026 14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.toUpperCase() === SECRET_CODE) {
      setIsUnlocked(true);
      setShowModal(false);
      setError('');
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    } else {
      setError('THWIP! WRONG CODE!');
    }
  };

  return (
    <main className="min-h-screen w-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      
      <audio ref={audioRef} loop src="https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptoken=1040375" />

      {/* Centered Container */}
      <div className="w-full max-w-md flex flex-col items-center justify-center text-center space-y-12">
        
        {/* HEADER - Forced Center */}
        <div className="w-full flex justify-center">
          <div className="bg-[#e62429] comic-border p-6 transform -rotate-1 max-w-[90%]">
            <h1 className="text-3xl md:text-5xl font-comic text-white leading-tight uppercase tracking-tight text-center">
              You're invited to <br/> Lucas's 5th birthday party!
            </h1>
          </div>
        </div>

        {!isUnlocked ? (
          <div className="w-full flex flex-col items-center justify-center space-y-4">
             <button 
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 text-black font-comic text-3xl py-4 px-10 comic-border active:scale-95 transition-all animate-bounce"
            >
              ENTER SECRET CODE
            </button>
            <p className="font-bold text-[#001f5b] uppercase tracking-widest text-sm italic text-center">
              Identification Required
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-8 animate-slide">
            
            {/* Intel Card - Forced Center */}
            <div className="bg-white comic-border p-8 border-[#001f5b] w-full flex flex-col items-center">
              <h2 className="bg-yellow-400 p-2 comic-border -mt-12 mb-6 text-center font-comic text-3xl text-black w-3/4">
                MISSION INTEL
              </h2>
              <div className="text-[#001f5b] space-y-4 font-comic text-2xl text-center">
                <p>📅 Friday, March 27 @ 2:00 PM</p>
                <p>📍 Spidey Secret Base HQ</p>
              </div>
            </div>

            {!hasRSVPd ? (
              <div className="bg-[#e62429] comic-border p-8 w-full flex flex-col items-center">
                <h3 className="font-comic text-3xl text-white mb-6 uppercase italic text-center">Team Up?</h3>
                <form 
                  action="https://formspree.io/f/YOUR_ID_HERE" 
                  method="POST" 
                  onSubmit={() => setHasRSVPd(true)} 
                  className="w-full flex flex-col items-center space-y-4"
                >
                  <div className="w-full text-center">
                    <label className="text-white font-bold text-xs uppercase mb-1 block">Hero Name</label>
                    <input type="text" name="name" required className="w-full p-3 border-2 border-black font-bold uppercase text-black text-center" />
                  </div>
                  <div className="w-full text-center">
                    <label className="text-white font-bold text-xs uppercase mb-1 block">Attending</label>
                    <select name="attending" className="w-full p-3 border-2 border-black font-bold uppercase text-black text-center appearance-none">
                      <option value="yes">YES! COUNT ME IN!</option>
                      <option value="no">NO, BUSY SAVING THE CITY</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-3xl py-3 border-4 border-black active:scale-95 mt-4">
                    SEND RSVP
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white comic-border p-8 text-center border-[#e62429] w-full flex flex-col items-center">
                <h3 className="font-comic text-4xl text-[#e62429] mb-4 text-center">LAUNCHING IN:</h3>
                <div className="grid grid-cols-4 gap-2 font-comic text-[#001f5b] w-full">
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black items-center">
                    <span className="text-2xl">{timeLeft.days}</span>
                    <span className="text-[10px]">DAYS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black items-center">
                    <span className="text-2xl">{timeLeft.hours}</span>
                    <span className="text-[10px]">HRS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black items-center">
                    <span className="text-2xl">{timeLeft.mins}</span>
                    <span className="text-[10px]">MINS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black items-center">
                    <span className="text-2xl">{timeLeft.secs}</span>
                    <span className="text-[10px]">SECS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* OVERLAY MODAL - Centered */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white comic-border p-8 w-full max-w-sm text-center flex flex-col items-center">
            <h2 className="font-comic text-3xl text-[#001f5b] mb-4 uppercase text-center">Verify Identity</h2>
            <form onSubmit={handleVerify} className="w-full flex flex-col items-center space-y-4">
              <input 
                type="text" 
                value={inviteCode} 
                onChange={(e) => setInviteCode(e.target.value)} 
                placeholder="SECRET CODE" 
                autoFocus
                className="w-full p-4 border-4 border-black text-center font-bold text-3xl uppercase outline-none text-black" 
              />
              <button type="submit" className="w-full bg-[#e62429] text-white font-comic text-3xl py-4 comic-border active:scale-95">
                ACCESS HQ
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2 underline text-center">
                Cancel
              </button>
            </form>
            {error && <p className="mt-4 text-red-600 font-bold text-center">{error}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
