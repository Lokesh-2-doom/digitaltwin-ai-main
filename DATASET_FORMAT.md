# DigitalTwin.ai — Ingestion Dataset Schema Specifications

This document outlines the supported CSV/XLSX schemas, automatic variable alias matching, and handling rules for missing variables.

---

## 📋 Standard Variable Aliases

The flexible ingestion layer automatically matches the following column aliases:

| Variable | Recognized Aliases in CSV/XLSX | Example Values |
| :--- | :--- | :--- |
| **Station ID** | `station_id`, `station`, `stn`, `stn_id`, `stationid`, `op_station` | `ST01`, `ST11`, `ST14` |
| **Timestamp** | `timestamp`, `time`, `datetime`, `date_time`, `ts`, `recorded_at` | `2026-08-29 14:32:00` |
| **Cycle Time** | `cycle_time`, `cycletime`, `ct`, `cycle_time_sec`, `takt_actual` | `58.2`, `66.4` |
| **WIP Buffer** | `wip`, `wip_buffer`, `buffer`, `queue_length`, `work_in_progress` | `2`, `5` |
| **Throughput** | `throughput`, `output`, `parts_produced`, `count`, `units` | `1`, `0` |
| **Temperature** | `temperature`, `temp`, `temperature_c`, `station_temp`, `thermal` | `42.5`, `69.8` |
| **Vibration** | `vibration`, `vib`, `vibration_rms`, `accel`, `vibration_g` | `0.24`, `0.38` |
| **Torque** | `torque`, `torque_nm`, `fastener_torque`, `applied_torque` | `45.0`, `110.0` |
| **Quality** | `quality`, `quality_score`, `yield`, `inspection_score` | `98.4`, `88.5` |
| **Defect Label** | `defect_label`, `defect`, `is_defect`, `failure`, `scrap` | `0`, `1` |
| **Operator ID** | `operator_id`, `operator`, `tech`, `technician`, `worker` | `OP-04`, `OP-12` |

---

## 🧩 Schema Flexibility Rules

1. **Missing Variables**:
   - The ingestion pipeline **NEVER fails** if specific columns are missing.
   - If `vibration` or `temperature` are missing, the system activates **Bayesian Surrogate AI** and explicitly marks the signal as `◆ AI-INFERRED`.
   - If a signal cannot be reliably inferred, it is marked as `○ UNAVAILABLE`.

2. **File Formats**:
   - Supports `.csv`, `.xlsx`, and `.xls` up to 100,000 rows.
