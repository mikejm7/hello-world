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
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-6">
      
      <audio ref={audioRef} loop src="https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptoken=1040375" />

      <div className="w-full max-w-md flex flex-col items-center text-center space-y-12">
        
        {/* HEADER */}
        <div className="bg-[#e62429] comic-border p-6 transform -rotate-1">
          <h1 className="text-3xl md:text-5xl font-comic text-white leading-tight uppercase tracking-tight">
            You're invited to <br/> Lucas's 5th birthday party!
          </h1>
        </div>

        {!isUnlocked ? (
          /* INITIAL STATE: ACCESS BUTTON */
          <div className="flex flex-col items-center space-y-4">
             <button 
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 text-black font-comic text-3xl py-4 px-10 comic-border hover:bg-yellow-300 active:scale-95 transition-all animate-bounce"
            >
              ENTER SECRET CODE
            </button>
            <p className="font-bold text-[#001f5b] uppercase tracking-widest text-sm italic">Identification Required</p>
          </div>
        ) : (
          /* UNLOCKED STATE */
          <div className="w-full space-y-8 animate-slide">
            <div className="bg-white comic-border p-8 border-[#001f5b]">
              <h2 className="bg-yellow-400 p-2 comic-border -mt-12 mb-6 text-center font-comic text-3xl text-black">MISSION INTEL</h2>
              <div className="text-[#001f5b] space-y-4 font-comic text-2xl">
                <p>📅 Friday, March 27 @ 2:00 PM</p>
                <p>📍 Spidey Secret Base HQ</p>
              </div>
            </div>

            {!hasRSVPd ? (
              /* RSVP SECTION */
              <div className="bg-[#e62429] comic-border p-8">
                <h3 className="font-comic text-3xl text-white mb-6 uppercase italic">Team Up?</h3>
                <form 
                  action="https://formspree.io/f/YOUR_ID_HERE" 
                  method="POST" 
                  onSubmit={() => setHasRSVPd(true)} 
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="text-white font-bold text-xs uppercase mb-1 block">Hero Name</label>
                    <input type="text" name="name" required className="w-full p-3 border-2 border-black font-bold uppercase text-black" />
                  </div>
                  <div>
                    <label className="text-white font-bold text-xs uppercase mb-1 block">Attending</label>
                    <select name="attending" className="w-full p-3 border-2 border-black font-bold uppercase text-black">
                      <option value="yes">YES! COUNT ME IN!</option>
                      <option value="no">NO, BUSY SAVING THE CITY</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-yellow-400 text-black font-comic text-3xl py-3 border-4 border-black active:scale-95 mt-4">SEND RSVP</button>
                </form>
              </div>
            ) : (
              /* COUNTDOWN SECTION */
              <div className="bg-white comic-border p-8 text-center animate-reveal border-[#e62429]">
                <h3 className="font-comic text-4xl text-[#e62429] mb-4">LAUNCHING IN:</h3>
                <div className="grid grid-cols-4 gap-2 font-comic text-[#001f5b]">
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.days}</span>
                    <span className="text-[10px]">DAYS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.hours}</span>
                    <span className="text-[10px]">HRS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.mins}</span>
                    <span className="text-[10px]">MINS</span>
                  </div>
                  <div className="flex flex-col bg-gray-100 p-2 border-2 border-black">
                    <span className="text-3xl">{timeLeft.secs}</span>
                    <span className="text-[10px]">SECS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* OVERLAY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white comic-border p-8 w-full max-w-sm text-center">
            <h2 className="font-comic text-3xl text-[#001f5b] mb-4 uppercase">Verify Identity</h2>
            <form onSubmit={handleVerify} className="space-y-4">
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
              <button type="button" onClick={() => setShowModal(false)} className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2 underline">
                Cancel
              </button>
            </form>
            {error && <p className="mt-4 text-red-600 font-bold">{error}</p>}
          </div>
        </div>
      )}
    </main>
  );
      }
