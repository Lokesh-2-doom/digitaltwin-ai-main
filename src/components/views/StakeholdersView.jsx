import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Layers, 
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function StakeholdersView() {
  const [role, setRole] = useState<'supervisor' | 'manager' | 'executive'>('supervisor');
  const { stations, setSelectedStation, setActiveTab } = useAppStore();

  const warningCount = stations.filter(s => s.status === 'warning' || s.status === 'critical').length;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">
            <Users className="w-3.5 h-3.5" />
            Role-Tailored Operational Consoles
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Multi-Stakeholder Intelligence Consoles
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            One underlying Digital Twin. Three purpose-built operational interfaces for every tier of plant hierarchy.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-dark-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setRole('supervisor')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              role === 'supervisor'
                ? 'bg-cyan-500 text-dark-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Floor Supervisor
          </button>
          <button
            onClick={() => setRole('manager')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              role === 'manager'
                ? 'bg-cyan-500 text-dark-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Plant Manager
          </button>
          <button
            onClick={() => setRole('executive')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              role === 'executive'
                ? 'bg-cyan-500 text-dark-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Executive Leadership
          </button>
        </div>
      </div>

      {/* Role 1: Floor Supervisor Cockpit */}
      {role === 'supervisor' && (
        <div className="space-y-6 animate-in slide-in-from-left-2 duration-300">
          <div className="p-6 rounded-3xl bg-dark-900 border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <h3 className="text-lg font-display font-black text-white">
                  Live Shift Command Cockpit (Next 30 Minutes)
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                SHIFT A &bull; LINE SPEED: 60 JPH
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Current Line Takt</span>
                <span className="text-2xl font-bold text-white">58.2s</span>
                <span className="text-[10px] text-emerald-400 block">+1.8s buffer margin</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-amber-500/30 bg-amber-500/5">
                <span className="text-[10px] text-amber-300 block uppercase">Active Forecast Warnings</span>
                <span className="text-2xl font-bold text-amber-400">1 Warning</span>
                <span className="text-[10px] text-amber-300 block">ST14 Bottleneck (22m)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Buffer Saturation</span>
                <span className="text-2xl font-bold text-cyan-400">41.8%</span>
                <span className="text-[10px] text-slate-400 block">Optimal pacing</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Shift Target Progress</span>
                <span className="text-2xl font-bold text-emerald-400">412 / 480</span>
                <span className="text-[10px] text-slate-400 block">85.8% complete</span>
              </div>
            </div>

            {/* Immediate Action Panel */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Immediate Prescriptive Action Required:
                </span>
                <span className="text-slate-400">Lead Time: 22 Minutes Remaining</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Station <strong>ST14 (E-Coat Dip)</strong> is experiencing upstream pneumatic clamping lag from <strong>ST11</strong>. Rebalance buffer dwell pacing by +4s from preceding station ST13 to prevent downstream line starvation.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('digitalTwin')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-mono text-xs font-black shadow-lg shadow-cyan-500/20"
                >
                  Inspect on 3D Digital Twin &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role 2: Plant Manager Console */}
      {role === 'manager' && (
        <div className="space-y-6 animate-in slide-in-from-left-2 duration-300">
          <div className="p-6 rounded-3xl bg-dark-900 border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-black text-white">
                Plant Manager Tactical Console (Weekly OEE & Reliability)
              </h3>
              <span className="text-xs font-mono text-slate-400">Trailing 7 Days Analytics</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Weekly Plant OEE</span>
                <span className="text-2xl font-bold text-emerald-400">88.4%</span>
                <span className="text-[10px] text-emerald-500 block">+4.2% YoY</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">MTTR (Mean Time to Repair)</span>
                <span className="text-2xl font-bold text-cyan-400">14.2 min</span>
                <span className="text-[10px] text-slate-400 block">-22.8% reduction</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Unplanned Downtime</span>
                <span className="text-2xl font-bold text-amber-400">3.8 hrs</span>
                <span className="text-[10px] text-slate-400 block">Target: &lt; 5.0 hrs</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">First-Time Quality Yield</span>
                <span className="text-2xl font-bold text-white">96.8%</span>
                <span className="text-[10px] text-emerald-400 block">+1.4% improvement</span>
              </div>
            </div>

            {/* Loss Attribution Pareto */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-slate-400 uppercase font-bold text-[10px] block">
                Top Root-Cause Loss Attribution (Trailing 7 Days):
              </span>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">1. Pneumatic Clamping Drift (Body Shop ST04 / ST11)</span>
                  <span className="text-amber-400 font-bold">42% of Loss Events</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full w-[42%]" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">2. Paint Dip Hoist Transfer Lag (ST14)</span>
                  <span className="text-cyan-400 font-bold">28% of Loss Events</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[28%]" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">3. Torque Multi-Spindle Calibration Drift (ST27 / ST33)</span>
                  <span className="text-purple-400 font-bold">18% of Loss Events</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-400 h-full w-[18%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role 3: Executive Leadership Dashboard */}
      {role === 'executive' && (
        <div className="space-y-6 animate-in slide-in-from-left-2 duration-300">
          <div className="p-6 rounded-3xl bg-dark-900 border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-black text-white">
                Executive Leadership Strategic Dashboard (Enterprise ROI & Multi-Plant Scaling)
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                PAYBACK PERIOD: 4.2 MONTHS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Annual Cost Avoidance</span>
                <span className="text-2xl font-bold text-emerald-400">$2,450,000</span>
                <span className="text-[10px] text-slate-400 block">Per Assembly Line</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Annual ROI Multiplier</span>
                <span className="text-2xl font-bold text-cyan-400">380%</span>
                <span className="text-[10px] text-slate-400 block">4.2 Month Payback</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Scrap & Rework Reduction</span>
                <span className="text-2xl font-bold text-purple-400">-34.8%</span>
                <span className="text-[10px] text-slate-400 block">Zero EOL waves</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Fleet Rollout Potential</span>
                <span className="text-2xl font-bold text-white">$14.7M</span>
                <span className="text-[10px] text-slate-400 block">Across 6 Global Plants</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>
                <strong>Non-Invasive Deployment Guarantee:</strong> Zero live PLC rewiring. Read-only edge gateway taps ensure ISO/IEC 62443 cyber-compliance.
              </span>
              <button
                onClick={() => setActiveTab('businessImpact')}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-dark-950 font-bold shrink-0 shadow-md"
              >
                Configure ROI Parameters &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
