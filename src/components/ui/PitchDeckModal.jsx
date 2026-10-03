import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Maximize2, Layers, Cpu, AlertTriangle, CheckCircle2, ShieldCheck, Database, Zap, Bell, ArrowRight, DollarSign } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose, onLaunchSimulation }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const slides = [
    // SLIDE 1: Problem Statement (Matching Image 1)
    {
      title: "Problem Statement",
      badge: "Track 4: DigitalTwin.ai",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              
              <div className="p-4 rounded-xl bg-dark-900 border-l-4 border-cyan-400 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-md">
                A vehicle assembly line is a chain of interdependent processes where a small disruption at one station can quickly ripple across the entire production system. When a station slows down, work-in-progress can accumulate upstream while downstream stations become starved, reducing throughput and increasing idle time.
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border-l-4 border-cyan-400 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-md">
                The challenge becomes even greater with quality. An early process deviation may not produce an obvious defect immediately, allowing the issue to continue across multiple vehicles before conventional inspection identifies it. By then, the cost is no longer limited to one station—it can affect production, rework, quality and delivery.
              </div>

              <div className="p-4 rounded-xl bg-dark-900 border-l-4 border-cyan-400 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed shadow-md">
                Existing monitoring can tell plant teams what is happening at individual machines, but it does not always provide a complete picture of how changes will propagate through the line. Sensor coverage can also be inconsistent, leaving some stations with limited or no direct data.
              </div>

            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-dark-900 to-slate-900 border border-cyan-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">The Disruption Cascade</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Station Micro-Stop &rarr; Upstream Buffer Saturation &rarr; Downstream Starvation &rarr; Latent Defect Escape
                </p>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-mono">
                  Average Line Loss: $24,000 / Hour
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlight Box */}
          <div className="p-5 rounded-2xl bg-dark-950/90 border border-cyan-500/40 text-center space-y-2 shadow-xl shadow-cyan-950/40">
            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
              "The real problem is therefore not simply visibility. It is the lack of early, connected intelligence that can understand the behaviour of the entire line, identify emerging patterns and warn teams before a bottleneck or defect becomes a production problem."
            </p>
            <div className="pt-2 text-xs sm:text-sm font-display font-black text-cyan-400 tracking-wide uppercase">
              Now this whole thing comes down to one thing: can we provide a sign or warning before something goes wrong?
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 2: Proposed Solution (Matching Image 2)
    {
      title: "Proposed Solution",
      badge: "THE SOLUTION: PREDICT, PREVENT, PERFORM",
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-dark-900 to-slate-900 border-l-4 border-cyan-400 border border-slate-800 text-sm font-semibold text-white leading-relaxed">
            We propose a digital twin of the vehicle assembly line that continuously stays connected with the physical machinery in the factory with a live virtual representation and stats of each process where it uses AI to predict, deduce and recommend.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-200">
            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">1. Emerging Anomaly Detection</span>
              <p className="leading-relaxed">
                It detects emerging anomalies such as changing cycle times, abnormal WIP accumulation and quality deviations. It then predicts how these changes could propagate through connected stations—for example, identifying that a slowing station is likely to create a downstream bottleneck within the next 20 minutes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase block">2. Incomplete Sensor Coverage AI</span>
              <p className="leading-relaxed">
                The system also addresses incomplete sensor coverage. Rather than treating missing data as a blind spot, AI can infer the likely state of a poorly monitored station from upstream and downstream behaviour, historical patterns and available production signals.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 text-xs sm:text-sm text-slate-200">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block mb-1">3. Actionable Prescriptive Recommendations</span>
            <p className="leading-relaxed">
              Finally, the twin converts predictions into actionable recommendations for plant teams: where the issue is likely to occur, why it is happening, what impact it may have and what intervention could reduce the risk.
            </p>
          </div>

          {/* 5-Step Architecture Flow Diagram Box */}
          <div className="p-5 rounded-2xl bg-dark-950 border border-cyan-500/40 space-y-3">
            <div className="text-xs font-mono font-bold text-center text-cyan-400 tracking-wider uppercase">
              THE ARCHITECTURE: PREDICT, PREVENT, PERFORM
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono text-center">
              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">1. DATA INPUT</span>
                <span className="text-[10px] text-slate-400 block">Sensors / PLCs &bull; Vision &bull; Quality &bull; Production</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                <span className="text-purple-400 font-bold block mb-1">2. DIGITAL TWIN</span>
                <span className="text-[10px] text-slate-400 block">S1..Sn Live Virtual Model of Assembly Line</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">3. AI ENGINE</span>
                <span className="text-[10px] text-slate-400 block">Detect Anomalies &bull; Predict &bull; Infer Gaps</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">4. INSIGHTS</span>
                <span className="text-[10px] text-slate-400 block">Bottleneck in 23 mins &bull; Defect risk (63%)</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-emerald-400 font-bold block mb-1">5. ACTION</span>
                <span className="text-[10px] text-slate-400 block">Operator Take Action &bull; Monitor Impact</span>
              </div>
            </div>

            <div className="text-center text-[11px] font-mono text-emerald-400 pt-1">
              &circlearrowleft; Continuous Learning & Improvement Loop &circlearrowright;
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center text-xs font-mono text-cyan-200">
            This helps the digital twin to identify problems and notify the workers beforehand so the efficiency and throughput can be increased.
          </div>
        </div>
      )
    },

    // SLIDE 3: Predictive Mechanism & Sensor Gap Deep Dive
    {
      title: "Core Mechanism: Sensor Inference & Lead Time",
      badge: "Predictive Edge",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">Advance Lead Time</span>
              <div className="text-3xl font-black font-display text-cyan-400">20–25 Mins</div>
              <p className="text-xs text-slate-300">
                Graph propagation models trace cycle time delays before buffers saturate, giving floor teams enough time to rebalance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase font-bold block">Sensor Gap Accuracy</span>
              <div className="text-3xl font-black font-display text-purple-400">96.2%</div>
              <p className="text-xs text-slate-300">
                Bayesian cross-station estimators infer manual & uninstrumented station states from upstream and downstream signals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">Live Disruption Risk</span>
              <div className="text-3xl font-black font-display text-emerald-400">0 Hours</div>
              <p className="text-xs text-slate-300">
                100% non-invasive passive optical taps; zero code or logic changes required on live production PLCs.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-950 border border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-white">Live Prototype Validation Scenario</h4>
            <p className="text-xs text-slate-300">
              Station B-04 (Body Clamping) undergoes a +6.4s pneumatic pressure drift. The DigitalTwin.ai AI Engine predicts starvation at Station P-01 in 23 minutes and issues a 1-click buffer rebalancing directive to the floor supervisor.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onLaunchSimulation();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-xs flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Live 23-Min Simulation Sandbox</span>
              </button>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 4: Business Impact & Multi-Stakeholder Views
    {
      title: "Business Case & Multi-Stakeholder Value",
      badge: "Enterprise ROI",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">Floor Supervisor</span>
              <h4 className="text-sm font-bold text-white">Real-Time Floor Signals</h4>
              <p className="text-xs text-slate-400">
                Live takt pace, 20-min advance bottleneck notifications, and 1-click buffer interventions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase font-bold block">Plant Manager</span>
              <h4 className="text-sm font-bold text-white">Weekly OEE & MTTR Trends</h4>
              <p className="text-xs text-slate-400">
                Availability loss Pareto attribution, scrap reduction metrics, and predictive maintenance scheduling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">Executive Leadership</span>
              <h4 className="text-sm font-bold text-white">Rollout ROI Case</h4>
              <p className="text-xs text-slate-400">
                $2.45M annual cost avoidance per line, 4.2-month payback horizon, and cross-site scaling roadmap.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-dark-950 to-cyan-950/40 border border-emerald-500/40 space-y-3 text-center">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">The Bottom Line Impact</span>
            <div className="text-3xl sm:text-4xl font-display font-black text-white">
              $2,450,000 <span className="text-sm text-slate-400 font-mono">Annual Savings / Line</span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              Preventing 128 hours of cumulative line downtime and eliminating multi-vehicle defect rework waves across 30–50 assembly stations.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[92vh] bg-dark-950 border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Pitch Deck Header */}
        <div className="px-6 py-4 bg-dark-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
              SLIDE {currentSlide + 1} / {slides.length}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white truncate">
              {slides[currentSlide].title}
            </h3>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-xs font-mono text-purple-400 hidden sm:inline">
              {slides[currentSlide].badge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto scrollbar-thin">
          {slides[currentSlide].content}
        </div>

        {/* Pitch Deck Footer Controls */}
        <div className="px-6 py-4 bg-dark-900 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'bg-cyan-400 w-8'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 disabled:opacity-30 disabled:hover:bg-cyan-500 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
