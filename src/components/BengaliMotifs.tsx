import React from 'react';

export const AlpanaDivider: React.FC<{ className?: string; dark?: boolean }> = ({
  className = '',
  dark = false,
}) => {
  const strokeColor = dark ? '#C59B27' : '#7A1C1C';
  return (
    <div className={`flex items-center justify-center gap-4 select-none ${className}`} aria-hidden="true">
      <div
        className="h-px flex-1 max-w-28 opacity-35"
        style={{
          background: `linear-gradient(to right, transparent, ${strokeColor})`,
        }}
      />
      <svg
        width="88"
        height="24"
        viewBox="0 0 88 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <path
          d="M44 2C47.5 8 52 12 60 12C52 12 47.5 16 44 22C40.5 16 36 12 28 12C36 12 40.5 8 44 2Z"
          stroke={strokeColor}
          strokeWidth="1.2"
        />
        <circle cx="44" cy="12" r="2.5" fill="#C59B27" />
        <circle cx="18" cy="12" r="2" stroke={strokeColor} strokeWidth="1.1" />
        <circle cx="70" cy="12" r="2" stroke={strokeColor} strokeWidth="1.1" />
        <path d="M4 12H13" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
        <path d="M75 12H84" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" />
      </svg>
      <div
        className="h-px flex-1 max-w-28 opacity-35"
        style={{
          background: `linear-gradient(to left, transparent, ${strokeColor})`,
        }}
      />
    </div>
  );
};

