import React from 'react';
import { 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  LabelList
} from 'recharts';
import CircularIndicatorScoreChart from './CircularIndicatorScoreChart';
import CalculationTooltipCard, { CALCULATION_DATA } from './CalculationTooltipCard';
import { SIMCE_SCORES } from '../constants';
import { EstablishmentInfo } from '../establishmentData';

interface PuntajeSimceBesidePermanenciaCardProps {
  establishment?: EstablishmentInfo;
  gradeLabel?: string;
}

export default function PuntajeSimceBesidePermanenciaCard({
  establishment,
  gradeLabel = '4° básico'
}: PuntajeSimceBesidePermanenciaCardProps) {
  const simceData = establishment?.simceScores || SIMCE_SCORES;
  const puntajeSimceNum = establishment ? Math.round(establishment.overallScore / 5) : 58;
  const puntajeSimceValue = puntajeSimceNum.toString();
  const puntajeSimcePrevNum = Math.max(0, Math.round(puntajeSimceNum - 2));
  const puntajeSimcePrevValue = puntajeSimcePrevNum.toString();

  return (
    <section className="w-full flex flex-col h-full">
      {/* Header del indicador (fuera del cuadro blanco, alineado con los otros indicadores) */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 px-1">
        <div className="w-12 h-12 rounded-2xl bg-[#004B62] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <GraduationCap size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
              Puntaje Simce
            </h3>
            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className="text-xl sm:text-2xl font-black text-[#004B62] tracking-tight">
                {puntajeSimceNum}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500">
                puntos
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed min-h-[52px] sm:min-h-[58px]">
            Para obtener este indicador, se calcula el puntaje promedio obtenido por el establecimiento en las evaluaciones Simce de Lectura y Matemática de {gradeLabel} utilizadas en el cálculo de la Categoría de Desempeño.
          </p>
        </div>
      </div>

      {/* CAJA ÚNICA PARA AMBOS CONTENIDOS: ARRIBA CIRCULARES, ABAJO BARRAS */}
      <div className="w-full flex-1 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
        
        {/* PARTE SUPERIOR (ARRIBA): GRÁFICOS CIRCULARES */}
        <div className="space-y-5">
          {/* Encabezado */}
          <div className="pb-3 border-b border-slate-100">
            <h4 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
              Resultado del indicador utilizado para el cálculo de la Categoría
            </h4>
          </div>

          {/* Gráfica circular interanual centrada */}
          <div className="pt-2 flex flex-col items-center justify-center w-full">
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

          {/* Tarjeta explicativa con Tooltip */}
          <div className="pt-2">
            <CalculationTooltipCard {...CALCULATION_DATA.puntajeSimce} />
          </div>
        </div>

        {/* SEPARADOR ENTRE AMBOS BLOQUES */}
        <div className="border-t border-slate-200/80" />

        {/* PARTE INFERIOR (ABAJO): GRÁFICOS DE BARRA DE LECTURA Y MATEMÁTICA */}
        <div className="space-y-4 pt-1">
          {/* Encabezado con ícono */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-[#004B62] text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen size={16} />
            </div>
            <h4 className="text-[14px] sm:text-[16px] font-bold text-slate-800 tracking-tight leading-snug">
              Resultados Simce 4.° básico por asignatura utilizados en el cálculo del indicador para la Categoría de Desempeño
            </h4>
          </div>

          {/* Grilla con los dos gráficos de barra lado a lado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            
            {/* Gráfico 1: Lectura 4.° básico */}
            <div className="space-y-2 p-3 sm:p-3.5 rounded-2xl bg-slate-50/50 border border-slate-200/80">
              <div className="flex items-center gap-2 px-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#004B62] shrink-0" />
                <h5 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                  Lectura 4.° básico
                </h5>
              </div>

              <div className="h-48 sm:h-52 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={simceData} margin={{ top: 25, right: 6, left: 6, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#334155', fontSize: 11, fontWeight: 800 }} 
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
                        formatter={(val: number | string) => `${Number(val)} puntos`} 
                        style={{ 
                          fill: '#004B62', 
                          fontSize: '10.5px', 
                          fontWeight: '800' 
                        }} 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 2: Matemática 4.° básico */}
            <div className="space-y-2 p-3 sm:p-3.5 rounded-2xl bg-slate-50/50 border border-slate-200/80">
              <div className="flex items-center gap-2 px-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00738C] shrink-0" />
                <h5 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                  Matemática 4.° básico
                </h5>
              </div>

              <div className="h-48 sm:h-52 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={simceData} margin={{ top: 25, right: 6, left: 6, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#334155', fontSize: 11, fontWeight: 800 }} 
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
                        formatter={(val: number | string) => `${Number(val)} puntos`} 
                        style={{ 
                          fill: '#00738C', 
                          fontSize: '10.5px', 
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
    </section>
  );
}
