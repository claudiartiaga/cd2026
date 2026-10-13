import { LearningLevelData, SimceScore, IDPSData, CategoryHistory } from './types';
import { 
  LEARNING_LEVELS_LECTURA, 
  LEARNING_LEVELS_MATEMATICA, 
  SIMCE_SCORES, 
  IDPS_DATA, 
  CATEGORY_HISTORY 
} from './constants';

export interface EstablishmentInfo {
  rbd: string;
  name: string;
  location: string;
  commune: string;
  type: string;
  dependence: string;
  studentsCount: number;
  socioeconomic: string;
  category: 'Alto' | 'Medio' | 'Medio-Bajo' | 'Insuficiente';
  overallScore: number;
  scoreBasica: number;
  scoreMedia: number;
  learningLectura: LearningLevelData[];
  learningMatematica: LearningLevelData[];
  simceScores: SimceScore[];
  idpsData: IDPSData[];
  categoryHistory: CategoryHistory[];
}

export const ESTABLISHMENTS_LIST: EstablishmentInfo[] = [
  {
    rbd: '12345',
    name: 'LICEO BICENTENARIO DE EXCELENCIA',
    location: 'CARAHUE, AV. LOS LAURELES 450',
    commune: 'Carahue',
    type: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    dependence: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    studentsCount: 620,
    socioeconomic: 'Medio',
    category: 'Alto',
    overallScore: 288,
    scoreBasica: 290,
    scoreMedia: 286,
    learningLectura: [
      { year: '2022', insuficiente: 12, elemental: 30, adecuado: 58 },
      { year: '2023', insuficiente: 11, elemental: 26, adecuado: 63 },
      { year: '2024', insuficiente: 10, elemental: 25, adecuado: 65 },
      { year: '2025', insuficiente: 8, elemental: 25, adecuado: 67 },
    ],
    learningMatematica: [
      { year: '2022', insuficiente: 18, elemental: 36, adecuado: 46 },
      { year: '2023', insuficiente: 15, elemental: 32, adecuado: 53 },
      { year: '2024', insuficiente: 14, elemental: 30, adecuado: 56 },
      { year: '2025', insuficiente: 12, elemental: 29, adecuado: 59 },
    ],
    simceScores: [
      { year: '2023', matematica: 278, lectura: 282 },
      { year: '2024', matematica: 283, lectura: 286 },
      { year: '2025', matematica: 288, lectura: 292 },
    ],
    idpsData: IDPS_DATA.map(d => ({
      ...d,
      establishment: Math.min(95, d.establishment + 8),
      yearlyScores: d.yearlyScores.map(y => ({ ...y, score: Math.min(95, y.score + 8) }))
    })),
    categoryHistory: [
      { year: '2017', category: 'Medio', infoDate: '15 de enero de 2018' },
      { year: '2018', category: 'Medio', infoDate: '12 de diciembre de 2018' },
      { year: '2019', category: 'Alto', infoDate: '26 de diciembre de 2019' },
      { year: '2020', category: 'Alto', infoDate: '15 de enero de 2021' },
      { year: '2026', category: 'Alto', infoDate: 'Informada en diciembre de 2026' },
    ]
  },
  {
    rbd: '67890',
    name: 'ESCUELA RURAL LOS PINOS',
    location: 'SAAVEDRA, CAMINO COSTERO KM 12',
    commune: 'Saavedra',
    type: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    dependence: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    studentsCount: 240,
    socioeconomic: 'Medio bajo',
    category: 'Medio',
    overallScore: 255,
    scoreBasica: 258,
    scoreMedia: 252,
    learningLectura: [
      { year: '2022', insuficiente: 24, elemental: 37, adecuado: 39 },
      { year: '2023', insuficiente: 23, elemental: 30, adecuado: 47 },
      { year: '2024', insuficiente: 21, elemental: 38, adecuado: 41 },
      { year: '2025', insuficiente: 28, elemental: 29, adecuado: 43 },
    ],
    learningMatematica: [
      { year: '2022', insuficiente: 34, elemental: 42, adecuado: 24 },
      { year: '2023', insuficiente: 31, elemental: 36, adecuado: 33 },
      { year: '2024', insuficiente: 29, elemental: 44, adecuado: 27 },
      { year: '2025', insuficiente: 36, elemental: 35, adecuado: 29 },
    ],
    simceScores: [
      { year: '2023', matematica: 260, lectura: 268 },
      { year: '2024', matematica: 252, lectura: 248 },
      { year: '2025', matematica: 270, lectura: 258 },
    ],
    idpsData: IDPS_DATA,
    categoryHistory: [
      { year: '2017', category: 'Medio-Bajo', infoDate: '15 de enero de 2018' },
      { year: '2018', category: 'Medio', infoDate: '12 de diciembre de 2018' },
      { year: '2019', category: 'Medio', infoDate: '26 de diciembre de 2019' },
      { year: '2020', category: 'Medio', infoDate: '15 de enero de 2021' },
      { year: '2026', category: 'Medio', infoDate: 'Informada en diciembre de 2026' },
    ]
  },
  {
    rbd: '11223',
    name: 'COLEGIO INDUSTRIAL SAN JOSÉ',
    location: 'NUEVA IMPERIAL, PRAT 820',
    commune: 'Nueva Imperial',
    type: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    dependence: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    studentsCount: 480,
    socioeconomic: 'Bajo',
    category: 'Medio-Bajo',
    overallScore: 235,
    scoreBasica: 238,
    scoreMedia: 232,
    learningLectura: [
      { year: '2022', insuficiente: 33, elemental: 44, adecuado: 23 },
      { year: '2023', insuficiente: 31, elemental: 42, adecuado: 27 },
      { year: '2024', insuficiente: 30, elemental: 45, adecuado: 25 },
      { year: '2025', insuficiente: 34, elemental: 41, adecuado: 25 },
    ],
    learningMatematica: [
      { year: '2022', insuficiente: 42, elemental: 43, adecuado: 15 },
      { year: '2023', insuficiente: 39, elemental: 41, adecuado: 20 },
      { year: '2024', insuficiente: 38, elemental: 46, adecuado: 16 },
      { year: '2025', insuficiente: 43, elemental: 40, adecuado: 17 },
    ],
    simceScores: [
      { year: '2023', matematica: 238, lectura: 245 },
      { year: '2024', matematica: 230, lectura: 228 },
      { year: '2025', matematica: 242, lectura: 235 },
    ],
    idpsData: IDPS_DATA.map(d => ({
      ...d,
      establishment: Math.max(50, d.establishment - 8),
      yearlyScores: d.yearlyScores.map(y => ({ ...y, score: Math.max(50, y.score - 8) }))
    })),
    categoryHistory: [
      { year: '2017', category: 'Medio-Bajo', infoDate: '15 de enero de 2018' },
      { year: '2018', category: 'Medio-Bajo', infoDate: '12 de diciembre de 2018' },
      { year: '2019', category: 'Medio-Bajo', infoDate: '26 de diciembre de 2019' },
      { year: '2020', category: 'Medio-Bajo', infoDate: '15 de enero de 2021' },
      { year: '2026', category: 'Medio-Bajo', infoDate: 'Informada en diciembre de 2026' },
    ]
  },
  {
    rbd: '14520',
    name: 'LICEO POLITÉCNICO SAN FRANCISCO',
    location: 'TEMUCO, BARROS ARANA 1140',
    commune: 'Temuco',
    type: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    dependence: 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    studentsCount: 310,
    socioeconomic: 'Bajo',
    category: 'Insuficiente',
    overallScore: 212,
    scoreBasica: 215,
    scoreMedia: 209,
    learningLectura: [
      { year: '2022', insuficiente: 46, elemental: 39, adecuado: 15 },
      { year: '2023', insuficiente: 44, elemental: 38, adecuado: 18 },
      { year: '2024', insuficiente: 42, elemental: 41, adecuado: 17 },
      { year: '2025', insuficiente: 48, elemental: 36, adecuado: 16 },
    ],
    learningMatematica: [
      { year: '2022', insuficiente: 54, elemental: 35, adecuado: 11 },
      { year: '2023', insuficiente: 50, elemental: 37, adecuado: 13 },
      { year: '2024', insuficiente: 48, elemental: 40, adecuado: 12 },
      { year: '2025', insuficiente: 53, elemental: 36, adecuado: 11 },
    ],
    simceScores: [
      { year: '2023', matematica: 215, lectura: 224 },
      { year: '2024', matematica: 208, lectura: 202 },
      { year: '2025', matematica: 218, lectura: 212 },
    ],
    idpsData: IDPS_DATA.map(d => ({
      ...d,
      establishment: Math.max(45, d.establishment - 16),
      yearlyScores: d.yearlyScores.map(y => ({ ...y, score: Math.max(45, y.score - 16) }))
    })),
    categoryHistory: [
      { year: '2017', category: 'Medio-Bajo', infoDate: '15 de enero de 2018' },
      { year: '2018', category: 'Insuficiente', infoDate: '12 de diciembre de 2018' },
      { year: '2019', category: 'Insuficiente', infoDate: '26 de diciembre de 2019' },
      { year: '2020', category: 'Insuficiente', infoDate: '15 de enero de 2021' },
      { year: '2026', category: 'Insuficiente', infoDate: 'Informada en diciembre de 2026' },
    ]
  },
  {
    rbd: '360',
    name: 'ESCUELA AGENCIA DE CALIDAD',
    location: 'SANTIAGO, MORANDÉ 360',
    commune: 'Santiago',
    type: 'PÚBLICO',
    dependence: 'Público (SLEP Santiago)',
    studentsCount: 540,
    socioeconomic: 'Medio alto',
    category: 'Medio',
    overallScore: 252,
    scoreBasica: 255,
    scoreMedia: 250,
    learningLectura: LEARNING_LEVELS_LECTURA,
    learningMatematica: LEARNING_LEVELS_MATEMATICA,
    simceScores: SIMCE_SCORES,
    idpsData: IDPS_DATA,
    categoryHistory: CATEGORY_HISTORY
  }
];

