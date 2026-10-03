# DigitalTwin.ai — 2-3 Minute Hackathon Demo Script

Follow this exact sequence during your live presentation for the Accenture Innovation Challenge.

---

## ⏱️ Step-by-Step Live Demonstration Flow

### STEP 1 | Open Command Center & Show 35-Station Digital Twin (30 Seconds)
* **Action:** Start on the **Command Center** tab.
* **Explain:**
  > *"This is DigitalTwin.ai. An automotive assembly line is a tightly coupled chain of 35 stations across Body Construction, Paint Shop, and Final Assembly. When an upstream machine drifts by just 6 seconds, that delay propagates downstream and starves the line 20 minutes later.*
  > 
  > *In reality, factories are brownfield: modern robotics sit alongside 20-year-old legacy PLCs with partial sensor coverage. DigitalTwin.ai provides the connected intelligence to predict and prevent disruptions before they stop the line."*

---

### STEP 2 | Open Dataset & AI Ingestion Hub (45 Seconds)
* **Action:** Click **"Dataset & AI"** tab.
* **Explain:**
  > *"Our system is a real data-processing engine, not a static mockup. Let's upload a raw production log—or select our built-in 24,570-record dataset."*
* **Action:** Click **"Load & Predict &rarr;"** on `assembly_line_sample.csv`.
* **Explain:**
  > *"Notice how the system auto-detects variables, validates data quality, and displays a 14-step machine learning execution pipeline."*

---

### STEP 3 | Review Prediction Results & Model Trust Center (45 Seconds)
* **Action:** The system navigates to the **"Predictions"** page.
* **Explain:**
  > *"Here are our predictions. The AI identifies **ST14 (E-Coat Dip Immersion)** as a high-risk bottleneck developing in approximately **22 minutes** with **93.2% confidence**.*
  > 
  > *(Click 'WHY THIS PREDICTION?')*
  > *Every prediction is explainable. We see that ST14's risk is driven by an upstream clamping drift at ST11 propagating through ST12 and ST13.*
  > 
  > *(Point to Model Trust Center & Virtual Sensor table)*
  > *Notice our Model Trust Center: for stations without direct vibration sensors like ST04 and ST17, our Bayesian surrogate AI infers internal state with 85%+ confidence, explicitly marked as 'AI-INFERRED' so operators always know data lineage."*

---

### STEP 4 | Return to Digital Twin & Run Signature Predictive Demo (45 Seconds)
* **Action:** Return to **"Command Center"** and click **"Step Next"** on the **Signature Live Predictive Demo** ribbon.
* **Explain:**
  > *"Let's step through the sequence:*
  > - **T+05:** *ST11 develops a subtle 2.4s cycle time lag.*
  > - **T+15:** *Isolation Forest flags the kinematic vibration anomaly.*
  > - **T+22:** *Graph AI predicts line starvation at ST14 in 22 minutes.*
  > - **T+40:** *The supervisor approves buffer pacing rebalancing—preventing line stoppage and saving **\$24,000** in shift losses!"*

---

### STEP 5 | Stakeholders & Business Impact (30 Seconds)
* **Action:** Click **"Business Impact"** tab and adjust the sliders.
* **Explain:**
  > *"For a typical 2-shift automotive line, intercepting downtime waves and containing defect ripples delivers **\$2.45M in annual cost avoidance** with a full payback in just **4.2 months**.*
  > 
  > *DigitalTwin.ai is 100% read-only, non-invasive, and ready for global plant deployment. Thank you!"*
