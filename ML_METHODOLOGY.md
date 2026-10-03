# DigitalTwin.ai — Machine Learning Methodology & Mathematical Formulation

This document describes the algorithms, statistical process control mechanisms, surrogate state inference, and graph propagation models powering **DigitalTwin.ai**.

---

## 1. Unsupervised Anomaly Detection: Isolation Forest

To detect multivariate kinematic and cycle-time degradation without requiring labeled historical failure data, we implement an **Isolation Forest** ensemble:

$$\text{AnomalyScore}(x) = 2^{-\frac{E(h(x))}{c(n)}}$$

Where:
- $h(x)$ is the path length of observation $x$ in an isolation tree.
- $E(h(x))$ is the average path length across 100 randomized trees.
- $c(n) = 2\ln(n - 1) + 0.5772156649 - \frac{2(n - 1)}{n}$ is the average path length of unsuccessful searches in binary search trees.

Scores are normalized between $0$ and $100$:
- **0–30**: HEALTHY (Nominal operations)
- **30–60**: WATCH (Slight variance)
- **60–80**: WARNING (Statistically significant drift)
- **80–100**: CRITICAL (Immediate anomaly detection)

---

## 2. Virtual Sensor Surrogate Inference: Spatial K-Nearest Regressor

For brownfield legacy stations lacking direct vibration or thermal sensors, we employ a spatial-temporal surrogate model:

$$\hat{y}_{\text{inferred}} = \sum_{i=1}^{k} w_i \cdot y_i$$

Where weights $w_i = \frac{1 / d(x, x_i)}{\sum_j 1 / d(x, x_j)}$ are derived from physical line distance, upstream arrival timestamps, and downstream buffer deltas.

Confidence score $\mathcal{C}$ is calculated from feature covariance:
$$\mathcal{C} = \left( 1 - \frac{\sigma_{\text{residual}}}{\sigma_{\text{baseline}}} \right) \times 100\%$$

---

## 3. Graph Bottleneck Propagation & Time-to-Bottleneck Forecasting

The 35-station line is modeled as a Directed Acyclic Graph $G = (V, E)$, where $V = \{ST01, \dots, ST35\}$ and $E$ represents conveyor buffer linkages.

For each station $v \in V$:
$$\text{BottleneckRisk}(v) = 0.45 \cdot \mathcal{R}_{\text{CT}}(v) + 0.25 \cdot \mathcal{R}_{\text{WIP}}(v) + 0.15 \cdot \mathcal{R}_{\text{Vib}}(v) + 0.05 \cdot \mathcal{R}_{\text{Temp}}(v) + 0.10 \cdot \text{AnomalyScore}(v) + 0.18 \cdot \mathcal{R}_{\text{CT}}(\text{upstream}(v))$$

### Time-to-Bottleneck Estimation:
$$\Delta t_{\text{est}} = \frac{\text{Threshold}_{\text{crit}} (85\%) - \text{BottleneckRisk}(v)}{\frac{d}{dt} \text{BottleneckRisk}(v)}$$

---

## 4. Supervised Quality Classifier (When Labeled)

When production datasets contain inspection defect flags (`defect_label`), the pipeline trains a **Random Forest Classifier** with an 80/20 train-test split, outputting evaluated Accuracy, Precision, Recall, F1, and ROC-AUC metrics.
