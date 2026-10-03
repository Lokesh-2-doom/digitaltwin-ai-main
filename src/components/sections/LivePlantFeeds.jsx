import React, { useState, useEffect } from 'react';
import { Camera, Radio, Cpu, AlertTriangle, CheckCircle2, Eye, Sliders, Shield, Zap, Sparkles, Activity } from 'lucide-react';

export default function LivePlantFeeds() {
  const [activeCam, setActiveCam] = useState('cam1');
  const [isLive, setIsLive] = useState(true);
  const [aiHudActive, setAiHudActive] = useState(true);

  const cameras = [
    {
      id: 'cam1',
      name: 'CAM-01 // BODY SHOP WELDING',
      zone: 'STATION B-04',
      type: 'Robotic Weld Cell',
      status: 'ANOMALY DETECTED',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      image: '/cctv/cam1.jpg',
      tag: 'Clamp Actuator Drift +6.4s',
      takt: '58.2s / 60s',
      desc: 'High-speed optical camera tracking 4 robotic welding arms. Micro-delay detected in secondary clamp cylinder.'
    },
    {
      id: 'cam2',
      name: 'CAM-02 // PAINT SHOP TUNNEL',
      zone: 'STATION P-02',
      type: 'Automated Spray Tunnel',
      status: 'INFERRED (96.2%)',
      statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      image: '/cctv/cam2.jpg',
      tag: 'Bayesian Surrogate Active',
      takt: '59.1s / 60s',
      desc: 'Atomization mist chamber. Sensor-poor legacy PLC bridged via cross-station Bayesian state estimation.'
    },
    {
      id: 'cam3',
      name: 'CAM-03 // POWERTRAIN MARRIAGE',
      zone: 'STATION M-08',
      type: 'Heavy Gantry Mating',
      status: 'FLOW NOMINAL',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      image: '/cctv/cam3.jpg',
      tag: 'Torque Sync 100%',
      takt: '57.8s / 60s',
      desc: 'Synchronized overhead gantry lowering vehicle chassis onto powertrain and suspension carriage.'
    },
    {
      id: 'cam4',
      name: 'CAM-04 // EOL QUALITY SCAN',
      zone: 'STATION Q-16',
      type: 'Laser Gap & Flush Scan',
      status: 'ZERO DEFECT ESCAPE',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      image: '/cctv/cam4.jpg',
      tag: 'Continuous Verification',
      takt: '58.4s / 60s',
      desc: 'High-precision optical laser scanning checking panel alignment, surface continuity, and electrical flash test.'
    }
  ];

  const currentCam = cameras.find(c => c.id === activeCam) || cameras[0];

  return (
    <section id="plant-vision" className="py-12 sm:py-16 bg-[#04070e] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              Live Industrial Vision Feeds
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
              Real-Time Plant Camera & AI Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Switch between factory cameras to see live physical operations mapped directly into the DigitalTwin.ai predictive engine.
            </p>
          </div>

          {/* Quick HUD Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiHudActive(!aiHudActive)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center gap-2 ${
                aiHudActive
                  ? 'bg-purple-950/70 border-purple-500/40 text-purple-300 shadow-md shadow-purple-950/20'
                  : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AI HUD OVERLAY: {aiHudActive ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Camera Switcher Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {cameras.map((cam) => {
            const isSelected = activeCam === cam.id;
            return (
              <button
                key={cam.id}
                onClick={() => setActiveCam(cam.id)}
                className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-dark-850 border-cyan-500 shadow-lg shadow-cyan-950/50 scale-[1.01]'
                    : 'bg-dark-950/80 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-slate-400 font-bold">{cam.zone}</span>
                    <span className={`px-2 py-0.5 rounded-full border ${cam.statusColor}`}>
                      {cam.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {cam.name.split('//')[1]}
                  </h4>
                </div>

                <div className="mt-2 text-[10px] font-mono text-cyan-400 flex items-center justify-between border-t border-slate-800/60 pt-1.5">
                  <span className="text-slate-400">{cam.type}</span>
                  <span className="font-bold">{isSelected ? 'Active Stream' : 'Switch &rarr;'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Camera Viewer Card */}
        <div className="rounded-3xl bg-dark-950 border border-cyan-500/30 overflow-hidden shadow-2xl relative">
          
          {/* Main Visual Display */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full bg-slate-950 overflow-hidden group">
            
            {/* Real Photorealistic Factory Feed Image */}
            <img
              src={currentCam.image}
              alt={currentCam.name}
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />

            {/* Subtle Live Scan Line */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-20 animate-pulse w-full"></div>

            {/* AI HUD Overlay Boxes & Real-Time Telemetry */}
            {aiHudActive && (
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
                
                {/* Top Row Overlays */}
                <div className="flex items-start justify-between">
                  {/* Left Info HUD */}
                  <div className="bg-dark-950/85 backdrop-blur-md border border-cyan-500/40 p-3 rounded-2xl font-mono text-xs space-y-1 shadow-xl">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{currentCam.name}</span>
                    </div>
                    <div className="text-slate-300 text-[11px]">
                      ZONE: <strong className="text-white">{currentCam.zone}</strong> &bull; {currentCam.type}
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      TAKT PACE: <span className="text-emerald-400 font-bold">{currentCam.takt}</span>
                    </div>
                  </div>

                  {/* Right Status Badge */}
                  <div className="bg-dark-950/85 backdrop-blur-md border border-slate-800 p-3 rounded-2xl font-mono text-xs text-right shadow-xl space-y-1">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentCam.statusColor}`}>
                        {currentCam.status}
                      </span>
                    </div>
                    <div className="text-slate-300 text-[11px] font-semibold">
                      {currentCam.tag}
                    </div>
                  </div>
                </div>

                {/* Center Dynamic Tracking Bounding Box */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-40 sm:h-52 border-2 border-cyan-400/80 border-dashed rounded-2xl flex flex-col justify-between p-2.5 shadow-2xl shadow-cyan-950/40 animate-pulse">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300 bg-dark-950/80 px-2 py-0.5 rounded w-max border border-cyan-500/30">
                    <span>AI_TRACK: VIN_CHASSIS_8842</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300 bg-dark-950/80 px-2 py-0.5 rounded w-max self-end border border-emerald-500/30">
                    <span>CONFIDENCE: 99.4%</span>
                  </div>
                </div>

                {/* Bottom Row Overlays */}
                <div className="flex items-end justify-between">
                  <div className="bg-dark-950/85 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl font-mono text-[11px] text-slate-300 flex items-center gap-3">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Synchronized Virtual Twin: <strong className="text-cyan-400">ACTIVE</strong></span>
                  </div>

                  <div className="bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-2 rounded-xl font-mono text-[11px] text-cyan-300 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Cross-Station Edge Telemetry: <strong>Connected</strong></span>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Bottom Stream Info Bar */}
          <div className="p-4 bg-dark-900 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <p className="text-slate-300 font-mono">
              <strong className="text-white">{currentCam.zone}:</strong> {currentCam.desc}
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE OT GATEWAY &bull; 10,000 Hz Ingestion</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
