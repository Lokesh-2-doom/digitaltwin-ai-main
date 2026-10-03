const fs = require('fs');
const path = require('path');

const factorySceneCode = \import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Layers, Zap, RotateCcw, AlertTriangle, Cpu, Eye, Radio, Sparkles } from 'lucide-react';

export default function FactoryScene({ 
  stations, 
  selectedStation, 
  onSelectStation, 
  activeHeatmap, 
  setActiveHeatmap,
  simulationRunning = true,
  cameraMode = 'orbit',
  setCameraMode
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const stationMeshesRef = useRef([]);
  const chassisMeshesRef = useRef([]);
  const particleSystemsRef = useRef([]);
  const laserBeamsRef = useRef([]);
  const targetCamPosRef = useRef(new THREE.Vector3(0, 24, 46));
  const targetCamLookRef = useRef(new THREE.Vector3(0, 1, 0));
  const [hoveredStation, setHoveredStation] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06090f);
    scene.fog = new THREE.FogExp2(0x06090f, 0.012);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 500);
    camera.position.set(0, 24, 46);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 110;
    controls.target.set(0, 1.5, 0);
    controlsRef.current = controls;

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x223348, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(20, 45, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // Colored Neon Area Overhead Accent Lights
    const cyanLight = new THREE.PointLight(0x00f0ff, 2.2, 50);
    cyanLight.position.set(-25, 14, 0);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 50);
    purpleLight.position.set(-5, 14, 0);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 2.2, 50);
    blueLight.position.set(15, 14, 0);
    scene.add(blueLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.2, 50);
    emeraldLight.position.set(35, 14, 0);
    scene.add(emeraldLight);

    // Factory Floor
    const floorGeo = new THREE.PlaneGeometry(160, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090d18,
      roughness: 0.85,
      metalness: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor Grid Helper
    const grid = new THREE.GridHelper(160, 80, 0x00f0ff, 0x16203a);
    grid.position.y = 0.01;
    scene.add(grid);

    // Area Zones
    const areas = [
      { start: -45, end: -17.5, color: 0x00f0ff, name: 'BODY SHOP' },
      { start: -17.5, end: 2.5, color: 0xa855f7, name: 'PAINT SHOP' },
      { start: 2.5, end: 27.5, color: 0x3b82f6, name: 'FINAL ASSEMBLY' },
      { start: 27.5, end: 45, color: 0x10b981, name: 'QUALITY TESTING' }
    ];

    areas.forEach(area => {
      const width = area.end - area.start;
      const center = (area.start + area.end) / 2;
      const zoneGeo = new THREE.PlaneGeometry(width - 0.4, 22);
      const zoneMat = new THREE.MeshBasicMaterial({
        color: area.color,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
      });
      const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
      zoneMesh.rotation.x = -Math.PI / 2;
      zoneMesh.position.set(center, 0.02, 0);
      scene.add(zoneMesh);
    });

    // Conveyor Base Structure
    const trackGeo = new THREE.BoxGeometry(92, 0.4, 3.4);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.8 });
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.position.set(2.5, 0.2, 0);
    track.receiveShadow = true;
    scene.add(track);

    // Conveyor Rollers
    const rollerGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.2, 12);
    const rollerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25 });
    for (let x = -40; x <= 45; x += 1.4) {
      const roller = new THREE.Mesh(rollerGeo, rollerMat);
      roller.rotation.z = Math.PI / 2;
      roller.position.set(x, 0.45, 0);
      scene.add(roller);
    }

    // Overhead Factory Gantry
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.4 });
    const gantryGeo = new THREE.BoxGeometry(92, 0.45, 0.45);
    const gantry1 = new THREE.Mesh(gantryGeo, trussMat);
    gantry1.position.set(2.5, 8.5, -4.5);
    scene.add(gantry1);
    const gantry2 = new THREE.Mesh(gantryGeo, trussMat);
    gantry2.position.set(2.5, 8.5, 4.5);
    scene.add(gantry2);

    for (let x = -40; x <= 45; x += 15) {
      const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 8.5, 12);
      const p1 = new THREE.Mesh(pillarGeo, trussMat);
      p1.position.set(x, 4.25, -4.5);
      scene.add(p1);
      const p2 = new THREE.Mesh(pillarGeo, trussMat);
      p2.position.set(x, 4.25, 4.5);
      scene.add(p2);
    }

    // Station Meshes
    const stationMeshes = [];
    const particles = [];
    const lasers = [];

    stations.forEach((st) => {
      const group = new THREE.Group();
      group.position.set(st.posX, 0, 0);
      group.userData = { stationId: st.id, stationData: st };

      // Base Pad
      const baseGeo = new THREE.BoxGeometry(4.0, 0.2, 8.2);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.6, roughness: 0.4 });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.set(0, 0.1, 0);
      baseMesh.receiveShadow = true;
      group.add(baseMesh);

      // Station Floor Status Halo
      const ringGeo = new THREE.RingGeometry(2.3, 2.6, 32);
      let ringColor = 0x00f0ff;
      if (st.status === 'warning') ringColor = 0xf59e0b;
      if (st.sensorTier === 'inferred') ringColor = 0xa855f7;

      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.set(0, 0.22, 0);
      group.add(ringMesh);
      group.userData.ringMesh = ringMesh;

      // Station Signal Pole
      const beaconGeo = new THREE.CylinderGeometry(0.12, 0.12, 4.2, 12);
      const beaconMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(-1.7, 2.1, 3.6);
      group.add(beacon);

      const beaconLightGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const beaconLightMat = new THREE.MeshBasicMaterial({ color: ringColor });
      const beaconLight = new THREE.Mesh(beaconLightGeo, beaconLightMat);
      beaconLight.position.set(-1.7, 4.3, 3.6);
      group.add(beaconLight);
      group.userData.beaconLight = beaconLight;

      // Shop-specific Machinery
      if (st.area === 'BODY') {
        [-1, 1].forEach((side) => {
          const armBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.45, 0.55, 0.7, 16),
            new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.7 })
          );
          armBase.position.set(0, 0.45, side * 3.0);
          group.add(armBase);

          const armSeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 2.0, 0.3),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.5 })
          );
          armSeg.position.set(0, 1.5, side * 3.0);
          armSeg.rotation.x = side * 0.35;
          group.add(armSeg);

          const gun = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.12, 1.6, 12),
            new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 })
          );
          gun.position.set(0, 2.6, side * 1.8);
          gun.rotation.x = -side * 0.6;
          group.add(gun);
        });

        // Sparks particle emitter
        const sparkCount = 35;
        const sparkGeo = new THREE.BufferGeometry();
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkVelocities = [];
        for (let i = 0; i < sparkCount; i++) {
          sparkPositions[i * 3] = (Math.random() - 0.5) * 0.5;
          sparkPositions[i * 3 + 1] = 0.9 + Math.random() * 0.4;
          sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
          sparkVelocities.push(new THREE.Vector3(
            (Math.random() - 0.5) * 0.06,
            Math.random() * 0.06 + 0.03,
            (Math.random() - 0.5) * 0.06
          ));
        }
        sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
        const sparkMat = new THREE.PointsMaterial({
          color: 0xffd700,
          size: 0.16,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        });
        const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
        group.add(sparkPoints);
        particles.push({ points: sparkPoints, velocities: sparkVelocities, type: 'sparks' });

      } else if (st.area === 'PAINT') {
        const cabinGeo = new THREE.BoxGeometry(3.8, 3.5, 6.2);
        const cabinMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          transparent: true,
          opacity: 0.15,
          roughness: 0.1,
          metalness: 0.8
        });
        const cabin = new THREE.Mesh(cabinGeo, cabinMat);
        cabin.position.set(0, 1.85, 0);
        group.add(cabin);

        const mistCount = 45;
        const mistGeo = new THREE.BufferGeometry();
        const mistPositions = new Float32Array(mistCount * 3);
        const mistVelocities = [];
        for (let i = 0; i < mistCount; i++) {
          mistPositions[i * 3] = (Math.random() - 0.5) * 1.4;
          mistPositions[i * 3 + 1] = 2.6 - Math.random() * 1.5;
          mistPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
          mistVelocities.push(new THREE.Vector3(
            (Math.random() - 0.5) * 0.015,
            -0.02 - Math.random() * 0.015,
            (Math.random() - 0.5) * 0.015
          ));
        }
        mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));
        const mistMat = new THREE.PointsMaterial({
          color: 0xec4899,
          size: 0.22,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending
        });
        const mistPoints = new THREE.Points(mistGeo, mistMat);
        group.add(mistPoints);
        particles.push({ points: mistPoints, velocities: mistVelocities, type: 'mist' });

      } else if (st.area === 'ASSEMBLY') {
        const hoistGeo = new THREE.BoxGeometry(2.2, 0.35, 3.8);
        const hoistMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.8 });
        const hoist = new THREE.Mesh(hoistGeo, hoistMat);
        hoist.position.set(0, 5.0, 0);
        group.add(hoist);

        [-1.0, 1.0].forEach(z => {
          const rod = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 3.0, 8),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
          );
          rod.position.set(0, 3.5, z);
          group.add(rod);
        });

      } else if (st.area === 'QUALITY') {
        const archGeo = new THREE.TorusGeometry(3.0, 0.12, 12, 24, Math.PI);
        const archMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.9 });
        const arch = new THREE.Mesh(archGeo, archMat);
        arch.rotation.z = Math.PI;
        arch.rotation.y = Math.PI / 2;
        arch.position.set(0, 0.2, 0);
        group.add(arch);

        const laserPlaneGeo = new THREE.PlaneGeometry(0.08, 4.0);
        const laserPlaneMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          transparent: true,
          opacity: 0.65,
          side: THREE.DoubleSide
        });
        const laserPlane = new THREE.Mesh(laserPlaneGeo, laserPlaneMat);
        laserPlane.rotation.x = Math.PI / 2;
        laserPlane.position.set(0, 1.3, 0);
        group.add(laserPlane);
        lasers.push({ mesh: laserPlane, speed: 0.035 });
      }

      scene.add(group);
      stationMeshes.push(group);
    });

    stationMeshesRef.current = stationMeshes;
    particleSystemsRef.current = particles;
    laserBeamsRef.current = lasers;

    // Conveyor Vehicle Chassis Models
    const chassisList = [];
    const chassisCount = 10;
    const startX = -42;
    const spacing = 9.0;

    for (let i = 0; i < chassisCount; i++) {
      const chassisGroup = new THREE.Group();
      const posX = startX + i * spacing;
      chassisGroup.position.set(posX, 0.6, 0);

      let bodyColor = 0x64748b;
      if (posX > -17.5 && posX <= 2.5) bodyColor = 0x0284c7;
      if (posX > 2.5) bodyColor = 0x0f766e;

      const bodyGeo = new THREE.BoxGeometry(4.0, 1.0, 2.0);
      const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.7, roughness: 0.3 });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.y = 0.55;
      chassisGroup.add(bodyMesh);

      const roofGeo = new THREE.BoxGeometry(2.3, 0.7, 1.7);
      const roofMesh = new THREE.Mesh(roofGeo, bodyMat);
      roofMesh.position.set(-0.3, 1.35, 0);
      chassisGroup.add(roofMesh);

      const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.22, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.9 });
      [
        [-1.2, -1.05], [1.2, -1.05],
        [-1.2, 1.05], [1.2, 1.05]
      ].forEach(([wx, wz]) => {
        const wheel = new THREE.Mesh(wheelGeo, wheelMat);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(wx, 0.38, wz);
        chassisGroup.add(wheel);
      });

      scene.add(chassisGroup);
      chassisList.push(chassisGroup);
    }
    chassisMeshesRef.current = chassisList;

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stationMeshes, true);

      if (intersects.length > 0) {
        let top = intersects[0].object;
        while (top.parent && top.parent !== scene) top = top.parent;
        if (top.userData?.stationData) {
          setHoveredStation(top.userData.stationData);
          container.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredStation(null);
      container.style.cursor = 'default';
    };

    const onPointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stationMeshes, true);

      if (intersects.length > 0) {
        let top = intersects[0].object;
        while (top.parent && top.parent !== scene) top = top.parent;
        if (top.userData?.stationData) {
          onSelectStation(top.userData.stationData);
        }
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      controls.update();

      if (cameraRef.current && targetCamPosRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.045);
        controls.target.lerp(targetCamLookRef.current, 0.045);
      }

      if (simulationRunning) {
        chassisMeshesRef.current.forEach((chassis) => {
          chassis.position.x += delta * 1.6;
          if (chassis.position.x > 46) chassis.position.x = -42;
        });
      }

      particleSystemsRef.current.forEach((pSys) => {
        const pos = pSys.points.geometry.attributes.position.array;
        for (let i = 0; i < pSys.velocities.length; i++) {
          if (pSys.type === 'sparks') {
            pos[i * 3] += pSys.velocities[i].x;
            pos[i * 3 + 1] += pSys.velocities[i].y;
            pos[i * 3 + 2] += pSys.velocities[i].z;
            pSys.velocities[i].y -= 0.003;
            if (pos[i * 3 + 1] < 0.2) {
              pos[i * 3] = (Math.random() - 0.5) * 0.4;
              pos[i * 3 + 1] = 1.1;
              pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
              pSys.velocities[i].y = Math.random() * 0.06 + 0.03;
            }
          } else if (pSys.type === 'mist') {
            pos[i * 3] += pSys.velocities[i].x;
            pos[i * 3 + 1] += pSys.velocities[i].y;
            pos[i * 3 + 2] += pSys.velocities[i].z;
            if (pos[i * 3 + 1] < 0.4) {
              pos[i * 3] = (Math.random() - 0.5) * 1.4;
              pos[i * 3 + 1] = 2.6;
              pos[i * 3 + 2] = (Math.random() - 0.5) * 1.8;
            }
          }
        }
        pSys.points.geometry.attributes.position.needsUpdate = true;
      });

      laserBeamsRef.current.forEach((laser) => {
        laser.mesh.position.z += laser.speed;
        if (laser.mesh.position.z > 2.2 || laser.mesh.position.z < -2.2) {
          laser.speed = -laser.speed;
        }
      });

      stationMeshesRef.current.forEach((grp) => {
        const stData = grp.userData.stationData;
        if (grp.userData.ringMesh && stData.status === 'warning') {
          grp.userData.ringMesh.material.opacity = 0.4 + Math.sin(time * 6) * 0.5;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
    };
  }, []);

  // Update Camera Focus
  useEffect(() => {
    if (selectedStation) {
      targetCamPosRef.current = new THREE.Vector3(selectedStation.posX, 7, 13);
      targetCamLookRef.current = new THREE.Vector3(selectedStation.posX, 1.6, 0);
    } else {
      if (cameraMode === 'overview') {
        targetCamPosRef.current = new THREE.Vector3(0, 36, 46);
        targetCamLookRef.current = new THREE.Vector3(0, 0, 0);
      } else if (cameraMode === 'bodyShop') {
        targetCamPosRef.current = new THREE.Vector3(-28, 12, 19);
        targetCamLookRef.current = new THREE.Vector3(-28, 1.5, 0);
      } else if (cameraMode === 'paintShop') {
        targetCamPosRef.current = new THREE.Vector3(-8, 12, 19);
        targetCamLookRef.current = new THREE.Vector3(-8, 1.5, 0);
      } else if (cameraMode === 'finalAssembly') {
        targetCamPosRef.current = new THREE.Vector3(15, 12, 19);
        targetCamLookRef.current = new THREE.Vector3(15, 1.5, 0);
      } else if (cameraMode === 'quality') {
        targetCamPosRef.current = new THREE.Vector3(35, 12, 19);
        targetCamLookRef.current = new THREE.Vector3(35, 1.5, 0);
      } else {
        targetCamPosRef.current = new THREE.Vector3(0, 22, 44);
        targetCamLookRef.current = new THREE.Vector3(0, 1, 0);
      }
    }
  }, [selectedStation, cameraMode]);

  // Heatmap Overlay Updates
  useEffect(() => {
    if (!stationMeshesRef.current) return;
    stationMeshesRef.current.forEach((grp) => {
      const st = stations.find(s => s.id === grp.userData.stationId) || grp.userData.stationData;
      if (!grp.userData.ringMesh) return;

      let col = 0x00f0ff;
      if (activeHeatmap === 'bottleneck') {
        if (st.status === 'warning' || st.defectRisk > 50) col = 0xf59e0b;
        else if (st.status === 'critical') col = 0xf43f5e;
        else col = 0x10b981;
      } else if (activeHeatmap === 'sensorCoverage') {
        if (st.sensorTier === 'rich') col = 0x00f0ff;
        else if (st.sensorTier === 'inferred') col = 0xa855f7;
        else col = 0xeab308;
      } else if (activeHeatmap === 'propagation') {
        if (st.id === 'S04') col = 0xf43f5e;
        else if (st.id === 'S05' || st.id === 'S06') col = 0xf59e0b;
        else if (st.id === 'S09') col = 0x3b82f6;
        else col = 0x334155;
      } else {
        col = st.area === 'BODY' ? 0x00f0ff : st.area === 'PAINT' ? 0xa855f7 : st.area === 'ASSEMBLY' ? 0x3b82f6 : 0x10b981;
      }
      grp.userData.ringMesh.material.color.setHex(col);
    });
  }, [activeHeatmap, stations]);

  return (
    <div className="relative w-full h-[560px] bg-dark-950 rounded-2xl overflow-hidden border border-cyber-500/30 shadow-2xl shadow-cyan-950/40">
      <div ref={containerRef} className="w-full h-full" />

      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl glass-panel pointer-events-auto border border-cyan-500/30 shadow-lg">
          <div className="text-[11px] font-mono text-cyan-400/80 uppercase px-2 py-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>3D Layer:</span>
          </div>
          <button
            onClick={() => setActiveHeatmap('default')}
            className={\px-3 py-1.5 rounded-lg text-xs font-medium transition-all \\}
          >
            Digital Factory
          </button>
          <button
            onClick={() => setActiveHeatmap('bottleneck')}
            className={\px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all \\}
          >
            <AlertTriangle className="w-3 h-3" />
            Bottleneck Heatmap
          </button>
          <button
            onClick={() => setActiveHeatmap('sensorCoverage')}
            className={\px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all \\}
          >
            <Cpu className="w-3 h-3" />
            Sensor Coverage (IoT vs Inferred)
          </button>
          <button
            onClick={() => setActiveHeatmap('propagation')}
            className={\px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all \\}
          >
            <Zap className="w-3 h-3" />
            Ripple Flow
          </button>
        </div>

        <div className="flex items-center gap-1 p-1.5 rounded-xl glass-panel pointer-events-auto border border-cyan-500/30">
          <button
            onClick={() => { onSelectStation(null); setCameraMode('overview'); }}
            className={\px-2.5 py-1 rounded-md text-xs font-mono transition-colors \\}
          >
            Line View
          </button>
          <button
            onClick={() => { onSelectStation(null); setCameraMode('bodyShop'); }}
            className="px-2 py-1 rounded-md text-xs font-mono text-cyan-400 hover:bg-cyan-500/10"
          >
            Body
          </button>
          <button
            onClick={() => { onSelectStation(null); setCameraMode('paintShop'); }}
            className="px-2 py-1 rounded-md text-xs font-mono text-purple-400 hover:bg-purple-500/10"
          >
            Paint
          </button>
          <button
            onClick={() => { onSelectStation(null); setCameraMode('finalAssembly'); }}
            className="px-2 py-1 rounded-md text-xs font-mono text-blue-400 hover:bg-blue-500/10"
          >
            Assembly
          </button>
          <button
            onClick={() => { onSelectStation(null); setCameraMode('quality'); }}
            className="px-2 py-1 rounded-md text-xs font-mono text-emerald-400 hover:bg-emerald-500/10"
          >
            QA
          </button>
          <button
            onClick={() => { onSelectStation(null); setCameraMode('orbit'); }}
            className="p-1 text-slate-400 hover:text-cyan-300"
            title="Reset Orbit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hover Floating HUD */}
      {hoveredStation && (
        <div className="absolute bottom-6 left-6 p-4 rounded-xl glass-panel border border-cyan-500/40 max-w-sm pointer-events-none shadow-2xl backdrop-blur-xl animate-in fade-in duration-150">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="font-mono font-bold text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
              {hoveredStation.code}
            </span>
            <span className={\	ext-[11px] font-semibold uppercase px-2 py-0.5 rounded-full \\}>
              {hoveredStation.status === 'warning' ? 'Warning: Bottleneck Risk' :
               hoveredStation.sensorTier === 'inferred' ? 'AI Inferred (Legacy)' : 'Nominal State'}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-white mb-2 leading-tight">
            {hoveredStation.name}
          </h4>

          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono bg-dark-900/80 p-2 rounded-lg border border-slate-800 mb-2">
            <div>
              <span className="text-slate-400 block text-[10px]">CYCLE TIME</span>
              <span className={\ont-bold \\}>
                {hoveredStation.cycleTimeActual}s / {hoveredStation.taktTime}s
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">WIP BUFFER</span>
              <span className="text-slate-200 font-bold">{hoveredStation.wipBuffer}/{hoveredStation.maxBuffer}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">DEFECT RISK</span>
              <span className={\ont-bold \\}>
                {hoveredStation.defectRisk}%
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 italic line-clamp-2">
            "{hoveredStation.aiDiagnosis}"
          </div>

          <div className="mt-2 text-[10px] text-cyan-400 font-mono flex items-center justify-between border-t border-slate-800 pt-1.5">
            <span>Tap to inspect station telemetry</span>
            <span className="text-cyan-300 underline">&rarr;</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 p-2.5 rounded-xl glass-panel border border-cyan-500/20 pointer-events-none flex flex-col gap-1 text-[11px] font-mono text-slate-300">
        <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider mb-0.5">3D Station Status</div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
          <span>Nominal (Within Takt)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400"></span>
          <span>Bottleneck Drift (S04)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400"></span>
          <span>AI Inferred (Sensor-Poor)</span>
        </div>
      </div>
    </div>
  );
}
\;

fs.writeFileSync(path.join(__dirname, 'src', 'components', '3d', 'FactoryScene.jsx'), factorySceneCode, 'utf8');
console.log('FactoryScene.jsx written');
