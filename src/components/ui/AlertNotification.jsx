import React from 'react';
import { AlertTriangle, Zap, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function AlertNotification({ onInspectStation }) {
  return (
    <div className="p-4 rounded-2xl glass-panel-warning border border-amber-500/50 shadow-xl shadow-amber-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top duration-300">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
              EARLY WARNING PREDICTION
            </span>
            <span className="font-mono text-xs text-amber-400/90">
              Station B-04 &bull; 23-Min Downstream Bottleneck Risk
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-1">
            Servo clamping cycle time creeping (+6.4s). Without intervention, Paint Shop P-01 and Final Assembly will starve in <strong>23 minutes</strong>.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
        <button
          onClick={() => onInspectStation('S04')}
          className="w-full md:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Inspect & Prescribe Fix</span>
        </button>
      </div>
    </div>
  );
}
