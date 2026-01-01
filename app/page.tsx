'use client';
import React, { useEffect, useRef } from 'react';

export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      // Black background with opacity to create the trail effect
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.fillStyle = "#0F0"; // Green text
      ctx!.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx!.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Matrix Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Content Card */}
      <div className="relative z-10 bg-black/80 p-8 rounded-2xl border border-green-500/30 backdrop-blur-sm max-w-md w-full mx-4 text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4 tracking-tighter">
          SYSTEM_STARTUP
        </h1>
        <p className="text-gray-400 mb-8">
          We are currently encrypting the future. Leave your contact to be notified upon decryption.
        </p>

        {/* Email Form */}
        <form 
          action="https://formspree.io/f/YOUR_ID_HERE" 
          method="POST" 
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="user@network.com"
            required
            className="p-3 rounded bg-black border border-green-900 text-green-400 placeholder:text-green-900 focus:outline-none focus:border-green-500 transition-colors"
          />
          <button 
            type="submit" 
            className="bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded transition-all active:scale-95"
          >
            NOTIFY_ME
          </button>
        </form>
      </div>
    </main>
  );
}
