'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, min: 0, sec: 0 });

  useEffect(() => {
    // 1. COUNTDOWN LOGIC (1 YEAR)
    const target = new Date();
    target.setFullYear(target.getFullYear() + 1);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const dist = target.getTime() - now;
      setTimeLeft({
        days: Math.floor(dist / (1000 * 60 * 60 * 24)),
        hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((dist % (1000 * 60)) / 1000),
      });
    }, 1000);

    // 2. STARDUST CANVAS LOGIC
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; size: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: 0.1 + Math.random() * 0.2,
        alpha: Math.random()
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = '#ffffff';
      
      stars.forEach(s => {
        ctx!.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 * s.speed)) * 0.8; // Twinkle
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx!.fill();
        
        s.y -= s.speed; // Drift upwards
        if (s.y < 0) s.y = canvas!.height;
      });
      requestAnimationFrame(animate);
    }
    animate();

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

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
