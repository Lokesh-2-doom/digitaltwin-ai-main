const fs = require('fs');
const path = require('path');

// Navbar.jsx
const navbarCode = `import React from 'react';
import { Activity, Shield, Cpu, Play, Terminal, Layers, BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Navbar({ onOpenSimulator, onSelectPersona, currentPersona }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-dark-950/80 border-b border-cyber-500/20">
      {/* Top Telemetry Strip */}
      <div className="bg-dark-900/90 border-b border-slate-800/80 px-4 py-1 text-[11px] font-mono flex items-center justify-between overflow-x-auto text-slate-300">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold">SYSTEM STATUS: LIVE OT STREAM</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-slate-300">
            PLANT: <span className="text-cyan-400 font-semibold">Assembly Line Alpha (30-50 Stn Matrix)</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-slate-300">
            LINE OEE: <span className="text-emerald-400 font-bold">88.4%</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div>
            TAKT TARGET: <span className="text-cyan-400 font-bold">60s</span> (Actual Avg: <span className="text-emerald-400 font-bold">58.4s</span>)
          </div>
          <span className="text-slate-600">|</span>
          <div>
            AI SENSOR GAPS BRIDGED: <span className="text-purple-400 font-bold">2 / 2 Stations</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-amber-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>1 PREDICTIVE WARNING (23m Lead Time)</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-white">
                DIGITAL<span className="text-cyan-400">TWIN</span><span className="text-purple-400">.AI</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Round 2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">
              Vehicle Assembly Line Predictive Intelligence
            </p>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-xs text-slate-300">
          <a href="#twin" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            3D Line Twin
          </a>
          <a href="#problem" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            Problem Statement
          </a>
          <a href="#solution" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            Proposed Solution
          </a>
          <a href="#inference" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            Sensor-Gap AI
          </a>
          <a href="#simulator" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            Live Scenarios
          </a>
          <a href="#dashboards" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            Stakeholders
          </a>
          <a href="#roi" className="px-3 py-1.5 rounded-lg hover:text-cyan-400 hover:bg-slate-900/60 transition-colors">
            ROI & Business
          </a>
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Test 23-Min Warning</span>
          </button>
        </div>
      </div>
    </header>
  );
}
`;

// Footer.jsx
const footerCode = `import React from 'react';
import { Activity, Shield, Cpu, Terminal, ArrowUpRight, Github, FileText, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-white text-base">
                DIGITAL<span className="text-cyan-400">TWIN</span>.AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Next-generation connected predictive intelligence for vehicle assembly lines. Predicting bottlenecks 20+ minutes ahead, eliminating defect ripples, and bridging legacy sensor gaps.
            </p>
            <div className="text-[11px] font-mono text-cyan-400/80">
              Predict • Prevent • Perform
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3 text-cyan-400">
              Solution Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-cyan-500">&bull;</span> Non-Invasive PLC Edge Taps
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-cyan-500">&bull;</span> Surrogate Bayesian State Inference
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-cyan-500">&bull;</span> Multi-Station Propagation Graph
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-cyan-500">&bull;</span> Closed-Loop Prescriptive Interventions
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3 text-purple-400">
              Target Stakeholders
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-purple-500">&bull;</span> Floor Supervisor: In-the-moment signals
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-purple-500">&bull;</span> Plant Manager: Weekly OEE & loss trends
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-purple-500">&bull;</span> Executive Leadership: Rollout ROI case
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="text-purple-500">&bull;</span> OT / Automation: Low-risk retrofitting
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3 text-emerald-400">
              Industrial Benchmarks
            </h4>
            <div className="bg-dark-900 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Bottleneck Lead Time:</span>
                <span className="text-emerald-400 font-bold">20-25 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sensor-Poor Accuracy:</span>
                <span className="text-cyan-400 font-bold">96.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Line Scrap Reduction:</span>
                <span className="text-purple-400 font-bold">-34%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Annual Line Savings:</span>
                <span className="text-amber-400 font-bold">$2.45M</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
          <p>© 2026 DigitalTwin.ai — Vehicle Assembly Line Predictive Intelligence Platform.</p>
          <div className="flex items-center gap-4 text-slate-300 font-mono">
            <span>Built for Vehicle Assembly Line Digital Twin Challenge (Round 2)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

// StationDrawer.jsx
const drawerCode = `import React, { useState } from 'react';
import { X, Cpu, AlertTriangle, CheckCircle2, Zap, ArrowRight, Gauge, Activity, Radio, Tool, RefreshCw, BarChart2 } from 'lucide-react';
import { SHOP_AREAS } from '../../data/factoryStations';

