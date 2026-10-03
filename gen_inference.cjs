const fs = require('fs');
const path = require('path');

// InferenceDeepDive.jsx
const inferenceCode = `import React, { useState } from 'react';
import { Cpu, Zap, Shield, ArrowRight, CheckCircle2, HelpCircle, Layers, GitFork, Radio, Activity } from 'lucide-react';

export default function InferenceDeepDive() {
  return (
    <section id="inference" className="py-16 bg-dark-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Handling Incomplete Sensor Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            How AI Infers Missing Data at Sensor-Poor Stations
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Real factories are a patchwork of modern robots and 20-year-old legacy equipment. Rather than treating uninstrumented or manual stations as blind spots, <strong>DigitalTwin.ai</strong> reconstructs high-fidelity virtual telemetry.
          </p>
        </div>

        {/* 3-Column Architecture Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Col 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Traditional Approach (Blind Spot)
            </div>
            <h3 className="text-lg font-bold text-white">
              Data Gaps Ignored
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Legacy stations without sensors are excluded from line analytics. When an operator struggles or a manual torque tool slips, the twin has zero visibility until defective cars fail final inspection.
            </p>
            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-[11px] font-mono text-rose-400">
              Risk: Multi-station defect escape & unpredicted manual bottlenecks.
            </div>
          </div>

          {/* Col 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-purple-500/40 space-y-4 shadow-xl shadow-purple-950/30">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              DigitalTwin.ai Virtual Inference
            </div>
            <h3 className="text-lg font-bold text-white">
              Surrogate Cross-Station Models
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              AI infers the likely state of a poorly monitored station by analyzing upstream part delivery timestamps, downstream optical arrival deltas, and historical operator takt variances.
            </p>
            <div className="p-3 rounded-xl bg-dark-950 border border-purple-500/30 text-[11px] font-mono text-purple-300">
              Result: 96.2% virtual sensor accuracy with ZERO physical wiring.
            </div>
          </div>

          {/* Col 3 */}
          <div className="p-6 rounded-2xl glass-panel border border-cyan-500/40 space-y-4 shadow-xl shadow-cyan-950/30">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Low-Risk Edge Tapping
            </div>
            <h3 className="text-lg font-bold text-white">
              No Live PLC Modification
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              OT networks cannot risk software glitches. DigitalTwin.ai connects via read-only passive optical taps and standard MQTT/OPC-UA brokers, keeping critical line interlocks 100% isolated and safe.
            </p>
            <div className="p-3 rounded-xl bg-dark-950 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              Safety: 100% read-only isolation with zero PLC code changes.
            </div>
          </div>

        </div>

        {/* Interactive Case Example: Station A-03 */}
        <div className="p-8 rounded-3xl glass-panel border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase mb-1">
                <Radio className="w-4 h-4 text-purple-400" />
                Live Case Study: Station A-03 (Manual Cockpit & Harness)
              </div>
              <h3 className="text-2xl font-bold text-white">
                How AI Predicts Harness Seating Without Strain Sensors
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
              Bayesian Confidence: 94.8%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">1. UPSTREAM SIGNAL</span>
              <h4 className="text-sm font-semibold text-white">Optical Chassis Entrance Trigger</h4>
              <p className="text-xs text-slate-400">
                Body arrives at Station S10; barcode scan confirms chassis harness kit dispatch timestamp at t = 00:00.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">2. AI STATE ESTIMATION</span>
              <h4 className="text-sm font-semibold text-white">Bayesian Operator Pacing Filter</h4>
              <p className="text-xs text-slate-300">
                AI correlates operator pick-to-light dwell time against shift fatigue curves to infer 22N connector clip tension.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">3. DOWNSTREAM VERIFICATION</span>
              <h4 className="text-sm font-semibold text-white">S14 Continuity Confirmation</h4>
              <p className="text-xs text-slate-400">
                Electrical flash-probe at testing stand confirms zero open circuits, closing the inference calibration loop.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'sections', 'InferenceDeepDive.jsx'), inferenceCode, 'utf8');
console.log('Saved InferenceDeepDive.jsx');
