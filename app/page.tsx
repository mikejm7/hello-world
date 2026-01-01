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

    // RAINBOW MATRIX LOGIC
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) drops[i] = 1;

    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.1)"; // Darker for better contrast
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < drops.length; i++) {
        // This line creates the Rainbow Roll from left to right
        const hue = (i / columns) * 360; 
        ctx!.fillStyle = `hsl(${hue}, 100%, 50%)`;
        
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(draw, 33);
    return () => { clearInterval(timer); clearInterval(matrixInterval); };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="relative z-10 bg-black/60 p-10 rounded-3xl border border-white/10 backdrop-blur-md max-w-md w-full mx-4 text-center">
        {/* Neon Glitch Text */}
        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter animate-glitch uppercase italic">
          Coming Soon
        </h1>
        <p className="text-xl text-white/90 mb-8 font-light italic">
          A brand new you!
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 mb-8 text-white font-mono">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col bg-white/5 border border-white/20 p-2 rounded-lg">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-[10px] uppercase opacity-60">{label.slice(0,3)}</span>
            </div>
          ))}
        </div>

        <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
          <button type="submit" className="bg-white text-black font-black py-4 px-6 rounded-xl hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-widest">
            Notify Me
          </button>
        </form>
      </div>
    </main>
  );
}
