import { create } from 'zustand';
import { 
  StationTelemetry, 
  AnalysisResult, 
  PredictionItem, 
  EventLogItem, 
  DatasetHistoryItem, 
  SimulationScenarioId 
} from '../types';
import { STATIONS_35_INITIAL } from '../data/factoryStations35';
import { api } from '../services/api';

export type NavigationTab = 
  | 'commandCenter'
  | 'digitalTwin'
  | 'datasetAI'
  | 'predictions'
  | 'stations'
  | 'alerts'
  | 'stakeholders'
  | 'businessImpact'
  | 'architecture';

interface AppState {
  // Navigation & Viewport
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;

  // Canonical 35 Stations State
  stations: StationTelemetry[];
  selectedStation: StationTelemetry | null;
  setSelectedStation: (st: StationTelemetry | null) => void;
  activeHeatmap: 'default' | 'bottleneck' | 'sensorCoverage' | 'propagation';
  setActiveHeatmap: (mode: 'default' | 'bottleneck' | 'sensorCoverage' | 'propagation') => void;
  cameraMode: 'overview' | 'body' | 'paint' | 'assembly' | 'qa';
  setCameraMode: (mode: 'overview' | 'body' | 'paint' | 'assembly' | 'qa') => void;

  // Active Dataset & ML Analysis State
  activeDatasetName: string;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  datasetHistory: DatasetHistoryItem[];
  
  // Real-Time Event Timeline
  eventTimeline: EventLogItem[];
  addEventLog: (level: 'info' | 'warning' | 'critical' | 'action' | 'ai', message: string, stationId?: string) => void;

  // Simulation & Predictive Demo Engine
  simulationScenario: SimulationScenarioId;
  setSimulationScenario: (scenario: SimulationScenarioId) => void;
  predictiveDemoStep: number;
  predictiveDemoRunning: boolean;
  startPredictiveDemo: () => void;
  pausePredictiveDemo: () => void;
  resetPredictiveDemo: () => void;
  setPredictiveDemoStep: (step: number) => void;

  // Modals & Drawers
  whyPredictionModalStation: PredictionItem | null;
  setWhyPredictionModalStation: (st: PredictionItem | null) => void;
  exportReportOpen: boolean;
  setExportReportOpen: (open: boolean) => void;

  // Actions & Business Logic
  runDatasetAnalysis: (filename: string, file?: File, customMapping?: Record<string, string>) => Promise<void>;
  loadSampleDataset: (filename: string) => Promise<void>;
  executeHumanWorkflowAction: (stationId: string, actionType: 'ACKNOWLEDGE' | 'DISPATCH' | 'MAINTENANCE') => void;
  deleteDatasetHistoryItem: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'commandCenter',
  setActiveTab: (tab) => set({ activeTab: tab }),

  stations: STATIONS_35_INITIAL,
  selectedStation: null,
  setSelectedStation: (st) => set({ selectedStation: st }),
  activeHeatmap: 'default',
  setActiveHeatmap: (mode) => set({ activeHeatmap: mode }),
  cameraMode: 'overview',
  setCameraMode: (mode) => set({ cameraMode: mode }),

  activeDatasetName: 'assembly_line_sample.csv',
  analysisResult: null,
  isAnalyzing: false,
  datasetHistory: [
    {
      id: 'ds_1',
      name: 'assembly_line_sample.csv',
      uploadedAt: '2026-08-30 08:30',
      rows: 24570,
      stations: 35,
      status: 'COMPLETED',
      topRisk: 'ST14 (87.4% Risk)',
      predictionsCount: 3
    }
  ],

  eventTimeline: [
    { id: 'ev_1', timestamp: '08:14:02', level: 'info', message: 'OT Data Ingestion Gateway synchronized: 35 stations active at 60s takt.' },
    { id: 'ev_2', timestamp: '08:16:45', level: 'ai', message: 'Bayesian Sensor Inference online for ST04, ST08, ST17, ST22 (96.2% precision).' },
    { id: 'ev_3', timestamp: '08:22:10', level: 'warning', stationId: 'ST11', message: 'Cycle-time drift (+6.4s) detected at ST11 Body Shell Verification.' },
    { id: 'ev_4', timestamp: '08:25:34', level: 'critical', stationId: 'ST14', message: 'Graph Propagation Engine: Predicted bottleneck at ST14 in 22 mins.' }
  ],

