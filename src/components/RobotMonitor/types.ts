
export interface SecurityData {
  secure: boolean;
  vulnerabilities: string[];
  totalDomains: number;
  runningDomains: number;
  isolationScore: number;
  overallSecurityLevel: number;
  systemIntegrity: number;
}

export interface IntegrityData {
  integrity: string;
  threats: string[];
  success: boolean;
}

export interface ScoreData {
  score: number;
  issues: string[];
}

export interface MonitorFunction {
  (): SecurityData;
}
