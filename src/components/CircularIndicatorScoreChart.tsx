import React from 'react';
import { motion } from 'motion/react';

interface CircularIndicatorScoreChartProps {
  currentYear?: string;
  currentScore: number;
  currentScoreFormatted?: string | number;
  prevYear?: string;
  prevScore?: number;
  prevScoreFormatted?: string | number;
  unit?: string;
  isPercentage?: boolean;
  centered?: boolean;
}

export default function CircularIndicatorScoreChart({
  currentYear = '2026',
  currentScore,
  currentScoreFormatted,
  prevYear = '2020',
  prevScore,
  prevScoreFormatted,
  unit,
  isPercentage = false,
  centered = false
}: CircularIndicatorScoreChartProps) {
  // Configuración círculo 2026
  const size2026 = 148;
  const strokeWidth2026 = 12;
  const radius2026 = (size2026 - strokeWidth2026) / 2;
  const circumference2026 = 2 * Math.PI * radius2026;
  const clampedScore2026 = Math.max(0, Math.min(100, currentScore || 0));
  const offset2026 = circumference2026 - (clampedScore2026 / 100) * circumference2026;

  // Configuración círculo 2020
  const size2020 = 132;
  const strokeWidth2020 = 10;
  const radius2020 = (size2020 - strokeWidth2020) / 2;
  const circumference2020 = 2 * Math.PI * radius2020;
  const clampedScore2020 = Math.max(0, Math.min(100, prevScore || 0));
  const offset2020 = circumference2020 - (clampedScore2020 / 100) * circumference2020;

  const displayCurrent = currentScoreFormatted !== undefined ? currentScoreFormatted : currentScore;
  const displayPrev = prevScoreFormatted !== undefined ? prevScoreFormatted : prevScore;
  
  const unitLabel = unit || (isPercentage ? '%' : (currentScore === 1 ? 'punto' : 'puntos'));
  const prevUnitLabel = unit || (isPercentage ? '%' : (prevScore === 1 ? 'punto' : 'puntos'));

  return (
    <div className={`flex-1 flex flex-col justify-center min-w-0 ${centered ? 'w-full items-center' : ''}`}>
      <div className={`flex flex-wrap items-center gap-6 sm:gap-10 pt-2 pb-3 ${centered ? 'justify-center mx-auto' : 'justify-around sm:justify-start'}`}>
        {/* Gráfico Circular Año 2026 (Destacado) */}
        <div className="flex flex-col items-center">
          <span className="font-black text-[#0C4581] text-sm sm:text-base mb-2">
            Año {currentYear}
          </span>
          <div className="relative flex items-center justify-center">
            <svg
              width={size2026}
              height={size2026}
              viewBox={`0 0 ${size2026} ${size2026}`}
              className="drop-shadow-xs"
            >
              <defs>
                <linearGradient id="scoreCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0C4581" />
                  <stop offset="50%" stopColor="#085a96" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              {/* Pista de fondo */}
              <circle
                cx={size2026 / 2}
                cy={size2026 / 2}
                r={radius2026}
                fill="transparent"
                stroke="#E2E8F0"
                strokeWidth={strokeWidth2026}
              />
              {/* Arco de progreso */}
              <motion.circle
                cx={size2026 / 2}
                cy={size2026 / 2}
                r={radius2026}
                fill="transparent"
                stroke="url(#scoreCircleGrad)"
                strokeWidth={strokeWidth2026}
                strokeDasharray={circumference2026}
                initial={{ strokeDashoffset: circumference2026 }}
                animate={{ strokeDashoffset: offset2026 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                strokeLinecap="round"
                transform={`rotate(-90 ${size2026 / 2} ${size2026 / 2})`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
              <span className="text-2xl sm:text-3xl font-black text-[#0C4581] tracking-tight">
                {displayCurrent}{isPercentage ? '%' : ''}
              </span>
              {!isPercentage && (
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider -mt-0.5">
                  {unitLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Gráfico Circular Año 2020 (Comparativa / Anterior) */}
        {prevScore !== undefined && (
          <div className="flex flex-col items-center opacity-85">
            <span className="font-semibold text-slate-500 text-xs sm:text-sm mb-2">
              Año {prevYear}
            </span>
            <div className="relative flex items-center justify-center">
              <svg
                width={size2020}
                height={size2020}
                viewBox={`0 0 ${size2020} ${size2020}`}
                className="drop-shadow-2xs"
              >
                {/* Pista de fondo */}
                <circle
                  cx={size2020 / 2}
                  cy={size2020 / 2}
                  r={radius2020}
                  fill="transparent"
                  stroke="#F1F5F9"
                  strokeWidth={strokeWidth2020}
                />
                {/* Arco de progreso */}
                <motion.circle
                  cx={size2020 / 2}
                  cy={size2020 / 2}
                  r={radius2020}
                  fill="transparent"
                  stroke="#94A3B8"
                  strokeWidth={strokeWidth2020}
                  strokeDasharray={circumference2020}
                  initial={{ strokeDashoffset: circumference2020 }}
                  animate={{ strokeDashoffset: offset2020 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size2020 / 2} ${size2020 / 2})`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                <span className="text-xl sm:text-2xl font-bold text-slate-700 tracking-tight">
                  {displayPrev}{isPercentage ? '%' : ''}
                </span>
                {!isPercentage && (
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider -mt-0.5">
                    {prevUnitLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
