import React from 'react';
import { 
  X, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Cpu, 
  HelpCircle, 
  Wrench, 
  Clock, 
  Zap, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function StationDrawer({ station, onClose }) {
  const { executeHumanWorkflowAction, setWhyPredictionModalStation } = useAppStore();

  if (!station) return null;

  const isWarning = station.status === 'warning' || station.status === 'critical';
  const isInferred = station.status === 'inferred';

  const renderSensorTag = (type) => {
    if (type === 'MEASURED') {
      return <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">● MEASURED</span>;
    }
    if (type === 'AI-INFERRED') {
      return <span className="text-[10px] font-mono text-purple-400 font-bold flex items-center gap-1">◆ AI-INFERRED</span>;
    }
    return <span className="text-[10px] font-mono text-slate-500 font-bold flex items-center gap-1">○ UNAVAILABLE</span>;
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-dark-900/95 backdrop-blur-2xl border-l border-cyan-500/30 z-50 p-6 shadow-2xl overflow-y-auto font-sans flex flex-col justify-between space-y-6 animate-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${
              station.status === 'critical'
                ? 'bg-red-500 animate-ping'
                : station.status === 'warning'
                ? 'bg-amber-400'
                : station.status === 'inferred'
                ? 'bg-blue-400'
                : 'bg-emerald-400'
            }`}></span>
            <span className="text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
              {station.area} SHOP &bull; {station.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-2xl font-display font-black text-white leading-tight">
            {station.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Station Code: <strong className="text-white">{station.id}</strong> &bull; Takt Target: <strong className="text-cyan-400">{station.taktTime}s</strong>
          </p>
        </div>

        {/* Live Risk & Anomaly Score Pills */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Bottleneck Risk</span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xl font-bold ${
                station.bottleneckRisk >= 70 ? 'text-red-400' : station.bottleneckRisk >= 40 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {station.bottleneckRisk}%
              </span>
              {station.timeToBottleneck && (
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  ~{station.timeToBottleneck}m
                </span>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Anomaly Score</span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xl font-bold ${
                station.anomalyScore >= 70 ? 'text-red-400' : station.anomalyScore >= 40 ? 'text-amber-400' : 'text-slate-200'
              }`}>
                {station.anomalyScore}%
              </span>
              <span className="text-[10px] text-slate-500">Isolation Forest</span>
            </div>
          </div>
        </div>

        {/* Telemetry Matrix with Measured vs Inferred Status */}
        <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-3 font-mono text-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold block border-b border-slate-800/80 pb-1.5">
            Station Telemetry & Sensor Sources:
          </span>

          {/* Cycle Time */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Actual Cycle Time:</span>
            <div className="text-right">
              <span className={`font-bold ${station.cycleTimeActual > station.taktTime ? 'text-amber-400' : 'text-white'}`}>
                {station.cycleTimeActual}s
              </span>
              <div className="text-[9px]">{renderSensorTag(station.sensorSources.cycle_time)}</div>
            </div>
          </div>

          {/* WIP Buffer */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">WIP Queue Level:</span>
            <div className="text-right">
              <span className="font-bold text-white">{station.wipBuffer} / {station.maxBuffer} units</span>
              <div className="text-[9px]">{renderSensorTag(station.sensorSources.wip)}</div>
            </div>
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Kinematic Vibration:</span>
            <div className="text-right">
              <span className="font-bold text-white">{station.vibration} RMS</span>
              <div className="text-[9px]">{renderSensorTag(station.sensorSources.vibration)}</div>
            </div>
          </div>

          {/* Temperature */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Thermal Sensor:</span>
            <div className="text-right">
              <span className="font-bold text-white">{station.temperature}°C</span>
              <div className="text-[9px]">{renderSensorTag(station.sensorSources.temperature)}</div>
            </div>
          </div>

          {/* Torque */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Applied Torque:</span>
            <div className="text-right">
              <span className="font-bold text-white">{station.torque} Nm</span>
              <div className="text-[9px]">{renderSensorTag(station.sensorSources.torque)}</div>
            </div>
          </div>

          {/* Quality Score */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span className="text-slate-400">Quality Index:</span>
            <span className="font-bold text-emerald-400">{station.qualityScore}%</span>
          </div>
        </div>

        {/* AI Diagnosis */}
        {station.aiDiagnosis && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[10px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>AI Anomaly & Root Cause Diagnosis:</span>
            </div>
            <p className="text-slate-200 leading-relaxed font-sans">
              {station.aiDiagnosis}
            </p>
          </div>
        )}

      </div>

      {/* Bottom Prescriptive Action Panel */}
      <div className="space-y-3 border-t border-slate-800 pt-4 font-mono">
        <span className="text-[10px] text-slate-400 uppercase font-bold block">
          Human-in-the-Loop Prescriptive Action (Decision Support):
        </span>

        <div className="grid grid-cols-3 gap-2 text-xs font-bold">
          <button
            onClick={() => {
              executeHumanWorkflowAction(station.id, 'ACKNOWLEDGE');
              onClose();
            }}
            className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-center"
          >
            ACKNOWLEDGE
          </button>
          <button
            onClick={() => {
              executeHumanWorkflowAction(station.id, 'DISPATCH');
              onClose();
            }}
            className="py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-black shadow-lg shadow-cyan-500/25 transition-all text-center"
          >
            DISPATCH
          </button>
          <button
            onClick={() => {
              executeHumanWorkflowAction(station.id, 'MAINTENANCE');
              onClose();
            }}
            className="py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 transition-all text-center"
          >
            SCHEDULE PM
          </button>
        </div>

        <p className="text-[10px] text-slate-500 text-center font-mono">
          Strictly decision-support. Never writes directly to safety PLCs.
        </p>
      </div>

    </div>
  );
}
