
export interface FeedbackItem {
  section: string;
  rating: 'Good' | 'Fair' | 'Needs Improvement';
  comment: string;
}

export interface ImprovedBullet {
  original: string;
  improved: string;
  reason: string;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  feedback: FeedbackItem[];
  improvedBullets: ImprovedBullet[];
  missingSections: string[];
  atsTips: string[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
