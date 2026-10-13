import React from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Minus,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  LabelList
} from 'recharts';
import CircularIndicatorScoreChart from '../CircularIndicatorScoreChart';
import CalculationTooltipCard, { CALCULATION_DATA } from '../CalculationTooltipCard';
import { 
  SIMCE_SCORES
} from '../../constants';
import { EstablishmentInfo } from '../../establishmentData';

interface SimceSectionProps {
  establishment?: EstablishmentInfo;
  activeLevel?: string;
}

export default function SimceSection({ establishment, activeLevel = 'basica' }: SimceSectionProps) {
  const simceData = establishment?.simceScores || SIMCE_SCORES;
  const gradeLabel = activeLevel === 'media' ? 'II medio' : '4.° básico';
  const levelName = activeLevel === 'media' ? 'Educación media' : 'Educación básica';

  // Cálculos de Puntaje Simce (Año 2026 y Año 2020)
  const puntajeSimceNum = establishment ? Math.round(establishment.overallScore / 5) : 51;
  const puntajeSimceValue = puntajeSimceNum.toString();
  const puntajeSimcePrevNum = Math.max(0, Math.round(puntajeSimceNum - 2));
  const puntajeSimcePrevValue = puntajeSimcePrevNum.toString();
  const puntajeSimceDiff = puntajeSimceNum - puntajeSimcePrevNum;
  const formattedPuntajeSimceDiff = Math.abs(puntajeSimceDiff).toString();
  const puntajeSimceDiffUnit = Math.abs(puntajeSimceDiff) === 1 ? 'punto' : 'puntos';

  // Cálculos de Progreso Simce (Año 2026 y Año 2020)
  const progresoSimceNum = establishment 
    ? Math.round((establishment.overallScore / 5) - (establishment.category === 'Alto' ? 1 : 0)) 
    : 50;
  const progresoSimceValue = progresoSimceNum.toString();
  const progresoSimcePrevNum = Math.max(0, Math.round(progresoSimceNum - 3));
  const progresoSimcePrevValue = progresoSimcePrevNum.toString();
  const progresoSimceDiff = progresoSimceNum - progresoSimcePrevNum;
  const formattedProgresoSimceDiff = Math.abs(progresoSimceDiff).toString();
  const progresoSimceDiffUnit = Math.abs(progresoSimceDiff) === 1 ? 'punto' : 'puntos';

  // Helper para generar los datos de variación según la tendencia
  const getProgressItem = (
    period: string, 
    subtitle: string, 
    status: 'Sube' | 'Mantiene' | 'Baja'
  ) => {
    let Icon = TrendingUp;
    let badgeClass = 'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]';
    if (status === 'Mantiene') {
      Icon = Minus;
      badgeClass = 'bg-slate-50 text-slate-700 border-slate-200';
    } else if (status === 'Baja') {
      Icon = TrendingDown;
      badgeClass = 'bg-rose-50 text-rose-800 border-rose-200';
    }
    return { period, subtitle, status, Icon, badgeClass };
  };

  const isLow = establishment?.category === 'Insuficiente';

  // Datos de Progreso por período para Lectura y Matemática
  const progressDataLectura = [
    getProgressItem('2023-2024', 'Variación anual', isLow ? 'Baja' : 'Sube'),
    getProgressItem('2024-2025', 'Variación anual', isLow ? 'Baja' : 'Sube'),
    getProgressItem('Total periodo', '(2023-2025)', isLow ? 'Baja' : 'Sube'),
  ];

  const progressDataMatematica = [
    getProgressItem('2023-2024', 'Variación anual', isLow ? 'Baja' : 'Sube'),
    getProgressItem('2024-2025', 'Variación anual', isLow ? 'Baja' : 'Sube'),
    getProgressItem('Total periodo', '(2023-2025)', isLow ? 'Baja' : 'Sube'),
  ];

  return (
    <div className="space-y-10">
      
      {/* ========================================================================= */}
      {/* 1. SECCIÓN: PUNTAJE SIMCE (solo para educación media, ya que en básica se ubica al lado de Permanencia escolar) */}
      {/* ========================================================================= */}
      {activeLevel === 'media' && (
        <div className="space-y-6">
          {/* Encabezado del bloque Puntaje Simce */}
          <div>
            <h3 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
              Puntaje Simce para {levelName}
            </h3>
          </div>

          {/* Grilla con Puntaje del Indicador y Resultados Simce por Asignatura lado a lado */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
            
            {/* 1.1 GRÁFICO PUNTAJE DEL INDICADOR */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
              <div>
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
                      Resultado del indicador utilizado para el cálculo de la Categoría
                    </h4>
                  </div>
                </div>

                {/* Gráfica circular interanual de indicador */}
                <div className="pt-4 flex flex-col items-center justify-center flex-1 w-full">
                  <CircularIndicatorScoreChart
                    currentYear="2026"
                    currentScore={puntajeSimceNum}
                    currentScoreFormatted={puntajeSimceValue}
                    prevYear="2020"
                    prevScore={puntajeSimcePrevNum}
                    prevScoreFormatted={puntajeSimcePrevValue}
                    unit="puntos"
                    centered
                  />
                </div>
              </div>

              {/* Tarjeta explicativa con Tooltip como en el resto del dashboard */}
              <div className="pt-2 mt-auto">
                <CalculationTooltipCard {...CALCULATION_DATA.puntajeSimce} />
              </div>
            </div>

            {/* 1.2 RESULTADOS SIMCE POR ASIGNATURA (LA SEGUNDA IMAGEN) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-[#004B62] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <BookOpen size={18} />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                    Resultados Simce {gradeLabel} por asignatura utilizados en el cálculo del indicador para la Categoría de Desempeño
                  </h4>
                </div>

                {/* Grilla con los gráficos de Lectura y Matemática visibles uno al lado del otro */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  
                  {/* Gráfico 1: Lectura */}
                  <div className="space-y-2 p-3.5 sm:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/80">
                    <div className="flex items-center gap-2 px-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#004B62] shrink-0" />
                      <h5 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                        Lectura {gradeLabel}
                      </h5>
                    </div>

                    <div className="h-56 sm:h-60 w-full pt-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={simceData} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="year" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#334155', fontSize: 12, fontWeight: 800 }} 
                          />
                          <YAxis hide domain={[0, 350]} />
                          <Bar 
                            dataKey="lectura" 
                            name="Lectura" 
                            fill="#004B62" 
                            radius={[6, 6, 0, 0]} 
                          >
                            <LabelList 
                              dataKey="lectura" 
                              position="top" 
                              formatter={(val: number | string) => `${Number(val)} ${Number(val) === 1 ? 'punto' : 'puntos'}`} 
                              style={{ 
                                fill: '#004B62', 
                                fontSize: '11px', 
                                fontWeight: '800' 
                              }} 
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Gráfico 2: Matemática */}
                  <div className="space-y-2 p-3.5 sm:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/80">
                    <div className="flex items-center gap-2 px-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00738C] shrink-0" />
                      <h5 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                        Matemática {gradeLabel}
                      </h5>
                    </div>

                    <div className="h-56 sm:h-60 w-full pt-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={simceData} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="year" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#334155', fontSize: 12, fontWeight: 800 }} 
                          />
                          <YAxis hide domain={[0, 350]} />
                          <Bar 
                            dataKey="matematica" 
                            name="Matemática" 
                            fill="#00738C" 
                            radius={[6, 6, 0, 0]} 
                          >
                            <LabelList 
                              dataKey="matematica" 
                              position="top" 
                              formatter={(val: number | string) => `${Number(val)} ${Number(val) === 1 ? 'punto' : 'puntos'}`} 
                              style={{ 
                                fill: '#00738C', 
                                fontSize: '11px', 
                                fontWeight: '800' 
                              }} 
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SECCIÓN: PROGRESO SIMCE */}
      {/* ========================================================================= */}
      <div className={`space-y-6 ${activeLevel === 'media' ? 'pt-6 border-t border-slate-200/90' : ''}`}>
        {/* Encabezado del bloque Progreso Simce */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#005B77] text-white flex items-center justify-center shrink-0 shadow-xs">
            <TrendingUp size={18} />
          </div>
          <h3 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
            Progreso Simce para {levelName}
          </h3>
        </div>

        {/* Grilla con Progreso del Indicador y Variaciones Consecutivas lado a lado */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          
          {/* 2.1 GRÁFICO PROGRESO DEL INDICADOR */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
                    Resultado del Indicador utilizado para el cálculo de la Categoría
                  </h4>
                </div>
              </div>

              {/* Gráfica circular interanual de indicador */}
              <div className="pt-4 flex flex-col items-center justify-center flex-1 w-full">
                <CircularIndicatorScoreChart
                  currentYear="2026"
                  currentScore={progresoSimceNum}
                  currentScoreFormatted={progresoSimceValue}
                  prevYear="2020"
                  prevScore={progresoSimcePrevNum}
                  prevScoreFormatted={progresoSimcePrevValue}
                  unit="puntos"
                  centered
                />
              </div>
            </div>

            {/* Tarjeta explicativa con Tooltip como en el resto del dashboard */}
            <div className="pt-2 mt-auto">
              <CalculationTooltipCard {...CALCULATION_DATA.progresoSimce} />
            </div>
          </div>

          {/* 2.2 VARIACIONES ENTRE MEDICIONES CONSECUTIVAS (LA TERCERA IMAGEN) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-[#005B77] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <TrendingUp size={18} />
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                  Variaciones entre mediciones Simce {gradeLabel} utilizadas en el cálculo del indicador
                </h4>
              </div>

              {/* Variaciones: Lectura arriba y Matemática abajo, a lo ancho del espacio disponible */}
              <div className="flex flex-col space-y-4 pt-1 w-full">
                
                {/* Bloque 1: Lectura (arriba) */}
                <div className="w-full space-y-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/80">
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#005B77] shrink-0" />
                    <h5 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                      Lectura {gradeLabel}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
                    {progressDataLectura.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-2.5"
                      >
                        <div>
                          <h6 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
                            {item.period}
                          </h6>
                          <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <div className={`w-full py-1.5 px-2 rounded-lg border flex items-center justify-center gap-1 font-bold text-xs transition-colors ${item.badgeClass}`}>
                          <item.Icon size={14} className="shrink-0 stroke-[2.5]" />
                          <span>{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloque 2: Matemática (abajo) */}
                <div className="w-full space-y-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/50 border border-slate-200/80">
                  <div className="flex items-center gap-2 px-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00738C] shrink-0" />
                    <h5 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                      Matemática {gradeLabel}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
                    {progressDataMatematica.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-2.5"
                      >
                        <div>
                          <h6 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
                            {item.period}
                          </h6>
                          <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        
                        <div className={`w-full py-1.5 px-2 rounded-lg border flex items-center justify-center gap-1 font-bold text-xs transition-colors ${item.badgeClass}`}>
                          <item.Icon size={14} className="shrink-0 stroke-[2.5]" />
                          <span>{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
