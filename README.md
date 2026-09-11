# 🌊 3D Ocean Data Visualization Platform

An interactive web-based 3D visualization platform for exploring ocean model outputs and in-situ observations such as **Argo floats and Gliders**.

Developed as a prototype for **Smart India Hackathon 2026**.

---

## 🚀 Overview

Oceanographic datasets contain information across multiple dimensions such as:

* 🌡️ Temperature
* 🧂 Salinity
* 🌊 Ocean depth
* 📍 Latitude & Longitude
* 🛰️ In-situ observations
* 📊 Ocean model outputs
* ⏱️ Time-dependent observations

Traditional 2D maps and desktop-based tools can make it difficult to understand the relationship between these parameters across different depths and time periods.

This project provides a **browser-based interactive 3D environment** where users can explore ocean observations on a virtual Earth and compare observed values with model-generated values.

---

## ✨ Key Features

### 🌍 Interactive 3D Earth

Explore ocean observations on a rotating 3D Earth using Three.js.

### 📏 Depth Exploration

Use the depth slider to explore observations at different ocean depths.

### ⏱️ Time-Based Visualization

Move through different observation dates using the time slider.

### 📡 Sensor Filtering

Filter observations based on their source:

* All Sources
* Argo
* Glider
* Ocean Model

### 📊 Parameter Comparison

Select an observation to view:

* Temperature
* Model Temperature
* Temperature Difference
* Salinity
* Depth
* Latitude
* Longitude
* Data Source

### 📈 Depth Profile

View a temperature-versus-depth profile for the selected observation.

### 🚨 Mission Mode

A prototype decision-support feature that identifies observations showing potentially important anomalies based on temperature, salinity, depth and model-observation differences.

> Mission Mode is a prototype anomaly-prioritization feature and is not intended to provide operational hazard predictions.

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Three.js
* WebGL

### Data Visualization

* Interactive 3D globe
* Observation markers
* Temperature color mapping
* Depth filtering
* Time filtering
* Parameter comparison
* Canvas-based depth profile

### Current Prototype Data

The current MVP uses **sample/demo ocean observations** to demonstrate the visualization workflow.

The model temperature values are simulated for prototype comparison.

---

## 🏗️ System Architecture

```text
                Ocean Data
                    │
                    ▼
        ┌─────────────────────┐
        │ Data Processing     │
        │ & Validation        │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Visualization Layer │
        │      Three.js        │
        └──────────┬──────────┘
                   │
        ┌──────────┼───────────┐
        ▼          ▼           ▼
     Depth       Time       Sensor
     Filter      Filter      Filter
        │          │           │
        └──────────┼───────────┘
                   ▼
        ┌─────────────────────┐
        │ 3D Ocean Interface  │
        └──────────┬──────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
   Parameter Table     Depth Profile
          │
          ▼
     Mission Mode
```

---

## 📂 Project Structure

```text
3d-ocean-data-visualization/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ▶️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/3d-ocean-data-visualization.git
```

### 2. Open the project

```bash
cd 3d-ocean-data-visualization
```

### 3. Run with a local server

The easiest option is **VS Code Live Server**.

Open the project folder in VS Code and launch:

```text
index.html → Open with Live Server
```

The application will open in your browser.

---

## 🌐 Live Demo

The project can be deployed using **GitHub Pages**.

Live Demo:

```text
https://YOUR-USERNAME.github.io/3d-ocean-data-visualization/
```

---

## 🎯 Smart India Hackathon

### Problem Statement

**PS ID:** SIH26067

**Title:**
Develop a web-based interactive 3D visualization platform that integrates numerical ocean model outputs and in-situ observations.

**Theme:** Disaster Management

**Category:** Software

**Team:** Vector Mind

**Team ID:** SNPSU0269

---

## 🔬 Current MVP

The current prototype demonstrates the core visualization workflow:

1. Interactive 3D Earth
2. Ocean observation markers
3. Depth-based exploration
4. Time-based filtering
5. Argo/Glider filtering
6. Observation parameter comparison
7. Temperature-depth profile
8. Model-observation difference
9. Mission Mode anomaly prioritization

The MVP uses sample data to demonstrate the functionality.

---

## 🔮 Future Scope

The prototype can be extended into a production-grade ocean data platform by integrating:

### Real Ocean Data

* NetCDF ocean model outputs
* Argo observations
* Glider observations
* CTD observations
* BGC observations

### Backend

A scalable backend can be introduced for:

* NetCDF processing
* Data preprocessing
* REST APIs
* OPeNDAP access
* Large dataset management

### Advanced Visualization

Future versions can support:

* 3D volumetric rendering
* Isosurfaces
* Vertical ocean sections
* Current-vector visualization
* Multiple ocean variables
* Time-series animation
* Advanced spatial filtering

### Standards & Interoperability

Future integration can follow:

* CF conventions
* OGC standards
* WMS
* WCS

### AI/ML Integration

Future versions could include machine-learning-based:

* Anomaly detection
* Ocean condition classification
* Forecast assistance
* Risk prioritization
* Pattern detection

---

## 🧪 Data Disclaimer

This repository currently contains a **prototype/MVP implementation using sample data**.

The displayed model values and Mission Mode results are intended to demonstrate the platform's visualization and decision-support workflow.

They should **not be interpreted as real-time ocean forecasts, official INCOIS products, or operational disaster predictions**.

---

## 👥 Team

### Vector Mind

Smart India Hackathon 2026

**Problem Statement:** SIH26067

**Theme:** Disaster Management

---

## 📌 Project Goal

The long-term goal is to create a browser-native platform that enables researchers, oceanographers, disaster-management teams and other users to explore complex ocean datasets through an intuitive interactive 3D interface.

> **From complex ocean datasets to an intuitive 3D view of the ocean.** 🌊
