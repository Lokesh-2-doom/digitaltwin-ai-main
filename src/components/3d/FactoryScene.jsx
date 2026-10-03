import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Activity, 
  Layers, 
  Eye, 
  RotateCcw, 
  ShieldAlert, 
  Radio, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  ZoomIn,
  Flame,
  GitBranch
} from 'lucide-react';

export default function FactoryScene({
  stations,
  selectedStation,
  onSelectStation,
  activeHeatmap,
  setActiveHeatmap,
  cameraMode,
  setCameraMode
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  const stationMeshesRef = useRef(new Map());
  const chassisMeshesRef = useRef([]);

  const getStationColor = (st) => {
    if (activeHeatmap === 'bottleneck') {
      if (st.bottleneckRisk >= 75) return 0xef4444;
      if (st.bottleneckRisk >= 45) return 0xf59e0b;
      return 0x10b981;
    }
    if (activeHeatmap === 'sensorCoverage') {
      if (st.status === 'inferred') return 0x3b82f6;
      return 0x06b6d4;
    }
    if (activeHeatmap === 'propagation') {
      if (st.id === 'ST11' || st.id === 'ST14') return 0xef4444;
      if (st.id === 'ST12' || st.id === 'ST13') return 0xf97316;
      return 0x10b981;
    }
    switch (st.status) {
      case 'critical': return 0xef4444;
      case 'warning': return 0xf97316;
      case 'watch': return 0xeab308;
      case 'inferred': return 0x3b82f6;
      case 'offline': return 0x64748b;
      case 'normal':
      default:
        return 0x10b981;
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 540;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x04070d);
    scene.fog = new THREE.FogExp2(0x04070d, 0.008);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);
    camera.position.set(0, 48, 72);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    mountRef.current.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 12;
    controls.maxDistance = 180;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xdbeafe, 2.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(30, 80, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -70;
    dirLight.shadow.camera.right = 70;
    dirLight.shadow.camera.top = 70;
    dirLight.shadow.camera.bottom = -70;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.6);
    fillLight.position.set(-50, 40, -40);
    scene.add(fillLight);

    for (let x = -50; x <= 55; x += 15) {
      const bayLight = new THREE.PointLight(0xffffff, 1.4, 28);
      bayLight.position.set(x, 14, 0);
      scene.add(bayLight);
    }

    const floorGeo = new THREE.PlaneGeometry(160, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x080e1a,
      roughness: 0.85,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    floor.receiveShadow = true;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(160, 40, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const trackGeo = new THREE.BoxGeometry(110, 0.4, 3.2);
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2
    });
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.position.set(5.5, 0.2, 0);
    track.receiveShadow = true;
    scene.add(track);

    const createShopZone = (name, xMin, xMax, color) => {
      const zoneWidth = xMax - xMin;
      const zoneGeo = new THREE.PlaneGeometry(zoneWidth, 36);
      const zoneMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
      });
      const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
      zoneMesh.rotation.x = -Math.PI / 2;
      zoneMesh.position.set(xMin + zoneWidth / 2, 0.02, 0);
      scene.add(zoneMesh);
    };

    createShopZone('BODY CONSTRUCTION', -45, -7.5, 0x06b6d4);
    createShopZone('PAINT SHOP', -7.5, 16.5, 0x3b82f6);
    createShopZone('FINAL ASSEMBLY', 16.5, 55, 0x10b981);

    const stationMap = new Map();

    stations.forEach((st) => {
      const group = new THREE.Group();
      group.position.set(st.posX, 0, 0);

      const baseGeo = new THREE.BoxGeometry(2.4, 0.5, 4.8);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.8,
        roughness: 0.3
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.25;
      base.receiveShadow = true;
      group.add(base);

      const archGeo = new THREE.CylinderGeometry(0.12, 0.12, 4.5);
      const archMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
      
      const leftPillar = new THREE.Mesh(archGeo, archMat);
      leftPillar.position.set(0, 2.25, -2.2);
      leftPillar.castShadow = true;
      group.add(leftPillar);

      const rightPillar = new THREE.Mesh(archGeo, archMat);
      rightPillar.position.set(0, 2.25, 2.2);
      rightPillar.castShadow = true;
      group.add(rightPillar);

      const crossBarGeo = new THREE.BoxGeometry(0.3, 0.3, 4.6);
      const crossBar = new THREE.Mesh(crossBarGeo, archMat);
      crossBar.position.set(0, 4.5, 0);
      crossBar.castShadow = true;
      group.add(crossBar);

      const haloColor = getStationColor(st);
      const haloGeo = new THREE.RingGeometry(1.6, 1.85, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: haloColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = -Math.PI / 2;
      halo.position.y = 0.05;
      halo.name = 'statusHalo';
      group.add(halo);

      const beaconGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: haloColor,
        emissive: haloColor,
        emissiveIntensity: 1.2,
        roughness: 0.1
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 4.8, 0);
      beacon.name = 'beacon';
      group.add(beacon);

      const hitBoxGeo = new THREE.BoxGeometry(2.8, 5.5, 5.0);
      const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
      hitBox.position.y = 2.5;
      hitBox.userData = { stationId: st.id };
      group.add(hitBox);

      scene.add(group);
      stationMap.set(st.id, group);
    });

    stationMeshesRef.current = stationMap;

    const carChassisList = [];
    const carSpacings = [-40, -28, -16, -4, 8, 20, 32, 44];

    carSpacings.forEach((xPos) => {
      const carGroup = new THREE.Group();
      carGroup.position.set(xPos, 1.2, 0);

      const bodyGeo = new THREE.BoxGeometry(3.6, 1.0, 1.8);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.15
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      body.name = 'carBody';
      carGroup.add(body);

      const cabinGeo = new THREE.BoxGeometry(1.8, 0.7, 1.5);
      const cabinMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.05
      });
      const cabin = new THREE.Mesh(cabinGeo, cabinMat);
      cabin.position.set(-0.2, 0.75, 0);
      carGroup.add(cabin);

      const lightGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const headL = new THREE.Mesh(lightGeo, headlightMat);
      headL.position.set(1.82, 0.1, -0.6);
      carGroup.add(headL);

      const headR = new THREE.Mesh(lightGeo, headlightMat);
      headR.position.set(1.82, 0.1, 0.6);
      carGroup.add(headR);

      const taillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tailL = new THREE.Mesh(lightGeo, taillightMat);
      tailL.position.set(-1.82, 0.1, -0.6);
      carGroup.add(tailL);

      const tailR = new THREE.Mesh(lightGeo, taillightMat);
      tailR.position.set(-1.82, 0.1, 0.6);
      carGroup.add(tailR);

      scene.add(carGroup);
      carChassisList.push(carGroup);
    });

    chassisMeshesRef.current = carChassisList;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object;
        if (obj.userData && obj.userData.stationId) {
          const targetSt = stations.find(s => s.id === obj.userData.stationId);
          if (targetSt) {
            onSelectStation(targetSt);
            break;
          }
        }
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('click', handleClick);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      carChassisList.forEach((car) => {
        car.position.x += delta * 2.2;
        if (car.position.x > 56) {
          car.position.x = -48;
        }

        const bodyMesh = car.getObjectByName('carBody');
        if (bodyMesh) {
          const mat = bodyMesh.material;
          if (car.position.x < -7.5) {
            mat.color.setHex(0xe2e8f0);
          } else if (car.position.x < 16.5) {
            mat.color.setHex(0x00f0ff);
          } else {
            mat.color.setHex(0xef4444);
          }
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 540;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('click', handleClick);
      renderer.dispose();
    };
  }, [stations]);

  useEffect(() => {
    stationMeshesRef.current.forEach((group, stId) => {
      const st = stations.find(s => s.id === stId);
      if (!st) return;

      const newColor = getStationColor(st);
      const halo = group.getObjectByName('statusHalo');
      if (halo) {
        halo.material.color.setHex(newColor);
      }

      const beacon = group.getObjectByName('beacon');
      if (beacon) {
        beacon.material.color.setHex(newColor);
        beacon.material.emissive.setHex(newColor);
      }
    });
  }, [activeHeatmap, stations]);

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (cameraMode) {
      case 'body':
        camera.position.set(-26, 22, 38);
        controls.target.set(-26, 0, 0);
        break;
      case 'paint':
        camera.position.set(4, 22, 36);
        controls.target.set(4, 0, 0);
        break;
      case 'assembly':
        camera.position.set(36, 24, 42);
        controls.target.set(36, 0, 0);
        break;
      case 'qa':
        camera.position.set(51, 14, 24);
        controls.target.set(51, 0, 0);
        break;
      case 'overview':
      default:
        camera.position.set(0, 48, 72);
        controls.target.set(0, 0, 0);
        break;
    }
    controls.update();
  }, [cameraMode]);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl bg-[#04070d] border border-cyan-500/30 overflow-hidden shadow-2xl">
      
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left View Controls & Camera Presets */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
        <div className="bg-dark-950/90 backdrop-blur-md border border-cyan-500/30 p-1 rounded-2xl flex items-center gap-1 shadow-xl">
          <button
            onClick={() => setCameraMode('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              cameraMode === 'overview'
                ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Line Overview
          </button>
          <button
            onClick={() => setCameraMode('body')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              cameraMode === 'body'
                ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Body (ST01-12)
          </button>
          <button
            onClick={() => setCameraMode('paint')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              cameraMode === 'paint'
                ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Paint (ST13-20)
          </button>
          <button
            onClick={() => setCameraMode('assembly')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
              cameraMode === 'assembly'
                ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/30 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Assembly (ST21-35)
          </button>
        </div>
      </div>

      {/* Top Right Heatmap Filter Strip */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <div className="bg-dark-950/90 backdrop-blur-md border border-slate-800 p-1 rounded-2xl flex items-center gap-1 shadow-xl">
          <button
            onClick={() => setActiveHeatmap('default')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all ${
              activeHeatmap === 'default'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveHeatmap('bottleneck')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all flex items-center gap-1 ${
              activeHeatmap === 'bottleneck'
                ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span>Bottleneck</span>
          </button>
          <button
            onClick={() => setActiveHeatmap('sensorCoverage')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all flex items-center gap-1 ${
              activeHeatmap === 'sensorCoverage'
                ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50 font-bold'
                : 'text-slate-400 hover:text-blue-400'
            }`}
          >
            <Cpu className="w-3 h-3 text-blue-400" />
            <span>Sensor Gaps</span>
          </button>
          <button
            onClick={() => setActiveHeatmap('propagation')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all flex items-center gap-1 ${
              activeHeatmap === 'propagation'
                ? 'bg-red-500/30 text-red-300 border border-red-500/50 font-bold'
                : 'text-slate-400 hover:text-red-400'
            }`}
          >
            <GitBranch className="w-3 h-3 text-red-400" />
            <span>Propagation</span>
          </button>
        </div>
      </div>

      {/* Permanent Station Status & Sensor Source Legend */}
      <div className="absolute bottom-4 left-4 bg-dark-950/90 backdrop-blur-md border border-slate-800/90 px-4 py-2.5 rounded-2xl z-10 text-[11px] font-mono space-y-2 shadow-2xl max-w-sm sm:max-w-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="text-slate-400 font-bold text-[10px] uppercase">Station Status:</span>
          <span className="text-cyan-400 font-semibold text-[10px]">35 Stations Online</span>
        </div>
        <div className="grid grid-cols-3 gap-y-1.5 gap-x-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
            <span className="text-slate-300">Healthy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400"></span>
            <span className="text-slate-300">Legacy / Inferred</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400"></span>
            <span className="text-slate-300">Early Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm shadow-orange-400"></span>
            <span className="text-slate-300">Anomaly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500 animate-pulse"></span>
            <span className="text-slate-300">Bottleneck (Critical)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
            <span className="text-slate-400">Offline</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-1.5 text-[10px] text-slate-400">
          <div className="flex items-center gap-3">
            <span><strong className="text-emerald-400">●</strong> MEASURED</span>
            <span><strong className="text-purple-400">◆</strong> AI-INFERRED</span>
            <span><strong className="text-slate-500">○</strong> UNAVAILABLE</span>
          </div>
        </div>
      </div>

      {/* Bottom Right Live Telemetry HUD */}
      <div className="absolute bottom-4 right-4 bg-dark-950/90 backdrop-blur-md border border-cyan-500/30 px-3.5 py-2.5 rounded-2xl z-10 text-[11px] font-mono text-slate-300 shadow-2xl flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Takt Target: <strong className="text-white">60.0s</strong></span>
        </div>
        <span className="text-slate-700">|</span>
        <div>
          Selected: <strong className="text-cyan-400">{selectedStation ? `${selectedStation.id} (${selectedStation.name})` : 'Click Station'}</strong>
        </div>
      </div>

    </div>
  );
}
