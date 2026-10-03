import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Layers, 
  Cpu, 
  HelpCircle, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function AlertsCenterView() {
  const { 
    stations, 
    eventTimeline, 
    executeHumanWorkflowAction, 
    setSelectedStation,
    setActiveTab,
    setWhyPredictionModalStation
  } = useAppStore();

  const warningStations = stations.filter(s => s.status === 'warning' || s.status === 'critical' || s.bottleneckRisk >= 50);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold uppercase mb-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Active Warning & Propagation Center
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Line Bottleneck & Propagation Alerts
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time alert dispatch, causal chain tracing, and human-in-the-loop decision-support audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{warningStations.length} Active Warnings Monitored</span>
        </div>
      </div>

      {/* 1. Active High-Priority Warnings */}
      <div className="space-y-4">
        <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
          Active Plant Disruption Warnings:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warningStations.map((st) => (
            <div
              key={st.id}
              className="p-6 rounded-3xl bg-dark-900 border border-amber-500/40 shadow-2xl space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                    {st.status}
                  </span>
                  <span className="text-slate-400">{st.area} &bull; {st.id}</span>
                </div>
                <span className="text-red-400 font-mono font-bold text-xs">
                  Risk: {st.bottleneckRisk}%
                </span>
              </div>

              <div>
                <h4 className="text-lg font-display font-black text-white">{st.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono mt-1">
                  {st.aiDiagnosis || `Cycle time drift (+${(st.cycleTimeActual - st.taktTime).toFixed(1)}s) causing buffer saturation.`}
                </p>
              </div>

              {/* Propagation flow note */}
              {st.id === 'ST14' && (
                <div className="p-3 rounded-2xl bg-dark-950 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Predicted Causal Propagation:</span>
                  <div className="text-slate-200 flex items-center gap-1.5 flex-wrap font-bold">
                    <span className="text-red-400">ST11 🔴</span>
                    <span>&rarr;</span>
                    <span className="text-orange-400">ST12 🟠</span>
                    <span>&rarr;</span>
                    <span className="text-orange-400">ST13 🟠</span>
                    <span>&rarr;</span>
                    <span className="text-red-400">ST14 🔴 (22m Lead Time)</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs font-bold pt-2 border-t border-slate-800">
                <button
                  onClick={() => executeHumanWorkflowAction(st.id, 'ACKNOWLEDGE')}
                  className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-center"
                >
                  ACKNOWLEDGE
                </button>
                <button
                  onClick={() => executeHumanWorkflowAction(st.id, 'DISPATCH')}
                  className="py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-black transition-all text-center"
                >
                  DISPATCH TEAM
                </button>
                <button
                  onClick={() => executeHumanWorkflowAction(st.id, 'MAINTENANCE')}
                  className="py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 transition-all text-center"
                >
                  SCHEDULE PM
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Operational Event Timeline Log */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
              Real-Time Telemetry & Alert Stream (Chronological Log)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Live Synchronized Feed</span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-2 scrollbar-thin">
          {eventTimeline.map((ev) => (
            <div
              key={ev.id}
              className="p-3 rounded-2xl bg-dark-950 border border-slate-800/80 font-mono text-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-bold text-[11px]">{ev.timestamp}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  ev.level === 'critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : ev.level === 'warning'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : ev.level === 'ai'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                    : ev.level === 'action'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {ev.level}
                </span>
                <span className="text-slate-200">{ev.message}</span>
              </div>

              {ev.stationId && (
                <button
                  onClick={() => {
                    const target = stations.find(s => s.id === ev.stationId);
                    if (target) setSelectedStation(target);
                    setActiveTab('digitalTwin');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-bold text-[11px] underline shrink-0"
                >
                  Inspect {ev.stationId} &rarr;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
