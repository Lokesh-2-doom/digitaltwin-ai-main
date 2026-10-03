import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Database,
  Trash2,
  Table,
  Play,
  RotateCw
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { api } from '../../services/api';

export default function DatasetIngestionView() {
  const { 
    activeDatasetName, 
    isAnalyzing, 
    runDatasetAnalysis, 
    loadSampleDataset,
    datasetHistory,
    deleteDatasetHistoryItem,
    setActiveTab
  } = useAppStore();

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [columnMapping, setColumnMapping] = useState({});
  const [pipelineStep, setPipelineStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleDatasets = [
    {
      name: 'assembly_line_sample.csv',
      title: 'Full 35-Station Assembly Line (24 Hours)',
      rows: '24,570 records',
      desc: 'Complete brownfield dataset with cycle times, WIP, vibration, and temperature anomalies at ST11/ST14.',
      tag: 'RECOMMENDED DEMO'
    },
    {
      name: 'assembly_line_with_defects.csv',
      title: 'Supervised Quality & Defect Labeled Dataset',
      rows: '24,570 records',
      desc: 'Includes end-of-line defect logs to train supervised Random Forest and evaluate Precision/Recall.',
      tag: 'SUPERVISED ML'
    },
    {
      name: 'assembly_line_missing_sensors.csv',
      title: 'Brownfield Line with Incomplete Sensors',
      rows: '24,570 records',
      desc: 'Legacy stations with missing vibration & torque feeds for testing Bayesian Virtual Sensor Inference.',
      tag: 'SENSOR INFERENCE'
    }
  ];

  const pipelineStages = [
    'UPLOAD', 'VALIDATE', 'CLEAN', 'NORMALIZE', 'MAP COLUMNS',
    'HANDLE MISSING DATA', 'FEATURE ENGINEERING', 'ANOMALY DETECTION',
    'BOTTLENECK PREDICTION', 'DEFECT RISK', 'PROPAGATION ANALYSIS',
    'ROOT CAUSE', 'RECOMMENDATION', 'DIGITAL TWIN UPDATE'
  ];

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const res = await api.uploadDatasetFile(file);
      setUploadedPreview(res);
      if (res.detectedMapping) {
        setColumnMapping(res.detectedMapping);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const res = await api.uploadDatasetFile(file);
      setUploadedPreview(res);
      if (res.detectedMapping) {
        setColumnMapping(res.detectedMapping);
      }
    }
  };

  const handleRunAnalysis = async () => {
    setIsProcessing(true);
    setPipelineStep(0);

    const interval = setInterval(() => {
      setPipelineStep(prev => {
        if (prev >= pipelineStages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 180);

    try {
      const filename = selectedFile ? selectedFile.name : activeDatasetName;
      await runDatasetAnalysis(filename, selectedFile || undefined, columnMapping);
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab('predictions');
      }, 2600);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-2">
          <Database className="w-3.5 h-3.5" />
          Production Dataset Ingestion & AI Pipeline
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
          Ingest Production Datasets & Run Predictions
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          Upload any CSV or XLSX production log from your MES or SCADA system. DigitalTwin.ai auto-detects column schemas, handles incomplete sensor feeds, and synchronizes predictions directly into the 3D Digital Twin.
        </p>
      </div>

      {/* 1. Upload Box & Built-in Sample Datasets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Drag & Drop File Uploader */}
        <div className="lg:col-span-2">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="p-8 sm:p-12 rounded-3xl bg-dark-900 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 transition-all text-center cursor-pointer group shadow-2xl flex flex-col items-center justify-center space-y-4"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv, .xlsx, .xls"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-cyan-400" />
            </div>

            <div>
              <h3 className="text-lg font-display font-black text-white">
                {selectedFile ? `Selected: ${selectedFile.name}` : 'Drag & Drop CSV / XLSX Dataset Here'}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Supports standard automotive assembly logs, SCADA cycle times, and PLC registers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700">
                CSV, XLSX (Up to 100,000 Rows)
              </span>
              <button
                type="button"
                className="px-4 py-1.5 rounded-xl bg-cyan-500 text-dark-950 font-mono text-xs font-bold shadow-md shadow-cyan-500/20"
              >
                Browse Files
              </button>
            </div>
          </div>
        </div>

        {/* 1-Click Sample Datasets */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-slate-400 uppercase font-bold block">
            1-Click Sample Production Datasets:
          </span>

          {sampleDatasets.map((sample) => (
            <div
              key={sample.name}
              className="p-3.5 rounded-2xl bg-dark-900 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {sample.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{sample.rows}</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug">{sample.title}</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{sample.desc}</p>
              <button
                onClick={() => {
                  loadSampleDataset(sample.name);
                }}
                className="w-full py-1.5 rounded-xl bg-dark-950 hover:bg-cyan-500 hover:text-dark-950 border border-slate-700 hover:border-cyan-400 text-slate-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3 h-3" />
                <span>Load & Predict &rarr;</span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* 2. Column Mapping & Data Quality Report */}
      {uploadedPreview && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-2 duration-300">
          
          {/* Data Quality Report */}
          <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
                  Dataset Quality & Validation Report
                </h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                uploadedPreview.qualityReport?.quality_status === 'GOOD'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                STATUS: {uploadedPreview.qualityReport?.quality_status || 'GOOD'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono">
                <span className="text-[10px] text-slate-400 block">Total Rows</span>
                <span className="text-lg font-bold text-white">{uploadedPreview.rowsCount?.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono">
                <span className="text-[10px] text-slate-400 block">Stations Detected</span>
                <span className="text-lg font-bold text-cyan-400">{uploadedPreview.qualityReport?.detected_stations || 35}</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono">
                <span className="text-[10px] text-slate-400 block">Sensor Coverage</span>
                <span className="text-lg font-bold text-purple-400">{uploadedPreview.qualityReport?.sensor_coverage_pct || 92.4}%</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono">
                <span className="text-[10px] text-slate-400 block">Missing Cells</span>
                <span className="text-lg font-bold text-amber-400">{uploadedPreview.qualityReport?.missing_percentage || 0.0}%</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 font-mono sm:col-span-2">
                <span className="text-[10px] text-slate-400 block">Time Span</span>
                <span className="text-xs font-semibold text-slate-200">{uploadedPreview.qualityReport?.time_range || '24-hour cycle'}</span>
              </div>
            </div>

            {/* Ingestion Strategy Note */}
            <div className="p-3 rounded-xl bg-dark-950 border border-purple-500/30 text-xs font-mono text-slate-300 flex items-start gap-2">
              <Cpu className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Schema Flexibility Active:</strong> Any missing sensor channels will be imputed via cross-station Bayesian surrogate regression with explicit confidence intervals.
              </span>
            </div>
          </div>

          {/* Column Mapping Table */}
          <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
                  Automatic Variable Mapping
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Fuzzy Matched
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin font-mono text-xs">
              {Object.entries(uploadedPreview.detectedMapping || {}).map(([key, mappedCol]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 rounded-xl bg-dark-950 border border-slate-800/80"
                >
                  <span className="text-slate-300 font-bold uppercase">{key.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">&rarr;</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      mappedCol
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {mappedCol || 'AI-INFERRED / UNAVAILABLE'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-display font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isProcessing ? 'Executing 14-Step AI Pipeline...' : 'Run Prediction Engine on Dataset'}</span>
            </button>
          </div>

        </div>
      )}

      {/* 3. Visual 14-Step Processing Pipeline Animation */}
      {isProcessing && (
        <div className="p-6 rounded-3xl bg-dark-900 border border-cyan-500/50 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-cyan-400 animate-spin" />
              <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
                Executing 14-Step Data & Prediction Pipeline
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Stage {pipelineStep + 1} of 14: {pipelineStages[pipelineStep]}
            </span>
          </div>

          {/* Visual Step Progression Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-7 lg:grid-cols-14 gap-1.5">
            {pipelineStages.map((stg, idx) => {
              const isDone = idx < pipelineStep;
              const isCurrent = idx === pipelineStep;
              return (
                <div
                  key={stg}
                  className={`p-2 rounded-xl text-center font-mono text-[9px] border transition-all ${
                    isCurrent
                      ? 'bg-cyan-500 text-dark-950 font-black border-cyan-400 shadow-md shadow-cyan-500/40 animate-pulse'
                      : isDone
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                      : 'bg-dark-950 text-slate-600 border-slate-800'
                  }`}
                >
                  <div className="font-bold">{idx + 1}</div>
                  <div className="truncate">{stg}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Uploaded Dataset History */}
      <div className="p-6 rounded-3xl bg-dark-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-display font-black text-white uppercase tracking-wider">
            Dataset Analysis History (Local Cache)
          </h3>
          <span className="text-[10px] font-mono text-slate-500">Stored in browser local storage</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="pb-2">Dataset Name</th>
                <th className="pb-2">Analyzed At</th>
                <th className="pb-2">Records</th>
                <th className="pb-2">Stations</th>
                <th className="pb-2">Top Predicted Risk</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {datasetHistory.map((item) => (
                <tr key={item.id} className="hover:bg-dark-950/50 transition-colors">
                  <td className="py-3 text-white font-bold">{item.name}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{item.uploadedAt}</td>
                  <td className="py-3 text-slate-300">{item.rows?.toLocaleString()}</td>
                  <td className="py-3 text-cyan-400">{item.stations}</td>
                  <td className="py-3 text-amber-400 font-bold">{item.topRisk}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setActiveTab('predictions')}
                      className="px-3 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold mr-2"
                    >
                      View Results &rarr;
                    </button>
                    <button
                      onClick={() => deleteDatasetHistoryItem(item.id)}
                      className="p-1 rounded text-slate-500 hover:text-red-400"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
