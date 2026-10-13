import React, { useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  History, 
  LogOut,
  GraduationCap,
  Book,
  School,
  Building2,
  PieChart,
  X,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { COLORS } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeLevel: string;
  setActiveLevel: (level: string) => void;
  activeSubLevel: string;
  setActiveSubLevel: (subLevel: string) => void;
  levels: { id: string; label: string; subLevels: string[] }[];
  isOpen?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  id: string;
  label: React.ReactNode;
  icon: React.ElementType;
  href?: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export default function Sidebar({ 
  activeSection, 
  setActiveSection,
  activeLevel,
  setActiveLevel,
  activeSubLevel: _activeSubLevel,
  setActiveSubLevel,
  levels,
  isOpen = false,
  onClose
}: SidebarProps) {

  // Auto-scroll the active menu item into view in the sidebar if needed
  useEffect(() => {
    if (activeSection) {
      const activeEl = document.getElementById(`sidebar-item-${activeSection}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeSection]);

  const menuGroups: MenuGroup[] = [
    {
      title: 'Categoría y Sostenedor',
      items: [
        { 
          id: 'sostenedor-distribution', 
          label: 'Distribución de establecimientos', 
          icon: PieChart 
        },
        { 
          id: 'search-rbd', 
          label: 'Buscador de RBD', 
          icon: Building2 
        },
        { 
          id: 'history', 
          label: 'Historial de Categoría', 
          icon: History 
        }
      ]
    },
    {
      title: 'Índice de Resultados',
      items: [
        { 
          id: 'learning', 
          label: 'Estándares de Aprendizaje', 
          icon: BarChart3
        },
        { 
          id: 'idps', 
          label: (
            <span>
              Indicadores de Desarrollo<br />Personal y Social
            </span>
          ), 
          icon: Users
        },
        { 
          id: 'simce', 
          label: 'Puntaje y progreso Simce', 
          icon: GraduationCap
        },
        { 
          id: 'recursos-comprension', 
          label: 'Recursos para la comprensión', 
          icon: BookOpen
        }
      ]
    }
  ];

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    if (onClose) onClose();
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full w-72 flex flex-col text-white z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      style={{ backgroundColor: COLORS.sidebar }}
    >
      {/* Header móvil para cerrar menú */}
      <div className="lg:hidden p-3.5 border-b border-white/10 flex items-center justify-end">
        <button 
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white bg-white/5 rounded-xl transition-colors cursor-pointer"
          aria-label="Cerrar menú"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pt-4 sm:pt-5 pb-2">
        <div className="text-[11px] sm:text-xs font-black text-white/70 uppercase tracking-wider mb-2.5 px-1">
          Nivel Educativo
        </div>
        <div className="space-y-2">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                setActiveLevel(level.id);
                if (level.subLevels && level.subLevels[0]) {
                  setActiveSubLevel(level.subLevels[0]);
                }
              }}
              className={cn(
                "w-full py-3 px-3.5 text-xs sm:text-sm font-black rounded-2xl transition-all flex items-center gap-3 text-left cursor-pointer",
                activeLevel === level.id 
                  ? "bg-[#F04C28] text-white shadow-md" 
                  : "text-white/80 hover:text-white hover:bg-white/10 font-bold"
              )}
            >
              {level.id === 'basica' ? <Book size={18} className="shrink-0" /> : <School size={18} className="shrink-0" />}
              <span className="truncate">{level.label}</span>
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto space-y-4">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <div className="px-5 pt-3 pb-1.5 flex items-center justify-between">
              <span className="text-xs font-black text-white/70 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F04C28] shrink-0" />
                {group.title}
              </span>
            </div>

            <div className="space-y-1 px-3">
              {group.items.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;

                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      id={`sidebar-item-${item.id}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between py-2.5 pr-3 rounded-xl transition-all duration-150 text-left relative group border-l-[3px] border-transparent pl-2.5 hover:bg-white/8 text-white/75 hover:text-white"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white">
                          <Icon size={17} />
                        </div>
                        <span className="text-xs sm:text-sm leading-tight transition-colors font-semibold text-white/75 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>
                      <ExternalLink size={14} className="shrink-0 text-white/40 group-hover:text-white/80 transition-colors ml-1" />
                    </a>
                  );
                }

                return (
                  <button
                    key={item.id}
                    id={`sidebar-item-${item.id}`}
                    onClick={() => handleSelectSection(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between py-2.5 pr-3 rounded-xl transition-all duration-150 text-left relative group border-l-[3px]",
                      isActive 
                        ? "bg-white/15 text-white font-extrabold border-[#F04C28] pl-2.5 shadow-xs" 
                        : "hover:bg-white/8 text-white/75 hover:text-white border-transparent pl-2.5"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-1">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                        isActive 
                          ? "bg-white/20 text-white shadow-2xs" 
                          : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
                      )}>
                        <Icon size={17} />
                      </div>
                      <span className={cn(
                        "text-xs sm:text-sm leading-tight transition-colors",
                        isActive ? "font-black text-white" : "font-semibold text-white/75 group-hover:text-white"
                      )}>
                        {item.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#F04C28] ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 text-white/70 hover:text-white transition-colors w-full px-2 py-2 rounded-lg hover:bg-white/5">
          <LogOut size={18} />
          <span className="font-bold text-xs sm:text-sm">Cerrar Sesión</span>
        </button>
        <div className="mt-3 px-2 text-xs text-white/40 uppercase tracking-tight font-semibold">
          Agencia de Calidad de la Educación
        </div>
      </div>
    </aside>
  );
}
