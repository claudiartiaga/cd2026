import React from 'react';
import { Building2 } from 'lucide-react';

interface SubjectGenderData {
  subjectName: string;
  grade: string;
  hombre: { '2023': number; '2024': number; '2025': number };
  mujer: { '2023': number; '2024': number; '2025': number };
  brecha: { '2023': number; '2024': number; '2025': number };
  brechaNacional: { '2023': number; '2024': number; '2025': number };
}

const GENDER_EQUITY_DATA: Record<'lectura' | 'matematica', SubjectGenderData> = {
  lectura: {
    subjectName: 'Lectura',
    grade: '4° básico',
    hombre: { '2023': 280, '2024': 275, '2025': 260 },
    mujer: { '2023': 285, '2024': 270, '2025': 240 },
    brecha: { '2023': 5, '2024': 5, '2025': 20 },
    brechaNacional: { '2023': 4, '2024': 3, '2025': 15 },
  },
  matematica: {
    subjectName: 'Matemática',
    grade: '4° básico',
    hombre: { '2023': 275, '2024': 272, '2025': 268 },
    mujer: { '2023': 270, '2024': 268, '2025': 260 },
    brecha: { '2023': 5, '2024': 4, '2025': 8 },
    brechaNacional: { '2023': 6, '2024': 5, '2025': 7 },
  },
};

interface GenderEquityTableProps {
  gradeLabel?: string;
}

/**
 * Tabla individual para Lectura o Matemática
 * Estructura oficial:
 * - Puntaje promedio hombre
 * - Puntaje promedio mujer
 * - Brecha mujer-Hombre
 */
function SubjectTable({ 
  data, 
  gradeLabel 
}: { 
  data: SubjectGenderData;
  gradeLabel?: string;
}) {
  const displayGrade = gradeLabel || data.grade;

  return (
    <div className="w-full space-y-2">
      {/* Título por sobre la tabla */}
      <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight flex items-center gap-1.5 px-0.5">
        <span className="w-2 h-2 rounded-full bg-[#0C4581] shrink-0" />
        <span>{data.subjectName} {displayGrade}</span>
      </h4>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200/90 shadow-2xs bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-[#0C4581] text-white">
              <th className="py-2.5 px-3 font-black text-xs sm:text-sm border-r border-white/20 w-[55%] text-left whitespace-nowrap">
                Indicador
              </th>
              <th className="py-2.5 px-2 font-black text-xs sm:text-sm text-center border-r border-white/20 w-[15%] whitespace-nowrap">
                2023
              </th>
              <th className="py-2.5 px-2 font-black text-xs sm:text-sm text-center border-r border-white/20 w-[15%] whitespace-nowrap">
                2024
              </th>
              <th className="py-2.5 px-2 font-black text-xs sm:text-sm text-center w-[15%] whitespace-nowrap">
                2025
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
            {/* Puntaje promedio hombre */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-2 sm:py-2.5 px-3 font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#005A9C] shrink-0 shadow-2xs" />
                  <span className="whitespace-nowrap font-bold text-slate-800">Puntaje promedio hombre</span>
                </div>
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                {data.hombre['2023']}
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                {data.hombre['2024']}
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-bold text-slate-900 whitespace-nowrap">
                {data.hombre['2025']}
              </td>
            </tr>

            {/* Puntaje promedio mujer */}
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-2 sm:py-2.5 px-3 font-bold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626] shrink-0 shadow-2xs" />
                  <span className="whitespace-nowrap font-bold text-slate-800">Puntaje promedio mujer</span>
                </div>
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                {data.mujer['2023']}
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                {data.mujer['2024']}
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-bold text-slate-900 whitespace-nowrap">
                {data.mujer['2025']}
              </td>
            </tr>

            {/* Brecha mujer-Hombre */}
            <tr className="bg-[#FFF9E6] hover:bg-amber-100/50 transition-colors font-extrabold border-t-2 border-amber-200/80">
              <td className="py-2 sm:py-2.5 px-3 font-black text-amber-950 border-r border-slate-200 whitespace-nowrap">
                <div className="flex items-center gap-2 leading-none whitespace-nowrap">
                  <div className="w-3.5 h-3.5 rounded bg-[#0C4581] text-white flex items-center justify-center shrink-0">
                    <Building2 size={9} />
                  </div>
                  <span className="whitespace-nowrap font-black text-amber-950">
                    Brecha mujer-Hombre
                  </span>
                </div>
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-black text-slate-900 border-r border-slate-200 whitespace-nowrap">
                <span className="inline-block px-2 py-0.5 rounded bg-[#0C4581] text-white font-black text-xs shadow-2xs">
                  {data.brecha['2023']}
                </span>
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-black text-slate-900 border-r border-slate-200 whitespace-nowrap">
                <span className="inline-block px-2 py-0.5 rounded bg-[#0C4581] text-white font-black text-xs shadow-2xs">
                  {data.brecha['2024']}
                </span>
              </td>
              <td className="py-2 sm:py-2.5 px-2 text-center font-black text-slate-900 whitespace-nowrap">
                <span className="inline-block px-2 py-0.5 rounded bg-[#0C4581] text-white font-black text-xs shadow-2xs">
                  {data.brecha['2025']}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GenderEquityTable({ gradeLabel }: GenderEquityTableProps) {
  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Tabla de Lectura primero */}
      <SubjectTable data={GENDER_EQUITY_DATA.lectura} gradeLabel={gradeLabel} />

      {/* Tabla de Matemática abajo */}
      <SubjectTable data={GENDER_EQUITY_DATA.matematica} gradeLabel={gradeLabel} />
    </div>
  );
}
