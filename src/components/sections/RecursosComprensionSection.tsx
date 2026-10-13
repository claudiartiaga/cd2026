import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  GraduationCap, 
  BookOpen, 
  Scale, 
  Download, 
  ArrowRight, 
  Search,
  Check
} from 'lucide-react';

interface ResourceItem {
  id: string;
  badge: 'PDF' | 'DIGITAL' | 'WEB';
  title: string;
  actionText: 'Descargar' | 'Acceder';
  actionType: 'download' | 'link';
  url?: string;
}

interface ResourceCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  pillColor: string;
  activePillBg: string;
  badgeBorderColor: string;
  badgeTextColor: string;
  badgeBgColor: string;
  count: number;
  items: ResourceItem[];
}

const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'infografias',
    title: 'Infografías',
    icon: Sparkles,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    pillColor: 'border-amber-300 text-amber-800 hover:bg-amber-50/60',
    activePillBg: 'bg-amber-500 text-white',
    badgeBorderColor: 'border-amber-300',
    badgeTextColor: 'text-amber-700',
    badgeBgColor: 'bg-amber-50/60',
    count: 4,
    items: [
      { id: 'info-1', badge: 'PDF', title: '¿Qué es la Categoría de Desempeño?', actionText: 'Descargar', actionType: 'download' },
      { id: 'info-2', badge: 'PDF', title: '¿Cómo se calcula la Categoría de Desempeño?', actionText: 'Descargar', actionType: 'download' },
      { id: 'info-3', badge: 'PDF', title: '¿Qué consecuencias tiene la Categoría de Desempeño?', actionText: 'Descargar', actionType: 'download' },
      { id: 'info-4', badge: 'PDF', title: '¿Qué es la Mejora significativa?', actionText: 'Descargar', actionType: 'download' },
    ]
  },
  {
    id: 'fichas',
    title: 'Fichas de profundización',
    icon: Bookmark,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    pillColor: 'border-emerald-300 text-emerald-800 hover:bg-emerald-50/60',
    activePillBg: 'bg-emerald-500 text-white',
    badgeBorderColor: 'border-emerald-300',
    badgeTextColor: 'text-emerald-700',
    badgeBgColor: 'bg-emerald-50/60',
    count: 4,
    items: [
      { id: 'ficha-1', badge: 'PDF', title: '¿Qué es la Categoría de Desempeño?', actionText: 'Descargar', actionType: 'download' },
      { id: 'ficha-2', badge: 'PDF', title: '¿Cómo se calcula la Categoría de Desempeño?', actionText: 'Descargar', actionType: 'download' },
      { id: 'ficha-3', badge: 'PDF', title: '¿Qué consecuencias tiene la Categoría de Desempeño?', actionText: 'Descargar', actionType: 'download' },
      { id: 'ficha-4', badge: 'PDF', title: '¿Qué es la Mejora significativa?', actionText: 'Descargar', actionType: 'download' },
    ]
  },
  {
    id: 'revista',
    title: 'Revista Aprender+',
    icon: GraduationCap,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    pillColor: 'border-rose-300 text-rose-800 hover:bg-rose-50/60',
    activePillBg: 'bg-rose-500 text-white',
    badgeBorderColor: 'border-rose-300',
    badgeTextColor: 'text-rose-700',
    badgeBgColor: 'bg-rose-50/60',
    count: 2,
    items: [
      { id: 'rev-1', badge: 'DIGITAL', title: 'Revista Aprender+ (Edición Oficial)', actionText: 'Acceder', actionType: 'link', url: 'https://www.agenciaeducacion.cl/' },
      { id: 'rev-2', badge: 'WEB', title: 'Prácticas y Evidencias para la Mejora', actionText: 'Acceder', actionType: 'link', url: 'https://www.agenciaeducacion.cl/' },
    ]
  },
  {
    id: 'glosario',
    title: 'Glosario',
    icon: BookOpen,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    pillColor: 'border-sky-300 text-sky-800 hover:bg-sky-50/60',
    activePillBg: 'bg-sky-500 text-white',
    badgeBorderColor: 'border-sky-300',
    badgeTextColor: 'text-sky-700',
    badgeBgColor: 'bg-sky-50/60',
    count: 2,
    items: [
      { id: 'glo-1', badge: 'PDF', title: 'Glosario de Términos de la Categoría de Desempeño', actionText: 'Descargar', actionType: 'download' },
      { id: 'glo-2', badge: 'PDF', title: 'Conceptos Fundamentales del SAC', actionText: 'Descargar', actionType: 'download' },
    ]
  },
  {
    id: 'documentos',
    title: 'Documentos oficiales',
    icon: Scale,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    pillColor: 'border-indigo-300 text-indigo-800 hover:bg-indigo-50/60',
    activePillBg: 'bg-indigo-500 text-white',
    badgeBorderColor: 'border-indigo-300',
    badgeTextColor: 'text-indigo-700',
    badgeBgColor: 'bg-indigo-50/60',
    count: 7,
    items: [
      { id: 'doc-1', badge: 'PDF', title: 'Decreto N°17', actionText: 'Descargar', actionType: 'download' },
      { id: 'doc-2', badge: 'PDF', title: 'Decreto N°127', actionText: 'Descargar', actionType: 'download' },
      { id: 'doc-3', badge: 'PDF', title: 'Decreto N°171', actionText: 'Descargar', actionType: 'download' },
      { id: 'doc-4', badge: 'PDF', title: 'REX N°574', actionText: 'Descargar', actionType: 'download' },
      { id: 'doc-5', badge: 'PDF', title: 'REX N°0618', actionText: 'Descargar', actionType: 'download' },
      { id: 'doc-6', badge: 'PDF', title: 'REX N°1623', actionText: 'Descargar', actionType: 'download' },
      { id: 'doc-7', badge: 'PDF', title: 'REX N°0803', actionText: 'Descargar', actionType: 'download' },
    ]
  }
];

