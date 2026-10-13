import { LearningLevelData, SimceScore, IDPSData, CategoryHistory } from './types';

export const ESTABLISHMENT_INFO = {
  name: "ESCUELA AGENCIA DE CALIDAD",
  location: "SANTIAGO, MORANDÉ",
  rbd: "360",
  type: "PÚBLICO",
  socioeconomic: "Medio alto",
  categories: {
    basica: "MEDIO",
    media: "MEDIO"
  }
};

export const LEARNING_LEVELS_LECTURA: LearningLevelData[] = [
  { year: '2022', insuficiente: 25, elemental: 37, adecuado: 38 },
  { year: '2023', insuficiente: 24, elemental: 29, adecuado: 47 },
  { year: '2024', insuficiente: 23, elemental: 39, adecuado: 38 },
  { year: '2025', insuficiente: 31, elemental: 29, adecuado: 40 },
];

export const LEARNING_LEVELS_MATEMATICA: LearningLevelData[] = [
  { year: '2022', insuficiente: 35, elemental: 43, adecuado: 22 },
  { year: '2023', insuficiente: 33, elemental: 35, adecuado: 32 },
  { year: '2024', insuficiente: 31, elemental: 45, adecuado: 24 },
  { year: '2025', insuficiente: 39, elemental: 35, adecuado: 26 },
];

export const SIMCE_SCORES: SimceScore[] = [
  { year: '2023', matematica: 264, lectura: 273 },
  { year: '2024', matematica: 255, lectura: 250 },
  { year: '2025', matematica: 274, lectura: 255 },
];

