// Recharts — Wind Speed Line Chart (monthly)
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { monthlyData } from "./weatherData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1e293b",
        border: "1px solid rgba(148,163,184,0.2)",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        color: "#f1f5f9",
      }}>
        <strong>{label}</strong>
        <p style={{ color: "#34d399", margin: "4px 0 0" }}>
          💨 {payload[0].value} km/h
        </p>
      </div>
    );
  }
  return null;
};

const WindRechartsChart: React.FC = () => (
  <div className="chart-card">
    <div className="card-header">
      <span className="badge recharts">Recharts</span>
      <h3>🌬️ Monthly Wind Speed</h3>
    </div>
    <p className="card-sub">Average wind speed per month (km/h) — Mumbai 2024</p>
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="rgba(148,163,184,0.1)" strokeDasharray="4 4" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[14, 25]}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={19}
          stroke="rgba(251,191,36,0.5)"
          strokeDasharray="5 3"
          label={{ value: "Annual avg 19 km/h", fill: "#fbbf24", fontSize: 10, position: "insideTopRight" }}
        />
        <Line
          type="monotone"
          dataKey="windSpeed"
          stroke="#34d399"
          strokeWidth={3}
          dot={{ fill: "#34d399", r: 5, strokeWidth: 0 }}
          activeDot={{ r: 7, fill: "#f1f5f9" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WindRechartsChart;
