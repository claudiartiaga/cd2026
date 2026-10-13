import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronUp, 
  ChevronDown, 
  ArrowRight, 
  Plus 
} from 'lucide-react';
import { EstablishmentInfo } from '../establishmentData';

interface CategoryCalculationExplanationCardProps {
  establishment?: EstablishmentInfo;
}

export default function CategoryCalculationExplanationCard({ establishment }: CategoryCalculationExplanationCardProps) {
  // State for Step 1 toggle directly next to 33%
  const [showIdpsSimceSection, setShowIdpsSimceSection] = useState(false);

  // State for Step 2 toggle
  const [showContextVariables, setShowContextVariables] = useState(false);

  // Category determination
  const activeCategory = establishment?.category || 'Alto';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 md:p-5 shadow-xs space-y-3.5">
      
      {/* Encabezado: ¿Cómo se obtiene la Categoría de Desempeño? */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
        <div className="w-7 h-7 rounded-full bg-[#004B62]/10 text-[#004B62] flex items-center justify-center shrink-0">
          <HelpCircle size={16} className="stroke-[2.5]" />
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight">
          ¿Cómo se obtiene la Categoría de Desempeño?
        </h3>
      </div>

      {/* Contenedor compacto en UNA SOLA LÍNEA */}
      <div className="flex flex-col lg:flex-row items-stretch gap-2.5 sm:gap-3 w-full">
        
        {/* PASO 1: ÍNDICE DE RESULTADOS */}
        <div className="flex-1 lg:flex-[1.2] min-w-0 flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-2xs">
          <div>
            {/* Header del Paso 1 */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded bg-[#003D52] text-white font-black text-[10px] flex items-center justify-center shrink-0">
                1
              </span>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Índice de Resultados
              </h4>
            </div>

            {/* Cajas superiores compactas: Estándares de Aprendizaje (67%) + IDPS y Pruebas Simce (33%) */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-1.5 items-center">
              {/* Estándares de Aprendizaje (67%) */}
              <div className="sm:col-span-5 rounded-lg border border-slate-200/90 p-2 sm:p-2.5 bg-white flex flex-col justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  Estándares de Aprendizaje
                </span>
                <div className="mt-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-sky-50 text-[#0070ba] font-black text-xs sm:text-sm border border-sky-200/80">
                    67%
                  </span>
                </div>
              </div>

              {/* Signo + */}
              <div className="sm:col-span-1 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-black text-[10px] shrink-0">
                  <Plus size={11} className="stroke-[3]" />
                </div>
              </div>

              {/* IDPS y Pruebas Simce (33%) con botón desplegable */}
              <div className="sm:col-span-5 rounded-lg border border-slate-200/90 p-2 sm:p-2.5 bg-white flex flex-col justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  IDPS y Pruebas Simce
                </span>
                <div className="mt-1.5 flex items-center justify-between gap-1">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-slate-50 text-slate-800 font-black text-xs sm:text-sm border border-slate-200/80">
                    33%
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowIdpsSimceSection(!showIdpsSimceSection)}
                    className="px-2 py-0.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  >
                    <span>{showIdpsSimceSection ? 'Ocultar' : 'Ver'}</span>
                    {showIdpsSimceSection ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Desplegable directo de indicadores al hacer clic en Ver/Ocultar al lado del 33% */}
            {showIdpsSimceSection && (
              <div className="rounded-lg border border-slate-200/90 p-2.5 bg-slate-50/50 space-y-1.5 mt-2 animate-in fade-in duration-150">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-700 pb-1 border-b border-slate-200/60">
                  Indicadores IDPS y Simce
                </div>

                <ul className="space-y-1 text-[11px] text-slate-700 font-medium pt-0.5">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Autoestima y motivación escolar
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Clima de convivencia escolar
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Participación y formación ciudadana
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Hábitos de vida saludable
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Asistencia escolar
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Permanencia escolar
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Equidad de género en aprendizajes
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                    Puntaje y Progreso Simce
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Flecha conectora 1 -> 2 (Desktop) */}
        <div className="hidden lg:flex items-center justify-center shrink-0 self-center z-10">
          <div className="w-6 h-6 rounded-full bg-[#007A87] text-white flex items-center justify-center shadow-xs">
            <ArrowRight size={13} className="stroke-[2.5]" />
          </div>
        </div>

        {/* PASO 2: AJUSTE POR CONTEXTO */}
        <div className="flex-1 lg:flex-[1.0] min-w-0 flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-2xs">
          <div>
            {/* Header del Paso 2 */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded bg-[#003D52] text-white font-black text-[10px] flex items-center justify-center shrink-0">
                2
              </span>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Ajuste por Contexto
              </h4>
            </div>

            <div className="space-y-2">
              <span className="block text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-wide">
                Características del Estudiantado
              </span>

              {/* Desplegable: Ocultar variables / Ver variables */}
              <div className="rounded-lg border border-slate-200/90 bg-slate-50/50 p-1">
                <button
                  type="button"
                  onClick={() => setShowContextVariables(!showContextVariables)}
                  className="w-full px-2.5 py-1.5 rounded-md bg-white border border-slate-200/90 hover:bg-slate-50 flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                >
                  <span>{showContextVariables ? 'Ocultar variables' : 'Ver variables'}</span>
                  {showContextVariables ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>

                {showContextVariables && (
                  <ul className="p-2 space-y-1.5 text-[11px] text-slate-700 font-medium">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Vulnerabilidad social
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Escolaridad de la madre
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Ruralidad o aislamiento
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Movilidad y desempeño de entrada
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Ascendencia indígena
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Necesidades especiales (NEE)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007A87] shrink-0" />
                      Tasa de violencia intrafamiliar
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Flecha conectora 2 -> 3 (Desktop) */}
        <div className="hidden lg:flex items-center justify-center shrink-0 self-center z-10">
          <div className="w-6 h-6 rounded-full bg-[#007A87] text-white flex items-center justify-center shadow-xs">
            <ArrowRight size={13} className="stroke-[2.5]" />
          </div>
        </div>

        {/* PASO 3: CATEGORÍA FINAL (En la misma línea al lado de Ajustes por Contexto) */}
        <div className="flex-1 lg:flex-[0.8] min-w-0 flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-2xs">
          <div>
            {/* Header del Paso 3 */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded bg-[#003D52] text-white font-black text-[10px] flex items-center justify-center shrink-0">
                3
              </span>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Categoría Final
              </h4>
            </div>

            {/* 4 Categorías de desempeño compactas */}
            <div className="flex flex-col gap-1.5">
              {/* ALTO */}
              <div 
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black flex items-center justify-between transition-all ${
                  activeCategory === 'Alto'
                    ? 'bg-[#003D52] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span>ALTO</span>
                <span className={`w-2 h-2 rounded-full ${activeCategory === 'Alto' ? 'bg-white' : 'bg-[#003D52]'}`} />
              </div>

              {/* MEDIO */}
              <div 
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black flex items-center justify-between transition-all ${
                  activeCategory === 'Medio'
                    ? 'bg-[#007A87] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span>MEDIO</span>
                <span className={`w-2 h-2 rounded-full ${activeCategory === 'Medio' ? 'bg-white' : 'bg-[#007A87]'}`} />
              </div>

              {/* MEDIO-BAJO */}
              <div 
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black flex items-center justify-between transition-all ${
                  activeCategory === 'Medio-Bajo'
                    ? 'bg-[#0070ba] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span>MEDIO-BAJO</span>
                <span className={`w-2 h-2 rounded-full ${activeCategory === 'Medio-Bajo' ? 'bg-white' : 'bg-[#0070ba]'}`} />
              </div>

              {/* INSUFICIENTE */}
              <div 
                className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black flex items-center justify-between transition-all ${
                  activeCategory === 'Insuficiente'
                    ? 'bg-[#eb465f] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span>INSUFICIENTE</span>
                <span className={`w-2 h-2 rounded-full ${activeCategory === 'Insuficiente' ? 'bg-white' : 'bg-[#eb465f]'}`} />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
