import React from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Terminal, 
  GitBranch, 
  Server, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ArchitectureView() {
  const architectureLayers = [
    {
      num: '01',
      title: 'DATA SOURCES',
      subtitle: 'Heterogeneous Plant Network',
      desc: 'Legacy PLCs (Siemens, Rockwell), modern fieldbus I/O, optical vision scanners, torque spindles, and MES execution databases.',
      tag: 'READ-ONLY TAPS'
    },
    {
      num: '02',
      title: 'DATA INGESTION',
      subtitle: 'Passive Edge Gateway',
      desc: 'MQTT brokers, OPC-UA servers, and high-speed CSV/XLSX batch ingesters buffering at 10,000 Hz with zero PLC control risk.',
      tag: 'NON-INVASIVE'
    },
    {
      num: '03',
      title: 'PROCESSING & CLEANING',
      subtitle: 'Schema Normalization',
      desc: 'Fuzzy variable mapping, z-score statistical process control, kinematic feature engineering, and missing-data detection.',
      tag: 'REAL-TIME'
    },
    {
      num: '04',
      title: 'DIGITAL TWIN STATE',
      subtitle: '35-Station Graph Model',
      desc: 'Synchronized WebGL virtual line representing Body Construction (12), Paint Shop (8), and Final Assembly (15).',
      tag: 'PHYSICS INFORMED'
    },
    {
      num: '05',
      title: 'AI & ML ENGINE',
      subtitle: 'Anomaly & Propagation AI',
      desc: 'Isolation Forest anomaly detection, Bayesian virtual sensor inference, and directed graph bottleneck forecasting.',
      tag: 'TRANSPARENT ML'
    },
    {
      num: '06',
      title: 'INSIGHTS & ALERTS',
      subtitle: 'Explainable Warning Dispatch',
      desc: '20-25 minute advance lead time, contributing feature attribution ("WHY THIS PREDICTION?"), and confidence gating.',
      tag: 'EXPLAINABLE'
    },
    {
      num: '07',
      title: 'ACTION & HUMAN LOOP',
      subtitle: 'Decision-Support Workflow',
      desc: 'Human-in-the-loop review, shift buffer rebalancing dispatch, and continuous closed-loop model calibration.',
      tag: 'NO DIRECT PLC WRITES'
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">
          <Layers className="w-3.5 h-3.5" />
          Enterprise System Architecture & OT Governance
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
          System Architecture & Safe OT Integration
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-3xl">
          Designed from the ground up for safe brownfield industrial deployment. Strictly read-only with respect to factory control systems.
        </p>
      </div>

      {/* 1. End-to-End Architectural Pipeline Flow */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl space-y-6">
        <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
          7-Stage Architectural Data & Prediction Pipeline:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {architectureLayers.map((layer, idx) => (
            <div
              key={layer.num}
              className="p-4 rounded-2xl bg-dark-950 border border-slate-800 flex flex-col justify-between space-y-3 relative group hover:border-cyan-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-cyan-400 font-bold">{layer.num}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {layer.tag}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{layer.title}</h4>
                <div className="text-[10px] text-cyan-300 font-mono mb-1">{layer.subtitle}</div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{layer.desc}</p>
              </div>

              {idx < architectureLayers.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 font-mono text-xs">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Non-Invasive OT Safety & Security Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Safety Principles */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
              Industrial OT Safety & Zero Downtime Principles
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 space-y-1">
              <strong className="text-white block text-sm">1. 100% Read-Only Passive Network Taps</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                DigitalTwin.ai taps into factory telemetry via unidirectional passive diode or read-only OPC-UA/MQTT gateway. The platform NEVER writes to safety controllers or modifies PLC ladder logic.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 space-y-1">
              <strong className="text-white block text-sm">2. Dual Bayesian Confidence Gating</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                To prevent alarm fatigue on the plant floor, an alert is only dispatched if model confidence exceeds 92% AND predicted line starvation likelihood exceeds 85%.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 space-y-1">
              <strong className="text-white block text-sm">3. Human-in-the-Loop Decision Support</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                Every prescriptive recommendation must be reviewed and authorized by the floor supervisor before execution.
              </p>
            </div>
          </div>
        </div>

        {/* 3-Phase Rollout Roadmap */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
              3-Phase Enterprise Rollout Roadmap
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-dark-950 border border-cyan-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-cyan-300 text-sm">Phase 1: Shadow Ingestion (Months 1–3)</strong>
                <span className="text-[10px] text-cyan-400">PILOT</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Deploy passive edge taps. Calibrate Bayesian sensor-gap models and establish station takt baseline.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950 border border-purple-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-purple-300 text-sm">Phase 2: Closed-Loop Floor Alerts (Months 4–6)</strong>
                <span className="text-[10px] text-purple-400">OPERATIONAL</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Activate real-time supervisor cockpits. Enable 20-minute advance bottleneck warnings and 1-click dispatch.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-emerald-300 text-sm">Phase 3: Multi-Plant Transfer Learning (Months 7–12)</strong>
                <span className="text-[10px] text-emerald-400">FLEET SCALE</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Scale graph neural topology across 6 global assembly lines with federated model calibration.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
