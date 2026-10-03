import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Eye, 
  Layers, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function StationsExplorerView() {
  const { stations, setSelectedStation, setActiveTab } = useAppStore();
  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredStations = stations.filter(st => {
    const matchesSearch = st.id.toLowerCase().includes(search.toLowerCase()) || st.name.toLowerCase().includes(search.toLowerCase());
    const matchesArea = areaFilter === 'ALL' || st.area === areaFilter;
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'WARNING' && (st.status === 'warning' || st.status === 'critical')) ||
      (statusFilter === 'INFERRED' && st.status === 'inferred');
    return matchesSearch && matchesArea && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">
            <Activity className="w-3.5 h-3.5" />
            Line Infrastructure & Telemetry Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Assembly Line Stations Explorer (35 Stations)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time telemetry, sensor source classification (● Measured vs ◆ Inferred), and station-level predictive risk scores.
          </p>
        </div>

        {/* Legend strip */}
        <div className="flex items-center gap-3 p-2 bg-dark-900 border border-slate-800 rounded-2xl text-[10px] font-mono text-slate-400">
          <span><strong className="text-emerald-400">●</strong> Measured</span>
          <span><strong className="text-purple-400">◆</strong> AI-Inferred</span>
          <span><strong className="text-slate-500">○</strong> Unavailable</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 35 stations by ID or name (e.g. ST11, Robot Weld, E-Coat)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Shop Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['ALL', 'BODY', 'PAINT', 'ASSEMBLY'].map(area => (
            <button
              key={area}
              onClick={() => setAreaFilter(area)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                areaFilter === area
                  ? 'bg-cyan-500 text-dark-950 font-bold'
                  : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStatusFilter(statusFilter === 'WARNING' ? 'ALL' : 'WARNING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              statusFilter === 'WARNING'
                ? 'bg-red-500/20 text-red-300 border border-red-500/50 font-bold'
                : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Warnings Only
          </button>
          <button
            onClick={() => setStatusFilter(statusFilter === 'INFERRED' ? 'ALL' : 'INFERRED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              statusFilter === 'INFERRED'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 font-bold'
                : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Inferred Gaps
          </button>
        </div>
      </div>

      {/* 35 Stations Table */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="pb-3">Station</th>
                <th className="pb-3">Shop Area</th>
                <th className="pb-3">Cycle Time</th>
                <th className="pb-3">WIP Buffer</th>
                <th className="pb-3">Vibration</th>
                <th className="pb-3">Temperature</th>
                <th className="pb-3">Quality</th>
                <th className="pb-3">Bottleneck Risk</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStations.map((st) => {
                const isCritical = st.status === 'critical';
                const isWarning = st.status === 'warning';
                return (
                  <tr
                    key={st.id}
                    className={`hover:bg-dark-950/70 transition-colors ${
                      isCritical ? 'bg-red-950/20' : isWarning ? 'bg-amber-950/20' : ''
                    }`}
                  >
                    {/* Station ID & Name */}
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          isCritical
                            ? 'bg-red-500 animate-ping'
                            : isWarning
                            ? 'bg-amber-400'
                            : st.status === 'inferred'
                            ? 'bg-blue-400'
                            : 'bg-emerald-400'
                        }`}></span>
                        <div>
                          <strong className="text-white font-bold">{st.id}</strong>
                          <span className="text-slate-400 block text-[11px] font-sans">{st.name}</span>
                        </div>
                      </div>
                    </td>

                    {/* Shop Area */}
                    <td className="py-3 text-slate-400 text-[11px]">
                      {st.area}
                    </td>

                    {/* Cycle Time */}
                    <td className="py-3">
                      <span className={`font-bold ${
                        st.cycleTimeActual > st.taktTime ? 'text-amber-400' : 'text-slate-200'
                      }`}>
                        {st.cycleTimeActual}s
                      </span>
                      <span className="text-slate-500 text-[10px] block">Takt: {st.taktTime}s</span>
                    </td>

                    {/* WIP Buffer */}
                    <td className="py-3">
                      <span className={`font-bold ${
                        st.wipBuffer >= 4 ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {st.wipBuffer} / {st.maxBuffer}
                      </span>
                    </td>

                    {/* Vibration with Sensor Tag */}
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-200">{st.vibration} RMS</span>
                        {st.sensorSources.vibration === 'AI-INFERRED' && (
                          <span className="text-purple-400 font-bold" title="AI-Inferred">◆</span>
                        )}
                        {st.sensorSources.vibration === 'MEASURED' && (
                          <span className="text-emerald-400 font-bold" title="Measured">●</span>
                        )}
                      </div>
                    </td>

                    {/* Temperature with Sensor Tag */}
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-200">{st.temperature}°C</span>
                        {st.sensorSources.temperature === 'AI-INFERRED' && (
                          <span className="text-purple-400 font-bold" title="AI-Inferred">◆</span>
                        )}
                        {st.sensorSources.temperature === 'MEASURED' && (
                          <span className="text-emerald-400 font-bold" title="Measured">●</span>
                        )}
                      </div>
                    </td>

                    {/* Quality Score */}
                    <td className="py-3">
                      <span className={`font-bold ${
                        st.qualityScore < 90 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {st.qualityScore}%
                      </span>
                    </td>

                    {/* Bottleneck Risk */}
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${
                              st.bottleneckRisk >= 75 ? 'bg-red-500' : st.bottleneckRisk >= 45 ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${st.bottleneckRisk}%` }}
                          />
                        </div>
                        <span className={`font-bold ${
                          st.bottleneckRisk >= 75 ? 'text-red-400' : st.bottleneckRisk >= 45 ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                          {st.bottleneckRisk}%
                        </span>
                      </div>
                    </td>

                    {/* Inspect Button */}
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedStation(st)}
                        className="px-3 py-1 rounded-xl bg-dark-950 hover:bg-cyan-500 hover:text-dark-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-[11px] font-bold transition-all"
                      >
                        Inspect Telemetry &rarr;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
