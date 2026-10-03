const fs = require('fs');
const path = require('path');

const appCode = `import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionArchitecture from './components/sections/SolutionArchitecture';
import InferenceDeepDive from './components/sections/InferenceDeepDive';
import SimulationSandbox from './components/sections/SimulationSandbox';
import StakeholderViews from './components/sections/StakeholderViews';
import ROICalculator from './components/sections/ROICalculator';
import FactoryScene from './components/3d/FactoryScene';
import StationDrawer from './components/ui/StationDrawer';
import AlertNotification from './components/ui/AlertNotification';
import { INITIAL_STATIONS, PLANT_SUMMARY } from './data/factoryStations';
import { Activity, Shield, Sparkles, Layers, RefreshCw, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export default function App() {
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState(null);
  const [activeHeatmap, setActiveHeatmap] = useState('default');
  const [cameraMode, setCameraMode] = useState('overview');
  const [simulationRunning, setSimulationRunning] = useState(true);
  const [alertDismissed, setAlertDismissed] = useState(false);

  // Handle station click from 3D or list
  const handleSelectStation = (station) => {
    setSelectedStation(station);
  };

  // Execute Prescriptive Intervention on a station (e.g. S04)
  const handleExecuteRecommendation = (stationId) => {
    setStations(prev => prev.map(st => {
      if (st.id === stationId) {
        return {
          ...st,
          status: 'normal',
          cycleTimeActual: 58.2,
          wipBuffer: 2,
          defectRisk: 3.2,
          aiDiagnosis: 'RESOLVED: Pacing rebalanced. Secondary actuator cycle within nominal range.',
          recommendation: null
        };
      }
      return st;
    }));
  };

  const handleOpenSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTwin = () => {
    const el = document.getElementById('twin');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 selection:bg-cyan-500 selection:text-black flex flex-col">
      {/* Top Navbar */}
      <Navbar onOpenSimulator={handleOpenSimulator} />

      {/* Main Content */}
      <main className="flex-1 space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <HeroSection 
          onOpenSimulator={handleOpenSimulator} 
          onScrollToTwin={handleScrollToTwin}
        />

        {/* 3D Digital Twin Viewer Section */}
        <section id="twin" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="space-y-4">
            
            {/* Top Alert if S04 warning is active */}
            {!alertDismissed && stations.some(s => s.status === 'warning') && (
              <AlertNotification 
                onInspectStation={(id) => {
                  const target = stations.find(s => s.id === id);
                  if (target) setSelectedStation(target);
                }} 
              />
            )}

            {/* 3D Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                    Live 3D Assembly Line Digital Twin
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-mono">
                  Interactive WebGL Virtual Model &bull; Click any station or machine for live telemetry
                </p>
              </div>

              {/* Quick Station Stats Pills */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                  Total Stations: <strong className="text-cyan-400">16 / 16</strong>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-800 text-slate-300">
                  Line OEE: <strong className="text-emerald-400">88.4%</strong>
                </span>
              </div>
            </div>

            {/* 3D Three.js Factory Viewport */}
            <FactoryScene
              stations={stations}
              selectedStation={selectedStation}
              onSelectStation={handleSelectStation}
              activeHeatmap={activeHeatmap}
              setActiveHeatmap={setActiveHeatmap}
              simulationRunning={simulationRunning}
              cameraMode={cameraMode}
              setCameraMode={setCameraMode}
            />

            {/* Station Quick Selector Strip */}
            <div className="p-4 rounded-2xl glass-panel border border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 uppercase font-bold">
                <span>Quick Station Telemetry Selector:</span>
                <span className="text-cyan-400">Showing 4 Factory Shops</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {stations.map((st) => {
                  const isSelected = selectedStation?.id === st.id;
                  const isWarning = st.status === 'warning';
                  const isInferred = st.sensorTier === 'inferred';
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleSelectStation(st)}
                      className={\`px-3 py-2 rounded-xl text-left font-mono text-xs whitespace-nowrap transition-all border shrink-0 flex items-center gap-2 \${
                        isSelected
                          ? 'bg-cyan-500 text-dark-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/30'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                          : isInferred
                          ? 'bg-purple-950/40 text-purple-300 border-purple-500/30 hover:border-purple-400'
                          : 'bg-dark-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }\`}
                    >
                      <span className="font-bold">{st.code}</span>
                      <span className="text-[11px] opacity-80">{st.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* Problem Statement Section */}
        <ProblemSection />

        {/* Proposed Solution Architecture ("Predict, Prevent, Perform") */}
        <SolutionArchitecture />

        {/* Handling Data Gaps & AI Sensor Inference */}
        <InferenceDeepDive />

        {/* Interactive "What-If" Simulation Sandbox */}
        <SimulationSandbox onInspectStation={(id) => {
          const st = stations.find(s => s.id === id);
          if (st) setSelectedStation(st);
        }} />

        {/* Stakeholder Personas */}
        <StakeholderViews />

        {/* Financial ROI Calculator */}
        <ROICalculator />

      </main>

      {/* Slide-out Station Telemetry Drawer */}
      <StationDrawer
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
        onExecuteRecommendation={handleExecuteRecommendation}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'App.jsx'), appCode, 'utf8');
console.log('Saved App.jsx');
