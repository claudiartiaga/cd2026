import React from 'react';
import { Download, Info, ExternalLink } from 'lucide-react';
import { EstablishmentInfo } from '../establishmentData';

interface EstablishmentIdentificationBarProps {
  establishment: EstablishmentInfo;
  className?: string;
}

export default function EstablishmentIdentificationBar({
  establishment,
  className = ''
}: EstablishmentIdentificationBarProps) {
  const getCategoryStyle = (cat?: string) => {
    const c = (cat || 'Alto').toLowerCase();
    switch (c) {
      case 'alto':
        return 'bg-[#EEF7FA] border-[#BFE2EE] text-[#004B62]';
      case 'medio':
        return 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]';
      case 'medio-bajo':
        return 'bg-[#FEFCE8] border-[#FEF08A] text-[#854D0E]';
      case 'insuficiente':
        return 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]';
      default:
        return 'bg-[#EEF7FA] border-[#BFE2EE] text-[#004B62]';
    }
  };

  return (
    <div 
      id="establishment-identification-bar"
      className={`sticky top-[76px] sm:top-[86px] md:top-[92px] z-20 w-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-4 sm:p-5 transition-all duration-200 ${className}`}
    >
      <div className="flex flex-col gap-3">
        {/* Fila 1: Nombre del establecimiento, RBD y SLEP */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-slate-100">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#004B62] shrink-0" />
              <h2 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight uppercase truncate">
                {establishment.name}{' '}
                <span className="font-bold text-slate-500 normal-case">
                  – RBD {establishment.rbd}
                </span>
              </h2>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#007399] ml-4.5 mt-0.5">
              Servicio Local de Educación Pública (SLEP) Costa Araucanía
            </div>
          </div>
        </div>

        {/* Fila 2: Categoría de Desempeño 2026, Badge, Descargar síntesis, Info pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          {/* Grupo izquierdo: Título de Categoría y Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-base sm:text-lg lg:text-xl font-black text-[#004B62]">
                Categoría de Desempeño
              </span>
              <span className="text-base sm:text-lg lg:text-xl font-black text-[#F04C28]">
                2026
              </span>
            </div>

            {/* Badge Categoría */}
            <div className={`px-4 sm:px-5 py-1 rounded-xl border text-sm sm:text-base font-black shrink-0 tracking-wide ${getCategoryStyle(establishment.category)}`}>
              {(establishment.category || 'Alto').toUpperCase()}
            </div>
          </div>

          {/* Grupo derecho: Descargar síntesis e Info pill */}
          <div className="flex flex-wrap items-center gap-2.5 sm:ml-auto">
            {/* Botón Descargar síntesis */}
            <button 
              type="button"
              className="flex items-center gap-1.5 bg-[#F04C28] text-white px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#D83E1C] transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <Download size={15} />
              <span>Descargar síntesis</span>
            </button>

            {/* Info pill */}
            <div className="inline-flex items-center flex-wrap gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50/60 border border-[#FBCFC5] text-slate-800 text-xs font-semibold shrink-0">
              <Info size={14} className="text-[#F04C28] shrink-0" />
              <span>Para conocer más de la Categoría de Desempeño,</span>
              <a 
                href="https://ace2.agenciaeducacion.cl/cat_des_01/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#F04C28] hover:text-[#D83E1C] underline font-bold transition-all inline-flex items-center gap-1"
              >
                <span>ingrese aquí</span>
                <ExternalLink size={12} className="shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
