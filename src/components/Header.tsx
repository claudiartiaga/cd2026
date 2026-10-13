import React from 'react';
import { User, Download, Bell, Menu, Info, ExternalLink } from 'lucide-react';
import { ESTABLISHMENT_INFO } from '../constants';
import { EstablishmentInfo } from '../establishmentData';

interface HeaderProps {
  activeLevel: string;
  activeSubLevel: string;
  establishment?: EstablishmentInfo;
  onToggleMobileMenu?: () => void;
  onOpenProfiler?: () => void;
  currentProfile?: string;
}

export default function Header({ 
  activeLevel, 
  activeSubLevel, 
  establishment,
  onToggleMobileMenu,
  onOpenProfiler,
  currentProfile = 'Sostenedor/SLEP'
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 w-full min-h-[76px] sm:min-h-[86px] md:min-h-[92px] py-2.5 flex items-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Left: Mobile hamburger menu toggle */}
        <div className="flex items-center min-w-[40px]">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0 cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Center: Title "Portal de Resultados de la Categoría de Desempeño" + Level and 2026 in second line */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-0.5 min-w-0">
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-[24px] xl:text-[26px] font-black text-[#F04C28] tracking-tight leading-snug">
            Portal de Resultados de la Categoría de Desempeño
          </h1>
          <div className="text-xs sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] font-black tracking-tight leading-snug mt-0.5 sm:mt-1">
            <span className="text-[#004B62]">
              {activeLevel === 'media' ? 'Educación Media' : 'Educación Básica'}
            </span>{' '}
            <span className="text-[#F04C28]">2026</span>
          </div>
        </div>

        {/* Right: Bell and Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 border-l border-slate-200 pl-3 sm:pl-4">
          <button 
            className="text-slate-400 hover:text-slate-600 transition-colors relative p-1.5 cursor-pointer"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white" />
          </button>
          
          <button 
            type="button"
            onClick={onOpenProfiler}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-all cursor-pointer text-left focus:outline-none"
            title="Cambiar perfil / Abrir perfilador"
          >
            <div className="hidden md:flex flex-col items-end leading-tight">
              <span className="text-xs sm:text-sm font-black text-slate-900">{currentProfile}</span>
              <span className="text-[11px] text-[#007399] font-bold hover:underline">Perfilador</span>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#004B62]/10 rounded-full flex items-center justify-center text-[#004B62] border border-[#004B62]/20 shrink-0 font-black hover:ring-2 hover:ring-[#004B62]/30 transition-all">
              <User size={20} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
