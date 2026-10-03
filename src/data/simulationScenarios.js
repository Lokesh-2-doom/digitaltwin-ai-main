export const SIMULATION_SCENARIOS = [
  {
    id: 'bottleneck_propagation',
    title: 'Scenario 1: Predictive Bottleneck Ripple (23-Min Advance Warning)',
    subtitle: 'Demonstrates multi-station ripple effect & how early AI detection prevents line starvation',
    category: 'Throughput & Bottleneck',
    badge: 'High Impact',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    stationId: 'S04',
    stationName: 'Station B-04 (Body Structure Geometric Clamping)',
    problemSummary: 'A 6.4-second cycle time creep at Station B-04 causes WIP backlog upstream (5 units) and will starve Paint Shop S05 and Final Assembly in 23 minutes.',
    traditionalOutcome: 'Without connected intelligence, plant supervisors notice only after S05 runs out of bodies. Downstream workers sit idle for 34 minutes, causing ,500 in lost production capacity.',
    aiPrescription: '1) Rebalance clamp dwell timer on secondary actuator (-4.2s), 2) Divert 2 buffer units from Paint queue P-01, 3) Auto-schedule lubrication during next shift break.',
    impactMetrics: {
      leadTimeSaved: '23 minutes ahead of line starvation',
      throughputPreserved: '98.4% nominal rate',
      costAvoidanceUSD: ',500 downtime loss eliminated'
    },
    ripplePath: ['S04', 'S05', 'S06', 'S09'],
    propagationTimeline: [
      { minute: 0, event: 'Servo bearing friction increases clamp cycle by +6.4s at S04.' },
      { minute: 8, event: 'Upstream S03 buffer reaches maximum (5/6 vehicles).' },
      { minute: 15, event: 'Downstream Paint S05 buffer drops from 4 to 1 unit.' },
      { minute: 23, event: 'Paint S05 completely starved; Final Assembly line forced to pause without AI intervention.' }
    ]
  },
  {
    id: 'sensor_poor_inference',
    title: 'Scenario 2: Sensor-Gap AI Inference (Legacy & Manual Stations)',
    subtitle: 'Resolves uneven sensor coverage across legacy PLCs without risky live retrofits',
    category: 'AI Inference',
    badge: 'Zero Hardware Retrofit',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    stationId: 'S11',
    stationName: 'Station A-03 (Manual Cockpit & Wire Harness Install)',
    problemSummary: 'Station A-03 is a 100% manual assembly station without expensive IoT strain transducers or cycle timers. Traditional systems treat this as a complete blind spot.',
    traditionalOutcome: 'Operator fatigue or connector mis-seating goes unnoticed until electrical flash-test at End-of-Line QA (S16), requiring entire dashboard disassembly rework (,850/vehicle).',
    aiPrescription: 'Surrogate Bayesian ML model correlates upstream parts kitting scan times with downstream S14 electrical probe continuity to reconstruct real-time harness seating force with 94.8% accuracy.',
    impactMetrics: {
      sensorCoverageGain: '+100% visibility on legacy/manual station',
      retrofitCostSaved: ',000 per station hardware avoidance',
      inferenceConfidence: '94.8% Bayesian state confidence'
    },
    ripplePath: ['S10', 'S11', 'S14', 'S16'],
    propagationTimeline: [
      { minute: 0, event: 'Shift handover causes 1.8s operator pacing variation at manual S11.' },
      { minute: 5, event: 'AI virtual sensor infers slight connector insertion resistance drift from downstream telemetry.' },
      { minute: 10, event: 'System suggests digital pick-to-light torque assist verify without stopping conveyor.' },
      { minute: 15, event: '100% of wire harness clips validated; zero rework units reach QA inspection.' }
    ]
  },
  {
    id: 'quality_defect_prevention',
    title: 'Scenario 3: Silent Quality Drift & Defect Interception',
    subtitle: 'Catches multi-station defect propagation before dozens of vehicles are contaminated',
    category: 'Quality & Defect Prevention',
    badge: 'Multi-Vehicle Intercept',
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    stationId: 'S07',
    stationName: 'Station P-03 (Basecoat & Clearcoat Electrostatic Spray)',
    problemSummary: 'Electrostatic spray bell nozzle pressure drops 3.2% due to micro-cavitating fluid valve. The defect is invisible to standard cameras until cure oven (S08).',
    traditionalOutcome: '18 consecutive car bodies pass through the spray booth with sub-optimal atomization before physical inspection catches orange-peel defect. All 18 require full clearcoat sanding and respray (,000 cost).',
    aiPrescription: 'AI detects turbine RPM / electrostatic KV micro-variance in real-time, adjusts fluid valve flow rate dynamically, and flags inspection tunnel S08 to perform focused specular laser verification.',
    impactMetrics: {
      defectEscapeRate: '0 vehicles escaped (vs 18 unassisted)',
      reworkCostEliminated: ',000 saved per incident',
      containmentSpeed: 'Instantaneous closed-loop valve tuning'
    },
    ripplePath: ['S07', 'S08', 'S12', 'S16'],
    propagationTimeline: [
      { minute: 0, event: 'Spray bell atomizer pressure drops 3.2% below optimal threshold.' },
      { minute: 3, event: 'Digital Twin flags clearcoat thickness drift prediction on vehicle chassis #4821.' },
      { minute: 6, event: 'Closed-loop AI adjusts electrostatic voltage to compensate atomization.' },
      { minute: 12, event: 'Chassis reaches cure tunnel S08; optical scan confirms perfect 91.4 DOI gloss rating.' }
    ]
  }
];