export const AlpanaCornerOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M2 38V12C2 6.47715 6.47715 2 12 2H38"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M7 38V14C7 10.134 10.134 7 14 7H38"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeDasharray="2 2"
    />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export const KolkataSkylineIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1200 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-auto select-none ${className}`}
    role="img"
    aria-label="Artistic line illustration of Kolkata featuring Howrah Bridge, Heritage Tram, and Colonial Courtyard Arches"
  >
    <defs>
      <linearGradient id="kolkataGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7A1C1C" stopOpacity="0.15" />
        <stop offset="30%" stopColor="#C59B27" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#7A1C1C" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#C59B27" stopOpacity="0.15" />
      </linearGradient>
    </defs>

    {/* Base Horizon & Hooghly River Ripples */}
    <line x1="20" y1="240" x2="1180" y2="240" stroke="url(#kolkataGoldGrad)" strokeWidth="1.5" />
    <path
      d="M120 254 Q 260 248, 400 254 T 680 254 T 960 254"
      stroke="#C59B27"
      strokeWidth="1"
      strokeOpacity="0.5"
      fill="none"
    />
    <path
      d="M220 266 Q 380 260, 540 266 T 860 266"
      stroke="#7A1C1C"
      strokeWidth="1"
      strokeOpacity="0.35"
      fill="none"
    />

    {/* Left: Howrah Bridge (Rabindra Setu) Cantilever Structure */}
    <g stroke="#7A1C1C" strokeOpacity="0.78" strokeWidth="1.4">
      {/* Main Twin Towers */}
      <path d="M110 240 L125 75 L142 75 L157 240" />
      <path d="M410 240 L425 75 L442 75 L457 240" />
      {/* Cantilever Upper Chord */}
      <path d="M45 195 L125 75 L235 128 L332 128 L425 75 L505 195" strokeWidth="1.8" />
      {/* Bridge Deck */}
      <line x1="40" y1="195" x2="515" y2="195" strokeWidth="2.2" />
      {/* Vertical & Diagonal Truss Webbing */}
      <line x1="175" y1="98" x2="175" y2="195" strokeWidth="1" />
      <line x1="205" y1="113" x2="205" y2="195" strokeWidth="1" />
      <line x1="235" y1="128" x2="235" y2="195" strokeWidth="1" />
      <line x1="268" y1="128" x2="268" y2="195" strokeWidth="1" />
      <line x1="300" y1="128" x2="300" y2="195" strokeWidth="1" />
      <line x1="332" y1="128" x2="332" y2="195" strokeWidth="1" />
      <line x1="362" y1="113" x2="362" y2="195" strokeWidth="1" />
      <line x1="392" y1="98" x2="392" y2="195" strokeWidth="1" />
      {/* Cross Bracing */}
      <path d="M148 195 L175 98 L205 195 L235 128 L268 195 L300 128 L332 195 L362 113 L392 195" strokeWidth="0.9" strokeOpacity="0.55" />
    </g>

    {/* Country Boat (Nouka) on the Hooghly */}
    <g stroke="#C59B27" strokeWidth="1.4">
      <path d="M245 228 Q 285 242, 325 228 L 312 236 L 258 236 Z" fill="#C59B27" fillOpacity="0.18" />
      <path d="M275 229 C 275 216, 295 216, 295 229" />
    </g>

    {/* Center: Iconic Heritage Kolkata Tram (#24 Park Street — Esplanade) */}
    <g transform="translate(555, 132)">
      {/* Overhead Pantograph & Wire */}
      <line x1="-40" y1="-28" x2="250" y2="-28" stroke="#C59B27" strokeWidth="0.9" strokeDasharray="4 4" />
      <path d="M95 16 L 82 -12 L 95 -28 L 108 -12 Z" stroke="#7A1C1C" strokeWidth="1.2" />
      {/* First Bogie */}
      <rect x="0" y="16" width="195" height="76" rx="8" stroke="#7A1C1C" strokeWidth="1.8" fill="#FAF7F2" />
      <rect x="6" y="22" width="183" height="64" rx="5" stroke="#C59B27" strokeWidth="0.9" />
      {/* Tram Destination Header */}
      <rect x="58" y="6" width="78" height="12" rx="2" fill="#7A1C1C" />
      {/* Arched Tram Windows */}
      <rect x="16" y="32" width="24" height="28" rx="4" stroke="#7A1C1C" strokeWidth="1.2" />
      <rect x="48" y="32" width="24" height="28" rx="4" stroke="#7A1C1C" strokeWidth="1.2" />
      <rect x="80" y="32" width="34" height="48" rx="3" stroke="#C59B27" strokeWidth="1.3" />
      <rect x="122" y="32" width="24" height="28" rx="4" stroke="#7A1C1C" strokeWidth="1.2" />
      <rect x="154" y="32" width="24" height="28" rx="4" stroke="#7A1C1C" strokeWidth="1.2" />
      {/* Classic Headlamp */}
      <circle cx="195" cy="66" r="5" fill="#C59B27" />
      {/* Wheels */}
      <circle cx="38" cy="98" r="9" stroke="#1C1311" strokeWidth="2" fill="#FAF7F2" />
      <circle cx="62" cy="98" r="9" stroke="#1C1311" strokeWidth="2" fill="#FAF7F2" />
      <circle cx="132" cy="98" r="9" stroke="#1C1311" strokeWidth="2" fill="#FAF7F2" />
      <circle cx="156" cy="98" r="9" stroke="#1C1311" strokeWidth="2" fill="#FAF7F2" />
    </g>

    {/* Right: North Kolkata Thakurdalan Archways & Louvered Shutters */}
    <g transform="translate(825, 68)" stroke="#7A1C1C" strokeWidth="1.4" strokeOpacity="0.82">
      {/* Classical Pediment & Cornice */}
      <path d="M10 42 L155 4 L300 42 Z" fill="#C59B27" fillOpacity="0.08" />
      <rect x="10" y="42" width="290" height="10" />
      {/* Twin Corinthian Pillars & Cusped Arches */}
      <line x1="28" y1="52" x2="28" y2="172" strokeWidth="2" />
      <line x1="112" y1="52" x2="112" y2="172" strokeWidth="2" />
      <line x1="198" y1="52" x2="198" y2="172" strokeWidth="2" />
      <line x1="282" y1="52" x2="282" y2="172" strokeWidth="2" />

      {/* Three Heritage Arches */}
      <path d="M28 110 C28 74, 112 74, 112 110" stroke="#C59B27" strokeWidth="1.6" />
      <path d="M112 110 C112 74, 198 74, 198 110" stroke="#C59B27" strokeWidth="1.6" />
      <path d="M198 110 C198 74, 282 74, 282 110" stroke="#C59B27" strokeWidth="1.6" />

      {/* Hanging Courtyard Lanterns */}
      <line x1="70" y1="82" x2="70" y2="108" stroke="#C59B27" />
      <circle cx="70" cy="112" r="4.5" fill="#C59B27" />
      <line x1="155" y1="82" x2="155" y2="104" stroke="#C59B27" />
      <circle cx="155" cy="109" r="5.5" fill="#C59B27" />
      <line x1="240" y1="82" x2="240" y2="108" stroke="#C59B27" />
      <circle cx="240" cy="112" r="4.5" fill="#C59B27" />
    </g>
  </svg>
);
