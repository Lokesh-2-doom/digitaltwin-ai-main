import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  Download,
  Menu,
  X,
  Presentation,
  Flame
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function Navbar() {
  const { activeTab, setActiveTab, setExportReportOpen } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'commandCenter', label: 'Command Center' },
    { id: 'digitalTwin', label: 'Digital Twin' },
    { id: 'datasetAI', label: 'Dataset & AI' },
    { id: 'predictions', label: 'Predictions' },
    { id: 'stations', label: 'Stations' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'stakeholders', label: 'Stakeholders' },
    { id: 'businessImpact', label: 'Business Impact' },
    { id: 'architecture', label: 'Architecture' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#04070d]/90 border-b border-cyan-500/20">
      
      {/* Top Telemetry Strip */}
      <div className="bg-[#02050a] border-b border-slate-800/80 px-4 py-1.5 text-[11px] font-mono flex items-center justify-between overflow-x-auto text-slate-300">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold">LIVE OT STREAM: CONNECTED</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-slate-300">
            PLANT MATRIX: <span className="text-cyan-400 font-semibold">OEM Assembly Line (35 Stations)</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-slate-300">
            OVERALL OEE: <span className="text-emerald-400 font-bold">88.4% (+4.2%)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div>
            TAKT TARGET: <span className="text-cyan-400 font-bold">60.0s</span> (Actual: <span className="text-emerald-400 font-bold">58.2s</span>)
          </div>
          <span className="text-slate-700">|</span>
          <div>
            SENSOR GAPS BRIDGED: <span className="text-purple-400 font-bold">100% (Bayesian AI)</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="text-amber-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>1 ACTIVE PREDICTION (22m Advance Warning)</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('commandCenter')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-teal-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#06090f] rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-wider text-white">
                DIGITAL<span className="text-cyan-400">TWIN</span><span className="text-purple-400">.AI</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              PREDICT. PREVENT. PERFORM.
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 font-medium text-xs text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-dark-950 font-black shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: LIVE Status & Export Report */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>LIVE</span>
          </div>

          <button
            onClick={() => setExportReportOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs shadow-lg transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#04070d] border-b border-slate-800 p-4 space-y-2 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2.5 px-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-cyan-500 text-dark-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setExportReportOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl bg-dark-900 border border-slate-800 text-slate-200 font-bold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Report</span>
          </button>
        </div>
      )}

    </header>
  );
}
