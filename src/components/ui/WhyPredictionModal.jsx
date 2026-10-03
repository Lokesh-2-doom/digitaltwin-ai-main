import React from 'react';
import { X, HelpCircle, AlertTriangle, CheckCircle2, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function WhyPredictionModal() {
  const { whyPredictionModalStation, setWhyPredictionModalStation, executeHumanWorkflowAction } = useAppStore();

  if (!whyPredictionModalStation) return null;

  const st = whyPredictionModalStation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-dark-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setWhyPredictionModalStation(null)}
          className="absolute top-6 right-6 p-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Explainable AI Prediction Rationale
          </div>
          <h3 className="text-2xl font-display font-black text-white">
            Why was {st.stationId} ({st.stationName}) Flagged?
          </h3>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Data-driven root cause attribution & graph propagation analysis.
          </p>
        </div>

        {/* Key Prediction Stats */}
        <div className="grid grid-cols-3 gap-3 font-mono">
          <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase block">Bottleneck Risk</span>
            <span className="text-xl font-bold text-red-400">{st.bottleneckRisk}%</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase block">Estimated Lead Time</span>
            <span className="text-xl font-bold text-amber-400">~{st.estimatedTimeMinutes} min</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-dark-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase block">AI Confidence</span>
            <span className="text-xl font-bold text-emerald-400">{st.confidence}%</span>
          </div>
        </div>

        {/* Contributing Signal Breakdown */}
        <div className="p-4 rounded-2xl bg-dark-950 border border-slate-800 space-y-3 font-mono text-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold block">
            Primary Contributing Factors (Feature Attribution):
          </span>
          <div className="space-y-2">
            {st.contributingFactors.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-200">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upstream & Downstream Ripple Analysis */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Upstream Buffer Pressure</span>
            <strong className={`text-sm ${st.upstreamPressure === 'HIGH' ? 'text-amber-400' : 'text-slate-200'}`}>
              {st.upstreamPressure}
            </strong>
          </div>
          <div className="p-3 rounded-xl bg-dark-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Downstream Starvation Risk</span>
            <strong className={`text-sm ${st.downstreamStarvationRisk === 'HIGH' ? 'text-red-400' : 'text-slate-200'}`}>
              {st.downstreamStarvationRisk}
            </strong>
          </div>
        </div>

        {/* Prescriptive Recommendation */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono space-y-2">
          <span className="text-cyan-300 font-bold uppercase block text-[10px]">
            Prescriptive Decision-Support Action:
          </span>
          <p className="text-slate-200 leading-relaxed font-sans">
            {st.recommendedAction.problemSummary} Recommended action: {st.recommendedAction.prescriptiveActions.join(' ')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 font-mono text-xs">
          <button
            onClick={() => setWhyPredictionModalStation(null)}
            className="px-4 py-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white border border-slate-800"
          >
            Close
          </button>
          <button
            onClick={() => {
              executeHumanWorkflowAction(st.stationId, 'DISPATCH');
              setWhyPredictionModalStation(null);
            }}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-black shadow-lg shadow-cyan-500/25"
          >
            Dispatch Recommended Action &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
