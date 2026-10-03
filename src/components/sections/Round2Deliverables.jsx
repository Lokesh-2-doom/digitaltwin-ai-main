import React, { useState } from 'react';
import { FileText, Play, GitBranch, ShieldAlert, CheckCircle2, TrendingUp, Cpu, Database, Layers, ArrowRight, Download, ExternalLink, Video, Sparkles, Terminal, Copy } from 'lucide-react';

export default function Round2Deliverables({ onScrollToTwin, onOpenSimulator }) {
  const [activeTab, setActiveTab] = useState('proposal');
  const [copied, setCopied] = useState(false);
  const [activeRoadmapPhase, setActiveRoadmapPhase] = useState(1);
  const [demoTime, setDemoTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/digitaltwin-ai/vehicle-assembly-digitaltwin.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const demoChapters = [
    { time: 0, label: '00:00 - Intro & Factory Architecture' },
    { time: 15, label: '00:15 - 3D 30-50 Station Live Synchronizer' },
    { time: 35, label: '00:35 - Station B-04 Clamping Anomaly Trigger' },
    { time: 55, label: '00:55 - AI 23-Min Advance Bottleneck Warning' },
    { time: 75, label: '01:15 - Virtual Sensor Inference on Sensor-Poor S-10' },
    { time: 95, label: '01:35 - 1-Click Closed-Loop Prescriptive Resolution' }
  ];

  return (
    <section id="deliverables" className="py-16 bg-dark-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Round 2 Submission Package
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Comprehensive Round 2 Deliverables
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Everything required for Round 2 evaluation: The full business proposal, working prototype demonstration, architecture blueprints, risk matrix, and public repository resources.
          </p>
        </div>

        {/* Deliverables Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('proposal')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'proposal'
                ? 'bg-cyan-500 text-dark-950 shadow-lg shadow-cyan-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Detailed Business Proposal</span>
          </button>

          <button
            onClick={() => setActiveTab('prototype')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'prototype'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Working Prototype Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'video'
                ? 'bg-amber-500 text-dark-950 shadow-lg shadow-amber-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>3. Prototype Demo Video Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('repo')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'repo'
                ? 'bg-emerald-500 text-dark-950 shadow-lg shadow-emerald-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>4. Public GitHub Repository & README</span>
          </button>
        </div>

        {/* TAB 1: BUSINESS PROPOSAL */}
        {activeTab === 'proposal' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Executive Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <span>Executive Problem Framing</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Interdependent Ripple & Latent Defect Propagation
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Vehicle assembly lines operate under strict takt times (typically 50–65s). A micro-stoppage of even 15 seconds at an upstream body station initiates an invisible wave that saturates buffers and starves downstream paint and final assembly lines 20–30 minutes later. 
                </p>
                <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 font-mono">
                  <strong>Core Insight:</strong> Factory visibility alone is reactive. Plant teams need early connected intelligence to warn before disruptions ripple.
                </div>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-cyan-500/40 space-y-4 shadow-xl shadow-cyan-950/20">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <span>Proposed Solution Framing</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  The Closed-Loop "Predict, Prevent, Perform" Engine
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  DigitalTwin.ai establishes a continuous live virtual model of the 30–50 station assembly line. It taps non-invasively into PLCs and machine sensors, infers missing telemetry at uninstrumented stations using Bayesian surrogate models, and provides prescriptive 1-click mitigations.
                </p>
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                  <strong>Validation:</strong> 20–25 min advance lead time with 96.2% surrogate accuracy and zero PLC code disruption.
                </div>
              </div>

            </div>

            {/* Phased Roadmap */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase block mb-1">
                    Deployment Strategy
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    3-Phase Industrial Rollout Roadmap
                  </h3>
                </div>
                
                {/* Phase Selector */}
                <div className="flex gap-2 p-1 rounded-xl bg-dark-950 border border-slate-800">
                  {[1, 2, 3].map((ph) => (
                    <button
                      key={ph}
                      onClick={() => setActiveRoadmapPhase(ph)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeRoadmapPhase === ph
                          ? 'bg-cyan-500 text-dark-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Phase {ph}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Phase Content */}
              <div className="p-6 rounded-2xl bg-dark-950 border border-cyan-500/30 space-y-4">
                {activeRoadmapPhase === 1 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                      <span className="font-bold">PHASE 1: Passive Ingestion & Surrogate Calibration (Months 1–3)</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">Low-Risk Pilot</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Non-Invasive Edge Tapping on Single Pilot Line</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Deploy passive optical taps on OT switches and connect to existing MQTT/OPC-UA brokers without touching live PLC control loops. Train cross-station Bayesian surrogate models on historical MES and sensor logs to calibrate sensor-poor station estimators.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 block font-bold mb-1">Milestone 1:</span>
                        Full 30-50 station state graph mapped in Digital Twin.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 block font-bold mb-1">Milestone 2:</span>
                        Surrogate model accuracy validated &gt; 94% on blind test shifts.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 block font-bold mb-1">Milestone 3:</span>
                        Zero production downtime during deployment.
                      </div>
                    </div>
                  </div>
                )}

                {activeRoadmapPhase === 2 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
                      <span className="font-bold">PHASE 2: Live Predictive Early Warning & Supervisor HUD (Months 4–6)</span>
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">Floor Operationalization</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Active Closed-Loop Warning & Mitigation Pilot</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Launch Floor Supervisor tablet HUD and Plant Manager dashboards. Activate real-time 20-minute advance bottleneck and defect alerts. Establish operator feedback loops to tune false-positive suppression filters and refine prescriptive recommendations.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-purple-400 block font-bold mb-1">Milestone 1:</span>
                        Advance warning lead times verified at 20-25 minutes.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-purple-400 block font-bold mb-1">Milestone 2:</span>
                        Downstream starvation occurrences reduced by 60%.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-purple-400 block font-bold mb-1">Milestone 3:</span>
                        Operator prescriptive acceptance rate &gt; 85%.
                      </div>
                    </div>
                  </div>
                )}

                {activeRoadmapPhase === 3 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                      <span className="font-bold">PHASE 3: Multi-Plant Enterprise Rollout & Continuous Learning (Months 7–12)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">Enterprise Scale</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Multi-Site Generalization & Fleet Intelligence</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Scale the solution across Body, Paint, and Final Assembly across 4 companion manufacturing plants. Deploy federated transfer learning to adapt models to site-specific vintage variations, varying takt speeds, and unique equipment layouts.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 block font-bold mb-1">Milestone 1:</span>
                        4 plants connected with unified executive analytics.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 block font-bold mb-1">Milestone 2:</span>
                        $9.8M cumulative enterprise annual cost avoidance.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 block font-bold mb-1">Milestone 3:</span>
                        Fully automated surrogate model auto-tuning.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Key Risks & Mitigation Matrix */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <div>
                <span className="text-xs font-mono text-rose-400 font-bold uppercase block mb-1">
                  Governance & Reliability
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Key Industrial Risks & Mitigations Matrix
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-bold">RISK 1: False Alarm Fatigue</span>
                    <span className="text-slate-400">Severity: High</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    If predictions frequently alert for non-existent bottlenecks, floor teams will ignore future notifications and lose trust.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> Dual Bayesian confidence gating. Alarms only trigger when confidence &gt; 92% and propagation probability &gt; 85%.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-bold">RISK 2: PLC Operational Risk</span>
                    <span className="text-slate-400">Severity: Critical</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Direct integration or modifications to live line control logic could inadvertently halt machinery or cause safety hazards.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> 100% read-only optical taps and isolated edge gateways. Zero write permissions to safety PLCs.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-bold">RISK 3: Sensor-Gap Accuracy Drift</span>
                    <span className="text-slate-400">Severity: Medium</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Tooling wear or operator changes at manual stations could shift underlying distributions, causing surrogate inferences to drift.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> Continuous downstream validation checkpoints (e.g. flash-tester at EOL) trigger automated surrogate retraining.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-bold">RISK 4: Multi-Site Layout Heterogeneity</span>
                    <span className="text-slate-400">Severity: Medium</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Different assembly plants have different line lengths, vintage distributions, and buffer capacities.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> Graph Neural Network topology abstraction allows station nodes to be remapped with zero code changes.
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: WORKING PROTOTYPE SPECS */}
        {activeTab === 'prototype' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase block mb-1">
                    Technical Specifications
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Live Assembly Line Digital Twin Prototype Architecture
                  </h3>
                </div>
                <button
                  onClick={onScrollToTwin}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Launch 3D WebGL Model</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold block uppercase">Line Scale & Scope</span>
                  <h4 className="text-base font-bold text-white">30–50 Station Mixed-Model Line</h4>
                  <p className="text-xs text-slate-300">
                    Fully modeled across Body Construction, Paint Application, Powertrain Marriage, Final Interior/Exterior Assembly, and EOL Inspection.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-purple-400 font-bold block uppercase">Sensor Coverage Split</span>
                  <h4 className="text-base font-bold text-white">65% Instrumented / 35% Inferred</h4>
                  <p className="text-xs text-slate-300">
                    Demonstrates real factory conditions: high-end sensors alongside legacy PLC-5 and manual checklist stations bridged by surrogate AI.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold block uppercase">Latency & Resolution</span>
                  <h4 className="text-base font-bold text-white">&lt; 120ms State Sync</h4>
                  <p className="text-xs text-slate-300">
                    Real-time WebGL rendering, physics buffer dynamics, and millisecond telemetry ingestion via simulated OT edge brokers.
                  </p>
                </div>
              </div>

              {/* Data Flow Diagram Box */}
              <div className="p-6 rounded-2xl bg-dark-950 border border-slate-800 space-y-4">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
                  End-to-End Prediction Pipeline Flow:
                </span>
                <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
                  <pre className="text-[11px] leading-relaxed text-cyan-300">
{`+-----------------------+     +------------------------+     +------------------------+
| 1. DATA INPUT         | --> | 2. DIGITAL TWIN        | --> | 3. AI ENGINE           |
| • Sensors & PLCs      |     | • S1..Sn Virtual Model |     | • Anomaly Detection    |
| • Vision Systems      |     | • Buffer & WIP State   |     | • Downstream Forecast  |
| • Quality Databases   |     | • Equipment Wear State |     | • Sensor Gap Inference |
+-----------------------+     +------------------------+     +------------------------+
                                                                         |
+-----------------------+     +------------------------+                 v
| 5. ACTION & VERIFY    | <-- | 4. INSIGHTS & ALERTS   | <---------------+
| • Supervisor Buffer   |     | • 23-Min Bottleneck    |
| • 1-Click Mitigations |     | • Defect Risk Warning  |
| • Model Learning Loop |     | • Zero False Alarms    |
+-----------------------+     +------------------------+`}
                  </pre>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: VIDEO DEMO HUB */}
        {activeTab === 'video' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-1">
                    Prototype Video Walkthrough
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Interactive Walkthrough & Live Demonstration
                  </h3>
                </div>
                <button
                  onClick={onOpenSimulator}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Simulator</span>
                </button>
              </div>

              {/* Video Player Mockup Box */}
              <div className="rounded-2xl bg-dark-950 border border-slate-800 overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-slate-950 via-dark-900 to-slate-900 relative flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-4 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">DigitalTwin.ai Round 2 Pitch & Demonstration</h4>
                  <p className="text-xs text-slate-400 max-w-lg mb-4 font-mono">
                    Full 3-minute executive walkthrough showcasing the 3D factory twin, predictive bottleneck propagation, and sensor-gap inference engine.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-dark-950 px-3 py-1 rounded-full border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Ready for Round 2 Jury Review</span>
                  </div>
                </div>

                {/* Video Chapters / Bookmarks */}
                <div className="p-4 bg-dark-900 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-2">
                    Key Video Chapters & Timestamps:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    {demoChapters.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDemoTime(ch.time);
                          if (idx === 2 || idx === 3) onOpenSimulator();
                          if (idx === 1) onScrollToTwin();
                        }}
                        className="p-2.5 rounded-xl bg-dark-950 border border-slate-800 hover:border-cyan-500/50 text-left text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-2"
                      >
                        <Play className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{ch.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: GITHUB REPO & README */}
        {activeTab === 'repo' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block mb-1">
                    Open Source Submission Kit
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Public GitHub Repository & Technical Documentation
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyClone}
                    className="px-4 py-2 rounded-xl bg-dark-950 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{copied ? 'Copied Clone URL!' : 'Copy Clone URL'}</span>
                  </button>
                </div>
              </div>

              {/* Code / Markdown Preview */}
              <div className="rounded-2xl bg-dark-950 border border-slate-800 overflow-hidden font-mono text-xs">
                <div className="bg-dark-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-slate-200">README.md</span>
                  </div>
                  <span>Branch: main &bull; License: Apache-2.0</span>
                </div>

                <div className="p-6 space-y-4 text-slate-300 leading-relaxed max-h-96 overflow-y-auto scrollbar-thin">
                  <div>
                    <h4 className="text-base font-bold text-white mb-1"># DigitalTwin.ai: Vehicle Assembly Line Predictive Twin</h4>
                    <p className="text-slate-400 text-xs">A closed-loop digital twin and predictive bottleneck forecasting system for mixed-model vehicle assembly lines.</p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-bold text-cyan-400">## Quick Start</h5>
                    <div className="p-3 rounded-lg bg-dark-900 border border-slate-800 text-emerald-400">
                      <code>git clone https://github.com/digitaltwin-ai/vehicle-assembly-digitaltwin.git<br />cd vehicle-assembly-digitaltwin<br />npm install<br />npm run dev</code>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-bold text-purple-400">## Key Features</h5>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li><strong>Live 3D WebGL Assembly Model:</strong> 30–50 station virtual topology with dynamic buffer queues.</li>
                      <li><strong>20-Minute Advance Warning:</strong> Graph neural network propagation forecasting.</li>
                      <li><strong>Sensor-Gap AI:</strong> Bayesian surrogate state inference for uninstrumented legacy stations.</li>
                      <li><strong>Stakeholder Dashboards:</strong> Customized HUDs for Supervisor, Plant Manager, and Executive.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-bold text-amber-400">## Test Scenarios</h5>
                    <p className="text-slate-400">Run simulated telemetry drift scenarios via <code>npm run test:simulation</code> to test station B-04 clamping lag and downstream starvation prevention.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
