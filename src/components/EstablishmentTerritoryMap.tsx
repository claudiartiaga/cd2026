import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Crosshair, 
  HelpCircle, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft,
  School,
  Maximize2
} from 'lucide-react';
import { EstablishmentInfo } from '../establishmentData';
import { SostenedorSchool, OFFICIAL_CATEGORY_COLORS } from '../sostenedorData';

export const CHILE_COMMUNES_GEO: Record<string, { lat: number; lng: number; region: string }> = {
  // Araucanía
  'Carahue': { lat: -38.7112, lng: -73.1667, region: 'Región de La Araucanía' },
  'Saavedra': { lat: -38.7892, lng: -73.3939, region: 'Región de La Araucanía' },
  'Puerto Saavedra': { lat: -38.7892, lng: -73.3939, region: 'Región de La Araucanía' },
  'Nueva Imperial': { lat: -38.7431, lng: -72.9508, region: 'Región de La Araucanía' },
  'Toltén': { lat: -39.1983, lng: -73.2275, region: 'Región de La Araucanía' },
  'Teodoro Schmidt': { lat: -38.9950, lng: -73.0531, region: 'Región de La Araucanía' },
  'Temuco': { lat: -38.7359, lng: -72.5904, region: 'Región de La Araucanía' },
  'Padre Las Casas': { lat: -38.7562, lng: -72.5992, region: 'Región de La Araucanía' },
  'Villarrica': { lat: -39.2858, lng: -72.2281, region: 'Región de La Araucanía' },
  'Pucón': { lat: -39.2789, lng: -71.9744, region: 'Región de La Araucanía' },
  'Angol': { lat: -37.7997, lng: -72.7161, region: 'Región de La Araucanía' },

  // Metropolitana
  'Santiago': { lat: -33.4489, lng: -70.6693, region: 'Región Metropolitana de Santiago' },
  'Providencia': { lat: -33.4314, lng: -70.6093, region: 'Región Metropolitana de Santiago' },
  'Las Condes': { lat: -33.4117, lng: -70.5794, region: 'Región Metropolitana de Santiago' },
  'Ñuñoa': { lat: -33.4569, lng: -70.6036, region: 'Región Metropolitana de Santiago' },
  'La Florida': { lat: -33.5227, lng: -70.5983, region: 'Región Metropolitana de Santiago' },
  'Maipú': { lat: -33.5111, lng: -70.7581, region: 'Región Metropolitana de Santiago' },
  'Puente Alto': { lat: -33.6117, lng: -70.5758, region: 'Región Metropolitana de Santiago' },

  // Valparaíso
  'Valparaíso': { lat: -33.0472, lng: -71.6127, region: 'Región de Valparaíso' },
  'Viña del Mar': { lat: -33.0245, lng: -71.5518, region: 'Región de Valparaíso' },

  // Biobío
  'Concepción': { lat: -36.8201, lng: -73.0444, region: 'Región del Biobío' },
  'Talcahuano': { lat: -36.7249, lng: -73.1168, region: 'Región del Biobío' },
  'Los Ángeles': { lat: -37.4697, lng: -72.3537, region: 'Región del Biobío' },

  // Los Lagos
  'Puerto Montt': { lat: -41.4693, lng: -72.9424, region: 'Región de Los Lagos' },
  'Osorno': { lat: -40.5739, lng: -73.1335, region: 'Región de Los Lagos' },

  // Norte
  'Antofagasta': { lat: -23.6509, lng: -70.3975, region: 'Región de Antofagasta' },
  'La Serena': { lat: -29.9027, lng: -71.2519, region: 'Región de Coquimbo' },
  'Arica': { lat: -18.4783, lng: -70.3126, region: 'Región de Arica y Parinacota' },
  'Iquique': { lat: -20.2307, lng: -70.1357, region: 'Región de Tarapacá' }
};

interface EstablishmentTerritoryMapProps {
  establishment: EstablishmentInfo;
  selectedCategory: 'Alto' | 'Medio' | 'Medio-Bajo' | 'Insuficiente';
  schools: SostenedorSchool[];
  sostenedorName: string;
  onSelectRbd?: (rbd: string) => void;
}

