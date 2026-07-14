// FusionCharts — Precipitation Column Chart
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import { monthlyData } from "./weatherData";

const ReactFusioncharts = ReactFC as any;
Charts(FusionCharts);

const PrecipFusionChart: React.FC = () => {
  const dataSource = {
    chart: {
      caption: "Monthly Precipitation",
      subcaption: "Rainfall in mm — Mumbai 2024",
      xaxisname: "Month",
      yaxisname: "Precipitation (mm)",
      numbersuffix: " mm",
      showvalues: "1",
      theme: "fusion",
      bgColor: "#0f172a",
      canvasBgColor: "#1e293b",
      baseFontColor: "#94a3b8",
      captionFontColor: "#f1f5f9",
      subcaptionFontColor: "#64748b",
      divLineColor: "#334155",
      plotFillColor: "#38bdf8",
      plotHighlightEffect: "fadeout",
      showPlotBorder: "0",
      valueFontColor: "#f1f5f9",
      borderColor: "#0f172a",
    },
    data: monthlyData.map(d => ({
      label: d.month,
      value: String(d.precipitation),
    })),
  };

  return (
    <div className="chart-card">
      <div className="card-header">
        <span className="badge fusion">FusionCharts</span>
        <h3>🌧️ Monthly Precipitation</h3>
      </div>
      <p className="card-sub">How much rain fell each month (mm)</p>
      <ReactFusioncharts
        type="column2d"
        width="100%"
        height="300"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </div>
  );
};

export default PrecipFusionChart;
