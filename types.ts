
export interface AnalysisResult {
  signal: 'CALL' | 'PUT';
  confidence: number;
  reasoning: string;
}
