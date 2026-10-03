"""
Generate 3 realistic automotive assembly line production datasets for DigitalTwin.ai.
1. sample_data/assembly_line_sample.csv (24,582 records across 35 stations, 24 hours, realistic sensor signals)
2. sample_data/assembly_line_with_defects.csv (includes quality inspection labels for supervised training)
3. sample_data/assembly_line_missing_sensors.csv (realistic brownfield line with legacy stations and sensor gaps)
"""

import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def generate_datasets():
    os.makedirs('sample_data', exist_ok=True)
    os.makedirs('public/sample_data', exist_ok=True)

    # 35 Stations across 3 Shops
    stations = []
    # Body Shop (ST01 - ST12)
    body_names = [
        "Floor Pan Clamping", "Underbody Robot Weld A", "Underbody Robot Weld B",
        "Front Structure Geometry", "Side Panel Left Framing", "Side Panel Right Framing",
        "Roof Rail Spot Welding", "Door Arch Seam Welding", "Hood & Decklid Hanging",
        "Fender Laser Brazing", "Body Shell Dimension Verification", "Body-in-White Buffer Transfer"
    ]
    for i, name in enumerate(body_names, start=1):
        st_id = f"ST{i:02d}"
        stations.append({"id": st_id, "name": name, "area": "BODY", "takt": 60.0, "legacy": i in [4, 8]})

    # Paint Shop (ST13 - ST20)
    paint_names = [
        "Phosphate Pre-Treatment", "E-Coat Dip Immersion", "Sealer & Sound Damping Bead",
        "Primer Surfacer Automated Spray", "Basecoat Metallic Color Booth", "Clearcoat High-Gloss Booth",
        "Infrared Curing Oven", "Paint Finish Optical Inspection"
    ]
    for i, name in enumerate(paint_names, start=13):
        st_id = f"ST{i:02d}"
        stations.append({"id": st_id, "name": name, "area": "PAINT", "takt": 60.0, "legacy": i in [14, 17]})

    # Final Assembly (ST21 - ST35)
    assembly_names = [
        "Cockpit & IP Carrier Decking", "Wire Harness Routing & Clip In", "Brake & Fuel Line Plumbing",
        "Front Strut & Subframe Fastening", "Engine & Powertrain Marriage", "Rear Axle & Differential Mount",
        "Exhaust System Robotic Installation", "Fuel Tank & Battery Module Assembly", "Windshield & Rear Glass Robot Urethane",
        "Seat Installation & Torquing", "Door Re-Hanging & Weatherstrip", "Fluid Fill (Brake, Coolant, AC)",
        "Wheel Mount & Lug Nut Multi-Spindle", "End-of-Line Electrical Flash & Diagnostic", "Dynamic Roll-Road & Water Ingress Test"
    ]
    for i, name in enumerate(assembly_names, start=21):
        st_id = f"ST{i:02d}"
        stations.append({"id": st_id, "name": name, "area": "ASSEMBLY", "takt": 60.0, "legacy": i in [22, 28, 32]})

    start_time = datetime(2026, 8, 29, 6, 0, 0)
    num_cycles = 702  # 702 cycles * 35 stations = ~24,570 rows (approx 24 hours of production)
    
    rows_standard = []
    rows_defects = []
    rows_missing = []

    np.random.seed(42)

    for cycle in range(num_cycles):
        timestamp = start_time + timedelta(seconds=cycle * 60)
        time_str = timestamp.strftime("%Y-%m-%d %H:%M:%S")
        vin_id = f"VIN-2026-{100000 + cycle}"

        # Propagate simulated perturbation starting around cycle 450 at ST11
        st11_anomaly_intensity = 0.0
        if 420 <= cycle <= 580:
            st11_anomaly_intensity = np.sin((cycle - 420) / 160 * np.pi) * 1.5

        for idx, st in enumerate(stations):
            st_id = st["id"]
            base_takt = st["takt"]
            is_legacy = st["legacy"]

            # Base sensor variations
            cycle_time = np.random.normal(base_takt - 2.0, 1.2)
            wip = int(np.clip(np.random.normal(2.5, 0.8), 0, 6))
            temperature = np.random.normal(42.0, 2.5) if st["area"] != "PAINT" else np.random.normal(68.0, 4.0)
            vibration = np.random.normal(0.24, 0.04)
            torque = np.random.normal(45.0, 1.8) if "Mount" in st["name"] or "Torquing" in st["name"] or "Marriage" in st["name"] else np.random.normal(32.0, 1.2)
            throughput = int(np.random.choice([1, 1, 1, 1, 0], p=[0.94, 0.03, 0.01, 0.01, 0.01]))
            operator_id = f"OP-{((idx + cycle) % 18) + 1:02d}"

            # Anomaly injection at ST11 and downstream propagation to ST12, ST13, ST14
            if st_id == "ST11" and st11_anomaly_intensity > 0:
                cycle_time += 6.5 * st11_anomaly_intensity
                wip = int(np.clip(wip + 3 * st11_anomaly_intensity, 1, 6))
                vibration += 0.18 * st11_anomaly_intensity
                temperature += 8.2 * st11_anomaly_intensity
            elif st_id == "ST12" and st11_anomaly_intensity > 0.3:
                # Downstream starts receiving bursty parts / starvation
                wip = int(np.clip(wip + 2 * st11_anomaly_intensity, 0, 6))
                cycle_time += 3.2 * st11_anomaly_intensity
            elif st_id == "ST13" and st11_anomaly_intensity > 0.5:
                cycle_time += 2.8 * st11_anomaly_intensity
                wip = int(np.clip(wip + 2 * st11_anomaly_intensity, 0, 6))
            elif st_id == "ST14" and st11_anomaly_intensity > 0.7:
                # Bottleneck emerges at ST14 due to upstream wave
                cycle_time += 5.8 * st11_anomaly_intensity
                wip = int(np.clip(wip + 3 * st11_anomaly_intensity, 1, 6))
                temperature += 6.4 * st11_anomaly_intensity

            # Quality metrics
            quality_score = np.clip(100.0 - (cycle_time - base_takt) * 1.5 - (vibration - 0.24) * 35.0 + np.random.normal(0, 1.5), 60.0, 100.0)
            is_defect = 1 if (quality_score < 82.0 or (st11_anomaly_intensity > 0.8 and st_id in ["ST11", "ST14", "ST34"])) else 0

            # 1. Standard Dataset
            row_std = {
                "timestamp": time_str,
                "station_id": st_id,
                "station_name": st["name"],
                "shop_area": st["area"],
                "vin": vin_id,
                "cycle_time": round(float(cycle_time), 2),
                "wip": int(wip),
                "throughput": int(throughput),
                "temperature": round(float(temperature), 1),
                "vibration": round(float(vibration), 3),
                "torque": round(float(torque), 1),
                "quality_score": round(float(quality_score), 1),
                "operator_id": operator_id
            }
            rows_standard.append(row_std)

            # 2. Defect Labeled Dataset
            row_def = dict(row_std)
            row_def["defect_label"] = int(is_defect)
            row_def["defect_type"] = "Dimensional_Variance" if (is_defect and st["area"] == "BODY") else ("Paint_Blister" if (is_defect and st["area"] == "PAINT") else ("Torque_Deviation" if is_defect else "None"))
            rows_defects.append(row_def)

            # 3. Missing Sensor Dataset (Legacy stations have missing vibration / temperature / torque)
            row_mis = dict(row_std)
            if is_legacy:
                if st_id in ["ST04", "ST22"]:
                    row_mis["vibration"] = np.nan
                if st_id in ["ST08", "ST28"]:
                    row_mis["temperature"] = np.nan
                if st_id in ["ST14", "ST32"]:
                    row_mis["torque"] = np.nan
                    row_mis["vibration"] = np.nan
            rows_missing.append(row_mis)

    df_std = pd.DataFrame(rows_standard)
    df_def = pd.DataFrame(rows_defects)
    df_mis = pd.DataFrame(rows_missing)

    df_std.to_csv("sample_data/assembly_line_sample.csv", index=False)
    df_def.to_csv("sample_data/assembly_line_with_defects.csv", index=False)
    df_mis.to_csv("sample_data/assembly_line_missing_sensors.csv", index=False)

    df_std.to_csv("public/sample_data/assembly_line_sample.csv", index=False)
    df_def.to_csv("public/sample_data/assembly_line_with_defects.csv", index=False)
    df_mis.to_csv("public/sample_data/assembly_line_missing_sensors.csv", index=False)

    print(f"Generated sample datasets successfully!")
    print(f"- assembly_line_sample.csv: {len(df_std)} rows across {len(stations)} stations")
    print(f"- assembly_line_with_defects.csv: {len(df_def)} rows (Defects: {df_def['defect_label'].sum()})")
    print(f"- assembly_line_missing_sensors.csv: {len(df_mis)} rows (Missing values handled)")

if __name__ == "__main__":
    generate_datasets()
