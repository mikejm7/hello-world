'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function SpideyParty() {
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasRSVPd, setHasRSVPd] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const SECRET_CODE = "SPIDEY6"; 

  // Countdown Logic for March 27
  useEffect(() => {
    const target = new Date("March 27, 2026 14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }

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
      setError('');
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    } else {
      setError('THWIP! Try again!');
    }
  };

  const handleRSVP = (e: React.FormEvent) => {
    setHasRSVPd(true);
    // The form action in the HTML will still handle the Formspree submission
  };

  return (
    <main className="min-h-screen bg-[#001f5b] p-4 flex flex-col items-center justify-center relative overflow-hidden">
      <audio ref={audioRef} loop src="https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptoken=1040375" />

      {/* Web background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-swing">
          <div className="inline-block bg-[#e62429] comic-border p-4 transform -rotate-2">
            <h1 className="text-4xl md:text-6xl font-comic text-white uppercase leading-tight">
              {isUnlocked ? "Lucas's Birthday!" : "Secret Invite!"}
            </h1>
          </div>
        </div>

        {!isUnlocked ? (
          <div className="bg-white comic-border p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-comic text-3xl mb-4 text-[#001f5b]">Unlock Mission</h2>
            <form onSubmit={handleVerify} className="space-y-4">
              <input type="text" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="SECRET CODE" className="w-full p-4 border-4 border-black text-center font-bold text-2xl uppercase outline-none" />
              <button type="submit" className="w-full bg-[#e62429] text-white font-comic text-3xl py-4 comic-border active:scale-95">JOIN TEAM</button>
            </form>
            {error && <p className="mt-4 text-red-600 font-bold">{error}</p>}
          </div>
        ) : (
          <div className="space-y-6 animate-reveal">
            {/* PARTY INFO */}
            <div className="bg-white comic-border p-8 shadow-[8px_8px_0px_0px_rgba(230,36,41,1)]">
              <h2 className="bg-yellow-400 p-2 comic-border -mt-12 mb-4 text-center font-comic text-3xl">MISSION DETAILS</h2>
              <div className="text-[#001f5b] space-y-4 font-comic text-2xl">
                <p>📅 Friday, March 27 @ 2:00 PM</p>

                
