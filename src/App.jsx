import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CommandCenterView from './components/views/CommandCenterView';
import DigitalTwinView from './components/views/DigitalTwinView';
import DatasetIngestionView from './components/views/DatasetIngestionView';
import PredictionResultsView from './components/views/PredictionResultsView';
import StationsExplorerView from './components/views/StationsExplorerView';
import AlertsCenterView from './components/views/AlertsCenterView';
import StakeholdersView from './components/views/StakeholdersView';
import BusinessImpactView from './components/views/BusinessImpactView';
import ArchitectureView from './components/views/ArchitectureView';

import StationDrawer from './components/ui/StationDrawer';
import WhyPredictionModal from './components/ui/WhyPredictionModal';
import ExportReportModal from './components/ui/ExportReportModal';

import { useAppStore } from './store/useAppStore';
import { api } from './services/api';

export default function App() {
  const { 
    activeTab, 
    selectedStation, 
    setSelectedStation, 
    runDatasetAnalysis 
  } = useAppStore();

  useEffect(() => {
    // Initial fetch of default predictions from API
    api.checkHealth().then(isHealthy => {
      console.log('DigitalTwin.ai Backend Health:', isHealthy ? 'ONLINE' : 'CLIENT_FALLBACK');
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#04070d] text-slate-100 selection:bg-cyan-500 selection:text-black flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container Viewport */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'commandCenter' && <CommandCenterView />}
        {activeTab === 'digitalTwin' && <DigitalTwinView />}
        {activeTab === 'datasetAI' && <DatasetIngestionView />}
        {activeTab === 'predictions' && <PredictionResultsView />}
        {activeTab === 'stations' && <StationsExplorerView />}
        {activeTab === 'alerts' && <AlertsCenterView />}
        {activeTab === 'stakeholders' && <StakeholdersView />}
        {activeTab === 'businessImpact' && <BusinessImpactView />}
        {activeTab === 'architecture' && <ArchitectureView />}
      </main>

      {/* Station Telemetry Slide-out Drawer */}
      <StationDrawer
        station={selectedStation}
        onClose={() => setSelectedStation(null)}
      />

      {/* Explainable AI "Why This Prediction?" Modal */}
      <WhyPredictionModal />

      {/* Export Report / CSV Modal */}
      <ExportReportModal />

      {/* Enterprise Footer */}
      <Footer />

    </div>
  );
}
