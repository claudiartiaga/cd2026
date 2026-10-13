import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';
import Header from './Header';
import { COLORS, ESTABLISHMENT_INFO, CATEGORY_COLORS } from '../constants';
import { getEstablishmentByRbd, EstablishmentInfo } from '../establishmentData';
import { 
  BarChart3, 
  GraduationCap, 
  Users, 
  History, 
  Building2, 
  ArrowUp,
  Menu,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

// Sections
import LearningSection from './sections/LearningSection';
import SimceSection from './sections/SimceSection';
import IdpsSection from './sections/IdpsSection';
import HistorySection, { CategoryExplanationVideo } from './sections/HistorySection';
import RecursosComprensionSection from './sections/RecursosComprensionSection';
import SostenedoresSection from './sections/SostenedoresSection';
import RbdSearchCard from './RbdSearchCard';
import SostenedorDistributionCard from './SostenedorDistributionCard';
import CategoryCalculationExplanationCard from './CategoryCalculationExplanationCard';
import ProfilerModal from './ProfilerModal';
import EstablishmentIdentificationBar from './EstablishmentIdentificationBar';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('sostenedor-distribution');
  const [activeLevel, setActiveLevel] = useState('basica'); // 'basica' | 'media'
  const [activeSubLevel, setActiveSubLevel] = useState('4° Básico');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRbd, setSelectedRbd] = useState('12345');
  const [isProfilerOpen, setIsProfilerOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState('Sostenedor/SLEP');

  const establishment: EstablishmentInfo = getEstablishmentByRbd(selectedRbd);

  const isManualScrollRef = useRef(false);

  const levels = [
    { id: 'basica', label: 'Educación Básica', subLevels: ['4° Básico'] },
    { id: 'media', label: 'Educación Media', subLevels: ['II Medio'] }
  ];

  const getSections = () => {
    return [
      {
        id: 'history',
        moduleNumber: 'MÓDULO 1',
        title: activeLevel === 'media'
          ? 'Historial de Categoría de Desempeño Educación Media'
          : 'Historial de Categoría de Desempeño Educación Básica',
        badge: 'HISTORIAL Y TRAYECTORIA',
        subTitle: `Evolución Histórica para RBD ${establishment.rbd}`,
        icon: History,
        component: <HistorySection establishment={establishment} activeLevel={activeLevel} hideVideo={true} />
      },
      {
        id: 'learning',
        moduleNumber: 'MÓDULO 2',
        title: 'Estándares de Aprendizaje',
        badge: 'ESTÁNDARES DE APRENDIZAJE',
        subTitle: `Resultados e Indicadores para RBD ${establishment.rbd}`,
        icon: BarChart3,
        component: <LearningSection establishment={establishment} activeLevel={activeLevel} />
      },
      {
        id: 'idps',
        moduleNumber: 'MÓDULO 3',
        title: 'Indicadores de Desarrollo Personal y Social (IDPS)',
        badge: 'DESARROLLO PERSONAL Y SOCIAL',
        subTitle: `Resultados e Indicadores para RBD ${establishment.rbd}`,
        icon: Users,
        component: <IdpsSection establishment={establishment} activeLevel={activeLevel} />
      },
      {
        id: 'simce',
        moduleNumber: 'MÓDULO 4',
        title: 'Puntaje y progreso Simce',
        badge: 'EVALUACIÓN Y PROGRESO SIMCE',
        subTitle: `Resultados e Indicadores para RBD ${establishment.rbd}`,
        icon: GraduationCap,
        component: <SimceSection establishment={establishment} activeLevel={activeLevel} />
      }
    ];
  };

  const sectionsList = getSections();

  const ALL_PAGE_SECTIONS = [
    { id: 'sostenedor-distribution', domId: 'sostenedor-distribution' },
    { id: 'search-rbd', domId: 'search-rbd' },
    { id: 'history', domId: 'section-history' },
    { id: 'learning', domId: 'section-learning' },
    { id: 'idps', domId: 'section-idps' },
    { id: 'simce', domId: 'section-simce' }
  ];

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    isManualScrollRef.current = true;

    if (sectionId === 'recursos-comprension') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        isManualScrollRef.current = false;
      }, 500);
      return;
    }

    setTimeout(() => {
      const targetEl = document.getElementById(sectionId) || document.getElementById(`section-${sectionId}`);
      if (targetEl) {
        const stickyHeader = document.getElementById('sticky-header-container');
        const estBar = document.getElementById('establishment-identification-bar');
        const stickyHeaderHeight = stickyHeader ? stickyHeader.offsetHeight : 64;
        const estBarHeight = estBar ? estBar.offsetHeight : 110;
        
        // Si la sección corresponde a un módulo del establecimiento (Historial, Estándares, IDPS, Simce),
        // ambos elementos quedarán fijos arriba.
        const isEstSection = ['history', 'learning', 'idps', 'simce'].includes(sectionId);
        const effectiveHeaderHeight = isEstSection 
          ? (stickyHeaderHeight + estBarHeight + 12)
          : (stickyHeaderHeight + 10);
        
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        // Alineamos exactamente la franja principal de título justo debajo del encabezado fijo
        const offsetPosition = Math.max(0, elementPosition - effectiveHeaderHeight);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (sectionId === 'search-rbd') {
          setTimeout(() => {
            const inputEl = document.getElementById('rbd-search-input') as HTMLInputElement | null;
            if (inputEl) {
              inputEl.focus();
            }
          }, 500);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      isManualScrollRef.current = false;
    }, 60);
  };

  const scrollToTop = () => {
    isManualScrollRef.current = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('sostenedor-distribution');
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY;
        setShowScrollTop(scrollY > 300);

        if (isManualScrollRef.current || activeSection === 'recursos-comprension') return;

        const stickyHeader = document.getElementById('sticky-header-container');
        const estBar = document.getElementById('establishment-identification-bar');
        const stickyHeaderHeight = stickyHeader ? stickyHeader.offsetHeight : 64;
        const estBarHeight = estBar ? estBar.offsetHeight : 110;

        // 1. Si está al final del scroll de la página, activar la última sección
        const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
        if (isAtBottom) {
          setActiveSection('simce');
          return;
        }

        // 2. Si está en el tope superior, activar distribución
        if (scrollY < 60) {
          setActiveSection('sostenedor-distribution');
          return;
        }

        // 3. Evaluar cada sección respecto a la franja de título con umbrales proporcionales
        let activeId = 'sostenedor-distribution';

        for (const sec of ALL_PAGE_SECTIONS) {
          const el = document.getElementById(sec.domId) || document.getElementById(sec.id);
          if (el) {
            const isEstSection = ['history', 'learning', 'idps', 'simce'].includes(sec.id);
            const threshold = isEstSection 
              ? (stickyHeaderHeight + estBarHeight + 85)
              : (stickyHeaderHeight + 85);

            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              activeId = sec.id;
            }
          }
        }

        setActiveSection(activeId);
      });
    };

    // Liberar inmediatamente el bloqueo de desplazamiento si el usuario interactúa manualmente
    const cancelManualScrollLock = () => {
      isManualScrollRef.current = false;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', cancelManualScrollLock, { passive: true });
    window.addEventListener('touchmove', cancelManualScrollLock, { passive: true });
    
    // Verificación inicial
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', cancelManualScrollLock);
      window.removeEventListener('touchmove', cancelManualScrollLock);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.bg }}>
      {/* Mobile menu backdrop overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={handleSelectSection} 
          activeLevel={activeLevel}
          setActiveLevel={setActiveLevel}
          activeSubLevel={activeSubLevel}
          setActiveSubLevel={setActiveSubLevel}
          levels={levels}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 lg:ml-72 flex flex-col min-w-0 transition-all duration-300">
          {/* Sticky Header Container matching reference image */}
          <div 
            id="sticky-header-container"
            className="sticky top-0 z-40 bg-white shadow-xs"
          >
            <Header 
              activeLevel={activeLevel} 
              activeSubLevel={activeSubLevel} 
              establishment={establishment}
              onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onOpenProfiler={() => setIsProfilerOpen(true)}
              currentProfile={currentProfile}
            />
          </div>
        
          {activeSection === 'recursos-comprension' ? (
            <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex-1 w-full space-y-6">
              {/* Barra superior con volver al dashboard */}
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => handleSelectSection('history')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-all hover:border-slate-300 cursor-pointer"
                >
                  <ArrowLeft size={16} className="text-[#004B62]" />
                  <span>Volver al Dashboard de Resultados</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-[#004B62] font-black">Recursos para la comprensión</span>
                </div>
              </div>

              {/* Contenido exacto de Recursos para la comprensión */}
              <RecursosComprensionSection />
            </div>
          ) : (
            <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex-1 w-full">
              <div className="w-full space-y-8 sm:space-y-10">
                {/* Visualización de la distribución de los establecimientos según Categoría de desempeño del sostenedor */}
                <SostenedorDistributionCard 
                  establishment={establishment}
                  onSelectRbd={setSelectedRbd}
                  isActive={activeSection === 'sostenedor-distribution'}
                />

                {/* Buscador de Resultados por RBD situado inmediatamente después */}
                <RbdSearchCard 
                  selectedRbd={selectedRbd}
                  onSelectRbd={setSelectedRbd}
                  isActive={activeSection === 'search-rbd'}
                />

                {/* Identificación del establecimiento antes del Historial de la Categoría de Desempeño (fijo al hacer scroll) */}
                <EstablishmentIdentificationBar 
                  establishment={establishment}
                />

                {/* Render ALL sections continuously stacked with prominent visual card frames as in the design reference */}
                <div className="space-y-10 sm:space-y-14">
                  {sectionsList.map((sec) => {
                    const Icon = sec.icon;
                    const isCurrentActive = activeSection === sec.id;
                    const isHistory = sec.id === 'history';

                    return (
                      <section
                        key={sec.id}
                        id={`section-${sec.id}`}
                        data-section={sec.id}
                        className={`scroll-mt-40 md:scroll-mt-44 lg:scroll-mt-48 transition-all duration-300 ${
                          isHistory ? 'space-y-6 sm:space-y-8' : ''
                        }`}
                      >
                        {/* Video explicativo antes del título de Historial */}
                        {isHistory && <CategoryExplanationVideo />}

                        {/* Outer Card Frame for Data/Results Modules */}
                        <div className={`rounded-2xl sm:rounded-3xl border-2 overflow-hidden transition-all duration-300 shadow-sm ${
                          isCurrentActive 
                            ? 'border-[#0a4352]/40 ring-4 ring-[#0a4352]/10 shadow-md' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}>
                          {/* 1. Top Section Header Banner (Dark Teal) */}
                          <div className="bg-[#0a4352] px-4 sm:px-6 py-3 sm:py-3.5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 shrink-0 shadow-inner">
                                <Icon size={17} />
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-bold text-white tracking-normal">
                                  {sec.title}
                                </h3>
                              </div>
                            </div>
                          </div>

                          {/* 2. Section Content Container */}
                          <div className="p-4 sm:p-6 md:p-8 bg-[#f0f4f8]/90">
                            {sec.component}
                          </div>
                        </div>

                        {/* Explicación de cómo se obtiene la Categoría de Desempeño abajo del historial */}
                        {isHistory && <CategoryCalculationExplanationCard establishment={establishment} />}
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          <footer className="border-t border-slate-200 bg-white mt-12 w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-slate-500 text-xs sm:text-sm font-medium">
              © 2026 Agencia de Calidad de la Educación | Gobierno de Chile
            </div>
          </footer>
        </main>
      </div>

      {/* Floating mobile menu trigger button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-8 left-6 z-40 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-900/30 hover:bg-slate-800 transition-all flex items-center gap-2 font-bold text-xs sm:text-sm"
        title="Abrir menú de navegación"
      >
        <Menu size={20} className="text-orange-500" />
        <span>Menú</span>
      </button>

      {/* Scroll to Top floating button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3.5 sm:px-4 sm:py-3.5 bg-orange-600 text-white rounded-2xl shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all flex items-center gap-2 font-bold text-xs sm:text-sm"
            title="Volver al inicio"
          >
            <ArrowUp size={18} />
            <span className="hidden sm:inline">Volver arriba</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Profiler Modal (2cm margin around dashboard, with category definition + profiler) */}
      <ProfilerModal 
        isOpen={isProfilerOpen}
        onClose={() => setIsProfilerOpen(false)}
        selectedProfile={currentProfile}
        onSelectProfile={(profile) => {
          setCurrentProfile(profile);
          setIsProfilerOpen(false);
        }}
      />
    </div>
  );
}

