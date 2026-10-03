import React, { useState } from 'react';
import { SIMULATION_SCENARIOS } from '../../data/simulationScenarios';
import { Play, RotateCcw, AlertTriangle, Zap, CheckCircle2, Clock, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SimulationSandbox({ onInspectStation }) {
  const [activeScenarioId, setActiveScenarioId] = useState('bottleneck_propagation');
  const [simStep, setSimStep] = useState(0);
  const [resolved, setResolved] = useState(false);

  const scenario = SIMULATION_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATION_SCENARIOS[0];

  const handleSelectScenario = (id) => {
    setActiveScenarioId(id);
    setSimStep(0);
    setResolved(false);
  };

  const handleStepForward = () => {
    if (simStep < scenario.propagationTimeline.length - 1) {
      setSimStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setSimStep(0);
    setResolved(false);
  };

  const handleApplyResolution = () => {
    setResolved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="simulator" className="py-16 bg-dark-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase mb-3">
            <Play className="w-3.5 h-3.5 fill-current" />
            Interactive Scenario Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Run "What-If" Industrial Predictive Scenarios
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Test how DigitalTwin.ai intercepts emerging micro-anomalies in real time across Body, Paint, and Final Assembly before they escalate into line stoppages.
          </p>
        </div>

        {/* Scenario Picker Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {SIMULATION_SCENARIOS.map((sc) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className={`p-5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-dark-850 border-cyan-500 shadow-xl shadow-cyan-950/60 scale-[1.01]'
                    : 'bg-dark-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded border ${sc.badgeColor}`}>
                      {sc.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{sc.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {sc.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {sc.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>{sc.stationName.split('(')[0]}</span>
                  <span>{isSelected ? 'Active Simulator' : 'Select &rarr;'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Scenario Player Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                  {scenario.stationId}
                </span>
                <span className="text-xs font-bold text-white">
                  {scenario.stationName}
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl">
                {scenario.problemSummary}
              </p>
            </div>

            {/* Step Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleStepForward}
                disabled={simStep >= scenario.propagationTimeline.length - 1}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-dark-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <span>Step Forward ({simStep + 1}/{scenario.propagationTimeline.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Reset Timeline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Timeline Propagation Bar */}
          <div className="mb-8">
            <span className="text-xs font-mono text-slate-400 uppercase font-bold block mb-3">
              Propagation Timeline (Ripple Tracking across Stations):
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {scenario.propagationTimeline.map((item, idx) => {
                const isCurrent = idx === simStep;
                const isPassed = idx < simStep;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-950/40 scale-[1.02]'
                        : isPassed
                        ? 'bg-dark-950 border-slate-700 opacity-90'
                        : 'bg-dark-950/60 border-slate-900 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className={`font-bold ${isCurrent ? 'text-amber-400' : isPassed ? 'text-cyan-400' : 'text-slate-500'}`}>
                        T + {item.minute} MINS
                      </span>
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>}
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-xs text-slate-200 leading-snug">
                      {item.event}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comparison Split: Unassisted Plant vs DigitalTwin.ai */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-dark-950/90 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Without DigitalTwin.ai (Traditional Plant)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {scenario.traditionalOutcome}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-950/90 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                With DigitalTwin.ai Connected Intelligence
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {scenario.aiPrescription}
              </p>
            </div>
          </div>

          {/* AI Prescriptive Intervention Action Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase mb-0.5">
                <Zap className="w-4 h-4 text-cyan-400 fill-current" />
                <span>One-Click Prescriptive Closed-Loop Intervention</span>
              </div>
              <p className="text-xs text-slate-300">
                Execute AI recommended buffer balancing to prevent line starvation before T+23 mins.
              </p>
            </div>

            {!resolved ? (
              <button
                onClick={handleApplyResolution}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition-all shrink-0 active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Execute Intervention</span>
              </button>
            ) : (
              <div className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Intervention Active — Throughput 98.4% Saved!</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