export default function StationDrawer({ station, onClose, onExecuteRecommendation }) {
  if (!station) return null;

  const [executingAction, setExecutingAction] = useState(false);
  const [actionApplied, setActionApplied] = useState(false);

  const shopInfo = SHOP_AREAS[station.area] || SHOP_AREAS.BODY;

  const handleApplyFix = () => {
    setExecutingAction(true);
    setTimeout(() => {
      setExecutingAction(false);
      setActionApplied(true);
      if (onExecuteRecommendation) onExecuteRecommendation(station.id);
    }, 900);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-dark-900/95 backdrop-blur-2xl border-l border-cyber-500/30 shadow-2xl shadow-cyan-950/80 p-6 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono font-bold text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
              {station.code}
            </span>
            <span className={\`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border \${shopInfo.badgeBg}\`}>
              {shopInfo.name.split('(')[0]}
            </span>
            <span className={\`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full border \${
              station.sensorTier === 'rich' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
              station.sensorTier === 'inferred' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
              'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }\`}>
              {station.sensorTier === 'rich' ? 'Rich IoT Sensors' :
               station.sensorTier === 'inferred' ? 'AI Inferred (Virtual)' : 'Manual Checklist'}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white leading-snug">
            {station.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Type: {station.type}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Body */}
      <div className="space-y-6 flex-1">
        
        {/* Warning / Alert Banner if station has issue */}
        {station.status === 'warning' && (
          <div className="p-4 rounded-xl glass-panel-warning border border-amber-500/50 shadow-lg shadow-amber-950/30">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1 font-mono uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Predictive Warning: Downstream Bottleneck In 23 Mins</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed mb-3">
              {station.aiDiagnosis}
            </p>
            {station.recommendation && (
              <div className="p-3 rounded-lg bg-dark-950/80 border border-amber-500/30 text-xs font-mono text-slate-200">
                <span className="text-amber-400 font-bold block mb-1">AI PRESCRIPTION:</span>
                {station.recommendation}
              </div>
            )}
            
            {!actionApplied ? (
              <button
                onClick={handleApplyFix}
                disabled={executingAction}
                className="mt-3 w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
              >
                {executingAction ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Closed-Loop Pacing Rebalance...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Apply AI Prescriptive Intervention</span>
                  </>
                )}
              </button>
            ) : (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Intervention Active: Pacing rebalanced. Bottleneck risk mitigated.</span>
              </div>
            )}
          </div>
        )}

        {/* Inferred Station Special Card */}
        {station.sensorTier === 'inferred' && station.inferredParameters && (
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 shadow-lg">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1 font-mono uppercase">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>AI Virtual Sensor Inference Model</span>
            </div>
            <p className="text-xs text-purple-200/90 leading-relaxed mb-3">
              This legacy station lacks direct IoT sensors. DigitalTwin.ai reconstructs virtual machine states from upstream/downstream sensors without modifying legacy PLC logic.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-dark-950/80 p-3 rounded-lg border border-purple-500/20">
              <div>
                <span className="text-slate-400 block text-[10px]">INFERENCE SOURCE</span>
                <span className="text-purple-300 font-semibold">{station.inferredParameters.source}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">BAYESIAN CONFIDENCE</span>
                <span className="text-emerald-400 font-bold">{station.inferredParameters.confidence}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Live KPI Grid */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
            Real-Time Station Telemetry
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">CYCLE TIME</span>
              <span className={\`text-base font-bold font-mono \${station.cycleTimeActual > station.cycleTimeTarget ? 'text-amber-400' : 'text-cyan-400'}\`}>
                {station.cycleTimeActual}s
              </span>
              <span className="text-[10px] text-slate-300 block font-mono">Takt: {station.taktTime}s</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">WIP BUFFER</span>
              <span className="text-base font-bold font-mono text-white">
                {station.wipBuffer} / {station.maxBuffer}
              </span>
              <span className="text-[10px] text-slate-300 block font-mono">Vehicles</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">TEMPERATURE</span>
              <span className="text-base font-bold font-mono text-cyan-300">
                {station.temperature}°C
              </span>
              <span className="text-[10px] text-slate-300 block font-mono">Sensors active</span>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">DEFECT RISK</span>
              <span className={\`text-base font-bold font-mono \${station.defectRisk > 20 ? 'text-rose-400' : 'text-emerald-400'}\`}>
                {station.defectRisk}%
              </span>
              <span className="text-[10px] text-slate-300 block font-mono">Quality score</span>
            </div>
          </div>
        </div>

        {/* Process Specific Metrics */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
            Process Parameters & Hardware Spec
          </h4>
          <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">PLC & Controller:</span>
              <span className="text-slate-200 font-semibold">{station.hardware}</span>
            </div>
            {Object.entries(station.metrics).map(([key, val]) => (
              <div key={key} className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-cyan-400 font-bold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instrumentation Sensors */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-2">
            Active Telemetry Channels ({station.sensors.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {station.sensors.map((sensor, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {sensor}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
`;

// AlertNotification.jsx
const alertCode = `import React from 'react';
import { AlertTriangle, Zap, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function AlertNotification({ onInspectStation }) {
  return (
    <div className="p-4 rounded-2xl glass-panel-warning border border-amber-500/50 shadow-xl shadow-amber-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top duration-300">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
              EARLY WARNING PREDICTION
            </span>
            <span className="font-mono text-xs text-amber-400/90">
              Station B-04 &bull; 23-Min Downstream Bottleneck Risk
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-1">
            Servo clamping cycle time creeping (+6.4s). Without intervention, Paint Shop P-01 and Final Assembly will starve in <strong>23 minutes</strong>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
        <button
          onClick={() => onInspectStation('S04')}
          className="w-full md:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Inspect & Prescribe Fix</span>
        </button>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'layout', 'Navbar.jsx'), navbarCode, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'layout', 'Footer.jsx'), footerCode, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'ui', 'StationDrawer.jsx'), drawerCode, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'ui', 'AlertNotification.jsx'), alertCode, 'utf8');
console.log('Saved Navbar, Footer, StationDrawer, AlertNotification');
