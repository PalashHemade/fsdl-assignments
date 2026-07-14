# Weather Analytics & Visualization Dashboard

A comparative dashboard demonstrating data visualization of weather variables for Mumbai City. Built with React, TypeScript, and Vite, the project compares four popular charting libraries—D3.js, FusionCharts, Chart.js, and Recharts—side-by-side.

## 📖 Table of Contents
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Libraries Compared](#libraries-compared)
- [Key Features](#key-features)
- [File Structure](#file-structure)
- [How to Run](#how-to-run)

---

## 📝 Description
This application provides monthly climate metrics (Average Temperature, Humidity, Wind Speed, and Precipitation) for Mumbai City in 2024. The main purpose is to showcase how to integrate, configure, and render data using four distinct graphing approaches in a modern React application.

## 💻 Tech Stack
- **React 19**: Frontend UI library.
- **TypeScript**: Static type safety for component structures and weather datasets.
- **Vite**: Ultra-fast build tool and local development server.
- **CSS**: Custom grid system and layouts (`App.css`).

## 📊 Libraries Compared
Each metric uses a different visualization package:
1. **D3.js** (`TempD3Chart.tsx`): Used to render temperature changes. Uses raw SVG manipulation, custom linear/time scales, line generators, and custom axes.
2. **FusionCharts** (`PrecipFusionChart.tsx`): Used to visualize precipitation levels. Configures XML/JSON attributes for automated, interactive column graphs.
3. **Chart.js (via `react-chartjs-2`)** (`HumidityChartJS.tsx`): Used to plot humidity levels. Renders responsive radar/line structures inside HTML5 canvas contexts.
4. **Recharts** (`WindRechartsChart.tsx`): Used to map wind patterns. Displays dynamic area charts with tooltip actions using modular SVG components.

## ⚡ Key Features
- **Parallel Comparisons**: Side-by-side integration of different charting frameworks.
- **Metric Cards**: Header cards showing key values (annual averages, aggregates) with illustrative emojis.
- **Responsive Layout**: Flexbox and CSS Grid adapt the dashboard from desktop down to mobile screens.
- **Clean Typing**: Leverages TypeScript interface definitions for raw historical weather reports.

## 📁 File Structure
```text
Assignment-4/
├── src/
│   ├── assets/              # Static assets
│   ├── App.tsx              # Main layout, metric rows, and grid configuration
│   ├── TempD3Chart.tsx      # D3.js line graph for temperature
│   ├── PrecipFusionChart.tsx# FusionCharts column chart for precipitation
│   ├── HumidityChartJS.tsx  # Chart.js radar/polar graph for humidity
│   ├── WindRechartsChart.tsx# Recharts area graph for wind speed
│   ├── weatherData.ts       # Shared TypeScript mock dataset of climate variables
│   ├── App.css              # Custom styling sheet
│   └── main.tsx             # Application entry point
├── package.json             # Lists dev dependencies and build actions
├── tsconfig.json            # TypeScript build parameters
└── vite.config.ts           # Bundler rules
```

---

## 🚀 How to Run

### 1. Install Dependencies
Open a terminal in the [Assignment-4](file:///d:/Avengers%20Doomsday/FSDL/Assignment-4) folder and install the required Node modules:
```bash
npm install
```

### 2. Start the Development Server
Launch the local dev server:
```bash
npm run dev
```
The console will display the local address (typically `http://localhost:5173`) where the weather dashboard can be viewed.
