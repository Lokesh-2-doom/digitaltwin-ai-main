import React, { useState } from 'react';
import { FileText, Play, GitBranch, ShieldAlert, CheckCircle2, TrendingUp, Cpu, Database, Layers, ArrowRight, Download, ExternalLink, Video, Sparkles, Terminal, Copy, Lock, Server } from 'lucide-react';

export default function PlatformArchitectureHub({ onScrollToTwin, onOpenSimulator }) {
  const [activeTab, setActiveTab] = useState('architecture');
  const [copied, setCopied] = useState(false);
  const [activeRoadmapPhase, setActiveRoadmapPhase] = useState(1);

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="platform-hub" className="py-16 sm:py-24 bg-[#050811] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase mb-3">
            <Server className="w-3.5 h-3.5" />
            Enterprise Platform Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Industrial-Grade Scalability & OT Security
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Built from the ground up to operate within live factory constraints—zero PLC code modifications, non-invasive edge ingestion, and continuous model self-calibration.
          </p>
        </div>

        {/* Deliverables Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-cyan-500 text-dark-950 shadow-lg shadow-cyan-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Platform Architecture & Data Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'roadmap'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>2. Phased Rollout Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-emerald-500 text-dark-950 shadow-lg shadow-emerald-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>3. OT Risk & Cybersecurity Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('integration')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'integration'
                ? 'bg-amber-500 text-dark-950 shadow-lg shadow-amber-500/30'
                : 'bg-dark-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>4. Edge Ingestion SDK & API</span>
          </button>
        </div>

        {/* TAB 1: ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase block mb-1">
                    End-to-End System Topology
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    The 5-Stage "Predict, Prevent, Perform" Engine
                  </h3>
                </div>
                <button
                  onClick={onScrollToTwin}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>View Live 3D Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5-Stage Diagram */}
              <div className="p-6 rounded-2xl bg-dark-950 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <span className="text-cyan-400 font-bold block">1. DATA INPUT</span>
                    <p className="text-[11px] text-slate-300">
                      Passive taps on PLCs, high-speed optical vision cameras, torque tool feeds, and MES logs.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <span className="text-purple-400 font-bold block">2. DIGITAL TWIN</span>
                    <p className="text-[11px] text-slate-300">
                      Live virtual representation of all 40+ assembly stations with dynamic conveyor buffer state graph.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <span className="text-blue-400 font-bold block">3. AI ENGINE</span>
                    <p className="text-[11px] text-slate-300">
                      Graph neural network propagation forecasts and Bayesian surrogate inference for uninstrumented stages.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <span className="text-amber-400 font-bold block">4. INSIGHTS & ALERTS</span>
                    <p className="text-[11px] text-slate-300">
                      Advance warnings delivered with 20-25 minute lead time: "Bottleneck in Station B-04 in 23 minutes".
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
                    <span className="text-emerald-400 font-bold block">5. ACTION & LOOP</span>
                    <p className="text-[11px] text-slate-300">
                      1-click operator prescriptive interventions feeding back into continuous model auto-tuning.
                    </p>
                  </div>
                </div>

                <div className="text-center text-xs font-mono text-emerald-400 pt-2 border-t border-slate-800/80">
                  &circlearrowleft; Continuous Feedback & Learning Loop &circlearrowright;
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">Line Scope</span>
                  <h4 className="text-sm font-bold text-white">40–50 Stations / Line</h4>
                  <p className="text-xs text-slate-300">
                    Spans Body Construction, Paint Tunnel, Powertrain Marriage, Final Interior/Exterior Assembly, and EOL Flash Testing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase block">Sensor Coverage Split</span>
                  <h4 className="text-sm font-bold text-white">65% Instrumented / 35% Inferred</h4>
                  <p className="text-xs text-slate-300">
                    Operates in realistic brownfield plants where modern robots mix with legacy PLCs and manual inspection benches.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">Latency & Throughput</span>
                  <h4 className="text-sm font-bold text-white">&lt; 42ms Ingestion Latency</h4>
                  <p className="text-xs text-slate-300">
                    Processes 10,000 telemetry events per second per assembly line with millisecond WebGL state synchronization.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase block mb-1">
                    Enterprise Deployment
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
                          ? 'bg-purple-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Phase {ph}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Phase Content */}
              <div className="p-6 rounded-2xl bg-dark-950 border border-purple-500/30 space-y-4">
                {activeRoadmapPhase === 1 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
                      <span className="font-bold">PHASE 1: Passive Edge Ingestion & Surrogate Calibration (Months 1–3)</span>
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30">Pilot Line</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Non-Invasive Edge Tapping on Single Target Assembly Line</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Deploy passive optical taps on industrial network switches and connect to existing MQTT/OPC-UA brokers without touching live PLC control loops. Train cross-station Bayesian surrogate models on historical MES and sensor logs to calibrate sensor-poor station estimators.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-purple-400 block font-bold mb-1">Milestone 1:</span>
                        Full 40-station state graph mapped in Digital Twin.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-purple-400 block font-bold mb-1">Milestone 2:</span>
                        Surrogate model accuracy validated &gt; 94% on blind test shifts.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-purple-400 block font-bold mb-1">Milestone 3:</span>
                        Zero production downtime during deployment.
                      </div>
                    </div>
                  </div>
                )}

                {activeRoadmapPhase === 2 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                      <span className="font-bold">PHASE 2: Live Predictive Early Warning & Supervisor HUD (Months 4–6)</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">Plant Floor Integration</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Active Closed-Loop Warning & Mitigation Pilot</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Launch Floor Supervisor tablet HUD and Plant Manager dashboards. Activate real-time 20-minute advance bottleneck and defect alerts. Establish operator feedback loops to tune false-positive suppression filters and refine prescriptive recommendations.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 block font-bold mb-1">Milestone 1:</span>
                        Advance warning lead times verified at 20-25 minutes.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 block font-bold mb-1">Milestone 2:</span>
                        Downstream starvation occurrences reduced by 60%.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-cyan-400 block font-bold mb-1">Milestone 3:</span>
                        Operator prescriptive acceptance rate &gt; 85%.
                      </div>
                    </div>
                  </div>
                )}

                {activeRoadmapPhase === 3 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                      <span className="font-bold">PHASE 3: Multi-Plant Fleet Rollout & Transfer Learning (Months 7–12)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">Enterprise Scale</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Cross-Plant Multi-Site Generalization</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Scale the solution across Body, Paint, and Final Assembly across all manufacturing plants. Deploy federated transfer learning to adapt models to site-specific vintage variations, varying takt speeds, and unique equipment layouts.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 block font-bold mb-1">Milestone 1:</span>
                        Enterprise-wide multi-plant executive console.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 block font-bold mb-1">Milestone 2:</span>
                        $9.8M cumulative enterprise annual cost avoidance.
                      </div>
                      <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 block font-bold mb-1">Milestone 3:</span>
                        Automated surrogate model self-tuning.
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: OT RISK & SECURITY */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block mb-1">
                  Industrial Governance & Reliability
                </span>
                <h3 className="text-2xl font-bold text-white">
                  OT Security, Safety & Risk Mitigation Matrix
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">RISK 1: False Alarm Fatigue</span>
                    <span className="text-slate-400">Severity: High</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    If predictions frequently alert for non-existent bottlenecks, floor operators will ignore future notifications.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> Dual Bayesian confidence gating. Alarms only trigger when model confidence &gt; 92% and propagation probability &gt; 85%.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-bold">RISK 2: PLC Operational Integrity</span>
                    <span className="text-slate-400">Severity: Critical</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Modifying live PLC code or control logic carries severe risk of unplanned halts or safety interlock disruption.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> 100% read-only optical taps and isolated edge gateways. Zero write permissions to safety PLCs.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">RISK 3: Sensor-Gap Calibration Drift</span>
                    <span className="text-slate-400">Severity: Medium</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Tooling wear or operator changes at manual stations could shift underlying data distributions.
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
                    <strong>Mitigation:</strong> Continuous downstream validation checkpoints (e.g. flash tester at EOL) trigger automated surrogate retraining.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">RISK 4: Multi-Site Layout Heterogeneity</span>
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

        {/* TAB 4: EDGE SDK & API */}
        {activeTab === 'integration' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase block mb-1">
                    Integration Developer Kit
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Edge Ingestion SDK & Real-Time Telemetry API
                  </h3>
                </div>

                <button
                  onClick={() => handleCopyCode('npm install @digitaltwin-ai/edge-sdk')}
                  className="px-4 py-2 rounded-xl bg-dark-950 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy SDK Install'}</span>
                </button>
              </div>

              {/* Code Snippet */}
              <div className="rounded-2xl bg-dark-950 border border-slate-800 overflow-hidden font-mono text-xs">
                <div className="bg-dark-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
                  <span className="font-bold text-slate-200">edge_ingest_broker.ts</span>
                  <span>Protocol: MQTT / OPC-UA / gRPC</span>
                </div>

                <div className="p-6 text-cyan-300 space-y-2 overflow-x-auto">
                  <pre className="text-[12px] leading-relaxed">
{`import { DigitalTwinClient } from '@digitaltwin-ai/edge-sdk';

const twin = new DigitalTwinClient({
  plantId: 'PLANT-ALPHA-DETROIT',
  lineId: 'MAIN-ASSEMBLY-01',
  edgeBrokerUrl: 'mqtts://edge-gateway.internal.plant:8883',
  inferenceMode: 'BAYESIAN_SURROGATE_ACTIVE'
});

// Stream high-frequency telemetry without impacting PLC cycle logic
twin.onTelemetry((telemetry) => {
  if (telemetry.stationId === 'STN-B04' && telemetry.cycleDeltaSeconds > 4.0) {
    const forecast = twin.predictPropagation({
      sourceStation: 'STN-B04',
      currentDelta: telemetry.cycleDeltaSeconds,
      bufferStates: twin.getBufferGraph()
    });
    
    console.log(\`[EARLY WARNING] Starvation in \${forecast.leadTimeMinutes} mins at STN-P01\`);
  }
});`}
                  </pre>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
