import React, { useState } from 'react';
import { HelpCircle, Target, ChevronDown, Calculator } from 'lucide-react';
import { EstablishmentInfo } from '../../establishmentData';

interface GeneralSectionProps {
  establishment?: EstablishmentInfo;
}

export default function GeneralSection({ establishment }: GeneralSectionProps) {
  const [showIdpsList, setShowIdpsList] = useState(false);
  const [showContextList, setShowContextList] = useState(false);
  const [showOtherCategories, setShowOtherCategories] = useState(false);

  const currentCategory = establishment?.category?.toLowerCase() || 'alto';
  const isAlto = currentCategory.includes('alto') && !currentCategory.includes('medio');
  const isMedio = currentCategory === 'medio';
  const isMedioBajo = currentCategory.includes('medio-bajo') || currentCategory.includes('medio bajo');
  const isInsuficiente = currentCategory.includes('insuficiente');

  const categoriesList = [
    {
      id: 'alto',
      name: 'ALTO',
      desc: 'Sobresale respecto a lo esperado',
      support: 'No requiere apoyo',
      bg: 'bg-[#0c385c]',
      isCurrent: isAlto,
    },
    {
      id: 'medio',
      name: 'MEDIO',
      desc: 'Similar a lo esperado',
      support: 'No requiere apoyo',
      bg: 'bg-[#007a8c]',
      isCurrent: isMedio,
    },
    {
      id: 'medio-bajo',
      name: 'MEDIO-BAJO',
      desc: 'Por debajo de lo esperado',
      support: 'Recibe apoyo y visitas',
      bg: 'bg-[#1976d2]',
      isCurrent: isMedioBajo,
    },
    {
      id: 'insuficiente',
      name: 'INSUFICIENTE',
      desc: 'Muy por debajo de lo esperado',
      support: 'Apoyo prioritario',
      bg: 'bg-[#e53935]',
      isCurrent: isInsuficiente,
    },
  ];

  const currentCategoryItem = categoriesList.find((c) => c.isCurrent) || categoriesList[0];
  const otherCategoriesList = categoriesList.filter((c) => c.id !== currentCategoryItem.id);

  const categoriesDefinitions = [
    {
      id: 'alto',
      name: 'Alto',
      isCurrent: isAlto,
      topBorderColor: '#0a4352',
      titleColor: '#0a4352',
      textPrefix: 'Resultados que ',
      highlightText: 'sobresalen',
      textSuffix: ' respecto a lo esperado, considerando el contexto del establecimiento y el alumnado.',
    },
    {
      id: 'medio',
      name: 'Medio',
      isCurrent: isMedio,
      topBorderColor: '#007a8c',
      titleColor: '#007a8c',
      textPrefix: 'Resultados ',
      highlightText: 'similares a lo esperado',
      textSuffix: ', considerando el contexto del establecimiento y el alumnado.',
    },
    {
      id: 'medio-bajo',
      name: 'Medio-Bajo',
      isCurrent: isMedioBajo,
      topBorderColor: '#0070ba',
      titleColor: '#0070ba',
      textPrefix: 'Resultados ',
      highlightText: 'por debajo de lo esperado',
      textSuffix: ', considerando el contexto del establecimiento y el alumnado.',
    },
    {
      id: 'insuficiente',
      name: 'Insuficiente',
      isCurrent: isInsuficiente,
      topBorderColor: '#e53935',
      titleColor: '#0a4352',
      textPrefix: 'Resultados ',
      highlightText: 'muy por debajo de lo esperado',
      textSuffix: ', considerando el contexto del establecimiento y el alumnado.',
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Top Full-Width Card: ¿Qué es la Categoría de Desempeño? + Finalidad Clave */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 border-l-[6px] border-l-[#004B62] transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Explanatory Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase bg-[#004B62]/10 text-[#004B62] border border-[#004B62]/20">
                Sistema de Aseguramiento de la Calidad (SAC)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              ¿Qué es la Categoría de Desempeño?
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              La Categoría de Desempeño es el resultado de una <strong className="text-[#004B62] font-bold">evaluación integral</strong> que busca promover la <strong className="text-[#004B62] font-bold">mejora continua</strong> de los establecimientos y focalizar el apoyo y orientación del Sistema de Aseguramiento de la Calidad (SAC).
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              Este proceso ordena el desempeño escolar en cuatro niveles oficiales: <strong className="text-[#003B64] font-bold">Alto</strong>, <strong className="text-[#00738a] font-bold">Medio</strong>, <strong className="text-[#0070ba] font-bold">Medio-Bajo</strong> e <strong className="text-[#e53935] font-bold">Insuficiente</strong>.
            </p>
          </div>

          {/* Right Column: Callout Card 'Finalidad Clave' */}
          <div className="lg:col-span-4">
            <div className="p-5 sm:p-6 bg-amber-50/90 rounded-2xl border border-amber-200/90 border-l-4 border-l-amber-500 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200 mt-0.5 shadow-2xs">
                <Target size={22} className="stroke-[2.2]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-black text-amber-900 uppercase tracking-widest block">
                  FINALIDAD CLAVE
                </span>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  Evaluar equitativamente a las escuelas considerando su contexto socioeconómico e indicadores integrales de calidad.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. DEDICATED CARDS: DEFINICIONES OFICIALES DE LAS 4 CATEGORÍAS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <span className="text-xs font-black text-[#00738a] uppercase tracking-wider block">
              Niveles Oficiales de Ordenación
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
              Las 4 Categorías de Desempeño
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Definición según grado de cumplimiento de estándares
          </span>
        </div>

        {/* 4 Cards Grid - Enhanced visual design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoriesDefinitions.map((cat) => {
            const badgeBg = 
              cat.id === 'alto' ? 'bg-[#003B64] text-white' :
              cat.id === 'medio' ? 'bg-[#00738a] text-white' :
              cat.id === 'medio-bajo' ? 'bg-[#0070ba] text-white' :
              'bg-[#e53935] text-white';

            const badgeLabel =
              cat.id === 'alto' ? 'Sobresaliente' :
              cat.id === 'medio' ? 'Esperado' :
              cat.id === 'medio-bajo' ? 'Por debajo de lo esperado' :
              'Requiere apoyo urgente';

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col transition-all duration-300 relative hover:shadow-md hover:-translate-y-0.5 group"
              >
                {/* Top Accent Color Bar */}
                <div 
                  className="w-full h-2"
                  style={{ backgroundColor: cat.topBorderColor }}
                />

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category Title & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <h4 
                        className="text-lg font-black tracking-tight"
                        style={{ color: cat.titleColor }}
                      >
                        {cat.name}
                      </h4>
                    </div>

                    <div className="mb-3">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md inline-block shadow-2xs ${badgeBg}`}>
                        {badgeLabel}
                      </span>
                    </div>

                    {/* Body Text */}
                    <p className="text-slate-700 text-sm leading-relaxed font-normal">
                      {cat.textPrefix}
                      <strong className="text-slate-900 font-bold">{cat.highlightText}</strong>
                      {cat.textSuffix}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    Nivel oficial SAC
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PROCESO METODOLÓGICO: ¿Cómo se calcula la Categoría de Desempeño? */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 border-l-[6px] border-l-[#F04C28] space-y-6">
        <div>
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
            <div className="space-y-1">
              <span className="text-xs font-black text-[#F04C28] uppercase tracking-wider block">
                Metodología y Ponderaciones
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F04C28]/10 text-[#F04C28] flex items-center justify-center shrink-0">
                  <Calculator size={20} className="stroke-[2.2]" />
                </div>
                <span>¿Cómo se calcula la Categoría de Desempeño?</span>
              </h3>
            </div>
          </div>

          {/* Subtitle description */}
          <p className="text-slate-700 text-base sm:text-[17px] leading-relaxed mb-6 font-normal">
            Para obtener la Categoría de Desempeño se construye un <strong className="text-[#004B62] font-bold">Índice de Resultados</strong> que pondera los aprendizajes y desarrollo integral (67% + 33%). Luego, este índice <strong className="text-[#F04C28] font-bold">se ajusta estadísticamente según las características socioeducativas</strong> de los estudiantes para determinar la clasificación final equitativa.
          </p>

          {/* 3-Step Sequential Process Cards with connectors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 relative items-stretch">
            
            {/* Step 1: Índice de Resultados */}
            <div className="lg:col-span-6 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between relative shadow-2xs">
              <div>
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-200">
                  <span className="w-7 h-7 rounded-lg bg-[#004B62] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    1
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-wider">
                    ÍNDICE DE RESULTADOS
                  </h4>
                </div>

                <div className="space-y-3">
                  {/* Side-by-side: Niveles de Aprendizaje + IDPS y Pruebas Simce */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    {/* Estándares de Aprendizaje */}
                    <div className="flex-1 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                      <span className="text-xs sm:text-[13px] font-black text-slate-800 mb-2 leading-tight">
                        Estándares de Aprendizaje
                      </span>
                      <span className="text-base sm:text-lg font-black text-[#004B62] bg-sky-100/90 border border-sky-200/80 px-2.5 py-0.5 rounded-lg shadow-2xs w-fit">
                        67%
                      </span>
                    </div>

                    {/* Símbolo Más (+) */}
                    <div className="flex items-center justify-center shrink-0 py-0.5 sm:py-0">
                      <span className="w-6 h-6 rounded-full bg-slate-200/90 text-slate-700 font-black text-sm flex items-center justify-center shadow-2xs">
                        +
                      </span>
                    </div>

                    {/* IDPS y Pruebas Simce */}
                    <div className="flex-1 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                      <span className="text-xs sm:text-[13px] font-black text-slate-800 mb-2 leading-tight">
                        IDPS y Pruebas Simce
                      </span>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-base sm:text-lg font-black text-slate-800 bg-slate-100 border border-slate-300 px-2.5 py-0.5 rounded-lg shadow-2xs">
                          33%
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowIdpsList(!showIdpsList)}
                          className="py-1 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-all border border-slate-200 cursor-pointer shadow-2xs active:scale-[0.99]"
                          title={showIdpsList ? 'Ocultar indicadores' : 'Ver indicadores'}
                        >
                          <span>{showIdpsList ? 'Ocultar' : 'Ver (7)'}</span>
                          <ChevronDown size={13} className={`text-slate-500 transition-transform duration-200 ${showIdpsList ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible List for IDPS y Pruebas Simce */}
                  {showIdpsList && (
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs animate-in fade-in duration-200">
                      <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-2">
                        Indicadores IDPS y Pruebas Simce
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1.5 font-medium leading-relaxed">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Autoestima académica y motivación escolar</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Clima de convivencia escolar</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Participación y formación ciudadana</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Hábitos de vida saludable</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Asistencia y permanencia escolar</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Equidad de género y titulación técnico profesional</span>
                        </li>
                        <li className="flex items-center gap-2 pt-1 border-t border-slate-100 font-semibold text-slate-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                          <span>Puntaje y Progreso Simce</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Arrow to Step 2 */}
              <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#004B62] text-white items-center justify-center text-xs font-black shadow-md border-2 border-white">
                →
              </div>
            </div>

            {/* Step 2: Ajuste por Contexto */}
            <div className="lg:col-span-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between relative shadow-2xs">
              <div>
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-200">
                  <span className="w-7 h-7 rounded-lg bg-[#004B62] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    2
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-wider">
                    AJUSTE POR CONTEXTO
                  </h4>
                </div>

                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                  <span className="text-xs sm:text-[13px] font-black text-slate-700 uppercase tracking-wider block">
                    CARACTERÍSTICAS DEL ESTUDIANTADO
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowContextList(!showContextList)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between transition-all border border-slate-200 cursor-pointer shadow-2xs active:scale-[0.99]"
                  >
                    <span>{showContextList ? 'Ocultar' : 'Ver variables (7)'}</span>
                    <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${showContextList ? 'rotate-180' : ''}`} />
                  </button>

                  {showContextList && (
                    <ul className="text-xs text-slate-700 pt-2 border-t border-slate-100 space-y-1.5 font-medium leading-relaxed animate-in fade-in duration-200">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Vulnerabilidad social</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Escolaridad de la madre</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Ruralidad o aislamiento</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Movilidad y desempeño de entrada</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Ascendencia indígena</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Necesidades especiales (NEE)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004B62] shrink-0" />
                        <span>Tasa de violencia intrafamiliar</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Connector Arrow to Step 3 */}
              <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#004B62] text-white items-center justify-center text-xs font-black shadow-md border-2 border-white">
                →
              </div>
            </div>

            {/* Step 3: Categoría Final */}
            <div className="lg:col-span-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-200">
                  <span className="w-7 h-7 rounded-lg bg-[#004B62] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    3
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-wider">
                    CATEGORÍA FINAL
                  </h4>
                </div>

                <div className="space-y-3">
                  {/* Active Category */}
                  <div className={`text-white px-4 py-3.5 rounded-xl flex items-center justify-between shadow-2xs ${currentCategoryItem.bg}`}>
                    <span className="text-sm sm:text-base font-black uppercase tracking-wider">
                      {currentCategoryItem.name}
                    </span>
                  </div>

                  {/* Button to toggle Other Categories */}
                  <button
                    type="button"
                    onClick={() => setShowOtherCategories(!showOtherCategories)}
                    className="w-full py-2 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-between transition-all border border-slate-200 cursor-pointer shadow-2xs active:scale-[0.99]"
                  >
                    <span>{showOtherCategories ? 'Ocultar otras categorías' : 'Ver otras categorías (3)'}</span>
                    <ChevronDown size={15} className={`text-slate-500 transition-transform duration-200 ${showOtherCategories ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Collapsible Other Categories */}
                  {showOtherCategories && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 animate-in fade-in duration-200">
                      {otherCategoriesList.map((cat) => (
                        <div
                          key={cat.id}
                          className={`text-white px-3.5 py-2.5 rounded-xl flex items-center justify-between shadow-2xs ${cat.bg} opacity-95 transition-all`}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-black uppercase tracking-wider leading-tight">
                              {cat.name}
                            </span>
                            <span className="text-[11px] text-white/90 font-medium">
                              {cat.desc}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold bg-black/25 text-white px-2 py-0.5 rounded-md text-right shrink-0">
                            {cat.support}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
