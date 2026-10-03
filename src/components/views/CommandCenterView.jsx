import React, { useState } from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Cpu, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Flame, 
  Layers, 
  Zap, 
  FileText, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  Camera
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import FactoryScene from '../3d/FactoryScene';
import LivePlantFeeds from '../sections/LivePlantFeeds';

export default function CommandCenterView() {
  const {
    stations,
    selectedStation,
    setSelectedStation,
    activeHeatmap,
    setActiveHeatmap,
    cameraMode,
    setCameraMode,
    predictiveDemoStep,
    predictiveDemoRunning,
    startPredictiveDemo,
    pausePredictiveDemo,
    resetPredictiveDemo,
    setPredictiveDemoStep,
    eventTimeline,
    executeHumanWorkflowAction,
    setWhyPredictionModalStation,
    setActiveTab
  } = useAppStore();

  const [activeTabSub, setActiveTabSub] = useState('twin');

  const activePrediction = {
    stationId: 'ST14',
    stationName: 'E-Coat Dip Immersion',
    area: 'PAINT',
    bottleneckRisk: 87.4,
    defectRisk: 24.5,
    estimatedTimeMinutes: 22,
    confidence: 93.2,
    contributingFactors: [
      'Cycle time increased +5.8s above 60s takt target',
      'WIP buffer accumulation reached 5/6 capacity',
      'Upstream ST11 anomaly wave propagating through ST12 and ST13'
    ],
    upstreamPressure: 'HIGH',
    downstreamStarvationRisk: 'HIGH',
    recommendedAction: {
      problemSummary: 'ST14 (E-Coat Dip) is accumulating cycle lag that will starve downstream paint stations in 22 minutes.',
      likelyCause: 'Upstream clamping drift combined with conveyor buffer saturation.',
      expectedImpact: 'Downstream starvation at ST16 and ST17 within 22 minutes.',
      prescriptiveActions: [
        'Rebalance buffer dwell time by +4s from preceding station ST13.',
        'Inspect ST14 hydraulic carriage lift pressure.',
        'Schedule preventive maintenance during next scheduled shift window.'
      ],
      workflowActions: ['ACKNOWLEDGE', 'DISPATCH TO TEAM', 'SCHEDULE MAINTENANCE']
    }
  };

  const demoSteps = [
    { step: 0, time: 'T+00', label: 'Normal Factory', desc: 'All 35 stations running in nominal state at 60s takt.' },
    { step: 1, time: 'T+05', label: 'Cycle Drift at ST11', desc: 'Subtle +2.4s cycle time delay emerges at clamping cylinder.' },
    { step: 2, time: 'T+10', label: 'Vibration Rise', desc: 'Kinematic vibration elevates to 0.32 RMS on secondary clamp.' },
    { step: 3, time: 'T+15', label: 'Anomaly Detected', desc: 'Isolation Forest triggers anomaly alert (Score: 84%).' },
    { step: 4, time: 'T+18', label: 'WIP Backlog', desc: 'Buffer saturation begins rippling into ST12 transfer station.' },
    { step: 5, time: 'T+22', label: 'Bottleneck Forecast', desc: 'AI predicts downstream starvation at ST14 in 22 minutes.' },
    { step: 6, time: 'T+30', label: 'Starvation Threat', desc: 'Downstream Paint Shop spray booths running out of chassis.' },
    { step: 7, time: 'T+35', label: 'Root Cause Mapped', desc: 'Causal graph links ST11 pneumatic wear to ST14 bottleneck.' },
    { step: 8, time: 'T+40', label: 'Action Dispatched', desc: 'Supervisor approves buffer dwell shift. $24,000 saved!' }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* 1. Top Executive KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        <div className="p-3 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Line Health</span>
          <div className="text-xl font-display font-black text-emerald-400">88.4%</div>
          <span className="text-[9px] text-emerald-500 font-mono">+4.2% shift avg</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Plant OEE</span>
          <div className="text-xl font-display font-black text-cyan-400">88.4%</div>
          <span className="text-[9px] text-slate-400 font-mono">Target: 85.0%</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Takt Pace</span>
          <div className="text-xl font-display font-black text-white">58.2s</div>
          <span className="text-[9px] text-cyan-400 font-mono">Target: 60.0s</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">WIP Saturation</span>
          <div className="text-xl font-display font-black text-slate-200">2.4 / 6</div>
          <span className="text-[9px] text-slate-400 font-mono">Nominal buffer</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Defect Risk</span>
          <div className="text-xl font-display font-black text-emerald-400">2.8%</div>
          <span className="text-[9px] text-emerald-500 font-mono">Zero EOL escape</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-amber-500/30 bg-amber-500/5 text-center">
          <span className="text-[10px] font-mono text-amber-300 uppercase block">Active Warnings</span>
          <div className="text-xl font-display font-black text-amber-400">1 Critical</div>
          <span className="text-[9px] text-amber-300 font-mono">ST14 Bottleneck</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-purple-500/30 bg-purple-500/5 text-center">
          <span className="text-[10px] font-mono text-purple-300 uppercase block">Sensor Gaps</span>
          <div className="text-xl font-display font-black text-purple-400">8 Inferred</div>
          <span className="text-[9px] text-purple-300 font-mono">96.2% surrogate AI</span>
        </div>

        <div className="p-3 rounded-2xl bg-dark-900 border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Cost Avoidance</span>
          <div className="text-xl font-display font-black text-amber-400">$2.45M</div>
          <span className="text-[9px] text-slate-400 font-mono">Annualized / line</span>
        </div>
      </div>

      {/* 2. Main Hero Section: Live 3D Twin & AI Prediction Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: 3D Digital Twin Viewer */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <h3 className="text-lg font-display font-black text-white tracking-tight">
                Physical Line Digital Twin (35 Stations)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTabSub('twin')}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTabSub === 'twin'
                    ? 'bg-cyan-500 text-dark-950 font-bold'
                    : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                3D Model
              </button>
              <button
                onClick={() => setActiveTabSub('cctv')}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeTabSub === 'cctv'
                    ? 'bg-cyan-500 text-dark-950 font-bold'
                    : 'bg-dark-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Live CCTV</span>
              </button>
            </div>
          </div>

          {activeTabSub === 'twin' ? (
            <FactoryScene
              stations={stations}
              selectedStation={selectedStation}
              onSelectStation={setSelectedStation}
              activeHeatmap={activeHeatmap}
              setActiveHeatmap={setActiveHeatmap}
              cameraMode={cameraMode}
              setCameraMode={setCameraMode}
            />
          ) : (
            <LivePlantFeeds />
          )}
        </div>

        {/* Right 1 Col: Real-Time AI Prediction & Prescriptive Recommendation */}
        <div className="space-y-4">
          
          {/* Active AI Prediction Card */}
          <div className="p-5 rounded-3xl bg-dark-900 border border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3.5 py-1 bg-amber-500 text-dark-950 text-[10px] font-mono font-black rounded-bl-xl tracking-wider uppercase">
              22-Min Lead Time
            </div>

            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                Active Bottleneck Warning
              </span>
            </div>

            <h4 className="text-xl font-display font-black text-white">
              ST14 &bull; E-Coat Dip Immersion
            </h4>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              Paint Shop Zone &bull; Station 14 of 35
            </p>

            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="p-2.5 rounded-xl bg-dark-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">Bottleneck Risk</span>
                <span className="text-xl font-display font-black text-red-400">87.4%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block">AI Confidence</span>
                <span className="text-xl font-display font-black text-emerald-400">93.2%</span>
              </div>
            </div>

            {/* Causal Chain */}
            <div className="p-3 rounded-xl bg-dark-950/80 border border-slate-800/80 text-xs font-mono space-y-1.5 mb-4">
              <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-between">
                <span>Predicted Propagation Path:</span>
                <span className="text-cyan-400">4-Station Chain</span>
              </div>
              <div className="text-slate-200 flex items-center gap-1.5 flex-wrap font-bold">
                <span className="text-red-400">ST11 🔴</span>
                <span>&rarr;</span>
                <span className="text-orange-400">ST12 🟠</span>
                <span>&rarr;</span>
                <span className="text-orange-400">ST13 🟠</span>
                <span>&rarr;</span>
                <span className="text-red-400">ST14 🔴 (Predicted Bottleneck)</span>
              </div>
            </div>

            {/* Why This Prediction Button */}
            <button
              onClick={() => setWhyPredictionModalStation(activePrediction)}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all mb-4"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>WHY THIS PREDICTION? (Root Cause)</span>
            </button>

            {/* Prescriptive Recommendation */}
            <div className="border-t border-slate-800 pt-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1.5">
                Prescriptive Recommendation (Decision Support):
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3">
                Rebalance buffer dwell time by +4s from preceding station ST13 and inspect secondary lift pressure to avoid $24,000 shift loss.
              </p>

              {/* Human-in-the-Loop Action Buttons */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono font-bold">
                <button
                  onClick={() => executeHumanWorkflowAction('ST14', 'ACKNOWLEDGE')}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all text-center"
                >
                  ACKNOWLEDGE
                </button>
                <button
                  onClick={() => executeHumanWorkflowAction('ST14', 'DISPATCH')}
                  className="py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-black transition-all text-center shadow-md shadow-cyan-500/20"
                >
                  DISPATCH TEAM
                </button>
                <button
                  onClick={() => executeHumanWorkflowAction('ST14', 'MAINTENANCE')}
                  className="py-2 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 transition-all text-center"
                >
                  SCHEDULE PM
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. Signature Live Predictive Demo Sequence (T+00 to T+45) */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-cyan-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Deterministic Prototype Showcase
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black text-white">
              Signature Live Predictive Demo Sequence (T+00 &rarr; T+45)
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Experience the end-to-end anomaly &rarr; propagation &rarr; prediction &rarr; prescriptive mitigation loop.
            </p>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (predictiveDemoStep >= demoSteps.length - 1) {
                  setPredictiveDemoStep(0);
                } else {
                  setPredictiveDemoStep(predictiveDemoStep + 1);
                }
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-mono text-xs font-black shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Step Next ({demoSteps[predictiveDemoStep].time})</span>
            </button>

            <button
              onClick={resetPredictiveDemo}
              className="p-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-400 hover:text-white transition-all"
              title="Reset Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Step Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {demoSteps.map((s) => {
            const isActive = predictiveDemoStep === s.step;
            const isPassed = predictiveDemoStep > s.step;
            return (
              <button
                key={s.step}
                onClick={() => setPredictiveDemoStep(s.step)}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-cyan-500 text-dark-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/30 scale-105 z-10'
                    : isPassed
                    ? 'bg-dark-950 border-cyan-500/40 text-cyan-300'
                    : 'bg-dark-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase font-black">{s.time}</div>
                <div className="text-[11px] font-semibold leading-tight my-1 truncate">{s.label}</div>
                <div className={`text-[9px] truncate ${isActive ? 'text-dark-900' : 'text-slate-500'}`}>
                  {s.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Active Step Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-dark-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
              ACTIVE STAGE: {demoSteps[predictiveDemoStep].time}
            </span>
            <span className="text-white font-bold">{demoSteps[predictiveDemoStep].label}:</span>
            <span className="text-slate-300">{demoSteps[predictiveDemoStep].desc}</span>
          </div>

          <div className="text-emerald-400 font-bold text-[11px] shrink-0">
            Digital Twin & Telemetry Synchronized
          </div>
        </div>

      </div>

      {/* 4. Real-Time Operational Event Timeline */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-display font-black text-white uppercase tracking-wider">
              Connected Plant Event Timeline (Live Log)
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Showing latest synchronized telemetry events
          </span>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
          {eventTimeline.map((ev) => (
            <div
              key={ev.id}
              className="p-2.5 rounded-xl bg-dark-950 border border-slate-800/80 font-mono text-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 font-bold">{ev.timestamp}</span>
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
                  }}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold underline shrink-0"
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