export default function RecursosComprensionSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  const handleAction = (item: ResourceItem) => {
    if (item.actionType === 'link' && item.url) {
      window.open(item.url, '_blank');
      return;
    }
    // Simular descarga de documento oficial de la Agencia de Educación
    setDownloadedItem(item.id);
    setTimeout(() => {
      setDownloadedItem(null);
    }, 2500);
  };

  const filteredCategories = useMemo(() => {
    return RESOURCE_CATEGORIES.map(category => {
      // Filtrar por tab activo si no es 'all'
      if (activeFilter !== 'all' && category.id !== activeFilter) {
        return null;
      }

      // Filtrar por término de búsqueda si existe
      if (!searchQuery.trim()) {
        return category;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchedItems = category.items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        category.title.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );

      if (matchedItems.length === 0) {
        return null;
      }

      return {
        ...category,
        items: matchedItems,
        count: matchedItems.length
      };
    }).filter(Boolean) as ResourceCategory[];
  }, [activeFilter, searchQuery]);

  return (
    <div className="w-full space-y-6">
      
      {/* 1. BARRA SUPERIOR: Filtros por categoría + Buscador */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Píldoras de filtro */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Todos los recursos */}
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs ${
              activeFilter === 'all'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Todos los recursos
          </button>

          {/* Filtros individuales con bordes sutiles según la imagen */}
          {RESOURCE_CATEGORIES.map(cat => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? cat.activePillBg
                    : `bg-white ${cat.pillColor}`
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Buscador de recursos o decretos */}
        <div className="relative min-w-[260px] sm:min-w-[320px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema o decreto..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-xl placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0a4352]/20 focus:border-[#0a4352] shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. GRILLA PRINCIPAL DE RECURSOS */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
          <p className="text-sm font-bold text-slate-700">No se encontraron recursos que coincidan con la búsqueda.</p>
          <button 
            type="button" 
            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
            className="text-xs font-black text-[#0070ba] hover:underline"
          >
            Ver todos los recursos
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Fila superior en 2 columnas: Infografías y Fichas de profundización */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCategories
              .filter(cat => cat.id === 'infografias' || cat.id === 'fichas')
              .map(category => (
                <ResourceCard 
                  key={category.id} 
                  category={category} 
                  onAction={handleAction}
                  downloadedId={downloadedItem}
                />
              ))}
          </div>

          {/* Fila intermedia en 2 columnas: Revista Aprender+ y Glosario */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCategories
              .filter(cat => cat.id === 'revista' || cat.id === 'glosario')
              .map(category => (
                <ResourceCard 
                  key={category.id} 
                  category={category} 
                  onAction={handleAction}
                  downloadedId={downloadedItem}
                />
              ))}
          </div>

          {/* Fila inferior: Documentos oficiales a ancho completo */}
          {filteredCategories
            .filter(cat => cat.id === 'documentos')
            .map(category => (
              <div 
                key={category.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Header de Documentos oficiales */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${category.iconBg} ${category.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                      <category.icon size={18} className="stroke-[2.5]" />
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                      {category.title}
                    </h4>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center shrink-0">
                    {category.count}
                  </span>
                </div>

                {/* Grilla de 4 columnas para decretos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {category.items.map(item => (
                    <ResourceRowItem 
                      key={item.id}
                      item={item}
                      category={category}
                      onAction={handleAction}
                      isDownloaded={downloadedItem === item.id}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

    </div>
  );
}

interface ResourceCardProps {
  key?: React.Key;
  category: ResourceCategory;
  onAction: (item: ResourceItem) => void;
  downloadedId: string | null;
}

function ResourceCard({ category, onAction, downloadedId }: ResourceCardProps) {
  const Icon = category.icon;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
      <div>
        {/* Encabezado de la tarjeta con icono, título y contador */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${category.iconBg} ${category.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
              <Icon size={18} className="stroke-[2.5]" />
            </div>
            <h4 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
              {category.title}
            </h4>
          </div>
          <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center shrink-0">
            {category.count}
          </span>
        </div>

        {/* Lista de elementos */}
        <div className="space-y-2.5 pt-3">
          {category.items.map(item => (
            <ResourceRowItem 
              key={item.id}
              item={item}
              category={category}
              onAction={onAction}
              isDownloaded={downloadedId === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ResourceRowItemProps {
  key?: React.Key;
  item: ResourceItem;
  category: ResourceCategory;
  onAction: (item: ResourceItem) => void;
  isDownloaded: boolean;
}

function ResourceRowItem({ item, category, onAction, isDownloaded }: ResourceRowItemProps) {
  return (
    <div className="p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/70 transition-all flex items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Badge tipo (PDF, DIGITAL, WEB) */}
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-black border ${category.badgeBorderColor} ${category.badgeTextColor} ${category.badgeBgColor} shrink-0`}>
          {item.badge}
        </span>
        {/* Título del documento */}
        <span className="text-xs sm:text-[13px] font-bold text-slate-800 truncate leading-snug" title={item.title}>
          {item.title}
        </span>
      </div>

      {/* Botón de acción */}
      <button
        type="button"
        onClick={() => onAction(item)}
        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-2xs shrink-0 cursor-pointer"
      >
        {isDownloaded ? (
          <>
            <Check size={12} className="text-emerald-600" />
            <span className="text-emerald-700">Listo</span>
          </>
        ) : item.actionType === 'link' ? (
          <>
            <ArrowRight size={12} className="text-rose-500" />
            <span>{item.actionText}</span>
          </>
        ) : (
          <>
            <Download size={12} className="text-slate-600" />
            <span>{item.actionText}</span>
          </>
        )}
      </button>
    </div>
  );
}
