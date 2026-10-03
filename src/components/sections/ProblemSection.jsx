import React, { useState } from 'react';
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
                ${estimatedCostLossUSD}
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
