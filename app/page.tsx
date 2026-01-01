'use client';
import React, { useState } from 'react';

export default function SpideyParty() {
  const [inviteCode, setInviteCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  // SET YOUR SECRET CODE HERE
  const SECRET_CODE = "SPIDEY6"; 

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.toUpperCase() === SECRET_CODE) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('THWIP! That code is not correct. Try again!');
    }
  };

  return (
    <main className="min-h-screen bg-[#001f5b] p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative "Web" Background Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Header Section */}
        <div className="text-center mb-8 animate-swing">
          <div className="inline-block bg-[#e62429] comic-border p-4 transform -rotate-2">
            <h1 className="text-5xl md:text-6xl font-comic text-white tracking-widest uppercase">
              You're Invited!
            </h1>
          </div>
          <p className="font-comic text-2xl text-white mt-4 tracking-wider">
            To a Spidey & Amazing Friends Adventure!
          </p>
        </div>

        {!isUnlocked ? (
          /* Locked State: Code Entry */
          <div className="bg-white comic-border p-8 text-center">
            <h2 className="font-comic text-3xl mb-4 text-[#001f5b]">Unlock the Secret Mission</h2>
            <p className="text-gray-600 mb-6">Enter the secret code found on your physical invitation to see the time and place!</p>
            
            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="ENTER CODE HERE"
                className="w-full p-4 border-4 border-black text-center font-bold text-2xl uppercase focus:outline-none focus:ring-4 focus:ring-[#e62429]"
              />
              <button 
                type="submit"
                className="w-full bg-[#e62429] hover:bg-red-700 text-white font-comic text-3xl py-4 comic-border transition-transform active:scale-95"
              >
                VERIFY ACCESS
              </button>
            </form>
            {error && <p className="mt-4 text-red-600 font-bold italic">{error}</p>}
          </div>
        ) : (
          /* Unlocked State: Party Info */
          <div className="bg-white comic-border p-8 animate-reveal space-y-6">
            <div className="bg-yellow-400 p-2 comic-border -mt-12 mb-4 transform rotate-1">
              <h2 className="font-comic text-4xl text-black text-center italic">GO SPIDEY TEAM!</h2>
            </div>
            
            <div className="space-y-4 text-[#001f5b]">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📅</span>
                <div>
                  <p className="font-bold uppercase text-sm">When:</p>
                  <p className="text-2xl font-comic">Saturday, August 15th @ 2:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t-2 border-dashed border-gray-200 pt-4">
                <span className="text-4xl">📍</span>
                <div>
                  <p className="font-bold uppercase text-sm">Where:</p>
                  <p className="text-2xl font-comic leading-tight">
                    Spidey Secret Base<br/>
                    123 Hero Lane, Adventure City
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t-2 border-dashed border-gray-200 pt-4">
                <span className="text-4xl">🎁</span>
                <div>
                  <p className="font-bold uppercase text-sm">Mission Details:</p>
                  <p className="text-lg">Come dressed as your favorite hero! Pizza and Cake will be served at the HQ.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.print()}
              className="w-full mt-6 bg-[#001f5b] text-white font-comic text-2xl py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              SAVE MISSION INTEL
            </button>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="mt-12 text-white/50 font-comic tracking-widest text-sm">
        TEAM UP! — 2026 — ADVENTURE AWAITS
      </footer>
    </main>
  );
}

      <div className="relative z-10 w-full max-w-2xl text-center space-y-12 animate-reveal">
        {/* Branding */}
        <div className="space-y-4">
          <h1 className="text-sm tracking-[0.6em] uppercase text-white/40 font-light">
            EST. 2026
          </h1>
          <h2 className="text-7xl md:text-9xl font-serif italic font-light leading-tight">
            Coming Soon
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/60 tracking-wide">
            A brand new you.
          </p>
        </div>

        {/* Minimalist Separator */}
        <div className="w-12 h-[1px] bg-white/20 mx-auto" />

        {/* Elegant Countdown */}
        <div className="grid grid-cols-4 gap-8 md:gap-16 max-w-md mx-auto">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl font-light">{value}</span>
              <span className="text-[10px] tracking-widest uppercase text-white/30 mt-2">{label}</span>
            </div>
          ))}
        </div>

        {/* Refined Form */}
        <form 
          action="https://formspree.io/f/YOUR_ID_HERE" 
          method="POST" 
          className="max-w-xs mx-auto pt-8"
        >
          <div className="group relative border-b border-white/10 py-2 focus-within:border-white transition-all duration-700">
            <input
              type="email"
              name="email"
              placeholder="JOIN THE LIST"
              required
              className="w-full bg-transparent text-center text-[11px] tracking-[0.3em] uppercase placeholder:text-white/20 focus:outline-none"
            />
            <button type="submit" className="mt-4 text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-all">
              Request Access
            </button>
          </div>
        </form>
      </div>

      <footer className="absolute bottom-10 text-[9px] tracking-[0.5em] text-white/20 uppercase">
        London — New York — Tokyo
      </footer>
    </main>
  );
}

    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.1)"; 
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < drops.length; i++) {
        // Monochromatic Gray Tones
        const opacity = Math.random() * 0.5;
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50); // Slower for elegance
    return () => { clearInterval(timer); clearInterval(interval); };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30" />

      <div className="relative z-10 w-full max-w-xl px-6 text-center">
        <h1 className="text-sm tracking-[0.5em] uppercase text-white/40 mb-4">
          Establishment 2026
        </h1>
        
        <h2 className="text-6xl md:text-7xl font-extralight text-white mb-2 tracking-tighter animate-elegant">
          Coming Soon
        </h2>
        
        <p className="text-lg text-white/60 mb-12 font-light tracking-wide italic">
          A brand new you
        </p>

        {/* Minimalist Countdown */}
        <div className="flex justify-center space-x-8 md:space-x-12 mb-16">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-light text-white">{value}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{label}</span>
            </div>
          ))}
        </div>

        {/* Refined Form */}
        <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="max-w-sm mx-auto group">
          <div className="relative border-b border-white/20 focus-within:border-white transition-colors duration-500">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full py-3 bg-transparent text-white placeholder:text-white/20 focus:outline-none font-light"
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
              Join
            </button>
          </div>
        </form>
      </div>
      
      <footer className="absolute bottom-8 text-[10px] tracking-[0.3em] text-white/20 uppercase">
        Privately Encrypted
      </footer>
    </main>
  );
}
