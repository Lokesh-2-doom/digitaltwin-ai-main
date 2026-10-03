import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Camera, Shield, AlertTriangle, CheckCircle2, Cpu, Activity, Eye, Sliders, Zap, Sparkles } from 'lucide-react';

export default function CinematicVideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(24); // percentage
  const [activeCamera, setActiveCamera] = useState('cam1');
  const [aiOverlayActive, setAiOverlayActive] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const cameras = [
    { id: 'cam1', name: 'CAM-01 // BODY SHOP WELD CELL', stn: 'STN B-04', type: 'High-Speed Optical', status: 'ANOMALY DETECTED', alertColor: 'text-amber-400' },
    { id: 'cam2', name: 'CAM-02 // PAINT SHOP TUNNEL', stn: 'STN P-02', type: 'Thermal & Flow Vision', status: 'INFERRED STATE (96%)', alertColor: 'text-purple-400' },
    { id: 'cam3', name: 'CAM-03 // POWERTRAIN MARRIAGE', stn: 'STN M-08', type: 'Robotic Torque Scanner', status: 'NOMINAL FLOW', alertColor: 'text-emerald-400' },
    { id: 'cam4', name: 'CAM-04 // FINAL EOL INSPECTION', stn: 'STN Q-16', type: '3D Surface Profiler', status: 'ZERO ESCAPE', alertColor: 'text-cyan-400' },
  ];

  const timelineEvents = [
    { pct: 10, label: '00:12 - Micro-Stop at Station B-04', type: 'warning' },
    { pct: 35, label: '00:38 - AI Predicts Starvation in 23m', type: 'ai' },
    { pct: 65, label: '01:12 - Bayesian Surrogate Bridges STN P-02', type: 'inference' },
    { pct: 88, label: '01:45 - Prescriptive Buffer Auto-Balancing', type: 'success' },
  ];

  // Dynamic canvas animation for the high-tech video simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.07)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Conveyor track rendering
      const cy = height * 0.58;
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 24;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();

      // Conveyor rollers
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      const rollerSpacing = 30;
      const offset = (frame * (isPlaying ? 1.5 : 0)) % rollerSpacing;
      for (let x = -rollerSpacing; x < width + rollerSpacing; x += rollerSpacing) {
        ctx.beginPath();
        ctx.moveTo(x + offset, cy - 10);
        ctx.lineTo(x + offset, cy + 10);
        ctx.stroke();
      }

      // Moving Vehicle Chassis on line
      const numCars = 4;
      for (let i = 0; i < numCars; i++) {
        const carSpacing = width / numCars;
        let carX = ((frame * (isPlaying ? 1.2 : 0) + i * carSpacing) % (width + 200)) - 100;
        
        // Draw Car Chassis
        ctx.save();
        ctx.translate(carX, cy - 35);

        // Body Shadow
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.fillRect(-60, 20, 120, 15);

        // Main Car Frame
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = activeCamera === 'cam1' && carX > width * 0.35 && carX < width * 0.65 ? '#f59e0b' : '#06b6d4';
        ctx.lineWidth = 2;
        
        // Chassis Box
        ctx.beginPath();
        ctx.roundRect(-55, -20, 110, 35, 6);
        ctx.fill();
        ctx.stroke();

        // Cabin Top
        ctx.beginPath();
        ctx.moveTo(-35, -20);
        ctx.lineTo(-15, -42);
        ctx.lineTo(25, -42);
        ctx.lineTo(45, -20);
        ctx.closePath();
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.stroke();

        // AI Computer Vision Bounding Box if AI overlay is active
        if (aiOverlayActive) {
          ctx.strokeStyle = activeCamera === 'cam1' && carX > width * 0.35 && carX < width * 0.65 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(6, 182, 212, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([6, 4]);
          ctx.strokeRect(-70, -55, 140, 85);
          ctx.setLineDash([]);

          // AI Tag
          ctx.fillStyle = activeCamera === 'cam1' && carX > width * 0.35 && carX < width * 0.65 ? '#f59e0b' : '#06b6d4';
          ctx.font = '10px monospace';
          const tagText = activeCamera === 'cam1' && carX > width * 0.35 && carX < width * 0.65 ? 'WARN: CLAMP DELAY +6.4s' : 'ID: VIN-7894 • NOMINAL';
          ctx.fillText(tagText, -68, -62);
        }

        ctx.restore();
      }

      // Robotic Arms at Stations
      const stations = [width * 0.25, width * 0.5, width * 0.75];
      stations.forEach((stnX, idx) => {
        const isTargetStn = idx === 1;
        ctx.save();
        ctx.translate(stnX, cy - 80);

        // Robotic Base
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-20, 40, 40, 40);

        // Arm Pivot Motion
        const angle = Math.sin((frame * 0.04) + idx) * 0.35;
        ctx.rotate(angle);

        // Arm Segment 1
        ctx.fillStyle = isTargetStn && activeCamera === 'cam1' ? '#f59e0b' : '#38bdf8';
        ctx.fillRect(-6, -60, 12, 60);

        // Tool Head Laser
        if (isPlaying) {
          ctx.strokeStyle = isTargetStn ? 'rgba(245, 158, 11, 0.7)' : 'rgba(6, 182, 212, 0.7)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, 75);
          ctx.stroke();

          // Laser Sparks
          ctx.fillStyle = isTargetStn ? '#fbbf24' : '#67e8f9';
          for (let s = 0; s < 4; s++) {
            ctx.fillRect((Math.random() - 0.5) * 20, 70 + (Math.random() - 0.5) * 10, 3, 3);
          }
        }

        ctx.restore();
      });

      // Camera Scan lines & Telemetry HUD Overlay
      if (aiOverlayActive) {
        // Subtle scanline
        const scanY = (frame * 2.5) % height;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, activeCamera, aiOverlayActive]);

  // Auto-advance timeline progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentProgress(prev => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="video-demo" className="py-16 sm:py-24 bg-dark-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase mb-3">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              Live Plant Vision & Digital Twin Stream
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Watch The Twin In Action
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Experience how DigitalTwin.ai continuously tracks real-time physical assembly operations, predicts downstream ripple effects, and executes prescriptive interventions.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-dark-900 border border-slate-800 font-mono text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FEED LATENCY: <strong className="text-cyan-400">42ms</strong></span>
            <span className="text-slate-600">|</span>
            <span>FPS: <strong className="text-white">60</strong></span>
          </div>
        </div>

        {/* Cinematic Video Player Container */}
        <div className="rounded-3xl bg-dark-950 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 overflow-hidden relative">
          
          {/* Top Camera Selector Bar */}
          <div className="bg-dark-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center gap-2">
              {cameras.map((cam) => {
                const isActive = activeCamera === cam.id;
                return (
                  <button
                    key={cam.id}
                    onClick={() => setActiveCamera(cam.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500 text-dark-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-dark-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{cam.name.split('//')[0]}</span>
                    <span className={`text-[10px] ${isActive ? 'text-dark-900 font-bold' : cam.alertColor}`}>
                      [{cam.stn}]
                    </span>
                  </button>
                );
              })}
            </div>

            {/* AI Overlay Toggle */}
            <button
              onClick={() => setAiOverlayActive(!aiOverlayActive)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all flex items-center gap-2 shrink-0 ${
                aiOverlayActive
                  ? 'bg-purple-950/80 border-purple-500/50 text-purple-300 shadow-md shadow-purple-950/30'
                  : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AI HUD: {aiOverlayActive ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* Main Video Viewport Canvas */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full bg-[#050811] overflow-hidden group">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* In-Video Real-Time HUD Elements */}
            {aiOverlayActive && (
              <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
                
                {/* Top Overlay Row */}
                <div className="flex items-start justify-between">
                  <div className="bg-dark-950/80 backdrop-blur-md border border-cyan-500/40 p-3 rounded-xl font-mono text-xs space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      <span>ACTIVE TWIN SYNCHRONIZER</span>
                    </div>
                    <div className="text-slate-300 text-[11px]">
                      ZONE: <strong className="text-white">Body Construction & Framing</strong>
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      TAKT PACE: <span className="text-emerald-400 font-bold">58.2s</span> (NOMINAL: 60s)
                    </div>
                  </div>

                  {/* Warning Box on Active Cam */}
                  <div className="bg-amber-950/80 backdrop-blur-md border border-amber-500/50 p-3 rounded-xl font-mono text-xs space-y-1 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-amber-400 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
                      <span>PREDICTIVE WARNING IN PROGRESS</span>
                    </div>
                    <div className="text-white text-[11px] font-bold">
                      Station B-04 Actuator Delay (+6.4s)
                    </div>
                    <div className="text-amber-300 text-[10px]">
                      Downstream Starvation Lead Time: <strong>23 Mins</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Row */}
                <div className="flex items-end justify-between">
                  <div className="bg-dark-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl font-mono text-[11px] text-slate-300 flex items-center gap-3">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>Cross-Station Correlation: <strong>99.4%</strong></span>
                    <span className="text-slate-600">|</span>
                    <span>Bayesian Inference: <strong className="text-purple-400">Online</strong></span>
                  </div>

                  <div className="bg-cyan-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-xl font-mono text-xs text-cyan-300 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Prescriptive Action: <strong>Buffer S-05 Rebalanced</strong></span>
                  </div>
                </div>

              </div>
            )}

            {/* Play / Pause Big Center Button Overlay (on hover) */}
            <div 
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/30 backdrop-blur-md border border-cyan-400/80 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </div>
            </div>

          </div>

          {/* Bottom Video Controls & Scrub Timeline */}
          <div className="bg-dark-900 p-4 border-t border-slate-800 space-y-3">
            
            {/* Timeline Scrubber */}
            <div className="space-y-1.5">
              <div className="relative w-full h-2.5 bg-dark-950 rounded-full overflow-hidden cursor-pointer">
                {/* Progress Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-100"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>

              {/* Timestamp Markers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {timelineEvents.map((evt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProgress(evt.pct)}
                    className={`p-2 rounded-xl text-left font-mono text-[11px] border transition-colors ${
                      currentProgress >= evt.pct - 5 && currentProgress <= evt.pct + 15
                        ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                        : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${evt.type === 'warning' ? 'bg-amber-400' : evt.type === 'ai' ? 'bg-purple-400' : 'bg-cyan-400'}`}></span>
                      <span className="truncate">{evt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={() => setCurrentProgress(0)}
                  className="p-2 rounded-xl bg-dark-950 hover:bg-slate-800 text-slate-300 transition-colors"
                  title="Replay Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-slate-400">
                  <strong className="text-white">{Math.floor((currentProgress * 2) / 60)}:{(Math.floor((currentProgress * 2) % 60)).toString().padStart(2, '0')}</strong> / 03:20
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-dark-950 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>

                <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                  <span className="text-[10px] text-slate-500 px-1">SPEED:</span>
                  {[1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 rounded-lg transition-colors ${
                        playbackSpeed === spd ? 'bg-cyan-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
