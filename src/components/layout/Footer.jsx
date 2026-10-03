import React from 'react';
import { Activity, Shield, Cpu, Terminal, ArrowUpRight, FileText, CheckCircle2, Building2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function Footer() {
  const { setActiveTab, setExportReportOpen } = useAppStore();

  return (
    <footer className="bg-[#02050a] border-t border-slate-800/80 pt-16 pb-10 text-slate-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#03060c] rounded-[7px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-black text-white text-base">
                DIGITAL<span className="text-cyan-400">TWIN</span><span className="text-purple-400">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              The real-time predictive digital twin platform for vehicle assembly lines. Predicting bottlenecks before line starvation, containing defect ripples, and bridging legacy sensor gaps.
            </p>
            <div className="text-[11px] font-mono text-cyan-400 font-bold">
              PREDICT • PREVENT • PERFORM
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3 text-cyan-400">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => setActiveTab('digitalTwin')} className="hover:text-cyan-400 transition-colors">
                  &bull; 35-Station 3D Assembly Twin
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('datasetAI')} className="hover:text-cyan-400 transition-colors">
                  &bull; Dataset Ingestion & AI Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('predictions')} className="hover:text-cyan-400 transition-colors">
                  &bull; Bottleneck & Defect Predictions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stations')} className="hover:text-cyan-400 transition-colors">
                  &bull; Stations Telemetry Explorer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3 text-purple-400">
              Operational Consoles
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => setActiveTab('stakeholders')} className="hover:text-purple-400 transition-colors">
                  &bull; Floor Supervisor Real-Time HUD
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stakeholders')} className="hover:text-purple-400 transition-colors">
                  &bull; Plant Manager OEE & Loss Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stakeholders')} className="hover:text-purple-400 transition-colors">
                  &bull; Executive VP Multi-Site Cockpit
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('businessImpact')} className="hover:text-purple-400 transition-colors">
                  &bull; Plant ROI & Value Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-3 text-emerald-400">
              Audit & Reports
            </h4>
            <div className="bg-dark-900 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                Export synchronized predictions, root cause attribution, and telemetry data for technical validation.
              </p>
              <button
                onClick={() => setExportReportOpen(true)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <span>Export Report (PDF / CSV)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 DigitalTwin.ai Inc. All rights reserved. Industrial Predictive Intelligence Platform.</p>
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>SOC2 Type II &bull; ISO 27001 &bull; IEC 62443 Industrial Cybersecurity Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
