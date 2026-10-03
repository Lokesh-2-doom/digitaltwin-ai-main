import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sliders, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function BusinessImpactView() {
  const [vehiclesPerDay, setVehiclesPerDay] = useState(800);
  const [operatingHours, setOperatingHours] = useState(5000);
  const [downtimeCostPerHour, setDowntimeCostPerHour] = useState(18000);
  const [defectRatePct, setDefectRatePct] = useState(3.5);
  const [reworkCostPerUnit, setReworkCostPerUnit] = useState(650);
  const [improvementPct, setImprovementPct] = useState(35);

  const totalVehiclesPerYear = (vehiclesPerDay / 16) * operatingHours;
  const baselineDowntimeHours = operatingHours * 0.045;
  const downtimeHoursAvoided = (baselineDowntimeHours * (improvementPct / 100));
  const downtimeSavings = downtimeHoursAvoided * downtimeCostPerHour;

  const baselineDefects = totalVehiclesPerYear * (defectRatePct / 100);
  const defectsAvoided = baselineDefects * (improvementPct / 100);
  const defectSavings = defectsAvoided * reworkCostPerUnit;

  const totalAnnualBenefit = downtimeSavings + defectSavings;
  const estimatedImplementationCost = 480000;
  const paybackMonths = (estimatedImplementationCost / totalAnnualBenefit) * 12;
  const netROI = ((totalAnnualBenefit - estimatedImplementationCost) / estimatedImplementationCost) * 100;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            Financial Engineering & Business Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Plant ROI & Value Creation Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Configure line operational parameters to calculate quantified cost avoidance and payback velocity.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-dark-900 border border-slate-800 text-[11px] font-mono text-slate-400">
          <strong className="text-amber-400 font-bold">* Notice:</strong> Illustrative prototype estimate
        </div>
      </div>

      {/* 1. Results Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-dark-900 border border-emerald-500/40 shadow-2xl text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Annual Cost Avoidance</span>
          <div className="text-3xl font-display font-black text-emerald-400">
            ${(totalAnnualBenefit / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] font-mono text-emerald-500 mt-1 block">Downtime + Scrap Interception</span>
        </div>

        <div className="p-5 rounded-3xl bg-dark-900 border border-cyan-500/40 shadow-2xl text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Payback Period</span>
          <div className="text-3xl font-display font-black text-cyan-400">
            {paybackMonths.toFixed(1)} <span className="text-lg font-sans text-slate-300">Months</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 mt-1 block">Fast capital recovery</span>
        </div>

        <div className="p-5 rounded-3xl bg-dark-900 border border-purple-500/40 shadow-2xl text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Downtime Avoided</span>
          <div className="text-3xl font-display font-black text-purple-400">
            {downtimeHoursAvoided.toFixed(0)} <span className="text-lg font-sans text-slate-300">Hours/Yr</span>
          </div>
          <span className="text-[10px] font-mono text-purple-300 mt-1 block">Via 20m advance warnings</span>
        </div>

        <div className="p-5 rounded-3xl bg-dark-900 border border-amber-500/40 shadow-2xl text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Net 3-Year ROI</span>
          <div className="text-3xl font-display font-black text-amber-400">
            {netROI.toFixed(0)}%
          </div>
          <span className="text-[10px] font-mono text-amber-300 mt-1 block">Enterprise multi-plant value</span>
        </div>
      </div>

      {/* 2. Interactive Parameter Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sliders Box */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
              Configurable Plant Production Assumptions
            </h3>
          </div>

          {/* Slider 1: Vehicles Per Day */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Daily Production Volume (Vehicles / Day):</span>
              <strong className="text-cyan-400 text-sm">{vehiclesPerDay} units</strong>
            </div>
            <input
              type="range"
              min="200"
              max="1500"
              step="50"
              value={vehiclesPerDay}
              onChange={(e) => setVehiclesPerDay(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Slider 2: Operating Hours */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Annual Operating Hours:</span>
              <strong className="text-cyan-400 text-sm">{operatingHours} hrs</strong>
            </div>
            <input
              type="range"
              min="2000"
              max="8000"
              step="250"
              value={operatingHours}
              onChange={(e) => setOperatingHours(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Slider 3: Downtime Cost Per Hour */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Unplanned Downtime Cost ($ / Hour):</span>
              <strong className="text-amber-400 text-sm">${downtimeCostPerHour.toLocaleString()}</strong>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={downtimeCostPerHour}
              onChange={(e) => setDowntimeCostPerHour(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Slider 4: Expected AI Improvement % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Expected Disruption Reduction (%):</span>
              <strong className="text-emerald-400 text-sm">{improvementPct}%</strong>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={improvementPct}
              onChange={(e) => setImprovementPct(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
              Quantified Value Breakdown
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block text-sm">Unplanned Downtime Avoidance</strong>
                <span className="text-slate-400 text-[11px]">{downtimeHoursAvoided.toFixed(0)} hours intercepted</span>
              </div>
              <span className="text-lg font-bold text-emerald-400 font-display">
                ${(downtimeSavings / 1000).toFixed(0)}k / yr
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block text-sm">Scrap & Multi-Vehicle Rework Interception</strong>
                <span className="text-slate-400 text-[11px]">{defectsAvoided.toFixed(0)} defective units avoided</span>
              </div>
              <span className="text-lg font-bold text-emerald-400 font-display">
                ${(defectSavings / 1000).toFixed(0)}k / yr
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 flex items-center justify-between">
              <div>
                <strong className="text-white block text-sm">Estimated Turnkey Deployment</strong>
                <span className="text-slate-400 text-[11px]">Hardware edge taps + software license</span>
              </div>
              <span className="text-lg font-bold text-slate-300 font-display">
                ${(estimatedImplementationCost / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Model Validation Note:</strong> Values shown are illustrative prototype estimates derived from typical high-volume OEM assembly lines. Real customer metrics vary by takt speed and automation density.
          </div>
        </div>

      </div>

    </div>
  );
}
