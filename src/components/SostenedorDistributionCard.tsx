import React, { useState } from 'react';
import { 
  PieChart as PieChartIcon, 
  MapPin, 
  Users 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { EstablishmentInfo } from '../establishmentData';
import { 
  getSostenedorDistribution 
} from '../sostenedorData';
import EstablishmentTerritoryMap from './EstablishmentTerritoryMap';

interface SostenedorDistributionCardProps {
  establishment: EstablishmentInfo;
  onSelectRbd?: (rbd: string) => void;
  isActive?: boolean;
}

export default function SostenedorDistributionCard({ 
  establishment,
  onSelectRbd,
  isActive = false
}: SostenedorDistributionCardProps) {
  const distribution = getSostenedorDistribution(establishment);

  // By default, open with the current establishment's category, or 'Alto'
  const [selectedCategory, setSelectedCategory] = useState<'Alto' | 'Medio' | 'Medio-Bajo' | 'Insuficiente'>(
    establishment.category || 'Alto'
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Prepare data for Recharts Pie/Donut Chart
  const pieData = distribution.categories.map((cat, idx) => ({
    name: cat.name,
    category: cat.category,
    value: cat.count,
    percentage: cat.percentage,
    color: cat.color,
    index: idx
  }));

  // Selected category info
  const currentCategoryData = distribution.categories.find(c => c.category === selectedCategory) 
    || distribution.categories[0];
  const selectedSchools = distribution.schools.filter(s => s.category === selectedCategory);

  // Custom Label Renderer that draws percentages directly inside/on the pie slices
  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius } = props;
    const rawPct = props.percentage ?? props.payload?.percentage ?? (props.percent != null ? Math.round(props.percent * 100) : null);
    if (rawPct == null) return null;

    const RADIAN = Math.PI / 180;
    // Calculate position midway inside the donut ring
    const radius = innerRadius + (outerRadius - innerRadius) * 0.52;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ffffff"
        textAnchor="middle"
        dominantBaseline="central"
        className="select-none pointer-events-none"
        style={{
          fontSize: '14px',
          fontWeight: 900,
          textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)'
        }}
      >
        {`${Math.round(Number(rawPct))}%`}
      </text>
    );
  };

  const handleSliceClick = (entry: any) => {
    const cat = entry?.category || entry?.payload?.category;
    if (cat) {
      setSelectedCategory(cat);
    }
  };

  return (
    <div 
      id="sostenedor-distribution" 
      className={`rounded-2xl sm:rounded-3xl border-2 overflow-hidden shadow-sm bg-white scroll-mt-40 md:scroll-mt-44 lg:scroll-mt-48 transition-all duration-300 ${
        isActive 
          ? 'border-[#0a4352]/40 ring-4 ring-[#0a4352]/10 shadow-md' 
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* 1. Top Section Header Banner (Green/Teal #0a4352 background, left-aligned) */}
      <div className="bg-[#0a4352] px-4 sm:px-6 py-3 sm:py-3.5 text-white flex items-center gap-3 select-none">
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 shrink-0 shadow-inner">
          <PieChartIcon size={17} />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-white tracking-normal text-left">
          Distribución de mis establecimientos en las Categorías de Desempeño 2026
        </h2>
      </div>

      {/* 2. Main Content Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Larger Donut Chart */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Cantidad total de establecimientos del sostenedor fija afuera del gráfico */}
            <div className="w-full max-w-[340px] sm:max-w-[395px] mb-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Cantidad total de establecimientos del sostenedor:
              </span>
              <span className="text-base sm:text-lg font-black text-[#0a4352] ml-2">
                {distribution.totalEstablishments}
              </span>
            </div>

            {/* Large Donut Chart Container */}
            <div className="relative w-[340px] h-[340px] sm:w-[395px] sm:h-[395px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={88}
                    outerRadius={158}
                    paddingAngle={3}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                    onClick={handleSliceClick}
                    onMouseEnter={(entry: any) => setHoveredCategory(entry?.category || entry?.payload?.category || null)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    cursor="pointer"
                    isAnimationActive={false}
                  >
                    {pieData.map((entry) => {
                      const isSelected = selectedCategory === entry.category;
                      const isHovered = hoveredCategory === entry.category;
                      
                      return (
                        <Cell 
                          key={`cell-${entry.category}`} 
                          fill={entry.color} 
                          stroke="#ffffff"
                          strokeWidth={isSelected ? 4 : 2}
                          className="transition-all duration-300 focus:outline-none cursor-pointer"
                          style={{
                            // Elegant highlight without black borders: soft glow + brightness + subtle expansion
                            filter: isSelected 
                              ? `drop-shadow(0 6px 14px ${entry.color}70) brightness(1.1)` 
                              : (isHovered ? 'brightness(1.06)' : 'none'),
                            transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                            transformOrigin: 'center center',
                            opacity: (hoveredCategory && hoveredCategory !== entry.category && !isSelected) ? 0.82 : 1
                          }}
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Selector Buttons under Chart - Colored highlighting without black borders */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100">
              {distribution.categories.map((cat) => {
                const isSelected = selectedCategory === cat.category;
                return (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => setSelectedCategory(cat.category)}
                    className="px-2.5 py-2.5 rounded-xl text-center transition-all cursor-pointer border-2"
                    style={{
                      borderColor: isSelected ? cat.color : '#e2e8f0',
                      backgroundColor: isSelected ? `${cat.color}15` : '#f8fafc',
                      boxShadow: isSelected ? `0 0 0 2px ${cat.color}30, 0 2px 8px ${cat.color}20` : 'none'
                    }}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: cat.color }} 
                      />
                      <span 
                        className="text-xs font-bold truncate"
                        style={{ color: isSelected ? cat.color : '#475569' }}
                      >
                        {cat.name}
                      </span>
                    </div>
                    <div 
                      className="text-xs font-black"
                      style={{ color: isSelected ? cat.color : '#0f172a' }}
                    >
                      {cat.count} ({Math.round(cat.percentage)}%)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Territory Map replacing the list of establishments */}
          <EstablishmentTerritoryMap 
            establishment={establishment}
            selectedCategory={selectedCategory}
            schools={selectedSchools}
            sostenedorName={distribution.sostenedorName}
            onSelectRbd={onSelectRbd}
          />

        </div>
      </div>
    </div>
  );
}
