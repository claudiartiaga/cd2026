import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight,
  Building2
} from 'lucide-react';

interface RbdSearchCardProps {
  selectedRbd: string;
  onSelectRbd: (rbd: string) => void;
  isActive?: boolean;
}

export default function RbdSearchCard({
  selectedRbd,
  onSelectRbd,
  isActive = false
}: RbdSearchCardProps) {
  const [searchTerm, setSearchTerm] = useState(selectedRbd);

  useEffect(() => {
    if (selectedRbd && selectedRbd !== searchTerm) {
      setSearchTerm(selectedRbd);
    }
  }, [selectedRbd]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchTerm.trim();
    if (!clean) return;
    onSelectRbd(clean);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    const clean = val.trim();
    if (clean) {
      onSelectRbd(clean);
    }
  };

  return (
    <div 
      id="search-rbd" 
      className={`rounded-2xl sm:rounded-3xl border-2 overflow-hidden shadow-sm bg-white scroll-mt-40 md:scroll-mt-44 lg:scroll-mt-48 transition-all duration-300 ${
        isActive 
          ? 'border-[#0a4352]/40 ring-4 ring-[#0a4352]/10 shadow-md' 
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* 1. Top Section Header Banner (Teal #0a4352 background, matching all other modules) */}
      <div className="bg-[#0a4352] px-4 sm:px-6 py-3 sm:py-3.5 text-white flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 shrink-0 shadow-inner">
            <Building2 size={17} />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-normal text-left">
            Buscador de Resultados por RBD
          </h2>
        </div>
      </div>

      {/* 2. Main Content Body */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004B62]">
              <Search size={22} />
            </div>
            <input 
              id="rbd-search-input"
              type="text"
              placeholder="Escriba cualquier RBD o nombre (ej: 67890, 12345, 11223, 14520, 360)..."
              className="w-full bg-slate-50 border-2 border-slate-300 focus:border-[#F04C28] rounded-2xl pl-12 pr-28 py-4 text-base sm:text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#F04C28]/15 transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  onSelectRbd('12345');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-200/90 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#004B62] text-white px-7 py-4 rounded-2xl text-sm font-black hover:bg-[#00384a] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#004B62]/20 shrink-0 cursor-pointer active:scale-95"
          >
            <span>Consultar RBD</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
