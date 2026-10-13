import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { 
  Sparkles, 
  Handshake, 
  Vote, 
  Apple, 
  CalendarCheck, 
  Anchor, 
  Scale, 
  Briefcase,
  BarChart3,
  ExternalLink,
  HelpCircle,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { IDPS_DATA, CATEGORY_COLORS } from '../../constants';
import CircularIndicatorScoreChart from '../CircularIndicatorScoreChart';
import CalculationTooltipCard, { getCalculationDataForIndicator } from '../CalculationTooltipCard';
import { EstablishmentInfo } from '../../establishmentData';
import GenderEquityTable from '../GenderEquityTable';
import TitulacionTpTable from '../TitulacionTpTable';
import PuntajeSimceBesidePermanenciaCard from '../PuntajeSimceBesidePermanenciaCard';

const icons = [Sparkles, Handshake, Vote, Apple, CalendarCheck, Scale, Anchor, Briefcase];

const isGenderEquityIndicator = (name: string): boolean => {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return n.includes('equidad');
};

const isOnlyIndicator = (name: string): boolean => {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (
    n.includes('autoestima') ||
    n.includes('clima') ||
    n.includes('participacion') ||
    n.includes('habito') ||
    n.includes('permanencia')
  );
};

const isOnlyDimension = (name: string): boolean => {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (
    n.includes('asistencia') ||
    n.includes('retencion') ||
    n.includes('titulacion') ||
    n.includes('tecnico profesional')
  );
};

const isPercentageMetric = (name: string): boolean => {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (
    n.includes('asistencia') ||
    n.includes('permanencia') ||
    n.includes('titulacion') ||
    n.includes('tecnico profesional') ||
    n.includes('practica') ||
    n.includes('insercion')
  );
};

const getAsistenciaDefinition = (name: string): string => {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (n.includes('destacada')) return 'Mayor o igual a 97%';
  if (n.includes('normal')) return 'Mayor a 90% y menor a 97%';
  if (n.includes('reiterada')) return 'Mayor a 85% y menor o igual a 90%';
  if (n.includes('grave')) return 'Menor o igual a 85%';
  return '';
};

const splitCategoryName = (fullName: string) => {
  const parts = fullName.trim().split(' ');
  if (parts.length >= 2) {
    return { line1: parts[0], line2: parts.slice(1).join(' ') };
  }
  return { line1: fullName, line2: '' };
};

interface LegendTooltipItemProps {
  name: string;
  color: string;
  definition: string;
  index: number;
  key?: React.Key;
}

function LegendTooltipItem({ name, color, definition, index }: LegendTooltipItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { line1, line2 } = splitCategoryName(name);

  // Posicionamiento inteligente para evitar cortes en bordes
  const getTooltipPositionClasses = () => {
    if (index === 0) return 'left-0 sm:left-1/2 sm:-translate-x-1/2';
    if (index === 3) return 'right-0 left-auto sm:left-1/2 sm:-translate-x-1/2 sm:right-auto';
    return 'left-1/2 -translate-x-1/2';
  };

  const getArrowPositionClasses = () => {
    if (index === 0) return 'left-5 sm:left-1/2 sm:-translate-x-1/2';
    if (index === 3) return 'right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2';
    return 'left-1/2 -translate-x-1/2';
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-1 sm:px-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/90 hover:border-slate-300 transition-all text-left group cursor-pointer shadow-2xs"
        aria-label={`Ver criterio de ${name}`}
      >
        {/* Color al lado del nombre */}
        <span 
          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs ring-1 ring-black/5" 
          style={{ backgroundColor: color }} 
        />
        {/* Nombre de la categoría en dos líneas */}
        <div className="leading-[1.12] text-[10px] sm:text-[11px] font-bold text-slate-800">
          <div>{line1}</div>
          <div className="text-slate-600 group-hover:text-slate-900 transition-colors">{line2}</div>
        </div>
      </button>

      {/* Tooltip sobre el nombre de la categoría con fondo en tonalidad clara */}
      {isOpen && (
        <div 
          role="tooltip"
          className={`absolute bottom-full mb-2.5 z-50 w-44 sm:w-48 p-2.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl text-center pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${getTooltipPositionClasses()}`}
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span>{name}</span>
          </div>
          <div className="text-[11px] font-black text-[#004B62] mt-1 bg-sky-50 py-1 px-2 rounded-lg border border-sky-100">
            {definition}
          </div>
          {/* Flecha inferior en tonalidad clara */}
          <div className={`absolute -bottom-1 w-2 h-2 bg-white border-b border-r border-slate-200 rotate-45 ${getArrowPositionClasses()}`} />
        </div>
      )}
    </div>
  );
}

interface IndicatorDetailCardProps {
  indicator: typeof IDPS_DATA[0];
  icon: React.ElementType;
  gradeLabel?: string;
  activeLevel?: string;
}

function IndicatorDetailCard({ 
  indicator, 
  icon: IconComponent, 
  gradeLabel = '4° básico',
  activeLevel = 'basica'
}: IndicatorDetailCardProps) {
  const [activeTab, setActiveTab] = useState<'indicador' | 'dimension'>('indicador');

  const isGenderEquity = isGenderEquityIndicator(indicator.name);
  const onlyIndicator = isOnlyIndicator(indicator.name);
  const onlyDimension = isOnlyDimension(indicator.name);
  const isPercentage = isPercentageMetric(indicator.name);
  const isParticipacion = indicator.name.toLowerCase().includes('participaci');
  const isHabitos = indicator.name.toLowerCase().includes('vida saludable') || indicator.name.toLowerCase().includes('habito');
  const isAutoestima = 
    indicator.name.toLowerCase().includes('autoestima') ||
    indicator.name.toLowerCase().includes('convivencia') ||
    isParticipacion ||
    isHabitos;

  const currentYearData = indicator.yearlyScores && indicator.yearlyScores.length > 0
    ? indicator.yearlyScores[indicator.yearlyScores.length - 1]
    : null;

  const previousYearData = indicator.yearlyScores && indicator.yearlyScores.length >= 2
    ? indicator.yearlyScores[indicator.yearlyScores.length - 2]
    : null;

  const currentScore = Math.round(currentYearData?.score ?? indicator.establishment);
  const currentYear = currentYearData?.year ?? '2025';
  const prevScore = previousYearData?.score !== undefined ? Math.round(previousYearData.score) : undefined;
  const prevYear = previousYearData?.year ?? '2024';
  const scoreDiff = prevScore !== undefined ? currentScore - prevScore : null;
  const formattedScoreDiff = scoreDiff !== null
    ? Math.abs(scoreDiff).toString()
    : '';
  const isPermanencia = indicator.name.toLowerCase().includes('permanencia');
  const isAsistencia = indicator.name.toLowerCase().includes('asistencia');
  const isTitulacion = indicator.name.toLowerCase().includes('titula') || indicator.name.toLowerCase().includes('tecnico profesional');
  const shouldOmitSimceInTitle = isAsistencia || isPermanencia || isTitulacion;

  const getIndicatorIntro = () => {
    if (isAsistencia) {
      return "Para obtener este indicador, se calcula la tasa de asistencia anual por estudiante, que corresponde a la razón entre el número de días que asiste cada estudiante que rinde la prueba Simce y la cantidad de días totales del año escolar.";
    }
    if (isPermanencia) {
      return "El puntaje de este indicador se estima en forma anual y por separado para cada ciclo del establecimiento, y se construye identificando los desertores, luego se atribuyen a los establecimientos, se calcula la tasa de retención para el ciclo y finalmente, se asocia un puntaje a la tasa de retención.";
    }
    if (isGenderEquity) {
      return "Para obtener este indicador, se evalúa la brecha de puntajes Simce entre hombres y mujeres en Lectura y Matemática para colegios mixtos, calculando anualmente por grado la diferencia respecto a los promedios nacionales.";
    }
    if (isTitulacion) {
      return "Para obtener este indicador, se evalúa la proporción de estudiantes que, habiendo egresado de Educación Media Técnico-Profesional, obtienen oportunamente su título de técnico de nivel medio dentro de los plazos reglamentarios establecidos por el Mineduc.";
    }
    return null;
  };

  const indicatorIntro = getIndicatorIntro();

  // En asistencia escolar el gráfico de puntaje del indicador se expresa en escala de puntos
  const isIndicatorScorePercentage = isPercentage && !isAsistencia;

  const scoreDiffUnit = isIndicatorScorePercentage 
    ? '%' 
    : (Math.abs(scoreDiff ?? 0) === 1 ? 'punto' : 'puntos');
  const levelTitle = activeLevel === 'media' ? 'Educación media' : 'Educación básica';

  const getDimensionTitle = () => {
    if (isPermanencia) return 'Tasa de permanencia escolar';
    if (isAsistencia) return 'Distribución de estudiantes de 4° básico por categoría de asistencia';
    if (isTitulacion) return 'Tasa titulación';
    return 'Resultados por Dimensión';
  };

  const currentTab: 'indicador' | 'dimension' = onlyDimension
    ? 'dimension'
    : onlyIndicator
    ? 'indicador'
    : activeTab;

  const showTabSwitcher =
    !isGenderEquity &&
    !onlyIndicator &&
    !onlyDimension &&
    Boolean(indicator.dimensionsYearly && indicator.dimensionsYearly.length > 0);

  const dimColors = [
    '#004B62', // Dark Teal
    '#00738C', // Medium Teal
    '#F04C28', // Orange Accent
    '#059669', // Emerald
  ];

  // Format dimension chart data for Recharts (grouped by year: 2023, 2024, 2025)
  const dimensionChartData = ['2023', '2024', '2025'].map(year => {
    const row: Record<string, string | number> = { year };
    indicator.dimensionsYearly?.forEach(dim => {
      const found = dim.scores.find(s => s.year === year);
      if (found) {
        row[dim.name] = found.score;
      }
    });
    return row;
  });

  // Data for pie chart (used in dimension view, e.g. for Asistencia escolar or dimensions)
  const pieData = (indicator.dimensions && indicator.dimensions.length > 0)
    ? indicator.dimensions.map((dim, idx) => ({
        name: dim.name,
        value: dim.score,
        color: dimColors[idx % dimColors.length],
      }))
    : (indicator.dimensionsYearly && indicator.dimensionsYearly.length > 0)
    ? indicator.dimensionsYearly.map((dim, idx) => {
        const latest = dim.scores && dim.scores.length > 0 ? dim.scores[dim.scores.length - 1].score : 0;
        return {
          name: dim.name,
          value: latest,
          color: dimColors[idx % dimColors.length],
        };
      })
    : [];

  const getYearlyPieData = (year: string) => {
    if (!indicator.dimensionsYearly) return [];
    return indicator.dimensionsYearly.map((dim, idx) => {
      const found = dim.scores.find(s => s.year === year);
      return {
        name: dim.name,
        value: found ? found.score : 0,
        color: dimColors[idx % dimColors.length],
      };
    });
  };

  const renderCustomizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
    if (!value || value === 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-black text-[11px] sm:text-xs drop-shadow-sm select-none pointer-events-none"
      >
        {`${Math.round(Number(value))}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-6">
      
      {/* ENCABEZADO DEL INDICADOR (TÍTULO E ÍCONO) */}
      <div className="flex items-start gap-3 pb-1 px-1">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0C4581] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <IconComponent size={18} />
        </div>
        <div className="flex-1">
          <h3 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
            {indicator.name}
          </h3>
          {indicatorIntro && (
            <p className="mt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed min-h-[52px] sm:min-h-[58px]">
              {indicatorIntro}
            </p>
          )}
        </div>
      </div>

      {/* CAJA ÚNICA PARA AMBOS GRÁFICOS DEL INDICADOR */}
      <div className="w-full flex-1 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
        
        {/* GRÁFICO 1: PUNTAJE DEL INDICADOR PARA EDUCACIÓN BÁSICA / MEDIA */}
        <div className="space-y-5">
          
          {/* Encabezado de la tarjeta */}
          <div className="pb-3 border-b border-slate-100">
            <h4 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
              {activeLevel === 'media'
                ? 'Puntaje del Indicador utilizado para el cálculo de la Categoría de Desempeño de Media 2026'
                : 'Puntaje del Indicador utilizado para el cálculo de la Categoría de Desempeño de Básica 2026'}
            </h4>
          </div>

          {/* Gráfica interanual circular */}
          <div className="flex flex-col items-center justify-center pt-2">
            <CircularIndicatorScoreChart
              currentYear="2026"
              currentScore={currentScore}
              prevYear="2020"
              prevScore={prevScore}
              isPercentage={isIndicatorScorePercentage}
              unit={isIndicatorScorePercentage ? '%' : (currentScore === 1 ? 'punto' : 'puntos')}
            />
          </div>

          {/* Reemplazo de la caja por el tooltip interactivo */}
          <CalculationTooltipCard {...getCalculationDataForIndicator(indicator.name)} />

        </div>

        {/* SEPARADOR ENTRE AMBOS GRÁFICOS DENTRO DE LA MISMA CAJA */}
        <div className="border-t border-slate-200/80" />

        {/* GRÁFICO 2: RESULTADOS SIMCE UTILIZADOS EN EL CÁLCULO DEL INDICADOR */}
        <div className="space-y-6 pt-1">
          
          {/* Header con Pestañas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h4 className="text-[15px] sm:text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
                {isTitulacion
                  ? 'Elementos considerados en el cálculo del Indicador Titulación técnico-profesional'
                  : isAsistencia
                    ? `Porcentaje de estudiantes ${gradeLabel} en cada categoría de asistencia`
                    : isPermanencia
                      ? 'Tasa de permanencia anual utilizadas en el cálculo de la Categoría de Desempeño'
                      : shouldOmitSimceInTitle
                        ? `Resultados ${gradeLabel} utilizados en el cálculo del indicador`
                        : `Resultados Simce ${gradeLabel} utilizados en el cálculo del indicador`}
              </h4>
            </div>

            {/* Selector de Pestañas (disponible sólo si tiene ambas opciones) */}
            {showTabSwitcher && (
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('indicador')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    currentTab === 'indicador'
                      ? 'bg-[#F04C28] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <BarChart3 size={16} />
                  <span>Indicador</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('dimension')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    currentTab === 'dimension'
                      ? 'bg-[#F04C28] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <BarChart3 size={16} />
                  <span>Dimensión</span>
                </button>
              </div>
            )}
          </div>

          {isGenderEquity ? (
            <div className="w-full pt-1">
              <GenderEquityTable gradeLabel={gradeLabel} />
            </div>
          ) : isTitulacion ? (
            <TitulacionTpTable />
          ) : (
            <>
              {/* Leyenda de dimensiones (visible sin scroll) solo si no es Asistencia (Asistencia la tiene abajo con tooltips) */}
              {currentTab === 'dimension' && !isPermanencia && !isTitulacion && !isAsistencia && (
                <div className="w-full bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-200/70 mb-1">
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-bold">
                    {pieData.map((item) => (
                      <div key={item.name} className="flex items-center gap-1.5 shrink-0">
                        <div 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="text-slate-800 text-[11px] sm:text-xs font-bold">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gráfico */}
              {currentTab === 'dimension' && isAsistencia ? (
                // Asistencia escolar: Altura calibrada para alinear con el gráfico contiguo
                <div className="w-full pt-0.5">
                  <div className="h-[212px] sm:h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={dimensionChartData} 
                        margin={{ top: 10, right: 15, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#0f172a', fontSize: 13, fontWeight: 800 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} 
                          domain={[0, 100]}
                          ticks={[0, 25, 50, 75, 100]}
                          unit="%"
                          width={45}
                        />
                        {indicator.dimensionsYearly?.map((dim, idx) => {
                          const isTop = idx === (indicator.dimensionsYearly!.length - 1);
                          return (
                            <Bar 
                              key={dim.name}
                              dataKey={dim.name} 
                              name={dim.name} 
                              stackId="asistenciaStack"
                              fill={dimColors[idx % dimColors.length]} 
                              radius={isTop ? [6, 6, 0, 0] : [0, 0, 0, 0]} 
                              barSize={50}
                            >
                              <LabelList 
                                dataKey={dim.name} 
                                position="center" 
                                formatter={(val: number | string) => Number(val) > 4 ? `${Math.round(Number(val))}%` : ''} 
                                style={{ fill: '#ffffff', fontSize: '11px', fontWeight: '800' }} 
                              />
                            </Bar>
                          );
                        })}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Categorías de asistencia escolar con tooltips en una sola línea sin scroll */}
                  <div className="w-full pt-2.5 pb-0.5 border-t border-slate-100 mt-2">
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full">
                      {pieData.map((item, idx) => {
                        const def = getAsistenciaDefinition(item.name);
                        return (
                          <LegendTooltipItem 
                            key={item.name} 
                            name={item.name} 
                            color={item.color} 
                            definition={def} 
                            index={idx}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[250px] sm:h-[258px] w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    {currentTab === 'indicador' ? (
                      <BarChart data={indicator.yearlyScores || []} margin={{ top: 15, right: 15, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#334155', fontSize: 13, fontWeight: 800 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} 
                          domain={[0, 100]}
                          ticks={[0, 20, 40, 60, 80, 100]}
                          unit={isPercentage ? " %" : ""}
                          width={isPercentage ? 75 : 35}
                        />
                        <Bar 
                          dataKey="score" 
                          name={isPercentage ? "Porcentaje Indicador" : "Puntaje Indicador"} 
                          fill="#004B62" 
                          radius={[8, 8, 0, 0]} 
                        >
                          <LabelList 
                            dataKey="score" 
                            position="top" 
                            formatter={(val: number | string) => isPercentage ? `${Math.round(Number(val))}%` : `${Math.round(Number(val))} ${Math.round(Number(val)) === 1 ? 'punto' : 'puntos'}`} 
                            style={{ fill: '#004B62', fontSize: '13px', fontWeight: '800' }} 
                          />
                        </Bar>
                      </BarChart>
                    ) : (
                      // Permanencia escolar y otros indicadores en vista dimensión
                      <BarChart data={dimensionChartData} margin={{ top: 15, right: 15, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="year" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#334155', fontSize: 14, fontWeight: 800 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                          domain={[0, 100]}
                          ticks={[0, 20, 40, 60, 80, 100]}
                          unit={isPercentage ? " %" : ""}
                          width={isPercentage ? 75 : 35}
                        />
                        {indicator.dimensionsYearly?.map((dim, idx) => {
                          const dimIsPercentage = isPercentageMetric(dim.name) || isPercentage;
                          return (
                            <Bar 
                              key={dim.name}
                              dataKey={dim.name} 
                              name={dim.name} 
                              fill={dimColors[idx % dimColors.length]} 
                              radius={[8, 8, 0, 0]} 
                            >
                              <LabelList 
                                dataKey={dim.name} 
                                position="top" 
                                formatter={(val: number | string) => dimIsPercentage ? `${Math.round(Number(val))}%` : `${Math.round(Number(val))} ${Math.round(Number(val)) === 1 ? 'punto' : 'puntos'}`} 
                                style={{ fill: dimColors[idx % dimColors.length], fontSize: '13px', fontWeight: '800' }} 
                              />
                            </Bar>
                          );
                        })}
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}

interface IdpsSectionProps {
  establishment?: EstablishmentInfo;
  activeLevel?: string;
}

export default function IdpsSection({ establishment, activeLevel = 'basica' }: IdpsSectionProps) {
  const allIndicators = establishment?.idpsData || IDPS_DATA;
  const gradeLabel = activeLevel === 'media' ? 'II medio' : '4° básico';

  // La titulación técnico profesional solo se debe mostrar para educación media y no para educación básica
  const indicators = allIndicators.filter(item => {
    const isTitulacion = item.name.toLowerCase().includes('titula') || item.name.toLowerCase().includes('tecnico profesional');
    if (isTitulacion && activeLevel !== 'media') {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Texto introductorio IDPS */}
      <div className="px-1">
        <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">
          Puntaje promedio obtenido en Autoestima Académica y motivación escolar, Clima de convivencia escolar, Participación y formación ciudadana y Hábitos de vida saludable, de acuerdo a las respuestas de estudiantes, apoderados, directores y docentes de los distintos cuestionarios aplicados en las evaluaciones Simce{' '}
          <a 
            href="https://ace2.agenciaeducacion.cl/cat_des_01/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#00738C] hover:text-[#004B62] font-bold underline underline-offset-2 transition-colors inline-block"
          >
            (detalles aquí)
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
        {indicators.map((item, i) => {
          const originalIndex = IDPS_DATA.findIndex(d => d.name === item.name);
          const iconComponent = originalIndex >= 0 ? (icons[originalIndex] || Sparkles) : (icons[i] || Sparkles);

          return (
            <section 
              key={item.name || i} 
              className="w-full flex flex-col h-full"
            >
              <IndicatorDetailCard 
                indicator={item} 
                icon={iconComponent} 
                gradeLabel={gradeLabel} 
                activeLevel={activeLevel} 
              />
            </section>
          );
        })}

        {/* Solo en educación básica: contenido de Puntaje Simce al lado de Permanencia escolar */}
        {activeLevel === 'basica' && (
          <PuntajeSimceBesidePermanenciaCard 
            establishment={establishment}
            gradeLabel={gradeLabel}
          />
        )}
      </div>
    </div>
  );
}
