const fs = require('fs');
const path = require('path');

// HeroSection.jsx
const heroCode = `import React from 'react';
import { Activity, Shield, ArrowRight, Play, Cpu, Layers, Sparkles, AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';

export default function HeroSection({ onOpenSimulator, onScrollToTwin }) {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden bg-radial-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>CONNECTED INTELLIGENCE FOR VEHICLE ASSEMBLY LINES</span>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">&bull;</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Virtual Sensor Inference Active</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.1]">
            Predict Bottlenecks <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
              Before They Stop The Line
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            A vehicle assembly line is a chain of interdependent processes. <strong>DigitalTwin.ai</strong> creates a continuous live virtual model of your factory, bridging legacy sensor gaps and warning your plant teams <strong>20+ minutes before</strong> micro-disruptions become multi-thousand dollar shutdowns.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToTwin}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-display font-black text-sm tracking-wider uppercase shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore 3D Digital Twin
            </button>

            <button
              onClick={onOpenSimulator}
              className="px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 border border-cyan-500/30 text-white font-display font-bold text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all shadow-lg hover:border-cyan-400"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-current" />
              <span>Simulate 23-Min Warning</span>
            </button>
          </div>
        </div>

        {/* Live Industrial Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-4">
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-cyan-500/40 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Advance Bottleneck Warning
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-cyan-400">
              20–25 <span className="text-sm font-sans font-normal text-slate-300">mins</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Lead time before line starvation</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-purple-500/40 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Sensor-Gap AI Accuracy
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-purple-400">
              96.2<span className="text-sm font-sans font-normal text-slate-300">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Bayesian surrogate state inference</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-emerald-500/40 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Scrap & Defect Reduction
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400">
              -34.8<span className="text-sm font-sans font-normal text-slate-300">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Interception before EOL inspection</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-amber-500/40 transition-all">
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Annual Savings / Line
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-amber-400">
              $2.45<span className="text-sm font-sans font-normal text-slate-300">M</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Downtime & rework cost avoidance</p>
          </div>
        </div>

      </div>
    </section>
  );
}
`;

// ProblemSection.jsx
const problemCode = `import React, { useState } from 'react';
import { AlertCircle, TrendingDown, Clock, ShieldAlert, Cpu, CheckCircle2, ChevronRight, Layers, DollarSign } from 'lucide-react';

export default function ProblemSection() {
  const [delaySeconds, setDelaySeconds] = useState(15);

  const starvedStationsCount = Math.min(8, Math.floor(delaySeconds / 2.5));
  const wipBacklogVehicles = Math.min(6, Math.floor(delaySeconds / 3));
  const estimatedCostLossUSD = (delaySeconds * 1850).toLocaleString();
  const propagationMinutes = Math.round(delaySeconds * 1.5);

  return (
    <section id="problem" className="py-16 bg-dark-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs font-bold uppercase mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            The Industrial Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Why Individual Machine Visibility Isn't Enough
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            A vehicle assembly line is a chain of interdependent processes. When a single station slows down, work-in-progress (WIP) accumulates upstream while downstream stations starve.
          </p>
        </div>

        {/* 3 Core Industrial Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-mono font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              The Disruption Ripple Effect
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A 15-second micro-stop at Station 4 (Body Clamping) does not stay local. Upstream buffers fill in minutes, and downstream paint & assembly stations run out of chassis 20 minutes later.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
              Outcome: 34 mins downstream idle time
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 font-mono font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Silent Quality Multipliers
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              An early process deviation (e.g. minor paint spray pressure drop) may not produce an immediate obvious defect. It propagates silently across 15–20 vehicles before EOL inspection catches it.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-rose-400">
              Outcome: $54,000 multi-vehicle rework wave
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Patchwork & Uneven Sensors
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Factories mix modern robots with 20-year-old legacy PLCs and manual checklist stations. Retooling live lines carries high operational risk and can only happen during rare shutdowns.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-purple-400">
              Outcome: Blind spots at critical manual stages
            </div>
          </div>
        </div>

        {/* Interactive Disruption Ripple Visualizer */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase mb-1">
                <Layers className="w-4 h-4 text-cyan-400" />
                Interactive Line Disruption Simulator
              </div>
              <h3 className="text-2xl font-bold text-white">
                How a Micro-Stop Propagates Across the Line
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Slide the cycle delay below to observe how an unpredicted micro-stop at Station B-04 causes cumulative downstream starvation and cost escalation.
              </p>
            </div>

            {/* Slider Control */}
            <div className="w-full lg:w-72 p-4 rounded-2xl bg-dark-950 border border-slate-800">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Station B-04 Delay:</span>
                <span className="text-amber-400 font-bold">+{delaySeconds} seconds</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="2"
                value={delaySeconds}
                onChange={(e) => setDelaySeconds(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0s (Nominal)</span>
                <span>15s (Typical)</span>
                <span>30s (Severe)</span>
              </div>
            </div>
          </div>

          {/* Interactive Impact Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">STARVED STATIONS</span>
              <span className="text-2xl font-display font-black text-rose-400">
                {starvedStationsCount} <span className="text-xs font-sans text-slate-400">stations</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Downstream Paint & Assembly</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">UPSTREAM WIP CLOG</span>
              <span className="text-2xl font-display font-black text-amber-400">
                +{wipBacklogVehicles} <span className="text-xs font-sans text-slate-400">chassis</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Buffer capacity saturated</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">RIPPLE LATENCY</span>
              <span className="text-2xl font-display font-black text-purple-400">
                {propagationMinutes} <span className="text-xs font-sans text-slate-400">mins</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Before full line pause</span>
            </div>

            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">ESTIMATED SHIFT LOSS</span>
              <span className="text-2xl font-display font-black text-rose-400">
                \${estimatedCostLossUSD}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Idle labor & throughput loss</span>
            </div>
          </div>

          {/* Direct Core Quote Highlight */}
          <div className="p-5 rounded-2xl bg-dark-950/80 border border-cyan-500/30 text-slate-200">
            <p className="text-sm font-semibold text-cyan-200 leading-relaxed">
              "The real problem is therefore not simply visibility. It is the lack of early, connected intelligence that can understand the behaviour of the entire line, identify emerging patterns and warn teams before a bottleneck or defect becomes a production problem."
            </p>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-2.5">
              <span>Core Question: <strong>Can we provide a sign or warning before something goes wrong?</strong></span>
              <span className="text-cyan-400 font-bold">&rarr; DigitalTwin.ai Solution</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
`;

// SolutionArchitecture.jsx
const solutionCode = `import React, { useState } from 'react';
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
                className={\`p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between \${
                  isActive
                    ? 'bg-dark-850 border-cyan-500 shadow-lg shadow-cyan-950/60 scale-[1.02]'
                    : 'bg-dark-900/80 border-slate-800 hover:border-slate-700'
                }\`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={\`text-xs font-mono font-bold \${isActive ? 'text-cyan-400' : 'text-slate-400'}\`}>
                      {step.name}
                    </span>
                    <Icon className={\`w-4 h-4 \${isActive ? 'text-cyan-400' : 'text-slate-400'}\`} />
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
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'sections', 'HeroSection.jsx'), heroCode, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'sections', 'ProblemSection.jsx'), problemCode, 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'sections', 'SolutionArchitecture.jsx'), solutionCode, 'utf8');
console.log('Saved HeroSection, ProblemSection, SolutionArchitecture');
