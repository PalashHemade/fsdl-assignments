// D3.js — Temperature Bar Chart (monthly)
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { monthlyData } from "./weatherData";

const TempD3Chart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 30, right: 20, bottom: 40, left: 45 };
    const width  = 560 - margin.left - margin.right;
    const height = 300 - margin.top  - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width",  width  + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
      .domain(monthlyData.map(d => d.month))
      .range([0, width])
      .padding(0.3);

    // Y scale
    const y = d3.scaleLinear()
      .domain([-2, 30])
      .range([height, 0]);

    // Color scale (blue→orange based on temp)
    const colorScale = d3.scaleLinear<string>()
      .domain([-2, 14, 26])
      .range(["#60a5fa", "#facc15", "#f97316"]);

    // Grid lines
    svg.append("g")
      .call(d3.axisLeft(y).ticks(6).tickSize(-width).tickFormat(d => `${d}°`))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "rgba(148,163,184,0.15)"))
      .call(g => g.selectAll(".tick text").attr("fill", "#94a3b8").attr("font-size", 11));

    // X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select(".domain").attr("stroke", "rgba(148,163,184,0.2)"))
      .call(g => g.selectAll(".tick text").attr("fill", "#94a3b8").attr("font-size", 11));

    // Zero line
    svg.append("line")
      .attr("x1", 0).attr("x2", width)
      .attr("y1", y(0)).attr("y2", y(0))
      .attr("stroke", "rgba(148,163,184,0.4)")
      .attr("stroke-dasharray", "4 3");

    // Tooltip
    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("background", "#1e293b")
      .style("color", "#f1f5f9")
      .style("padding", "6px 12px")
      .style("border-radius", "8px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("border", "1px solid rgba(148,163,184,0.2)");

    // Bars
    svg.selectAll("rect")
      .data(monthlyData)
      .join("rect")
      .attr("x",      d => x(d.month)!)
      .attr("y",      d => d.temperature >= 0 ? y(d.temperature) : y(0))
      .attr("width",  x.bandwidth())
      .attr("height", d => Math.abs(y(d.temperature) - y(0)))
      .attr("fill",   d => colorScale(d.temperature))
      .attr("rx", 4)
      .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1)
          .html(`<strong>${d.month}</strong>: ${d.temperature}°C`)
          .style("left", event.pageX + 10 + "px")
          .style("top",  event.pageY - 28 + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));

    return () => { tooltip.remove(); };
  }, []);

  return (
    <div className="chart-card">
      <div className="card-header">
        <span className="badge d3">D3.js</span>
        <h3>🌡️ Monthly Temperature</h3>
      </div>
      <p className="card-sub">Average temperature per month (°C) — Mumbai 2024</p>
      <div style={{ overflowX: "auto" }}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
};

export default TempD3Chart;