// Helper to compute a hash from any arbitrary string
function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const CHILEAN_COMMUNES = [
  'Temuco', 'Carahue', 'Saavedra', 'Nueva Imperial', 'Padre Las Casas', 
  'Santiago', 'Providencia', 'Ñuñoa', 'Valparaíso', 'Viña del Mar', 
  'Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'La Serena', 
  'Coquimbo', 'Antofagasta', 'Iquique', 'Arica', 'Puerto Montt', 
  'Valdivia', 'Osorno', 'Talca', 'Curicó', 'Rancagua', 'Punta Arenas'
];

const SCHOOL_PREFIXES = [
  'COLEGIO', 'LICEO', 'ESCUELA BÁSICA', 'LICEO BICENTENARIO', 
  'COMPLEJO EDUCACIONAL', 'INSTITUTO', 'COLEGIO PARTICULAR'
];

const SCHOOL_NAMES = [
  'GABRIELA MISTRAL', 'PABLO NERUDA', 'SAN JOSÉ', 'SAN FRANCISCO',
  'SANTA MARÍA', 'ARTURO PRAT', 'BERNARDO O\'HIGGINS', 'MANUEL RODRÍGUEZ',
  'LOS ALERCES', 'LOS ANDES', 'DIEGO PORTALES', 'SAN AGUSTÍN',
  'REPÚBLICA DE CHILE', 'PADRE HURTADO', 'LOS ROBLES', 'EL BOSQUE',
  'SANTA ROSA', 'SAN AGUSTÍN', 'PROVIDENCIA', 'LA ARAUCANÍA'
];