  addEventLog: (level, message, stationId) => {
    const newLog: EventLogItem = {
      id: `ev_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      stationId
    };
    set((state) => ({
      eventTimeline: [newLog, ...state.eventTimeline.slice(0, 40)]
    }));
  },

  simulationScenario: 'normal',
  setSimulationScenario: (scenarioId) => {
    set({ simulationScenario: scenarioId });
    const { addEventLog } = get();

    if (scenarioId === 'normal') {
      set({
        stations: STATIONS_35_INITIAL.map(s => ({
          ...s,
          status: s.sensorSources.vibration === 'AI-INFERRED' ? 'inferred' : 'normal',
          bottleneckRisk: Math.min(s.bottleneckRisk, 15),
          cycleTimeActual: 58.2,
          wipBuffer: 2
        }))
      });
      addEventLog('info', 'Simulation Reset: All 35 stations returned to nominal 58.2s takt.');
    } else if (scenarioId === 'cycle_time_drift') {
      set((state) => ({
        stations: state.stations.map(s => {
          if (s.id === 'ST11') {
            return { ...s, cycleTimeActual: 66.8, wipBuffer: 5, status: 'warning', bottleneckRisk: 79.5 };
          }
          if (s.id === 'ST14') {
            return { ...s, cycleTimeActual: 65.4, wipBuffer: 5, status: 'critical', bottleneckRisk: 88.0 };
          }
          return s;
        })
      }));
      addEventLog('warning', 'Simulation: Cycle-Time Drift triggered at ST11 & downstream ST14.', 'ST11');
    } else if (scenarioId === 'machine_degradation') {
      set((state) => ({
        stations: state.stations.map(s => {
          if (s.id === 'ST02') {
            return { ...s, vibration: 0.44, temperature: 56.0, status: 'warning', bottleneckRisk: 68.0 };
          }
          return s;
        })
      }));
      addEventLog('warning', 'Simulation: Robotic weld servo degradation injected at ST02.', 'ST02');
    } else if (scenarioId === 'quality_deviation') {
      set((state) => ({
        stations: state.stations.map(s => {
          if (s.id === 'ST20') {
            return { ...s, qualityScore: 81.2, defectRisk: 48.0, status: 'warning' };
          }
          return s;
        })
      }));
      addEventLog('critical', 'Simulation: Paint finish optical inspection defect rate spike at ST20.', 'ST20');
    }
  },

  predictiveDemoStep: 0,
  predictiveDemoRunning: false,
  startPredictiveDemo: () => {
    set({ predictiveDemoRunning: true, predictiveDemoStep: 0 });
    get().addEventLog('ai', 'Signature Predictive Demo Started (T+00 to T+45 Sequence).');
  },
  pausePredictiveDemo: () => set({ predictiveDemoRunning: false }),
  resetPredictiveDemo: () => {
    set({ predictiveDemoRunning: false, predictiveDemoStep: 0, stations: STATIONS_35_INITIAL });
    get().addEventLog('info', 'Predictive Demo reset to T+00.');
  },
  setPredictiveDemoStep: (step) => {
    set({ predictiveDemoStep: step });
    const { addEventLog } = get();

    if (step === 1) { // T+05
      set((state) => ({
        stations: state.stations.map(s => s.id === 'ST11' ? { ...s, cycleTimeActual: 62.4, status: 'watch' } : s)
      }));
      addEventLog('warning', 'T+05: Subtle +2.4s cycle time lag begins at ST11.', 'ST11');
    } else if (step === 2) { // T+10
      set((state) => ({
        stations: state.stations.map(s => s.id === 'ST11' ? { ...s, vibration: 0.32, temperature: 48.0 } : s)
      }));
      addEventLog('warning', 'T+10: Kinematic vibration rising at ST11 mechanical clamp.', 'ST11');
    } else if (step === 3) { // T+15
      set((state) => ({
        stations: state.stations.map(s => s.id === 'ST11' ? { ...s, anomalyScore: 84.0, status: 'warning', bottleneckRisk: 72.0 } : s)
      }));
      addEventLog('ai', 'T+15: Isolation Forest Anomaly Detector triggered at ST11 (Score: 84%).', 'ST11');
    } else if (step === 4) { // T+18
      set((state) => ({
        stations: state.stations.map(s => s.id === 'ST11' ? { ...s, wipBuffer: 5 } : (s.id === 'ST12' ? { ...s, wipBuffer: 4, status: 'watch' } : s))
      }));
      addEventLog('warning', 'T+18: Buffer saturation propagating into ST12 transfer station.', 'ST12');
    } else if (step === 5) { // T+22
      set((state) => ({
        stations: state.stations.map(s => s.id === 'ST14' ? { ...s, status: 'critical', bottleneckRisk: 87.4, timeToBottleneck: 22 } : s),
        activeHeatmap: 'propagation'
      }));
      addEventLog('critical', 'T+22: AI predicts downstream bottleneck at ST14 in 22 mins (Confidence: 93%).', 'ST14');
    } else if (step === 6) { // T+30
      set((state) => ({
        stations: state.stations.map(s => s.id === 'ST16' ? { ...s, throughput: 0.75, status: 'warning' } : s)
      }));
      addEventLog('critical', 'T+30: Downstream starvation beginning at ST16 Primer Booth.', 'ST16');
    } else if (step === 7) { // T+35
      addEventLog('ai', 'T+35: Root Cause verified: Upstream ST11 pneumatic seal wear.');
    } else if (step === 8) { // T+40
      addEventLog('action', 'T+40: Human Supervisor approved buffer pacing adjustment — $24,000 loss avoided!');
    }
  },

  whyPredictionModalStation: null,
  setWhyPredictionModalStation: (st) => set({ whyPredictionModalStation: st }),
  exportReportOpen: false,
  setExportReportOpen: (open) => set({ exportReportOpen: open }),

  runDatasetAnalysis: async (filename, file, customMapping) => {
    set({ isAnalyzing: true });
    get().addEventLog('info', `Starting 14-step ML Analysis on ${filename}...`);

    try {
      const result = await api.analyzeDataset(filename, customMapping, file);
      set({
        analysisResult: result,
        activeDatasetName: result.datasetName || filename,
        stations: result.stations && result.stations.length > 0 ? result.stations : get().stations,
        isAnalyzing: false
      });
      get().addEventLog('ai', `Analysis Complete for ${filename}: ${result.predictedBottlenecksCount} bottlenecks predicted.`);
    } catch (e: any) {
      console.error(e);
      set({ isAnalyzing: false });
      get().addEventLog('critical', `Analysis Error: ${e.message}`);
    }
  },

  loadSampleDataset: async (filename) => {
    set({ isAnalyzing: true });
    get().addEventLog('info', `Loading sample dataset: ${filename}...`);
    try {
      const sample = await api.getSampleData(filename);
      await get().runDatasetAnalysis(filename);
    } catch (e: any) {
      console.error(e);
      set({ isAnalyzing: false });
    }
  },

  executeHumanWorkflowAction: (stationId, actionType) => {
    const { addEventLog } = get();
    set((state) => ({
      stations: state.stations.map(s => {
        if (s.id === stationId) {
          return {
            ...s,
            status: 'normal',
            bottleneckRisk: 14.0,
            defectRisk: 2.0,
            cycleTimeActual: 58.2,
            wipBuffer: 2,
            aiDiagnosis: `RESOLVED: Human action dispatched (${actionType}). Pacing rebalanced.`,
            recommendation: undefined
          };
        }
        return s;
      })
    }));

    if (actionType === 'ACKNOWLEDGE') {
      addEventLog('action', `Supervisor acknowledged warning on ${stationId}.`, stationId);
    } else if (actionType === 'DISPATCH') {
      addEventLog('action', `Workload rebalancing order dispatched to ${stationId} team.`, stationId);
    } else if (actionType === 'MAINTENANCE') {
      addEventLog('action', `Preventive maintenance window booked for ${stationId}.`, stationId);
    }
  },

  deleteDatasetHistoryItem: (id) => {
    set((state) => ({
      datasetHistory: state.datasetHistory.filter(d => d.id !== id)
    }));
  }
}));
