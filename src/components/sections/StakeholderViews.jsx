import React, { useState } from 'react';
import { UserCheck, Shield, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Clock, DollarSign, Activity, FileSpreadsheet, ArrowRight } from 'lucide-react';

export default function StakeholderViews() {
  const [activePersona, setActivePersona] = useState('supervisor');

  return (
    <section id="dashboards" className="py-16 bg-dark-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold uppercase mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            Tailored Persona Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            One Twin. Distinct Views for Every Stakeholder.
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            From in-the-moment floor alerts to weekly OEE loss pareto analysis and multi-plant ROI executive business cases.
          </p>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl glass-panel border border-cyan-500/30 flex flex-wrap gap-2 shadow-lg">
            
            <button
              onClick={() => setActivePersona('supervisor')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                activePersona === 'supervisor'
                  ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Floor Supervisor (Real-Time Signals)</span>
            </button>

            <button
              onClick={() => setActivePersona('manager')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                activePersona === 'manager'
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Plant Manager (Weekly Planning & OEE)</span>
            </button>

            <button
              onClick={() => setActivePersona('leadership')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                activePersona === 'leadership'
                  ? 'bg-emerald-500 text-dark-950 shadow-md shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Leadership & Executive (ROI & Scaling)</span>
            </button>

          </div>
        </div>

        {/* Persona View Display */}
        <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
          
          {/* 1. FLOOR SUPERVISOR VIEW */}
          {activePersona === 'supervisor' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Floor Supervisor Live Command HUD</h3>
                  <p className="text-xs text-slate-400 font-mono">Focus: In-the-moment pacing, active station warnings, and 1-click buffer interventions.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                  Shift: Morning Alpha &bull; Takt 60s
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-dark-950 border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold">
                    <span>ACTIVE BOTTLENECK SIGNAL</span>
                    <span>23m LEAD TIME</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Station B-04 Clamping Drift</h4>
                  <p className="text-xs text-slate-300">
                    Cycle time +6.4s drift. Upstream buffer at 5/6 units. AI recommendation ready to execute.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-purple-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-purple-400 font-bold">
                    <span>SENSOR-GAP INFERENCE</span>
                    <span>96.2% CONF</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Station P-02 & A-03 Online</h4>
                  <p className="text-xs text-slate-300">
                    Virtual state modeling operating nominal on legacy PLC-5 and manual harness stages.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
                    <span>LINE TAKT COMPLIANCE</span>
                    <span>58.4s / 60s</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Shift Output: 342 Units</h4>
                  <p className="text-xs text-slate-300">
                    Target: 380 units. On track to meet shift quota with zero open safety or defect stoppages.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. PLANT MANAGER VIEW */}
          {activePersona === 'manager' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Plant Manager Planning & OEE Dashboard</h3>
                  <p className="text-xs text-slate-400 font-mono">Focus: Weekly loss reduction, MTBF/MTTR reliability trends, and root-cause Pareto attribution.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                  Overall Line OEE: 88.4% (+4.2% vs baseline)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">AVAILABILITY</span>
                  <span className="text-2xl font-bold font-mono text-white">92.1%</span>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-1">+2.8% Unplanned downtime saved</span>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">PERFORMANCE</span>
                  <span className="text-2xl font-bold font-mono text-white">97.4%</span>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-1">Pacing micro-stops eliminated</span>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">QUALITY YIELD</span>
                  <span className="text-2xl font-bold font-mono text-white">98.7%</span>
                  <span className="text-[10px] text-emerald-400 font-mono block mt-1">Multi-vehicle defects intercepted</span>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">MTTR (MEAN TIME TO REPAIR)</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">14.2 min</span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">-42% root-cause tracing time</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. EXECUTIVE LEADERSHIP VIEW */}
          {activePersona === 'leadership' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Executive Rollout & Multi-Plant ROI Case</h3>
                  <p className="text-xs text-slate-400 font-mono">Focus: Business impact, cost avoidance per line, payback horizon, and cross-site scaling matrix.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                  Annual Impact: $2,450,000 / Line
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">CAPEX AVOIDANCE</span>
                  <h4 className="text-lg font-bold text-white">$650,000 Saved</h4>
                  <p className="text-xs text-slate-400">
                    No costly live PLC rips or downtime required. Virtual inference utilizes passive non-intrusive taps.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">DOWNTIME REDUCTION</span>
                  <h4 className="text-lg font-bold text-white">128 Hours Recovered</h4>
                  <p className="text-xs text-slate-400">
                    Eliminating 20-30 minute downstream starvation waves saves 128 production hours annually.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">PAYBACK PERIOD</span>
                  <h4 className="text-lg font-bold text-white">4.2 Months</h4>
                  <p className="text-xs text-slate-400">
                    Full software deployment and surrogate calibration achieves full payback within the first fiscal quarter.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
