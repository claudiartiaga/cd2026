import React, { useState } from 'react';
import { Filter, Search, X, MapPin, Building2, Download, BarChart3, ChevronRight } from 'lucide-react';
import { CATEGORY_COLORS } from '../../constants';

const MOCK_ESTABLISHMENTS = [
  { rbd: '360', name: 'Escuela Agencia de calidad', commune: 'Carahue', category: 'Bajo', simce: 150 },
  { rbd: '1234', name: 'Liceo Bicentenario de Excelencia', commune: 'Carahue', category: 'Alto', simce: 285 },
  { rbd: '5678', name: 'Escuela Rural Los Pinos', commune: 'Carahue', category: 'Medio', simce: 242 },
  { rbd: '9012', name: 'Colegio San Francisco', commune: 'Nueva Imperial', category: 'Medio-Bajo', simce: 215 },
  { rbd: '3456', name: 'Instituto Tecnológico Regional', commune: 'Saavedra', category: 'Bajo', simce: 198 },
  { rbd: '7890', name: 'Escuela de Lenguaje Arcoíris', commune: 'Cholchol', category: 'Medio', simce: 235 },
];

export default function SacAuthoritiesSection() {
  const [filters, setFilters] = useState({
    region: 'Región de La Araucanía',
    province: 'Cautín',
    commune: 'Carahue',
    rbd: ''
  });

  const [searchResults, setSearchResults] = useState<typeof MOCK_ESTABLISHMENTS | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const regions = ['Región de La Araucanía', 'Región de Los Ríos', 'Región de Los Lagos'];
  const provinces = ['Cautín', 'Malleco'];
  const communes = ['Carahue', 'Nueva Imperial', 'Saavedra', 'Cholchol'];

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const filtered = MOCK_ESTABLISHMENTS.filter(est => {
        const matchesRbd = filters.rbd === '' || est.rbd.includes(filters.rbd);
        const matchesCommune = filters.commune === '' || est.commune === filters.commune;
        return matchesRbd && matchesCommune;
      });
      setSearchResults(filtered);
      setIsSearching(false);
    }, 600);
  };

  const handleClear = () => {
    setFilters({region: 'Región de La Araucanía', province: 'Cautín', commune: 'Carahue', rbd: ''});
    setSearchResults(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Panel Autoridades SAC</h3>
            <p className="text-sm sm:text-base text-slate-600 font-medium">Filtre y analice los resultados a nivel territorial.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black hover:bg-slate-900 transition-colors">
              <Download size={18} />
              Exportar Datos
            </button>
            <button className="flex items-center gap-2 bg-[#F04C28] text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black hover:bg-[#D83E1C] transition-colors shadow-lg shadow-[#F04C28]/20">
              <BarChart3 size={18} />
              Ver Comparativa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Región</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04C28]/20"
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
              >
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Provincia</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04C28]/20"
                value={filters.province}
                onChange={(e) => setFilters({...filters, province: e.target.value})}
              >
                {provinces.map(p => <option key={p}>{p}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Comuna</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04C28]/20"
                value={filters.commune}
                onChange={(e) => setFilters({...filters, commune: e.target.value})}
              >
                {communes.map(c => <option key={c}>{c}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Filter size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">RBD</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Ej: 1234"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm sm:text-base font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#F04C28]/20"
                value={filters.rbd}
                onChange={(e) => setFilters({...filters, rbd: e.target.value})}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <Building2 size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 text-slate-500 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black hover:text-slate-800 transition-colors"
          >
            <X size={18} />
            Limpiar filtros
          </button>
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="flex items-center gap-2 bg-[#F04C28] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black hover:bg-[#D83E1C] transition-all shadow-lg shadow-[#F04C28]/20 disabled:opacity-50"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search size={18} />
            )}
            {isSearching ? 'Buscando...' : 'Aplicar Filtros'}
          </button>
        </div>
      </div>

      {searchResults && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-wider">Resultados de Búsqueda ({searchResults.length})</h4>
            <span className="text-xs sm:text-sm font-bold text-slate-500">Mostrando establecimientos según filtros aplicados</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">RBD</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Establecimiento</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Comuna</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">SIMCE Prom.</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map((est) => (
                    <tr key={est.rbd} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 text-sm font-mono font-bold text-slate-600">{est.rbd}</td>
                      <td className="px-6 py-4 text-sm sm:text-base font-bold text-slate-800">{est.name}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{est.commune}</td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider text-white shadow-2xs"
                          style={{
                            backgroundColor: 
                              est.category === 'Alto' ? CATEGORY_COLORS.alto :
                              est.category === 'Medio' ? CATEGORY_COLORS.medio :
                              est.category === 'Medio-Bajo' ? CATEGORY_COLORS.medioBajo :
                              CATEGORY_COLORS.insuficiente
                          }}
                        >
                          {est.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-base font-black text-slate-800">{est.simce}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 group-hover:text-[#F04C28] transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic text-base">
                      No se encontraron establecimientos con los criterios seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-6">Resumen de Categorías</h3>
          <div className="space-y-6">
            {[
              { label: 'Alto', value: 15, hex: CATEGORY_COLORS.alto, percent: '25%' },
              { label: 'Medio', value: 30, hex: CATEGORY_COLORS.medio, percent: '50%' },
              { label: 'Medio-Bajo', value: 10, hex: CATEGORY_COLORS.medioBajo, percent: '17%' },
              { label: 'Insuficiente', value: 5, hex: CATEGORY_COLORS.insuficiente, percent: '8%' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base font-bold">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="text-slate-900">{item.value} establecimientos ({item.percent})</span>
                </div>
                <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: item.percent, backgroundColor: item.hex }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl text-white">
          <h3 className="text-xl sm:text-2xl font-black mb-6">Resumen Territorial</h3>
          <div className="space-y-8">
            <div>
              <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Total Matrícula</div>
              <div className="text-4xl sm:text-5xl font-black text-[#F04C28]">12.450</div>
              <div className="text-sm text-white/70 mt-1">Estudiantes en la zona filtrada</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Establecimientos</div>
                <div className="text-2xl font-black">60</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Promedio SIMCE</div>
                <div className="text-2xl font-black">254</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
