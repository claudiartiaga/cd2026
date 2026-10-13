import React from 'react';

interface GenderEquityChartProps {
  // Optional custom values if needed, otherwise uses the exact values from the official image
  yearLabels?: string[];
  femaleScores?: { year: string; score: number; isSignificant?: boolean }[];
  maleScores?: { year: string; score: number }[];
}

export default function GenderEquityChart({
  yearLabels = ['2023', '2024', '2025'],
  femaleScores = [
    { year: '2023', score: 75, isSignificant: true },
    { year: '2024', score: 78, isSignificant: false },
    { year: '2025', score: 73, isSignificant: false },
  ],
  maleScores = [
    { year: '2023', score: 69 },
    { year: '2024', score: 76 },
    { year: '2025', score: 71 },
  ]
}: GenderEquityChartProps) {
  // Coordinates mapping for SVG (width 540, height 260)
  // Y-axis range: 0 to 100
  const paddingLeft = 60;
  const paddingRight = 40;
  const chartWidth = 540;
  const plotWidth = chartWidth - paddingLeft - paddingRight; // 440
  const xPositions = [
    paddingLeft + 35,                          // 2023: 95
    paddingLeft + plotWidth / 2,               // 2024: 280
    paddingLeft + plotWidth - 35               // 2025: 465
  ];

  const yForScore = (score: number) => {
    // 0 is at y=205, 100 is at y=38
    const y0 = 205;
    const y100 = 38;
    return y0 - (score / 100) * (y0 - y100);
  };

  const femalePoints = femaleScores.map((item, idx) => ({
    x: xPositions[idx],
    y: yForScore(item.score),
    score: item.score,
    isSignificant: item.isSignificant,
    year: item.year
  }));

  const malePoints = maleScores.map((item, idx) => ({
    x: xPositions[idx],
    y: yForScore(item.score),
    score: item.score,
    year: item.year
  }));

  const femalePath = femalePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const malePath = malePoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 pt-4 pb-6">
        
        {/* Lado Izquierdo: Gráfico de Líneas de Equidad de Género (Mucho más grande y dominante) */}
        <div className="flex-1 w-full min-w-0">
          <div className="w-full h-72 sm:h-80 md:h-[350px] relative">
            <svg 
              viewBox="0 0 540 260" 
              className="w-full h-full select-none"
              style={{ overflow: 'visible' }}
            >
              {/* Y-axis labels and gridlines */}
              {/* 100 */}
              <text x="16" y={yForScore(100) + 4} fill="#004B62" fontSize="14" fontWeight="800">100</text>
              <line 
                x1="52" 
                y1={yForScore(100)} 
                x2="510" 
                y2={yForScore(100)} 
                stroke="#e2e8f0" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />

              {/* 50 */}
              <text x="24" y={yForScore(50) + 4} fill="#004B62" fontSize="14" fontWeight="800">50</text>
              <line 
                x1="52" 
                y1={yForScore(50)} 
                x2="510" 
                y2={yForScore(50)} 
                stroke="#e2e8f0" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />

              {/* 0 (solid axis baseline) */}
              <text x="32" y={yForScore(0) + 4} fill="#004B62" fontSize="14" fontWeight="800">0</text>
              <line 
                x1="52" 
                y1={yForScore(0)} 
                x2="510" 
                y2={yForScore(0)} 
                stroke="#cbd5e1" 
                strokeWidth="2" 
              />

              {/* Línea Hombres (Azul) */}
              <path 
                d={malePath} 
                fill="none" 
                stroke="#005A9C" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Línea Mujeres (Rojo) */}
              <path 
                d={femalePath} 
                fill="none" 
                stroke="#DC2626" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Puntos y Etiquetas - Hombres (Azul, abajo del punto) */}
              {malePoints.map((p) => (
                <g key={`male-${p.year}`}>
                  {/* Punto */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="6" 
                    fill="#ffffff" 
                    stroke="#005A9C" 
                    strokeWidth="4" 
                  />
                  {/* Etiqueta de puntaje abajo */}
                  <text 
                    x={p.x} 
                    y={p.y + 24} 
                    textAnchor="middle" 
                    fill="#005A9C" 
                    fontSize="17" 
                    fontWeight="800"
                  >
                    {p.score}
                  </text>
                </g>
              ))}

              {/* Puntos y Etiquetas - Mujeres (Rojo, arriba del punto) */}
              {femalePoints.map((p) => (
                <g key={`female-${p.year}`}>
                  {/* Punto */}
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="6" 
                    fill="#ffffff" 
                    stroke="#DC2626" 
                    strokeWidth="4" 
                  />
                  {/* Etiqueta de puntaje arriba */}
                  <text 
                    x={p.x} 
                    y={p.y - 14} 
                    textAnchor="middle" 
                    fill="#DC2626" 
                    fontSize="17" 
                    fontWeight="800"
                  >
                    {p.score} {p.isSignificant ? '(+)' : ''}
                  </text>
                </g>
              ))}

              {/* X-axis year ticks (bold) */}
              {yearLabels.map((yr, idx) => (
                <text 
                  key={yr} 
                  x={xPositions[idx]} 
                  y={yForScore(0) + 32} 
                  textAnchor="middle" 
                  fill="#0f172a" 
                  fontSize="16" 
                  fontWeight="800"
                >
                  {yr}
                </text>
              ))}
            </svg>
          </div>

          {/* Leyenda Horizontal (Píldoras redondeadas como en la imagen) */}
          <div className="flex items-center justify-center gap-10 mt-6 pt-2">
            {/* Mujeres */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-3.5 rounded-full bg-[#DC2626] inline-block shadow-2xs" />
              <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">Mujeres</span>
            </div>

            {/* Hombres */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-3.5 rounded-full bg-[#005A9C] inline-block shadow-2xs" />
              <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">Hombres</span>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Sello Circular Oficial de Equidad de Género (Más compacto y proporcional respecto al gráfico) */}
        <div className="flex items-center justify-center shrink-0 w-full lg:w-auto my-2 lg:my-0 lg:pr-4">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[2px] border-[#004B62] flex items-center justify-center bg-white shadow-xs p-3">
            {/* Anillo concéntrico discontinuo (dashed inner ring) */}
            <div className="absolute inset-2 rounded-full border border-dashed border-[#00738C]/50 pointer-events-none" />
            
            {/* Texto central en negrita profunda */}
            <div className="relative z-10 text-center px-2">
              <p className="text-[#002B49] text-sm sm:text-base font-black leading-snug tracking-tight">
                Se observa <br />
                equidad de <br />
                género.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
