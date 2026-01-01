'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // --- TIMER LOGIC ---
    // Sets target date to exactly 1 year from now
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

    // --- MATRIX LOGIC ---
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
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = "#0F0";
      ctx!.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(draw, 33);
    return () => {
      clearInterval(timer);
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div className="relative z-10 bg-black/80 p-8 rounded-2xl border border-green-500/30 backdrop-blur-sm max-w-md w-full mx-4 text-center">
        <h1 className="text-5xl font-bold text-green-500 mb-2 tracking-tighter">
          Coming Soon
        </h1>
        <p className="text-xl text-green-400/80 mb-8 font-mono">
          A brand new you!
        </p>

        {/* Countdown Timer Display */}
        <div className="grid grid-cols-4 gap-2 mb-8 font-mono text-green-500">
          <div className="flex flex-col border border-green-900 p-2 rounded">
            <span className="text-2xl font-bold">{timeLeft.days}</span>
            <span className="text-[10px] uppercase">Days</span>
          </div>
          <div className="flex flex-col border border-green-900 p-2 rounded">
            <span className="text-2xl font-bold">{timeLeft.hours}</span>
            <span className="text-[10px] uppercase">Hrs</span>
          </div>
          <div className="flex flex-col border border-green-900 p-2 rounded">
            <span className="text-2xl font-bold">{timeLeft.minutes}</span>
            <span className="text-[10px] uppercase">Min</span>
          </div>
          <div className="flex flex-col border border-green-900 p-2 rounded">
            <span className="text-2xl font-bold">{timeLeft.seconds}</span>
            <span className="text-[10px] uppercase">Sec</span>
          </div>
        </div>

        <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST" className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="enter_access_key@network.com"
            required
            className="p-3 rounded bg-black border border-green-900 text-green-400 placeholder:text-green-900 focus:outline-none focus:border-green-500 transition-colors"
          />
          <button type="submit" className="bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded transition-all active:scale-95">
            INITIALIZE_NOTIFICATION
          </button>
        </form>
      </div>
    </main>
  );
}
