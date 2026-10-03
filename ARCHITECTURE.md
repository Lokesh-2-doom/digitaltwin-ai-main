# DigitalTwin.ai — System Architecture & OT Governance

This document outlines the end-to-end technical architecture, non-invasive OT data ingestion layers, cyber-physical safety mechanisms, and multi-plant scaling topology for **DigitalTwin.ai**.

---

## 🏗️ 7-Stage Architectural Pipeline

```
[ LAYER 1: DATA SOURCES ]
  - Modern Robotics (KUKA, Fanuc)
  - Legacy PLCs (Siemens S7-300, Rockwell ControlLogix)
  - Optical Laser Gap & Flush Scanners
  - High-Torque Multi-Spindles
  - MES Dispatch & Defect Logs
          ↓ (Read-Only Network Diode / OPC-UA / MQTT)
[ LAYER 2: INGESTION GATEWAY ]
  - Passive Edge Network Taps (10,000 Hz Buffer)
  - Batch CSV / XLSX Ingestion Engine
  - Local Storage & IndexedDB Cache
          ↓
[ LAYER 3: PREPROCESSING & FEATURE ENGINEERING ]
  - Fuzzy Column Matching & Normalization
  - Rolling Window Mean & Standard Deviation
  - Kinematic Vibration & Thermal Load Indices
  - Data Quality Assessment & Validation Report
          ↓
[ LAYER 4: 35-STATION DIGITAL TWIN STATE ]
  - Directed Acyclic Topology Graph (Nodes: ST01-ST35, Edges: Conveyor Buffers)
  - Synchronized WebGL 3D Visualization (Three.js)
  - Sensor Source Attribution (● Measured vs ◆ Inferred vs ○ Unavailable)
          ↓
[ LAYER 5: AI & PREDICTION ENGINE ]
  - Isolation Forest Anomaly Detection (sklearn)
  - Bayesian Spatial Surrogate Regression (Missing Sensor Imputation)
  - Graph Bottleneck Propagation Engine (NetworkX)
  - Supervised Defect Classifier (Random Forest / Gradient Boosting)
          ↓
[ LAYER 6: EXPLAINABLE INSIGHTS & ALERTS ]
  - 20–25 Minute Advance Warning Lead Time
  - Feature Attribution ("WHY THIS PREDICTION?")
  - Dual Bayesian Confidence Gating (>92% Threshold)
          ↓
[ LAYER 7: HUMAN-IN-THE-LOOP ACTION ]
  - Decision-Support Cockpits (Supervisor, Manager, Executive)
  - Workflows: [ ACKNOWLEDGE ] [ DISPATCH TO TEAM ] [ SCHEDULE PM ]
  - Continuous Closed-Loop Model Calibration
```

---

## 🔒 Industrial OT Cybersecurity & Safety Rules

1. **Strictly Read-Only Passive Architecture**:
   - DigitalTwin.ai connects via read-only edge network taps and software gateway brokers.
   - The platform **NEVER** writes directly to safety PLCs, modifies ladder logic, or actuates machinery autonomously.

2. **IEC 62443 Industrial Security Compliance**:
   - Zone and conduit segmentation between Level 2 (Control Network) and Level 3 (Manufacturing Operations).
   - Zero open inbound ports on the plant edge; encrypted outbound telemetry over TLS 1.3.

3. **Dual Bayesian Confidence Gating (Zero Alarm Fatigue)**:
   - Alerts are suppressed unless model confidence exceeds 92% and predicted downstream line starvation likelihood exceeds 85%.

---

## 📈 Scalability Topology: Line &rarr; Plant &rarr; Multi-Plant Fleet

The assembly line is modeled as a configurable directed graph where stations are abstract nodes and buffers are directional edges. Expanding from 1 line to a multi-plant fleet of 10+ sites requires zero algorithmic refactoring:
- Graph topology JSON definitions configure station counts and takt speeds.
- Federated transfer learning shares covariance anomaly baselines across identical equipment models globally.
