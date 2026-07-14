import TempD3Chart from "./TempD3Chart";
import PrecipFusionChart from "./PrecipFusionChart";
import HumidityChartJS from "./HumidityChartJS";
import WindRechartsChart from "./WindRechartsChart";
import "./App.css";

function App() {
  return (
    <div className="page">

      {/* Header */}
      <header className="header">
        <div className="header-title">
          <div>
            <h1>Weather Dashboard</h1>
            <p>Mumbai City — Monthly Climate Data 2024</p>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="summary-row">
        <div className="summary-card">
          <span className="summary-icon">🌡️</span>
          <span className="summary-value">2°C</span>
          <span className="summary-label">Annual Avg Temp</span>
        </div>
        <div className="summary-card">
          <span className="summary-icon">💧</span>
          <span className="summary-value">66%</span>
          <span className="summary-label">Avg Humidity</span>
        </div>
        <div className="summary-card">
          <span className="summary-icon">🌬️</span>
          <span className="summary-value">19 km/h</span>
          <span className="summary-label">Avg Wind Speed</span>
        </div>
        <div className="summary-card">
          <span className="summary-icon">🌧️</span>
          <span className="summary-value">2431mm</span>
          <span className="summary-label">Total Precipitation</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <TempD3Chart />
        <PrecipFusionChart />
        <HumidityChartJS />
        <WindRechartsChart />
      </div>

      {/* Footer */}
      <footer className="footer">
        Built with <strong>D3.js</strong> · <strong>FusionCharts</strong> · <strong>Chart.js</strong> · <strong>Recharts</strong> &nbsp;|&nbsp; Data: NOAA 2024
      </footer>
    </div>
  );
}

export default App;
