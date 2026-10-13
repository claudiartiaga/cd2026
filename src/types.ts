export interface LearningLevelData {
  year: string;
  insuficiente: number;
  elemental: number;
  adecuado: number;
}

export interface SimceScore {
  year: string;
  matematica: number;
  lectura: number;
}

export interface IDPSDimensionHistory {
  name: string;
  scores: { year: string; score: number }[];
}

export interface IDPSData {
  name: string;
  establishment: number;
  national: number;
  description: string;
  methodology: string;
  yearlyScores: { year: string; score: number }[];
  dimensionsYearly: {
    name: string;
    scores: { year: string; score: number }[];
  }[];
  dimensions?: {
    name: string;
    score: number;
  }[];
  historyTables?: {
    title: string;
    years: string[];
    rows: {
      label: string;
      values: (number | string)[];
    }[];
  }[];
}

export interface CategoryHistory {
  year: string;
  category: string;
  infoDate: string;
  calculationBasis?: string;
}
