import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LabelList,
  Tooltip
} from 'recharts';

export interface SimceCalculationRow {
  year: string;
  result: string | number;
  ponderacion?: string;
}

interface SimceCalculationTableProps {
  rows?: SimceCalculationRow[];
  yearlyScores?: { year: string; score: number }[];
  isPercentage?: boolean;
}

export default function SimceCalculationTable({
  rows,
  yearlyScores,
  isPercentage = true
}: SimceCalculationTableProps) {
  const chartData = useMemo(() => {
    if (yearlyScores && yearlyScores.length > 0) {
      return yearlyScores.slice(-3).map(item => ({
        year: item.year,
        score: Math.round(item.score)
      }));
    }
    if (rows && rows.length > 0) {
      return rows.map(r => ({
        year: r.year,
        score: typeof r.result === 'number' 
          ? r.result 
          : parseInt(String(r.result).replace(/\D/g, ''), 10) || 80
      }));
    }
    return [
      { year: '2023', score: 81 },
      { year: '2024', score: 83 },
      { year: '2025', score: 85 }
    ];
  }, [yearlyScores, rows]);

  return (
    <div className="w-full h-64 sm:h-72 pt-2 bg-white rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          margin={{ top: 25, right: 20, left: 10, bottom: 10 }}
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
            ticks={[0, 20, 40, 60, 80, 100]}
            unit={isPercentage ? " %" : ""}
            width={isPercentage ? 48 : 35}
          />
          <Bar 
            dataKey="score" 
            fill="#004B62" 
            radius={[6, 6, 0, 0]}
            barSize={65}
          >
            <LabelList 
              dataKey="score" 
              position="top" 
              formatter={(val: number | string) => isPercentage ? `${Math.round(Number(val))}%` : `${Math.round(Number(val))} ${Math.round(Number(val)) === 1 ? 'punto' : 'puntos'}`} 
              style={{ fill: '#004B62', fontSize: '13px', fontWeight: '800' }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
