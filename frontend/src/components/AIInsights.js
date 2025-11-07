import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/dashboard.css";

export default function AIInsights() {
  const [summary, setSummary] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData([
      { week: "Week 1", tasks: 20, completed: 15 },
      { week: "Week 2", tasks: 25, completed: 18 },
      { week: "Week 3", tasks: 22, completed: 20 },
      { week: "Week 4", tasks: 28, completed: 24 },
    ]);

    setTimeout(() => {
      setSummary(
        "Over the last 24 hours, your team completed 5 tasks with an average closure time of 58.1 hours. " +
          "Task completion velocity has decreased by 17.6%, indicating potential bottlenecks. " +
          "There are 11 blocked tasks requiring attention."
      );
    }, 1200);
  }, []);

  return (
    <div className="insights-container">
      <h2>AI Insights</h2>
      <p className="subtitle">
        AI-powered summary, performance analysis & recommendations
      </p>

      {/* ===== AI Summary ===== */}
      <div className="insight-card summary-card">
        <h3>🧠 AI-Powered Summary</h3>
        <p>{summary || "Generating summary..."}</p>
      </div>

      {/* ===== KPI Metrics Section ===== */}
      <div className="metric-grid">
        <div className="metric-card">
          <h4>Task Closure Performance</h4>
          <p className="metric-main">30.1h</p>
          <span>Previous Avg: 25.6h</span>
        </div>
        <div className="metric-card">
          <h4>Blocked Tasks Alert</h4>
          <p className="metric-main">15</p>
          <span>30.0% of total</span>
        </div>
        <div className="metric-card">
          <h4>Due Date Compliance</h4>
          <p className="metric-main">23</p>
          <span>Overdue: 14</span>
        </div>
        <div className="metric-card">
          <h4>In Progress Status</h4>
          <p className="metric-main">13</p>
          <span>Avg Active Time: 159.2h</span>
        </div>
      </div>

      {/* ===== Predictive Performance Analysis ===== */}
      <div className="insight-card">
        <h3>📊 Predictive Performance Analysis</h3>
        <p>
          Based on historical patterns and current velocity, projected sprint
          completion and next week workload are estimated below:
        </p>
        <div className="performance-section">
          <div className="performance-box">
            <h5>Projected Sprint Completion</h5>
            <div className="progress-bar">
              <div className="progress" style={{ width: "94%" }}></div>
            </div>
            <span>94%</span>
          </div>
          <div className="performance-box">
            <h5>Next Week Workload</h5>
            <p>Medium</p>
            <small>~48 tasks expected</small>
          </div>
          <div className="performance-box">
            <h5>Risk Level</h5>
            <p>Low</p>
            <small>No major bottlenecks</small>
          </div>
        </div>
      </div>

      {/* ===== Chart Section ===== */}
      <div className="chart-section">
        <h3>📈 Monthly Task Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                color: "#f8fafc",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#38bdf8"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== AI Recommendations ===== */}
      <div className="insight-card">
        <h3>💡 AI Recommendations</h3>
        <ul>
          <li>Prioritize blocked tasks to restore team momentum.</li>
          <li>Distribute upcoming workload evenly across the week.</li>
          <li>
            Maintain closure performance under 30h to sustain current progress.
          </li>
        </ul>
      </div>
    </div>
  );
}
