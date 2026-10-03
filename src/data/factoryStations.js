export const SHOP_AREAS = {
  BODY: {
    id: 'body',
    name: 'Body Shop (Framing & Welding)',
    color: '#00f0ff',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Robotic structural spot welding, laser brazing, and chassis alignment'
  },
  PAINT: {
    id: 'paint',
    name: 'Paint Shop (E-Coat & Automated Finish)',
    color: '#a855f7',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description: 'Cathodic electrocoating, robotic electrostatic sprayers, and thermal curing'
  },
  ASSEMBLY: {
    id: 'assembly',
    name: 'Final Assembly & Marriage',
    color: '#3b82f6',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    description: 'Powertrain marriage hoist, wire harness install, cockpit, and robotic glazing'
  },
  QUALITY: {
    id: 'quality',
    name: 'End-of-Line QA & Testing',
    color: '#10b981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: '3D optical gap scan, ADAS calibration, dyno roll test, and defect containment'
  }
};

export const INITIAL_STATIONS = [
  // --- BODY SHOP ---
  {
    id: 'S01',
    code: 'B-01',
    name: 'Underbody Floor Pan Framing',
    area: 'BODY',
    type: 'Robotic Welding Cell',
    sensorTier: 'rich', // 'rich' | 'inferred' | 'manual'
    hardware: 'Siemens S7-1500 + Fanuc R-2000iC (2022)',
    sensors: ['Clamp Pressure', 'Laser Proximity', 'Servo Current (A)', 'Axis Vibration'],
    cycleTimeTarget: 58,
    cycleTimeActual: 57.8,
    taktTime: 60,
    wipBuffer: 3,
    maxBuffer: 6,
    temperature: 42.1,
    vibrationRMS: 1.4,
    status: 'normal', // 'normal' | 'warning' | 'critical'
    defectRisk: 1.2,
    healthScore: 98,
    posX: -35,
    metrics: {
      spotWeldsCount: 84,
      clampAccuracyMm: 0.12,
      airPressureBar: 6.2
    },
    aiDiagnosis: 'Optimal kinematic pathing. Weld tip wear within nominal 12% envelope.',
    inferredParameters: null
  },
  {
    id: 'S02',
    code: 'B-02',
    name: 'Side Outer Framing & Geo-Spot Weld',
    area: 'BODY',
    type: 'Multi-Arm Robotic Station',
    sensorTier: 'rich',
    hardware: 'Rockwell GuardLogix + KUKA Quantec (2021)',
    sensors: ['Electrode Force', 'Secondary Weld Current', 'IR Thermal Imaging', 'Optical Seam Tracker'],
    cycleTimeTarget: 59,
    cycleTimeActual: 59.2,
    taktTime: 60,
    wipBuffer: 2,
    maxBuffer: 5,
    temperature: 48.6,
    vibrationRMS: 2.1,
    status: 'normal',
    defectRisk: 2.8,
    healthScore: 95,
    posX: -30,
    metrics: {
      spotWeldsCount: 120,
      weldExpulsionRate: '0.4%',
      tipResistanceMilliOhm: 14.8
    },
    aiDiagnosis: 'Electrode force stable. Slight thermal accumulation on Arm #3, within threshold.',
    inferredParameters: null
  },
  {
    id: 'S03',
    code: 'B-03',
    name: 'Roof Header Laser Brazing',
    area: 'BODY',
    type: 'High-Precision Laser Cell',
    sensorTier: 'rich',
    hardware: 'IPG Photonics Fiber Laser + ABB IRB 6700',
    sensors: ['Laser Focal Depth', 'Shielding Gas Flow', 'High-Speed Pyrometer', 'Acoustic Emission'],
    cycleTimeTarget: 55,
    cycleTimeActual: 55.4,
    taktTime: 60,
    wipBuffer: 4,
    maxBuffer: 6,
    temperature: 52.3,
    vibrationRMS: 0.8,
    status: 'normal',
    defectRisk: 3.1,
    healthScore: 96,
    posX: -25,
    metrics: {
      laserPowerKw: 4.2,
      wireFeedRateMpm: 3.8,
      seamGapMm: 0.22
    },
    aiDiagnosis: 'Braze pool geometry uniform. Zero porosity anomalies detected.',
    inferredParameters: null
  },
  {
    id: 'S04',
    code: 'B-04',
    name: 'Body Structure Geometric Clamping & QA',
    area: 'BODY',
    type: 'Servo Clamping & CMM Inspection',
    sensorTier: 'rich',
    hardware: 'Legacy Fanuc M-900iB + Cognex 3D Profiler',
    sensors: ['Torque Transducer', 'Encoder Feedback', 'Linear Displacement', 'CMM Point Cloud'],
    cycleTimeTarget: 60,
    cycleTimeActual: 66.4, // DRIFTING!
    taktTime: 60,
    wipBuffer: 5, // Accumulating!
    maxBuffer: 6,
    temperature: 63.8, // High!
    vibrationRMS: 4.8, // Elevated!
    status: 'warning',
    defectRisk: 64.2, // Early warning
    healthScore: 71,
    posX: -20,
    metrics: {
      clampingTorqueNm: 142.6, // Nominal: 120Nm
      gapDeviationMm: '+0.84mm',
      wipBacklogCount: 5
    },
    aiDiagnosis: 'PREDICTIVE BOTTLENECK: Clamping actuator servo bearing friction increasing. Cycle time +6.4s drift will starve Paint Shop S05 in 23 minutes.',
    recommendation: 'Auto-adjust secondary clamping torque envelope (+15ms ramp); dispatch technician to lube bearing during next 8-min line break.',
    inferredParameters: null
  },

  // --- PAINT SHOP ---
  {
    id: 'S05',
    code: 'P-01',
    name: 'Cathodic E-Coat Pretreatment Dip',
    area: 'PAINT',
    type: 'Submersion & Anode Bath',
    sensorTier: 'rich',
    hardware: 'Schneider Electric Modicon M580 (2019)',
    sensors: ['Bath Conductivity', 'pH Levels', 'Ultrafiltration Flow', 'Immersion Angle Sensor'],
    cycleTimeTarget: 60,
    cycleTimeActual: 60.1,
    taktTime: 60,
    wipBuffer: 1, // Starving soon due to S04!
    maxBuffer: 5,
    temperature: 34.0,
    vibrationRMS: 0.6,
    status: 'normal',
    defectRisk: 4.5,
    healthScore: 92,
    posX: -15,
    metrics: {
      bathPhLevel: 5.92,
      filmThicknessMicrons: 22.4,
      anodeCurrentDensity: '1.8 A/dm²'
    },
    aiDiagnosis: 'Bath chemistry optimal. Inflow buffer low (1 unit remaining) due to upstream S04 cycle latency.',
    inferredParameters: null
  },
  {
    id: 'S06',
    code: 'P-02',
    name: 'Underbody Sealer & Dampening Mastic',
    area: 'PAINT',
    type: 'Robotic Extrusion System',
    sensorTier: 'inferred', // Sensor-poor station!
    hardware: 'Legacy PLC-5 Retrofit via Digital Twin Tap (1998 vintage)',
    sensors: ['Upstream Optical Ingest Trigger', 'Downstream Conveyor Resolver'], // Minimal sensors
    cycleTimeTarget: 57,
    cycleTimeActual: 57.6,
    taktTime: 60,
    wipBuffer: 2,
    maxBuffer: 4,
    temperature: 28.5,
    vibrationRMS: 1.1,
    status: 'inferred',
    defectRisk: 8.2,
    healthScore: 89,
    posX: -10,
    metrics: {
      inferredBeadVolumeCc: '142cc ±3%',
      inferredMasticPressure: '16.4 bar [Derived]',
      aiConfidence: '96.2%'
    },
    aiDiagnosis: 'AI INFERENCE ACTIVE: Missing pressure telemetry successfully inferred from upstream bath weight delta and downstream nozzle pulse frequency.',
    inferredParameters: {
      source: 'Cross-station Bayesian state filter',
      estimatedParameters: ['Mastic Viscosity', 'Bead Uniformity', 'Nozzle Flow Rate'],
      confidence: 96.2
    }
  },
  {
    id: 'S07',
    code: 'P-03',
    name: 'Basecoat & Clearcoat Electrostatic Spray',
    area: 'PAINT',
    type: 'High-Speed Bell Atomizer Booth',
    sensorTier: 'rich',
    hardware: 'Dürr EcoBell3 + Siemens S7-1500',
    sensors: ['Bell Turbine Speed (RPM)', 'Electrostatic KV', 'Atomizing Air Flow', 'Fluid Regulating Valve'],
    cycleTimeTarget: 58,
    cycleTimeActual: 58.2,
    taktTime: 60,
    wipBuffer: 3,
    maxBuffer: 5,
    temperature: 24.2,
    vibrationRMS: 1.8,
    status: 'normal',
    defectRisk: 5.4,
    healthScore: 94,
    posX: -5,
    metrics: {
      bellSpeedRpm: 48500,
      electrostaticVoltageKv: 70,
      paintFlowCcMin: 320
    },
    aiDiagnosis: 'Atomizer dispersion symmetrical. Micron coat thickness on spec (38.2 µm).',
    inferredParameters: null
  },
  {
    id: 'S08',
    code: 'P-04',
    name: 'Infrared Thermal Cure Oven & Gloss Scan',
    area: 'PAINT',
    type: 'Continuous Convection Oven',
    sensorTier: 'rich',
    hardware: 'Yokogawa Multi-Zone Controller + SICK Optical Glossmeter',
    sensors: ['Zone 1-4 Temp Probes', 'Exhaust Air Velocity', 'Reflective Gloss Angle', 'Body Skin Pyrometer'],
    cycleTimeTarget: 60,
    cycleTimeActual: 59.8,
    taktTime: 60,
    wipBuffer: 4,
    maxBuffer: 6,
    temperature: 165.2,
    vibrationRMS: 0.4,
    status: 'normal',
    defectRisk: 3.8,
    healthScore: 97,
    posX: 0,
    metrics: {
      ovenCureTempC: 165.2,
      specularGloss20Deg: 91.4,
      orangePeelRatingDOI: 88.6
    },
    aiDiagnosis: 'Thermal curve matching polymer cross-link cure window. Zero gloss degradation.',
    inferredParameters: null
  },

  // --- FINAL ASSEMBLY ---
  {
    id: 'S09',
    code: 'A-01',
    name: 'Powertrain & Battery Marriage Hoist',
    area: 'ASSEMBLY',
    type: 'Automated Guided Lifter & Fastener',
    sensorTier: 'rich',
    hardware: 'Bosch Rexroth Tightening System + Beckhoff TwinCAT',
    sensors: ['Synchronous Spindle Torque', 'Angle-of-Turn', 'Hydraulic Lift Pressure', 'Laser Centering'],
    cycleTimeTarget: 58,
    cycleTimeActual: 58.5,
    taktTime: 60,
    wipBuffer: 3,
    maxBuffer: 5,
    temperature: 36.4,
    vibrationRMS: 1.6,
    status: 'normal',
    defectRisk: 2.1,
    healthScore: 97,
    posX: 5,
    metrics: {
      subframeTorqueNm: 180.4,
      boltAngleDeg: 45.2,
      centeringOffsetMm: 0.18
    },
    aiDiagnosis: 'Bolt yield curves nominal. 16/16 subframe bolts torqued to target spec.',
    inferredParameters: null
  },
  {
    id: 'S10',
    code: 'A-02',
    name: 'Chassis Suspension & Axle Torque Cell',
    area: 'ASSEMBLY',
    type: 'Dual-Side Automated Bolting Unit',
    sensorTier: 'rich',
    hardware: 'Atlas Copco Multi-Nutrunner (2023)',
    sensors: ['Dynamic Torque Cell', 'Gradient Yield Sensor', 'Axis Accelerometer', 'Part Seat Optical'],
    cycleTimeTarget: 57,
    cycleTimeActual: 57.1,
    taktTime: 60,
    wipBuffer: 2,
    maxBuffer: 4,
    temperature: 33.1,
    vibrationRMS: 1.3,
    status: 'normal',
    defectRisk: 1.9,
    healthScore: 98,
    posX: 10,
    metrics: {
      strutTorqueNm: 95.2,
      runoutDeviationMm: 0.08,
      fastenerCycleSec: 12.4
    },
    aiDiagnosis: 'Zero stripped threads or torque outliers recorded across last 480 cycles.',
    inferredParameters: null
  },
  {
    id: 'S11',
    code: 'A-03',
    name: 'Cockpit & Main Wire Harness Assembly',
    area: 'ASSEMBLY',
    type: 'Manual Operator Assembly Station',
    sensorTier: 'manual', // Manual checklist station!
    hardware: 'Operator Barcode Terminal + Digital Pick-to-Light (Legacy)',
    sensors: ['Barcode Scan Timestamps', 'Pick-to-Light Bin Triggers'], // NO direct machine sensors
    cycleTimeTarget: 59,
    cycleTimeActual: 61.2,
    taktTime: 60,
    wipBuffer: 3,
    maxBuffer: 5,
    temperature: 22.0,
    vibrationRMS: 0.2,
    status: 'inferred',
    defectRisk: 11.4,
    healthScore: 88,
    posX: 15,
    metrics: {
      harnessPinsVerified: 48,
      inferredConnectorTension: '22N [AI Estimated]',
      taktVarianceDelta: '+1.2s'
    },
    aiDiagnosis: 'AI INFERENCE ACTIVE: Station lacks strain sensors. AI monitors upstream kit delivery cadence and downstream E-test resistance to confirm 100% harness seating.',
    inferredParameters: {
      source: 'Upstream kit time + Downstream continuity probe correlation',
      estimatedParameters: ['Connector Insertion Force', 'Clip Seating Confidence', 'Operator Pacing Drift'],
      confidence: 94.8
    }
  },
  {
    id: 'S12',
    code: 'A-04',
    name: 'Windshield & Panoramic Glass Robotic Glazing',
    area: 'ASSEMBLY',
    type: 'Vision-Guided Robot Cell',
    sensorTier: 'rich',
    hardware: 'ABB IRB 6700 + ISRA Vision Seam Inspector',
    sensors: ['Polyurethane Bead Vision Width', 'Urethane Dispense Pressure', 'Glass Suction Gripper Sensor', 'Ambient RH%'],
    cycleTimeTarget: 56,
    cycleTimeActual: 56.4,
    taktTime: 60,
    wipBuffer: 2,
    maxBuffer: 4,
    temperature: 25.8,
    vibrationRMS: 1.0,
    status: 'normal',
    defectRisk: 2.3,
    healthScore: 96,
    posX: 20,
    metrics: {
      adhesiveWidthMm: 12.1,
      adhesiveHeightMm: 8.4,
      ambientHumidityPct: 48.2
    },
    aiDiagnosis: 'Urethane bead profile continuous with zero gaps or micro-bubbles.',
    inferredParameters: null
  },
  {
    id: 'S13',
    code: 'A-05',
    name: 'Door Hanging & Interior Trim Robotic Seat',
    area: 'ASSEMBLY',
    type: 'Robotic Manipulator Cell',
    sensorTier: 'rich',
    hardware: 'Fanuc M-710iC (2020)',
    sensors: ['Hinge Pin Load Cell', 'Gap & Flush Laser Tracker', 'Screw Feed Optical Counter'],
    cycleTimeTarget: 58,
    cycleTimeActual: 58.7,
    taktTime: 60,
    wipBuffer: 3,
    maxBuffer: 5,
    temperature: 29.4,
    vibrationRMS: 1.2,
    status: 'normal',
    defectRisk: 3.5,
    healthScore: 95,
    posX: 25,
    metrics: {
      doorHingeSagMm: 0.14,
      gapUniformityMm: 3.8,
      clipEngagementAudibleDb: 68
    },
    aiDiagnosis: 'Hinge alignment nominal. Flushness variation < 0.2mm across left/right doors.',
    inferredParameters: null
  },

  // --- QUALITY & TESTING ---
  {
    id: 'S14',
    code: 'Q-01',
    name: 'Dynamic Wheel Alignment & Headlight Aiming',
    area: 'QUALITY',
    type: 'Multi-Laser Non-Contact Test Stand',
    sensorTier: 'rich',
    hardware: 'Beissbarth Touchless Laser + Siemens S7-1500',
    sensors: ['Laser Camber/Toe Sensor', 'Steering Wheel Level Gyro', 'Optical Lux Illuminance Meter'],
    cycleTimeTarget: 55,
    cycleTimeActual: 55.2,
    taktTime: 60,
    wipBuffer: 2,
    maxBuffer: 4,
    temperature: 21.5,
    vibrationRMS: 0.7,
    status: 'normal',
    defectRisk: 1.8,
    healthScore: 99,
    posX: 30,
    metrics: {
      toeAngleMinutes: 4.2,
      camberAngleMinutes: -12.1,
      headlightCutoffDeg: -1.0
    },
    aiDiagnosis: 'Geometry calibration calibrated. 100% compliant with ISO chassis tolerances.',
    inferredParameters: null
  },
  {
    id: 'S15',
    code: 'Q-02',
    name: 'Chassis Dynamometer & ADAS Radar Calibration',
    area: 'QUALITY',
    type: 'Multi-Roller Dyno Test Bay',
    sensorTier: 'rich',
    hardware: 'Maha Dyno Bench + Continental ADAS Target Array',
    sensors: ['Roller Torque Transducer', 'OBD-II CANbus Logger', 'Target Distance Lidar', 'Exhaust Temp Sensor'],
    cycleTimeTarget: 59,
    cycleTimeActual: 59.4,
    taktTime: 60,
    wipBuffer: 2,
    maxBuffer: 4,
    temperature: 28.0,
    vibrationRMS: 2.6,
    status: 'normal',
    defectRisk: 2.9,
    healthScore: 94,
    posX: 35,
    metrics: {
      brakeForceKn: 8.6,
      adasRadarYawOffsetDeg: 0.04,
      evRegenEfficiencyPct: 91.2
    },
    aiDiagnosis: 'Braking balance symmetrical (49.8% L / 50.2% R). ADAS target alignment locked.',
    inferredParameters: null
  },
  {
    id: 'S16',
    code: 'Q-03',
    name: 'Automated 360° Laser Gap & Surface Optical Scanner',
    area: 'QUALITY',
    type: 'End-of-Line Multi-Camera Inspection Tunnel',
    sensorTier: 'rich',
    hardware: 'Zeiss AICell Optical 3D + Deep Learning Vision Server',
    sensors: ['24x 4K Photometric Cameras', 'Blue Laser Line Profilers', 'Deep Neural Surface Classifier'],
    cycleTimeTarget: 52,
    cycleTimeActual: 51.8,
    taktTime: 60,
    wipBuffer: 1,
    maxBuffer: 3,
    temperature: 22.4,
    vibrationRMS: 0.3,
    status: 'normal',
    defectRisk: 0.8,
    healthScore: 99,
    posX: 40,
    metrics: {
      inspectedSurfacesCount: 1420,
      gapFlushStdDevMm: 0.06,
      paintDefectCount: 0
    },
    aiDiagnosis: 'Final EOL verification passed. Vehicle cleared for logistics transit with zero open defects.',
    inferredParameters: null
  }
];

export const PLANT_SUMMARY = {
  overallOEE: 88.4,
  availability: 92.1,
  performance: 97.4,
  qualityRate: 98.7,
  taktTimeSec: 60,
  currentShiftOutput: 342,
  shiftTarget: 380,
  activeAlertsCount: 1,
  inferredStationsCount: 2,
  preventedBottlenecksToday: 8,
  annualSavingsProjectedUSD: 2450000
};
