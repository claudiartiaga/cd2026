import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function RegionalSection() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">Buscador de Resultados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Región</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                <option>Región de La Araucanía</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={18} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Servicio Local</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                <option>SLEP COSTA ARAUCANÍA</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={18} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Comuna</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                <option>CARAHUE</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={18} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black hover:bg-slate-900 transition-colors">
            <X size={18} />
            Limpiar filtros
          </button>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <h3 className="text-2xl font-black text-slate-800 mb-6 tracking-tight">Resumen estadístico</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th rowSpan={2} className="p-4 text-left font-black border border-slate-700">Resumen estadístico</th>
                <th colSpan={5} className="p-4 text-center font-black border border-slate-700 bg-teal-700">Establecimientos con Categoría de Desempeño</th>
                <th colSpan={3} className="p-4 text-center font-black border border-slate-700 bg-slate-700">Establecimientos sin Categoría de Desempeño</th>
              </tr>
              <tr className="bg-slate-700 text-white">
                <th className="p-3 text-center font-bold border border-slate-600">Alto</th>
                <th className="p-3 text-center font-bold border border-slate-600">Medio</th>
                <th className="p-3 text-center font-bold border border-slate-600">Medio-Bajo</th>
                <th className="p-3 text-center font-bold border border-slate-600">Insuficiente</th>
                <th className="p-3 text-center font-bold border border-slate-600 bg-teal-800">Total clasificado</th>
                <th className="p-3 text-center font-bold border border-slate-600">Baja matrícula</th>
                <th className="p-3 text-center font-bold border border-slate-600">Falta info</th>
                <th className="p-3 text-center font-bold border border-slate-600 bg-slate-800">Total sin clasif.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: 'Total de establecimientos', values: [0, 1, 2, 0, 3, 0, 0, 0] },
                { label: 'Porcentaje por categoría', values: ['0.0%', '33.3%', '66.7%', '0.0%', '100.0%', '0.0%', '0.0%', '0.0%'] },
                { label: 'Total matrícula', values: [0, 702, 359, 0, 1061, 0, 0, 0] },
                { label: 'Porcentaje matrícula por categoría', values: ['0.0%', '66.2%', '33.8%', '0.0%', '100.0%', '0.0%', '0.0%', '0.0%'] },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-800 border border-slate-100">{row.label}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className={`p-4 text-center border border-slate-100 font-semibold ${j === 4 ? 'bg-teal-50 font-black text-teal-800' : j === 7 ? 'bg-slate-50 font-black text-slate-800' : 'text-slate-700'}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-xs sm:text-sm text-slate-500 italic">(1) Los establecimientos de baja matrícula no son clasificados debido a su número de estudiantes.</p>
          <p className="text-xs sm:text-sm text-slate-500 italic">(2) Los establecimientos con falta de información son aquellos que no rindieron varias de las evaluaciones consideradas.</p>
        </div>
      </div>
    </div>
  );
}
