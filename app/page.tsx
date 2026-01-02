'use client';
import React, { useState, useRef } from 'react';
import './globals.css';

// --- BACKGROUND ANIMATION COMPONENT ---
const WebSlinger = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-0 left-0 w-[300px] animate-swing origin-top-left">
      <div className="relative">
        {/* The Web Line */}
        <svg className="absolute -top-[200px] left-[50px] w-full h-[300px] overflow-visible">
           <line x1="-100" y1="-200" x2="100" y2="220" stroke="white" strokeWidth="4" />
        </svg>
        
        {/* The Character Image */}
        <img 
          src="/spidey-swing.png" 
          alt="Spidey Swinging" 
          className="w-48 h-auto drop-shadow-lg transform rotate-12"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    </div>
  </div>
);

// --- HEADER COMPONENT ---
const ComicHeader = () => (
  /* mb-20 provides significant space between the burst and the secret code text */
  <div className="w-full max-w-[320px] mb-20 transform -rotate-2 relative z-10">
    <svg 
      viewBox="0 0 600 500" 
      xmlns="http://www.w3.org/2000/svg" 
      className="overflow-visible filter drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
    >
      <path 
        d="M300,20 L350,110 L440,30 L450,150 L570,100 L530,210 L640,230 L540,320 L620,440 L490,410 L480,540 L380,450 L300,560 L220,450 L120,540 L110,410 L-20,440 L60,320 L-40,230 L70,210 L30,100 L150,150 L160,30 L250,110 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="14" 
        strokeLinejoin="miter" 
      />
      <text x="50%" y="35%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
      <text x="50%" y="54%" textAnchor="middle" fontSize="82" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">LUCAS'S 5TH</text>
      <text x="50%" y="73%" textAnchor="middle" fontSize="42" fill="white" stroke="black" strokeWidth
        
