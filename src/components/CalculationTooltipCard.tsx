import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info } from 'lucide-react';

export interface CalculationTooltipData {
  title?: string;
  point1: string;
  point2: string;
  point3: string;
  fuente?: string;
}

export const CALCULATION_DATA: Record<string, CalculationTooltipData> = {
  // 1. Sección Estándares de Aprendizaje
  estandares: {
    title: 'Sección Estándares de Aprendizaje',
    point1: '1 Mediciones trienales: Resultados Simce (2023, 2024 y 2025) en Lectura y Matemática para 4° básico.',
    point2: '2 Puntaje por estándar: Pondera la distribución de estudiantes en Adecuado (100 pts), Elemental (65 pts) e Insuficiente (0 pts).',
    point3: '3 Ponderación temporal y escala: Mayor peso a años recientes e igual valor por asignatura, en escala de 0 a 100 puntos para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 2. Autoestima académica y motivación escolar
  autoestima: {
    title: 'Autoestima académica y motivación escolar',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Cuestionarios Simce: Proporción de percepciones positivas sobre capacidad de aprender y motivación (a mayor positividad, más cercano a 100).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 pts para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 3. Clima de convivencia escolar
  clima: {
    title: 'Clima de convivencia escolar',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Cuestionarios Simce: Proporción de percepciones positivas sobre capacidad de aprender y motivación (a mayor positividad, más cercano a 100).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 pts para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 4. Participación y Formación ciudadana
  participacion: {
    title: 'Participación y Formación ciudadana',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Cuestionarios Simce: Proporción de percepciones positivas sobre capacidad de aprender y motivación (a mayor positividad, más cercano a 100).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 pts para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 5. Hábitos de vida saludable
  habitos: {
    title: 'Hábitos de vida saludable',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Cuestionarios Simce: Proporción de percepciones positivas sobre capacidad de aprender y motivación (a mayor positividad, más cercano a 100).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 pts para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 6. Asistencia escolar
  asistencia: {
    title: 'Asistencia escolar',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Tasa de asistencia SIGE: Clasifica por estudiante en destacada (100), normal (70), inasistencia reiterada (30) o grave (0).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 % para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 7. Permanencia escolar
  permanencia: {
    title: 'Permanencia escolar',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Fuente oficial: Cuestionarios de Calidad y Contexto Simce o registros oficiales (SIGE/Mineduc).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 % para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 8. Equidad de género en aprendizajes
  equidad: {
    title: 'Equidad de género en aprendizajes',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Fuente oficial: Cuestionarios de Calidad y Contexto Simce o registros oficiales (SIGE/Mineduc).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 pts para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 9. Titulación técnico profesional
  titulacion: {
    title: 'Titulación técnico profesional',
    point1: '1 Período evaluado: Considera las mediciones anuales (2023, 2024 y 2025) para 4° básico.',
    point2: '2 Fuente oficial: Cuestionarios de Calidad y Contexto Simce o registros oficiales (SIGE/Mineduc).',
    point3: '3 Ponderación y escala: Mayor peso a los años recientes, consolidado en escala de 0 a 100 pts para educación básica.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 10. Puntaje Simce
  puntajeSimce: {
    title: 'Puntaje Simce',
    point1: '1 Mediciones trienales: Considera los resultados de las pruebas Simce de Lectura y Matemática para los últimos 3 años (2023, 2024 y 2025).',
    point2: '2 Puntaje promedio: Consolida y estandariza los puntajes obtenidos en ambas asignaturas.',
    point3: '3 Ponderación temporal y escala: Aplica ponderación progresiva a los años más recientes (16,7%, 33,3% y 50,0%) en escala de 0 a 100 puntos.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  },

  // 11. Progreso Simce
  progresoSimce: {
    title: 'Progreso Simce',
    point1: '1 Mediciones consecutivas: Evalúa las variaciones interanuales de puntaje entre mediciones continuas (2023-2024 y 2024-2025).',
    point2: '2 Variación observada: Compara la diferencia de puntajes en Lectura y Matemática con el promedio histórico esperado.',
    point3: '3 Escala y ponderación: Integra las tendencias de mejora sostenida y las consolida en la escala de 0 a 100 puntos.',
    fuente: 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.'
  }
};

export function getCalculationDataForIndicator(indicatorName: string): CalculationTooltipData {
  const n = indicatorName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (n.includes('autoestima')) return CALCULATION_DATA.autoestima;
  if (n.includes('clima')) return CALCULATION_DATA.clima;
  if (n.includes('participacion')) return CALCULATION_DATA.participacion;
  if (n.includes('habito')) return CALCULATION_DATA.habitos;
  if (n.includes('asistencia')) return CALCULATION_DATA.asistencia;
  if (n.includes('permanencia') || n.includes('retencion')) return CALCULATION_DATA.permanencia;
  if (n.includes('equidad') || n.includes('genero')) return CALCULATION_DATA.equidad;
  if (n.includes('titulacion') || n.includes('tecnico')) return CALCULATION_DATA.titulacion;
  if (n.includes('progreso')) return CALCULATION_DATA.progresoSimce;
  if (n.includes('puntaje')) return CALCULATION_DATA.puntajeSimce;
  return CALCULATION_DATA.estandares;
}

interface CalculationTooltipCardProps {
  title?: string;
  point1?: string;
  point2?: string;
  point3?: string;
  fuente?: string;
  className?: string;
}

export default function CalculationTooltipCard({
  title = 'Sección Estándares de Aprendizaje',
  point1 = CALCULATION_DATA.estandares.point1,
  point2 = CALCULATION_DATA.estandares.point2,
  point3 = CALCULATION_DATA.estandares.point3,
  fuente = 'Fuente: Informe Técnico Categorías de Desempeño. Marzo 2019.',
  className = ''
}: CalculationTooltipCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Helper para resaltar visualmente los números 1, 2 y 3
  const renderPoint = (pointText: string, fallbackNum: number) => {
    const match = pointText.match(/^(\d+)\s*([\s\S]*)$/);
    const num = match ? match[1] : fallbackNum;
    const content = match ? match[2] : pointText;

    return (
      <div className="bg-[#f0f4f8] p-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
        <span className="w-6 h-6 rounded-lg bg-[#003D52] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs ring-2 ring-[#003D52]/15">
          {num}
        </span>
        <p className="flex-1 text-slate-800 font-medium text-xs leading-relaxed">
          {content}
        </p>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 flex items-center justify-between gap-3 ${className}`}
    >
      {/* Lado izquierdo: Ícono circular y textos descriptivos */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-[#004B62]/10 text-[#004B62] flex items-center justify-center shrink-0 shadow-2xs">
          <HelpCircle size={19} className="stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug tracking-tight">
            ¿Cómo se calcula este puntaje?
          </h4>
        </div>
      </div>

      {/* Lado derecho: Botón trigger con el Tooltip */}
      <div 
        className="relative shrink-0"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#004B62] text-xs font-black shadow-2xs transition-all hover:border-slate-300 cursor-pointer"
        >
          <Info size={13} className="text-[#004B62]" />
          <span>Ver cálculo</span>
        </button>

        {/* Tooltip / Popover flotante con el contenido exacto requerido en tonalidades claras del dashboard */}
        {isOpen && (
          <div 
            role="tooltip"
            className="absolute right-0 bottom-full mb-2 w-80 sm:w-96 max-w-[calc(100vw-32px)] bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl border-2 border-[#004B62]/20 ring-1 ring-slate-900/5 z-50 animate-in fade-in zoom-in-95 duration-150 text-left"
          >
            {/* Título de la sección o indicador */}
            <div className="pb-2.5 mb-3 border-b border-slate-200">
              <h5 className="text-xs sm:text-sm font-black text-[#004B62] uppercase tracking-wide">
                {title}
              </h5>
            </div>

            {/* Puntos 1, 2 y 3 con formato claro y números 1, 2 y 3 resaltados */}
            <div className="space-y-2.5 text-xs text-slate-800 leading-relaxed">
              {renderPoint(point1, 1)}
              {renderPoint(point2, 2)}
              {renderPoint(point3, 3)}
            </div>

            {/* Fuente técnica */}
            {fuente && (
              <div className="pt-2.5 mt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium italic">
                {fuente}
              </div>
            )}

            {/* Flecha inferior del tooltip */}
            <div 
              className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white border-r-2 border-b-2 border-[#004B62]/20 rotate-45"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
}
