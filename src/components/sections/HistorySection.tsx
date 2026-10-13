import React from 'react';
import { EstablishmentInfo } from '../../establishmentData';
import { Calendar } from 'lucide-react';

interface HistorySectionProps {
  establishment?: EstablishmentInfo;
  activeLevel?: string;
  hideVideo?: boolean;
}

export function CategoryExplanationVideo() {
  return (
    <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-slate-900">
          <iframe
            src="https://www.youtube.com/embed/0eNCl-FehiY?start=30"
            title="¿Qué es la Categoría de Desempeño? - En 90 segundos"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#004B62] tracking-tight leading-tight sm:leading-snug">
            En 90 segundos, todo lo que necesitas saber de Categoría de Desempeño
          </h3>
          <p className="mt-4 sm:mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
            En este video te mostramos de qué se trata, cómo se calcula y para qué sirve la categoría. ¡Infórmate sobre el valor de esta herramienta!
          </p>
        </div>
      </div>
    </div>
  );
}

interface HistoryItem {
  year: string;
  category: string;
  infoDate: string;
  calculationBasis: string;
}

const DEFAULT_HISTORY: HistoryItem[] = [
  {
    year: '2017',
    category: 'Medio',
    infoDate: 'Informada el 15 de enero de 2018',
    calculationBasis: 'calculada con los resultados de los años 2013, 2014, 2015 y 2016'
  },
  {
    year: '2018',
    category: 'Medio',
    infoDate: 'Informada el 12 de diciembre de 2018',
    calculationBasis: 'calculada con los resultados de los años 2014, 2015, 2016 y 2017'
  },
  {
    year: '2019',
    category: 'Alto',
    infoDate: 'Informada el 26 de diciembre de 2019',
    calculationBasis: 'calculada con los resultados de los años 2015, 2016, 2017 y 2018'
  },
  {
    year: '2020',
    category: 'Alto',
    infoDate: 'Informada el 15 de enero de 2021',
    calculationBasis: 'La ordenación para el año 2020, se realizó con base en las mediciones consecutivas válidas disponibles anteriores a la medición 2019.'
  },
  {
    year: '2026',
    category: 'Alto',
    infoDate: 'Informada en diciembre de 2026',
    calculationBasis: 'calculada con los resultados de los años 2022, 2023, 2024 y 2025'
  }
];

