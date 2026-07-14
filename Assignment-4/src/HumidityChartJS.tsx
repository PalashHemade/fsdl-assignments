// Chart.js — Humidity Doughnut Chart (seasonal averages)
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { monthlyData } from "./weatherData";

ChartJS.register(ArcElement, Tooltip, Legend);

// Group into 4 seasons
const seasons = {
  "Winter (Dec-Feb)": [11, 0, 1],
  "Summer (Mar-May)": [2, 3, 4],
  "Monsoon (Jun-Sep)": [5, 6, 7, 8],
  "Post-Monsoon (Oct-Nov)": [9, 10],
};

const avgHumidity = Object.entries(seasons).map(([name, indices]) => {
  const avg = indices.reduce((sum, i) => sum + monthlyData[i].humidity, 0) / indices.length;
  return { name, avg: Math.round(avg) };
});

const doughnutData = {
  labels: avgHumidity.map(s => s.name),
  datasets: [{
    label: "Avg Humidity (%)",
    data: avgHumidity.map(s => s.avg),
    backgroundColor: [
      "rgba(129,140,248,0.8)",
      "rgba(52,211,153,0.8)",
      "rgba(251,191,36,0.8)",
      "rgba(249,115,22,0.8)",
    ],
    borderColor: "#0f172a",
    borderWidth: 3,
    hoverOffset: 8,
  }],
};

const options = {
  responsive: true,
  cutout: "65%",
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: { color: "#94a3b8", font: { size: 12 }, padding: 16 },
    },
    tooltip: {
      backgroundColor: "#1e293b",
      titleColor: "#f1f5f9",
      bodyColor: "#94a3b8",
      callbacks: {
        label: (ctx: any) => ` ${ctx.raw}% average humidity`,
      },
    },
  },
};

const HumidityChartJS: React.FC = () => (
  <div className="chart-card">
    <div className="card-header">
      <span className="badge chartjs">Chart.js</span>
      <h3>💧 Seasonal Humidity</h3>
    </div>
    <p className="card-sub">Average humidity % grouped by season</p>
    <div style={{ maxWidth: 320, margin: "0 auto" }}>
      <Doughnut data={doughnutData} options={options} />
    </div>
  </div>
);

export default HumidityChartJS;