export const IDPS_DATA: IDPSData[] = [
  { 
    name: "Autoestima académica y motivación escolar", 
    establishment: 76, 
    national: 75,
    description: "El indicador considera la percepción de los y las estudiantes sobre su propia capacidad para aprender e interés por las actividades del colegio, junto con las acciones que realizan sus docentes para fomentar una buena autoestima y motivación escolar.",
    methodology: "Se consideran los resultados de cada año (2023, 2024 y 2025), para 4° básico.",
    yearlyScores: [
      { year: "2023", score: 69 },
      { year: "2024", score: 74 },
      { year: "2025", score: 76 }
    ],
    dimensionsYearly: [
      {
        name: "Autopercepción y autovaloración académica",
        scores: [
          { year: "2023", score: 66 },
          { year: "2024", score: 70 },
          { year: "2025", score: 74 }
        ]
      },
      {
        name: "Motivación escolar",
        scores: [
          { year: "2023", score: 72 },
          { year: "2024", score: 77 },
          { year: "2025", score: 78 }
        ]
      }
    ],
    dimensions: [
      { name: "Autopercepción y autovaloración académica", score: 74 },
      { name: "Motivación escolar", score: 78 }
    ]
  },
  { 
    name: "Clima de convivencia escolar", 
    establishment: 60, 
    national: 75,
    description: "Mide las percepciones que tienen los estudiantes, docentes y padres y apoderados sobre el ambiente de respeto, organización y seguridad en el establecimiento.",
    methodology: "Se calcula a partir de las respuestas de estudiantes, docentes y padres/apoderados en los Cuestionarios de Calidad y Contexto de la Educación (SIMCE).",
    yearlyScores: [
      { year: "2023", score: 56 },
      { year: "2024", score: 58 },
      { year: "2025", score: 60 }
    ],
    dimensionsYearly: [
      {
        name: "Ambiente de respeto",
        scores: [
          { year: "2023", score: 54 },
          { year: "2024", score: 56 },
          { year: "2025", score: 58 }
        ]
      },
      {
        name: "Ambiente de organización",
        scores: [
          { year: "2023", score: 58 },
          { year: "2024", score: 60 },
          { year: "2025", score: 62 }
        ]
      },
      {
        name: "Ambiente de seguridad",
        scores: [
          { year: "2023", score: 56 },
          { year: "2024", score: 58 },
          { year: "2025", score: 60 }
        ]
      }
    ],
    dimensions: [
      { name: "Ambiente de respeto", score: 58 },
      { name: "Ambiente de organización", score: 62 },
      { name: "Ambiente de seguridad", score: 60 }
    ]
  },
  { 
    name: "Participación y formación ciudadana", 
    establishment: 77, 
    national: 77,
    description: "Evalúa el grado en que los estudiantes se involucran en las actividades del establecimiento y la promoción de la vida democrática.",
    methodology: "Información recopilada mediante cuestionarios aplicados a la comunidad educativa (estudiantes, docentes y apoderados) en el marco de la evaluación SIMCE.",
    yearlyScores: [
      { year: "2023", score: 73 },
      { year: "2024", score: 75 },
      { year: "2025", score: 77 }
    ],
    dimensionsYearly: [
      {
        name: "Sentido de pertenencia",
        scores: [
          { year: "2023", score: 71 },
          { year: "2024", score: 73 },
          { year: "2025", score: 75 }
        ]
      },
      {
        name: "Participación",
        scores: [
          { year: "2023", score: 76 },
          { year: "2024", score: 78 },
          { year: "2025", score: 80 }
        ]
      },
      {
        name: "Vida democrática",
        scores: [
          { year: "2023", score: 74 },
          { year: "2024", score: 76 },
          { year: "2025", score: 78 }
        ]
      }
    ],
    dimensions: [
      { name: "Sentido de pertenencia", score: 75 },
      { name: "Participación", score: 80 },
      { name: "Vida democrática", score: 78 }
    ]
  },
  { 
    name: "Hábitos de vida saludable", 
    establishment: 72, 
    national: 70,
    description: "Mide las percepciones y actitudes de los estudiantes sobre la alimentación saludable, la actividad física y el autocuidado.",
    methodology: "Resultados derivados de los Cuestionarios de Calidad y Contexto aplicados a estudiantes, docentes y padres/apoderados durante las pruebas SIMCE.",
    yearlyScores: [
      { year: "2023", score: 68 },
      { year: "2024", score: 70 },
      { year: "2025", score: 72 }
    ],
    dimensionsYearly: [
      {
        name: "Vida activa",
        scores: [
          { year: "2023", score: 66 },
          { year: "2024", score: 68 },
          { year: "2025", score: 70 }
        ]
      },
      {
        name: "Alimentación saludable",
        scores: [
          { year: "2023", score: 71 },
          { year: "2024", score: 73 },
          { year: "2025", score: 75 }
        ]
      },
      {
        name: "Autocuidado",
        scores: [
          { year: "2023", score: 67 },
          { year: "2024", score: 69 },
          { year: "2025", score: 71 }
        ]
      }
    ],
    dimensions: [
      { name: "Vida activa", score: 70 },
      { name: "Alimentación saludable", score: 75 },
      { name: "Autocuidado", score: 71 }
    ]
  },
  { 
    name: "Asistencia escolar", 
    establishment: 65, 
    national: 64,
    description: "Mide la asistencia promedio de los estudiantes al establecimiento educacional.",
    methodology: "Se consideran los resultados de cada año (2023, 2024 y 2025), para 4° básico.",
    yearlyScores: [
      { year: "2023", score: 61 },
      { year: "2024", score: 63 },
      { year: "2025", score: 65 }
    ],
    dimensionsYearly: [
      {
        name: "Asistencia destacada",
        scores: [
          { year: "2023", score: 41 },
          { year: "2024", score: 43 },
          { year: "2025", score: 45 }
        ]
      },
      {
        name: "Asistencia normal",
        scores: [
          { year: "2023", score: 22 },
          { year: "2024", score: 23 },
          { year: "2025", score: 23 }
        ]
      },
      {
        name: "Inasistencia reiterada",
        scores: [
          { year: "2023", score: 22 },
          { year: "2024", score: 21 },
          { year: "2025", score: 20 }
        ]
      },
      {
        name: "Inasistencia grave",
        scores: [
          { year: "2023", score: 15 },
          { year: "2024", score: 13 },
          { year: "2025", score: 12 }
        ]
      }
    ],
    dimensions: [
      { name: "Asistencia destacada", score: 45 },
      { name: "Asistencia normal", score: 23 },
      { name: "Inasistencia reiterada", score: 20 },
      { name: "Inasistencia grave", score: 12 }
    ]
  },
  { 
    name: "Equidad de género en aprendizajes", 
    establishment: 84, 
    national: 79,
    description: "Evalúa la inexistencia de brechas injustificadas de género en los resultados de aprendizaje y desarrollo integral, garantizando igualdad de oportunidades y logros educativos para mujeres y hombres.",
    methodology: "Calculado a partir de la comparación de resultados y distribución de niveles de aprendizaje entre estudiantes mujeres y hombres en las evaluaciones y cuestionarios SIMCE.",
    yearlyScores: [
      { year: "2023", score: 80 },
      { year: "2024", score: 82 },
      { year: "2025", score: 84 }
    ],
    dimensionsYearly: [
      {
        name: "Equidad en logros de aprendizaje",
        scores: [
          { year: "2023", score: 81 },
          { year: "2024", score: 83 },
          { year: "2025", score: 85 }
        ]
      },
      {
        name: "Equidad en autovaloración y motivación",
        scores: [
          { year: "2023", score: 79 },
          { year: "2024", score: 81 },
          { year: "2025", score: 83 }
        ]
      }
    ],
    dimensions: [
      { name: "Equidad en logros de aprendizaje", score: 85 },
      { name: "Equidad en autovaloración y motivación", score: 83 }
    ]
  },
  { 
    name: "Permanencia escolar", 
    establishment: 92, 
    national: 88,
    description: "Mide la capacidad del establecimiento para mantener a sus estudiantes dentro del sistema escolar.",
    methodology: "Calculado por el Ministerio de Educación analizando la continuidad de la matrícula de los estudiantes entre dos años escolares consecutivos.",
    yearlyScores: [
      { year: "2023", score: 88 },
      { year: "2024", score: 90 },
      { year: "2025", score: 92 }
    ],
    dimensionsYearly: [
      {
        name: "Tasa de permanencia escolar",
        scores: [
          { year: "2023", score: 88 },
          { year: "2024", score: 90 },
          { year: "2025", score: 92 }
        ]
      }
    ],
    dimensions: [
      { name: "Tasa de permanencia escolar", score: 92 }
    ]
  },
  { 
    name: "Titulación técnico profesional", 
    establishment: 87, 
    national: 81,
    description: "Para obtener este indicador, se evalúa la proporción de estudiantes que, habiendo egresado de Educación Media Técnico-Profesional, obtienen oportunamente su título de técnico de nivel medio dentro de los plazos reglamentarios establecidos por el Mineduc.",
    methodology: "Obtenido a partir de los registros oficiales del Ministerio de Educación sobre matrícula, egreso, titulación y seguimiento de inserción laboral o continuidad en educación superior.",
    yearlyScores: [
      { year: "2023", score: 81 },
      { year: "2024", score: 84 },
      { year: "2025", score: 87 }
    ],
    dimensionsYearly: [
      {
        name: "Tasa de titulación técnico profesional",
        scores: [
          { year: "2023", score: 81 },
          { year: "2024", score: 84 },
          { year: "2025", score: 87 }
        ]
      }
    ],
    dimensions: [
      { name: "Tasa de titulación técnico profesional", score: 87 }
    ]
  },
];

