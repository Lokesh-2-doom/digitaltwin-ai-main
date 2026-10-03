import React from 'react';
import { X, Download, FileText, CheckCircle2, Table, Layers } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function ExportReportModal() {
  const { exportReportOpen, setExportReportOpen, activeDatasetName, analysisResult, stations } = useAppStore();

  if (!exportReportOpen) return null;

  const downloadMarkdownReport = () => {
    const content = `# DigitalTwin.ai — Industrial Predictive Intelligence Report
Dataset: ${activeDatasetName}
Generated: ${new Date().toISOString()}
Line Health: ${analysisResult?.lineHealth || 88.4}%

## 1. Executive Summary
- Total Stations Monitored: 35
- Active Anomaly Count: ${analysisResult?.anomaliesCount || 4}
- Predicted Bottlenecks: ${analysisResult?.predictedBottlenecksCount || 2}
- Sensor Gaps Bridged: ${analysisResult?.sensorGapsCount || 8} (Bayesian Surrogate AI)

## 2. Top Ranked Bottleneck Predictions
${(analysisResult?.topPredictions || []).map((p, i) => `
### ${i + 1}. Station ${p.stationId} (${p.stationName})
- Shop Area: ${p.area}
- Bottleneck Risk: ${p.bottleneckRisk}%
- Estimated Time to Bottleneck: ~${p.estimatedTimeMinutes} minutes
- AI Confidence: ${p.confidence}%
- Contributing Factors:
${p.contributingFactors.map(f => `  - ${f}`).join('\n')}
- Prescriptive Recommendation: ${p.recommendedAction.problemSummary}
`).join('\n')}

## 3. Station Telemetry Matrix (35 Stations)
| Station ID | Name | Area | Takt Target | Actual Cycle Time | WIP Buffer | Status | Risk % |
| --- | --- | --- | --- | --- | --- | --- | --- |
${stations.map(s => `| ${s.id} | ${s.name} | ${s.area} | ${s.taktTime}s | ${s.cycleTimeActual}s | ${s.wipBuffer}/${s.maxBuffer} | ${s.status} | ${s.bottleneckRisk}% |`).join('\n')}

## 4. Engineering Notice
Predictions are illustrative decision-support guidance for automotive plant supervisors. Unlabeled datasets use statistical process control limits; supervised metrics require labeled defect logs.
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DigitalTwin_AI_Report_${activeDatasetName.replace('.csv', '').replace('.xlsx', '')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = ['Station_ID', 'Station_Name', 'Shop_Area', 'Takt_Target_Sec', 'Actual_Cycle_Time_Sec', 'WIP_Buffer', 'Temperature_C', 'Vibration_RMS', 'Torque_Nm', 'Status', 'Bottleneck_Risk_Pct', 'Defect_Risk_Pct'];
    const rows = stations.map(s => [
      s.id,
      `"${s.name}"`,
      s.area,
      s.taktTime,
      s.cycleTimeActual,
      s.wipBuffer,
      s.temperature,
      s.vibration,
      s.torque,
      s.status,
      s.bottleneckRisk,
      s.defectRisk
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DigitalTwin_AI_Predictions_${activeDatasetName.replace('.csv', '').replace('.xlsx', '')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-dark-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={() => setExportReportOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-xl bg-dark-950 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-2">
            <Download className="w-3.5 h-3.5" />
            Export Prediction Intelligence
          </div>
          <h3 className="text-2xl font-display font-black text-white">
            Export Analysis & Telemetry Report
          </h3>
          <p className="text-xs text-slate-300 font-mono mt-1">
            Download full technical audit reports and CSV results for plant engineers and executives.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {/* Option 1: Markdown Report */}
          <button
            onClick={downloadMarkdownReport}
            className="w-full p-4 rounded-2xl bg-dark-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Download Executive Audit (.MD / PDF Ready)</strong>
                <span className="text-slate-400 text-[11px]">Includes risk breakdown, root causes & recommendations</span>
              </div>
            </div>
            <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>

          {/* Option 2: CSV Data Export */}
          <button
            onClick={downloadCSV}
            className="w-full p-4 rounded-2xl bg-dark-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block text-sm">Download Prediction Matrix (.CSV)</strong>
                <span className="text-slate-400 text-[11px]">Raw telemetry values, sensor sources & risk indices</span>
              </div>
            </div>
            <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>

        <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-[11px] font-mono text-slate-400">
          Generated from synchronized 35-station Digital Twin data pipeline.
        </div>

      </div>
    </div>
  );
}
