import React from 'react';

interface TitulacionDataRow {
  concepto: string;
  '2023': number;
  '2024': number;
  '2025': number;
}

const TITULACION_ROWS: TitulacionDataRow[] = [
  {
    concepto: 'Estudiantes titulados, egresados de la educación TP el año anterior',
    '2023': 27,
    '2024': 30,
    '2025': 14,
  },
  {
    concepto: 'Estudiantes con titulaciones rezagadas',
    '2023': 3,
    '2024': 2,
    '2025': 1,
  },
  {
    concepto: 'Estudiantes egresados de la educación TP el año anterior',
    '2023': 35,
    '2024': 49,
    '2025': 37,
  },
  {
    concepto: 'Estudiantes egresados de la educación TP el año anterior, que ingresaron a la educación superior',
    '2023': 3,
    '2024': 6,
    '2025': 12,
  },
];

export default function TitulacionTpTable() {
  return (
    <div className="w-full pt-1">
      {/* Tabla con formato y diseño del dashboard */}
      <div className="w-full overflow-x-auto rounded-2xl border-2 border-slate-300/90 shadow-sm bg-white">
        <table className="w-full text-left border-collapse min-w-[380px]">
          <thead>
            <tr className="bg-[#0C4581] text-white">
              <th className="py-2.5 px-3 sm:px-4 font-black text-xs sm:text-sm border-r border-white/20 w-3/5">
                <span className="sr-only">Elemento considerado</span>
              </th>
              <th className="py-2.5 px-2.5 sm:px-3 font-black text-xs sm:text-sm text-center border-r border-white/20 w-[13%]">
                2023
              </th>
              <th className="py-2.5 px-2.5 sm:px-3 font-black text-xs sm:text-sm text-center border-r border-white/20 w-[13%]">
                2024
              </th>
              <th className="py-2.5 px-2.5 sm:px-3 font-black text-xs sm:text-sm text-center w-[14%]">
                2025
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
            {TITULACION_ROWS.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-bold text-slate-800 border-r border-slate-200 leading-snug">
                  {row.concepto}
                </td>
                <td className="py-2.5 sm:py-3 px-2.5 sm:px-3 text-center font-bold text-slate-900 border-r border-slate-200">
                  {row['2023']}
                </td>
                <td className="py-2.5 sm:py-3 px-2.5 sm:px-3 text-center font-bold text-slate-900 border-r border-slate-200">
                  {row['2024']}
                </td>
                <td className="py-2.5 sm:py-3 px-2.5 sm:px-3 text-center font-bold text-slate-900">
                  {row['2025']}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