/**
 * Dynamically generates a coherent, deterministic, and complete Chilean establishment 
 * record for ANY input string / RBD combination typed by the user.
 */
export function generateDynamicEstablishment(input: string): EstablishmentInfo {
  const clean = input.trim();
  const hash = stringToHash(clean || '12345');
  
  const isNumberOnly = /^\d+$/.test(clean);
  const rbd = clean || '12345';
  
  const communeIndex = hash % CHILEAN_COMMUNES.length;
  const commune = CHILEAN_COMMUNES[communeIndex];

  let schoolName = '';
  if (!isNumberOnly && clean.length > 2) {
    schoolName = clean.toUpperCase();
  } else {
    const prefix = SCHOOL_PREFIXES[hash % SCHOOL_PREFIXES.length];
    const baseName = SCHOOL_NAMES[(hash >> 2) % SCHOOL_NAMES.length];
    schoolName = `${prefix} ${baseName}`;
  }

  // Category determination
  const scoreMod = hash % 100;
  let category: 'Alto' | 'Medio' | 'Medio-Bajo' | 'Insuficiente';
  let overallScore = 250;
  let scoreDelta = 0;
  let socio = 'Medio';

  if (scoreMod >= 75) {
    category = 'Alto';
    overallScore = 280 + (hash % 15);
    scoreDelta = 10;
    socio = (hash % 2 === 0) ? 'Medio alto' : 'Medio';
  } else if (scoreMod >= 40) {
    category = 'Medio';
    overallScore = 248 + (hash % 22);
    scoreDelta = 0;
    socio = (hash % 2 === 0) ? 'Medio' : 'Medio bajo';
  } else if (scoreMod >= 15) {
    category = 'Medio-Bajo';
    overallScore = 228 + (hash % 18);
    scoreDelta = -10;
    socio = (hash % 2 === 0) ? 'Medio bajo' : 'Bajo';
  } else {
    category = 'Insuficiente';
    overallScore = 205 + (hash % 18);
    scoreDelta = -20;
    socio = 'Bajo';
  }

  const scoreBasica = overallScore + ((hash % 7) - 3);
  const scoreMedia = overallScore + (((hash >> 2) % 7) - 3);

  // Generate learning levels Lectura
  const baseAdecuadoL = Math.max(10, Math.min(80, 42 + scoreDelta + (hash % 10)));
  const baseInsufL = Math.max(5, Math.min(60, 28 - scoreDelta - ((hash >> 1) % 8)));
  const baseElemL = Math.max(15, 100 - baseAdecuadoL - baseInsufL);

  const learningLectura: LearningLevelData[] = [
    { 
      year: '2022', 
      insuficiente: Math.round(baseInsufL + 3), 
      elemental: Math.round(baseElemL - 1), 
      adecuado: Math.round(baseAdecuadoL - 2) 
    },
    { 
      year: '2023', 
      insuficiente: Math.round(baseInsufL + 2), 
      elemental: Math.round(baseElemL - 1), 
      adecuado: Math.round(baseAdecuadoL - 1) 
    },
    { 
      year: '2024', 
      insuficiente: Math.round(baseInsufL - 1), 
      elemental: Math.round(baseElemL), 
      adecuado: Math.round(baseAdecuadoL + 1) 
    },
    { 
      year: '2025', 
      insuficiente: Math.round(baseInsufL), 
      elemental: Math.round(baseElemL), 
      adecuado: Math.round(baseAdecuadoL) 
    },
  ];

  // Generate learning levels Matematica
  const baseAdecuadoM = Math.max(8, Math.min(75, 36 + scoreDelta + ((hash >> 2) % 10)));
  const baseInsufM = Math.max(8, Math.min(65, 34 - scoreDelta - ((hash >> 3) % 8)));
  const baseElemM = Math.max(15, 100 - baseAdecuadoM - baseInsufM);

  const learningMatematica: LearningLevelData[] = [
    { 
      year: '2022', 
      insuficiente: Math.round(baseInsufM + 4), 
      elemental: Math.round(baseElemM - 2), 
      adecuado: Math.round(baseAdecuadoM - 2) 
    },
    { 
      year: '2023', 
      insuficiente: Math.round(baseInsufM + 1), 
      elemental: Math.round(baseElemM), 
      adecuado: Math.round(baseAdecuadoM - 1) 
    },
    { 
      year: '2024', 
      insuficiente: Math.round(baseInsufM - 1), 
      elemental: Math.round(baseElemM + 1), 
      adecuado: Math.round(baseAdecuadoM) 
    },
    { 
      year: '2025', 
      insuficiente: Math.round(baseInsufM), 
      elemental: Math.round(baseElemM), 
      adecuado: Math.round(baseAdecuadoM) 
    },
  ];

  // Simce Scores
  const sMat = overallScore + ((hash % 10) - 5);
  const sLec = overallScore + (((hash >> 1) % 10) - 4);
  const simceScores: SimceScore[] = [
    { year: '2023', matematica: sMat - 8, lectura: sLec - 6 },
    { year: '2024', matematica: sMat - 3, lectura: sLec - 2 },
    { year: '2025', matematica: sMat, lectura: sLec },
  ];

  // IDPS Data
  const idpsOffset = Math.round(scoreDelta * 0.45);
  const idpsData: IDPSData[] = IDPS_DATA.map((d, idx) => {
    const customScore = Math.max(45, Math.min(96, d.establishment + idpsOffset + ((hash + idx * 3) % 7) - 3));
    return {
      ...d,
      establishment: customScore,
      yearlyScores: d.yearlyScores.map((y, yIdx) => {
        const yScore = Math.max(45, Math.min(96, customScore + ((yIdx - 1) * 2)));
        return {
          ...y,
          score: yScore
        };
      })
    };
  });

  // Category History
  const historyCategories: ('Alto' | 'Medio' | 'Medio-Bajo' | 'Insuficiente')[] = 
    category === 'Alto' ? ['Medio', 'Medio', 'Alto', 'Alto'] :
    category === 'Medio' ? ['Medio-Bajo', 'Medio', 'Medio', 'Medio'] :
    category === 'Medio-Bajo' ? ['Insuficiente', 'Medio-Bajo', 'Medio-Bajo', 'Medio-Bajo'] :
    ['Insuficiente', 'Insuficiente', 'Medio-Bajo', 'Insuficiente'];

  const categoryHistory: CategoryHistory[] = [
    { year: '2017', category: historyCategories[0], infoDate: '15 de enero de 2018' },
    { year: '2018', category: historyCategories[1], infoDate: '12 de diciembre de 2018' },
    { year: '2019', category: historyCategories[2], infoDate: '26 de diciembre de 2019' },
    { year: '2020', category: historyCategories[3], infoDate: '15 de enero de 2021' },
    { year: '2026', category: category, infoDate: 'Informada en diciembre de 2026' },
  ];

  return {
    rbd,
    name: schoolName,
    location: `${commune.toUpperCase()}, AV. PRINCIPAL ${100 + (hash % 890)}`,
    commune,
    type: (hash % 3 === 0) ? 'PARTICULAR SUBVENCIONADO' : 'Servicio Local de Educación Pública (SLEP) Costa Araucanía',
    dependence: (hash % 3 === 0) ? 'Particular Subvencionado' : `Público (SLEP ${commune})`,
    studentsCount: 150 + (hash % 680),
    socioeconomic: socio,
    category,
    overallScore,
    scoreBasica,
    scoreMedia,
    learningLectura,
    learningMatematica,
    simceScores,
    idpsData,
    categoryHistory
  };
}

export function getEstablishmentByRbd(rbd: string): EstablishmentInfo {
  if (!rbd || !rbd.trim()) {
    return ESTABLISHMENTS_LIST[0];
  }
  const clean = rbd.trim();
  const found = ESTABLISHMENTS_LIST.find(e => e.rbd.toLowerCase() === clean.toLowerCase() || e.name.toLowerCase().includes(clean.toLowerCase()));
  if (found) {
    return found;
  }
  return generateDynamicEstablishment(clean);
}
