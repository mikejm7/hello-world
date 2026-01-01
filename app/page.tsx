'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // TIMER LOGIC
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    // MONOCHROME MATRIX LOGIC
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01"; // Minimalist binary or use "ABC..."
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100;

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
