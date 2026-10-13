import React from 'react';
import { 
  BookOpen, 
  Calculator, 
  ExternalLink,
  HelpCircle
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
  LEARNING_LEVELS_LECTURA, 
  LEARNING_LEVELS_MATEMATICA, 
  CATEGORY_COLORS 
} from '../../constants';
import { EstablishmentInfo } from '../../establishmentData';

interface LearningSectionProps {
  establishment?: EstablishmentInfo;
  activeLevel?: string;
}

export default function LearningSection({ establishment, activeLevel = 'basica' }: LearningSectionProps) {
  const rawLectura = establishment?.learningLectura || LEARNING_LEVELS_LECTURA;
  const rawMatematica = establishment?.learningMatematica || LEARNING_LEVELS_MATEMATICA;

  const dataLectura = rawLectura.filter(d => ['2023', '2024', '2025'].includes(d.year));
  const dataMatematica = rawMatematica.filter(d => ['2023', '2024', '2025'].includes(d.year));

  const scoreNum = establishment ? Math.round(establishment.overallScore / 5) : 54;
  const scoreValue = scoreNum.toString();
  const prevScoreNum = Math.max(0, Math.round(scoreNum - 2));
  const prevScoreValue = prevScoreNum.toString();
  const scoreDiff = scoreNum - prevScoreNum;
  const formattedScoreDiff = Math.abs(scoreDiff).toString();
  const scoreDiffUnit = Math.abs(scoreDiff) === 1 ? 'punto' : 'puntos';

  const simceTitle = activeLevel === 'media'
    ? 'Resultados Simce II medio utilizados en el cálculo del indicador'
    : 'Resultados Simce 4° básico utilizados en el cálculo del indicador';

  return (
    <div className="space-y-6">
      
      {/* ENCABEZADO DEL INDICADOR (SIN ENCUADRE, SOBRE EL FONDO DEL DASHBOARD) */}
      <div className="pb-1 px-1">
        <h3 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
          Resultado de los Estándares de Aprendizaje utilizados en el cálculo del indicador para la Categoría de Desempeño
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          Puntaje promedio obtenido según los estándares de aprendizaje alcanzados en las evaluaciones Simce 2023, 2024 y 2025 en Lectura y Matemática.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        
        {/* TARJETA IZQUIERDA: PUNTAJE DEL INDICADOR CIRCULAR */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
          {/* Gráfico circular interanual */}
          <div className="flex flex-col items-center justify-center py-2">
            <CircularIndicatorScoreChart
              currentYear="2026"
              currentScore={scoreNum}
              currentScoreFormatted={scoreValue}
              prevYear="2020"
              prevScore={prevScoreNum}
              prevScoreFormatted={prevScoreValue}
              unit="puntos"
            />
          </div>

          {/* Reemplazo de la caja por el tooltip interactivo */}
          <CalculationTooltipCard {...CALCULATION_DATA.estandares} />
        </div>

      {/* TARJETA DERECHA: RESULTADOS SIMCE MÁS PEQUEÑOS AL LADO */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
        
        {/* Encabezado del cuadro con título */}
        <div className="pb-3 border-b border-slate-100">
          <h4 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
            {simceTitle}
          </h4>
        </div>

        {/* Dos bloques internos en una sola línea: primero Lectura y luego Matemática */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch pt-1">
          
          {/* Bloque: Lectura */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-[#004B62] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen size={15} />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                Lectura
              </h4>
            </div>

            {/* Gráfico de Barras Apiladas Lectura */}
            <div className="h-48 sm:h-52 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataLectura} margin={{ top: 20, right: 10, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#334155', fontSize: 12, fontWeight: 800 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    unit="%"
                    width={38}
                  />
                  <Bar 
                    dataKey="insuficiente" 
                    name="Nivel insuficiente" 
                    stackId="a" 
                    fill="#003D52" 
                  >
                    <LabelList 
                      dataKey="insuficiente" 
                      position="center" 
                      formatter={(val: number | string) => `${Math.round(Number(val))}%`} 
                      style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                    />
                  </Bar>
                  <Bar 
                    dataKey="elemental" 
                    name="Nivel elemental" 
                    stackId="a" 
                    fill="#E04828" 
                  >
                    <LabelList 
                      dataKey="elemental" 
                      position="center" 
                      formatter={(val: number | string) => `${Math.round(Number(val))}%`} 
                      style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                    />
                  </Bar>
                  <Bar 
                    dataKey="adecuado" 
                    name="Nivel adecuado" 
                    stackId="a" 
                    fill="#0A7B94" 
                    radius={[4, 4, 0, 0]} 
                  >
                    <LabelList 
                      dataKey="adecuado" 
                      position="center" 
                      formatter={(val: number | string) => `${Math.round(Number(val))}%`} 
                      style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bloque: Matemática */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-[#004B62] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Calculator size={15} />
              </div>
              <h4 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                Matemática
              </h4>
            </div>

            {/* Gráfico de Barras Apiladas Matemática */}
            <div className="h-48 sm:h-52 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataMatematica} margin={{ top: 20, right: 10, left: -15, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#334155', fontSize: 12, fontWeight: 800 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    unit="%"
                    width={38}
                  />
                  <Bar 
                    dataKey="insuficiente" 
                    name="Nivel insuficiente" 
                    stackId="a" 
                    fill="#003D52" 
                  >
                    <LabelList 
                      dataKey="insuficiente" 
                      position="center" 
                      formatter={(val: number | string) => `${Math.round(Number(val))}%`} 
                      style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                    />
                  </Bar>
                  <Bar 
                    dataKey="elemental" 
                    name="Nivel elemental" 
                    stackId="a" 
                    fill="#E04828" 
                  >
                    <LabelList 
                      dataKey="elemental" 
                      position="center" 
                      formatter={(val: number | string) => `${Math.round(Number(val))}%`} 
                      style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                    />
                  </Bar>
                  <Bar 
                    dataKey="adecuado" 
                    name="Nivel adecuado" 
                    stackId="a" 
                    fill="#0A7B94" 
                    radius={[4, 4, 0, 0]} 
                  >
                    <LabelList 
                      dataKey="adecuado" 
                      position="center" 
                      formatter={(val: number | string) => `${Math.round(Number(val))}%`} 
                      style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Leyenda de Niveles de Aprendizaje (abajo del gráfico, sin encuadre, sobre fondo blanco) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 pt-2 border-t border-slate-100 text-xs sm:text-sm">
          <span className="font-black text-[#004B62] uppercase tracking-wider text-xs sm:text-sm">
            Niveles:
          </span>
          <div className="flex items-center gap-1.5 font-bold">
            <div className="w-3.5 h-3.5 rounded-xs shrink-0" style={{ backgroundColor: '#003D52' }} />
            <span className="text-slate-800">Insuficiente</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <div className="w-3.5 h-3.5 rounded-xs shrink-0" style={{ backgroundColor: '#E04828' }} />
            <span className="text-slate-800">Elemental</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <div className="w-3.5 h-3.5 rounded-xs shrink-0" style={{ backgroundColor: '#0A7B94' }} />
            <span className="text-slate-800">Adecuado</span>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