export const CATEGORY_HISTORY: CategoryHistory[] = [
  { year: '2017', category: 'Medio', infoDate: '15 de enero de 2018' },
  { year: '2018', category: 'Medio', infoDate: '12 de diciembre de 2018' },
  { year: '2019', category: 'Medio', infoDate: '26 de diciembre de 2019' },
  { year: '2020', category: 'Medio', infoDate: '15 de enero de 2021' },
  { year: '2026', category: 'Medio', infoDate: 'Informada en diciembre de 2026' },
];

export const CATEGORY_COLORS = {
  alto: '#0C4581',
  medio: '#1a7a9a',
  medioBajo: '#0F69C4',
  insuficiente: 'var(--sp-secondary, #eb465f)',
};

export const COLORS = {
  insuficiente: 'var(--sp-secondary, #eb465f)',
  elemental: '#e65100',
  adecuado: '#00838f',
  sidebar: '#004B62',
  primary: '#004B62',
  accent: '#F04C28',
  accentHover: '#D83E1C',
  primaryHover: '#003748',
  bg: '#f8fafc',
  white: '#ffffff',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  categoryAlto: '#0C4581',
  categoryMedio: '#1a7a9a',
  categoryMedioBajo: '#0F69C4',
  categoryInsuficiente: 'var(--sp-secondary, #eb465f)',
};
