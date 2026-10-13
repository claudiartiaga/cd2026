import React from 'react';
import { 
  X, 
  Check 
} from 'lucide-react';

interface ProfilerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProfile: string;
  onSelectProfile: (profile: string) => void;
}

export default function ProfilerModal({
  isOpen,
  onClose,
  selectedProfile,
  onSelectProfile
}: ProfilerModalProps) {
  if (!isOpen) return null;

  const profiles = [
    {
      id: 'director',
      name: 'Director(a)',
      icon: (
        // Megaphone held by hand
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Megaphone body */}
          <path d="M 32 38 L 62 26 L 68 26 L 68 64 L 62 64 L 32 52 Z" />
          <path d="M 68 30 C 76 34, 76 56, 68 60" />
          <line x1="28" y1="41" x2="28" y2="49" />
          <path d="M 32 41 C 26 41, 26 49, 32 49" />
          {/* Sound waves / dots */}
          <line x1="74" y1="45" x2="79" y2="45" strokeDasharray="1 3" />
          <line x1="77" y1="36" x2="81" y2="33" />
          <line x1="77" y1="54" x2="81" y2="57" />
          {/* Hand holding megaphone */}
          <path d="M 46 47 L 46 72 C 46 74, 52 74, 52 72 L 52 50" />
          <path d="M 43 55 L 55 55" />
          <path d="M 43 61 L 55 61" />
        </svg>
      )
    },
    {
      id: 'docente',
      name: 'Docente',
      icon: (
        // Apple on top of a book
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Apple body */}
          <path d="M 50 35 C 44 26, 32 28, 33 42 C 34 54, 46 62, 50 64 C 54 62, 66 54, 67 42 C 68 28, 56 26, 50 35 Z" />
          {/* Apple stem and leaf */}
          <path d="M 50 35 C 50 24, 56 22, 56 20" />
          <path d="M 50 27 C 54 26, 58 29, 58 29" />
          {/* Closed book underneath */}
          <path d="M 28 68 L 72 68 C 76 68, 76 74, 72 74 L 28 74 C 24 74, 24 68, 28 68 Z" />
          <path d="M 28 74 L 72 74 C 76 74, 76 80, 72 80 L 28 80 C 24 80, 24 74, 28 74 Z" />
        </svg>
      )
    },
    {
      id: 'apoderado',
      name: 'Apoderado(a)',
      icon: (
        // Two family silhouettes
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Left person */}
          <circle cx="40" cy="38" r="10" />
          <path d="M 25 68 C 25 55, 33 50, 43 50 C 47 50, 52 52, 55 56" />
          {/* Right person */}
          <circle cx="62" cy="42" r="9" />
          <path d="M 50 70 C 50 59, 56 54, 66 54 C 74 54, 79 59, 79 70" />
        </svg>
      )
    },
    {
      id: 'estudiante',
      name: 'Estudiante',
      icon: (
        // Student silhouette with open notebook / book
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="50" cy="29" r="9.5" />
          {/* Neck collar */}
          <path d="M 44 47 C 44 52, 56 52, 56 47" />
          {/* Shoulders */}
          <path d="M 28 72 C 28 56, 38 47, 50 47 C 62 47, 72 56, 72 72" />
          {/* Backpack straps */}
          <path d="M 35 50 L 33 58" />
          <path d="M 65 50 L 67 58" />
          {/* Open book */}
          <path d="M 33 58 L 50 62 L 67 58 L 67 74 L 50 78 L 33 74 Z" />
          <line x1="50" y1="62" x2="50" y2="78" />
          {/* Notebook line details */}
          <line x1="38" y1="65" x2="46" y2="67" strokeWidth="2" />
          <line x1="54" y1="67" x2="62" y2="65" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'sostenedor',
      name: 'Sostenedor/SLEP',
      icon: (
        // Institution / Sostenedor SLEP Government building
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Pediment roof */}
          <polygon points="50,22 24,36 76,36" />
          <line x1="20" y1="36" x2="80" y2="36" />
          {/* Columns */}
          <line x1="30" y1="36" x2="30" y2="68" />
          <line x1="43" y1="36" x2="43" y2="68" />
          <line x1="57" y1="36" x2="57" y2="68" />
          <line x1="70" y1="36" x2="70" y2="68" />
          {/* Base stairs */}
          <line x1="22" y1="68" x2="78" y2="68" />
          <line x1="18" y1="74" x2="82" y2="74" />
          {/* Center emblem */}
          <circle cx="50" cy="30" r="2.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'sac',
      name: 'Funcionario(a)\nSAC',
      icon: (
        // Mineduc / SAC official dossier folder
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Open folder/binder with two columns */}
          <rect x="25" y="27" width="50" height="46" rx="2" />
          <line x1="50" y1="27" x2="50" y2="73" />
          {/* Chile crest emblem simulation on left page */}
          <rect x="29" y="32" width="16" height="12" rx="1" />
          <line x1="37" y1="32" x2="37" y2="44" />
          {/* Text lines */}
          <line x1="54" y1="35" x2="70" y2="35" strokeWidth="2.5" />
          <line x1="54" y1="41" x2="68" y2="41" strokeWidth="2" />
          <line x1="54" y1="47" x2="66" y2="47" strokeWidth="2" />
          {/* Footer banner */}
          <line x1="29" y1="64" x2="45" y2="64" strokeWidth="2" />
          <line x1="54" y1="64" x2="70" y2="64" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'agencia',
      name: 'Funcionario(a)\nAgencia',
      icon: (
        // Agencia de Calidad logo identity badge
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Top flag bar */}
          <rect x="28" y="32" width="44" height="6" rx="1" />
          <line x1="50" y1="32" x2="50" y2="38" />
          {/* Agency badge body */}
          <rect x="28" y="44" width="44" height="30" rx="3" />
          {/* Agency lines */}
          <line x1="34" y1="52" x2="66" y2="52" strokeWidth="2.5" />
          <line x1="34" y1="58" x2="60" y2="58" strokeWidth="2" />
          <line x1="34" y1="64" x2="55" y2="64" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'otros',
      name: 'Otros(as)',
      icon: (
        // Globe resting on top of an open book
        <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-current fill-none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Globe */}
          <circle cx="50" cy="40" r="16" />
          <ellipse cx="50" cy="40" rx="7" ry="16" />
          <line x1="34" y1="40" x2="66" y2="40" />
          <path d="M 37 32 C 42 34, 58 34, 63 32" />
          <path d="M 37 48 C 42 46, 58 46, 63 48" />
          {/* Open book underneath */}
          <path d="M 50 63 L 26 67 L 26 77 L 50 73 L 74 77 L 74 67 Z" />
          <line x1="50" y1="63" x2="50" y2="73" />
        </svg>
      )
    }
  ];

  const handleSelect = (profileName: string) => {
    onSelectProfile(profileName);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container: exactly with 2cm margin on each side (responsive on small devices) */}
      <div 
        className="fixed z-50 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        style={{
          top: 'clamp(10px, 3vh, 2cm)',
          bottom: 'clamp(10px, 3vh, 2cm)',
          left: 'clamp(10px, 3vw, 2cm)',
          right: 'clamp(10px, 3vw, 2cm)'
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Institutional Header */}
        <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Gobierno de Chile Flag band */}
            <div className="flex flex-col">
              <div className="flex h-2.5 w-10 sm:w-12 rounded-xs overflow-hidden mb-1">
                <div className="w-1/2 bg-[#004B62]" />
                <div className="w-1/2 bg-[#eb1b24]" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 leading-tight">
                Agencia de<br />Calidad de la<br />Educación
              </span>
            </div>

            {/* Red vertical divider */}
            <div className="w-1 h-10 sm:h-12 bg-[#eb1b24] rounded-full mx-1 sm:mx-2" />

            {/* Perfilador Title */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#006699] tracking-tight">
                Perfilador
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Continuar al Dashboard"
            >
              <span>Ingresar al Dashboard</span>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Content: Profiler selection */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 space-y-8 sm:space-y-10">

          {/* ============================================================ */}
          {/* SELECCIÓN DEL PERFILADOR (DIRECTAMENTE LOS ÍCONOS DE USUARIO) */}
          {/* ============================================================ */}
          <div className="flex flex-col items-center pt-2">
            {/* Profile Options Grid: exactly as image */}
            <div className="w-full max-w-5xl">
              
              {/* Row 1: Director(a), Docente, Apoderado(a), Estudiante */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-10">
                {profiles.slice(0, 4).map((p) => {
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelect(p.name)}
                      className="group flex flex-col items-center cursor-pointer focus:outline-none transition-transform active:scale-95"
                    >
                      {/* Circle Icon */}
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#006494] hover:bg-[#00547c] flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                        {p.icon}
                      </div>

                      {/* Label */}
                      <span className="mt-4 text-base sm:text-lg font-bold text-[#006699] group-hover:text-[#004e75] text-center whitespace-pre-line leading-tight">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Row 2: Sostenedor/SLEP, Funcionario SAC, Funcionario Agencia, Otros(as) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {profiles.slice(4).map((p) => {
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelect(p.name)}
                      className="group flex flex-col items-center cursor-pointer focus:outline-none transition-transform active:scale-95 relative"
                    >
                      {/* Circle Icon */}
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#006494] hover:bg-[#00547c] flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                        {p.icon}
                      </div>

                      {/* Label */}
                      <span className="mt-4 text-base sm:text-lg font-bold text-[#006699] group-hover:text-[#004e75] text-center whitespace-pre-line leading-tight">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Bottom prompt */}
            <div className="mt-10 pt-6 border-t border-slate-200 text-center w-full max-w-2xl">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#0a4352] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#072f3a] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Ingresar al Dashboard</span>
                <Check size={18} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