export default function HistorySection({ establishment, activeLevel = 'basica', hideVideo = false }: HistorySectionProps) {
  const getCalculationBasis = (year: string): string => {
    if (year === '2016') {
      return 'calculada con los resultados de los años 2012, 2013, 2014 y 2015';
    }
    if (year === '2017') {
      return 'calculada con los resultados de los años 2013, 2014, 2015 y 2016';
    }
    if (year === '2018') {
      return 'calculada con los resultados de los años 2014, 2015, 2016 y 2017';
    }
    if (year === '2019') {
      return 'calculada con los resultados de los años 2015, 2016, 2017 y 2018';
    }
    if (year === '2020') {
      return 'La ordenación para el año 2020, se realizó con base en las mediciones consecutivas válidas disponibles anteriores a la medición 2019.';
    }
    if (year === '2026') {
      return 'calculada con los resultados de los años 2022, 2023, 2024 y 2025';
    }
    const y = parseInt(year, 10);
    if (!isNaN(y)) {
      return `calculada con los resultados de los años ${y - 3}, ${y - 2} y ${y - 1}`;
    }
    return 'calculada con los resultados de los periodos evaluados';
  };

  // Build items either from establishment.categoryHistory or DEFAULT_HISTORY
  let items: HistoryItem[] = (establishment?.categoryHistory && establishment.categoryHistory.length > 0)
    ? establishment.categoryHistory.map((item) => ({
        year: item.year,
        category: item.category,
        infoDate: item.infoDate.startsWith('Informada') ? item.infoDate : `Informada el ${item.infoDate}`,
        calculationBasis: item.calculationBasis || getCalculationBasis(item.year)
      }))
    : DEFAULT_HISTORY;

  // Add 2016 when activeLevel is 'basica', or exclude it if 'media'
  if (activeLevel === 'basica') {
    if (!items.some(item => item.year === '2016')) {
      const earliestCategory = items.find(i => i.year === '2017')?.category || 'Medio';
      items = [
        {
          year: '2016',
          category: earliestCategory,
          infoDate: 'Informada el 28 de diciembre de 2016',
          calculationBasis: getCalculationBasis('2016')
        },
        ...items
      ];
    }
  } else {
    items = items.filter(item => item.year !== '2016');
  }

  // Guarantee year 2026 is present in the history
  if (!items.some(item => item.year === '2026')) {
    items = [
      ...items,
      {
        year: '2026',
        category: establishment?.category || 'Medio',
        infoDate: 'Informada en diciembre de 2026',
        calculationBasis: getCalculationBasis('2026')
      }
    ];
  }

  const getBadgeStyle = (category: string) => {
    const cat = category.toLowerCase().trim();
    if (cat.includes('alto')) {
      return 'bg-[#003B64] text-white'; // Deep navy blue as in image
    }
    if (cat.includes('medio-bajo') || cat.includes('medio bajo')) {
      return 'bg-[#0070ba] text-white';
    }
    if (cat.includes('medio')) {
      return 'bg-[#00738a] text-white'; // Dark teal as in image
    }
    if (cat.includes('insuficiente')) {
      return 'bg-[#e53935] text-white';
    }
    return 'bg-slate-700 text-white';
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {!hideVideo && <CategoryExplanationVideo />}

      {/* Línea de tiempo histórica */}
      <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative pt-2 pb-2">
          {/* Continuous horizontal timeline line across all circles on desktop */}
          <div 
            className="hidden lg:block absolute top-[32px] -translate-y-1/2 left-[3%] right-[3%] h-[2.5px] bg-[#96B8CB] z-0 pointer-events-none" 
            aria-hidden="true"
          />

          {/* columns layout: year node at the top + card below */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
            items.length >= 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-5'
          } gap-4 sm:gap-5 relative z-10`}>
            {items.map((item) => {
              const is2026 = item.year === '2026';
              return (
                <div key={item.year} className="flex flex-col">
                  {/* Circular Year Node on timeline */}
                  <div className="flex flex-col items-center justify-center mb-5 sm:mb-6 relative">
                    <div className={`rounded-full flex items-center justify-center select-none transition-all ${
                      is2026
                        ? 'w-13 h-13 bg-[#004B62] text-white font-black text-base shadow-md border-2 border-white ring-4 ring-[#004B62]/25 scale-105'
                        : 'w-12 h-12 bg-white border-[2.5px] border-[#004B62] text-[#004B62] font-extrabold text-sm sm:text-base shadow-2xs'
                    }`}>
                      {item.year}
                    </div>
                  </div>

                  {/* Year Card */}
                  <div className={`flex-1 rounded-2xl p-5 flex flex-col justify-between transition-all ${
                    is2026
                      ? 'bg-gradient-to-b from-[#004B62]/[0.04] via-white to-white border-2 border-[#004B62] shadow-md ring-2 ring-[#004B62]/10'
                      : 'bg-white border border-[#c6dbe7] shadow-2xs hover:shadow-xs'
                  }`}>
                    <div>
                      {/* Top row: Year label and category badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs sm:text-[13px] uppercase tracking-wide ${
                            is2026 ? 'font-black text-[#004B62]' : 'font-black text-slate-600'
                          }`}>
                            AÑO {item.year}
                          </span>
                          {is2026 && (
                            <span className="inline-block w-2 h-2 rounded-full bg-[#F04C28]" />
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider ${getBadgeStyle(item.category)}`}>
                          {item.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Notification date */}
                      <div className="mt-4 flex items-center gap-2 text-slate-800">
                        <Calendar size={17} className={`${is2026 ? 'text-[#004B62] stroke-[2.5]' : 'text-[#004B62] stroke-[2.2]'} shrink-0`} />
                        <span className={`text-xs sm:text-sm leading-tight ${is2026 ? 'font-black text-slate-900' : 'font-bold'}`}>
                          {item.infoDate}
                        </span>
                      </div>

                      {/* Calculation basis note */}
                      <div className={`mt-4 p-3.5 sm:p-4 rounded-xl border flex items-center min-h-[96px] ${
                        is2026
                          ? 'bg-[#004B62]/[0.05] border-[#004B62]/20 text-slate-900'
                          : 'bg-white border-slate-100 text-slate-600'
                      }`}>
                        <p className={`text-xs sm:text-[13px] leading-relaxed italic ${
                          is2026 ? 'font-medium text-slate-800' : 'font-normal text-slate-600'
                        }`}>
                          {item.calculationBasis}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
