
export interface SignalAnalysisCapabilities {
  active: boolean;
  version: string;
  frequencyRanges: string[];
  signalTypes: string[];
  modulationSchemes: string[];
  scanningActive: boolean;
  realtimeAnalysis: boolean;
  detectedSignals: {
    count: number;
    classified: number;
    encrypted: number;
    anomalous: number;
  };
  spectrumAnalysis: {
    resolution: number;
    sensitivity: number;
    bandwidthCoverage: number;
  };
  signalProcessing: {
    fftSize: number;
    samplingRate: number;
    windowFunctions: string[];
  };
  demodulationCapabilities: string[];
  encryptionAnalysis: {
    protocols: string[];
    successRate: number;
  };
  patternRecognition: {
    trained: boolean;
    accuracy: number;
    knownPatterns: number;
  };
  interferenceDetection: boolean;
  anomalyDetection: {
    enabled: boolean;
    sensitivity: number;
    detectedAnomalies: number;
  };
}
