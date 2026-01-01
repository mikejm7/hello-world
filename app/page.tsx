const ComicHeader = () => (
  <div className="w-full max-w-[500px] drop-shadow-[15px_15px_0px_rgba(0,0,0,1)] mb-8">
    <svg 
      viewBox="-50 -50 700 700" /* Added negative margin to prevent clipping */
      xmlns="http://www.w3.org/2000/svg" 
      className="overflow-visible"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="black" opacity="0.2" />
        </pattern>
      </defs>

      {/* Outer Yellow Burst - Extra thick consistent border */}
      <path 
        d="M300,30 L340,110 L410,50 L425,140 L510,100 L495,190 L585,170 L530,260 L595,330 L530,400 L585,490 L495,470 L510,560 L425,520 L410,610 L340,550 L300,630 L260,550 L190,610 L175,520 L90,560 L105,470 L15,490 L70,400 L5,330 L70,260 L15,170 L105,190 L90,100 L175,140 L190,50 L260,110 Z" 
        fill="#FFEB3B" 
        stroke="black" 
        strokeWidth="12" 
        strokeLinejoin="round"
      />
      
      {/* Inner Blue Burst - Offset to create that 'hand-drawn' comic look */}
      <path 
        d="M300,100 L340,170 L400,130 L415,200 L490,170 L475,250 L550,230 L500,310 L560,390 L490,380 L480,460 L410,430 L300,500 L190,430 L120,460 L110,380 L40,390 L100,310 L50,230 L125,250 L110,170 L185,200 L200,130 L260,170 Z" 
        fill="#03A9F4" 
        stroke="black" 
        strokeWidth="12" 
        strokeLinejoin="round"
      />
      
      {/* Halftone Overlay */}
      <path 
        d="M300,100 L340,170 L400,130 L415,200 L490,170 L475,250 L550,230 L500,310 L560,390 L490,380 L480,460 L410,430 L300,500 L190,430 L120,460 L110,380 L40,390 L100,310 L50,230 L125,250 L110,170 L185,200 L200,130 L260,170 Z" 
        fill="url(#dots)"
        pointerEvents="none"
      />

      {/* Locked Text Layer */}
      <g transform="translate(0, 15)"> {/* Slight shift for vertical balance */}
        <text x="50%" y="32%" textAnchor="middle" fontSize="38" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">YOU'RE INVITED TO</text>
        <text x="50%" y="50%" textAnchor="middle" fontSize="76" fill="#E62429" stroke="black" strokeWidth="3" fontFamily="Bangers">LUCAS'S 5TH</text>
        <text x="50%" y="68%" textAnchor="middle" fontSize="38" fill="white" stroke="black" strokeWidth="8" paintOrder="stroke" fontFamily="Bangers">BIRTHDAY PARTY!</text>
      </g>
    </svg>
  </div>
);
          
