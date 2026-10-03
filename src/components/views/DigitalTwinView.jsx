import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  RotateCcw, 
  Flame, 
  Cpu, 
  GitBranch, 
  Activity, 
  Search, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import FactoryScene from '../3d/FactoryScene';

export default function DigitalTwinView() {
  const {
    stations,
    selectedStation,
    setSelectedStation,
    activeHeatmap,
    setActiveHeatmap,
    cameraMode,
    setCameraMode
  } = useAppStore();

  const [shopFilter, setShopFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = stations.filter(st => {
    const matchesShop = shopFilter === 'ALL' || st.area === shopFilter;
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesShop && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-1">
            <Layers className="w-3.5 h-3.5" />
            3D Assembly Line Digital Twin
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Synchronized Virtual Factory Model
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            35 Stations across Body Construction, Paint Shop, and Final Assembly. Click any station or machine to view real-time telemetry.
          </p>
        </div>

        {/* Quick Shop Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-dark-900 border border-slate-800 rounded-2xl">
          {['ALL', 'BODY', 'PAINT', 'ASSEMBLY'].map(shop => (
            <button
              key={shop}
              onClick={() => {
                setShopFilter(shop);
                if (shop === 'BODY') setCameraMode('body');
                else if (shop === 'PAINT') setCameraMode('paint');
                else if (shop === 'ASSEMBLY') setCameraMode('assembly');
                else setCameraMode('overview');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                shopFilter === shop
                  ? 'bg-cyan-500 text-dark-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {shop}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Factory Scene Container */}
      <FactoryScene
        stations={stations}
        selectedStation={selectedStation}
        onSelectStation={setSelectedStation}
        activeHeatmap={activeHeatmap}
        setActiveHeatmap={setActiveHeatmap}
        cameraMode={cameraMode}
        setCameraMode={setCameraMode}
      />

      {/* 35 Stations Quick Selection Strip */}
      <div className="p-5 rounded-3xl bg-dark-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-400 uppercase font-bold">
            Select Station for Telemetry Inspection ({filteredStations.length} of 35):
          </span>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station ID or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-dark-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-60"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredStations.map((st) => {
            const isSelected = selectedStation?.id === st.id;
            const isWarning = st.status === 'warning' || st.status === 'critical';
            const isInferred = st.status === 'inferred';
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStation(st)}
                className={`px-3 py-2 rounded-xl text-left font-mono text-xs whitespace-nowrap transition-all border shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-500 text-dark-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/30'
                    : isWarning
                    ? 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse'
                    : isInferred
                    ? 'bg-blue-950/40 text-blue-300 border-blue-500/30 hover:border-blue-400'
                    : 'bg-dark-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="font-bold">{st.id}</span>
                <span className="text-[11px] opacity-80">{st.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
