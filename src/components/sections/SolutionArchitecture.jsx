import React, { useState } from 'react';
import { Layers, Database, Cpu, Bell, CheckCircle2, Zap, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function SolutionArchitecture() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 1,
      name: '1. DATA INPUT',
      icon: Database,
      tag: 'Edge & PLC Ingestion',
      color: 'cyan',
      heading: 'Non-Invasive Data Tapping & Telemetry Ingestion',
      description: 'Collects high-frequency telemetry from PLCs, vision systems, quality inspection databases, and manual barcode checklists without modifying live PLC control logic.',
      details: [
        'Sensors & PLCs (Torque, vibration, temperature, current draw)',
        'Vision Systems (High-speed 3D gap & flush scanners)',
        'Quality Data (CMM, E-test electrical continuity logs)',
        'Production Data (MES shift schedules, takt pace)'
      ]
    },
    {
      id: 2,
      name: '2. DIGITAL TWIN',
      icon: Layers,
      tag: 'Live Virtual Model',
      color: 'purple',
      heading: 'Live Synchronized Virtual Model of the Assembly Line',
      description: 'Continuous physics-informed digital representation of all 30-50 stations (S1...Sn) across Body Shop, Paint Shop, Final Assembly, and Quality Testing.',
      details: [
        'Maintains real-time state graph of all conveyor buffers',
        'Tracks WIP accumulation and inter-station takt pacing',
        'Maps equipment vintage and historical wear curves',
        'Models thermal and kinematic dynamics in real time'
      ]
    },
    {
      id: 3,
      name: '3. AI ENGINE',
      icon: Cpu,
      tag: 'Predictive & Inference',
      color: 'blue',
      heading: 'Cross-Station Anomaly Detection & Sensor-Gap Inference',
      description: 'Applies Bayesian state estimation, graph neural networks, and SPC algorithms to detect emerging drifts, forecast propagation paths, and infer missing sensor values at legacy stations.',
      details: [
        'Detects subtle micro-anomalies before alarms trigger',
        'Predicts downstream propagation latency (20-25 mins lead)',
        'Infers missing data at sensor-poor / manual stations',
        'Formulates exact prescriptive interventions'
      ]
    },
    {
      id: 4,
      name: '4. INSIGHTS & ALERTS',
      icon: Bell,
      tag: 'Early Warning Hub',
      color: 'amber',
      heading: 'Actionable Early Warnings with Exact Lead Times',
      description: 'Converts complex statistical trends into high-trust warnings: WHERE the bottleneck/defect will occur, WHY it is happening, and WHAT impact it will produce.',
      details: [
        'Forecast: "Bottleneck in Station B-04 in 23 minutes"',
        'Forecast: "Defect risk increasing in Paint P-03 (68%)"',
        'Zero alarm fatigue: false-positive suppression filter',
        'Multi-stakeholder contextual routing'
      ]
    },
    {
      id: 5,
      name: '5. ACTION & LOOP',
      icon: CheckCircle2,
      tag: 'Closed-Loop Mitigation',
      color: 'emerald',
      heading: 'Prescriptive Operator Action & Continuous Improvement',
      description: 'Empowers floor supervisors and line managers with 1-click corrective interventions, closing the loop back into model retraining for continuous learning.',
      details: [
        'Operator / Team executes prescriptive mitigation',
        'Auto-rebalance buffer flow and dwell times',
        'Real-time verification of bottleneck mitigation',
        'Continuous Model Learning & Retraining Loop'
      ]
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <section id="solution" className="py-16 bg-dark-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase mb-3">
            <Zap className="w-3.5 h-3.5" />
            The Proposed Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            THE SOLUTION: PREDICT, PREVENT, PERFORM
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            A closed-loop predictive architecture continuously connected to physical machinery, turning sensor signals and virtual inferences into actionable prevention.
          </p>
        </div>

        {/* 5-Stage Interactive Flow Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-dark-850 border-cyan-500 shadow-lg shadow-cyan-950/60 scale-[1.02]'
                    : 'bg-dark-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {step.name}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    {step.tag}
                  </div>
                </div>

                {isActive && (
                  <div className="mt-3 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel for Selected Stage */}
        <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-bold">
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">STAGE {currentStep.id} OF 5</span>
                <span>{currentStep.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentStep.heading}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
                  Core Architectural Capabilities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.details.map((det, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-2 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Graphic on Right */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-dark-950/90 border border-slate-800 space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Closed-Loop Architecture</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Loop
                </span>
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Data Ingestion Rate:</span>
                  <span className="text-cyan-400 font-bold">10,000 Hz / Line</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Inference Latency:</span>
                  <span className="text-purple-400 font-bold">&lt; 120 ms</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Model Validation Rate:</span>
                  <span className="text-emerald-400 font-bold">99.4% against actuals</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>PLC Retrofit Overhead:</span>
                  <span className="text-cyan-400 font-bold">0 hrs live disruption</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-300 leading-relaxed">
                Continuous feedback from operator action back to Data Input guarantees models learn from human resolutions and never repeat false alarms.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
