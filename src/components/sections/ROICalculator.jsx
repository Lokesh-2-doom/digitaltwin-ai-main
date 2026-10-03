import React, { useState } from 'react';
import { DollarSign, TrendingUp, ShieldCheck, Check, Sparkles, Building, Layers } from 'lucide-react';

export default function ROICalculator() {
  const [linesCount, setLinesCount] = useState(2);
  const [shiftsPerDay, setShiftsPerDay] = useState(2);
  const [hourlyDowntimeCost, setHourlyDowntimeCost] = useState(24000);

  const annualDowntimeHoursSaved = linesCount * 64;
  const directDowntimeSavings = annualDowntimeHoursSaved * hourlyDowntimeCost;
  const scrapReworkSavings = linesCount * 420000;
  const totalAnnualSavingsUSD = directDowntimeSavings + scrapReworkSavings;
  const estimatedPaybackMonths = Math.max(2.5, ((linesCount * 120000) / (totalAnnualSavingsUSD / 12)).toFixed(1));

  return (
    <section id="roi" className="py-16 bg-dark-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            Financial & Business Value
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Interactive Digital Twin ROI Calculator
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Calculate the exact financial impact of predictive bottleneck elimination and defect ripple containment across your manufacturing footprint.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white">
              Assembly Plant Parameters
            </h3>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Number of Assembly Lines:</span>
                <span className="text-cyan-400 font-bold">{linesCount} Lines</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={linesCount}
                onChange={(e) => setLinesCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Production Shifts per Day:</span>
                <span className="text-purple-400 font-bold">{shiftsPerDay} Shifts</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={shiftsPerDay}
                onChange={(e) => setShiftsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">Estimated Unplanned Downtime Cost / Hour:</span>
                <span className="text-amber-400 font-bold">${hourlyDowntimeCost.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="50000"
                step="2000"
                value={hourlyDowntimeCost}
                onChange={(e) => setHourlyDowntimeCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="text-cyan-400 font-bold block mb-1">ZERO LIVE DISRUPTION:</span>
              Non-invasive passive optical taps enable deployment without interrupting scheduled production shifts.
            </div>
          </div>

          {/* Impact Results Card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-dark-900 to-dark-850 border border-emerald-500/40 shadow-2xl shadow-emerald-950/30 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
              Projected Annual Business Value
            </span>

            <div className="p-6 rounded-2xl bg-dark-950 border border-emerald-500/30 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase block mb-1">
                TOTAL ANNUAL COST AVOIDANCE
              </span>
              <div className="text-4xl sm:text-5xl font-display font-black text-emerald-400">
                ${totalAnnualSavingsUSD.toLocaleString()}
              </div>
              <span className="text-xs font-mono text-slate-400 block mt-2">
                Payback Horizon: <strong className="text-white">{estimatedPaybackMonths} Months</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">DOWNTIME SAVINGS</span>
                <span className="text-base font-bold text-cyan-400">${directDowntimeSavings.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{annualDowntimeHoursSaved} hrs saved</span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">SCRAP REDUCTION</span>
                <span className="text-base font-bold text-purple-400">${scrapReworkSavings.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">-34.8% rework rate</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Investment backed by validated model precision and continuous learning feedback loops.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
