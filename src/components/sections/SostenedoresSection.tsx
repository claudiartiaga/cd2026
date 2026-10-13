import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Building2, 
  Hash, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  BookOpen, 
  BarChart2, 
  TrendingUp, 
  History, 
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Filter
} from 'lucide-react';
import LearningSection from './LearningSection';
import IdpsSection from './IdpsSection';
import SimceSection from './SimceSection';
import HistorySection from './HistorySection';
import { ESTABLISHMENTS_LIST, getEstablishmentByRbd, EstablishmentInfo } from '../../establishmentData';

interface SostenedoresSectionProps {
  activeSection?: string;
  selectedRbd?: string;
  onSelectRbd?: (rbd: string) => void;
}

export default function SostenedoresSection({ 
  activeSection = 'learning',
  selectedRbd = '12345',
  onSelectRbd
}: SostenedoresSectionProps) {
  const [searchTerm, setSearchTerm] = useState(selectedRbd);
  const [activeTab, setActiveTab] = useState<'learning' | 'idps' | 'simce' | 'history'>('learning');
  
  // Keep active establishment synced with selectedRbd
  const currentEstablishment: EstablishmentInfo = getEstablishmentByRbd(selectedRbd);

  // Sync searchTerm when selectedRbd changes externally
  useEffect(() => {
    if (selectedRbd && selectedRbd !== searchTerm) {
      setSearchTerm(selectedRbd);
    }
  }, [selectedRbd]);

  const handleSelectEstablishment = (rbd: string) => {
    setSearchTerm(rbd);
    if (onSelectRbd) {
      onSelectRbd(rbd);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchTerm.trim();
    if (!clean) return;
    if (onSelectRbd) {
      onSelectRbd(clean);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    const clean = val.trim();
    if (clean) {
      if (onSelectRbd) {
        onSelectRbd(clean);
      }
    }
  };

  const getCategoryBadge = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower === 'alto') {
      return { 
        bg: 'bg-[#0C4581]/10 text-[#0C4581] border-[#0C4581]/20', 
        solidBg: 'bg-[#0C4581] text-white',
        label: 'Alto',
        color: '#0C4581'
      };
    } else if (lower === 'medio') {
      return { 
        bg: 'bg-[#1a7a9a]/10 text-[#1a7a9a] border-[#1a7a9a]/20', 
        solidBg: 'bg-[#1a7a9a] text-white',
        label: 'Medio',
        color: '#1a7a9a'
      };
    } else if (lower.includes('medio-bajo') || lower.includes('medio bajo')) {
      return { 
        bg: 'bg-[#0F69C4]/10 text-[#0F69C4] border-[#0F69C4]/20', 
        solidBg: 'bg-[#0F69C4] text-white',
        label: 'Medio-Bajo',
        color: '#0F69C4'
      };
    } else {
      return { 
        bg: 'bg-red-50 text-red-600 border-red-200', 
        solidBg: 'bg-red-600 text-white',
        label: 'Insuficiente',
        color: '#dc2626'
      };
    }
  };

  const activeBadge = getCategoryBadge(currentEstablishment.category);

  return (
    <div className="space-y-8">
      {/* 1. SEARCH HEADER CARD */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Resultados por RBD</h3>
          </div>
          <button className="flex items-center gap-2 bg-[#F04C28] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black hover:bg-[#D83E1C] transition-all shadow-lg shadow-[#F04C28]/20 shrink-0">
            <Download size={18} />
            Descargar Reporte Sostenedor
          </button>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#004B62]">
              <Search size={22} />
            </div>
            <input 
              type="text"
              placeholder="Escriba cualquier RBD o nombre (ej: 99420, 12345, 67890, 11223, 14520, 4821)..."
              className="w-full bg-slate-50 border-2 border-slate-300 focus:border-[#F04C28] rounded-2xl pl-12 pr-28 py-4 text-base sm:text-lg font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#F04C28]/15 transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  if (onSelectRbd) onSelectRbd('12345');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-200/90 px-3 py-1.5 rounded-xl transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#004B62] text-white px-7 py-4 rounded-2xl text-sm font-black hover:bg-[#00384a] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#004B62]/20 shrink-0"
          >
            <span>Consultar RBD</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick RBD Pills Selector */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-1">RBD Sugeridos:</span>
          {ESTABLISHMENTS_LIST.map(est => {
            const isCurrent = est.rbd.toLowerCase() === selectedRbd.toLowerCase();
            return (
              <button
                key={est.rbd}
                type="button"
                onClick={() => handleSelectEstablishment(est.rbd)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  isCurrent 
                    ? 'bg-[#004B62] text-white border-[#004B62] shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-200/70 hover:border-slate-300'
                }`}
              >
                <Hash size={13} className={isCurrent ? 'text-[#F04C28]' : 'text-slate-400'} />
                <span>{est.rbd} - {est.name.split(' ').slice(0, 2).join(' ')}</span>
                {isCurrent && <CheckCircle2 size={13} className="text-[#F04C28]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ACTIVE ESTABLISHMENT DETAILS PANEL (Prominent and Visually Clear) */}
      <div className="bg-white rounded-3xl border-2 border-[#004B62] shadow-lg overflow-hidden transition-all">
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-[#004B62] via-[#005B77] to-[#003748] text-white p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3.5 py-1 bg-white/20 text-white text-xs font-black rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#F04C28]" />
                  Establecimiento Activo
                </span>
                <span className="px-3.5 py-1 bg-[#F04C28] text-white text-xs font-black rounded-full uppercase tracking-wider shadow-xs">
                  RBD: {currentEstablishment.rbd}
                </span>
                <span className={`px-3.5 py-1 text-xs font-black rounded-full uppercase tracking-wider ${activeBadge.solidBg}`}>
                  Categoría: {currentEstablishment.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                {currentEstablishment.name}
              </h3>

              <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-sm font-semibold text-sky-100/90 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin size={15} className="text-sky-300" />
                  {currentEstablishment.location} ({currentEstablishment.commune})
                </span>
                <span className="text-sky-300/60">•</span>
                <span>Dependencia: <strong>{currentEstablishment.dependence}</strong></span>
                <span className="text-sky-300/60">•</span>
                <span>Matrícula: <strong>{currentEstablishment.studentsCount} estudiantes</strong></span>
                <span className="text-sky-300/60">•</span>
                <span>GSE: <strong>{currentEstablishment.socioeconomic}</strong></span>
              </div>
            </div>

            {/* Puntaje Card */}
            <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/20 flex flex-col items-center justify-center shrink-0 min-w-[190px] text-center shadow-inner self-start lg:self-auto">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-widest block mb-1">
                Puntaje Global
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {currentEstablishment.overallScore}
                </span>
                <span className="text-sm font-bold text-sky-200">puntos</span>
              </div>
              <span className="text-[11px] font-bold text-sky-200 mt-1 uppercase tracking-wider">
                Desempeño {currentEstablishment.category}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Tabs for the Active Establishment */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 pt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('learning')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-black transition-all border-t-2 border-x-2 -mb-[2px] ${
              activeTab === 'learning'
                ? 'bg-white text-[#004B62] border-slate-200 border-b-transparent shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BookOpen size={16} className={activeTab === 'learning' ? 'text-[#F04C28]' : 'text-slate-400'} />
            <span>Estándares de Aprendizaje</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('idps')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-black transition-all border-t-2 border-x-2 -mb-[2px] ${
              activeTab === 'idps'
                ? 'bg-white text-[#004B62] border-slate-200 border-b-transparent shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Users size={16} className={activeTab === 'idps' ? 'text-[#F04C28]' : 'text-slate-400'} />
            <span>Indicadores IDPS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simce')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-black transition-all border-t-2 border-x-2 -mb-[2px] ${
              activeTab === 'simce'
                ? 'bg-white text-[#004B62] border-slate-200 border-b-transparent shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <GraduationCap size={16} className={activeTab === 'simce' ? 'text-[#F04C28]' : 'text-slate-400'} />
            <span>Puntaje y Progreso Simce</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-xs sm:text-sm font-black transition-all border-t-2 border-x-2 -mb-[2px] ${
              activeTab === 'history'
                ? 'bg-white text-[#004B62] border-slate-200 border-b-transparent shadow-xs'
                : 'bg-transparent text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <History size={16} className={activeTab === 'history' ? 'text-[#F04C28]' : 'text-slate-400'} />
            <span>Historial de Categoría</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-5 sm:p-8 bg-slate-50/40">
          {activeTab === 'learning' && (
            <LearningSection establishment={currentEstablishment} />
          )}
          {activeTab === 'idps' && (
            <IdpsSection establishment={currentEstablishment} />
          )}
          {activeTab === 'simce' && (
            <SimceSection establishment={currentEstablishment} />
          )}
          {activeTab === 'history' && (
            <HistorySection establishment={currentEstablishment} />
          )}
        </div>
      </div>
    </div>
  );
}
