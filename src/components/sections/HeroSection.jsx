import React from 'react';
import { Activity, Shield, ArrowRight, Play, Cpu, Layers, Sparkles, AlertTriangle, CheckCircle2, ChevronDown, Presentation, Building2, Camera } from 'lucide-react';

export default function HeroSection({ onOpenSimulator, onScrollToTwin, onOpenOverview, onOpenDemoModal, onScrollToCCTV }) {
  return (
    <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden bg-radial-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-semibold tracking-wide">ENTERPRISE PREDICTIVE DIGITAL TWIN</span>
          </div>
          <span className="text-xs font-mono text-slate-600 hidden sm:inline">&bull;</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Bayesian Sensor-Gap AI</span>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-[1.08]">
            Predict Assembly Bottlenecks <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
              Before They Stop The Line
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            A vehicle assembly line is a chain of interdependent processes. <strong>DigitalTwin.ai</strong> creates a continuous live virtual model of factory operations, bridges legacy sensor gaps, and delivers actionable intelligence before micro-disruptions become line-halting downtime.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onScrollToTwin}
              className="px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-display font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Explore 3D Assembly Twin</span>
            </button>

            <button
              onClick={onScrollToCCTV}
              className="px-5 sm:px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 border border-cyan-500/30 text-slate-200 font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:border-cyan-400"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Live Plant Cameras</span>
            </button>

            <button
              onClick={onOpenOverview}
              className="px-5 sm:px-6 py-3.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg shadow-purple-950/30 hover:border-purple-400"
            >
              <Presentation className="w-4 h-4 text-purple-400" />
              <span>Product Briefing</span>
            </button>
          </div>
        </div>

        {/* Live Industrial Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-2">
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-cyan-500/40 transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Advance Bottleneck Forecast
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-cyan-400">
              Active <span className="text-sm font-sans font-normal text-slate-300">Lead Time</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Intervention before line starvation</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-purple-500/40 transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Sensor-Gap AI Accuracy
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-purple-400">
              96.2<span className="text-sm font-sans font-normal text-slate-300">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Bayesian surrogate state inference</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-emerald-500/40 transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Scrap & Defect Reduction
            </span>
            <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400">
              -34.8<span className="text-sm font-sans font-normal text-slate-300">%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Interception before EOL inspection</p>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 text-center hover:border-amber-500/40 transition-all">
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase block mb-1">
              Annual Value / Assembly Line
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
