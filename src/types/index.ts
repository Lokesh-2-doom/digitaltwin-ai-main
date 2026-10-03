export type ShopArea = 'BODY' | 'PAINT' | 'ASSEMBLY';

export type StationStatus = 'normal' | 'watch' | 'inferred' | 'warning' | 'critical' | 'offline';

export type SensorSourceType = 'MEASURED' | 'AI-INFERRED' | 'UNAVAILABLE';

export interface StationTelemetry {
  id: string;
  code: string;
  name: string;
  area: ShopArea;
  posX: number;
  taktTime: number;
  cycleTimeActual: number;
  cycleTimeStd: number;
  wipBuffer: number;
  maxBuffer: number;
  temperature: number;
  vibration: number;
  torque: number;
  qualityScore: number;
  throughput: number;
  status: StationStatus;
  bottleneckRisk: number;
  defectRisk: number;
  anomalyScore: number;
  timeToBottleneck?: number | null;
  confidence?: number;
  sensorSources: {
    cycle_time: SensorSourceType;
    wip: SensorSourceType;
    vibration: SensorSourceType;
    temperature: SensorSourceType;
    torque: SensorSourceType;
  };
  aiDiagnosis?: string;
  recommendation?: {
    problemSummary: string;
    likelyCause: string;
    expectedImpact: string;
    prescriptiveActions: string[];
    workflowActions: string[];
  };
}

export interface PredictionItem {
  stationId: string;
  stationName: string;
  area: ShopArea;
  bottleneckRisk: number;
  defectRisk: number;
  estimatedTimeMinutes: number;
  confidence: number;
  contributingFactors: string[];
  upstreamPressure: 'HIGH' | 'NOMINAL' | 'LOW';
  downstreamStarvationRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: {
    problemSummary: string;
    likelyCause: string;
    expectedImpact: string;
    prescriptiveActions: string[];
    workflowActions: string[];
  };
}

export interface PropagationPath {
  rootCauseStation: string;
  intermediateStations: string[];
  targetBottleneckStation: string;
  propagationLeadMinutes: number;
  flowSequence: string[];
}

export interface DataQualityReport {
  total_rows: number;
  total_cols: number;
  detected_stations: number;
  missing_cells: number;
  missing_percentage: number;
  duplicate_rows: number;
  time_range: string;
  sensor_coverage_pct: number;
  quality_status: 'GOOD' | 'ACCEPTABLE' | 'POOR';
  mapped_variables: Record<string, string>;
}

export interface ModelValidationMetrics {
  mode: 'SUPERVISED_DEFECT_CLASSIFIER' | 'UNSUPERVISED_PROCESS_QUALITY_MODE';
  model_type?: string;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  roc_auc?: number;
  confusion_matrix?: number[][];
  feature_importance?: Record<string, number>;
  false_positive_rate?: number;
  false_negative_rate?: number;
  note?: string;
  precision_estimate?: string;
  average_warning_lead_time?: string;
  false_alarm_suppression_rate?: string;
}

export interface VirtualSensorInferenceRecord {
  station_id: string;
  signal: string;
  status: 'AI-INFERRED';
  confidence: number;
  method: string;
  source_features: string[];
}

export interface AnalysisResult {
  datasetName: string;
  qualityReport: DataQualityReport;
  lineHealth: number;
  anomaliesCount: number;
  predictedBottlenecksCount: number;
  qualityRisksCount: number;
  sensorGapsCount: number;
  stations: StationTelemetry[];
  topPredictions: PredictionItem[];
  propagationPath: PropagationPath;
  modelValidation: ModelValidationMetrics;
  virtualSensorInference: VirtualSensorInferenceRecord[];
  timestamp: string;
}

export interface DatasetHistoryItem {
  id: string;
  name: string;
  uploadedAt: string;
  rows: number;
  stations: number;
  status: string;
  topRisk: string;
  predictionsCount: number;
}

export interface EventLogItem {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'critical' | 'action' | 'ai';
  stationId?: string;
  message: string;
}

export type SimulationScenarioId = 
  | 'normal'
  | 'machine_degradation'
  | 'cycle_time_drift'
  | 'quality_deviation'
  | 'sensor_failure'
  | 'temperature_spike'
  | 'operator_variation';