export default function EstablishmentTerritoryMap({
  establishment,
  selectedCategory,
  schools,
  sostenedorName,
  onSelectRbd
}: EstablishmentTerritoryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const circleLayerRef = useRef<L.Circle | null>(null);

  const [showStatsPanel, setShowStatsPanel] = useState<boolean>(true);
  const [showHelpTooltip, setShowHelpTooltip] = useState<boolean>(false);
  const [activeSchoolRbd, setActiveSchoolRbd] = useState<string>(establishment.rbd);

  // Default geo based on establishment commune
  const defaultGeo = CHILE_COMMUNES_GEO[establishment.commune] || {
    lat: -38.7112,
    lng: -73.1667,
    region: 'Región de La Araucanía'
  };

  // Only show schools that correspond to the selected performance category
  const schoolsToPlot = useMemo(() => {
    return schools.filter(s => s.category === selectedCategory);
  }, [schools, selectedCategory]);

  // Center coordinate based on schools in selected category or establishment
  const centerCoord = useMemo(() => {
    if (establishment.category === selectedCategory) {
      return [defaultGeo.lat, defaultGeo.lng] as [number, number];
    }
    if (schoolsToPlot.length > 0) {
      const firstSchoolGeo = CHILE_COMMUNES_GEO[schoolsToPlot[0].commune] || defaultGeo;
      return [firstSchoolGeo.lat, firstSchoolGeo.lng] as [number, number];
    }
    return [defaultGeo.lat, defaultGeo.lng] as [number, number];
  }, [selectedCategory, establishment, schoolsToPlot, defaultGeo]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: centerCoord,
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Standard OpenStreetMap tiles - reliable, free, zero watermarks
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 4
      }).addTo(map);

      // Attribution small and clean
      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution('&copy; OpenStreetMap &copy; Agencia de Calidad')
        .addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Recenter map when centerCoord or schoolsToPlot change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (schoolsToPlot.length > 0) {
      const bounds = L.latLngBounds([]);
      schoolsToPlot.forEach(s => {
        const geo = CHILE_COMMUNES_GEO[s.commune] || defaultGeo;
        bounds.extend([geo.lat, geo.lng]);
      });
      map.flyToBounds(bounds.pad(0.35), { duration: 1.2, maxZoom: 12 });
    } else {
      map.flyTo(centerCoord, 11, { duration: 1.2 });
    }
  }, [centerCoord, schoolsToPlot, defaultGeo]);

  // Update Markers and Commune Polygon/Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current) return;

    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    // 1. Draw Commune Area Highlight (Translucent blue/teal disk with dashed border)
    if (circleLayerRef.current) {
      circleLayerRef.current.remove();
    }
    const circle = L.circle(centerCoord, {
      radius: 6500,
      color: '#0a4352',
      weight: 2,
      dashArray: '5, 5',
      fillColor: '#0a4352',
      fillOpacity: 0.12
    }).addTo(map);
    circleLayerRef.current = circle;

    // 2. Plot ONLY establishments that correspond to selectedCategory
    schoolsToPlot.forEach((school) => {
      const isCurrentSchool = school.rbd === establishment.rbd;
      const schoolCommuneGeo = CHILE_COMMUNES_GEO[school.commune] || defaultGeo;
      
      // Deterministic slight offset for multiple schools in the same commune
      const rbdNum = parseInt(school.rbd.replace(/\D/g, '') || '12345', 10);
      const angle = (rbdNum % 12) * (Math.PI / 6);
      const distance = isCurrentSchool ? 0 : 0.008 + ((rbdNum % 5) * 0.006);
      
      const lat = schoolCommuneGeo.lat + Math.sin(angle) * distance;
      const lng = schoolCommuneGeo.lng + Math.cos(angle) * distance;

      const catColor = OFFICIAL_CATEGORY_COLORS[school.category] || '#0C4581';

      // Custom HTML Marker using L.divIcon
      const markerHtml = isCurrentSchool ? `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <span class="absolute w-12 h-12 rounded-full bg-[#0a4352]/30 animate-ping pointer-events-none"></span>
          <span class="absolute w-10 h-10 rounded-full bg-[#0a4352]/20 pointer-events-none"></span>
          <div class="relative w-9 h-9 rounded-full bg-[#0a4352] border-3 border-white shadow-xl flex items-center justify-center text-white ring-2 ring-[#0a4352]/50 transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="absolute -top-7 whitespace-nowrap bg-[#0a4352] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md border border-white/40 pointer-events-none">
            ⭐ Tu Establecimiento
          </div>
        </div>
      ` : `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <div class="w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white transition-all group-hover:scale-125" style="background-color: ${catColor};">
            <span class="w-2 h-2 rounded-full bg-white"></span>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: isCurrentSchool ? [40, 40] : [24, 24],
        iconAnchor: isCurrentSchool ? [20, 20] : [12, 12]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(markersGroup);

      // Popup Content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-3 font-sans text-slate-800 text-left min-w-[200px] max-w-[260px]';
      popupContent.innerHTML = `
        <div class="flex items-center gap-1.5 mb-1">
          <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white" style="background-color: ${catColor};">
            ${school.category}
          </span>
          <span class="text-[11px] font-bold text-slate-500">RBD ${school.rbd}</span>
        </div>
        <h5 class="text-xs font-black text-slate-900 leading-snug mb-1">
          ${school.name}
        </h5>
        <div class="text-[11px] text-slate-600 mb-2">
          📍 ${school.commune} • 👥 ${school.matricula.toLocaleString('es-CL')} estudiantes
        </div>
        ${isCurrentSchool ? `
          <div class="text-[10px] font-extrabold text-[#0a4352] bg-[#0a4352]/10 px-2 py-1 rounded text-center">
            📍 Establecimiento seleccionado actualmente
          </div>
        ` : `
          <button id="btn-select-${school.rbd}" class="w-full text-center text-xs font-bold text-white bg-[#0a4352] hover:bg-[#003444] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">
            Ver resultados de este colegio
          </button>
        `}
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'custom-school-popup'
      });

      marker.on('click', () => {
        setActiveSchoolRbd(school.rbd);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${school.rbd}`);
        if (btn && onSelectRbd) {
          btn.onclick = () => {
            onSelectRbd(school.rbd);
          };
        }
      });
    });
  }, [schoolsToPlot, centerCoord, establishment, onSelectRbd, defaultGeo]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    const geo = CHILE_COMMUNES_GEO[establishment.commune] || defaultGeo;
    mapInstanceRef.current?.flyTo([geo.lat, geo.lng], 12, { duration: 1.2 });
  };

  const activeSchool = schoolsToPlot.find(s => s.rbd === activeSchoolRbd) || (
    schoolsToPlot.length > 0 ? schoolsToPlot[0] : {
      rbd: establishment.rbd,
      name: establishment.name,
      commune: establishment.commune,
      category: establishment.category || 'Alto',
      matricula: establishment.studentsCount
    }
  );

  return (
    <div className="lg:col-span-7 flex flex-col h-full bg-slate-50/70 border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
      
      {/* 1. Header institucional (Resultados por comuna) */}
      <div className="bg-[#0a4352] px-4 sm:px-5 py-3 text-white flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
              Resultados por comuna
            </h3>
            <span className="text-[11px] text-white/80 font-medium">
              Establecimientos en Categoría {selectedCategory} ({schoolsToPlot.length})
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowHelpTooltip(!showHelpTooltip)}
            className="w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Ayuda sobre el mapa territorial"
          >
            <HelpCircle size={17} />
          </button>

          {showHelpTooltip && (
            <div className="absolute right-0 top-9 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-50 border border-slate-700 animate-in fade-in">
              <p className="font-semibold leading-relaxed">
                Este mapa identifica la ubicación territorial de los establecimientos pertenecientes a la Categoría de Desempeño <strong>{selectedCategory}</strong> ({sostenedorName}).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Contenedor del Mapa con Controles Flotantes y Panel Lateral */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[420px] w-full overflow-hidden bg-slate-100">
        
        {/* Contenedor del Mapa Leaflet */}
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Controles Flotantes Izquierda: Zoom (+ / -) y Centrar */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <div className="bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200/90 overflow-hidden flex flex-col">
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors border-b border-slate-100 cursor-pointer"
              title="Acercar mapa"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              title="Alejar mapa"
            >
              −
            </button>
          </div>

          <button
            type="button"
            onClick={handleRecenter}
            className="w-8 h-8 bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200/90 flex items-center justify-center text-[#0a4352] hover:bg-[#0a4352] hover:text-white transition-colors cursor-pointer"
            title="Centrar en mi establecimiento"
          >
            <Crosshair size={16} />
          </button>
        </div>

        {/* Indicador Flotante Superior: Establecimiento identificado */}
        <div className="absolute top-3 left-14 z-10 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-sm max-w-[280px]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0a4352] shrink-0 animate-pulse" />
          <div className="text-[11px] truncate">
            <span className="font-extrabold text-slate-800 block truncate">
              {establishment.name}
            </span>
            <span className="text-slate-500 font-medium">
              RBD {establishment.rbd} • {establishment.commune}
            </span>
          </div>
        </div>

        {/* Botón flotante para mostrar/ocultar Panel Lateral */}
        <button
          type="button"
          onClick={() => setShowStatsPanel(!showStatsPanel)}
          className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-xs hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded-xl shadow-md border border-slate-200/90 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
        >
          <TrendingUp size={14} className="text-[#0a4352]" />
          <span className="hidden sm:inline">{showStatsPanel ? 'Ocultar datos' : 'Ver datos'}</span>
          {showStatsPanel ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* 4. Panel Flotante Lateral de Estadísticas (Ficha Territorial como la imagen de referencia) */}
        {showStatsPanel && (
          <div className="absolute bottom-3 right-3 sm:top-14 sm:bottom-auto w-[calc(100%-24px)] sm:w-64 max-h-[320px] overflow-y-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/90 z-20 transition-all">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <School size={13} className="text-[#0a4352]" />
                Ficha Territorial
              </span>
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shadow-2xs"
                style={{ backgroundColor: OFFICIAL_CATEGORY_COLORS[activeSchool.category] || '#0C4581' }}
              >
                {activeSchool.category}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <h4 className="font-black text-slate-900 leading-snug line-clamp-2">
                  {activeSchool.name}
                </h4>
                <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>RBD {activeSchool.rbd}</span>
                  <span>•</span>
                  <span>{activeSchool.commune}</span>
                </div>
              </div>

              {/* Comparativa Comuna vs Nacional (como en imagen 2) */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#0a4352]"></span>
                    Puntaje Comuna:
                  </span>
                  <span className="font-black text-slate-900">288 pts</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#eb465f]"></span>
                    Puntaje Nacional:
                  </span>
                  <span className="font-black text-slate-900">272 pts</span>
                </div>

                {/* Barra de niveles comunal (Insuficiente, Elemental, Adecuado como imagen 2) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500">
                    <span>Distribución comunal</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-3 rounded-md overflow-hidden flex bg-slate-200">
                    <div className="bg-[#003D52] h-full" style={{ width: '12%' }} title="Insuficiente 12%" />
                    <div className="bg-[#E04828] h-full" style={{ width: '28%' }} title="Elemental 28%" />
                    <div className="bg-[#0A7B94] h-full" style={{ width: '60%' }} title="Adecuado 60%" />
                  </div>
                  <div className="flex justify-between text-[9px] font-black text-slate-500 pt-0.5">
                    <span className="text-[#003D52]">Insuf. 12%</span>
                    <span className="text-[#E04828]">Elem. 28%</span>
                    <span className="text-[#0A7B94]">Adec. 60%</span>
                  </div>
                </div>
              </div>

              {/* Botón de acción si no es el actual */}
              {activeSchool.rbd !== establishment.rbd && onSelectRbd && (
                <button
                  type="button"
                  onClick={() => onSelectRbd(activeSchool.rbd)}
                  className="w-full mt-2 text-center text-xs font-bold text-white bg-[#0a4352] hover:bg-[#003444] px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Cargar resultados de este colegio
                </button>
              )}

            </div>

          </div>
        )}

      </div>

      {/* 5. Pie de mapa con leyenda territorial y contexto de sostenedor */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-3 h-3 rounded-full bg-[#0a4352] border border-white shadow-xs shrink-0" />
            <span className="text-slate-800 font-extrabold">Tu Establecimiento</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            <span 
              className="w-2.5 h-2.5 rounded-full shrink-0" 
              style={{ backgroundColor: OFFICIAL_CATEGORY_COLORS[selectedCategory] || '#0C4581' }} 
            />
            <span className="text-slate-700">Colegios en {selectedCategory} ({schools.length})</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 font-medium truncate max-w-xs">
          {sostenedorName}
        </div>
      </div>

    </div>
  );
}
